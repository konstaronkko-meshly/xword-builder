import type { Puzzle } from '../model'
import { SOLVE_STATE_PREFIX } from './puzzleStore'
import { serializePuzzle } from './serialize'

/** A solver's entered letters, keyed by `${row}-${col}`. */
export type SolveState = Record<string, string>

/** Resumable solve-timer state (elapsed solving time + whether started). */
export interface SolveTimer {
  elapsedSec: number
  started: boolean
}

/** Small stable string hash (djb2). */
function hash(input: string): string {
  let h = 5381
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h + input.charCodeAt(i)) >>> 0
  }
  return h.toString(36)
}

/** Per-puzzle storage namespace, derived from the puzzle's content. */
function puzzleKey(puzzle: Puzzle): string {
  return SOLVE_STATE_PREFIX + hash(serializePuzzle(puzzle))
}

/**
 * Stable storage key for a puzzle's solve state. Solve state lives under
 * SOLVE_STATE_PREFIX — never in the puzzle document. (Once puzzles have real
 * ids via the library, switch to those.)
 */
export function solveStateKey(puzzle: Puzzle): string {
  return puzzleKey(puzzle)
}

/** Storage key for the puzzle's solve timer (separate from the entries). */
export function solveTimerKey(puzzle: Puzzle): string {
  return `${puzzleKey(puzzle)}:timer`
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

function isSolveTimer(value: unknown): value is SolveTimer {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as SolveTimer).elapsedSec === 'number' &&
    typeof (value as SolveTimer).started === 'boolean'
  )
}

/** Load the saved solve timer, or a fresh zeroed timer if none/corrupt. */
export function loadSolveTimer(
  puzzle: Puzzle,
  storage: Storage = globalThis.localStorage,
): SolveTimer {
  const raw = storage.getItem(solveTimerKey(puzzle))
  if (!raw) return { elapsedSec: 0, started: false }
  try {
    const parsed: unknown = JSON.parse(raw)
    return isSolveTimer(parsed) ? parsed : { elapsedSec: 0, started: false }
  } catch {
    return { elapsedSec: 0, started: false }
  }
}

/** Persist the solve timer. An unstarted, zeroed timer removes the entry. */
export function saveSolveTimer(
  puzzle: Puzzle,
  timer: SolveTimer,
  storage: Storage = globalThis.localStorage,
): void {
  const key = solveTimerKey(puzzle)
  if (!timer.started && timer.elapsedSec === 0) storage.removeItem(key)
  else storage.setItem(key, JSON.stringify(timer))
}

/** Remove a puzzle's saved solve timer. */
export function clearSolveTimer(
  puzzle: Puzzle,
  storage: Storage = globalThis.localStorage,
): void {
  storage.removeItem(solveTimerKey(puzzle))
}
