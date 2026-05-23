import { describe, expect, it } from 'vitest'
import {
  createEmptyPuzzle,
  makeBlockedCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  type Cell,
  type Puzzle,
} from '../model'
import { cellStatus, isComplete, letterCoords, wrongCells } from './solve'

function puzzleOf(cells: Cell[][]): Puzzle {
  const base = createEmptyPuzzle(cells.length, cells[0].length)
  return { ...base, cells }
}

const L = (ch = '') => makeLetterCell(ch)
const B = () => makeBlockedCell()

// A clue + two letters (KO) across.
const sample = puzzleOf([
  [makeClueCell([makeClue('Vihje', 'across', 'right')]), L('K'), L('O')],
])

const entriesOf = (o: Record<string, string>) => new Map(Object.entries(o))

describe('letterCoords', () => {
  it('lists only letter cells', () => {
    const puzzle = puzzleOf([[makeClueCell([]), L('K'), B()]])
    expect(letterCoords(puzzle)).toEqual([{ row: 0, col: 1 }])
  })
})

describe('cellStatus', () => {
  it('classifies empty, correct, and wrong cells', () => {
    const entries = entriesOf({ '0-1': 'K', '0-2': 'X' })
    expect(cellStatus(sample, entries, { row: 0, col: 1 })).toBe('correct')
    expect(cellStatus(sample, entries, { row: 0, col: 2 })).toBe('wrong')
    expect(cellStatus(sample, entries, { row: 0, col: 0 })).toBe('empty') // clue cell
    expect(
      cellStatus(puzzleOf([[L('A')]]), new Map(), { row: 0, col: 0 }),
    ).toBe('empty')
  })
})

describe('wrongCells', () => {
  it('returns only filled-but-incorrect letter cells', () => {
    const entries = entriesOf({ '0-1': 'K', '0-2': 'X' })
    expect(wrongCells(sample, entries)).toEqual([{ row: 0, col: 2 }])
  })
})

describe('isComplete', () => {
  it('is true only when every letter cell matches its solution', () => {
    expect(isComplete(sample, entriesOf({ '0-1': 'K', '0-2': 'O' }))).toBe(true)
    expect(isComplete(sample, entriesOf({ '0-1': 'K' }))).toBe(false) // missing
    expect(isComplete(sample, entriesOf({ '0-1': 'K', '0-2': 'X' }))).toBe(
      false,
    )
  })

  it('is false when a puzzle has no letter cells', () => {
    expect(isComplete(puzzleOf([[B()]]), new Map())).toBe(false)
  })

  it('is false when a letter cell has no solution to match', () => {
    const unfinished = puzzleOf([
      [makeClueCell([makeClue('V', 'across', 'right')]), L('')],
    ])
    expect(isComplete(unfinished, entriesOf({ '0-1': 'A' }))).toBe(false)
  })
})
