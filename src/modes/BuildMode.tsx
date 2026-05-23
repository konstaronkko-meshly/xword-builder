import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ClueEditor } from '../components/ClueEditor'
import { CrosswordGrid } from '../components/CrosswordGrid'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { fi } from '../i18n/fi'
import {
  deriveSlots,
  sameCoord,
  slotsForCell,
  stepInSlot,
  validatePuzzle,
} from '../logic'
import {
  getCell,
  isClueCell,
  isInBounds,
  isLetterCell,
  isValidLetter,
  makeClue,
  makeClueCell,
  makeLetterCell,
  setCellType,
  withCell,
  type Clue,
  type CellType,
  type Coord,
  type Direction,
} from '../model'

const straightArrow = (direction: Direction) =>
  direction === 'across' ? 'right' : 'down'

const CELL_TYPES: readonly CellType[] = ['letter', 'clue', 'blocked']

const ARROW_DELTAS: Record<string, Coord> = {
  ArrowUp: { row: -1, col: 0 },
  ArrowDown: { row: 1, col: 0 },
  ArrowLeft: { row: 0, col: -1 },
  ArrowRight: { row: 0, col: 1 },
}

export function BuildMode() {
  const [puzzle, setPuzzle] = useState(createSamplePuzzle)
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
      if (isInBounds(puzzle, next)) setSelected(next)
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
          setSelected(prev)
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
      if (next) setSelected(next)
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
        <h2 className="build__title">{puzzle.title}</h2>
        <p className="build__hint">{fi.build.editHint}</p>
      </header>

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
