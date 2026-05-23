// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { createEmptyPuzzle } from './model'
import { serializePuzzle } from './storage'

// jsdom lacks these browser APIs the app touches.
Element.prototype.scrollIntoView = vi.fn()
URL.createObjectURL = vi.fn(() => 'blob:x')
URL.revokeObjectURL = vi.fn()
window.print = vi.fn()

afterEach(() => {
  cleanup()
  localStorage.clear()
})

const items = (c: HTMLElement) => c.querySelectorAll('.library__item')
const rowButton = (item: Element, text: string) =>
  [...item.querySelectorAll('button')].find((b) => b.textContent === text)!

describe('App — puzzle survives the build/solve toggle', () => {
  it('keeps an edit made in build mode when switching to solve mode', () => {
    const { container, getByText } = render(<App />)
    // The app opens in solve mode; switch to build to make the edit.
    fireEvent.click(getByText('Rakenna'))
    // Edit the first clue cell (the default puzzle's first cell may be blocked).
    const clueCell = container.querySelector('[role="gridcell"].xcell--clue')!
    fireEvent.click(clueCell)
    const input = container.querySelector('.clue-row__text') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Muutettu' } })

    fireEvent.click(getByText('Ratkaise'))
    expect(container.querySelector('.solve')).toBeTruthy()
    expect(getByText('Muutettu')).toBeTruthy()
  })
})

describe('App — puzzle library', () => {
  const openLibrary = (getByText: (t: string) => HTMLElement) =>
    fireEvent.click(getByText('Kirjasto'))

  it('saves the current puzzle and lists it', () => {
    const { container, getByText } = render(<App />)
    openLibrary(getByText)
    fireEvent.click(getByText('Tallenna'))
    expect(items(container)).toHaveLength(1)
  })

  it('opens a saved puzzle into solve mode', () => {
    const { container, getByText } = render(<App />)
    openLibrary(getByText)
    fireEvent.click(getByText('Tallenna'))
    fireEvent.click(rowButton(items(container)[0], 'Avaa'))
    expect(container.querySelector('.solve')).toBeTruthy()
  })

  it('duplicates a saved puzzle with a (kopio) title', () => {
    const { container, getByText } = render(<App />)
    openLibrary(getByText)
    fireEvent.click(getByText('Tallenna'))
    fireEvent.click(rowButton(items(container)[0], 'Monista'))
    expect(items(container)).toHaveLength(2)
    expect(container.textContent).toContain('(kopio)')
  })

  it('renames a saved puzzle via prompt', () => {
    const prompt = vi.spyOn(window, 'prompt').mockReturnValue('Uusi nimi')
    const { container, getByText } = render(<App />)
    openLibrary(getByText)
    fireEvent.click(getByText('Tallenna'))
    fireEvent.click(rowButton(items(container)[0], 'Nimeä'))
    expect(items(container)[0].textContent).toContain('Uusi nimi')
    prompt.mockRestore()
  })

  it('deletes a saved puzzle after confirmation', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true)
    const { container, getByText } = render(<App />)
    openLibrary(getByText)
    fireEvent.click(getByText('Tallenna'))
    fireEvent.click(rowButton(items(container)[0], 'Poista'))
    expect(items(container)).toHaveLength(0)
    confirm.mockRestore()
  })

  it('imports a valid puzzle file into solve mode', async () => {
    const { container, getByText, findByText } = render(<App />)
    openLibrary(getByText)
    const json = serializePuzzle(createEmptyPuzzle(2, 2, 'Tuotu'))
    const input = container.querySelector(
      '.dropzone__input',
    ) as HTMLInputElement
    fireEvent.change(input, {
      target: {
        files: [new File([json], 'p.json', { type: 'application/json' })],
      },
    })
    expect(await findByText('Tuotu')).toBeTruthy() // solve heading shows title
    expect(container.querySelector('.solve')).toBeTruthy()
  })

  it('shows a friendly error for an invalid import file', async () => {
    const { container, getByText, findByText } = render(<App />)
    openLibrary(getByText)
    const input = container.querySelector(
      '.dropzone__input',
    ) as HTMLInputElement
    fireEvent.change(input, {
      target: { files: [new File(['{not json'], 'bad.json')] },
    })
    expect(await findByText(/Tiedostoa ei voitu lukea/)).toBeTruthy()
  })
})

describe('App — print', () => {
  it('opens the print overlay, toggles the answer key, and prints', () => {
    const { container, getByText, getByLabelText } = render(<App />)
    expect(container.querySelector('.print-overlay')).toBeNull()

    // The header "Tulosta" button is the only such text before the overlay opens.
    fireEvent.click(getByText('Tulosta'))
    const sheet = container.querySelector('.print-sheet') as HTMLElement
    expect(sheet).toBeTruthy()

    const filledLetters = () =>
      [...sheet.querySelectorAll('.xcell--letter')].filter((el) =>
        el.textContent?.trim(),
      ).length

    expect(filledLetters()).toBe(0) // blank puzzle by default
    fireEvent.click(getByLabelText('Näytä vastaukset'))
    expect(filledLetters()).toBeGreaterThan(0) // answer key reveals solutions

    fireEvent.click(getByText('Tulosta', { selector: 'button.btn' }))
    expect(window.print).toHaveBeenCalled()
  })

  it('closes the print overlay with the close button', () => {
    const { container, getByText } = render(<App />)
    fireEvent.click(getByText('Tulosta'))
    expect(container.querySelector('.print-overlay')).toBeTruthy()
    fireEvent.click(getByText('Sulje'))
    expect(container.querySelector('.print-overlay')).toBeNull()
  })
})

describe('App — help (Ohje)', () => {
  it('opens the help overlay with its sections and closes it', () => {
    const { container, getByText } = render(<App />)
    expect(container.querySelector('.help-overlay')).toBeNull()

    fireEvent.click(getByText('Ohje')) // header button (unique before opening)
    expect(container.querySelector('.help-overlay')).toBeTruthy()
    // A representative section heading renders.
    expect(getByText('Näppäimistö')).toBeTruthy()

    fireEvent.click(getByText('Sulje'))
    expect(container.querySelector('.help-overlay')).toBeNull()
  })
})

describe('App — first-run help nudge', () => {
  it('shows on a fresh profile, then stays gone after dismiss', () => {
    const first = render(<App />)
    expect(first.container.querySelector('.help-nudge')).toBeTruthy()
    fireEvent.click(
      first.container.querySelector('.help-nudge__close') as HTMLElement,
    )
    expect(first.container.querySelector('.help-nudge')).toBeNull()
    first.unmount()

    // Persisted: a fresh mount (same localStorage) no longer shows it.
    const second = render(<App />)
    expect(second.container.querySelector('.help-nudge')).toBeNull()
  })

  it('dismisses the nudge when the Ohje overlay is opened', () => {
    const { container, getByText } = render(<App />)
    expect(container.querySelector('.help-nudge')).toBeTruthy()
    fireEvent.click(getByText('Ohje'))
    expect(container.querySelector('.help-nudge')).toBeNull()
  })
})
