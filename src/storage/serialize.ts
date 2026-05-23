import type { Puzzle } from '../model'
import {
  PuzzleParseError,
  fromPuzzleDocument,
  toPuzzleDocument,
} from './schema'

/** Serialize a puzzle to pretty-printed JSON (the export/file format). */
export function serializePuzzle(puzzle: Puzzle, savedAt?: string): string {
  return JSON.stringify(toPuzzleDocument(puzzle, savedAt), null, 2)
}

/**
 * Parse JSON text into a validated, normalized {@link Puzzle}.
 * @throws {PuzzleParseError} on invalid JSON or a malformed document.
 */
export function deserializePuzzle(json: string): Puzzle {
  let raw: unknown
  try {
    raw = JSON.parse(json)
  } catch {
    throw new PuzzleParseError('File is not valid JSON.')
  }
  return fromPuzzleDocument(raw)
}
