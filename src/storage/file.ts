import type { Puzzle } from '../model'
import { PuzzleParseError } from './schema'
import { deserializePuzzle, serializePuzzle } from './serialize'

/** Turn a puzzle title into a safe-ish file name stem. */
function fileStem(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9åäö]+/gi, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'sanaristikko'
}

/**
 * Trigger a browser download of the puzzle as a `.json` file.
 * Browser-only (uses Blob / DOM); not exercised in node tests.
 */
export function downloadPuzzle(puzzle: Puzzle, filename?: string): void {
  const json = serializePuzzle(puzzle, new Date().toISOString())
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  try {
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename ?? `${fileStem(puzzle.title)}.json`
    anchor.click()
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Read a user-picked `.json` file into a validated {@link Puzzle}.
 * Uses FileReader (works in browsers and jsdom). Rejects with a
 * {@link PuzzleParseError} if the file can't be read or isn't a valid puzzle.
 */
export function readPuzzleFile(file: File): Promise<Puzzle> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () =>
      reject(new PuzzleParseError('Could not read the file.'))
    reader.onload = () => {
      try {
        resolve(deserializePuzzle(String(reader.result)))
      } catch (error) {
        reject(error)
      }
    }
    reader.readAsText(file)
  })
}
