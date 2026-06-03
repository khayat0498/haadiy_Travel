#!/usr/bin/env bun
/**
 * SAFAR — TTS Audio Generation Script
 *
 * Reads transcripts from src/mocks/landmarks.ts and generates MP3 files
 * in public/audio/{slug}-{lang}.mp3 using OpenAI TTS API.
 *
 * USAGE:
 *   OPENAI_API_KEY=sk-... bun run scripts/generate-audio.ts
 *
 * OPTIONS via env:
 *   OPENAI_API_KEY      (required) — OpenAI API key
 *   TTS_MODEL           (optional) — "tts-1" (cheap) | "tts-1-hd" (default, premium)
 *   TTS_VOICE_EN        (optional) — alloy/echo/fable/onyx/nova/shimmer (default: nova)
 *   TTS_VOICE_RU        (optional) — same set (default: onyx)
 *   ONLY_LANG           (optional) — "en", "uz", "ru" — generate only this language
 *   ONLY_SLUG           (optional) — landmark slug — generate only this one
 *
 * NOTES:
 *   - Uzbek (uz) is NOT well supported by OpenAI. For UZ use Google Cloud TTS
 *     (see scripts/generate-audio-google.ts — future).
 *   - This script SKIPS files that already exist. Delete to re-generate.
 *   - Cost estimate: ~$0.20 for all 8 landmarks × 3 languages on tts-1-hd.
 */

import { writeFile, access, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { mockTranscripts, mockLandmarks } from "../src/mocks/landmarks";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("❌ Missing OPENAI_API_KEY. Set it before running.");
  console.error("   Example: OPENAI_API_KEY=sk-... bun run scripts/generate-audio.ts");
  process.exit(1);
}

const TTS_MODEL = process.env.TTS_MODEL ?? "tts-1-hd";
const VOICE_EN = process.env.TTS_VOICE_EN ?? "nova";
const VOICE_RU = process.env.TTS_VOICE_RU ?? "onyx";
const VOICE_UZ = "alloy"; // not great, but at least neutral
const ONLY_LANG = process.env.ONLY_LANG;
const ONLY_SLUG = process.env.ONLY_SLUG;

const voiceFor = (lang: string) =>
  lang === "ru" ? VOICE_RU : lang === "uz" ? VOICE_UZ : VOICE_EN;

const OUTPUT_DIR = join(import.meta.dir, "..", "public", "audio");

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate(slug: string, lang: string, text: string) {
  const path = join(OUTPUT_DIR, `${slug}-${lang}.mp3`);

  if (await fileExists(path)) {
    console.log(`⏭  skip   ${slug}-${lang} (already exists)`);
    return;
  }

  const voice = voiceFor(lang);
  console.log(`🔊 generating ${slug}-${lang} (voice: ${voice}, ${text.length} chars)...`);

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice,
      input: text,
      response_format: "mp3",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`❌ ${slug}-${lang}: ${response.status} — ${err}`);
    return;
  }

  const buf = Buffer.from(await response.arrayBuffer());
  await writeFile(path, buf);
  console.log(`✓ saved   ${slug}-${lang}.mp3 (${(buf.length / 1024).toFixed(1)} KB)`);
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

  console.log(`📋 Queue: ${queue.length} files to generate\n`);

  for (const job of queue) {
    await generate(job.slug, job.lang, job.text);
  }

  console.log(`\n✅ Done.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
