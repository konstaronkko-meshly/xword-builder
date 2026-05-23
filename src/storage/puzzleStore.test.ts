import { beforeEach, describe, expect, it } from 'vitest'
import { createEmptyPuzzle } from '../model'
import { PUZZLE_PREFIX, PuzzleStore } from './puzzleStore'

/** Minimal in-memory implementation of the Web Storage interface. */
class MemoryStorage implements Storage {
  private map = new Map<string, string>()

  get length(): number {
    return this.map.size
  }
  clear(): void {
    this.map.clear()
  }
  getItem(key: string): string | null {
    return this.map.has(key) ? this.map.get(key)! : null
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value)
  }
  removeItem(key: string): void {
    this.map.delete(key)
  }
  key(index: number): string | null {
    return [...this.map.keys()][index] ?? null
  }
}

describe('PuzzleStore', () => {
  let storage: MemoryStorage
  let store: PuzzleStore

  beforeEach(() => {
    storage = new MemoryStorage()
    store = new PuzzleStore(storage)
  })

  it('saves and loads a puzzle round-trip', () => {
    const puzzle = createEmptyPuzzle(3, 3, 'Tallennettu')
    const id = store.save(puzzle)
    expect(store.load(id)).toEqual(puzzle)
  })

  it('returns null for an unknown id', () => {
    expect(store.load('does-not-exist')).toBeNull()
  })

  it('overwrites when saving with an existing id', () => {
    const id = store.save(createEmptyPuzzle(2, 2, 'Eka'))
    store.save(createEmptyPuzzle(4, 4, 'Toka'), id)
    expect(store.list()).toHaveLength(1)
    expect(store.load(id)?.title).toBe('Toka')
  })

  it('lists saved puzzles sorted newest-first and ignores foreign keys', () => {
    storage.setItem('unrelated', 'not a puzzle')
    store.save(createEmptyPuzzle(2, 2, 'Vanha'))
    store.save(createEmptyPuzzle(2, 2, 'Uusi'))

    const summaries = store.list()
    expect(summaries).toHaveLength(2)
    expect(summaries.map((s) => s.title).sort()).toEqual(['Uusi', 'Vanha'])
    // Descending by savedAt (string ISO timestamps compare lexicographically).
    expect(summaries[0].savedAt >= summaries[1].savedAt).toBe(true)
  })

  it('removes a puzzle', () => {
    const id = store.save(createEmptyPuzzle(2, 2, 'Poistettava'))
    store.remove(id)
    expect(store.load(id)).toBeNull()
    expect(store.list()).toHaveLength(0)
  })

  it('skips corrupt entries when listing', () => {
    const id = store.save(createEmptyPuzzle(2, 2, 'Ehjä'))
    storage.setItem(PUZZLE_PREFIX + 'broken', '{not json')
    const summaries = store.list()
    expect(summaries).toHaveLength(1)
    expect(summaries[0].id).toBe(id)
  })
})
