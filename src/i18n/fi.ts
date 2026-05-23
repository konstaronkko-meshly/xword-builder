/**
 * Finnish UI strings, keyed by English keys.
 *
 * Project convention (Meshly decision "Language: Finnish UI, English code &
 * docs"): all user-facing text is Finnish and lives here; code stays English.
 * Never hardcode Finnish text inside components — add a key here instead.
 */
export const fi = {
  appTitle: 'Sanaristikkotyökalu',
  appTagline: 'Rakenna ja ratkaise',
  mode: {
    build: 'Rakenna',
    solve: 'Ratkaise',
  },
  build: {
    eyebrow: 'Rakennustila',
    editHint:
      'Valitse ruutu ja kirjoita kirjaimet näppäimistöllä. Nuolet siirtävät, 1–3 vaihtavat tyypin, sama ruutu vaihtaa suunnan.',
    tools: {
      label: 'Ruututyökalut',
      gridLabel: 'Ristikon ruudukko',
      letter: 'Kirjain',
      clue: 'Vihje',
      blocked: 'Musta',
      slots: 'Sanoja',
      warnings: 'Varoituksia',
    },
  },
  solve: {
    eyebrow: 'Ratkaisutila',
    placeholder: 'Ristikon täyttö tulee tähän.',
  },
} as const

export type Strings = typeof fi
