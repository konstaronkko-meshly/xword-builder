import type { Puzzle } from '../model'
import { SOLVE_STATE_PREFIX } from './puzzleStore'
import { serializePuzzle } from './serialize'

/** A solver's entered letters, keyed by `${row}-${col}`. */
export type SolveState = Record<string, string>

/** Small stable string hash (djb2). */
function hash(input: string): string {
  let h = 5381
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) >>> 0
  }
  return h.toString(36)
}

/**
 * Stable storage key for a puzzle's solve state, derived from the puzzle's
 * content. Solve state lives under SOLVE_STATE_PREFIX — never in the puzzle
 * document. (Once puzzles have real ids via the library, switch to those.)
 */
export function solveStateKey(puzzle: Puzzle): string {
  return SOLVE_STATE_PREFIX + hash(serializePuzzle(puzzle))
}

function isStringRecord(value: unknown): value is SolveState {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === 'string')
  )
}

/** Load saved entries for a puzzle, or an empty object if none/corrupt. */
export function loadSolveState(
  puzzle: Puzzle,
  storage: Storage = globalThis.localStorage,
): SolveState {
  const raw = storage.getItem(solveStateKey(puzzle))
  if (!raw) return {}
  try {
    const parsed: unknown = JSON.parse(raw)
    return isStringRecord(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

/** Persist entries for a puzzle. An empty state removes the entry. */
export function saveSolveState(
  puzzle: Puzzle,
  state: SolveState,
  storage: Storage = globalThis.localStorage,
): void {
  const key = solveStateKey(puzzle)
  if (Object.keys(state).length === 0) storage.removeItem(key)
  else storage.setItem(key, JSON.stringify(state))
}

/** Remove a puzzle's saved solve state. */
export function clearSolveState(
  puzzle: Puzzle,
  storage: Storage = globalThis.localStorage,
): void {
  storage.removeItem(solveStateKey(puzzle))
}
