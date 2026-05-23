// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { SolveMode } from './SolveMode'

Element.prototype.scrollIntoView = vi.fn()
afterEach(cleanup)

const cellsOf = (c: HTMLElement) => c.querySelectorAll('[role="gridcell"]')
const app = (c: HTMLElement) =>
  c.querySelector('[role="application"]') as HTMLElement

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
