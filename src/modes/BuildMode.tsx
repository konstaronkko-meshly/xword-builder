import { fi } from '../i18n/fi'

export function BuildMode() {
  return (
    <section className="placeholder">
      <div className="placeholder__eyebrow">{fi.build.eyebrow}</div>
      <p className="placeholder__text">{fi.build.placeholder}</p>
    </section>
  )
}
