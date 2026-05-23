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
import {
  arrowDirection,
  deriveSlots,
  slotSolution,
  slotsForCell,
} from './slots'

/** Build a puzzle from a 2D array of cells. */
function puzzleOf(cells: Cell[][]): Puzzle {
  const base = createEmptyPuzzle(cells.length, cells[0].length)
  return { ...base, cells }
}

const L = (ch = '') => makeLetterCell(ch)
const B = () => makeBlockedCell()

describe('arrowDirection', () => {
  it('maps each arrow to the direction its answer runs', () => {
    expect(arrowDirection('right')).toBe('across')
    expect(arrowDirection('down')).toBe('down')
    expect(arrowDirection('down-then-right')).toBe('across')
    expect(arrowDirection('right-then-down')).toBe('down')
  })
})

describe('deriveSlots — straight arrows', () => {
  it('derives an across slot from a right arrow, stopping at the edge', () => {
    const puzzle = puzzleOf([
      [
        makeClueCell([makeClue('Vihje', 'across', 'right')]),
        L('K'),
        L('I'),
        L('S'),
      ],
    ])
    const slots = deriveSlots(puzzle)
    expect(slots).toHaveLength(1)
    expect(slots[0].direction).toBe('across')
    expect(slots[0].cells).toEqual([
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
    ])
    expect(slotSolution(puzzle, slots[0])).toBe('KIS')
    expect(slots[0].id).toBe('0-0-across')
  })

  it('derives a down slot from a down arrow, stopping at the edge', () => {
    const puzzle = puzzleOf([
      [makeClueCell([makeClue('Vihje', 'down', 'down')])],
      [L('U')],
      [L('N')],
    ])
    const slots = deriveSlots(puzzle)
    expect(slots).toHaveLength(1)
    expect(slots[0].direction).toBe('down')
    expect(slots[0].cells).toEqual([
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ])
  })

  it('stops the run at a blocked cell, leaving later letters uncovered', () => {
    const puzzle = puzzleOf([
      [
        makeClueCell([makeClue('Vihje', 'across', 'right')]),
        L('A'),
        L('B'),
        B(),
        L('C'),
      ],
    ])
    const slots = deriveSlots(puzzle)
    expect(slots[0].cells).toEqual([
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ])
  })

  it('yields two slots for a cell holding an across + down clue', () => {
    const puzzle = puzzleOf([
      [
        makeClueCell([
          makeClue('Poikki', 'across', 'right'),
          makeClue('Alas', 'down', 'down'),
        ]),
        L('A'),
        L('B'),
      ],
      [L('C'), B(), B()],
      [L('D'), B(), B()],
    ])
    const slots = deriveSlots(puzzle)
    expect(slots).toHaveLength(2)
    const across = slots.find((s) => s.direction === 'across')!
    const down = slots.find((s) => s.direction === 'down')!
    expect(across.cells).toHaveLength(2)
    expect(down.cells).toEqual([
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ])
  })
})

describe('slotsForCell — intersections', () => {
  it('returns both slots that cross at a shared letter cell', () => {
    // (0,1) down clue and (1,0) right clue intersect at (1,1).
    const puzzle = puzzleOf([
      [B(), makeClueCell([makeClue('Alas', 'down', 'down')]), B()],
      [makeClueCell([makeClue('Poikki', 'across', 'right')]), L('X'), L('Y')],
      [B(), L('Z'), B()],
    ])
    const slots = deriveSlots(puzzle)
    expect(slots).toHaveLength(2)

    const atCross = slotsForCell(slots, { row: 1, col: 1 })
    expect(atCross).toHaveLength(2)

    const acrossOnly = slotsForCell(slots, { row: 1, col: 2 })
    expect(acrossOnly).toHaveLength(1)
    expect(acrossOnly[0].direction).toBe('across')
  })
})
