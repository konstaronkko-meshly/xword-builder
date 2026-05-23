// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { BuildMode } from './BuildMode'

afterEach(cleanup)

const cellsOf = (c: HTMLElement) => c.querySelectorAll('[role="gridcell"]')
const app = (c: HTMLElement) =>
  c.querySelector('[role="application"]') as HTMLElement

// Sample layout: row 0 is [clue, K, I, S, A] → indices 0..4.

describe('BuildMode — letter entry', () => {
  it('types a letter into the selected letter cell', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[1]) // (0,1) = 'K'
    fireEvent.keyDown(app(container), { key: 'z' })
    expect(cellsOf(container)[1].textContent).toBe('Z') // normalized uppercase
  })

  it('advances along the active slot after typing', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[1]) // (0,1)
    fireEvent.keyDown(app(container), { key: 'q' })
    // Selection should have moved to (0,2); typing again writes there.
    fireEvent.keyDown(app(container), { key: 'w' })
    expect(cellsOf(container)[1].textContent).toBe('Q')
    expect(cellsOf(container)[2].textContent).toBe('W')
  })

  it('clears with Backspace', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[1]) // (0,1) = 'K'
    fireEvent.keyDown(app(container), { key: 'Backspace' })
    expect(cellsOf(container)[1].textContent).toBe('')
  })

  it('ignores non-Finnish keys', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[1]) // (0,1) = 'K'
    fireEvent.keyDown(app(container), { key: '%' })
    expect(cellsOf(container)[1].textContent).toBe('K') // unchanged
  })
})

describe('BuildMode — active slot highlight', () => {
  it('highlights the across slot of the selected cell', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[1]) // (0,1), part of across KISA (4 cells)
    expect(container.querySelectorAll('.is-active')).toHaveLength(4)
  })

  it('surfaces validation warnings for the sample', () => {
    const { container } = render(<BuildMode />)
    // The sample has orphan letter cells, so warning markers are present.
    expect(container.querySelectorAll('.is-warning').length).toBeGreaterThan(0)
  })
})

describe('BuildMode — clue editor', () => {
  it('shows the editor only for clue cells', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[1]) // (0,1) is a letter cell
    expect(container.querySelector('.clue-editor')).toBeNull()

    fireEvent.click(cellsOf(container)[0]) // (0,0) clue cell has two clues
    expect(container.querySelectorAll('.clue-row')).toHaveLength(2)
  })

  it('edits a clue text and reflects it in the grid cell', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[0]) // (0,0) clue cell
    const input = container.querySelector('.clue-row__text') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Uusi vihje' } })
    expect(cellsOf(container)[0].textContent).toContain('Uusi vihje')
  })

  it('adds a second clue to a one-clue cell', () => {
    const { container, getByText } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[11]) // (2,1) clue cell, one across clue
    expect(container.querySelectorAll('.clue-row')).toHaveLength(1)
    fireEvent.click(getByText('Lisää vihje'))
    expect(container.querySelectorAll('.clue-row')).toHaveLength(2)
  })

  it('removes a clue', () => {
    const { container } = render(<BuildMode />)
    fireEvent.click(cellsOf(container)[0]) // (0,0) clue cell, two clues
    const removeButtons = container.querySelectorAll('.clue-row__remove')
    fireEvent.click(removeButtons[0])
    expect(container.querySelectorAll('.clue-row')).toHaveLength(1)
  })
})

describe('BuildMode — grid management', () => {
  const stepperBtns = (c: HTMLElement, stepperIndex: number) => {
    const stepper = c.querySelectorAll('.stepper')[stepperIndex]
    return stepper.querySelectorAll('.stepper__btn')
  }

  it('grows the grid when increasing rows (no content dropped, no confirm)', () => {
    const { container } = render(<BuildMode />)
    expect(cellsOf(container)).toHaveLength(25) // 5×5
    fireEvent.click(stepperBtns(container, 0)[1]) // rows +
    expect(cellsOf(container)).toHaveLength(30) // 6×5
  })

  it('confirms before a resize that would drop content', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    const { container } = render(<BuildMode />)
    fireEvent.click(stepperBtns(container, 1)[0]) // cols − would drop column 4
    expect(confirm).toHaveBeenCalled()
    expect(cellsOf(container)).toHaveLength(25) // declined → unchanged
    confirm.mockRestore()
  })

  it('edits the title, reflected in the heading', () => {
    const { container, getByDisplayValue } = render(<BuildMode />)
    fireEvent.change(getByDisplayValue('Esimerkkiristikko'), {
      target: { value: 'Oma ristikko' },
    })
    expect(container.querySelector('.build__title')?.textContent).toBe(
      'Oma ristikko',
    )
  })

  it('clears the grid after confirmation', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const { container, getByText } = render(<BuildMode />)
    expect(container.querySelectorAll('.xcell--clue').length).toBeGreaterThan(0)
    fireEvent.click(getByText('Tyhjennä'))
    expect(container.querySelectorAll('.xcell--clue')).toHaveLength(0)
    confirm.mockRestore()
  })
})
