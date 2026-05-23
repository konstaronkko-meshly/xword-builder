// @vitest-environment jsdom
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createEmptyPuzzle,
  makeClue,
  makeClueCell,
  makeLetterCell,
  withCell,
} from '../model'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { SolveMode } from './SolveMode'

Element.prototype.scrollIntoView = vi.fn()
afterEach(() => {
  cleanup()
  localStorage.clear() // solve state persists to jsdom localStorage
})

const cellsOf = (c: HTMLElement) => c.querySelectorAll('[role="gridcell"]')
const app = (c: HTMLElement) =>
  c.querySelector('[role="application"]') as HTMLElement

// A tiny solvable puzzle: clue at (0,0) → "KO" across at (0,1),(0,2).
function tinyPuzzle() {
  let p = createEmptyPuzzle(1, 3, 'Pikku')
  p = withCell(
    p,
    { row: 0, col: 0 },
    makeClueCell([makeClue('V', 'across', 'right')]),
  )
  p = withCell(p, { row: 0, col: 1 }, makeLetterCell('K'))
  p = withCell(p, { row: 0, col: 2 }, makeLetterCell('O'))
  return p
}

describe('SolveMode — render finished puzzle', () => {
  it('shows clues but leaves letter cells empty (never reveals solutions)', () => {
    const { container, getByText, queryByText } = render(
      <SolveMode puzzle={createSamplePuzzle()} />,
    )
    // Clues are visible to the solver.
    expect(getByText('Tervehdys')).toBeTruthy()
    // Letter cells render empty — solution letters must NOT appear as cell text.
    const letterCells = container.querySelectorAll('.xcell--letter')
    expect(letterCells.length).toBeGreaterThan(0)
    expect([...letterCells].every((c) => c.textContent === '')).toBe(true)
    // 'KISA' / 'VESI' solution letters are not rendered as standalone cells.
    expect(queryByText('K')).toBeNull()
    expect(queryByText('V')).toBeNull()
  })

  it('renders one gridcell per matrix position', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(25)
  })
})

describe('SolveMode — keyboard entry', () => {
  it('fills a letter cell and advances along the word', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    fireEvent.click(cellsOf(container)[1]) // (0,1), start of across KISA
    fireEvent.keyDown(app(container), { key: 'a' })
    fireEvent.keyDown(app(container), { key: 'b' })
    // Auto-advance writes consecutive cells along the slot.
    expect(cellsOf(container)[1].textContent).toBe('A')
    expect(cellsOf(container)[2].textContent).toBe('B')
  })

  it('clears an entered letter with Backspace', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    fireEvent.click(cellsOf(container)[1])
    fireEvent.keyDown(app(container), { key: 'a' })
    // Selection advanced to (0,2); go back to (0,1) and clear it.
    fireEvent.click(cellsOf(container)[1])
    fireEvent.keyDown(app(container), { key: 'Backspace' })
    expect(cellsOf(container)[1].textContent).toBe('')
  })

  it('highlights the active slot', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    fireEvent.click(cellsOf(container)[1]) // across KISA = 4 cells
    expect(container.querySelectorAll('.is-active')).toHaveLength(4)
  })
})

describe('SolveMode — click clue to focus answer', () => {
  it('focuses a single-clue cell answer start so typing fills it', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    fireEvent.click(cellsOf(container)[11]) // (2,1) clue 'Tervehdys' → answer at (2,2)
    fireEvent.keyDown(app(container), { key: 'z' })
    expect(cellsOf(container)[12].textContent).toBe('Z') // (2,2)
  })

  it('toggles between a two-clue cell across and down answers on re-click', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    // (0,0) owns across KISA (start (0,1)) and down VESI (start (1,0)).
    fireEvent.click(cellsOf(container)[0])
    fireEvent.keyDown(app(container), { key: 'a' }) // → (0,1)
    fireEvent.click(cellsOf(container)[0]) // selection still in across answer → toggle to down
    fireEvent.keyDown(app(container), { key: 'b' }) // → (1,0)
    expect(cellsOf(container)[1].textContent).toBe('A') // (0,1)
    expect(cellsOf(container)[5].textContent).toBe('B') // (1,0)
  })

  it('highlights the clicked clue answer slot', () => {
    const { container } = render(<SolveMode puzzle={createSamplePuzzle()} />)
    fireEvent.click(cellsOf(container)[0]) // → across KISA, 4 cells
    expect(container.querySelectorAll('.is-active')).toHaveLength(4)
  })
})

describe('SolveMode — check / reveal / completion / resume', () => {
  const byText = (c: HTMLElement, t: string) =>
    [...c.querySelectorAll('button')].find((b) => b.textContent === t)!

  it('flags a wrong entry on Tarkista', () => {
    const { container } = render(<SolveMode puzzle={tinyPuzzle()} />)
    fireEvent.click(cellsOf(container)[1]) // (0,1), solution 'K'
    fireEvent.keyDown(app(container), { key: 'x' }) // wrong
    fireEvent.click(byText(container, 'Tarkista'))
    expect(cellsOf(container)[1].classList.contains('is-wrong')).toBe(true)
  })

  it('reveals the selected letter with the solution', () => {
    const { container } = render(<SolveMode puzzle={tinyPuzzle()} />)
    fireEvent.click(cellsOf(container)[1])
    fireEvent.click(byText(container, 'Paljasta kirjain'))
    expect(cellsOf(container)[1].textContent).toBe('K')
  })

  it('reveals a whole word and detects completion', () => {
    const { container, queryByText } = render(
      <SolveMode puzzle={tinyPuzzle()} />,
    )
    expect(queryByText('Valmis! Ristikko on oikein.')).toBeNull()
    fireEvent.click(cellsOf(container)[1]) // focus the across word
    fireEvent.click(byText(container, 'Paljasta sana'))
    expect(cellsOf(container)[1].textContent).toBe('K')
    expect(cellsOf(container)[2].textContent).toBe('O')
    expect(queryByText(/Valmis! Ristikko on oikein\./)).toBeTruthy()
  })

  it('resumes entered letters after a remount (persistence)', () => {
    const puzzle = tinyPuzzle()
    const first = render(<SolveMode puzzle={puzzle} />)
    fireEvent.click(cellsOf(first.container)[1])
    fireEvent.keyDown(app(first.container), { key: 'k' })
    expect(cellsOf(first.container)[1].textContent).toBe('K')
    first.unmount()

    const second = render(<SolveMode puzzle={puzzle} />)
    expect(cellsOf(second.container)[1].textContent).toBe('K')
  })

  it('clears all entries with Tyhjennä', () => {
    const { container } = render(<SolveMode puzzle={tinyPuzzle()} />)
    fireEvent.click(cellsOf(container)[1])
    fireEvent.keyDown(app(container), { key: 'k' })
    fireEvent.click(byText(container, 'Tyhjennä'))
    expect(cellsOf(container)[1].textContent).toBe('')
  })
})

describe('SolveMode — solve timer', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  const timerText = (c: HTMLElement) =>
    c.querySelector('.solve__timer')?.textContent ?? ''

  it('starts on first entry and ticks each second', () => {
    const { container } = render(<SolveMode puzzle={tinyPuzzle()} />)
    expect(timerText(container)).toContain('00:00') // not started yet
    fireEvent.click(cellsOf(container)[1])
    fireEvent.keyDown(app(container), { key: 'x' }) // first interaction → starts
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(timerText(container)).toContain('00:03')
  })

  it('stops the timer and shows the time in the completion banner', () => {
    const { container } = render(<SolveMode puzzle={tinyPuzzle()} />)
    fireEvent.click(cellsOf(container)[1])
    fireEvent.keyDown(app(container), { key: 'k' }) // K (correct) → starts timer
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    // Complete the puzzle: type O in (0,2).
    fireEvent.keyDown(app(container), { key: 'o' })
    const done = container.querySelector('.solve__done')
    expect(done?.textContent).toContain('Valmis')
    expect(done?.textContent).toMatch(/00:0\d/) // time frozen in the banner
    // Timer no longer advances after completion.
    const frozen = timerText(container)
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(timerText(container)).toBe(frozen)
  })

  it('resumes elapsed time after a remount', () => {
    const puzzle = tinyPuzzle()
    const first = render(<SolveMode puzzle={puzzle} />)
    fireEvent.click(cellsOf(first.container)[1])
    fireEvent.keyDown(app(first.container), { key: 'x' })
    act(() => {
      vi.advanceTimersByTime(4000)
    })
    expect(timerText(first.container)).toContain('00:04')
    first.unmount()

    const second = render(<SolveMode puzzle={puzzle} />)
    expect(timerText(second.container)).toContain('00:04')
  })
})
