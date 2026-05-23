import { CrosswordGrid } from '../components/CrosswordGrid'
import { createSamplePuzzle } from '../fixtures/samplePuzzle'
import { fi } from '../i18n/fi'

// Static sample for now; the editing state arrives with the cell-assignment task.
const samplePuzzle = createSamplePuzzle()

export function BuildMode() {
  return (
    <section className="build">
      <header className="build__head">
        <div className="placeholder__eyebrow">{fi.build.eyebrow}</div>
        <h2 className="build__title">{samplePuzzle.title}</h2>
        <p className="build__hint">{fi.build.sampleHint}</p>
      </header>
      <div className="build__grid">
        <CrosswordGrid puzzle={samplePuzzle} />
      </div>
    </section>
  )
}
