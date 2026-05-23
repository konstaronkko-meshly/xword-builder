// Core grid logic: word-slot derivation + validation — public surface.
export type { Slot } from './slots'
export {
  arrowDirection,
  deriveSlots,
  isSolutionSlot,
  sameCoord,
  slotIndexOf,
  slotSolution,
  slotsForCell,
  solutionWordCells,
  stepInSlot,
} from './slots'

export type { ValidationIssue, ValidationIssueKind } from './validation'
export { isStructurallyValid, validatePuzzle } from './validation'

export type { CellStatus } from './solve'
export { cellStatus, isComplete, letterCoords, wrongCells } from './solve'
