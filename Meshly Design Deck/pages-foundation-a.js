/* pages-foundation-a.js — registers page builders onto window.MPages */
(function(){
const { I, swoopSVG } = window.MShared;
window.MPages = window.MPages || {};
Object.assign(window.MPages, {
logo: () => `
  <section class="page__header">
    <div class="page__crumb">Foundation 04 / Logo</div>
    <h1 class="page__title">The <em>Meshly</em> mark.</h1>
    <p class="page__lede">A custom-drawn wordmark with a distinctive curved scoop inside the M — a quiet nod to a bridge arch and the open negative space we leave for our customers' data.</p>
  </section>

  <div class="page__body">
    <div class="logo-hero">
      <img class="logo-hero__img" src="assets/meshly-wordmark-white.png" alt="Meshly wordmark" />
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">04.1</span>
        <h3 class="section__title">Color versions</h3>
        <span class="section__sub">Four sanctioned lockups. No others.</span>
      </div>
      <div class="logo-grid">
        <div class="logo-tile logo-tile--white"><img class="logo-tile__img" src="assets/meshly-wordmark-black.png" alt="Meshly black on white"/></div>
        <div class="logo-tile logo-tile--dark"><img class="logo-tile__img" src="assets/meshly-wordmark-white.png" alt="Meshly white on dark"/></div>
        <div class="logo-tile logo-tile--green"><img class="logo-tile__img" src="assets/meshly-wordmark-black.png" alt="Meshly on terminal green"/></div>
        <div class="logo-tile logo-tile--pale"><img class="logo-tile__img" src="assets/meshly-wordmark-black.png" alt="Meshly on pale green"/></div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">04.2</span>
        <h3 class="section__title">Clear space &amp; minimum size</h3>
      </div>
      <div class="logo-spec">
        <div class="logo-spec__cell">
          <div class="eyebrow">Clear space — 1× cap height</div>
          <div class="logo-clearspace">
            <span class="x t">↓ x</span>
            <span class="x b">↑ x</span>
            <span class="x l">→ x</span>
            <span class="x r">← x</span>
            <img class="wm-img" src="assets/meshly-wordmark-black.png" alt="Meshly" style="height:64px;width:auto"/>
          </div>
          <div class="kv"><span>Rule</span><b>x = height of the M</b></div>
          <div class="kv"><span>No exceptions</span><b>Maintain on every surface</b></div>
        </div>
        <div class="logo-spec__cell">
          <div class="eyebrow">Minimum size</div>
          <div class="minsize-row">
            <img class="wm-img" src="assets/meshly-wordmark-black.png" style="height:32px;width:auto"/>
            <div class="meta">DIGITAL — 96px wide minimum</div>
          </div>
          <div class="minsize-row">
            <img class="wm-img" src="assets/meshly-wordmark-black.png" style="height:18px;width:auto"/>
            <div class="meta">SOCIAL — 56px wide minimum</div>
          </div>
          <div class="minsize-row">
            <img class="wm-img" src="assets/meshly-logomark-black.png" style="height:14px;width:auto"/>
            <div class="meta">FAVICON — 16px (M-mark only)</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">04.3</span>
        <h3 class="section__title">M-mark</h3>
        <span class="section__sub">Used only when the full wordmark is unworkable — favicons, app icons, watermarks. Note the curved scoop: the bridge.</span>
      </div>
      <div class="pair">
        <div class="pair__cell pair__cell--dark mmark-cell">
          <img src="assets/meshly-logomark-white.png" alt="Meshly M-mark white"/>
        </div>
        <div class="pair__cell pair__cell--light mmark-cell">
          <img src="assets/meshly-logomark-black.png" alt="Meshly M-mark black"/>
        </div>
      </div>
      <div class="cards-grid" style="margin-top:16px">
        <div class="card" style="background:var(--terminal-green);border:0">
          <div class="eyebrow" style="margin-bottom:16px">Construction</div>
          <p style="margin:0;font-size:13px;color:var(--dark-green);line-height:1.55">Two heavy slabs joined by a soft, asymmetric scoop — the dip echoes the bridge arch and the inverted graph valley.</p>
        </div>
        <div class="card" style="background:var(--pale-green);border:1px solid rgba(28,40,29,0.12)">
          <div class="eyebrow" style="margin-bottom:16px">Why it works</div>
          <p style="margin:0;font-size:13px;color:var(--mid-green);line-height:1.55">Reads as M at any size. Reads as bridge at hero scale. Reads as graph in motion.</p>
        </div>
        <div class="card" style="background:var(--dark-green);color:var(--pale-green);border:0">
          <div class="eyebrow" style="margin-bottom:16px;color:var(--terminal-green)">File names</div>
          <p style="margin:0;font-size:12px;color:var(--light-green);line-height:1.6;font-family:var(--font-mono)">meshly-wordmark-{black,white}.png<br/>meshly-logomark-{black,white}.png</p>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">04.4</span>
        <h3 class="section__title">Don't</h3>
      </div>
      <div class="cards-grid">
        <div class="showcase-card light dont-card">
          <div class="label">Don't</div>
          <div class="dont-demo"><img src="assets/meshly-wordmark-black.png" style="height:36px;filter:hue-rotate(180deg) saturate(2)"/></div>
          <p>Off-palette colors</p>
        </div>
        <div class="showcase-card light dont-card">
          <div class="label">Don't</div>
          <div class="dont-demo"><img src="assets/meshly-wordmark-black.png" style="height:36px;transform:scaleX(1.4)"/></div>
          <p>Stretch or skew the wordmark</p>
        </div>
        <div class="showcase-card light dont-card">
          <div class="label">Don't</div>
          <div class="dont-demo"><img src="assets/meshly-wordmark-black.png" style="height:36px;transform:rotate(-8deg)"/></div>
          <p>Rotate or apply effects</p>
        </div>
        <div class="showcase-card light dont-card">
          <div class="label">Don't</div>
          <div class="dont-demo" style="background:var(--orange)"><img src="assets/meshly-wordmark-black.png" style="height:36px"/></div>
          <p>Place on unapproved backgrounds</p>
        </div>
      </div>
    </div>
  </div>
`,

// ---------- 05 COLOR ----------
color: () => {
  const core = [
    ['Dark Green', '#1C281D', '#EFF6E4', ['AAA','AAA','AAA']],
    ['Terminal Green', '#6CFF52', '#1C281D', ['AAA','AAA','—']],
    ['Mid Green', '#6F9362', '#FFFFFF', ['AA','AA','—']],
    ['Light Green', '#C9E0AF', '#1C281D', ['AAA','AAA','—']],
    ['Pale Green', '#EFF6E4', '#1C281D', ['AAA','AAA','—']],
    ['Black', '#000000', '#FFFFFF', ['AAA','AAA','AAA']],
    ['Pure White', '#FFFFFF', '#1C281D', ['AAA','AAA','AAA']],
  ];
  const ext = [
    ['Bright Accents', [
      ['Orange', '#FFA74E', '#1C281D'],
      ['Cyan', '#80D9FD', '#1C281D'],
    ]],
    ['Muted Dark', [
      ['Grey Orange', '#B8824B', '#FFFFFF'],
      ['Grey Cyan', '#587E8D', '#FFFFFF'],
    ]],
    ['Muted Light', [
      ['Cream', '#FDEFD7', '#1C281D'],
      ['Light Green Mist', '#DCECF1', '#1C281D'],
    ]],
  ];
  return `
  <section class="page__header">
    <div class="page__crumb">Foundation 05 / Color</div>
    <h1 class="page__title">A green <em>system.</em></h1>
    <p class="page__lede">Anchored on Dark Green and Terminal Green. Built to be high-contrast in every pairing — every combination passes WCAG AA.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="section">
      <div class="section__head">
        <span class="section__num">05.1</span>
        <h3 class="section__title">Core palette</h3>
        <span class="section__sub">Seven colors. Memorize them.</span>
      </div>
      <div class="swatch-grid" style="grid-template-columns:repeat(5,1fr)">
        ${core.slice(0,5).map(([n,h,fg,r]) => `
          <div class="swatch" style="background:${h};color:${fg}">
            <div>
              <div class="name">${n}</div>
              <div class="hex">HEX ${h.replace('#','')}</div>
            </div>
            <div class="ratings">
              <span class="rating">AAA</span><span class="rating">AAA</span><span class="rating ${r[2]==='—'?'rating--off':''}">${r[2]==='—'?'AA':'AAA'}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 3fr;gap:12px;margin-top:12px">
        <div class="swatch" style="background:#000;color:#fff">
          <div><div class="name">Black</div><div class="hex">HEX 000000</div></div>
          <div class="ratings"><span class="rating">AAA</span><span class="rating">AAA</span><span class="rating">AAA</span></div>
        </div>
        <div class="swatch" style="background:#fff;color:#1C281D;border:1px solid rgba(28,40,29,0.12)">
          <div><div class="name">Pure White</div><div class="hex">HEX FFFFFF</div></div>
          <div class="ratings"><span class="rating" style="background:rgba(28,40,29,0.08)">AAA</span><span class="rating" style="background:rgba(28,40,29,0.08)">AAA</span><span class="rating" style="background:rgba(28,40,29,0.08)">AA</span></div>
        </div>
        <div class="card" style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;align-items:center">
          <div>
            <div class="eyebrow" style="margin-bottom:8px">Anchor pair</div>
            <h4 style="font-size:24px;letter-spacing:-0.015em;font-weight:500;margin:0 0 8px">Dark Green &amp; Terminal Green</h4>
            <p style="margin:0;font-size:14px;color:var(--mid-green);line-height:1.55">Every layout starts from one of these two backgrounds. The other becomes the accent.</p>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;height:120px">
            <div style="background:var(--dark-green);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--terminal-green);font-family:var(--font-mono);font-size:11px">DARK BG</div>
            <div style="background:var(--terminal-green);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--dark-green);font-family:var(--font-mono);font-size:11px">ACCENT</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">05.2</span>
        <h3 class="section__title">Extended palette</h3>
        <span class="section__sub">Free to use as accents — illustration, charts, marketing surfaces.</span>
      </div>
      ${ext.map(([row, cells]) => `
        <div class="extended-grid" style="margin-bottom:12px">
          <div class="extended-row-label">${row}</div>
          ${cells.map(([n,h,fg]) => `
            <div class="extended-swatch" style="background:${h};color:${fg}">
              <div>
                <div class="nm">${n}</div>
                <div class="hx">HEX ${h.replace('#','')}</div>
              </div>
              <div class="rt">${row==='Muted Light' ? 'AAA AA' : (row==='Muted Dark'?'AA AA':'AAA')}</div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">05.3</span>
        <h3 class="section__title">Color combinations</h3>
        <span class="section__sub">Six sanctioned background → palette pairings.</span>
      </div>
      <div class="combo-grid">
        ${[
          ['Dark', '#1C281D', '#EFF6E4', ['#FFFFFF','#FFA74E','#C9E0AF','#FDEFD7','#6CFF52','#80D9FD','#6CFF52','#DCECF1']],
          ['Pure White', '#FFFFFF', '#1C281D', ['#1C281D','#FFA74E','#6F9362','#B8824B','#6CFF52','#80D9FD','#C9E0AF','#587E8D']],
          ['Pale Green', '#EFF6E4', '#1C281D', ['#1C281D','#FFA74E','#6F9362','#B8824B','#6CFF52','#80D9FD','#C9E0AF','#587E8D']],
          ['Light Green', '#C9E0AF', '#1C281D', ['#1C281D','#FFA74E','#6F9362','#B8824B','#6CFF52','#FFFFFF','#FFFFFF','#FFFFFF']],
          ['Cream', '#FDEFD7', '#1C281D', ['#1C281D','#FFA74E','#6F9362','#B8824B','#FFFFFF','#FFFFFF']],
          ['Mist', '#DCECF1', '#1C281D', ['#1C281D','#FFA74E','#6F9362','#587E8D','#FFFFFF','#FFFFFF']],
        ].map(([name, bg, label, dots]) => `
          <div class="combo" style="background:${bg};color:${label}">
            <div class="label">${name}</div>
            <div class="dots">
              ${dots.map(d => `<span class="dot" style="background:${d}"></span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  `;
},

// ---------- 06 TYPOGRAPHY ----------
type: () => `
  <section class="page__header">
    <div class="page__crumb">Foundation 06 / Typography</div>
    <h1 class="page__title">Geist, <em>set with care.</em></h1>
    <p class="page__lede">A single typeface across every surface. Tight tracking on display sizes; generous on body. Monospace for technical labels and metadata.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="type-display">
      <div class="type-display__meta">
        <div class="eyebrow" style="margin-bottom:16px">Brand Type</div>
        <div class="name">Geist</div>
        <div class="by">by Vercel — open source</div>
      </div>
      <div class="type-display__set">abcdefghijklm<br/>nopqrstuvwxyz<br/>0123456789<br/>!@#$%&amp;*()</div>
    </div>

    <div class="section" style="margin-bottom:48px">
      <div class="section__head">
        <span class="section__num">06.1</span>
        <h3 class="section__title">Weights</h3>
        <span class="section__sub">Use Regular and Medium 90% of the time. Bold for emphasis only.</span>
      </div>
      <div class="weights-row">
        <div class="weight-chip" style="font-weight:100;color:var(--mid-green)">Thin</div>
        <div class="weight-chip" style="font-weight:200;color:var(--mid-green)">ExtraLight</div>
        <div class="weight-chip" style="font-weight:300;color:var(--mid-green)">Light</div>
        <div class="weight-chip" style="font-weight:400">Regular</div>
        <div class="weight-chip" style="font-weight:500">Medium</div>
        <div class="weight-chip" style="font-weight:600">SemiBold</div>
        <div class="weight-chip" style="font-weight:700">Bold</div>
        <div class="weight-chip" style="font-weight:800">ExtraBold</div>
        <div class="weight-chip" style="font-weight:900">Black</div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">06.2</span>
        <h3 class="section__title">Type hierarchy</h3>
        <span class="section__sub">Six roles. The whole site fits inside this scale.</span>
      </div>
      <div class="hierarchy">
        <div class="hierarchy__row">
          <div class="role">Primary headline<span class="sub">Geist Regular</span></div>
          <div class="specs">56–88 PX<br/>1.0 LH<br/>−3% LS</div>
          <div class="sample h1">Open-Source Power, <span style="color:var(--mid-green)">Enterprise Ready.</span></div>
          <div class="stage">Marketing hero</div>
        </div>
        <div class="hierarchy__row">
          <div class="role">Subheadline<span class="sub">Geist Regular</span></div>
          <div class="specs">28–36 PX<br/>1.1 LH<br/>−2% LS</div>
          <div class="sample h2"><span class="eyebrow" style="margin-right:16px">WHAT WE DO</span>Your trusted bridge to open-source data infrastructure</div>
          <div class="stage">Section opener</div>
        </div>
        <div class="hierarchy__row">
          <div class="role">Section title<span class="sub">Geist Medium</span></div>
          <div class="specs">22–28 PX<br/>1.15 LH<br/>−1.5% LS</div>
          <div class="sample h3">Three reasons enterprises choose Meshly.</div>
          <div class="stage">In-page section</div>
        </div>
        <div class="hierarchy__row">
          <div class="role">Body<span class="sub">Geist Regular</span></div>
          <div class="specs">15–17 PX<br/>1.55 LH<br/>0 LS</div>
          <div class="sample body">We bridge the enterprise world and open-source data platforms, creating a new standard for trusted, sustainable data infrastructure. Run on your own kit, with full sovereignty.</div>
          <div class="stage">Long-form prose</div>
        </div>
        <div class="hierarchy__row">
          <div class="role">Caption / meta<span class="sub">Geist Regular</span></div>
          <div class="specs">12–13 PX<br/>1.5 LH<br/>0 LS</div>
          <div class="sample small">Available in 9 weights. Free under the SIL Open Font License.</div>
          <div class="stage">Captions, footnotes</div>
        </div>
        <div class="hierarchy__row">
          <div class="role">Eyebrow / label<span class="sub">Geist Mono Regular</span></div>
          <div class="specs">10–11 PX<br/>1.5 LH<br/>+12% LS</div>
          <div class="sample eyebrow">SECTION 03 — VOICE &amp; TONE</div>
          <div class="stage">Labels, navigation</div>
        </div>
        <div class="hierarchy__row">
          <div class="role">CTA<span class="sub">Geist Medium</span></div>
          <div class="specs">14 PX<br/>1.0 LH<br/>−0.5% LS</div>
          <div class="sample cta">Enquire now <span style="font-family:monospace">↗</span></div>
          <div class="stage">Buttons</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">06.3</span>
        <h3 class="section__title">Numbers as a feature</h3>
        <span class="section__sub">Big numbers are a Meshly tell. Use Geist Regular at display size.</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        <div class="card" style="background:var(--pale-green);border:1px solid rgba(28,40,29,0.12);padding:40px"><div class="eyebrow" style="margin-bottom:8px">Cost reduction</div><div style="font-size:120px;font-weight:400;letter-spacing:-0.04em;line-height:1">€10K</div></div>
        <div class="card" style="background:var(--dark-green);color:var(--pale-green);border:0;padding:40px"><div class="eyebrow" style="color:var(--terminal-green);margin-bottom:8px">Industry adoption</div><div style="font-size:120px;font-weight:400;letter-spacing:-0.04em;line-height:1;color:var(--terminal-green)">↑85%</div></div>
        <div class="card" style="background:var(--terminal-green);border:0;padding:40px"><div class="eyebrow" style="color:var(--dark-green);margin-bottom:8px">Lock-in</div><div style="font-size:120px;font-weight:400;letter-spacing:-0.04em;line-height:1;color:var(--dark-green)">0%</div></div>
      </div>
    </div>
  </div>
`,

// ---------- 07 ICONOGRAPHY ----------
});
})();
