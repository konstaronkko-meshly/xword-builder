/* pages-components.js — registers page builders onto window.MPages */
(function(){
const { I, swoopSVG } = window.MShared;
window.MPages = window.MPages || {};
Object.assign(window.MPages, {
buttons: () => `
  <section class="page__header">
    <div class="page__crumb">Component 10 / Buttons</div>
    <h1 class="page__title">Pill-shaped, <em>direct.</em></h1>
    <p class="page__lede">Five variants. Three sizes. The arrow icon is part of the language — use it on outbound and primary actions.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="section">
      <div class="section__head">
        <span class="section__num">10.1</span>
        <h3 class="section__title">Variants — light surface</h3>
      </div>
      <div class="btn-grid">
        <div class="label">Primary</div>
        <div class="row"><button class="btn btn--primary">Enquire now ${I.arrow}</button><button class="btn btn--primary btn--sm">Enquire now</button><button class="btn btn--primary btn--lg">Enquire now ${I.arrow}</button></div>
      </div>
      <div class="btn-grid">
        <div class="label">Accent</div>
        <div class="row"><button class="btn btn--accent">Try the demo ${I.arrow}</button><button class="btn btn--accent btn--sm">Try the demo</button><button class="btn btn--accent btn--lg">Try the demo ${I.arrow}</button></div>
      </div>
      <div class="btn-grid">
        <div class="label">Secondary</div>
        <div class="row"><button class="btn btn--secondary">Read the docs</button><button class="btn btn--secondary btn--sm">Read the docs</button><button class="btn btn--secondary btn--lg">Read the docs</button></div>
      </div>
      <div class="btn-grid">
        <div class="label">Ghost</div>
        <div class="row"><button class="btn btn--ghost">Cancel</button><button class="btn btn--ghost btn--sm">Cancel</button><button class="btn btn--ghost btn--lg">Cancel</button></div>
      </div>
      <div class="btn-grid">
        <div class="label">Link</div>
        <div class="row"><a class="btn btn--link">Learn more about Meshly</a></div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">10.2</span>
        <h3 class="section__title">On dark surface</h3>
      </div>
      <div class="btn-on-dark">
        <button class="btn btn--accent">Get started ${I.arrow}</button>
        <button class="btn" style="background:transparent;border:1px solid var(--terminal-green);color:var(--terminal-green)">View source</button>
        <button class="btn" style="background:transparent;color:var(--pale-green);border:1px solid rgba(239,246,228,0.2)">Cancel</button>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">10.3</span>
        <h3 class="section__title">States</h3>
      </div>
      <div class="cards-grid">
        <div class="card"><div class="eyebrow" style="margin-bottom:16px">Default</div><button class="btn btn--primary">Enquire now ${I.arrow}</button></div>
        <div class="card"><div class="eyebrow" style="margin-bottom:16px">Hover</div><button class="btn btn--primary" style="background:#0F1810;transform:translateY(-1px)">Enquire now ${I.arrow}</button></div>
        <div class="card"><div class="eyebrow" style="margin-bottom:16px">Disabled</div><button class="btn btn--primary" style="opacity:0.4;cursor:not-allowed">Enquire now ${I.arrow}</button></div>
      </div>
    </div>
  </div>
`,

// ---------- 11 FORMS ----------
forms: () => `
  <section class="page__header">
    <div class="page__crumb">Component 11 / Forms</div>
    <h1 class="page__title">Inputs that <em>get out of the way.</em></h1>
    <p class="page__lede">Light borders. Monospace labels. Terminal Green focus rings. Forms feel like tooling, not signup wizards.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="section">
      <div class="section__head">
        <span class="section__num">11.1</span>
        <h3 class="section__title">Text fields</h3>
      </div>
      <div class="pair">
        <div class="pair__cell pair__cell--light" style="display:block;padding:40px">
          <div class="form-pair" style="margin-bottom:24px">
            <div class="field"><label class="field__label">Full name</label><input class="input" placeholder="Tomi Kahkonen" /></div>
            <div class="field"><label class="field__label">Work email</label><input class="input" value="tomi@meshly.fi" /></div>
          </div>
          <div class="field" style="margin-bottom:24px"><label class="field__label">Company</label><input class="input" placeholder="Acme Corp." /><span class="field__hint">We use this to route your enquiry.</span></div>
          <div class="field"><label class="field__label">What are you trying to solve?</label><textarea class="input" rows="4" placeholder="Tell us about your data platform…"></textarea></div>
        </div>
        <div class="pair__cell pair__cell--dark" style="display:block;padding:40px">
          <div class="form-pair" style="margin-bottom:24px">
            <div class="field"><label class="field__label" style="color:var(--terminal-green)">Full name</label><input class="input input--dark" placeholder="Tomi Kahkonen" /></div>
            <div class="field"><label class="field__label" style="color:var(--terminal-green)">Work email</label><input class="input input--dark" value="tomi@meshly.fi" /></div>
          </div>
          <div class="field"><label class="field__label" style="color:var(--terminal-green)">What are you trying to solve?</label><textarea class="input input--dark" rows="4" placeholder="Tell us about your data platform…"></textarea></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">11.2</span>
        <h3 class="section__title">Selectors</h3>
      </div>
      <div class="cards-grid">
        <div class="card">
          <div class="eyebrow" style="margin-bottom:16px">Checkbox</div>
          <div class="checkrow"><span class="check check--on">${I.check}</span> Apache Kafka</div>
          <div class="checkrow"><span class="check check--on">${I.check}</span> PostgreSQL</div>
          <div class="checkrow"><span class="check"></span> Apache Spark</div>
          <div class="checkrow"><span class="check"></span> Kubernetes</div>
        </div>
        <div class="card">
          <div class="eyebrow" style="margin-bottom:16px">Radio</div>
          <div class="checkrow"><span class="radio radio--on"></span> Self-hosted</div>
          <div class="checkrow"><span class="radio"></span> Managed cloud</div>
          <div class="checkrow"><span class="radio"></span> Hybrid</div>
        </div>
        <div class="card">
          <div class="eyebrow" style="margin-bottom:16px">Toggle</div>
          <div class="checkrow" style="justify-content:space-between">Telemetry <span class="toggle toggle--on"></span></div>
          <div class="checkrow" style="justify-content:space-between">Beta features <span class="toggle"></span></div>
          <div class="checkrow" style="justify-content:space-between">Auto-upgrade <span class="toggle toggle--on"></span></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">11.3</span>
        <h3 class="section__title">Validation</h3>
      </div>
      <div class="form-pair">
        <div class="field">
          <label class="field__label">Email — valid</label>
          <input class="input" value="tomi@meshly.fi" style="outline:2px solid var(--terminal-green);outline-offset:-1px;border-color:var(--terminal-green)" />
          <span class="field__hint" style="color:var(--mid-green)">✓ Verified domain</span>
        </div>
        <div class="field">
          <label class="field__label">Email — error</label>
          <input class="input" value="tomi@" style="outline:2px solid var(--grey-orange);outline-offset:-1px;border-color:var(--grey-orange)" />
          <span class="field__hint" style="color:var(--grey-orange)">Looks incomplete. Try a full address.</span>
        </div>
      </div>
    </div>
  </div>
`,

// ---------- 12 CARDS ----------
cards: () => `
  <section class="page__header">
    <div class="page__crumb">Component 12 / Cards &amp; Containers</div>
    <h1 class="page__title">Three card <em>moods.</em></h1>
    <p class="page__lede">Light, dark, accent. Always 20px corner radius, always 28px padding. Vary the contrast, never the geometry.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="section">
      <div class="section__head">
        <span class="section__num">12.1</span>
        <h3 class="section__title">Showcase cards</h3>
      </div>
      <div class="cards-grid">
        <div class="showcase-card light">
          <div class="label">Light / Default</div>
          <h4 class="ttl">Postgres-native, with sovereignty built in.</h4>
          <p>Run Meshly on your own VPC with full administrative control. No external phone-home.</p>
          <div class="foot"><span class="badge badge--neutral badge--dot">Self-hosted</span><span style="font-family:var(--font-mono);font-size:10px;color:var(--mid-green)">${I.arrow}</span></div>
        </div>
        <div class="showcase-card dark">
          <div class="label">Dark / Featured</div>
          <h4 class="ttl">A new standard in <span style="color:var(--terminal-green)">data trust.</span></h4>
          <p>Built on open formats. Audited by your team. Owned by you.</p>
          <div class="foot"><span class="badge badge--success badge--dot">Beta</span><span style="font-family:var(--font-mono);font-size:10px;color:var(--terminal-green)">${I.arrow}</span></div>
        </div>
        <div class="showcase-card accent">
          <div class="label">Accent / CTA</div>
          <h4 class="ttl">Cut your data-platform bill by 60%.</h4>
          <p>Real customer numbers. We'll show you ours if you show us yours.</p>
          <div class="foot"><span class="badge" style="background:var(--dark-green);color:var(--terminal-green)">Talk to us</span><span style="font-family:var(--font-mono);font-size:10px">${I.arrow}</span></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">12.2</span>
        <h3 class="section__title">Badges</h3>
      </div>
      <div class="card">
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          <span class="badge badge--neutral">Neutral</span>
          <span class="badge badge--neutral badge--dot">With dot</span>
          <span class="badge badge--success">Live</span>
          <span class="badge badge--success badge--dot">Operational</span>
          <span class="badge badge--info">Info</span>
          <span class="badge badge--warn">Beta</span>
          <span class="badge badge--outline">Outline</span>
          <span class="badge" style="background:var(--dark-green);color:var(--terminal-green)">On dark</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">12.3</span>
        <h3 class="section__title">Pricing card pattern</h3>
      </div>
      <div class="pair">
        <div class="pair__cell pair__cell--light" style="display:block;padding:36px">
          <div class="eyebrow" style="margin-bottom:24px">Open Core</div>
          <div style="font-size:64px;letter-spacing:-0.03em;font-weight:400;line-height:1">€0<span style="font-size:18px;color:var(--mid-green);margin-left:4px">/ forever</span></div>
          <p style="margin:16px 0 24px;color:var(--mid-green);font-size:14px;line-height:1.55">Apache 2.0. Run it yourself, no strings attached.</p>
          <button class="btn btn--secondary" style="width:100%;justify-content:center">Download ${I.arrow}</button>
        </div>
        <div class="pair__cell pair__cell--dark" style="display:block;padding:36px;border:1px solid var(--terminal-green)">
          <div class="eyebrow" style="color:var(--terminal-green);margin-bottom:24px">Enterprise</div>
          <div style="font-size:64px;letter-spacing:-0.03em;font-weight:400;line-height:1;color:var(--terminal-green)">€10K<span style="font-size:18px;color:var(--mid-green);margin-left:4px">/ month</span></div>
          <p style="margin:16px 0 24px;color:var(--light-green);font-size:14px;line-height:1.55">SLA, SSO, dedicated success engineer.</p>
          <button class="btn btn--accent" style="width:100%;justify-content:center">Talk to us ${I.arrow}</button>
        </div>
      </div>
    </div>
  </div>
`,

// ---------- 13 DATA & CHARTS ----------
data: () => `
  <section class="page__header">
    <div class="page__crumb">Component 13 / Data &amp; Charts</div>
    <h1 class="page__title">Data, <em>set in green.</em></h1>
    <p class="page__lede">Big numbers, generous whitespace. Charts use the green ladder by default; reach for Cyan and Orange when categories must be distinct.</p>
  </section>

  <div class="page__body page__body--wide">
    <div class="stat-row">
      <div class="stat-card"><div class="label">Cost reduction</div><div class="num">60%</div><div class="delta delta--up">↓ 18% YoY</div></div>
      <div class="stat-card"><div class="label">Lock-in</div><div class="num">0%</div><div class="delta">Open formats only</div></div>
      <div class="stat-card"><div class="label">Industry adoption</div><div class="num">↑85%</div><div class="delta">Apache + Postgres</div></div>
      <div class="stat-card"><div class="label">Mean SLA</div><div class="num">99.95</div><div class="delta">Last 12 months</div></div>
    </div>

    <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:16px;margin-bottom:32px">
      <div class="chart-card dark">
        <div class="head">
          <div>
            <div class="meta" style="color:var(--terminal-green);margin-bottom:6px">Adoption — last 24 months</div>
            <div class="ttl">Bookings vs forecast</div>
          </div>
          <span class="badge" style="background:var(--terminal-green);color:var(--dark-green)">+128%</span>
        </div>
        <svg viewBox="0 0 600 220" width="100%" preserveAspectRatio="none" style="display:block">
          ${[0,1,2,3,4].map(i => `<line x1="0" x2="600" y1="${44*i+22}" y2="${44*i+22}" stroke="rgba(108,255,82,0.1)"/>`).join('')}
          <path d="M0 180 L40 168 L80 175 L120 150 L160 138 L200 130 L240 110 L280 95 L320 80 L360 65 L400 55 L440 50 L480 32 L520 24 L560 18 L600 14"
            stroke="#6CFF52" stroke-width="2.5" fill="none"/>
          <path d="M0 180 L40 168 L80 175 L120 150 L160 138 L200 130 L240 110 L280 95 L320 80 L360 65 L400 55 L440 50 L480 32 L520 24 L560 18 L600 14 L600 220 L0 220 Z"
            fill="rgba(108,255,82,0.12)"/>
          <path d="M0 180 L80 165 L160 145 L240 125 L320 105 L400 85 L480 65 L560 50 L600 42"
            stroke="rgba(239,246,228,0.4)" stroke-width="1.5" fill="none" stroke-dasharray="4 4"/>
          <circle cx="600" cy="14" r="4" fill="#6CFF52"/>
        </svg>
        <div style="display:flex;gap:24px;margin-top:16px;font-family:var(--font-mono);font-size:10px;color:var(--mid-green);letter-spacing:0.08em;text-transform:uppercase">
          <span><span style="display:inline-block;width:10px;height:2px;background:#6CFF52;vertical-align:middle;margin-right:6px"></span>Actual</span>
          <span><span style="display:inline-block;width:10px;height:2px;border-top:1px dashed rgba(239,246,228,0.4);vertical-align:middle;margin-right:6px"></span>Forecast</span>
        </div>
      </div>
      <div class="chart-card">
        <div class="head">
          <div>
            <div class="meta" style="margin-bottom:6px">Industry split</div>
            <div class="ttl">↑85% adoption</div>
          </div>
        </div>
        <svg viewBox="0 0 200 200" style="width:100%;max-width:240px;margin:0 auto;display:block">
          ${(() => {
            const segs = [['#6CFF52', 38, 'Finance'],['#1C281D', 22, 'Logistics'],['#6F9362', 16, 'Health'],['#C9E0AF', 14, 'Public'],['#FFA74E', 10, 'Other']];
            let acc = 0;
            const r = 80, cx = 100, cy = 100;
            return segs.map(([c, p]) => {
              const start = acc / 100 * Math.PI * 2 - Math.PI/2;
              acc += p;
              const end = acc / 100 * Math.PI * 2 - Math.PI/2;
              const large = p > 50 ? 1 : 0;
              const x1 = cx + r*Math.cos(start), y1 = cy + r*Math.sin(start);
              const x2 = cx + r*Math.cos(end), y2 = cy + r*Math.sin(end);
              return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${c}"/>`;
            }).join('');
          })()}
          <circle cx="100" cy="100" r="46" fill="#FFFFFF"/>
        </svg>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:16px;font-family:var(--font-mono);font-size:10px;color:var(--mid-green)">
          <span><span style="display:inline-block;width:8px;height:8px;background:#6CFF52;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Finance 38%</span>
          <span><span style="display:inline-block;width:8px;height:8px;background:#1C281D;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Logistics 22%</span>
          <span><span style="display:inline-block;width:8px;height:8px;background:#6F9362;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Health 16%</span>
          <span><span style="display:inline-block;width:8px;height:8px;background:#C9E0AF;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Public 14%</span>
          <span><span style="display:inline-block;width:8px;height:8px;background:#FFA74E;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Other 10%</span>
        </div>
      </div>
    </div>

    <div class="chart-card" style="margin-bottom:32px">
      <div class="head">
        <div>
          <div class="meta" style="margin-bottom:6px">Compute cost — quarterly</div>
          <div class="ttl">Spend &amp; savings</div>
        </div>
        <span class="badge badge--success badge--dot">Live</span>
      </div>
      <svg viewBox="0 0 800 240" width="100%" preserveAspectRatio="none" style="display:block">
        ${Array.from({length:12}, (_, i) => {
          const x = 30 + i * 62;
          const h1 = 30 + Math.random() * 80;
          const h2 = 30 + i * 12;
          return `
            <rect x="${x}" y="${220 - h1 - h2}" width="40" height="${h2}" fill="#1C281D"/>
            <rect x="${x}" y="${220 - h1}" width="40" height="${h1}" fill="#6CFF52"/>
          `;
        }).join('')}
        <line x1="0" x2="800" y1="220" y2="220" stroke="rgba(28,40,29,0.2)"/>
      </svg>
      <div style="display:flex;gap:24px;margin-top:16px;font-family:var(--font-mono);font-size:10px;color:var(--mid-green);letter-spacing:0.08em;text-transform:uppercase">
        <span><span style="display:inline-block;width:10px;height:10px;background:#6CFF52;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Saved</span>
        <span><span style="display:inline-block;width:10px;height:10px;background:#1C281D;border-radius:2px;vertical-align:middle;margin-right:6px"></span>Spent</span>
      </div>
    </div>

    <div class="chart-card">
      <div class="head">
        <div>
          <div class="meta" style="margin-bottom:6px">Customer table</div>
          <div class="ttl">Active accounts</div>
        </div>
      </div>
      <table class="table">
        <thead><tr><th>Customer</th><th>Region</th><th>Plan</th><th>Status</th><th>MRR</th></tr></thead>
        <tbody>
          <tr><td><div class="name"><span class="av">NR</span>Nordea</div></td><td>EMEA</td><td>Enterprise</td><td><span class="badge badge--success badge--dot">Live</span></td><td>€42K</td></tr>
          <tr><td><div class="name"><span class="av">WO</span>Wolt</div></td><td>EMEA</td><td>Enterprise</td><td><span class="badge badge--success badge--dot">Live</span></td><td>€28K</td></tr>
          <tr><td><div class="name"><span class="av">ZD</span>Zendesk</div></td><td>NA</td><td>Enterprise</td><td><span class="badge badge--warn badge--dot">Onboarding</span></td><td>€18K</td></tr>
          <tr><td><div class="name"><span class="av">RV</span>RoVio</div></td><td>EMEA</td><td>Open Core</td><td><span class="badge badge--neutral badge--dot">Self-hosted</span></td><td>—</td></tr>
        </tbody>
      </table>
    </div>
  </div>
`,

// ---------- 14 WEB ----------
});
})();
