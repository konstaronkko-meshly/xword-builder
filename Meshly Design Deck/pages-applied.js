/* pages-applied.js — registers page builders onto window.MPages */
(function(){
const { I, swoopSVG } = window.MShared;
window.MPages = window.MPages || {};
Object.assign(window.MPages, {
web: () => `
  <section class="page__header">
    <div class="page__crumb">In Use 14 / Web</div>
    <h1 class="page__title">The system, <em>on the web.</em></h1>
    <p class="page__lede">A landing page composed entirely from the components in this book. Nothing custom; everything reusable.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="web-frame">
      <div class="web-frame__chrome">
        <div class="dots"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
        <div class="web-frame__url">meshly.fi</div>
      </div>

      <!-- Top nav -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 40px;border-bottom:1px solid rgba(28,40,29,0.08)">
        <img src="assets/meshly-wordmark-black.png" alt="Meshly" style="height:22px;width:auto"/>
        <div style="display:flex;gap:32px;font-size:14px">
          <a>How it works</a><a>Customers</a><a>Pricing</a><a>Docs</a>
        </div>
        <div style="display:flex;gap:12px"><button class="btn btn--ghost btn--sm">Sign in</button><button class="btn btn--primary btn--sm">Talk to us ${I.arrow}</button></div>
      </div>

      <!-- Hero -->
      <div style="padding:80px 40px 64px;display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:end">
        <div>
          <div class="eyebrow" style="margin-bottom:24px">A trusted bridge to open source</div>
          <h2 style="font-size:88px;line-height:0.95;letter-spacing:-0.04em;margin:0 0 20px;font-weight:400">Open-Source Power, <span style="color:var(--mid-green)">Enterprise Ready.</span></h2>
          <p style="font-size:17px;line-height:1.55;color:var(--mid-green);max-width:520px;margin:0 0 32px">Run Postgres, Kafka and Spark on your own infrastructure with the support, SLA and audit trail your CISO expects.</p>
          <div style="display:flex;gap:12px"><button class="btn btn--primary btn--lg">Talk to us ${I.arrow}</button><button class="btn btn--secondary btn--lg">Read the docs</button></div>
        </div>
        <div style="position:relative;height:440px;border-radius:24px;overflow:hidden;background:var(--dark-green);display:flex;align-items:center;justify-content:center">
          <!-- Mesh node motif: a small constellation of connected dots, one of the three brand symbols -->
          <svg viewBox="0 0 360 360" style="width:78%;height:auto;display:block" aria-hidden="true">
            <g stroke="rgba(108,255,82,0.45)" stroke-width="1.25" fill="none">
              <line x1="80" y1="100" x2="200" y2="60"/>
              <line x1="80" y1="100" x2="140" y2="200"/>
              <line x1="80" y1="100" x2="60" y2="240"/>
              <line x1="200" y1="60" x2="300" y2="120"/>
              <line x1="200" y1="60" x2="220" y2="180"/>
              <line x1="140" y1="200" x2="220" y2="180"/>
              <line x1="140" y1="200" x2="60" y2="240"/>
              <line x1="140" y1="200" x2="180" y2="300"/>
              <line x1="220" y1="180" x2="300" y2="120"/>
              <line x1="220" y1="180" x2="280" y2="280"/>
              <line x1="180" y1="300" x2="280" y2="280"/>
              <line x1="60" y1="240" x2="180" y2="300"/>
            </g>
            <g fill="#6CFF52">
              <circle cx="80"  cy="100" r="6"/>
              <circle cx="200" cy="60"  r="6"/>
              <circle cx="300" cy="120" r="6"/>
              <circle cx="140" cy="200" r="9"/>
              <circle cx="220" cy="180" r="6"/>
              <circle cx="60"  cy="240" r="6"/>
              <circle cx="180" cy="300" r="6"/>
              <circle cx="280" cy="280" r="6"/>
            </g>
          </svg>
          <div style="position:absolute;left:32px;bottom:32px;color:var(--mid-green);font-family:var(--font-mono);font-size:11px;letter-spacing:0.12em;text-transform:uppercase">Mesh — node graph</div>
        </div>
      </div>

      <!-- logos -->
      <div style="padding:24px 40px 48px;display:flex;gap:48px;align-items:center;color:var(--mid-green);border-bottom:1px solid rgba(28,40,29,0.08)">
        <div class="eyebrow" style="white-space:nowrap">Trusted by</div>
        ${['Nordea','Wolt','Zendesk','Rovio','Postgres','Kafka'].map(b => `<div style="font-size:18px;font-weight:500;letter-spacing:-0.02em;opacity:0.7">${b}</div>`).join('')}
      </div>

      <!-- 3 cards -->
      <div style="padding:64px 40px;background:var(--pale-green)">
        <div class="eyebrow" style="margin-bottom:32px">What we do</div>
        <div class="cards-grid">
          <div class="showcase-card light" style="background:#fff">
            <div class="label">Bridge</div>
            <h4 class="ttl">Open-source platforms, enterprise-grade.</h4>
            <p>Patched, supported, audited — without losing portability.</p>
            <div class="foot"><span class="badge badge--neutral">Apache</span><span style="font-family:var(--font-mono);font-size:10px;color:var(--mid-green)">${I.arrow}</span></div>
          </div>
          <div class="showcase-card light" style="background:#fff">
            <div class="label">Mesh</div>
            <h4 class="ttl">A network of services, not a monolith.</h4>
            <p>Compose Postgres, Kafka, Spark and Kubernetes into one cohesive plane.</p>
            <div class="foot"><span class="badge badge--neutral">Self-hosted</span><span style="font-family:var(--font-mono);font-size:10px;color:var(--mid-green)">${I.arrow}</span></div>
          </div>
          <div class="showcase-card light" style="background:#fff">
            <div class="label">Graph</div>
            <h4 class="ttl">Observability you can read in a glance.</h4>
            <p>Cost, performance, lineage — all on one screen, in real time.</p>
            <div class="foot"><span class="badge badge--neutral">Open metrics</span><span style="font-family:var(--font-mono);font-size:10px;color:var(--mid-green)">${I.arrow}</span></div>
          </div>
        </div>
      </div>

      <!-- closing dark CTA -->
      <div style="padding:80px 40px;background:var(--dark-green);color:var(--pale-green);display:grid;grid-template-columns:1fr auto;align-items:center;gap:32px">
        <h3 style="font-size:64px;line-height:1;letter-spacing:-0.035em;margin:0;font-weight:400">The <span style="color:var(--terminal-green)">*new*</span> standard <br/>in data trust.</h3>
        <button class="btn btn--accent btn--lg">Get started ${I.arrow}</button>
      </div>
    </div>
  </div>
`,

// ---------- 15 DECK COVER ----------
deck: () => `
  <section class="page__header">
    <div class="page__crumb">In Use 15 / Deck Cover</div>
    <h1 class="page__title">Decks &amp; <em>section dividers.</em></h1>
    <p class="page__lede">Two cover formats. Same proportions, opposite moods. Pick by audience: light for enterprise, dark for technical.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="deck-grid">
      <div class="deck-cover">
        <div class="bigshape">${swoopSVG('rgba(28,40,29,0.18)')}</div>
        <div class="head"><span>meshly.fi</span><img class="wm" src="assets/meshly-wordmark-black.png" alt="Meshly"/><span>2026 / Q2</span></div>
        <h2 class="title">Transform<br/>Your Data.</h2>
        <div class="foot"><span>Your trusted bridge to open-source data infrastructure</span><span>meshly.fi</span></div>
      </div>
      <div class="deck-cover dark">
        <div class="bigshape">${swoopSVG('rgba(108,255,82,0.14)')}</div>
        <div class="head"><span>meshly.fi</span><img class="wm" src="assets/meshly-wordmark-white.png" alt="Meshly"/><span>2026 / Q2</span></div>
        <h2 class="title">A new standard<br/>in data trust.</h2>
        <div class="foot"><span>For technical teams</span><span>meshly.fi</span></div>
      </div>
    </div>

    <hr class="rule"/>

    <div class="section">
      <div class="section__head">
        <span class="section__num">15.1</span>
        <h3 class="section__title">Section dividers</h3>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
        ${['Section dividers','Section dividers','Section dividers'].map((_,i) => `
          <div style="aspect-ratio:16/10;border-radius:12px;padding:32px;background:${i===1?'var(--terminal-green)':(i===2?'var(--dark-green)':'var(--pale-green)')};color:${i===2?'var(--pale-green)':'var(--dark-green)'};display:flex;flex-direction:column;justify-content:space-between;border:${i===0?'1px solid rgba(28,40,29,0.12)':'0'}">
            <div class="eyebrow" style="color:${i===2?'var(--terminal-green)':'var(--mid-green)'}">${String(i+1).padStart(2,'0')} — Section</div>
            <div style="font-size:48px;letter-spacing:-0.025em;font-weight:400;line-height:1">${['Vision','Product','Pricing'][i]}</div>
            <img src="${i===2?'assets/meshly-wordmark-white.png':'assets/meshly-wordmark-black.png'}" alt="Meshly" style="height:14px;width:auto;align-self:flex-start;opacity:0.7"/>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
`,

// ---------- 16 STATIONERY ----------
stationery: () => `
  <section class="page__header">
    <div class="page__crumb">In Use 16 / Stationery</div>
    <h1 class="page__title">In your <em>hand.</em></h1>
    <p class="page__lede">Business cards in two finishes. Same grid, same hierarchy as the rest of the system.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="bizcard-grid">
      <div class="bizcard front-light">
        <img class="wm" src="assets/meshly-logomark-black.png" alt="M"/>
        <div>
          <div class="name">Tomi Kahkanen</div>
          <div style="font-size:11px;color:var(--mid-green);margin-bottom:8px">Co-founder</div>
          <div class="rule"></div>
          <div class="meta">Etelaesplanadi 14<br/>00130 Helsinki, Finland<br/>P (+358) 50 123 4567<br/>tomi@meshly.fi · meshly.fi</div>
        </div>
      </div>
      <div class="bizcard front-dark">
        <img class="wm" src="assets/meshly-wordmark-white.png" alt="Meshly"/>
        <div>
          <div class="name">Tomi Kahkanen</div>
          <div style="font-size:11px;color:var(--mid-green);margin-bottom:8px">Co-founder</div>
          <div class="rule"></div>
          <div class="meta">Etelaesplanadi 14<br/>00130 Helsinki, Finland<br/>P (+358) 50 123 4567<br/>tomi@meshly.fi · meshly.fi</div>
        </div>
      </div>
    </div>

    <div class="section" style="margin-top:48px">
      <div class="section__head">
        <span class="section__num">16.1</span>
        <h3 class="section__title">Letterhead</h3>
      </div>
      <div style="background:var(--pure-white);border:1px solid rgba(28,40,29,0.12);border-radius:12px;aspect-ratio:1/1.41;max-width:480px;padding:48px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2">
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--mid-green);letter-spacing:0.08em">meshly.fi</div>
          <img src="assets/meshly-wordmark-black.png" alt="Meshly" style="height:22px;width:auto"/>
        </div>
        <!-- Swoop sits in the bottom-right corner only, not full bleed -->
        <div style="position:absolute;right:0;bottom:0;width:65%;height:42%;pointer-events:none;opacity:0.18">${swoopSVG('var(--dark-green)')}</div>
        <div style="position:relative;z-index:2">
          <div style="font-size:48px;letter-spacing:-0.03em;font-weight:400;line-height:0.95;color:var(--dark-green)">Transform<br/>Your Data.</div>
        </div>
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:9px;letter-spacing:0.1em;color:var(--mid-green);position:relative;z-index:2">
          <span>Your trusted bridge to open-source data infrastructure</span>
          <span>meshly.fi</span>
        </div>
      </div>
    </div>
  </div>
`,
});
})();
