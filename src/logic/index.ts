// Core grid logic: word-slot derivation + validation — public surface.
export type { Slot } from './slots'
export {
  arrowDirection,
  deriveSlots,
  sameCoord,
  slotIndexOf,
  slotSolution,
  slotsForCell,
  stepInSlot,
} from './slots'

export type { ValidationIssue, ValidationIssueKind } from './validation'
export { isStructurallyValid, validatePuzzle } from './validation'
