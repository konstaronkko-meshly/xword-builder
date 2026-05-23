import { describe, expect, it } from 'vitest'
import { createEmptyPuzzle } from '../model'
import {
  clearSolveState,
  loadSolveState,
  saveSolveState,
  solveStateKey,
} from './solveState'

class MemoryStorage implements Storage {
  private map = new Map<string, string>()
  get length() {
    return this.map.size
  }
  clear() {
    this.map.clear()
  }
  getItem(k: string) {
    return this.map.has(k) ? this.map.get(k)! : null
  }
  setItem(k: string, v: string) {
    this.map.set(k, v)
  }
  removeItem(k: string) {
    this.map.delete(k)
  }
  key(i: number) {
    return [...this.map.keys()][i] ?? null
  }
}

describe('solveState storage', () => {
  const puzzle = createEmptyPuzzle(2, 2, 'P')

  it('round-trips entries and resumes them', () => {
    const storage = new MemoryStorage()
    saveSolveState(puzzle, { '0-0': 'A', '1-1': 'B' }, storage)
    expect(loadSolveState(puzzle, storage)).toEqual({ '0-0': 'A', '1-1': 'B' })
  })

  it('returns an empty object when nothing is stored', () => {
    expect(loadSolveState(puzzle, new MemoryStorage())).toEqual({})
  })

  it('keys differ for different puzzles, match for identical ones', () => {
    const other = createEmptyPuzzle(3, 3, 'Q')
    expect(solveStateKey(puzzle)).not.toBe(solveStateKey(other))
    expect(solveStateKey(puzzle)).toBe(
      solveStateKey(createEmptyPuzzle(2, 2, 'P')),
    )
  })

  it('saving an empty state removes the entry', () => {
    const storage = new MemoryStorage()
    saveSolveState(puzzle, { '0-0': 'A' }, storage)
    saveSolveState(puzzle, {}, storage)
    expect(storage.getItem(solveStateKey(puzzle))).toBeNull()
  })

  it('ignores corrupt stored data', () => {
    const storage = new MemoryStorage()
    storage.setItem(solveStateKey(puzzle), '{not json')
    expect(loadSolveState(puzzle, storage)).toEqual({})
  })

  it('clears saved state', () => {
    const storage = new MemoryStorage()
    saveSolveState(puzzle, { '0-0': 'A' }, storage)
    clearSolveState(puzzle, storage)
    expect(loadSolveState(puzzle, storage)).toEqual({})
  })
})
