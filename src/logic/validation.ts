import { isLetterCell, type Clue, type Coord, type Puzzle } from '../model'
import { deriveSlots, type Slot } from './slots'

/**
 * Kinds of structural problems a puzzle can have. The logic layer only reports
 * the kind + location; the UI maps each kind to a Finnish message (keeping
 * user-facing text out of logic — see the Finnish-UI / English-code decision).
 */
export type ValidationIssueKind =
  | 'orphan-letter' // a letter cell no clue runs through
  | 'empty-clue' // a clue pointing at a non-letter cell or off the grid
  | 'direction-mismatch' // clue.direction disagrees with its arrow

export interface ValidationIssue {
  kind: ValidationIssueKind
  /** The cell the issue concerns (letter cell for orphans, clue cell otherwise). */
  coord: Coord
  /** Present for clue-related issues. */
  clue?: Clue
}

function coordKey(c: Coord): string {
  return `${c.row},${c.col}`
}

/**
 * Find structural issues in a puzzle. Pass pre-derived `slots` to avoid
 * re-deriving when the caller already has them.
 */
export function validatePuzzle(
  puzzle: Puzzle,
  slots: Slot[] = deriveSlots(puzzle),
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const covered = new Set<string>()

  for (const slot of slots) {
    for (const c of slot.cells) covered.add(coordKey(c))

    if (slot.cells.length === 0) {
      issues.push({
        kind: 'empty-clue',
        coord: slot.clueCoord,
        clue: slot.clue,
      })
    }
    if (slot.clue.direction !== slot.direction) {
      issues.push({
        kind: 'direction-mismatch',
        coord: slot.clueCoord,
        clue: slot.clue,
      })
    }
  }

  // Orphan letter cells: in play but reachable from no clue.
  for (let row = 0; row < puzzle.rows; row++) {
    for (let col = 0; col < puzzle.cols; col++) {
      const coord = { row, col }
      if (
        isLetterCell(puzzle.cells[row][col]) &&
        !covered.has(coordKey(coord))
      ) {
        issues.push({ kind: 'orphan-letter', coord })
      }
    }
  }

  return issues
}

/** True if the puzzle has no structural issues. */
export function isStructurallyValid(puzzle: Puzzle, slots?: Slot[]): boolean {
  return validatePuzzle(puzzle, slots).length === 0
}
