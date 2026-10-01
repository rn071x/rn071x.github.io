/* ==========================================================
   TRACE — テンプレートのデータ
   ----------------------------------------------------------
   新しいテンプレートを追加するときは、
   1. この配列に1件追加する
   2. templates/mono-archive/ フォルダを複製して、フォルダ名を slug に合わせる
      (中の index.html の <title> と data-template も書き換える)
   3. 画像を images/templates/<slug>/ に置く
   画像パスはサイトのルートからの相対パスで書く。
   ========================================================== */

window.TRACE_TEMPLATES = [
  {
    slug: 'mono-archive',
    no: '01',
    status: 'available',            // 'available' または 'soon'(準備中)
    title: 'MONO ARCHIVE',
    use: 'Photographer Portfolio',
    useJa: '写真家のポートフォリオ',
    summary: '写真家向けのポートフォリオテンプレート。白と黒を基調に、スクロールに合わせて画面が切り替わります。',
    price: 'Coming soon',           // 例) '¥12,000'
    priceNote: '',                  // 例) '税込 / 1サイト分のライセンス'
    purchaseUrl: '',                // Polar の商品ページができたらここに入れる
    previewUrl: 'https://mono-archive.rn071-work.workers.dev/',
    cover: 'images/templates/mono-archive/hero.jpg',
    coverAlt: 'MONO ARCHIVEのトップ画面。モノクロの高層ビルの写真に、VISUAL ARCHIVEの文字が重なる',
    description: [
      '写真家向けの、1ページ構成のポートフォリオテンプレートです。',
      '代表作、横スクロールのギャラリー、プロフィール、年ごとのアーカイブ、お問い合わせを備えています。スマートフォンにも対応しています。',
    ],
    features: [
      { title: 'Opening', text: 'スクロールに合わせて、トップの写真が縮小します。' },
      { title: 'Selected Works', text: '代表作を4〜6点、大きさを変えて配置します。' },
      { title: 'Gallery', text: '縦スクロールで横に流れるギャラリー。スマホでは横スワイプで見られます。' },
      { title: 'Archive', text: '過去の作品を年ごとに一覧表示。カテゴリーで絞り込めます。' },
    ],
    gallery: [
      { src: 'images/templates/mono-archive/shrink.jpg', alt: 'スクロールで写真が小さな窓に縮んだ状態', caption: 'Opening — scroll' },
      { src: 'images/templates/mono-archive/works.jpg', alt: '大きさと位置の異なる作品が並ぶ Selected Works', caption: 'Selected Works' },
      { src: 'images/templates/mono-archive/gallery.jpg', alt: '横に流れるギャラリー', caption: 'Gallery' },
      { src: 'images/templates/mono-archive/archive.jpg', alt: '黒い背景に年ごとの作品一覧が並ぶ Archive', caption: 'Archive' },
    ],
    mobile: [
      { src: 'images/templates/mono-archive/m-hero.jpg', alt: 'スマートフォンでのトップ画面' },
      { src: 'images/templates/mono-archive/m-gallery.jpg', alt: 'スマートフォンでのギャラリー' },
      { src: 'images/templates/mono-archive/m-archive.jpg', alt: 'スマートフォンでのアーカイブ' },
    ],
    includes: [
      'HTML / CSS / JavaScript 一式(ビルド不要)',
      '文章・写真・作品を差し替えるためのデータファイル',
      '差し替え方をまとめたガイド(README)',
      'PC・スマートフォン対応 / 動きを抑える設定にも対応',
    ],
    specs: [
      { label: 'Pages', value: '1ページ構成' },
      { label: 'Sections', value: 'Opening / Works / Gallery / About / Archive / Contact' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript, GSAP' },
      { label: 'Tone', value: 'Monochrome' },
    ],
  },
  {
    slug: '',
    no: '02',
    status: 'soon',
    title: 'In preparation',
    use: 'Next template',
    useJa: '次のテンプレート',
    summary: '次のテンプレートを準備中です。',
    cover: 'images/brand/10.jpg',
    coverAlt: '暗い岩肌の前で色づく紅葉',
  },
];
