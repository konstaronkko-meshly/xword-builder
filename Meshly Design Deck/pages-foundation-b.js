/* pages-foundation-b.js — registers page builders onto window.MPages */
(function(){
const { I, swoopSVG, patternSVG } = window.MShared;
window.MPages = window.MPages || {};
Object.assign(window.MPages, {
icons: () => {
  const set = [
    ['users', I.users], ['settings', I.settings], ['server', I.server],
    ['external', I.ext], ['download', I.download], ['code', I.code],
    ['share', I.share], ['filter', I.filter], ['folder', I.folder],
    ['pulse', I.pulse], ['calendar', I.cal], ['book', I.book],
  ];
  return `
  <section class="page__header">
    <div class="page__crumb">Foundation 07 / Iconography</div>
    <h1 class="page__title">Drawn on a <em>24×24 grid.</em></h1>
    <p class="page__lede">1.5px stroke. Round caps and joins. Built consistently — never decoratively.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="icon-hero">
      <div class="icon-hero__construct">
        <svg viewBox="0 0 240 240" fill="none" stroke="#1C281D" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
          <rect x="40" y="60" width="160" height="140" rx="20"/>
          <line x1="40" y1="100" x2="200" y2="100"/>
          <line x1="80" y1="40" x2="80" y2="68"/>
          <line x1="160" y1="40" x2="160" y2="68"/>
        </svg>
      </div>
      <div class="icon-hero__set">
        <div class="icon">${I.users}</div>
        <div class="icon">${I.settings}</div>
        <div class="icon">${I.server}</div>
        <div class="icon">${I.ext}</div>
        <div class="icon">${I.download}</div>
        <div class="icon">${I.code}</div>
        <div class="icon">${I.share}</div>
        <div class="icon">${I.filter}</div>
        <div class="icon">${I.folder}</div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">07.1</span>
        <h3 class="section__title">Library</h3>
        <span class="section__sub">Twelve core glyphs cover 90% of needs.</span>
      </div>
      <div class="icon-grid">
        ${set.map(([n, svg]) => `
          <div class="icon-cell">${svg}<div class="nm">${n}</div></div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">07.2</span>
        <h3 class="section__title">Specs</h3>
      </div>
      <div class="cards-grid">
        <div class="card"><div class="eyebrow" style="margin-bottom:12px">Grid</div><div style="font-size:36px;letter-spacing:-0.02em;font-weight:400">24 × 24</div><p style="font-size:13px;color:var(--mid-green);margin:8px 0 0">Snap every endpoint to the grid. No half-pixels.</p></div>
        <div class="card"><div class="eyebrow" style="margin-bottom:12px">Stroke</div><div style="font-size:36px;letter-spacing:-0.02em;font-weight:400">1.5 px</div><p style="font-size:13px;color:var(--mid-green);margin:8px 0 0">Constant. Never tapers. Round line cap.</p></div>
        <div class="card"><div class="eyebrow" style="margin-bottom:12px">Padding</div><div style="font-size:36px;letter-spacing:-0.02em;font-weight:400">2 px</div><p style="font-size:13px;color:var(--mid-green);margin:8px 0 0">Live area is 20 × 20 inside the 24 × 24 frame.</p></div>
      </div>
    </div>
  </div>
  `;
},

// ---------- 08 ILLUSTRATION ----------
illustration: () => `
  <section class="page__header">
    <div class="page__crumb">Foundation 08 / Illustration</div>
    <h1 class="page__title">Geometric &amp; <em>quietly active.</em></h1>
    <p class="page__lede">Line illustrations on a Pale Green field with one bright accent — Terminal Green, Cyan or Orange — drawing the eye to the point of the diagram.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="illu-bigfeature">
      <div>
        <div class="eyebrow" style="color:var(--terminal-green);margin-bottom:24px">Brand symbols</div>
        <h3>Bridge. Mesh node. <em>Graph.</em></h3>
        <p>Three motifs travel through the brand — they appear in icons, illustrations and infographics. The bridge is our promise. The mesh is our shape. The graph is our work.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:center;justify-items:center">
        <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(108,255,82,0.25);border-radius:16px">${I.bridge}</div>
        <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(108,255,82,0.25);border-radius:16px">${I.mesh}</div>
        <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(108,255,82,0.25);border-radius:16px">${I.graph}</div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">08.1</span>
        <h3 class="section__title">Line illustrations</h3>
        <span class="section__sub">Iso-projected geometry, dark line, single accent.</span>
      </div>
      <div class="illu-grid">
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="60" fill="#6CFF52"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#1C281D" stroke-width="1.5"/>
            <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#1C281D" stroke-width="1.5"/>
            <line x1="40" y1="100" x2="160" y2="100" stroke="#1C281D" stroke-width="1.5"/>
            <line x1="100" y1="40" x2="100" y2="160" stroke="#1C281D" stroke-width="1.5"/>
            ${[0,45,90,135,180,225,270,315].map(a => {
              const r1 = 70, r2 = 80;
              const rad = a * Math.PI/180;
              return `<line x1="${100+r1*Math.cos(rad)}" y1="${100+r1*Math.sin(rad)}" x2="${100+r2*Math.cos(rad)}" y2="${100+r2*Math.sin(rad)}" stroke="#1C281D" stroke-width="1.5"/>`;
            }).join('')}
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <ellipse cx="60" cy="100" rx="32" ry="48"/>
            <line x1="60" y1="52" x2="60" y2="148"/>
            <ellipse cx="120" cy="100" rx="40" ry="56" fill="#6CFF52"/>
            <ellipse cx="120" cy="100" rx="40" ry="56" fill="none"/>
            <line x1="120" y1="44" x2="120" y2="156"/>
            <line x1="60" y1="52" x2="120" y2="44"/>
            <line x1="60" y1="148" x2="120" y2="156"/>
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <circle cx="100" cy="100" r="80"/>
            <circle cx="100" cy="100" r="50"/>
            <circle cx="100" cy="100" r="22"/>
            <line x1="100" y1="20" x2="100" y2="180"/>
            <polyline points="96,28 100,20 104,28"/>
            <circle cx="100" cy="160" r="6" fill="#6CFF52"/>
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <rect x="30" y="120" width="36" height="50" fill="#6CFF52"/>
            <rect x="30" y="120" width="36" height="50"/>
            <rect x="80" y="80" width="36" height="90"/>
            <rect x="130" y="50" width="36" height="120"/>
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <circle cx="100" cy="100" r="50" fill="#80D9FD"/>
            <circle cx="100" cy="100" r="50"/>
            <circle cx="100" cy="100" r="30" fill="#EFF6E4"/>
            <line x1="140" y1="140" x2="170" y2="170"/>
            <circle cx="160" cy="160" r="8"/>
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <polygon points="60,140 140,140 160,80 80,80" stroke-dasharray="4,3"/>
            <ellipse cx="56" cy="142" rx="14" ry="10" fill="#FFA74E"/>
            <circle cx="60" cy="140" r="22"/>
            <line x1="60" y1="140" x2="120" y2="40"/>
            <line x1="120" y1="40" x2="180" y2="80"/>
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <path d="M30 100 a70 70 0 1 1 140 0 a70 70 0 1 1 -140 0" stroke-dasharray="0"/>
            <path d="M170 100 l-20 -10 l0 20 z" fill="#1C281D"/>
            <circle cx="100" cy="100" r="22" fill="#EFF6E4"/>
            <circle cx="100" cy="100" r="22"/>
          </svg>
        </div>
        <div class="illu-tile">
          <svg viewBox="0 0 200 200" fill="none" stroke="#1C281D" stroke-width="1.5">
            <ellipse cx="100" cy="100" rx="70" ry="22" stroke-dasharray="4,3"/>
            <rect x="40" y="80" width="40" height="40" fill="#6CFF52"/>
            <rect x="40" y="80" width="40" height="40"/>
            <rect x="120" y="40" width="40" height="40"/>
            <rect x="120" y="120" width="40" height="40"/>
            <line x1="80" y1="100" x2="120" y2="60"/>
            <line x1="80" y1="100" x2="120" y2="140"/>
            <line x1="120" y1="60" x2="120" y2="140"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">08.2</span>
        <h3 class="section__title">Recipe</h3>
        <span class="section__sub">How a Meshly illustration is built.</span>
      </div>
      <div class="cards-grid">
        <div class="card"><div class="eyebrow" style="margin-bottom:12px">01 — Surface</div><div style="font-size:18px;font-weight:500;margin-bottom:6px;letter-spacing:-0.01em">Pale Green or Mist</div><p style="font-size:13px;color:var(--mid-green);margin:0;line-height:1.55">Always a tinted background, never pure white.</p></div>
        <div class="card"><div class="eyebrow" style="margin-bottom:12px">02 — Line</div><div style="font-size:18px;font-weight:500;margin-bottom:6px;letter-spacing:-0.01em">Dark Green, 1.5 px</div><p style="font-size:13px;color:var(--mid-green);margin:0;line-height:1.55">Same weight as iconography. Coherence across scale.</p></div>
        <div class="card"><div class="eyebrow" style="margin-bottom:12px">03 — Accent</div><div style="font-size:18px;font-weight:500;margin-bottom:6px;letter-spacing:-0.01em">One element, one color</div><p style="font-size:13px;color:var(--mid-green);margin:0;line-height:1.55">Terminal Green, Cyan or Orange — never two at once.</p></div>
      </div>
    </div>
  </div>
`,

// ---------- 09 SHAPE & LAYOUT ----------
shape: () => `
  <section class="page__header">
    <div class="page__crumb">Foundation 09 / Shape &amp; Layout</div>
    <h1 class="page__title">Soft <em>edges</em>, sharp patterns.</h1>
    <p class="page__lede">Generous corner radii on big surfaces; tight grids underneath. Patterns — overlapping flat polygons in tonal families — give covers and dividers their character.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="section">
      <div class="section__head">
        <span class="section__num">09.1</span>
        <h3 class="section__title">Radii</h3>
      </div>
      <div class="shape-row">
        <div class="shape-tile"><div class="label">SM — 6px</div><div class="demo"><div style="width:120px;height:80px;background:var(--terminal-green);border-radius:6px"></div></div><div class="ttl">Inputs, badges</div><div class="meta">--r-sm</div></div>
        <div class="shape-tile"><div class="label">MD — 12px</div><div class="demo"><div style="width:120px;height:80px;background:var(--terminal-green);border-radius:12px"></div></div><div class="ttl">Buttons, chips</div><div class="meta">--r-md</div></div>
        <div class="shape-tile"><div class="label">LG — 20px</div><div class="demo"><div style="width:120px;height:80px;background:var(--terminal-green);border-radius:20px"></div></div><div class="ttl">Cards</div><div class="meta">--r-lg</div></div>
        <div class="shape-tile"><div class="label">XL — 32px</div><div class="demo"><div style="width:120px;height:80px;background:var(--terminal-green);border-radius:32px"></div></div><div class="ttl">Hero panels</div><div class="meta">--r-xl</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">09.2</span>
        <h3 class="section__title">Spacing scale</h3>
        <span class="section__sub">9 steps. 4-pixel base.</span>
      </div>
      <div class="spacing-list">
        ${[
          ['sp-1','4 px',1],['sp-2','8 px',2],['sp-3','12 px',3],['sp-4','16 px',4],
          ['sp-5','24 px',6],['sp-6','32 px',8],['sp-7','48 px',12],['sp-8','64 px',16],['sp-9','96 px',24],
        ].map(([n,v,m]) => `
          <div class="spacing-row">
            <div class="name">--${n}</div>
            <div class="val">${v}</div>
            <div class="bar" style="width:${m*16}px"></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">09.3</span>
        <h3 class="section__title">Patterns</h3>
        <span class="section__sub">Sharp-edged geometric compositions in three tonal families. Use as background fields for covers, dividers and editorial pages.</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:20px">
        ${[
          ['dark', 0, 'Dark / 01'],
          ['light', 1, 'Light / 02'],
          ['green', 3, 'Green / 04'],
          ['dark', 5, 'Dark / 06'],
          ['light', 2, 'Light / 03'],
          ['green', 4, 'Green / 05'],
        ].map(([fam, v, label]) => `
          <figure style="margin:0;display:flex;flex-direction:column;gap:8px">
            <div style="position:relative;aspect-ratio:16/9;border-radius:var(--r-md);overflow:hidden">
              ${patternSVG(fam, v)}
            </div>
            <figcaption style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.08em;text-transform:uppercase;color:var(--mid-green)">${label}</figcaption>
          </figure>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">09.4</span>
        <h3 class="section__title">Page grid</h3>
        <span class="section__sub">12-column, 80px gutters on desktop.</span>
      </div>
      <div class="card" style="padding:0;overflow:hidden">
        <div style="display:grid;grid-template-columns:repeat(12,1fr);gap:16px;padding:32px;background:repeating-linear-gradient(90deg,rgba(108,255,82,0.08),rgba(108,255,82,0.08) 8.33%,transparent 8.33%,transparent 16.66%)">
          ${Array.from({length:12}, (_,i) => `<div style="height:80px;background:rgba(28,40,29,0.05);border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:10px;color:var(--mid-green)">${String(i+1).padStart(2,'0')}</div>`).join('')}
        </div>
      </div>
    </div>
  </div>
`,

// ---------- 10 BUTTONS ----------
});
})();
