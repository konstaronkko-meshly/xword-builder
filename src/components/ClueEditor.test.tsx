// @vitest-environment jsdom
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeClue } from '../model'
import { ClueEditor } from './ClueEditor'

afterEach(cleanup)

const noop = () => {}
const baseProps = {
  onAdd: noop,
  onRemove: noop,
  onTextChange: noop,
  onDirectionChange: noop,
  onIconChange: noop,
}

describe('ClueEditor — picture clues', () => {
  it('opens the icon picker, searches, and reports the chosen icon', () => {
    const onIconChange = vi.fn()
    const { container, getByText, getByLabelText } = render(
      <ClueEditor
        {...baseProps}
        clues={[makeClue('', 'across', 'right')]}
        onIconChange={onIconChange}
      />,
    )
    // A text clue shows the text input until the author switches to Kuva.
    expect(container.querySelector('.clue-row__text')).toBeTruthy()

    fireEvent.click(getByText('Kuva'))
    const search = getByLabelText('Hae kuvaa…') as HTMLInputElement
    fireEvent.change(search, { target: { value: 'kissa' } })

    const firstItem = container.querySelector(
      '.icon-picker__item',
    ) as HTMLButtonElement
    fireEvent.click(firstItem)
    expect(onIconChange).toHaveBeenCalledWith(0, 'kissa')
  })

  it('shows the selected icon with a change button', () => {
    const { container, getByText } = render(
      <ClueEditor
        {...baseProps}
        clues={[makeClue('', 'across', 'right', 'kissa')]}
      />,
    )
    expect(container.querySelector('.clue-row__icon img')).toBeTruthy()
    expect(container.querySelector('.clue-row__text')).toBeNull()
    expect(getByText('Vaihda kuva')).toBeTruthy()
  })
})
