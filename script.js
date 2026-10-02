// TRACE — テンプレート一覧・詳細ページの描画と、控えめな動きを担当するスクリプト。
// 動きはすべて CSS のトランジションで緩やかに行い、ここではクラスの付け外しと
// ごく僅かな位置のずれ(data-drift)だけを計算する。

(() => {
  const body = document.body;
  const base = body.dataset.base || '';   // 画像やデータへのパス(サイトのルートまで)
  const home = body.dataset.home || '';   // リンク先へのパス(その言語のトップまで)
  const lang = document.documentElement.lang === 'en' ? 'en' : 'ja';
  // 英語版では、各テンプレートの en の中身で日本語の項目を上書きする
  const templates = (window.TRACE_TEMPLATES || []).map((t) => (lang === 'en' && t.en ? { ...t, ...t.en } : t));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // スクリプトが描画する文言
  const TEXT = {
    ja: {
      details: '詳細を見る',
      purchase: 'Purchase',
      purchaseSoon: 'Purchase — Coming soon',
      crumb: 'パンくずリスト',
      build: 'このテンプレートをもとにしたサイト制作も承ります。',
      contact: 'メールで問い合わせる',
      subject: (title) => `【${title}】サイト制作のご相談`,
      missing: 'テンプレートが見つかりません。',
    },
    en: {
      details: 'View details',
      purchase: 'Purchase',
      purchaseSoon: 'Purchase — Coming soon',
      crumb: 'Breadcrumb',
      build: 'TRACE can also build your site based on this template.',
      contact: 'Contact by email',
      subject: (title) => `[${title}] Website build inquiry`,
      missing: 'Template not found.',
    },
  }[lang];

  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const src = (path) => (/^(https?:)?\/\//.test(path) ? path : base + path);
  const mailto = (subject) => `mailto:rn071.work@gmail.com?subject=${encodeURIComponent(subject)}`;

  /* ---------- テンプレート一覧(トップページ) ---------- */
  // 展示物のように、1件ごとに配置と余白を少しずつ変える
  const VARIANTS = ['a', 'b', 'c'];
  const DRIFTS = [0.03, -0.025, 0.04];

  function renderExhibits() {
    const mount = document.querySelector('[data-render="templates"]');
    if (!mount) return;
    mount.innerHTML = templates.map((t, i) => {
      const soon = t.status === 'soon';
      const href = soon ? '' : `${home}templates/${t.slug}/`;
      const media = `<img src="${esc(src(t.cover))}" alt="${esc(t.coverAlt)}" loading="lazy">`;
      return `
      <article class="exhibit exhibit--${VARIANTS[i % VARIANTS.length]}${soon ? ' is-soon' : ''}">
        ${soon
          ? `<div class="exhibit-media media" data-drift="${DRIFTS[i % DRIFTS.length]}">${media}</div>`
          : `<a class="exhibit-media media" href="${href}" data-drift="${DRIFTS[i % DRIFTS.length]}">${media}</a>`}
        <div class="exhibit-info">
          <p class="exhibit-no reveal">No. ${esc(t.no)}</p>
          <h3 class="exhibit-title reveal" data-delay="1">${esc(t.title)}</h3>
          <p class="exhibit-use reveal" data-delay="1">${esc(t.use)}${t.useJa ? `<span>${esc(t.useJa)}</span>` : ''}</p>
          <p class="exhibit-summary reveal" data-delay="2">${esc(t.summary)}</p>
          ${soon ? '' : `
          <p class="exhibit-price reveal" data-delay="3">${esc(t.price)}</p>
          <a class="link-line reveal" data-delay="3" href="${href}">${TEXT.details}</a>`}
        </div>
      </article>`;
    }).join('');
  }

  /* ---------- テンプレート詳細ページ ---------- */
  function renderDetail() {
    const mount = document.querySelector('[data-render="detail"]');
    if (!mount) return;
    const t = templates.find((x) => x.slug === body.dataset.template);
    if (!t) { mount.innerHTML = `<p class="detail-missing">${TEXT.missing}</p>`; return; }

    // 公開URLがまだないテンプレートは Live Preview を出さない
    const preview = t.previewUrl
      ? `<a class="link-line" href="${esc(t.previewUrl)}" target="_blank" rel="noopener">Live Preview ↗</a>`
      : '';

    const purchase = t.purchaseUrl
      ? `<a class="btn" href="${esc(t.purchaseUrl)}" target="_blank" rel="noopener">${TEXT.purchase}</a>`
      : `<span class="btn is-disabled" aria-disabled="true">${TEXT.purchaseSoon}</span>`;

    mount.innerHTML = `
      <section class="detail-hero">
        <nav class="crumb reveal" aria-label="${TEXT.crumb}"><a href="${home}#templates">Templates</a><span>/</span>${esc(t.title)}</nav>
        <div class="detail-head">
          <p class="exhibit-no reveal">No. ${esc(t.no)}</p>
          <h1 class="detail-title reveal" data-delay="1">${esc(t.title)}</h1>
          <p class="exhibit-use reveal" data-delay="2">${esc(t.use)}${t.useJa ? `<span>${esc(t.useJa)}</span>` : ''}</p>
        </div>
        <figure class="detail-cover media">
          <img src="${esc(src(t.cover))}" alt="${esc(t.coverAlt)}" fetchpriority="high">
        </figure>
        <aside class="detail-buy reveal" data-delay="2">
          <p class="detail-price">${esc(t.price)}${t.priceNote ? `<small>${esc(t.priceNote)}</small>` : ''}</p>
          <div class="detail-actions">
            ${purchase}
            ${preview}
          </div>
        </aside>
      </section>

      <section class="detail-intro">
        <div class="detail-desc">
          ${(t.description || []).map((p, i) => `<p class="reveal" data-delay="${i}">${esc(p)}</p>`).join('')}
        </div>
        <dl class="detail-features">
          ${(t.features || []).map((f, i) => `
          <div class="feature reveal" data-delay="${i}"><dt>${esc(f.title)}</dt><dd>${esc(f.text)}</dd></div>`).join('')}
        </dl>
      </section>

      <section class="detail-gallery">
        ${(t.gallery || []).map((g, i) => `
        <figure class="shot shot--${i % 4}">
          <div class="shot-frame media" data-drift="${i % 2 ? -0.02 : 0.025}">
            <img src="${esc(src(g.src))}" alt="${esc(g.alt)}" loading="lazy">
          </div>
          <figcaption class="reveal">${esc(g.caption)}</figcaption>
        </figure>`).join('')}
      </section>

      ${(t.mobile || []).length ? `
      <section class="detail-mobile">
        <p class="detail-label reveal">On mobile</p>
        <div class="phones">
          ${t.mobile.map((m, i) => `
          <figure class="phone media" data-drift="${[0.02, -0.03, 0.035][i % 3]}">
            <img src="${esc(src(m.src))}" alt="${esc(m.alt)}" loading="lazy">
          </figure>`).join('')}
        </div>
      </section>` : ''}

      <section class="detail-spec">
        <div class="detail-includes reveal">
          <p class="detail-label">Includes</p>
          <ul>${(t.includes || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <dl class="detail-specs reveal" data-delay="1">
          ${(t.specs || []).map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('')}
        </dl>
      </section>

      <section class="detail-end">
        <div class="detail-buy detail-buy--end reveal">
          <p class="detail-price">${esc(t.price)}${t.priceNote ? `<small>${esc(t.priceNote)}</small>` : ''}</p>
          <div class="detail-actions">
            ${purchase}
            ${preview}
          </div>
        </div>
        <div class="detail-build reveal" data-delay="1">
          <p>${TEXT.build}</p>
          <a class="link-line" href="${mailto(TEXT.subject(t.title))}">${TEXT.contact}</a>
        </div>
        <a class="detail-back reveal" data-delay="2" href="${home}#templates">← Templates</a>
      </section>`;
  }

  /* ---------- モバイルのナビ ---------- */
  function nav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('nav');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 画面に入ったら、ゆっくり現れる ---------- */
  function reveal() {
    const targets = document.querySelectorAll('.reveal, .media');
    targets.forEach((el) => {
      if (el.dataset.delay) el.style.setProperty('--delay', `${Number(el.dataset.delay) * 0.14}s`);
    });
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- スクロールに合わせて、ごく僅かに位置がずれる ---------- */
  function drift() {
    if (reduceMotion) return;
    const els = [...document.querySelectorAll('[data-drift]')];
    if (!els.length) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.drift);
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- ページ遷移:静かに消えて、静かに現れる ---------- */
  function transitions() {
    if (reduceMotion) return;
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.protocol === 'mailto:') return;
      if (url.pathname === location.pathname) return; // 同じページ内のアンカーは通常のスクロール
      e.preventDefault();
      body.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 480);
    });
    // 戻るボタンでキャッシュから復帰したときに、消えたままにならないようにする
    window.addEventListener('pageshow', (e) => { if (e.persisted) body.classList.remove('is-leaving'); });
  }

  window.TRACE_READY = true;
  renderExhibits();
  renderDetail();
  nav();
  reveal();
  drift();
  transitions();
})();
