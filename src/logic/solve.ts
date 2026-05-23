import { getCell, isLetterCell, type Coord, type Puzzle } from '../model'

/** Status of a single letter cell against the solution, given the entries. */
export type CellStatus = 'empty' | 'correct' | 'wrong'

const keyOf = (c: Coord) => `${c.row}-${c.col}`

/** Coordinates of every letter cell in the puzzle, in reading order. */
export function letterCoords(puzzle: Puzzle): Coord[] {
  const coords: Coord[] = []
  for (let row = 0; row < puzzle.rows; row++) {
    for (let col = 0; col < puzzle.cols; col++) {
      if (isLetterCell(puzzle.cells[row][col])) coords.push({ row, col })
    }
  }
  return coords
}

/** Compare a single cell's entered letter to its solution. */
export function cellStatus(
  puzzle: Puzzle,
  entries: ReadonlyMap<string, string>,
  coord: Coord,
): CellStatus {
  const cell = getCell(puzzle, coord)
  if (!cell || !isLetterCell(cell)) return 'empty'
  const entered = entries.get(keyOf(coord)) ?? ''
  if (entered === '') return 'empty'
  return entered === cell.solution ? 'correct' : 'wrong'
}

/** Letter cells whose entered letter is present but does not match the solution. */
export function wrongCells(
  puzzle: Puzzle,
  entries: ReadonlyMap<string, string>,
): Coord[] {
  return letterCoords(puzzle).filter(
    (c) => cellStatus(puzzle, entries, c) === 'wrong',
  )
}

/**
 * True when every letter cell is correctly filled. Requires each letter cell
 * to have a non-empty solution (a fully authored puzzle) and a matching entry.
 */
export function isComplete(
  puzzle: Puzzle,
  entries: ReadonlyMap<string, string>,
): boolean {
  const coords = letterCoords(puzzle)
  if (coords.length === 0) return false
  return coords.every((c) => {
    const cell = getCell(puzzle, c)
    if (!cell || !isLetterCell(cell) || cell.solution === '') return false
    return entries.get(keyOf(c)) === cell.solution
  })
}
