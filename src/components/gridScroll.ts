import type { Coord } from '../model'

/**
 * Scroll the cell at `coord` into view within `container`, minimally (only if
 * it is off-screen). Cells are located by their `data-coord="row-col"`
 * attribute (stamped by CrosswordGrid). Call this only on KEYBOARD-driven
 * selection changes — not on click, where the cell was already visible.
 * No-op if the container or cell is missing.
 */
export function scrollCellIntoView(
  container: HTMLElement | null,
  { row, col }: Coord,
): void {
  const cell = container?.querySelector<HTMLElement>(
    `[data-coord="${row}-${col}"]`,
  )
  cell?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}
