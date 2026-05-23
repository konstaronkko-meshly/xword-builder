import { ICON_IDS, ICON_META, type IconId, type IconMeta } from './iconData'

// URLs for the bundled OpenMoji SVGs, keyed by file path. Vite emits each as a
// hashed static asset and hands us its URL — so the JS bundle carries only the
// URLs, not the SVG markup.
const assetUrls = import.meta.glob('../assets/icons/openmoji/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export interface IconDef extends IconMeta {
  id: IconId
  /** URL of the bundled SVG asset. */
  src: string
}

function srcFor(id: string): string {
  const entry = Object.entries(assetUrls).find(([path]) =>
    path.endsWith(`/${id}.svg`),
  )
  if (!entry) throw new Error(`No bundled icon asset for id "${id}".`)
  return entry[1]
}

/** All picture-clue icons, keyed by id. Joins curated metadata with assets. */
export const ICONS: Record<IconId, IconDef> = ICON_META.reduce(
  (acc, meta) => {
    acc[meta.id] = { ...meta, src: srcFor(meta.id) }
    return acc
  },
  {} as Record<IconId, IconDef>,
)

export { ICON_IDS }
export type { IconId, IconMeta }

/** True if `id` is a known icon id. */
export function isIconId(id: string): id is IconId {
  return (ICON_IDS as readonly string[]).includes(id)
}

/**
 * CC BY-SA 4.0 attribution for the OpenMoji icon set. Surface this wherever
 * picture clues are shown to users (the icon picker, added in a later task).
 */
export const ICON_ATTRIBUTION =
  'Kuvavihjeiden kuvakkeet: OpenMoji (openmoji.org) — lisenssi CC BY-SA 4.0.'
