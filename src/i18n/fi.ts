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
      modeText: 'Teksti',
      modeIcon: 'Kuva',
      iconSearch: 'Hae kuvaa…',
      iconChange: 'Vaihda kuva',
      noIconResults: 'Ei kuvia haulla.',
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
    timer: {
      label: 'Aika',
    },
  },
  print: {
    button: 'Tulosta',
    title: 'Tulosta ristikko',
    showAnswers: 'Näytä vastaukset',
    answerKey: 'Vastausavain',
    print: 'Tulosta',
    close: 'Sulje',
  },
  help: {
    button: 'Ohje',
    title: 'Ohje',
    close: 'Sulje',
    building: {
      title: 'Rakentaminen',
      body: [
        'Valitse ruutu napauttamalla ja kirjoita kirjaimet näppäimistöllä.',
        'Vaihda ruudun tyyppiä työkaluriviltä tai näppäimillä 1–3: kirjain, vihje tai musta ruutu.',
        'Lisää ruutuun yksi tai kaksi vihjettä ja valitse kummankin suunta (vaakaan tai alas). Vihje voi olla tekstiä tai kuva.',
      ],
    },
    solving: {
      title: 'Ratkaiseminen',
      body: [
        'Lue vihjeet ruuduista ja täytä kirjaimet. Oikeat vastaukset eivät näy valmiina.',
        'Tarkista merkitsee väärät kirjaimet; Paljasta kirjain tai Paljasta sana auttaa eteenpäin.',
        'Aika käynnistyy ensimmäisestä kirjaimesta ja pysähtyy, kun ristikko on oikein.',
      ],
    },
    keyboard: {
      title: 'Näppäimistö',
      items: [
        ['Nuolinäppäimet', 'Siirrä valintaa ruudukossa.'],
        ['Kirjain', 'Kirjoita kirjain ja siirry sanan seuraavaan ruutuun.'],
        ['Askelpalautin', 'Tyhjennä ruutu tai siirry taaksepäin ja tyhjennä.'],
        ['Saman ruudun napautus', 'Vaihtaa kirjoitussuuntaa (vaaka/pysty).'],
        [
          '1 / 2 / 3',
          'Rakennustilassa: vaihtaa ruudun tyyppiä (kirjain/vihje/musta).',
        ],
      ],
    },
    symbols: {
      title: 'Symbolit',
      intro: 'Ruudukon ruudut, nuolet ja korostukset:',
      legend: {
        letter: 'Kirjainruutu — täytettävä kirjain',
        clue: 'Vihjeruutu — vihje tai kuva',
        blocked: 'Musta ruutu — ei käytössä',
        arrowRight: 'Nuoli: vastaus jatkuu oikealle',
        arrowDown: 'Nuoli: vastaus jatkuu alas',
        solution: 'Ratkaisusana — kootaan ristikkäisistä vastauksista',
        active: 'Aktiivinen sana',
        wrong: 'Väärä kirjain (Tarkista)',
        warning: 'Huomautus rakennustilassa',
      },
    },
    solutionWord: {
      title: 'Ratkaisusana',
      body: 'Vihje, jossa on vain nuoli eikä tekstiä, merkitsee ratkaisusanan. Sen ruudut on korostettu, ja sana selviää ristikkäisten vastausten kautta.',
    },
    printing: {
      title: 'Tulostus',
      body: 'Tulosta-painike avaa tulostusnäkymän. Voit tulostaa tyhjän ristikon ratkottavaksi tai vastaukset sisältävän vastausavaimen.',
    },
  },
} as const

export type Strings = typeof fi
