import {
  isClueCell,
  isLetterCell,
  type Arrow,
  type Cell,
  type Coord,
  type Puzzle,
} from '../model'
import './CrosswordGrid.css'

/** Glyph drawn for each arrow kind (bent arrows included for completeness). */
const ARROW_GLYPH: Record<Arrow, string> = {
  right: '→',
  down: '↓',
  'down-then-right': '↳',
  'right-then-down': '⤵',
}

interface CrosswordGridProps {
  puzzle: Puzzle
  /** Pixel size of each square cell (default 48). */
  cellSize?: number
  /** Currently selected cell, if any (build mode). */
  selected?: Coord | null
  /** When provided, cells become clickable and report their coordinate. */
  onSelectCell?: (coord: Coord) => void
}

/**
 * Renders a puzzle as an equal-size square matrix. Pure presentation driven by
 * the model — letter, clue (text + arrows), and blocked cells. Hairline
 * gridlines come from a 1px gap over a dark background (no per-cell borders).
 * Pass `onSelectCell` to make it interactive (build mode).
 */
export function CrosswordGrid({
  puzzle,
  cellSize = 48,
  selected = null,
  onSelectCell,
}: CrosswordGridProps) {
  return (
    <div
      className="xgrid"
      role="grid"
      aria-label={puzzle.title || undefined}
      style={
        {
          gridTemplateColumns: `repeat(${puzzle.cols}, var(--xgrid-cell))`,
          '--xgrid-cell': `${cellSize}px`,
        } as React.CSSProperties
      }
    >
      {puzzle.cells.flatMap((row, r) =>
        row.map((cell, c) => (
          <CellView
            key={`${r}-${c}`}
            cell={cell}
            selected={selected?.row === r && selected.col === c}
            onSelect={
              onSelectCell ? () => onSelectCell({ row: r, col: c }) : undefined
            }
          />
        )),
      )}
    </div>
  )
}

function cellContent(cell: Cell) {
  if (isClueCell(cell)) {
    return cell.clues.map((clue, i) => (
      <span className="xcell__clue" key={i}>
        <span className="xcell__arrow">{ARROW_GLYPH[clue.arrow]}</span>
        <span className="xcell__text">{clue.text}</span>
      </span>
    ))
  }
  if (isLetterCell(cell)) return cell.solution
  return null
}

interface CellViewProps {
  cell: Cell
  selected: boolean
  onSelect?: () => void
}

function CellView({ cell, selected, onSelect }: CellViewProps) {
  const className =
    `xcell xcell--${cell.type}` +
    (selected ? ' is-selected' : '') +
    (onSelect ? ' is-interactive' : '')

  return (
    <div
      className={className}
      role="gridcell"
      aria-selected={onSelect ? selected : undefined}
      onClick={onSelect}
    >
      {cellContent(cell)}
    </div>
  )
}
