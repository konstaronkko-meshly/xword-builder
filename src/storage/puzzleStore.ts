import type { Puzzle } from '../model'
import { deserializePuzzle, serializePuzzle } from './serialize'
import type { PuzzleDocument } from './schema'

/** localStorage key prefix for saved puzzles. */
export const PUZZLE_PREFIX = 'xword:puzzle:'

/**
 * Reserved namespace for per-puzzle solve state. Solve progress is stored
 * separately from the puzzle (Phase 3) so the puzzle file never carries it.
 */
export const SOLVE_STATE_PREFIX = 'xword:solve:'

/** Lightweight listing entry for a saved puzzle. */
export interface PuzzleSummary {
  id: string
  title: string
  savedAt: string
}

function generateId(): string {
  return globalThis.crypto.randomUUID()
}

/**
 * Stores puzzles in a Web Storage backend. Defaults to `localStorage`; tests
 * (and any non-browser caller) can inject an in-memory `Storage`.
 */
export class PuzzleStore {
  private readonly storage: Storage

  constructor(storage: Storage = globalThis.localStorage) {
    this.storage = storage
  }

  /** Save a puzzle, returning its id. Pass an existing id to overwrite. */
  save(puzzle: Puzzle, id: string = generateId()): string {
    this.storage.setItem(
      PUZZLE_PREFIX + id,
      serializePuzzle(puzzle, new Date().toISOString()),
    )
    return id
  }

  /**
   * Load a puzzle by id, or `null` if none is stored.
   * @throws {PuzzleParseError} if the stored entry is corrupt.
   */
  load(id: string): Puzzle | null {
    const raw = this.storage.getItem(PUZZLE_PREFIX + id)
    return raw === null ? null : deserializePuzzle(raw)
  }

  /** Remove a saved puzzle (no-op if it does not exist). */
  remove(id: string): void {
    this.storage.removeItem(PUZZLE_PREFIX + id)
  }

  /** List saved puzzles, newest first. Corrupt entries are skipped. */
  list(): PuzzleSummary[] {
    const summaries: PuzzleSummary[] = []
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (!key?.startsWith(PUZZLE_PREFIX)) continue
      const raw = this.storage.getItem(key)
      if (!raw) continue
      try {
        const doc = JSON.parse(raw) as PuzzleDocument
        summaries.push({
          id: key.slice(PUZZLE_PREFIX.length),
          title: doc.puzzle?.title ?? '',
          savedAt: doc.savedAt ?? '',
        })
      } catch {
        // Skip an unparseable entry rather than failing the whole listing.
      }
    }
    return summaries.sort((a, b) => b.savedAt.localeCompare(a.savedAt))
  }
}
