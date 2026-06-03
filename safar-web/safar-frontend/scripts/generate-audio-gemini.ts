#!/usr/bin/env bun
/**
 * SAFAR — Gemini TTS Audio Generation
 *
 * Generates landmark narration WAV files using Gemini 2.5 Flash Preview TTS.
 * Gemini returns raw PCM 24kHz 16-bit mono — this script wraps it in a WAV header.
 *
 * USAGE:
 *   GEMINI_API_KEY=AIza... bun run scripts/generate-audio-gemini.ts
 *
 * OPTIONS via env:
 *   GEMINI_API_KEY  (required) — get from https://aistudio.google.com/apikey
 *   GEMINI_MODEL    (optional) — default "gemini-2.5-flash-preview-tts"
 *   VOICE_EN        (optional) — default "Kore"
 *   VOICE_RU        (optional) — default "Charon"
 *   VOICE_UZ        (optional) — default "Puck"
 *   ONLY_LANG       (optional) — "en" | "uz" | "ru"
 *   ONLY_SLUG       (optional) — landmark slug filter
 *
 * VOICES (30 options, see https://ai.google.dev/gemini-api/docs/speech-generation):
 *   Zephyr, Puck, Charon, Kore, Fenrir, Leda, Orus, Aoede, Callirrhoe,
 *   Autonoe, Enceladus, Iapetus, Umbriel, Algieba, Despina, Erinome,
 *   Algenib, Rasalgethi, Laomedeia, Achernar, Alnilam, Schedar, Gacrux,
 *   Pulcherrima, Achird, Zubenelgenubi, Vindemiatrix, Sadachbia,
 *   Sadaltager, Sulafat
 *
 * COST:
 *   Free tier: 1500 requests/day on Flash Preview TTS — plenty for 24 files.
 *
 * UZBEK NOTE:
 *   Gemini officially supports 24 languages — Uzbek is not in the prebuilt list.
 *   Quality may vary. For production Uzbek, use Google Cloud TTS (uz-UZ native voice).
 */

import { writeFile, access, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { mockTranscripts, mockLandmarks } from "../src/mocks/landmarks";

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error("❌ Missing GEMINI_API_KEY.");
  console.error("   Get one: https://aistudio.google.com/apikey");
  console.error("   Then: GEMINI_API_KEY=AIza... bun run scripts/generate-audio-gemini.ts");
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash-preview-tts";
const VOICES: Record<string, string> = {
  en: process.env.VOICE_EN ?? "Kore",      // clear female
  ru: process.env.VOICE_RU ?? "Charon",    // deep male
  uz: process.env.VOICE_UZ ?? "Puck",      // energetic
};
const ONLY_LANG = process.env.ONLY_LANG;
const ONLY_SLUG = process.env.ONLY_SLUG;

const OUTPUT_DIR = join(import.meta.dir, "..", "public", "audio");

// ── WAV wrapper (PCM 24kHz 16-bit mono → WAV) ─────────────────────
function pcmToWav(pcm: Buffer, sampleRate = 24000): Buffer {
  const channels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * channels * bitsPerSample) / 8;
  const blockAlign = (channels * bitsPerSample) / 8;
  const dataSize = pcm.length;
  const buf = Buffer.alloc(44 + dataSize);

  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM format
  buf.writeUInt16LE(channels, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(byteRate, 28);
  buf.writeUInt16LE(blockAlign, 32);
  buf.writeUInt16LE(bitsPerSample, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);
  pcm.copy(buf, 44);

  return buf;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate(slug: string, lang: string, text: string) {
  const path = join(OUTPUT_DIR, `${slug}-${lang}.wav`);

  if (await fileExists(path)) {
    console.log(`⏭  skip   ${slug}-${lang} (already exists)`);
    return;
  }

  const voice = VOICES[lang] ?? VOICES.en;
  console.log(
    `🔊 generating ${slug}-${lang} (voice: ${voice}, ${text.length} chars)...`,
  );

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text }] }],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ ${slug}-${lang}: ${res.status} — ${err.slice(0, 200)}`);
    return;
  }

  const data = (await res.json()) as {
    candidates?: {
      content?: { parts?: { inlineData?: { data?: string } }[] };
    }[];
  };

  const b64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!b64) {
    console.error(`❌ ${slug}-${lang}: no audio data in response`);
    return;
  }

  const pcm = Buffer.from(b64, "base64");
  const wav = pcmToWav(pcm, 24000);
  await writeFile(path, wav);
  console.log(
    `✓ saved   ${slug}-${lang}.wav (${(wav.length / 1024).toFixed(1)} KB)`,
  );
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const queue: Array<{ slug: string; lang: string; text: string }> = [];

  for (const landmark of mockLandmarks) {
    if (ONLY_SLUG && landmark.slug !== ONLY_SLUG) continue;
    const transcript = mockTranscripts[landmark.slug];
    if (!transcript) {
      console.log(`⚠️  no transcript for ${landmark.slug} — skipped`);
      continue;
    }
    for (const lang of Object.keys(transcript)) {
      if (ONLY_LANG && lang !== ONLY_LANG) continue;
      queue.push({ slug: landmark.slug, lang, text: transcript[lang] });
    }
  }

  console.log(`📋 Queue: ${queue.length} files to generate`);
  console.log(`   Model: ${MODEL}`);
  console.log(`   Voices: en=${VOICES.en}, ru=${VOICES.ru}, uz=${VOICES.uz}\n`);

  for (const job of queue) {
    await generate(job.slug, job.lang, job.text);
    // Small delay to respect rate limits (free tier: 15 req/min)
    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log(`\n✅ Done. Files in: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
