# BLAZE CALCULATOR — Ultimate Edition

**Numbers with a Touch of Love.**  
A modern, privacy-first calculator platform combining an exact **Age Calculator**, a deterministic **Love Match Calculator**, and a transparent **Compatibility Calculator** in a cohesive Pink, Rose, and White design system with Light and Dark Rose modes.

## Features

- **Age Calculator (`/age-calculator`)**: Exact years, months, and days with leap-year accuracy (including February 29 births), total days/weeks/months/hours lived, day of birth, next birthday date, and live birthday countdown.
- **Love Match Calculator (`/love-match`)**: Order-independent, deterministic 0–100% score with animated percentage counter, pulsing heart visual, five curated message tiers, optional gender fields, and entertainment notice.
- **Compatibility Calculator (`/compatibility`)**: Transparent deterministic scoring blending Name Match Score (55%) and Calendar Age Compatibility (45%), plus exact calendar age difference and personalized summary.
- **Unified UX**: Light & Dark Rose modes, server-side and client-side input validation, Copy Results, Share Results (Web Share API with clipboard fallback), print-friendly layouts, toast notifications, and custom 404 page.

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Running Unit Tests

```bash
npx --yes tsx --test lib/calculators.test.ts
```

## Production Build

```bash
npm run build
npm run start
```

---

© 2026 Blaze Calculator. All Rights Reserved.  
Designed & Developed by Blaze.
