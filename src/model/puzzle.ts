import { makeLetterCell } from './cells'
import type { Cell, Coord, Puzzle } from './types'

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
