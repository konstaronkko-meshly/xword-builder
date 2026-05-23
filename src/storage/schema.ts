import {
  ARROWS,
  DIRECTIONS,
  makeBlockedCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  type Arrow,
  type Cell,
  type Clue,
  type Direction,
  type Puzzle,
} from '../model'
import { ICON_IDS } from '../icons/iconData'

/** Current on-disk schema version. Bump + migrate when the format changes. */
export const SCHEMA_VERSION = 2

/**
 * Schema versions this build can read. v2 added the optional picture-clue
 * `icon` field; that field is additive, so v1 documents (which simply lack it)
 * parse unchanged — no per-version branching is needed beyond accepting both.
 */
const SUPPORTED_VERSIONS: readonly number[] = [1, 2]

/**
 * The serialized form of a puzzle. Solve state is deliberately NOT included —
 * it lives under a separate storage namespace (see SOLVE_STATE_PREFIX) so
 * sharing a puzzle never leaks or depends on a solver's progress.
 */
export interface PuzzleDocument {
  schemaVersion: number
  /** ISO timestamp; set when persisted locally, optional in exported files. */
  savedAt?: string
  puzzle: Puzzle
}

/** Thrown when input cannot be parsed into a valid {@link Puzzle}. */
export class PuzzleParseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PuzzleParseError'
  }
}

function fail(message: string): never {
  throw new PuzzleParseError(message)
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseClue(raw: unknown, where: string): Clue {
  if (!isObject(raw)) fail(`${where}: clue must be an object.`)
  const { text, direction, arrow, icon } = raw
  if (typeof text !== 'string') fail(`${where}: clue text must be a string.`)
  if (!(DIRECTIONS as readonly string[]).includes(direction as string)) {
    fail(`${where}: invalid clue direction ${JSON.stringify(direction)}.`)
  }
  if (!(ARROWS as readonly string[]).includes(arrow as string)) {
    fail(`${where}: invalid clue arrow ${JSON.stringify(arrow)}.`)
  }
  if (icon !== undefined && typeof icon !== 'string') {
    fail(`${where}: clue icon must be a string when present.`)
  }
  if (
    typeof icon === 'string' &&
    icon !== '' &&
    !(ICON_IDS as readonly string[]).includes(icon)
  ) {
    fail(`${where}: unknown clue icon ${JSON.stringify(icon)}.`)
  }
  return rebuild(
    () =>
      makeClue(
        text,
        direction as Direction,
        arrow as Arrow,
        icon as string | undefined,
      ),
    where,
  )
}

/** Run a model factory, converting its invariant errors into parse errors. */
function rebuild<T>(make: () => T, where: string): T {
  try {
    return make()
  } catch (e) {
    fail(`${where}: ${(e as Error).message}`)
  }
}

function parseCell(raw: unknown, where: string): Cell {
  if (!isObject(raw)) fail(`${where}: cell must be an object.`)
  switch (raw.type) {
    case 'letter':
      if (typeof raw.solution !== 'string') {
        fail(`${where}: letter cell solution must be a string.`)
      }
      return rebuild(() => makeLetterCell(raw.solution as string), where)
    case 'clue': {
      if (!Array.isArray(raw.clues)) {
        fail(`${where}: clue cell needs a clues array.`)
      }
      const clues = raw.clues.map((c, i) =>
        parseClue(c, `${where}.clues[${i}]`),
      )
      return rebuild(() => makeClueCell(clues), where)
    }
    case 'blocked':
      return makeBlockedCell()
    default:
      fail(`${where}: unknown cell type ${JSON.stringify(raw.type)}.`)
  }
}

function parsePuzzle(raw: unknown): Puzzle {
  if (!isObject(raw)) fail('puzzle must be an object.')
  const { title, author, rows, cols, cells } = raw

  if (typeof title !== 'string') fail('puzzle.title must be a string.')
  if (author !== undefined && typeof author !== 'string') {
    fail('puzzle.author must be a string when present.')
  }
  if (!Number.isInteger(rows) || (rows as number) < 1) {
    fail('puzzle.rows must be a positive integer.')
  }
  if (!Number.isInteger(cols) || (cols as number) < 1) {
    fail('puzzle.cols must be a positive integer.')
  }
  if (!Array.isArray(cells) || cells.length !== rows) {
    fail(`puzzle.cells must have ${rows} rows.`)
  }

  const parsed: Cell[][] = (cells as unknown[]).map((row, r) => {
    if (!Array.isArray(row) || row.length !== cols) {
      fail(`puzzle.cells[${r}] must have ${cols} columns.`)
    }
    return (row as unknown[]).map((cell, c) =>
      parseCell(cell, `cells[${r}][${c}]`),
    )
  })

  const result: Puzzle = {
    title,
    rows: rows as number,
    cols: cols as number,
    cells: parsed,
  }
  if (typeof author === 'string') result.author = author
  return result
}

/** Wrap a puzzle in the current document envelope. */
export function toPuzzleDocument(
  puzzle: Puzzle,
  savedAt?: string,
): PuzzleDocument {
  const doc: PuzzleDocument = { schemaVersion: SCHEMA_VERSION, puzzle }
  if (savedAt) doc.savedAt = savedAt
  return doc
}

/**
 * Validate an untrusted document and rebuild a normalized {@link Puzzle}.
 * Rebuilding through the model factories guarantees the result satisfies all
 * model invariants (letter normalization, clue-cell limits, matching dims).
 * @throws {PuzzleParseError} on any malformed input.
 */
export function fromPuzzleDocument(raw: unknown): Puzzle {
  if (!isObject(raw)) fail('document must be an object.')
  if (!SUPPORTED_VERSIONS.includes(raw.schemaVersion as number)) {
    fail(
      `unsupported schemaVersion ${JSON.stringify(raw.schemaVersion)}; ` +
        `expected one of ${SUPPORTED_VERSIONS.join(', ')}.`,
    )
  }
  return parsePuzzle(raw.puzzle)
}
