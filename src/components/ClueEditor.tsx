import { useState } from 'react'
import { fi } from '../i18n/fi'
import { ICON_ATTRIBUTION, ICONS, type IconId } from '../icons'
import type { Clue, Direction } from '../model'
import './ClueEditor.css'

const DIRECTIONS: readonly Direction[] = ['across', 'down']
const DIR_GLYPH: Record<Direction, string> = { across: '→', down: '↓' }
const ALL_ICONS = Object.values(ICONS)

interface ClueEditorProps {
  clues: Clue[]
  onAdd: () => void
  onRemove: (index: number) => void
  onTextChange: (index: number, text: string) => void
  onDirectionChange: (index: number, direction: Direction) => void
  onIconChange: (index: number, iconId: string) => void
}

/**
 * Editor for the clues of the selected clue cell (0–2 clues, at most one per
 * direction). A clue is either text or a picture: the Teksti/Kuva toggle
 * switches between a text input and a searchable icon picker. Direction sets
 * the matching straight arrow. Presentational — mutations go through callbacks.
 */
export function ClueEditor({
  clues,
  onAdd,
  onRemove,
  onTextChange,
  onDirectionChange,
  onIconChange,
}: ClueEditorProps) {
  const usedDirections = clues.map((c) => c.direction)
  // Which clue's icon picker is open, plus its search query.
  const [pickerIndex, setPickerIndex] = useState<number | null>(null)
  const [query, setQuery] = useState('')

  function openPicker(index: number) {
    setQuery('')
    setPickerIndex(index)
  }

  function pickIcon(index: number, iconId: string) {
    onIconChange(index, iconId)
    setPickerIndex(null)
  }

  const q = query.trim().toLowerCase()
  const results = q
    ? ALL_ICONS.filter(
        (icon) =>
          icon.label.toLowerCase().includes(q) ||
          icon.keywords.some((k) => k.toLowerCase().includes(q)),
      )
    : ALL_ICONS

  return (
    <div className="clue-editor">
      <h3 className="clue-editor__title">{fi.build.clueEditor.title}</h3>

      {clues.length === 0 && (
        <p className="clue-editor__empty">{fi.build.clueEditor.empty}</p>
      )}

      {clues.map((clue, index) => {
        const isIcon = !!clue.icon
        const picking = pickerIndex === index
        const selectedIcon = clue.icon ? ICONS[clue.icon as IconId] : undefined
        return (
          <div className="clue-row" key={index}>
            <div className="clue-row__top">
              <div
                className="clue-row__dirs"
                role="group"
                aria-label={fi.build.clueEditor.direction}
              >
                {DIRECTIONS.map((dir) => {
                  const takenByOther = usedDirections.some(
                    (d, j) => j !== index && d === dir,
                  )
                  return (
                    <button
                      key={dir}
                      type="button"
                      className={`dir-btn${clue.direction === dir ? ' is-active' : ''}`}
                      aria-pressed={clue.direction === dir}
                      disabled={takenByOther}
                      title={fi.build.clueEditor[dir]}
                      onClick={() => onDirectionChange(index, dir)}
                    >
                      {DIR_GLYPH[dir]}
                    </button>
                  )
                })}
              </div>

              <div
                className="clue-row__mode"
                role="group"
                aria-label={fi.build.clueEditor.title}
              >
                <button
                  type="button"
                  className={`mode-btn${!isIcon && !picking ? ' is-active' : ''}`}
                  aria-pressed={!isIcon && !picking}
                  onClick={() => {
                    setPickerIndex(null)
                    if (isIcon) onTextChange(index, '')
                  }}
                >
                  {fi.build.clueEditor.modeText}
                </button>
                <button
                  type="button"
                  className={`mode-btn${isIcon || picking ? ' is-active' : ''}`}
                  aria-pressed={isIcon || picking}
                  onClick={() => openPicker(index)}
                >
                  {fi.build.clueEditor.modeIcon}
                </button>
              </div>

              <button
                type="button"
                className="clue-row__remove"
                aria-label={fi.build.clueEditor.remove}
                onClick={() => onRemove(index)}
              >
                ×
              </button>
            </div>

            {picking ? (
              <div className="icon-picker">
                <input
                  className="icon-picker__search"
                  type="text"
                  value={query}
                  placeholder={fi.build.clueEditor.iconSearch}
                  aria-label={fi.build.clueEditor.iconSearch}
                  autoFocus
                  onChange={(event) => setQuery(event.target.value)}
                />
                {results.length === 0 ? (
                  <p className="icon-picker__empty">
                    {fi.build.clueEditor.noIconResults}
                  </p>
                ) : (
                  <ul className="icon-picker__grid">
                    {results.map((icon) => (
                      <li key={icon.id}>
                        <button
                          type="button"
                          className="icon-picker__item"
                          title={icon.label}
                          aria-label={icon.label}
                          onClick={() => pickIcon(index, icon.id)}
                        >
                          <img src={icon.src} alt={icon.label} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="icon-picker__credit">{ICON_ATTRIBUTION}</p>
              </div>
            ) : isIcon ? (
              <div className="clue-row__icon">
                {selectedIcon && (
                  <img src={selectedIcon.src} alt={selectedIcon.label} />
                )}
                <span className="clue-row__icon-label">
                  {selectedIcon?.label ?? clue.icon}
                </span>
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => openPicker(index)}
                >
                  {fi.build.clueEditor.iconChange}
                </button>
              </div>
            ) : (
              <input
                className="clue-row__text"
                type="text"
                value={clue.text}
                placeholder={fi.build.clueEditor.text}
                aria-label={fi.build.clueEditor.text}
                onChange={(event) => onTextChange(index, event.target.value)}
              />
            )}
          </div>
        )
      })}

      <button
        type="button"
        className="btn btn--ghost"
        disabled={clues.length >= 2}
        onClick={onAdd}
      >
        {fi.build.clueEditor.add}
      </button>
    </div>
  )
}
