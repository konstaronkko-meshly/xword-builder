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
import { isStructurallyValid, validatePuzzle } from './validation'

function puzzleOf(cells: Cell[][]): Puzzle {
  const base = createEmptyPuzzle(cells.length, cells[0].length)
  return { ...base, cells }
}

const L = (ch = '') => makeLetterCell(ch)
const B = () => makeBlockedCell()

describe('validatePuzzle', () => {
  it('reports no issues for a well-formed across slot', () => {
    const puzzle = puzzleOf([
      [makeClueCell([makeClue('Vihje', 'across', 'right')]), L('A'), L('B')],
    ])
    expect(validatePuzzle(puzzle)).toEqual([])
    expect(isStructurallyValid(puzzle)).toBe(true)
  })

  it('flags a letter cell no clue runs through as an orphan', () => {
    // The letter at (0,4) sits past a blocked cell and is unreachable.
    const puzzle = puzzleOf([
      [
        makeClueCell([makeClue('Vihje', 'across', 'right')]),
        L('A'),
        L('B'),
        B(),
        L('C'),
      ],
    ])
    const issues = validatePuzzle(puzzle)
    expect(issues).toEqual([
      { kind: 'orphan-letter', coord: { row: 0, col: 4 } },
    ])
  })

  it('flags a clue that points off the grid as empty-clue', () => {
    // A down clue on the bottom row has nowhere to run.
    const clue = makeClue('Vihje', 'down', 'down')
    const puzzle = puzzleOf([[makeClueCell([clue])]])
    const issues = validatePuzzle(puzzle)
    expect(issues).toContainEqual({
      kind: 'empty-clue',
      coord: { row: 0, col: 0 },
      clue,
    })
  })

  it('flags a clue whose direction disagrees with its arrow', () => {
    // arrow 'right' runs across, but the clue claims 'down'.
    const clue = makeClue('Vihje', 'down', 'right')
    const puzzle = puzzleOf([[makeClueCell([clue]), L('A'), L('B')]])
    const issues = validatePuzzle(puzzle)
    expect(issues).toContainEqual({
      kind: 'direction-mismatch',
      coord: { row: 0, col: 0 },
      clue,
    })
  })

  it('is valid for a clean crossing of two slots', () => {
    const puzzle = puzzleOf([
      [B(), makeClueCell([makeClue('Alas', 'down', 'down')]), B()],
      [makeClueCell([makeClue('Poikki', 'across', 'right')]), L('X'), L('Y')],
      [B(), L('Z'), B()],
    ])
    expect(validatePuzzle(puzzle)).toEqual([])
  })
})
