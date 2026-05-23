// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { SolveMode } from './SolveMode'

afterEach(cleanup)

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
