// Fetch the curated picture-clue icon set from OpenMoji and (re)generate
// src/icons/iconData.ts. Run with: `node scripts/fetch-icons.mjs`.
//
// Icons: OpenMoji 15.0.0 color SVGs (https://openmoji.org), CC BY-SA 4.0.
// Each SVG is saved as src/assets/icons/openmoji/<id>.svg (named by our id,
// not the emoji hex). Only icons that download successfully are written into
// iconData.ts, so a wrong hex below can never leave a dangling registry entry.
//
// To extend the set: add a row to ICONS below and re-run this script.

import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ASSET_DIR = join(ROOT, 'src/assets/icons/openmoji')
const DATA_FILE = join(ROOT, 'src/icons/iconData.ts')
const VERSION = '15.0.0'
const cdn = (hex) =>
  `https://cdn.jsdelivr.net/npm/openmoji@${VERSION}/color/svg/${hex}.svg`

// Curated common concrete nouns for Finnish arrow-word puzzles.
// [id, hex, label, ...keywords]
const ICONS = [
  // Animals
  ['kissa', '1F431', 'Kissa', 'eläin', 'lemmikki'],
  ['koira', '1F436', 'Koira', 'eläin', 'lemmikki'],
  ['hevonen', '1F434', 'Hevonen', 'eläin'],
  ['lehma', '1F42E', 'Lehmä', 'eläin', 'nauta'],
  ['sika', '1F437', 'Sika', 'eläin', 'possu'],
  ['lammas', '1F411', 'Lammas', 'eläin'],
  ['kani', '1F430', 'Kani', 'jänis', 'eläin'],
  ['kettu', '1F98A', 'Kettu', 'eläin'],
  ['karhu', '1F43B', 'Karhu', 'eläin'],
  ['leijona', '1F981', 'Leijona', 'eläin'],
  ['tiikeri', '1F42F', 'Tiikeri', 'eläin'],
  ['norsu', '1F418', 'Norsu', 'eläin', 'elefantti'],
  ['apina', '1F435', 'Apina', 'eläin'],
  ['pingviini', '1F427', 'Pingviini', 'lintu', 'eläin'],
  ['pollo', '1F989', 'Pöllö', 'lintu', 'eläin'],
  ['kala', '1F41F', 'Kala', 'eläin'],
  ['mehilainen', '1F41D', 'Mehiläinen', 'hyönteinen'],
  ['perhonen', '1F98B', 'Perhonen', 'hyönteinen'],
  ['etana', '1F40C', 'Etana', 'kotilo'],
  ['sammakko', '1F438', 'Sammakko', 'eläin'],
  ['kaarme', '1F40D', 'Käärme', 'eläin', 'mato'],
  ['kilpikonna', '1F422', 'Kilpikonna', 'eläin'],
  ['kana', '1F414', 'Kana', 'lintu', 'eläin'],
  // Food & plants
  ['omena', '1F34E', 'Omena', 'hedelmä', 'ruoka'],
  ['banaani', '1F34C', 'Banaani', 'hedelmä', 'ruoka'],
  ['viinirypale', '1F347', 'Viinirypäleet', 'hedelmä', 'ruoka'],
  ['mansikka', '1F353', 'Mansikka', 'marja', 'ruoka'],
  ['kirsikka', '1F352', 'Kirsikat', 'marja', 'ruoka'],
  ['appelsiini', '1F34A', 'Appelsiini', 'hedelmä', 'ruoka'],
  ['tomaatti', '1F345', 'Tomaatti', 'vihannes', 'ruoka'],
  ['porkkana', '1F955', 'Porkkana', 'vihannes', 'ruoka'],
  ['peruna', '1F954', 'Peruna', 'vihannes', 'ruoka'],
  ['maissi', '1F33D', 'Maissi', 'vihannes', 'ruoka'],
  ['sieni', '1F344', 'Sieni', 'ruoka'],
  ['leipa', '1F35E', 'Leipä', 'ruoka'],
  ['juusto', '1F9C0', 'Juusto', 'ruoka'],
  ['kahvi', '2615', 'Kahvi', 'juoma', 'kuppi'],
  // Nature & weather
  ['aurinko', '2600', 'Aurinko', 'sää', 'taivas'],
  ['pilvi', '2601', 'Pilvi', 'sää', 'taivas'],
  ['lumihiutale', '2744', 'Lumihiutale', 'sää', 'talvi'],
  ['kuu', '1F319', 'Kuu', 'taivas', 'yö'],
  ['tahti', '2B50', 'Tähti', 'taivas'],
  ['lumiukko', '26C4', 'Lumiukko', 'talvi', 'lumi'],
  ['sateenkaari', '1F308', 'Sateenkaari', 'sää'],
  ['tuli', '1F525', 'Tuli', 'liekki'],
  ['puu', '1F333', 'Puu', 'luonto'],
  ['kuusi', '1F332', 'Kuusi', 'puu', 'havupuu'],
  ['kukka', '1F33B', 'Auringonkukka', 'kukka', 'kasvi'],
  ['tulppaani', '1F337', 'Tulppaani', 'kukka', 'kasvi'],
  ['lehti', '1F341', 'Lehti', 'kasvi', 'syksy'],
  // Household & objects
  ['talo', '1F3E0', 'Talo', 'koti', 'rakennus'],
  ['ovi', '1F6AA', 'Ovi', 'oviaukko', 'koti'],
  ['avain', '1F511', 'Avain', 'lukko'],
  ['lukko', '1F512', 'Lukko', 'avain'],
  ['kirja', '1F4D6', 'Kirja', 'lukeminen'],
  ['puhelin', '1F4F1', 'Puhelin', 'kännykkä'],
  ['tietokone', '1F4BB', 'Tietokone', 'läppäri'],
  ['lamppu', '1F4A1', 'Lamppu', 'valo', 'idea'],
  ['kello', '23F0', 'Kello', 'herätyskello', 'aika'],
  ['lahja', '1F381', 'Lahja', 'paketti'],
  ['ilmapallo', '1F388', 'Ilmapallo', 'juhla'],
  ['kruunu', '1F451', 'Kruunu', 'kuningas'],
  ['hattu', '1F3A9', 'Hattu', 'silinteri'],
  ['kenka', '1F45F', 'Kenkä', 'jalkine'],
  ['mekko', '1F457', 'Mekko', 'vaate'],
  ['laukku', '1F45C', 'Laukku', 'käsilaukku'],
  ['sormus', '1F48D', 'Sormus', 'koru'],
  ['kamera', '1F4F7', 'Kamera', 'valokuva'],
  // Tools
  ['vasara', '1F528', 'Vasara', 'työkalu'],
  ['jakoavain', '1F527', 'Jakoavain', 'työkalu'],
  ['sakset', '2702', 'Sakset', 'työkalu'],
  ['kyna', '270F', 'Kynä', 'kirjoittaminen'],
  ['sivellin', '1F58C', 'Sivellin', 'maalaus'],
  ['magneetti', '1F9F2', 'Magneetti', 'magnetismi'],
  // Vehicles
  ['auto', '1F697', 'Auto', 'ajoneuvo'],
  ['bussi', '1F68C', 'Bussi', 'ajoneuvo', 'linja-auto'],
  ['polkupyora', '1F6B2', 'Polkupyörä', 'pyörä', 'ajoneuvo'],
  ['juna', '1F682', 'Juna', 'veturi', 'ajoneuvo'],
  ['lentokone', '2708', 'Lentokone', 'ajoneuvo'],
  ['laiva', '1F6A2', 'Laiva', 'alus', 'ajoneuvo'],
  ['raketti', '1F680', 'Raketti', 'avaruus'],
  ['traktori', '1F69C', 'Traktori', 'ajoneuvo'],
  // Body
  ['silma', '1F441', 'Silmä', 'keho'],
  ['suu', '1F444', 'Suu', 'keho', 'huulet'],
  ['korva', '1F442', 'Korva', 'keho'],
  ['hammas', '1F9B7', 'Hammas', 'keho'],
  ['jalka', '1F9B6', 'Jalka', 'keho'],
  ['kasi', '270B', 'Käsi', 'keho'],
  ['sydan', '2764', 'Sydän', 'rakkaus'],
  ['aivot', '1F9E0', 'Aivot', 'keho'],
  // Music & sport & misc
  ['kitara', '1F3B8', 'Kitara', 'soitin', 'musiikki'],
  ['trumpetti', '1F3BA', 'Trumpetti', 'soitin', 'musiikki'],
  ['rummut', '1F941', 'Rummut', 'soitin', 'musiikki'],
  ['nuotti', '1F3B5', 'Nuotti', 'musiikki'],
  ['jalkapallo', '26BD', 'Jalkapallo', 'urheilu', 'pallo'],
  ['koripallo', '1F3C0', 'Koripallo', 'urheilu', 'pallo'],
  ['lippu', '1F3AB', 'Lippu', 'pääsylippu'],
  ['paketti', '1F4E6', 'Paketti', 'laatikko'],
  ['tiimalasi', '23F3', 'Tiimalasi', 'aika'],
]

async function main() {
  await mkdir(ASSET_DIR, { recursive: true })
  await mkdir(dirname(DATA_FILE), { recursive: true })
  const ok = []
  for (const [id, hex, label, ...keywords] of ICONS) {
    try {
      const res = await fetch(cdn(hex))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const svg = await res.text()
      if (!svg.includes('<svg')) throw new Error('not an SVG')
      await writeFile(join(ASSET_DIR, `${id}.svg`), svg, 'utf8')
      ok.push({ id, label, keywords })
      process.stdout.write(`✓ ${id}\n`)
    } catch (e) {
      process.stdout.write(`✗ ${id} (${hex}): ${e.message} — skipped\n`)
    }
  }

  const body = ok
    .map(
      ({ id, label, keywords }) =>
        `  { id: '${id}', label: ${JSON.stringify(label)}, keywords: ${JSON.stringify(keywords)} },`,
    )
    .join('\n')

  const out = `// AUTO-GENERATED by scripts/fetch-icons.mjs — do not edit by hand.
// Source: OpenMoji ${VERSION} color SVGs (https://openmoji.org), CC BY-SA 4.0.
// Each id has a matching SVG at src/assets/icons/openmoji/<id>.svg.

export interface IconMeta {
  id: string
  /** Finnish display name (the picture's answer). */
  label: string
  /** Finnish search terms for the picker. */
  keywords: readonly string[]
}

export const ICON_META = [
${body}
] as const satisfies readonly IconMeta[]

/** Union of valid icon ids. */
export type IconId = (typeof ICON_META)[number]['id']

/** Runtime list of valid icon ids (for validation). */
export const ICON_IDS: readonly IconId[] = ICON_META.map((m) => m.id)
`
  await writeFile(DATA_FILE, out, 'utf8')
  process.stdout.write(`\nWrote ${ok.length}/${ICONS.length} icons to ${DATA_FILE}\n`)
}

main()
