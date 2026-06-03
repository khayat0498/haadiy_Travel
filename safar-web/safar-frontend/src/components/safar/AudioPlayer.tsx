"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  FileText,
  Languages,
  ChevronDown,
  Sparkles,
} from "lucide-react";

type Language = { code: string; label: string; native: string; bcp47: string };

const LANGUAGES: Language[] = [
  { code: "en", label: "English", native: "English", bcp47: "en-US" },
  { code: "uz", label: "Uzbek", native: "O'zbek", bcp47: "uz-UZ" },
  { code: "ru", label: "Russian", native: "Русский", bcp47: "ru-RU" },
];

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

function formatTime(sec: number) {
  if (!isFinite(sec) || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Deterministic waveform heights per-track
function generateWaveform(seed: string, bars: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < bars; i++) {
    h = (h * 1664525 + 1013904223) >>> 0;
    out.push(20 + ((h >>> 0) / 0xffffffff) * 80);
  }
  return out;
}

// Estimate duration from text length (~160 wpm reading)
function estimateDuration(text: string, rate = 1) {
  const words = text.trim().split(/\s+/).length;
  return (words / (160 * rate)) * 60;
}

type Props = {
  audioUrl: string;
  title: string;
  subtitle?: string;
  transcript?: Record<string, string>;
  defaultLanguage?: string;
};

export function AudioPlayer({
  audioUrl,
  title,
  subtitle,
  transcript,
  defaultLanguage = "en",
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speechStartRef = useRef(0);
  const speechElapsedAtPauseRef = useRef(0);

  const [mode, setMode] = useState<"file" | "tts">("file");
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage);
  const [langOpen, setLangOpen] = useState(false);

  const waveform = useMemo(() => generateWaveform(audioUrl, 60), [audioUrl]);
  const currentLang =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const currentText =
    transcript?.[language] ?? transcript?.[defaultLanguage] ?? "";

  // ── HTML5 Audio listeners ─────────────────────────────────────────
  useEffect(() => {
    const a = audioRef.current;
    if (!a || mode !== "file") return;
    const onMeta = () => setDuration(a.duration);
    const onTime = () => setTime(a.currentTime);
    const onEnd = () => setPlaying(false);
    const onError = () => {
      // File missing or broken → fall back to TTS if we have a transcript
      if (currentText) {
        setMode("tts");
        setDuration(estimateDuration(currentText, speed));
        setTime(0);
      }
    };
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("error", onError);
    return () => {
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("error", onError);
    };
  }, [mode, currentText, speed]);

  // ── Stop TTS when language or text changes while playing ──────────
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
        if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
      }
    };
  }, []);

  // ── Mode switch when audio URL changes ────────────────────────────
  useEffect(() => {
    setMode("file");
    setPlaying(false);
    setTime(0);
    speechElapsedAtPauseRef.current = 0;
  }, [audioUrl]);

  // ── TTS playback ──────────────────────────────────────────────────
  const startTts = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(currentText);
    u.lang = currentLang.bcp47;
    u.rate = speed;
    u.volume = muted ? 0 : 1;
    u.onend = () => {
      setPlaying(false);
      speechElapsedAtPauseRef.current = 0;
      setTime(0);
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
    };
    speechRef.current = u;
    speechStartRef.current = Date.now() - speechElapsedAtPauseRef.current * 1000;
    const est = estimateDuration(currentText, speed);
    setDuration(est);
    if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
    speechIntervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - speechStartRef.current) / 1000;
      setTime(Math.min(elapsed, est));
    }, 250);
    window.speechSynthesis.speak(u);
    setPlaying(true);
  }, [currentText, currentLang.bcp47, speed, muted]);

  const stopTts = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
    speechElapsedAtPauseRef.current = time;
    setPlaying(false);
  }, [time]);

  const toggle = () => {
    if (mode === "file") {
      const a = audioRef.current;
      if (!a) return;
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {
            // Audio play failed — try TTS
            if (currentText) {
              setMode("tts");
              setDuration(estimateDuration(currentText, speed));
              setTime(0);
            }
          });
      }
    } else {
      if (playing) stopTts();
      else startTts();
    }
  };

  const seek = (next: number) => {
    if (mode === "file") {
      const a = audioRef.current;
      if (!a) return;
      a.currentTime = Math.max(0, Math.min(duration || 0, next));
      setTime(a.currentTime);
    } else {
      // TTS — only support reset for now (no granular seek)
      stopTts();
      speechElapsedAtPauseRef.current = Math.max(0, Math.min(duration, next));
      setTime(speechElapsedAtPauseRef.current);
    }
  };

  const onWaveClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  const setSpeedAndApply = (s: number) => {
    setSpeed(s);
    if (mode === "file" && audioRef.current) audioRef.current.playbackRate = s;
    if (mode === "tts" && playing) {
      stopTts();
      setTimeout(() => startTts(), 100);
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (mode === "file" && audioRef.current) audioRef.current.muted = next;
    if (mode === "tts" && speechRef.current) {
      speechRef.current.volume = next ? 0 : 1;
    }
  };

  const progress = duration > 0 ? time / duration : 0;

  return (
    <div className="rounded-2xl ring-1 ring-cyan/40 bg-card glow-cyan p-5">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Top: title + language */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-[10px] text-cyan uppercase tracking-[0.25em] mb-1 flex items-center gap-2">
            Now Playing — Landmark History
            {mode === "tts" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gold/15 text-gold text-[9px] normal-case tracking-wider">
                <Sparkles className="size-2.5" />
                Synthesized
              </span>
            )}
          </p>
          <p className="font-heading text-lg font-semibold truncate">{title}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full ring-1 ring-border hover:ring-cyan/40 text-sm transition-colors"
          >
            <Languages className="size-3.5" />
            {currentLang.native}
            <ChevronDown className="size-3.5 opacity-60" />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-11 w-44 rounded-xl ring-1 ring-border bg-popover shadow-lg z-10 p-1">
              {LANGUAGES.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  onClick={() => {
                    if (playing) {
                      if (mode === "tts") stopTts();
                      else audioRef.current?.pause();
                      setPlaying(false);
                    }
                    setLanguage(l.code);
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-foreground/5 transition-colors ${
                    l.code === language ? "text-cyan" : ""
                  }`}
                >
                  {l.native}{" "}
                  <span className="text-xs text-muted-foreground">
                    · {l.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Waveform */}
      <div
        onClick={onWaveClick}
        className="relative h-16 flex items-center gap-0.5 cursor-pointer mb-3"
      >
        {waveform.map((h, i) => {
          const barProgress = (i + 1) / waveform.length;
          const active = barProgress <= progress;
          return (
            <span
              key={i}
              className={`flex-1 rounded-sm transition-colors ${
                active ? "bg-cyan" : "bg-muted"
              }`}
              style={{ height: `${h}%` }}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground tabular-nums w-12">
          {formatTime(time)}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => seek(time - 10)}
            className="size-10 rounded-full grid place-items-center hover:bg-foreground/10 transition-colors"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack className="size-4" />
          </button>

          <button
            type="button"
            onClick={toggle}
            disabled={mode === "tts" && !currentText}
            className="size-12 rounded-full bg-cyan hover:bg-cyan-glow text-primary-foreground grid place-items-center transition-colors disabled:opacity-50"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => seek(time + 10)}
            className="size-10 rounded-full grid place-items-center hover:bg-foreground/10 transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="size-4" />
          </button>
        </div>

        <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
          {formatTime(duration)}
        </span>
      </div>

      {/* Bottom row: speed, mute, transcript */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
        <div className="flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSpeedAndApply(s)}
              className={`px-2.5 h-7 rounded-full text-xs font-medium transition-colors ${
                s === speed
                  ? "bg-cyan/20 text-cyan ring-1 ring-cyan/40"
                  : "text-muted-foreground hover:bg-foreground/10"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleMute}
            className="size-9 rounded-full grid place-items-center hover:bg-foreground/10 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setTranscriptOpen((v) => !v)}
            className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium transition-colors ${
              transcriptOpen
                ? "bg-cyan/20 text-cyan ring-1 ring-cyan/40"
                : "ring-1 ring-border hover:ring-cyan/40"
            }`}
          >
            <FileText className="size-3.5" />
            Transcript
          </button>
        </div>
      </div>

      {/* Transcript */}
      {transcriptOpen && (
        <div className="mt-4 pt-4 border-t border-border/60">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
            {currentLang.native} transcript
          </p>
          <div className="prose prose-invert max-w-none text-sm text-foreground/85 leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto pr-2">
            {currentText ||
              "Transcript will be available once professional voice talent records this segment. (TZ §11.2)"}
          </div>
        </div>
      )}

      <p className="mt-4 text-[10px] text-muted-foreground/80 text-center">
        ✦ Smart auto-play enabled — story plays when you approach the landmark
      </p>
    </div>
  );
}
