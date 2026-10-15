// TRACE — テンプレート一覧・詳細ページの描画と、控えめな動きを担当するスクリプト。
// 動きはすべて CSS のトランジションで緩やかに行い、ここではクラスの付け外しと
// ごく僅かな位置のずれ(data-drift)だけを計算する。

(() => {
  const body = document.body;
  const base = body.dataset.base || '';   // 画像やデータへのパス(サイトのルートまで)
  const home = body.dataset.home || '';   // リンク先へのパス(その言語のトップまで)
  const lang = document.documentElement.lang === 'ja' ? 'ja' : 'en';
  // 英語が基本。日本語版(/ja/)では、各テンプレートの ja の中身で項目を上書きする
  // 取り下げたテンプレート(status: 'retired')はどこにも出さない
  const templates = (window.TRACE_TEMPLATES || []).filter((t) => t.status !== 'retired').map((t) => (lang === 'ja' && t.ja ? { ...t, ...t.ja } : t));
  // 価格帯(Signature / Essential / Free)。一覧はこの順に、価格帯ごとに分けて並べる
  const tiers = (window.TRACE_TIERS || []).map((t) => (lang === 'ja' && t.ja ? { ...t, ...t.ja } : t));
  const tierOf = (t) => tiers.find((x) => x.id === t.tier);
  // 「Free」のように、名前と価格が同じ価格帯は価格を重ねて出さない
  const samePrice = (tier) => String(tier.price).toLowerCase() === String(tier.name).toLowerCase();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // スクリプトが描画する文言
  const TEXT = {
    ja: {
      details: '詳細を見る',
      purchase: 'Purchase',
      download: '無料でダウンロード',
      purchaseSoon: 'Purchase — Coming soon',
      crumb: 'パンくずリスト',
      count: (n) => `${n}点`,
      tiersLabel: '価格帯',
      build: 'このテンプレートをもとにしたサイト制作も承ります。',
      contact: 'メールで問い合わせる',
      subject: (title) => `【${title}】サイト制作のご相談`,
      missing: 'テンプレートが見つかりません。',
      motion: 'In motion',
      motionNote: 'ライブプレビューを録画したものです。',
      how: '購入から公開まで',
      howNote: 'コードの知識は不要 · ビルド不要',
      list: (xs) => xs.join('・'),
      steps: (t, files, free) => [
        ['購入してダウンロード', free ? 'チェックアウト画面から、無料でZIPを受け取れます。' : 'Polar で一度お支払いいただくと、すぐにZIPをダウンロードできます。'],
        ['ガイドを開く', t.edit.guide === 'README' ? 'README(日本語・英語)に、変更したい内容と書き換える場所をまとめています。' : 'START_HERE(日本語・英語)が、手順を一つずつ案内します。'],
        [`${files} を書き換える`, 'あなたの名前・文章・写真の一覧は、ここにまとまっています。クォートの間の文字を書き換えるだけで、HTMLは触りません。'],
        ['写真を入れて公開', '写真を images フォルダに入れ、フォルダごと Netlify や Cloudflare Pages にドラッグします。どちらも無料プランがあります。'],
      ],
      fileNote: '実際の編集はこのような形です。',
      guide: '導入ガイドを読む',
      about: (name) => `${name} について`,
      compare: '価格帯をくらべる',
    },
    en: {
      details: 'View details',
      purchase: 'Purchase',
      download: 'Download for free',
      purchaseSoon: 'Purchase — Coming soon',
      crumb: 'Breadcrumb',
      count: (n) => `${n} ${n === 1 ? 'template' : 'templates'}`,
      tiersLabel: 'Price tiers',
      build: 'TraceStudio can also build your site based on this template.',
      contact: 'Contact by email',
      subject: (title) => `[${title}] Website build inquiry`,
      missing: 'Template not found.',
      motion: 'In motion',
      motionNote: 'Recorded from the live preview.',
      how: 'From purchase to publish',
      howNote: 'No coding needed · No build step',
      list: (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`),
      steps: (t, files, free) => [
        ['Buy and download', free ? 'Get the ZIP for free from the checkout page.' : 'Pay once on Polar. The ZIP is ready to download right away.'],
        ['Open the guide', t.edit.guide === 'README' ? 'The README (English and Japanese) lists each change and where to make it.' : 'The START_HERE guide (English and Japanese) walks you through each step.'],
        [`Edit ${files}`, 'Your name, words and photo list live here. Change the text between the quotes — no need to touch the HTML.'],
        ['Add your photos and publish', 'Drop your photos into the images folder, then drag the whole folder into Netlify or Cloudflare Pages. Both have free plans.'],
      ],
      fileNote: 'This is what editing looks like.',
      guide: 'Read the setup guide',
      about: (name) => `About ${name}`,
      compare: 'Compare tiers',
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

  const exhibit = (t, i) => {
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
  };

  // Essential と Free は小さめのカードで並べる(Signature は大きな展示のまま)
  const card = (t) => {
    const href = `${home}templates/${t.slug}/`;
    return `
      <article class="card">
        <a class="card-media media" href="${href}"><img src="${esc(src(t.cover))}" alt="${esc(t.coverAlt)}" loading="lazy"></a>
        <p class="exhibit-no reveal">No. ${esc(t.no)}</p>
        <h3 class="card-title reveal"><a href="${href}">${esc(t.title)}</a></h3>
        <p class="card-use reveal">${esc(t.useJa || t.use)}</p>
        <p class="card-summary reveal">${esc(t.summary)}</p>
        <p class="card-foot reveal"><span class="exhibit-price">${esc(t.price)}</span><a class="link-line" href="${href}">${TEXT.details}</a></p>
      </article>`;
  };

  function renderExhibits() {
    const mount = document.querySelector('[data-render="templates"]');
    if (!mount) return;
    // 価格帯ごとにまとめる。価格帯のないもの(準備中など)は最後に
    const groups = tiers
      .map((tier) => ({ tier, items: templates.filter((t) => t.tier === tier.id && t.status !== 'soon') }))
      .filter((g) => g.items.length);
    const rest = templates.filter((t) => t.status === 'soon' || !tierOf(t));
    mount.innerHTML = `
      <nav class="tier-nav reveal" id="tiers" aria-label="${TEXT.tiersLabel}">
        ${groups.map((g) => `
        <div class="tier-col">
          <a href="#tier-${g.tier.id}"><span class="tier-nav-name">${esc(g.tier.name)}</span><span class="tier-nav-price">${samePrice(g.tier) ? '' : esc(g.tier.price)}</span><span class="tier-nav-count">${TEXT.count(g.items.length)}</span></a>
          ${(g.tier.points || []).length ? `<ul class="tier-points">${g.tier.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}
      </nav>
      ${groups.map((g) => `
      <div class="tier" id="tier-${g.tier.id}" role="region" aria-labelledby="tier-${g.tier.id}-name">
        <header class="tier-head">
          <h3 class="tier-name reveal" id="tier-${g.tier.id}-name">${esc(g.tier.name)}</h3>
          <p class="tier-price reveal" data-delay="1">${samePrice(g.tier) ? '' : esc(g.tier.price)}</p>
          <p class="tier-note reveal" data-delay="1">${esc(g.tier.note)}</p>
          <p class="tier-count reveal" data-delay="2">${TEXT.count(g.items.length)}</p>
        </header>
        ${g.tier.id === 'signature' ? g.items.map(exhibit).join('') : `<div class="cards">${g.items.map(card).join('')}</div>`}
      </div>`).join('')}
      ${rest.length ? `<div class="tier tier--rest">${rest.map(exhibit).join('')}</div>` : ''}`;
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

    const tier = tierOf(t);
    const free = t.tier === 'free';
    const purchase = t.purchaseUrl
      ? `<a class="btn" href="${esc(t.purchaseUrl)}" target="_blank" rel="noopener">${free ? TEXT.download : TEXT.purchase}</a>`
      : `<span class="btn is-disabled" aria-disabled="true">${TEXT.purchaseSoon}</span>`;

    mount.innerHTML = `
      <section class="detail-hero">
        <nav class="crumb reveal" aria-label="${TEXT.crumb}"><a href="${home}#templates">Templates</a><span>/</span>${esc(t.title)}</nav>
        <div class="detail-head">
          <p class="exhibit-no reveal">No. ${esc(t.no)}${tier ? `<a class="detail-tier" href="${home}#tier-${tier.id}">${esc(tier.name)}</a>` : ''}</p>
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

      ${t.video ? `
      <section class="detail-motion">
        <p class="detail-label reveal">${TEXT.motion}</p>
        <figure class="motion-frame media">
          <video muted loop playsinline preload="none"${t.videoPoster ? ` poster="${esc(src(t.videoPoster))}"` : ''}${reduceMotion ? ' controls' : ''} aria-label="${esc(t.title)} — ${TEXT.motion}">
            <source src="${esc(src(t.video))}" type="video/mp4">
          </video>
        </figure>
        <p class="motion-note reveal">${TEXT.motionNote}</p>
      </section>` : ''}

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

      ${t.edit ? `
      <section class="detail-how">
        <header class="how-head">
          <p class="detail-label reveal">${TEXT.how}</p>
          <p class="how-note reveal" data-delay="1">${TEXT.howNote}</p>
          <a class="link-line how-guide reveal" data-delay="2" href="${home}guide/">${TEXT.guide}</a>
        </header>
        <ol class="how-steps">
          ${TEXT.steps(t, TEXT.list(t.edit.files), t.tier === 'free').map(([title, text], i) => `
          <li class="reveal" data-delay="${i}"><span class="how-no">${String(i + 1).padStart(2, '0')}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></li>`).join('')}
        </ol>
        <figure class="how-file reveal" data-delay="2">
          <figcaption><span>${esc(t.edit.files[0].split('/').pop())}</span><span>${TEXT.fileNote}</span></figcaption>
          <pre><code>${esc(t.edit.snippet)}</code></pre>
        </figure>
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

      ${tier && (tier.points || []).length ? `
      <section class="detail-tierinfo">
        <p class="detail-label reveal">${esc(TEXT.about(tier.name))}</p>
        <ul class="tier-points reveal" data-delay="1">${tier.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <a class="link-line reveal" data-delay="2" href="${home}#tiers">${TEXT.compare}</a>
      </section>` : ''}

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

  /* ---------- 動画:画面に入ったら再生し、外れたら止める ---------- */
  function motionVideos() {
    const videos = [...document.querySelectorAll('.motion-frame video')];
    if (!videos.length || reduceMotion || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.play().catch(() => { e.target.controls = true; }); } else { e.target.pause(); }
    }), { threshold: 0.35 });
    videos.forEach((v) => io.observe(v));
  }

  window.TRACE_READY = true;
  renderExhibits();
  renderDetail();
  nav();
  reveal();
  drift();
  transitions();
  motionVideos();
})();
