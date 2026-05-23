import { describe, expect, it } from 'vitest'
import {
  MAX_CLUES_PER_CELL,
  isBlockedCell,
  isClueCell,
  isLetterCell,
  isValidLetter,
  makeBlockedCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  normalizeLetter,
} from './cells'

describe('normalizeLetter', () => {
  it('uppercases ASCII input', () => {
    expect(normalizeLetter('a')).toBe('A')
  })

  it('uppercases and preserves Finnish letters å/ä/ö', () => {
    expect(normalizeLetter('ä')).toBe('Ä')
    expect(normalizeLetter('ö')).toBe('Ö')
    expect(normalizeLetter('å')).toBe('Å')
  })

  it('trims surrounding whitespace', () => {
    expect(normalizeLetter('  k ')).toBe('K')
  })

  it('treats empty / whitespace-only as unfilled', () => {
    expect(normalizeLetter('')).toBe('')
    expect(normalizeLetter('   ')).toBe('')
  })

  it('rejects multi-character input', () => {
    expect(() => normalizeLetter('ab')).toThrow(RangeError)
  })

  it('rejects characters outside the Finnish alphabet', () => {
    expect(() => normalizeLetter('1')).toThrow(RangeError)
    expect(() => normalizeLetter('é')).toThrow(RangeError)
    expect(() => normalizeLetter('-')).toThrow(RangeError)
  })
})

describe('isValidLetter', () => {
  it('accepts single Finnish letters only', () => {
    expect(isValidLetter('A')).toBe(true)
    expect(isValidLetter('Ö')).toBe(true)
    expect(isValidLetter('a')).toBe(false) // not yet uppercased
    expect(isValidLetter('AB')).toBe(false)
    expect(isValidLetter('')).toBe(false)
  })
})

describe('cell factories and guards', () => {
  it('makeLetterCell normalizes its solution and is identified by its guard', () => {
    const cell = makeLetterCell('k')
    expect(cell).toEqual({ type: 'letter', solution: 'K' })
    expect(isLetterCell(cell)).toBe(true)
    expect(isClueCell(cell)).toBe(false)
    expect(isBlockedCell(cell)).toBe(false)
  })

  it('makeLetterCell defaults to an empty (unfilled) solution', () => {
    expect(makeLetterCell()).toEqual({ type: 'letter', solution: '' })
  })

  it('makeBlockedCell is identified by its guard', () => {
    const cell = makeBlockedCell()
    expect(cell).toEqual({ type: 'blocked' })
    expect(isBlockedCell(cell)).toBe(true)
    expect(isLetterCell(cell)).toBe(false)
  })

  it('makeClueCell holds one across + one down clue', () => {
    const cell = makeClueCell([
      makeClue('Pääkaupunki', 'across', 'right'),
      makeClue('Virta', 'down', 'down'),
    ])
    expect(isClueCell(cell)).toBe(true)
    expect(cell.clues).toHaveLength(2)
  })

  it('makeClueCell orders across before down regardless of input order', () => {
    const cell = makeClueCell([
      makeClue('Virta', 'down', 'down'),
      makeClue('Pääkaupunki', 'across', 'right'),
    ])
    expect(cell.clues.map((c) => c.direction)).toEqual(['across', 'down'])
  })

  it('makeClueCell leaves a single-clue cell direction unchanged', () => {
    const downOnly = makeClueCell([makeClue('Virta', 'down', 'down')])
    expect(downOnly.clues.map((c) => c.direction)).toEqual(['down'])
  })

  it('makeClueCell copies the input array (no shared reference)', () => {
    const clues = [makeClue('Vihje', 'across', 'right')]
    const cell = makeClueCell(clues)
    clues.push(makeClue('Toinen', 'down', 'down'))
    expect(cell.clues).toHaveLength(1)
  })

  it('makeClueCell rejects more than the max clues', () => {
    const tooMany = [
      makeClue('a', 'across', 'right'),
      makeClue('b', 'down', 'down'),
      makeClue('c', 'across', 'right'),
    ]
    expect(tooMany.length).toBeGreaterThan(MAX_CLUES_PER_CELL)
    expect(() => makeClueCell(tooMany)).toThrow(RangeError)
  })

  it('makeClueCell rejects two clues in the same direction', () => {
    expect(() =>
      makeClueCell([
        makeClue('a', 'across', 'right'),
        makeClue('b', 'across', 'right'),
      ]),
    ).toThrow(RangeError)
  })

  it('makeClue stores an icon for a picture clue (empty text)', () => {
    const clue = makeClue('', 'across', 'right', 'cat')
    expect(clue.icon).toBe('cat')
    expect(clue.text).toBe('')
  })

  it('makeClue omits the icon field when none is given', () => {
    const clue = makeClue('Kissa', 'across', 'right')
    expect('icon' in clue).toBe(false)
  })

  it('makeClue rejects a clue with both text and an icon', () => {
    expect(() => makeClue('Kissa', 'across', 'right', 'cat')).toThrow(
      RangeError,
    )
  })
})
