# Crossword Builder — Architecture

A web app for **building** and **solving** Scandinavian arrow-word crosswords
(*sanaristikko*): the clue text lives **inside a grid cell** and an arrow indicates
where its answer starts and which direction it runs. A single clue cell can hold
**two clues** (one across, one down).

## Stack

- **React + Vite + TypeScript** — interactive grid UI, static build.
- **localStorage + JSON import/export** — no backend in the MVP; puzzles are
  saved locally and shared as `.json` files.
- **Static-site deployment** (GitHub Pages / Netlify / Vercel — TBD in Phase 4).

> **Styling constraint (project-wide):** all UI MUST conform to the
> **Meshly Design Deck** in `Meshly Design Deck/`. Reuse its design tokens,
> component patterns, and CSS (`styles.css`, `pages.css`) rather than inventing
> new styles. See the recorded Meshly decision *"All UI must conform to the
> Meshly Design Deck."*

## Data model

```ts
type Direction = 'across' | 'down';
// Bent (L-shaped) arrows are deferred post-MVP.
type Arrow = 'right' | 'down' | 'down-then-right' | 'right-then-down';

interface Clue {
  text: string;
  direction: Direction;
  arrow: Arrow;
}

type Cell =
  | { type: 'letter'; solution: string }   // one solution letter (set in build mode)
  | { type: 'clue'; clues: Clue[] }         // 1–2 clues
  | { type: 'blocked' };                    // not in play

interface Puzzle {
  title: string;
  author?: string;
  rows: number;
  cols: number;            // equal-size matrix
  cells: Cell[][];
}
```

**Key principle — word slots are derived, never stored.** From each clue's start
cell, walk in the clue's direction collecting consecutive `letter` cells until a
`clue`/`blocked` cell or the grid edge. This yields the answer slot (its cells and
length). Re-derive on every structural change instead of persisting redundant
state that can drift.

**Solving never mutates the puzzle.** A solver's entered letters live in a
separate `SolveState` map (`cell → letter`), stored under its own localStorage
key. The puzzle file's `solution` letters stay intact and are read only for
check/reveal/completion — never rendered in solve mode.

## Modules

```
src/
  model/      Puzzle/Cell/Clue types, factories, type guards
  logic/      slot derivation, validation, check/reveal, completion
  storage/    localStorage persistence, JSON (de)serialization (versioned)
  components/ grid + cell rendering, clue editor, panels (Design Deck styled)
  modes/      BuildMode and SolveMode containers + the mode toggle
```

## Two modes (one app)

- **Build mode** — design the grid: set rows/cols, assign each cell as
  letter/clue/blocked, author clues (text + direction + arrow, up to two per
  cell), enter solution letters, with live word-slot highlighting and validation
  (orphan letter cells, clues pointing at empty runs).
- **Solve mode** — open a finished puzzle: clues shown, letter cells empty and
  fillable, keyboard navigation that follows word direction, click-to-focus a
  slot, and check / reveal / validate with resumable progress.

## Scope boundaries (MVP)

- **In:** straight `right` / `down` arrows, two clues per cell, blocked cells,
  build + solve modes, localStorage, JSON import/export.
- **Deferred:** bent (L-shaped) arrows, spoiler-free sharing (export without
  solutions), print/PDF export, any backend/accounts.

## Persistence schema

JSON is **versioned** (`schemaVersion`) so future formats can migrate. Export
writes a single `Puzzle` document; import validates structure and rejects
malformed files with a clear error. Solve state is a separate document keyed by
puzzle id.
