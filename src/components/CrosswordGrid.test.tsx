// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createEmptyPuzzle } from '../model'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { CrosswordGrid } from './CrosswordGrid'

afterEach(cleanup)

describe('CrosswordGrid', () => {
  it('renders one gridcell per matrix position', () => {
    const { container } = render(
      <CrosswordGrid puzzle={createEmptyPuzzle(2, 3)} />,
    )
    expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(6)
  })

  it('renders all three cell types and clue text from the sample', () => {
    const { container, getByText } = render(
      <CrosswordGrid puzzle={createSamplePuzzle()} />,
    )
    expect(container.querySelectorAll('.xcell--letter').length).toBeGreaterThan(
      0,
    )
    expect(container.querySelectorAll('.xcell--clue').length).toBeGreaterThan(0)
    expect(
      container.querySelectorAll('.xcell--blocked').length,
    ).toBeGreaterThan(0)
    // A clue's text is shown inside the grid.
    expect(getByText('Tervehdys')).toBeTruthy()
  })

  it('shows solution letters in letter cells', () => {
    const { getAllByText } = render(
      <CrosswordGrid puzzle={createSamplePuzzle()} />,
    )
    // 'K' appears in the sample (KISA across, KO bottom).
    expect(getAllByText('K').length).toBeGreaterThan(0)
  })

  it('sets the column template from the puzzle width', () => {
    const { container } = render(
      <CrosswordGrid puzzle={createEmptyPuzzle(4, 7)} cellSize={32} />,
    )
    const grid = container.querySelector('.xgrid') as HTMLElement
    expect(grid.style.gridTemplateColumns).toContain('repeat(7,')
  })

  it('reports the clicked coordinate when interactive', () => {
    const onSelect = vi.fn()
    const { container } = render(
      <CrosswordGrid
        puzzle={createEmptyPuzzle(2, 2)}
        onSelectCell={onSelect}
      />,
    )
    const cells = container.querySelectorAll('[role="gridcell"]')
    fireEvent.click(cells[3]) // row 1, col 1
    expect(onSelect).toHaveBeenCalledWith({ row: 1, col: 1 })
  })

  it('marks the selected cell and stays read-only without a handler', () => {
    const { container, rerender } = render(
      <CrosswordGrid puzzle={createEmptyPuzzle(2, 2)} />,
    )
    expect(container.querySelector('.is-interactive')).toBeNull()

    rerender(
      <CrosswordGrid
        puzzle={createEmptyPuzzle(2, 2)}
        selected={{ row: 0, col: 1 }}
        onSelectCell={() => {}}
      />,
    )
    const cells = container.querySelectorAll('[role="gridcell"]')
    expect(cells[1].className).toContain('is-selected')
    expect(cells[0].className).toContain('is-interactive')
  })
})
