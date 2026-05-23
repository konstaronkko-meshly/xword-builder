# Sanaristikkotyökalu (Crossword Builder)

A web app for **building** and **solving** Scandinavian arrow-word crosswords
(*sanaristikko*) — the style where the clue text lives inside a grid cell and an
arrow points to where its answer starts. Build a puzzle (letter / clue /
blocked cells, with up to two clues per cell), then solve it: type answers,
check them, reveal, and track completion. Puzzles are saved in the browser and
can be exported/imported as JSON.

- **Stack:** React + Vite + TypeScript. No backend — everything runs in the
  browser (localStorage + JSON files).
- **Language:** the **UI is Finnish**; the **code and docs are English**.
- **Architecture:** see [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the data
  model, word-slot derivation, and module layout.

## Prerequisites

- **Node 20 LTS** (any version ≥ 18 works; Vite 6 requires ≥ 18). On
  Cloudflare Pages the build's Node version is pinned via `.node-version` /
  `NODE_VERSION` (see Deployment).

## Local development

```bash
npm install          # install dependencies (use `npm ci` for a clean, locked install)
npm run dev          # start the Vite dev server (http://localhost:5173)
npm run build        # type-check (tsc -b) + production build into dist/
npm run preview      # serve the production build locally
npm test             # run the test suite (Vitest)
npm run lint         # ESLint
npm run format       # format with Prettier  (format:check to verify only)
```

## Project structure

```
src/
  model/        Puzzle / Cell / Clue types, factories, guards, transforms
  logic/        word-slot derivation, validation, solve checks
  storage/      versioned JSON (de)serialization, localStorage, file import/export
  components/   CrosswordGrid, ClueEditor, PuzzleLibrary, useGridEntry hook
  modes/        BuildMode + SolveMode
  i18n/         Finnish UI strings (fi.ts)
  styles/       Design Deck tokens + global styles
```

`Meshly Design Deck/` is the design-system reference the UI follows; it is **not**
part of the app build. Only `dist/` is deployed.

## Deployment — Cloudflare Pages

The app is a static SPA. The production build is whatever `npm run build`
writes to `dist/`. Two ways to deploy:

### a) Git integration (recommended)

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, and select this repository (fork it to the target account first if
   needed).
2. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** set `NODE_VERSION=20` as an environment variable (or rely
     on a committed `.node-version`).
3. Set the **production branch** (e.g. `main`, or `mvp` while in development).
   Pushes to that branch auto-deploy; other branches get preview deployments.

### b) Wrangler Direct Upload (no Git connection)

```bash
npm run build
npx wrangler pages deploy dist --project-name=<your-project-name>
```

### Notes

- The app is a single page (no client-side router), so no SPA history-fallback
  config is needed. If routing is added later, add `public/_redirects` with
  `/* /index.html 200`.
- `vite.config.ts` uses `base: './'`, which works at the `*.pages.dev` root.
