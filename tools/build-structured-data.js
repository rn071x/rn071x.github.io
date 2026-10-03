#!/usr/bin/env node
/* ==========================================================
   TRACE — 商品の構造化データ(JSON-LD)とサイトマップを生成する
   ----------------------------------------------------------
   data/templates.js を読み、
   ・各テンプレートの詳細ページ(英語 templates/<slug>/ と日本語 ja/templates/<slug>/)の
     <head> に、Google の Product 構造化データ・canonical・hreflang を書き込む
   ・sitemap.xml(日本語版・英語版の対応関係つき)を書き出す

   使い方:
     node tools/build-structured-data.js          書き込む
     node tools/build-structured-data.js --check  書き込まずに、更新が必要かだけ確認する

   JSON-LD はブラウザで後から差し込まず、HTML に直接書く。
   (Google は JavaScript で生成した商品マークアップについて
    「Shopping のクロールが少なく不安定になることがある」としているため)
   ========================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://tracebymori.com';
const BRAND = 'TRACE';
// 英語がメイン(ルート)、日本語がサブ(/ja/)
const LANGS = [
  { lang: 'en', dir: '' },
  { lang: 'ja', dir: 'ja/' },
];
const DEFAULT_DIR = '';
const CURRENCIES = { $: 'USD', '¥': 'JPY', '€': 'EUR', '£': 'GBP' };
const START = '<!-- structured-data:start (tools/build-structured-data.js で自動生成。手で編集しない) -->';
const END = '<!-- structured-data:end -->';

const check = process.argv.includes('--check');
const warnings = [];

/* ---------- データの読み込み ---------- */
function loadTemplates() {
  const code = fs.readFileSync(path.join(ROOT, 'data/templates.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox, { filename: 'data/templates.js' });
  return sandbox.window.TRACE_TEMPLATES || [];
}

// '$59' や '¥9,800' を { price: '59.00', currency: 'USD' } にする。読めなければ null
function parsePrice(text) {
  const m = String(text || '').trim().match(/^([$¥€£])\s*([\d,]+(?:\.\d+)?)$/);
  if (!m) return null;
  const currency = CURRENCIES[m[1]];
  const value = Number(m[2].replace(/,/g, ''));
  if (!(value > 0)) return null;
  return { price: currency === 'JPY' ? String(Math.round(value)) : value.toFixed(2), currency };
}

const absolute = (p) => (/^https?:\/\//.test(p) ? p : `${SITE}/${p.replace(/^\/+/, '')}`);

/* ---------- JSON-LD の組み立て ---------- */
function buildProduct(t, pageUrl, lang) {
  const price = parsePrice(t.price);
  if (!price) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: t.title,
    // 詳細ページに表示している説明文を使う(構造化データはページの表示内容と一致させる)
    // 日本語は文をそのままつなぎ、英語はスペースでつなぐ
    description: (t.description && t.description.length ? t.description.join(lang === 'ja' ? '' : ' ') : t.summary),
    image: [t.cover, ...(t.productImages || [])].filter(Boolean).map(absolute),
    url: pageUrl,
    sku: `TRACE-${t.slug.toUpperCase()}`,
    brand: { '@type': 'Brand', name: BRAND },
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      price: price.price,
      priceCurrency: price.currency,
      // 購入リンクがあれば販売中、なければ販売前
      availability: t.purchaseUrl ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: BRAND, url: `${SITE}/` },
    },
  };
}

// 同じページの各言語版と、既定(英語)を示す
const hreflang = (p) => [
  ...LANGS.map(({ lang, dir }) => `<link rel="alternate" hreflang="${lang}" href="${SITE}/${dir}${p}">`),
  `<link rel="alternate" hreflang="x-default" href="${SITE}/${DEFAULT_DIR}${p}">`,
];

function buildBlock(product, pageUrl, p) {
  const lines = [START, `<link rel="canonical" href="${pageUrl}">`, ...hreflang(p)];
  if (product) {
    // "</script>" で途切れないように "<" をエスケープする
    const json = JSON.stringify(product, null, 2).replace(/</g, '\\u003c');
    lines.push('<script type="application/ld+json">', json, '</script>');
  }
  lines.push(END);
  return lines.join('\n');
}

/* ---------- HTML への書き込み ---------- */
function writeBlock(file, block) {
  const html = fs.readFileSync(file, 'utf8');
  const s = html.indexOf(START.slice(0, 30));
  const e = html.indexOf(END);
  let next;
  if (s !== -1 && e !== -1) {
    next = html.slice(0, s) + block + html.slice(e + END.length);
  } else {
    next = html.replace('</head>', `${block}\n</head>`);
  }
  if (next === html) return false;
  if (!check) fs.writeFileSync(file, next);
  return true;
}

/* ---------- サイトマップ ---------- */
function buildSitemap(paths) {
  const entry = (p) => {
    const alternates = LANGS.map(({ lang, dir }) =>
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}/${dir}${p}"/>`).join('\n');
    const def = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/${DEFAULT_DIR}${p}"/>`;
    return LANGS.map(({ dir }) => `  <url>\n    <loc>${SITE}/${dir}${p}</loc>\n${alternates}\n${def}\n  </url>`).join('\n');
  };
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- tools/build-structured-data.js で自動生成。手で編集しない -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...paths.map(entry),
    '</urlset>',
    '',
  ].join('\n');
}

function writeFile(rel, content) {
  const file = path.join(ROOT, rel);
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (current === content) return false;
  if (!check) fs.writeFileSync(file, content);
  return true;
}

/* ---------- 実行 ---------- */
const templates = loadTemplates();
const changed = [];
const sitemapPaths = [''];  // トップページ(英語版 / と日本語版 /ja/)

templates.filter((t) => t.status !== 'soon' && t.slug).forEach((base) => {
  LANGS.forEach(({ lang, dir }) => {
    const t = lang === 'ja' && base.ja ? { ...base, ...base.ja } : base;
    const rel = `${dir}templates/${t.slug}/index.html`;
    const file = path.join(ROOT, rel);
    const pageUrl = `${SITE}/${dir}templates/${t.slug}/`;

    if (!fs.existsSync(file)) {
      warnings.push(`${rel} がありません(詳細ページのフォルダを作ってください)`);
      return;
    }
    if (lang === 'en') sitemapPaths.push(`templates/${t.slug}/`);
    const product = buildProduct(t, pageUrl, lang);
    if (!product) warnings.push(`${t.slug}: 価格 "${t.price}" を読み取れないため、Product は出力しません(canonical のみ)`);
    if (writeBlock(file, buildBlock(product, pageUrl, `templates/${t.slug}/`))) changed.push(rel);
  });
});

if (writeFile('sitemap.xml', buildSitemap(sitemapPaths))) changed.push('sitemap.xml');

warnings.forEach((w) => console.warn(`! ${w}`));
if (check) {
  if (changed.length) {
    console.log(`更新が必要です:\n  ${changed.join('\n  ')}\n→ node tools/build-structured-data.js を実行してください`);
    process.exit(1);
  }
  console.log('構造化データは最新です');
} else {
  console.log(changed.length ? `更新しました:\n  ${changed.join('\n  ')}` : '変更はありません');
}
