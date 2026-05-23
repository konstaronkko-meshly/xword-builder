import {
  isLetterCell,
  makeBlockedCell,
  makeClueCell,
  makeLetterCell,
} from './cells'
import type { Cell, Coord, Puzzle } from './types'

/** A cell's variant tag. */
export type CellType = Cell['type']

/** Largest grid dimension we allow, as a sanity guard. */
export const MAX_DIMENSION = 50

function assertDimension(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 1 || value > MAX_DIMENSION) {
    throw new RangeError(
      `${name} must be an integer in [1, ${MAX_DIMENSION}], got ${value}.`,
    )
  }
}

/**
 * Create an empty puzzle: a `rows × cols` grid of empty letter cells.
 * Authors then convert cells to clue/blocked as they design the puzzle.
 */
export function createEmptyPuzzle(
  rows: number,
  cols: number,
  title = '',
): Puzzle {
  assertDimension(rows, 'rows')
  assertDimension(cols, 'cols')
  const cells: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => makeLetterCell()),
  )
  return { title, rows, cols, cells }
}

/** True if `coord` lies inside the puzzle grid. */
export function isInBounds(puzzle: Puzzle, { row, col }: Coord): boolean {
  return row >= 0 && row < puzzle.rows && col >= 0 && col < puzzle.cols
}

/** Get the cell at `coord`, or `undefined` if out of bounds. */
export function getCell(puzzle: Puzzle, coord: Coord): Cell | undefined {
  return isInBounds(puzzle, coord)
    ? puzzle.cells[coord.row][coord.col]
    : undefined
}

/** Return a new puzzle with the cell at `coord` replaced (immutably). */
export function withCell(puzzle: Puzzle, coord: Coord, cell: Cell): Puzzle {
  if (!isInBounds(puzzle, coord)) {
    throw new RangeError(`coord (${coord.row},${coord.col}) is out of bounds.`)
  }
  const cells = puzzle.cells.map((row, r) =>
    r === coord.row
      ? row.map((existing, c) => (c === coord.col ? cell : existing))
      : row,
  )
  return { ...puzzle, cells }
}

/**
 * Set the type of the cell at `coord`, returning a new puzzle. The cell is
 * rebuilt from a fresh factory, so converting drops any dependent data
 * (a clue cell's clues, a letter cell's solution).
 */
export function setCellType(
  puzzle: Puzzle,
  coord: Coord,
  type: CellType,
): Puzzle {
  const cell: Cell =
    type === 'letter'
      ? makeLetterCell()
      : type === 'clue'
        ? makeClueCell()
        : makeBlockedCell()
  return withCell(puzzle, coord, cell)
}

/** A cell that carries no authored content (an empty letter cell). */
function isEmptyCell(cell: Cell): boolean {
  return isLetterCell(cell) && cell.solution === ''
}

/**
 * Resize the grid, returning a new puzzle. In-bounds cells are preserved;
 * new positions are filled with empty letter cells; cells outside the new
 * dimensions are dropped.
 */
export function resizePuzzle(
  puzzle: Puzzle,
  rows: number,
  cols: number,
): Puzzle {
  assertDimension(rows, 'rows')
  assertDimension(cols, 'cols')
  const cells: Cell[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) =>
      r < puzzle.rows && c < puzzle.cols
        ? puzzle.cells[r][c]
        : makeLetterCell(),
    ),
  )
  return { ...puzzle, rows, cols, cells }
}

/**
 * True if resizing to `rows`×`cols` would drop any cell that carries authored
 * content (a clue cell, a blocked cell, or a letter with a solution) — i.e.
 * the UI should confirm before applying the resize.
 */
export function resizeDropsContent(
  puzzle: Puzzle,
  rows: number,
  cols: number,
): boolean {
  for (let r = 0; r < puzzle.rows; r++) {
    for (let c = 0; c < puzzle.cols; c++) {
      if ((r >= rows || c >= cols) && !isEmptyCell(puzzle.cells[r][c])) {
        return true
      }
    }
  }
  return false
}
