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

export {
  clearSolveState,
  loadSolveState,
  saveSolveState,
  solveStateKey,
  type SolveState,
} from './solveState'
