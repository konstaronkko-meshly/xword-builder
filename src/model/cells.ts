import type {
  Arrow,
  BlockedCell,
  Cell,
  Clue,
  ClueCell,
  Direction,
  LetterCell,
} from './types'

/** All answer directions (runtime list, kept in sync with {@link Direction}). */
export const DIRECTIONS = [
  'across',
  'down',
] as const satisfies readonly Direction[]

/** All arrow kinds (runtime list, kept in sync with {@link Arrow}). */
export const ARROWS = [
  'right',
  'down',
  'down-then-right',
  'right-then-down',
] as const satisfies readonly Arrow[]

/** The Finnish alphabet, in collation order. Single uppercase graphemes. */
export const FINNISH_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'

const LETTER_SET = new Set(FINNISH_LETTERS)

/** At most one across + one down clue can start from a single cell. */
export const MAX_CLUES_PER_CELL = 2

/** True if `ch` is exactly one character of the Finnish alphabet. */
export function isValidLetter(ch: string): boolean {
  return [...ch].length === 1 && LETTER_SET.has(ch)
}

/**
 * Normalize a letter-cell solution input.
 * - Trims and uppercases (ä→Ä, ö→Ö, å→Å).
 * - `''` (empty) is allowed and means "not yet filled".
 * - Throws `RangeError` if the non-empty result is not a single Finnish letter.
 */
export function normalizeLetter(input: string): string {
  const ch = input.trim().toUpperCase()
  if (ch === '') return ''
  if (!isValidLetter(ch)) {
    throw new RangeError(
      `Invalid letter ${JSON.stringify(input)}: expected a single Finnish ` +
        `alphabet character (A–Ö, incl. Å, Ä, Ö).`,
    )
  }
  return ch
}

// ---- Factories ----

/** Create a letter cell. `solution` is normalized; defaults to empty. */
export function makeLetterCell(solution = ''): LetterCell {
  return { type: 'letter', solution: normalizeLetter(solution) }
}

/** Create a clue. */
export function makeClue(
  text: string,
  direction: Direction,
  arrow: Arrow,
): Clue {
  return { text, direction, arrow }
}

/**
 * Create a clue cell. Enforces the arrow-word invariants:
 * at most {@link MAX_CLUES_PER_CELL} clues, and at most one per direction.
 */
export function makeClueCell(clues: Clue[] = []): ClueCell {
  if (clues.length > MAX_CLUES_PER_CELL) {
    throw new RangeError(
      `A clue cell holds at most ${MAX_CLUES_PER_CELL} clues, got ${clues.length}.`,
    )
  }
  const directions = new Set(clues.map((c) => c.direction))
  if (directions.size !== clues.length) {
    throw new RangeError('A clue cell may hold at most one clue per direction.')
  }
  return { type: 'clue', clues: [...clues] }
}

/** Create a blocked (not-in-play) cell. */
export function makeBlockedCell(): BlockedCell {
  return { type: 'blocked' }
}

// ---- Type guards ----

export function isLetterCell(cell: Cell): cell is LetterCell {
  return cell.type === 'letter'
}

export function isClueCell(cell: Cell): cell is ClueCell {
  return cell.type === 'clue'
}

export function isBlockedCell(cell: Cell): cell is BlockedCell {
  return cell.type === 'blocked'
}
