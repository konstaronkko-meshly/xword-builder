/* pages-brand.js — registers page builders onto window.MPages */
(function(){
const { I, swoopSVG } = window.MShared;
window.MPages = window.MPages || {};
Object.assign(window.MPages, {
overview: () => `
  <section class="page__header">
    <div class="page__crumb">Brand 00 / Overview</div>
    <h1 class="page__title">The Meshly <em>brand book.</em></h1>
    <p class="page__lede">A practical guide to how Meshly looks, sounds and behaves. Built for designers, engineers and marketers shipping anything in the brand.</p>
  </section>

  <div class="page__body page__body--wide" style="padding-right:80px">
    <div class="overview-hero">
      ${swoopSVG('rgba(108,255,82,0.06)','#1C281D','#6CFF52')}
      <div style="position:relative;z-index:2">
        <div class="eyebrow" style="margin-bottom:24px">Version 1.0 — Spring 2026</div>
        <h2 class="overview-hero__title">Open-Source Power, <em>Enterprise Ready.</em></h2>
      </div>
      <div class="overview-hero__meta" style="position:relative;z-index:2">
        <div>
          <div class="label">Built by</div>
          <div class="val">Meshly Brand Studio</div>
        </div>
        <div>
          <div class="label">Custodian</div>
          <div class="val">design@meshly.fi</div>
        </div>
        <div>
          <div class="label">License</div>
          <div class="val">Internal &amp; partners</div>
        </div>
        <div>
          <div class="label">Last revised</div>
          <div class="val">04.30.2026</div>
        </div>
      </div>
    </div>

    <div class="contents-grid">
      <div class="contents-card" data-go="vision">
        <div class="num">01 — Brand</div>
        <h3 class="ttl">Vision &amp; Mission</h3>
        <p class="desc">The reason Meshly exists, in two sentences.</p>
      </div>
      <div class="contents-card" data-go="voice">
        <div class="num">03 — Brand</div>
        <h3 class="ttl">Voice &amp; Tone</h3>
        <p class="desc">How we sound — confident, technical, never breathless.</p>
      </div>
      <div class="contents-card" data-go="logo">
        <div class="num">04 — Foundation</div>
        <h3 class="ttl">Logo</h3>
        <p class="desc">Wordmark, M-mark, clear space, do's and don'ts.</p>
      </div>
      <div class="contents-card" data-go="color">
        <div class="num">05 — Foundation</div>
        <h3 class="ttl">Color</h3>
        <p class="desc">A green system anchored in Dark Green and Terminal Green.</p>
      </div>
      <div class="contents-card" data-go="type">
        <div class="num">06 — Foundation</div>
        <h3 class="ttl">Typography</h3>
        <p class="desc">Geist across the system, six considered sizes.</p>
      </div>
      <div class="contents-card" data-go="buttons">
        <div class="num">10 — Component</div>
        <h3 class="ttl">Buttons &amp; Inputs</h3>
        <p class="desc">Pill buttons. Sharp inputs. Predictable behavior.</p>
      </div>
    </div>
  </div>
`,

// ---------- 01 VISION & MISSION ----------
vision: () => `
  <section class="page__header">
    <div class="page__crumb">Brand 01 / Vision &amp; Mission</div>
    <h1 class="page__title">Why we <em>exist.</em></h1>
    <p class="page__lede">Two statements. The first is the world we're building toward. The second is what we do, every day, to get there.</p>
  </section>

  <div class="page__body">
    <div class="vm-pair">
      <div class="vm-card">
        <div class="label">Vision</div>
        <p class="body">To bridge the enterprise world and open-source data platforms, creating a new standard for trusted, sustainable data infrastructure.</p>
        <div class="eyebrow" style="color:var(--mid-green)">A future state</div>
      </div>
      <div class="vm-card">
        <div class="label">Mission</div>
        <p class="body">We help enterprises gain the full benefits of open-source data platforms — sovereignty over their data infrastructure, transparent technology, and cost efficiency without vendor lock-in.</p>
        <div class="eyebrow" style="color:var(--mid-green)">Today's job</div>
      </div>
    </div>

    <div class="values-strip">
      <div class="label">Values — at a glance</div>
      <div class="grid">
        <div class="tile">Quality</div>
        <div class="tile">Independent</div>
        <div class="tile">Collaborative</div>
        <div class="tile">Fun</div>
        <div class="tile">Caring</div>
      </div>
    </div>

    <hr class="rule"/>

    <div class="section">
      <div class="section__head">
        <span class="section__num">01.1</span>
        <h3 class="section__title">Brand promise</h3>
      </div>
      <p style="font-size:32px;line-height:1.2;letter-spacing:-0.02em;max-width:880px;margin:0;font-weight:400">
        Your trusted bridge to <span style="color:var(--mid-green)">open-source data infrastructure.</span>
      </p>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">01.2</span>
        <h3 class="section__title">Audiences</h3>
      </div>
      <div class="pair">
        <div class="pair__cell pair__cell--light">
          <div class="pair__label" style="color:var(--mid-green)">For Enterprises</div>
          <h4 style="font-size:36px;letter-spacing:-0.02em;font-weight:400;margin:24px 0 0;line-height:1.05">Open-Source Power, <span style="color:var(--mid-green)">Enterprise Ready.</span></h4>
          <div class="eyebrow">Risk-conscious leaders → CIO, CTO, Head of Data</div>
        </div>
        <div class="pair__cell pair__cell--dark">
          <div class="pair__label">For Technical Teams</div>
          <h4 style="font-size:36px;letter-spacing:-0.02em;font-weight:400;margin:24px 0 0;line-height:1.05;color:var(--terminal-green)">The *New* Standard <br/>in Data Trust</h4>
          <div class="eyebrow">Builders &amp; operators → Platform engineers, SREs, Data leads</div>
        </div>
      </div>
    </div>
  </div>
`,

// ---------- 02 VALUES ----------
values: () => {
  const values = [
    ['01', 'Quality', 'We ship things we are proud of. Boring fundamentals — testing, documentation, clean APIs — done with care. No "good enough for now."', 'Decisions in this value:<br/><b>•</b> SLA &gt; flashiness<br/><b>•</b> Tests before features<br/><b>•</b> Reviews not approvals'],
    ['02', 'Independent', 'No vendor lock-in. Not for our customers, not for us. We build on open standards and we leave systems portable.', 'Decisions in this value:<br/><b>•</b> Open formats first<br/><b>•</b> Apache &amp; PostgreSQL ecosystem<br/><b>•</b> Customer owns their data'],
    ['03', 'Collaborative', 'Customers, partners, the open-source community — we work with the room, not at it. Default to sharing.', 'Decisions in this value:<br/><b>•</b> Public roadmaps<br/><b>•</b> Upstream contributions<br/><b>•</b> Co-designed onboarding'],
    ['04', 'Fun', 'Data infrastructure is serious work. The people doing it shouldn\'t have to be. We pick energy and play over corporate beige.', 'Decisions in this value:<br/><b>•</b> Bright accent green<br/><b>•</b> Plain language<br/><b>•</b> Demos, not slideware'],
    ['05', 'Caring', 'Our customers are betting on us with critical infrastructure. We treat that bet with the seriousness it deserves.', 'Decisions in this value:<br/><b>•</b> 24/7 incident response<br/><b>•</b> Personal account leads<br/><b>•</b> No dark patterns'],
  ];
  return `
  <section class="page__header">
    <div class="page__crumb">Brand 02 / Values</div>
    <h1 class="page__title">Five <em>commitments.</em></h1>
    <p class="page__lede">Values are decisions we've already made — so we don't have to re-make them every Monday. Each one shapes how we hire, design, write and ship.</p>
  </section>

  <div class="page__body">
    ${values.map(([n, t, b, a]) => `
      <div class="value-row">
        <div class="num-name">${n} — Value</div>
        <div>
          <h3 class="v-title">${t}</h3>
          <p class="v-body">${b}</p>
        </div>
        <div class="v-aside">${a}</div>
      </div>
    `).join('')}
  </div>
  `;
},

// ---------- 03 VOICE ----------
voice: () => `
  <section class="page__header">
    <div class="page__crumb">Brand 03 / Voice &amp; Tone</div>
    <h1 class="page__title">How we <em>sound.</em></h1>
    <p class="page__lede">Confident without being loud. Technical without being cold. We earn trust by being specific.</p>
  </section>

  <div class="page__body">
    <div class="section">
      <div class="section__head">
        <span class="section__num">03.1</span>
        <h3 class="section__title">Pillars</h3>
        <span class="section__sub">Voice is who we are. Tone shifts with the moment.</span>
      </div>
      <div class="voice-pillars">
        <div class="voice-pillar">
          <div class="num">01 / Pillar</div>
          <h4>Specific</h4>
          <p>Numbers, names, versions. Never "leverages synergies." If we can't be concrete, we don't say it.</p>
        </div>
        <div class="voice-pillar">
          <div class="num">02 / Pillar</div>
          <h4>Plainspoken</h4>
          <p>Short sentences. Working verbs. We assume our reader is smart and short on time.</p>
        </div>
        <div class="voice-pillar">
          <div class="num">03 / Pillar</div>
          <h4>Optimistic</h4>
          <p>We believe data infrastructure should feel light. Our copy carries some of that energy.</p>
        </div>
        <div class="voice-pillar">
          <div class="num">04 / Pillar</div>
          <h4>Honest</h4>
          <p>We name trade-offs. We don't fake completeness. "Beta" means beta.</p>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">03.2</span>
        <h3 class="section__title">Do &amp; don't — headlines</h3>
        <span class="section__sub">Show the benefit. Skip the buzzwords.</span>
      </div>

      <div class="dodont">
        <div class="dodont__cell dodont__cell--do">
          <div class="header"><span class="mark">${I.check}</span>Do</div>
          <p class="quote">"Postgres-native, with sovereignty built in."</p>
          <div class="why">Concrete tech. Clear value. 6 words.</div>
        </div>
        <div class="dodont__cell dodont__cell--dont">
          <div class="header"><span class="mark">×</span>Don't</div>
          <p class="quote">"Unlock next-generation cloud-native data synergies."</p>
          <div class="why">Vague. Stacked adjectives. Nothing specific.</div>
        </div>
      </div>

      <div class="dodont">
        <div class="dodont__cell dodont__cell--do">
          <div class="header"><span class="mark">${I.check}</span>Do</div>
          <p class="quote">"Cut your data-platform bill by 60%. Same SLA."</p>
          <div class="why">Outcome with a number. Acknowledges the obvious worry.</div>
        </div>
        <div class="dodont__cell dodont__cell--dont">
          <div class="header"><span class="mark">×</span>Don't</div>
          <p class="quote">"Revolutionary cost optimization platform."</p>
          <div class="why">"Revolutionary" is what we'd like to be told, not what we say.</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">03.3</span>
        <h3 class="section__title">Word swaps</h3>
        <span class="section__sub">Quick reference for copy reviews.</span>
      </div>
      <div class="wordswap">
        <div class="wordswap__head">
          <div>Use this</div><div>Not this</div>
        </div>
        <div class="wordswap__row"><div class="yes">Open source</div><div class="no">Open-source ecosystem play</div></div>
        <div class="wordswap__row"><div class="yes">Customer</div><div class="no">User journey persona</div></div>
        <div class="wordswap__row"><div class="yes">Run on your infrastructure</div><div class="no">Hybrid-cloud agnostic deployment</div></div>
        <div class="wordswap__row"><div class="yes">It works</div><div class="no">Best-in-class reliability</div></div>
        <div class="wordswap__row"><div class="yes">PostgreSQL, Kafka, Spark</div><div class="no">Industry-leading data platforms</div></div>
        <div class="wordswap__row"><div class="yes">Talk to us</div><div class="no">Engage with our success team</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section__head">
        <span class="section__num">03.4</span>
        <h3 class="section__title">Tone by context</h3>
        <span class="section__sub">Same voice, different setting.</span>
      </div>
      <div class="cards-grid">
        <div class="showcase-card light">
          <div class="label">Marketing</div>
          <h4 class="ttl">Direct, energetic.</h4>
          <p>Lead with the outcome. Headlines under 8 words.</p>
          <div class="foot"><span class="badge badge--neutral badge--dot">Public</span></div>
        </div>
        <div class="showcase-card light">
          <div class="label">Product UI</div>
          <h4 class="ttl">Quiet, helpful.</h4>
          <p>Labels not slogans. The product does the talking.</p>
          <div class="foot"><span class="badge badge--neutral badge--dot">In-app</span></div>
        </div>
        <div class="showcase-card light">
          <div class="label">Docs</div>
          <h4 class="ttl">Precise, exhaustive.</h4>
          <p>One way to do each thing. Examples for every claim.</p>
          <div class="foot"><span class="badge badge--neutral badge--dot">Reference</span></div>
        </div>
      </div>
    </div>
  </div>
`,

// ---------- 04 LOGO ----------
});
})();
