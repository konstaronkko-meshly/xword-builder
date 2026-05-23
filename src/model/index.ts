// Puzzle data model & TypeScript types — public surface.
export type {
  Arrow,
  BlockedCell,
  Cell,
  Clue,
  ClueCell,
  Coord,
  Direction,
  LetterCell,
  Puzzle,
} from './types'

export {
  ARROWS,
  DIRECTIONS,
  FINNISH_LETTERS,
  MAX_CLUES_PER_CELL,
  isBlockedCell,
  isClueCell,
  isLetterCell,
  isValidLetter,
  makeBlockedCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  normalizeLetter,
} from './cells'

export {
  MAX_DIMENSION,
  createEmptyPuzzle,
  getCell,
  isInBounds,
  resizeDropsContent,
  resizePuzzle,
  setCellType,
  withCell,
  type CellType,
} from './puzzle'
