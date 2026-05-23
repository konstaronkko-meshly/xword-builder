// Persistence: localStorage + versioned JSON import/export — public surface.
export {
  PuzzleParseError,
  SCHEMA_VERSION,
  fromPuzzleDocument,
  toPuzzleDocument,
  type PuzzleDocument,
} from './schema'

export { deserializePuzzle, serializePuzzle } from './serialize'

export {
  PUZZLE_PREFIX,
  PuzzleStore,
  SOLVE_STATE_PREFIX,
  type PuzzleSummary,
} from './puzzleStore'

export { downloadPuzzle, readPuzzleFile } from './file'

export { hasSeenHelp, markHelpSeen } from './prefs'

export {
  clearSolveState,
  clearSolveTimer,
  loadSolveState,
  loadSolveTimer,
  saveSolveState,
  saveSolveTimer,
  solveStateKey,
  solveTimerKey,
  type SolveState,
  type SolveTimer,
} from './solveState'
