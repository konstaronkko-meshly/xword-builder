import {
  getCell,
  isClueCell,
  isInBounds,
  isLetterCell,
  type Arrow,
  type Clue,
  type Coord,
  type Direction,
  type Puzzle,
} from '../model'

/**
 * A derived answer slot: the run of letter cells a clue's answer fills.
 * Slots are NEVER stored on the puzzle — always derived with {@link deriveSlots}.
 */
export interface Slot {
  /** Stable id: `${clueRow}-${clueCol}-${direction}`. */
  id: string
  /** The clue this slot belongs to. */
  clue: Clue
  /** Position of the clue cell that owns the clue. */
  clueCoord: Coord
  /** Direction the answer runs (derived from the clue's arrow). */
  direction: Direction
  /**
   * The answer's letter cells, in reading order. May be empty when the clue
   * points at a non-letter cell or off the grid — {@link validatePuzzle}
   * reports those as `empty-clue` issues.
   */
  cells: Coord[]
}

/** One step in each direction. */
const STEP: Record<Direction, Coord> = {
  across: { row: 0, col: 1 },
  down: { row: 1, col: 0 },
}

interface ArrowGeometry {
  /** Offset from the clue cell to the answer's first cell. */
  startOffset: Coord
  /** Direction the answer runs. */
  direction: Direction
}

/**
 * Where each arrow places the answer and which way it runs.
 * MVP build/solve flows only produce `right`/`down`; the two bent arrows are
 * defined for forward-compatibility (deferred — see ARCHITECTURE.md).
 */
const ARROW_GEOMETRY: Record<Arrow, ArrowGeometry> = {
  right: { startOffset: { row: 0, col: 1 }, direction: 'across' },
  down: { startOffset: { row: 1, col: 0 }, direction: 'down' },
  'down-then-right': { startOffset: { row: 1, col: 0 }, direction: 'across' },
  'right-then-down': { startOffset: { row: 0, col: 1 }, direction: 'down' },
}

/** The direction an arrow implies for its answer. */
export function arrowDirection(arrow: Arrow): Direction {
  return ARROW_GEOMETRY[arrow].direction
}

/** Build a stable, unique id for a slot. */
function slotId(clueCoord: Coord, direction: Direction): string {
  return `${clueCoord.row}-${clueCoord.col}-${direction}`
}

function deriveSlot(puzzle: Puzzle, clueCoord: Coord, clue: Clue): Slot {
  const { startOffset, direction } = ARROW_GEOMETRY[clue.arrow]
  const step = STEP[direction]
  const cells: Coord[] = []

  let cur: Coord = {
    row: clueCoord.row + startOffset.row,
    col: clueCoord.col + startOffset.col,
  }
  // Walk the run of consecutive letter cells until a non-letter cell or edge.
  while (
    isInBounds(puzzle, cur) &&
    isLetterCell(puzzle.cells[cur.row][cur.col])
  ) {
    cells.push(cur)
    cur = { row: cur.row + step.row, col: cur.col + step.col }
  }

  return { id: slotId(clueCoord, direction), clue, clueCoord, direction, cells }
}

/**
 * Derive every answer slot in the puzzle, scanning clue cells in reading order.
 * A clue cell with two clues yields two slots.
 */
export function deriveSlots(puzzle: Puzzle): Slot[] {
  const slots: Slot[] = []
  for (let row = 0; row < puzzle.rows; row++) {
    for (let col = 0; col < puzzle.cols; col++) {
      const cell = puzzle.cells[row][col]
      if (!isClueCell(cell)) continue
      for (const clue of cell.clues) {
        slots.push(deriveSlot(puzzle, { row, col }, clue))
      }
    }
  }
  return slots
}

/** True if two coordinates are the same cell. */
export function sameCoord(a: Coord, b: Coord): boolean {
  return a.row === b.row && a.col === b.col
}

/**
 * The slots that pass through `coord` (a letter cell may belong to both an
 * across and a down slot). Used for focus handling in solve/build modes.
 */
export function slotsForCell(slots: Slot[], coord: Coord): Slot[] {
  return slots.filter((slot) => slot.cells.some((c) => sameCoord(c, coord)))
}

/** Index of `coord` within the slot's cells, or -1 if it is not in the slot. */
export function slotIndexOf(slot: Slot, coord: Coord): number {
  return slot.cells.findIndex((c) => sameCoord(c, coord))
}

/**
 * The cell `delta` steps from `coord` along the slot (e.g. +1 next, -1 prev),
 * or `null` if that would leave the slot or `coord` is not in it.
 */
export function stepInSlot(
  slot: Slot,
  coord: Coord,
  delta: 1 | -1,
): Coord | null {
  const i = slotIndexOf(slot, coord)
  if (i < 0) return null
  const j = i + delta
  return j >= 0 && j < slot.cells.length ? slot.cells[j] : null
}

/**
 * The slot's answer as spelled by the puzzle's solution letters. Empty letter
 * cells contribute `''`, so an unfinished slot yields a shorter string.
 */
export function slotSolution(puzzle: Puzzle, slot: Slot): string {
  return slot.cells
    .map((c) => {
      const cell = getCell(puzzle, c)
      return cell && isLetterCell(cell) ? cell.solution : ''
    })
    .join('')
}

/**
 * A "solution word" (ratkaisusana) slot: a clue with an arrow + direction but
 * NO clue text. Its answer cells are highlighted and solved purely via the
 * crossing answers — there is no clue of its own to give the word away.
 */
export function isSolutionSlot(slot: Slot): boolean {
  return slot.clue.text.trim() === ''
}

/** All letter-cell coords belonging to solution-word (clueless) slots. */
export function solutionWordCells(slots: Slot[]): Coord[] {
  return slots.filter(isSolutionSlot).flatMap((slot) => slot.cells)
}
