import {
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from 'react'
import { ClueEditor } from '../components/ClueEditor'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { scrollCellIntoView } from '../components/gridScroll'
import { fi } from '../i18n/fi'
import {
  deriveSlots,
  sameCoord,
  slotsForCell,
  stepInSlot,
  validatePuzzle,
} from '../logic'
import {
  createEmptyPuzzle,
  getCell,
  isClueCell,
  isInBounds,
  isLetterCell,
  isValidLetter,
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
  type Coord,
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

const ARROW_DELTAS: Record<string, Coord> = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
}

interface BuildModeProps {
  puzzle: Puzzle
  setPuzzle: Dispatch<SetStateAction<Puzzle>>
}

export function BuildMode({ puzzle, setPuzzle }: BuildModeProps) {
  const [selected, setSelected] = useState<Coord | null>(null)
  const [direction, setDirection] = useState<Direction>('across')
  const gridRef = useRef<HTMLDivElement>(null)

  const slots = useMemo(() => deriveSlots(puzzle), [puzzle])
  const issues = useMemo(() => validatePuzzle(puzzle, slots), [puzzle, slots])

  // The active slot: prefer one passing through the selected cell in the
  // current direction, else any through it, else one the cell *owns* (clue cell).
  const activeSlot = useMemo(() => {
    if (!selected) return undefined
    const candidates = [
      ...slotsForCell(slots, selected),
      ...slots.filter((s) => sameCoord(s.clueCoord, selected)),
    ]
    return candidates.find((s) => s.direction === direction) ?? candidates[0]
  }, [selected, direction, slots])

  function applyType(type: CellType) {
    if (selected) setPuzzle((p) => setCellType(p, selected, type))
  }

  function setLetterAt(coord: Coord, letter: string) {
    setPuzzle((p) => withCell(p, coord, makeLetterCell(letter)))
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
    setClues(
      clueCell.clues.map((c, j) =>
        j === index ? makeClue(text, c.direction, c.arrow) : c,
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
        j === index ? makeClue(c.text, direction, straightArrow(direction)) : c,
      ),
    )
  }

  function selectCell(coord: Coord) {
    // Re-selecting the same cell toggles the active across/down direction.
    if (selected && sameCoord(selected, coord)) {
      setDirection((d) => (d === 'across' ? 'down' : 'across'))
    } else {
      setSelected(coord)
    }
    gridRef.current?.focus()
  }

  // Move the selection from the keyboard, keeping the target cell in view.
  // (Click selection does not scroll — the clicked cell was already visible.)
  function selectByKeyboard(coord: Coord) {
    setSelected(coord)
    scrollCellIntoView(gridRef.current, coord)
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

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!selected) return
    const { key } = event

    const delta = ARROW_DELTAS[key]
    if (delta) {
      event.preventDefault()
      const next = {
        row: selected.row + delta.row,
        col: selected.col + delta.col,
      }
      if (isInBounds(puzzle, next)) selectByKeyboard(next)
      return
    }

    if (key === 'Backspace') {
      event.preventDefault()
      const cell = getCell(puzzle, selected)
      if (cell && isLetterCell(cell) && cell.solution !== '') {
        setLetterAt(selected, '')
      } else if (activeSlot) {
        const prev = stepInSlot(activeSlot, selected, -1)
        if (prev) {
          selectByKeyboard(prev)
          setLetterAt(prev, '')
        }
      }
      return
    }

    if (event.ctrlKey || event.metaKey || event.altKey || key.length !== 1)
      return

    const cell = getCell(puzzle, selected)
    const upper = key.toUpperCase()
    if (cell && isLetterCell(cell) && isValidLetter(upper)) {
      event.preventDefault()
      setLetterAt(selected, upper)
      const next = activeSlot && stepInSlot(activeSlot, selected, 1)
      if (next) selectByKeyboard(next)
      return
    }

    const typeIndex = ['1', '2', '3'].indexOf(key)
    if (typeIndex >= 0) {
      event.preventDefault()
      applyType(CELL_TYPES[typeIndex])
    }
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
          tabIndex={0}
          role="application"
          aria-label={fi.build.tools.gridLabel}
          onKeyDown={handleKeyDown}
        >
          <CrosswordGrid
            puzzle={puzzle}
            selected={selected}
            onSelectCell={selectCell}
            highlighted={activeSlot?.cells ?? []}
            warnings={issues.map((issue) => issue.coord)}
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
            />
          </aside>
        )}
      </div>
    </section>
  )
}
