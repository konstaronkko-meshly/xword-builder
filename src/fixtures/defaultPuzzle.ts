import { fromPuzzleDocument } from '../storage'
import type { Puzzle } from '../model'
import esimerkki from './esimerkki.json'

/**
 * The puzzle the app opens with: the bundled `esimerkki.json` document.
 * Parsed through {@link fromPuzzleDocument} so it satisfies every model
 * invariant (letter normalization, clue-cell limits, matching dims) and a
 * malformed fixture fails loudly at startup rather than rendering garbage.
 * Returns a fresh `Puzzle` on each call (state is rebuilt via the factories).
 */
export function createDefaultPuzzle(): Puzzle {
  return fromPuzzleDocument(esimerkki)
}
