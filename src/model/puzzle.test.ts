import { describe, expect, it } from 'vitest'
import { deriveSlots } from '../logic'
import {
  isBlockedCell,
  isClueCell,
  isLetterCell,
  makeClue,
  makeClueCell,
} from './cells'
import {
  MAX_DIMENSION,
  createEmptyPuzzle,
  getCell,
  isInBounds,
  setCellType,
  withCell,
} from './puzzle'

describe('createEmptyPuzzle', () => {
  it('builds a grid of the requested size filled with empty letter cells', () => {
    const puzzle = createEmptyPuzzle(3, 4, 'Testi')
    expect(puzzle).toMatchObject({ title: 'Testi', rows: 3, cols: 4 })
    expect(puzzle.cells).toHaveLength(3)
    expect(puzzle.cells.every((row) => row.length === 4)).toBe(true)
    const allEmptyLetters = puzzle.cells
      .flat()
      .every((c) => isLetterCell(c) && c.solution === '')
    expect(allEmptyLetters).toBe(true)
  })

  it('gives each cell its own object (rows are not aliased)', () => {
    const puzzle = createEmptyPuzzle(2, 2)
    const cell = puzzle.cells[0][0]
    expect(isLetterCell(cell)).toBe(true)
    if (isLetterCell(cell)) cell.solution = 'A'
    expect(puzzle.cells[1][1]).toMatchObject({ solution: '' })
  })

  it('rejects non-positive, non-integer, or oversized dimensions', () => {
    expect(() => createEmptyPuzzle(0, 5)).toThrow(RangeError)
    expect(() => createEmptyPuzzle(5, -1)).toThrow(RangeError)
    expect(() => createEmptyPuzzle(2.5, 5)).toThrow(RangeError)
    expect(() => createEmptyPuzzle(MAX_DIMENSION + 1, 5)).toThrow(RangeError)
  })
})

describe('isInBounds / getCell', () => {
  const puzzle = createEmptyPuzzle(2, 3)

  it('detects in- and out-of-bounds coordinates', () => {
    expect(isInBounds(puzzle, { row: 0, col: 0 })).toBe(true)
    expect(isInBounds(puzzle, { row: 1, col: 2 })).toBe(true)
    expect(isInBounds(puzzle, { row: 2, col: 0 })).toBe(false)
    expect(isInBounds(puzzle, { row: 0, col: -1 })).toBe(false)
  })

  it('returns the cell in bounds and undefined out of bounds', () => {
    expect(getCell(puzzle, { row: 0, col: 0 })).toBe(puzzle.cells[0][0])
    expect(getCell(puzzle, { row: 5, col: 5 })).toBeUndefined()
  })
})

describe('withCell', () => {
  it('replaces a single cell without mutating the original', () => {
    const puzzle = createEmptyPuzzle(2, 2)
    const next = withCell(puzzle, { row: 1, col: 0 }, { type: 'blocked' })
    expect(isBlockedCell(next.cells[1][0])).toBe(true)
    expect(next).not.toBe(puzzle)
    expect(isLetterCell(puzzle.cells[1][0])).toBe(true) // original untouched
    expect(next.cells[0]).toBe(puzzle.cells[0]) // unchanged rows are shared
  })

  it('throws for an out-of-bounds coordinate', () => {
    const puzzle = createEmptyPuzzle(2, 2)
    expect(() =>
      withCell(puzzle, { row: 5, col: 0 }, { type: 'blocked' }),
    ).toThrow(RangeError)
  })
})

describe('setCellType', () => {
  it('switches a cell to each type, dropping dependent data', () => {
    const start = withCell(
      createEmptyPuzzle(1, 2),
      { row: 0, col: 0 },
      makeClueCell([makeClue('Vihje', 'across', 'right')]),
    )
    const coord = { row: 0, col: 0 }

    const toLetter = setCellType(start, coord, 'letter')
    expect(toLetter.cells[0][0]).toEqual({ type: 'letter', solution: '' }) // clues dropped

    const toBlocked = setCellType(start, coord, 'blocked')
    expect(isBlockedCell(toBlocked.cells[0][0])).toBe(true)

    const toClue = setCellType(toLetter, coord, 'clue')
    expect(isClueCell(toClue.cells[0][0])).toBe(true)
  })

  it('causes word slots to re-derive after a change', () => {
    // A clue cell at (0,0) pointing right into two letters → one slot.
    const puzzle = withCell(
      createEmptyPuzzle(1, 3),
      { row: 0, col: 0 },
      makeClueCell([makeClue('Vihje', 'across', 'right')]),
    )
    expect(deriveSlots(puzzle)).toHaveLength(1)

    const blocked = setCellType(puzzle, { row: 0, col: 0 }, 'blocked')
    expect(deriveSlots(blocked)).toHaveLength(0)
  })
})
