// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
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
})
