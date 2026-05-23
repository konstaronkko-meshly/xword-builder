// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { scrollCellIntoView } from './gridScroll'

describe('scrollCellIntoView', () => {
  it('scrolls the matching cell minimally into view', () => {
    const container = document.createElement('div')
    const cell = document.createElement('div')
    cell.setAttribute('data-coord', '2-3')
    const scroll = vi.fn()
    cell.scrollIntoView = scroll
    container.appendChild(cell)

    scrollCellIntoView(container, { row: 2, col: 3 })
    expect(scroll).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' })
  })

  it('is a no-op when the container or cell is missing', () => {
    expect(() => scrollCellIntoView(null, { row: 0, col: 0 })).not.toThrow()
    const empty = document.createElement('div')
    expect(() => scrollCellIntoView(empty, { row: 9, col: 9 })).not.toThrow()
  })
})
