# Scripts

TTS audio generation for landmark narrations.

## Option 1 — Gemini (default, free tier) ⭐

`generate-audio-gemini.ts` uses **Gemini 2.5 Flash Preview TTS**.

### Get API key
1. Go to https://aistudio.google.com/apikey
2. Click "Create API key"
3. Copy the key (starts with `AIza...`)

### Run

```bash
# All 8 landmarks × 3 languages (24 files)
GEMINI_API_KEY=AIza... bun run scripts/generate-audio-gemini.ts

# English only
GEMINI_API_KEY=AIza... ONLY_LANG=en bun run scripts/generate-audio-gemini.ts

# Single landmark test
GEMINI_API_KEY=AIza... ONLY_SLUG=registan ONLY_LANG=en bun run scripts/generate-audio-gemini.ts

# Custom voices
GEMINI_API_KEY=AIza... VOICE_EN=Zephyr VOICE_RU=Charon bun run scripts/generate-audio-gemini.ts
```

### Gemini voices (30 options)
`Zephyr` · `Puck` · `Charon` · `Kore` · `Fenrir` · `Leda` · `Orus` · `Aoede` · `Callirrhoe` · `Autonoe` · `Enceladus` · `Iapetus` · `Umbriel` · `Algieba` · `Despina` · `Erinome` · `Algenib` · `Rasalgethi` · `Laomedeia` · `Achernar` · `Alnilam` · `Schedar` · `Gacrux` · `Pulcherrima` · `Achird` · `Zubenelgenubi` · `Vindemiatrix` · `Sadachbia` · `Sadaltager` · `Sulafat`

Defaults: EN=Kore (clear female), RU=Charon (deep male), UZ=Puck.

### Cost
**Free tier:** 1500 requests/day on Flash Preview TTS — more than enough for 24 files.
Paid tier kicks in only above limits.

---

## Option 2 — OpenAI (alternative)

`generate-audio.ts` uses **OpenAI TTS** (`tts-1-hd` model).

```bash
OPENAI_API_KEY=sk-... bun run scripts/generate-audio.ts
```

Cost: ~$0.51 for all 24 files on `tts-1-hd`, ~$0.26 on `tts-1`.

> **Note:** OpenAI outputs `.mp3`, Gemini outputs `.wav`. The mock URLs currently
> use `.wav` (Gemini default). If you switch to OpenAI, also update
> `src/mocks/landmarks.ts` extensions from `.wav` → `.mp3`.

---

## Output

Files saved to `public/audio/{slug}-{lang}.{wav|mp3}`, served at
`http://localhost:3001/audio/{slug}-{lang}.{wav|mp3}`.

The script **skips files that already exist** — delete them first to regenerate.

---

## Languages support

| Language | Gemini | OpenAI | Google Cloud TTS |
|----------|--------|--------|------------------|
| English  | ✅ A+  | ✅ A+  | ✅ A+ |
| Russian  | ✅ A   | ✅ A   | ✅ A |
| Uzbek    | ⚠️ Limited (not in prebuilt list) | ⚠️ English-accented | ✅ Native `uz-UZ` |

For production Uzbek, use Google Cloud TTS (dedicated `uz-UZ` voice, paid only).
Phase 2 plan per TZ §11.2: replace TTS with professional voice talent.

---

## Replacing TTS with professional voice (Phase 1D)

Per TZ §11.2, MVP TTS must be replaced with professional native-speaker
recordings before public launch.

Workflow:
1. Hire voice talent (Upwork/Fiverr, native speakers per language).
2. Send transcripts (from `src/mocks/landmarks.ts → mockTranscripts`).
3. Replace `.wav`/`.mp3` files in `public/audio/` (or in R2 when backend exists).
4. Update `media_files.content_status` column: `tts` → `professional`.
5. No code change needed — `<audio>` plays whatever file is at that URL.
