import { describe, expect, it } from 'vitest'
import {
  createEmptyPuzzle,
  makeBlockedCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  type Puzzle,
} from '../model'
import { PuzzleParseError } from './schema'
import { deserializePuzzle, serializePuzzle } from './serialize'

/** A small puzzle exercising all three cell variants and a two-clue cell. */
function samplePuzzle(): Puzzle {
  const base = createEmptyPuzzle(2, 3, 'Testiristikko')
  return {
    ...base,
    author: 'Tekijä',
    cells: [
      [
        makeClueCell([
          makeClue('Poikki', 'across', 'right'),
          makeClue('Alas', 'down', 'down'),
        ]),
        makeLetterCell('A'),
        makeLetterCell('B'),
      ],
      [makeBlockedCell(), makeLetterCell('C'), makeLetterCell('D')],
    ],
  }
}

describe('serialize / deserialize round-trip', () => {
  it('round-trips a puzzle to JSON and back identically', () => {
    const puzzle = samplePuzzle()
    const restored = deserializePuzzle(serializePuzzle(puzzle))
    expect(restored).toEqual(puzzle)
  })

  it('normalizes letters on the way back in', () => {
    // A hand-written file with a lowercase solution loads as uppercase.
    const json = JSON.stringify({
      schemaVersion: 1,
      puzzle: {
        title: 'x',
        rows: 1,
        cols: 1,
        cells: [[{ type: 'letter', solution: 'ä' }]],
      },
    })
    const puzzle = deserializePuzzle(json)
    expect(puzzle.cells[0][0]).toEqual({ type: 'letter', solution: 'Ä' })
  })
})

describe('deserialize rejects malformed input', () => {
  const cases: Record<string, string> = {
    'invalid JSON': '{not json',
    'wrong schema version': JSON.stringify({ schemaVersion: 99, puzzle: {} }),
    'missing puzzle': JSON.stringify({ schemaVersion: 1 }),
    'non-integer rows': JSON.stringify({
      schemaVersion: 1,
      puzzle: { title: 'x', rows: 1.5, cols: 1, cells: [] },
    }),
    'row/col dimension mismatch': JSON.stringify({
      schemaVersion: 1,
      puzzle: { title: 'x', rows: 1, cols: 2, cells: [[{ type: 'blocked' }]] },
    }),
    'unknown cell type': JSON.stringify({
      schemaVersion: 1,
      puzzle: {
        title: 'x',
        rows: 1,
        cols: 1,
        cells: [[{ type: 'wormhole' }]],
      },
    }),
    'invalid arrow': JSON.stringify({
      schemaVersion: 1,
      puzzle: {
        title: 'x',
        rows: 1,
        cols: 1,
        cells: [
          [
            {
              type: 'clue',
              clues: [{ text: 'q', direction: 'across', arrow: 'sideways' }],
            },
          ],
        ],
      },
    }),
    'invalid solution letter': JSON.stringify({
      schemaVersion: 1,
      puzzle: {
        title: 'x',
        rows: 1,
        cols: 1,
        cells: [[{ type: 'letter', solution: '7' }]],
      },
    }),
  }

  for (const [name, json] of Object.entries(cases)) {
    it(`rejects ${name}`, () => {
      expect(() => deserializePuzzle(json)).toThrow(PuzzleParseError)
    })
  }
})
