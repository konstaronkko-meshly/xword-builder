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
    const cells = () => container.querySelectorAll('[role="gridcell"]')
    fireEvent.click(cells()[0])
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

  it('opens a saved puzzle into build mode', () => {
    const { container, getByText } = render(<App />)
    openLibrary(getByText)
    fireEvent.click(getByText('Tallenna'))
    fireEvent.click(rowButton(items(container)[0], 'Avaa'))
    expect(container.querySelector('.build')).toBeTruthy()
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

  it('imports a valid puzzle file into build mode', async () => {
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
    expect(await findByText('Tuotu')).toBeTruthy() // build heading
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
