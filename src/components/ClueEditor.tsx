import { fi } from '../i18n/fi'
import type { Clue, Direction } from '../model'
import './ClueEditor.css'

const DIRECTIONS: readonly Direction[] = ['across', 'down']
const DIR_GLYPH: Record<Direction, string> = { across: '→', down: '↓' }

interface ClueEditorProps {
  clues: Clue[]
  onAdd: () => void
  onRemove: (index: number) => void
  onTextChange: (index: number, text: string) => void
  onDirectionChange: (index: number, direction: Direction) => void
}

/**
 * Editor for the clues of the selected clue cell (0–2 clues, at most one per
 * direction). Direction sets the matching straight arrow; bent arrows are
 * deferred. Presentational — all mutations go through the callbacks.
 */
export function ClueEditor({
  clues,
  onAdd,
  onRemove,
  onTextChange,
  onDirectionChange,
}: ClueEditorProps) {
  const usedDirections = clues.map((c) => c.direction)

  return (
    <div className="clue-editor">
      <h3 className="clue-editor__title">{fi.build.clueEditor.title}</h3>

      {clues.length === 0 && (
        <p className="clue-editor__empty">{fi.build.clueEditor.empty}</p>
      )}

      {clues.map((clue, index) => (
        <div className="clue-row" key={index}>
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

          <input
            className="clue-row__text"
            type="text"
            value={clue.text}
            placeholder={fi.build.clueEditor.text}
            aria-label={fi.build.clueEditor.text}
            onChange={(event) => onTextChange(index, event.target.value)}
          />

          <button
            type="button"
            className="clue-row__remove"
            aria-label={fi.build.clueEditor.remove}
            onClick={() => onRemove(index)}
          >
            ×
          </button>
        </div>
      ))}

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
