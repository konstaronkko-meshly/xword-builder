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
    library: 'Kirjasto',
  },
  library: {
    title: 'Kirjasto',
    current: 'Nykyinen ristikko',
    save: 'Tallenna',
    export: 'Vie tiedostoon',
    newPuzzle: 'Uusi ristikko',
    importTitle: 'Tuo tiedostosta',
    importHint: 'Vedä JSON-tiedosto tähän tai valitse tiedosto',
    importError: 'Tiedostoa ei voitu lukea',
    saved: 'Tallennetut ristikot',
    empty: 'Ei tallennettuja ristikoita.',
    open: 'Avaa',
    duplicate: 'Monista',
    rename: 'Nimeä',
    delete: 'Poista',
    untitled: 'Nimetön',
    confirmDelete: 'Poistetaanko ristikko pysyvästi?',
    renamePrompt: 'Ristikon uusi nimi',
    copySuffix: ' (kopio)',
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
    clueEditor: {
      title: 'Vihjeet',
      direction: 'Suunta',
      across: 'Vaakaan',
      down: 'Alas',
      text: 'Vihjeteksti',
      add: 'Lisää vihje',
      remove: 'Poista vihje',
      empty: 'Ei vihjeitä. Lisää enintään kaksi.',
    },
    meta: {
      title: 'Otsikko',
      author: 'Tekijä',
      rows: 'Rivit',
      cols: 'Sarakkeet',
      decrease: 'vähennä',
      increase: 'lisää',
      newPuzzle: 'Uusi',
      clear: 'Tyhjennä',
      confirmResize: 'Pienennys poistaa ruutuja sisältöineen. Jatketaanko?',
      confirmNew:
        'Aloitetaanko uusi tyhjä ristikko? Nykyinen sisältö poistetaan.',
      confirmClear: 'Tyhjennetäänkö ruudukko? Kaikki ruudut nollataan.',
    },
  },
  solve: {
    eyebrow: 'Ratkaisutila',
    hint: 'Lue vihjeet ruuduista ja täytä kirjaimet. Vastaukset eivät näy.',
    gridLabel: 'Ratkaistava ruudukko',
    actions: {
      label: 'Ratkaisutyökalut',
      check: 'Tarkista',
      revealLetter: 'Paljasta kirjain',
      revealWord: 'Paljasta sana',
      clear: 'Tyhjennä',
      completed: 'Valmis! Ristikko on oikein.',
    },
  },
} as const

export type Strings = typeof fi
