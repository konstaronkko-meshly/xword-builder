import {
  useMemo,
  useRef,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from 'react'
import { ClueEditor } from '../components/ClueEditor'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { useGridEntry } from '../components/useGridEntry'
import { fi } from '../i18n/fi'
import { solutionWordCells, validatePuzzle } from '../logic'
import {
  createEmptyPuzzle,
  getCell,
  isClueCell,
  isLetterCell,
  makeClue,
  makeClueCell,
  makeLetterCell,
  resizeDropsContent,
  resizePuzzle,
  setCellType,
  withCell,
  MAX_DIMENSION,
  type Clue,
  type CellType,
  type Direction,
  type Puzzle,
} from '../model'

const straightArrow = (direction: Direction) =>
  direction === 'across' ? 'right' : 'down'

const CELL_TYPES: readonly CellType[] = ['letter', 'clue', 'blocked']

interface StepperProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

function Stepper({ label, value, min, max, onChange }: StepperProps) {
  return (
    <div className="stepper">
      <span className="stepper__label">{label}</span>
      <div className="stepper__controls">
        <button
          type="button"
          className="stepper__btn"
          disabled={value <= min}
          aria-label={`${label}: ${fi.build.meta.decrease}`}
          onClick={() => onChange(value - 1)}
        >
          −
        </button>
        <span className="stepper__value">{value}</span>
        <button
          type="button"
          className="stepper__btn"
          disabled={value >= max}
          aria-label={`${label}: ${fi.build.meta.increase}`}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}

interface BuildModeProps {
  puzzle: Puzzle
  setPuzzle: Dispatch<SetStateAction<Puzzle>>
}

export function BuildMode({ puzzle, setPuzzle }: BuildModeProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  const {
    selected,
    setSelected,
    activeSlot,
    slots,
    selectCell,
    handleKeyDown,
    handleInput,
    inputRef,
  } = useGridEntry({
    puzzle,
    gridRef,
    getLetter: (coord) => {
      const cell = getCell(puzzle, coord)
      return cell && isLetterCell(cell) ? cell.solution : ''
    },
    setLetter: (coord, letter) =>
      setPuzzle((p) => withCell(p, coord, makeLetterCell(letter))),
  })

  const issues = useMemo(() => validatePuzzle(puzzle, slots), [puzzle, slots])

  function applyType(type: CellType) {
    if (selected) setPuzzle((p) => setCellType(p, selected, type))
  }

  // After shared nav/typing, build mode also maps 1–3 to cell types.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (handleKeyDown(event) || !selected) return
    const typeIndex = ['1', '2', '3'].indexOf(event.key)
    if (typeIndex >= 0) {
      event.preventDefault()
      applyType(CELL_TYPES[typeIndex])
    }
  }

  const selectedCell = selected ? getCell(puzzle, selected) : undefined
  const clueCell =
    selectedCell && isClueCell(selectedCell) ? selectedCell : undefined

  function setClues(clues: Clue[]) {
    if (selected) setPuzzle((p) => withCell(p, selected, makeClueCell(clues)))
  }

  function addClue() {
    if (!clueCell) return
    const direction: Direction = clueCell.clues.some(
      (c) => c.direction === 'across',
    )
      ? 'down'
      : 'across'
    setClues([
      ...clueCell.clues,
      makeClue('', direction, straightArrow(direction)),
    ])
  }

  function removeClue(index: number) {
    if (clueCell) setClues(clueCell.clues.filter((_, j) => j !== index))
  }

  function changeClueText(index: number, text: string) {
    if (!clueCell) return
    // Setting text drops any icon (text and icon are mutually exclusive).
    setClues(
      clueCell.clues.map((c, j) =>
        j === index ? makeClue(text, c.direction, c.arrow) : c,
      ),
    )
  }

  function changeClueIcon(index: number, iconId: string) {
    if (!clueCell) return
    // An icon clue carries no text.
    setClues(
      clueCell.clues.map((c, j) =>
        j === index ? makeClue('', c.direction, c.arrow, iconId) : c,
      ),
    )
  }

  function changeClueDirection(index: number, direction: Direction) {
    if (!clueCell) return
    if (
      clueCell.clues.some((c, j) => j !== index && c.direction === direction)
    ) {
      return // direction already used by the other clue
    }
    setClues(
      clueCell.clues.map((c, j) =>
        j === index
          ? makeClue(c.text, direction, straightArrow(direction), c.icon)
          : c,
      ),
    )
  }

  function resize(rows: number, cols: number) {
    if (
      resizeDropsContent(puzzle, rows, cols) &&
      !window.confirm(fi.build.meta.confirmResize)
    ) {
      return
    }
    setPuzzle((p) => resizePuzzle(p, rows, cols))
    setSelected(null)
  }

  function newPuzzle() {
    if (!window.confirm(fi.build.meta.confirmNew)) return
    setPuzzle((p) => createEmptyPuzzle(p.rows, p.cols))
    setSelected(null)
  }

  function clearGrid() {
    if (!window.confirm(fi.build.meta.confirmClear)) return
    setPuzzle((p) => ({
      ...createEmptyPuzzle(p.rows, p.cols, p.title),
      author: p.author,
    }))
    setSelected(null)
  }

  function changeTitle(title: string) {
    setPuzzle((p) => ({ ...p, title }))
  }

  function changeAuthor(author: string) {
    setPuzzle((p) => ({ ...p, author: author || undefined }))
  }

  return (
    <section className="build">
      <header className="build__head">
        <div className="placeholder__eyebrow">{fi.build.eyebrow}</div>
        <h2 className="build__title">{puzzle.title || ' '}</h2>
        <p className="build__hint">{fi.build.editHint}</p>
      </header>

      <div className="build__controls">
        <label className="field field--grow">
          <span>{fi.build.meta.title}</span>
          <input
            type="text"
            value={puzzle.title}
            onChange={(e) => changeTitle(e.target.value)}
          />
        </label>
        <label className="field">
          <span>{fi.build.meta.author}</span>
          <input
            type="text"
            value={puzzle.author ?? ''}
            onChange={(e) => changeAuthor(e.target.value)}
          />
        </label>
        <Stepper
          label={fi.build.meta.rows}
          value={puzzle.rows}
          min={1}
          max={MAX_DIMENSION}
          onChange={(rows) => resize(rows, puzzle.cols)}
        />
        <Stepper
          label={fi.build.meta.cols}
          value={puzzle.cols}
          min={1}
          max={MAX_DIMENSION}
          onChange={(cols) => resize(puzzle.rows, cols)}
        />
        <button type="button" className="btn btn--ghost" onClick={newPuzzle}>
          {fi.build.meta.newPuzzle}
        </button>
        <button type="button" className="btn btn--ghost" onClick={clearGrid}>
          {fi.build.meta.clear}
        </button>
      </div>

      <div
        className="build__toolbar"
        role="toolbar"
        aria-label={fi.build.tools.label}
      >
        {CELL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className="btn"
            disabled={!selected}
            onClick={() => applyType(type)}
          >
            {fi.build.tools[type]}
          </button>
        ))}
        <span className="build__status">
          {fi.build.tools.slots}: {slots.length}
          {issues.length > 0 && (
            <span className="build__status build__status--warn">
              {' · '}
              {fi.build.tools.warnings}: {issues.length}
            </span>
          )}
        </span>
      </div>

      <div className="build__layout">
        <div
          ref={gridRef}
          className="build__grid"
          role="application"
          aria-label={fi.build.tools.gridLabel}
          onKeyDown={onKeyDown}
          onInput={handleInput}
        >
          <input
            ref={inputRef}
            className="grid-input"
            aria-label={fi.build.tools.gridLabel}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <CrosswordGrid
            puzzle={puzzle}
            selected={selected}
            onSelectCell={selectCell}
            highlighted={activeSlot?.cells ?? []}
            warnings={issues.map((issue) => issue.coord)}
            solutionCells={solutionWordCells(slots)}
          />
        </div>

        {clueCell && (
          <aside className="build__panel">
            <ClueEditor
              clues={clueCell.clues}
              onAdd={addClue}
              onRemove={removeClue}
              onTextChange={changeClueText}
              onDirectionChange={changeClueDirection}
              onIconChange={changeClueIcon}
            />
          </aside>
        )}
      </div>
    </section>
  )
}
