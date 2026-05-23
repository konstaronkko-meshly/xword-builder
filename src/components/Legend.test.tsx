// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Legend } from './Legend'

afterEach(cleanup)

describe('Legend', () => {
  it('lists a swatch + label for every distinct grid symbol', () => {
    const { container, getByText } = render(<Legend />)
    expect(container.querySelectorAll('.legend__item')).toHaveLength(9)
    // Cell-type swatches reuse the real grid classes.
    expect(container.querySelector('.xcell--letter')).toBeTruthy()
    expect(container.querySelector('.xcell--clue')).toBeTruthy()
    expect(container.querySelector('.xcell--blocked')).toBeTruthy()
    // State swatches are present.
    expect(container.querySelector('.is-solution')).toBeTruthy()
    expect(container.querySelector('.is-active')).toBeTruthy()
    expect(container.querySelector('.is-wrong')).toBeTruthy()
    expect(container.querySelector('.is-warning')).toBeTruthy()
    // A representative Finnish label renders.
    expect(getByText(/Ratkaisusana/)).toBeTruthy()
  })
})
