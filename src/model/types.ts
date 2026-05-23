/**
 * Core data model for Scandinavian arrow-word crosswords (sanaristikko).
 *
 * Design principles (see ARCHITECTURE.md):
 * - Word slots are DERIVED, never stored — see src/logic.
 * - A letter cell's `solution` is the single source of truth for its answer
 *   letter; there is no separate stored `answer` per clue.
 */

/** The direction an answer runs from its starting cell. */
export type Direction = 'across' | 'down'

/**
 * How a clue's arrow is drawn / where its answer begins.
 * - `right`/`down`: answer starts in the adjacent cell and runs that way.
 * - `down-then-right`/`right-then-down`: bent (L-shaped) arrows — DEFERRED
 *   post-MVP. Defined here so the type is forward-compatible; build/solve
 *   logic only handles `right`/`down` in the MVP.
 */
export type Arrow = 'right' | 'down' | 'down-then-right' | 'right-then-down'

/** A single clue living inside a clue cell. */
export interface Clue {
  text: string
  direction: Direction
  arrow: Arrow
}

/** A fillable cell holding one solution letter (`''` = not yet filled). */
export interface LetterCell {
  type: 'letter'
  solution: string
}

/** A cell containing 1–2 clues (typically one across + one down). */
export interface ClueCell {
  type: 'clue'
  clues: Clue[]
}

/** A cell that is not in play. */
export interface BlockedCell {
  type: 'blocked'
}

/** Discriminated union of all cell variants, keyed by `type`. */
export type Cell = LetterCell | ClueCell | BlockedCell

/** A row/column position in the grid (0-based). */
export interface Coord {
  row: number
  col: number
}

/** A complete puzzle: an equal-size matrix of cells plus metadata. */
export interface Puzzle {
  title: string
  author?: string
  rows: number
  cols: number
  /** Indexed `cells[row][col]`; dimensions match `rows`/`cols`. */
  cells: Cell[][]
}
