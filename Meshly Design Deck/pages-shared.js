/* pages-shared.js — icons + swoop helper, exposed via window.MShared */
(function(){
const I = {
  arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 L17 7 M9 7 L17 7 L17 15"/></svg>',
  plus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>',
  bridge: `<svg viewBox="0 0 64 64" fill="none" stroke="#6CFF52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 50 H58"/><path d="M14 50 V20"/><path d="M50 50 V20"/>
    <path d="M14 24 C26 14, 38 14, 50 24"/><path d="M14 32 C24 38, 40 38, 50 32"/>
    <path d="M22 50 V36"/><path d="M42 50 V36"/></svg>`,
  mesh: `<svg viewBox="0 0 64 64" fill="none" stroke="#6CFF52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="14" r="4"/><circle cx="14" cy="48" r="4"/><circle cx="50" cy="48" r="4"/>
    <path d="M32 18 L18 44"/><path d="M32 18 L46 44"/><path d="M18 48 L46 48"/></svg>`,
  graph: `<svg viewBox="0 0 64 64" fill="none" stroke="#6CFF52" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 10 V54 H54"/><path d="M14 44 C22 22, 32 26, 40 36 C46 44, 52 30, 56 24"/>
    <circle cx="56" cy="24" r="2.5" fill="#6CFF52"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M14 20c0-2.5 2-4.5 4.5-4.5S23 17.5 23 20"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><circle cx="7" cy="7.5" r="0.5" fill="#1C281D"/><circle cx="7" cy="16.5" r="0.5" fill="#1C281D"/></svg>`,
  ext: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  pulse: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="#1C281D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
};

// Brand patterns — overlapping flat polygons with sharp diagonal edges,
// rendered as tonal variations of one hue. 6 variants × 3 families.
function patternSVG(family /* 'dark' | 'light' | 'green' */, variant /* 0..5 */) {
  const palettes = {
    dark:  { bg: '#1C281D', t1: '#243024', t2: '#192319', t3: '#2C3A2D' },
    light: { bg: '#F5F8EE', t1: '#EAF1DA', t2: '#FBFCF7', t3: '#DDE9C8' },
    green: { bg: '#6CFF52', t1: '#C9E0AF', t2: '#5AE640', t3: '#A8D58A' },
  };
  const p = palettes[family] || palettes.dark;
  const v = ((variant % 6) + 6) % 6;

  // Each variant is a different composition of overlapping polygons.
  // viewBox 600x340 (≈16:9), polygons reach beyond edges so they always crop cleanly.
  const variants = [
    // 0 — diagonal rising from bottom-left + counter wedge from right
    `<polygon points="-20,420 700,-40 700,180 -20,420" fill="${p.t1}"/>
     <polygon points="700,-20 700,260 320,-20" fill="${p.t2}"/>`,
    // 1 — sweeping V from top, secondary triangle bottom-right
    `<polygon points="-20,-20 380,-20 220,360 -20,360" fill="${p.t1}"/>
     <polygon points="700,360 700,80 280,360" fill="${p.t2}"/>
     <polygon points="220,360 380,-20 700,180 700,360" fill="${p.t3}"/>`,
    // 2 — bottom horizontal band + tilted triangle from right
    `<polygon points="-20,200 700,200 700,360 -20,360" fill="${p.t1}"/>
     <polygon points="700,-20 700,260 240,-20" fill="${p.t2}"/>`,
    // 3 — corner diamond (matches "right green family" reference)
    `<polygon points="-20,-20 360,-20 -20,260" fill="${p.t1}"/>
     <polygon points="700,-20 460,-20 700,200" fill="${p.t2}"/>
     <polygon points="-20,360 700,360 700,240 -20,180" fill="${p.t3}"/>`,
    // 4 — single broad diagonal cut from top-right to bottom-left
    `<polygon points="700,-20 700,360 -20,360" fill="${p.t1}"/>`,
    // 5 — peaked roofline + base wedge
    `<polygon points="-20,360 300,80 700,360" fill="${p.t1}"/>
     <polygon points="-20,260 -20,360 200,360" fill="${p.t2}"/>`,
  ];

  return `<svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%;display:block">
    <rect x="0" y="0" width="600" height="340" fill="${p.bg}"/>
    ${variants[v]}
  </svg>`;
}

// The signature swoop — a soft organic curve that sits in the bottom-right,
// occupying roughly the lower-right third. Gentle profile so type stays clear above-left.
function swoopSVG(fill /*, _legacy, _legacy*/) {
  return `<svg viewBox="0 0 600 360" preserveAspectRatio="xMaxYMax slice" style="position:absolute;inset:0;width:100%;height:100%;display:block">
    <path d="M 600 360 L 600 200
             C 540 195, 500 215, 470 250
             C 445 280, 425 320, 380 345
             C 340 360, 280 360, 230 360 Z"
          fill="${fill}"/>
  </svg>`;
}
window.MShared = { I, swoopSVG, patternSVG };
})();
