import { fi } from '../i18n/fi'
import './CrosswordGrid.css' // reuse the real .xcell styling for the swatches
import './Legend.css'

const L = fi.help.symbols.legend

/**
 * Symbol key for the Ohje overlay. Each row pairs a real grid swatch (the same
 * .xcell classes the grid uses, so colors/states match exactly) with a Finnish
 * label. Bent arrows are intentionally omitted — they aren't exposed yet.
 */
export function Legend() {
  return (
    <ul className="legend">
      <li className="legend__item">
        <span className="xcell xcell--letter">A</span>
        <span className="legend__label">{L.letter}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--clue" />
        <span className="legend__label">{L.clue}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--blocked" />
        <span className="legend__label">{L.blocked}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--clue legend__arrow">→</span>
        <span className="legend__label">{L.arrowRight}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--clue legend__arrow">↓</span>
        <span className="legend__label">{L.arrowDown}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--letter is-solution">A</span>
        <span className="legend__label">{L.solution}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--letter is-active">A</span>
        <span className="legend__label">{L.active}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--letter is-wrong">A</span>
        <span className="legend__label">{L.wrong}</span>
      </li>
      <li className="legend__item">
        <span className="xcell xcell--letter is-warning">A</span>
        <span className="legend__label">{L.warning}</span>
      </li>
    </ul>
  )
}
