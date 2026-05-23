// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

// jsdom doesn't implement scrollIntoView.
Element.prototype.scrollIntoView = vi.fn()
afterEach(cleanup)

describe('App — puzzle survives the build/solve toggle', () => {
  it('keeps an edit made in build mode when switching to solve mode', () => {
    const { container, getByText } = render(<App />)

    // Build mode: edit the first clue of the (0,0) clue cell.
    const cells = () => container.querySelectorAll('[role="gridcell"]')
    fireEvent.click(cells()[0])
    const input = container.querySelector('.clue-row__text') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Muutettu' } })

    // Switch to solve mode — the same (lifted) puzzle should render the edit.
    fireEvent.click(getByText('Ratkaise'))
    expect(container.querySelector('.solve')).toBeTruthy()
    expect(getByText('Muutettu')).toBeTruthy()
  })
})
