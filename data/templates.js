/* ==========================================================
   TRACE — テンプレートのデータ
   ----------------------------------------------------------
   新しいテンプレートを追加するときは、
   1. この配列に1件追加する
   2. templates/mono-archive/ フォルダを複製して、フォルダ名を slug に合わせる
      (中の index.html の <title> と data-template も書き換える)
   3. 画像を images/templates/<slug>/ に置く
   画像パスはサイトのルートからの相対パスで書く。
   英語版の文面は各テンプレートの en にまとめる(書かなかった項目は日本語のまま使われる)。
   英語版の詳細ページは en/templates/<slug>/ に置く。
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
    // 英語版(/en/)で使う文面。ここに書いた項目だけが日本語を上書きする
    en: {
      useJa: '',
      summary: 'A portfolio template for photographers. Black and white, with sections that shift as you scroll.',
      coverAlt: 'The MONO ARCHIVE top page: a black-and-white photo of tall buildings with the words VISUAL ARCHIVE over it',
      description: [
        'A one-page portfolio template for photographers.',
        'It includes selected works, a horizontal gallery, a profile, a year-by-year archive and a contact section. It also works on smartphones.',
      ],
      features: [
        { title: 'Opening', text: 'The top photo shrinks as you scroll.' },
        { title: 'Selected Works', text: 'Shows 4–6 key works in different sizes.' },
        { title: 'Gallery', text: 'A gallery that moves sideways as you scroll down. Swipe on smartphones.' },
        { title: 'Archive', text: 'Lists past work by year, with category filters.' },
      ],
      gallery: [
        { src: 'images/templates/mono-archive/shrink.jpg', alt: 'The top photo shrunk into a small window after scrolling', caption: 'Opening — scroll' },
        { src: 'images/templates/mono-archive/works.jpg', alt: 'Selected Works with photos in different sizes and positions', caption: 'Selected Works' },
        { src: 'images/templates/mono-archive/gallery.jpg', alt: 'The horizontal gallery', caption: 'Gallery' },
        { src: 'images/templates/mono-archive/archive.jpg', alt: 'The Archive, listing works by year on a black background', caption: 'Archive' },
      ],
      mobile: [
        { src: 'images/templates/mono-archive/m-hero.jpg', alt: 'The top page on a smartphone' },
        { src: 'images/templates/mono-archive/m-gallery.jpg', alt: 'The gallery on a smartphone' },
        { src: 'images/templates/mono-archive/m-archive.jpg', alt: 'The archive on a smartphone' },
      ],
      includes: [
        'HTML / CSS / JavaScript files (no build step)',
        'Data files for replacing text, photos and works',
        'A guide to customizing the template (README, in Japanese)',
        'Desktop and smartphone support / reduced-motion support',
      ],
      specs: [
        { label: 'Pages', value: 'Single page' },
        { label: 'Sections', value: 'Opening / Works / Gallery / About / Archive / Contact' },
        { label: 'Built with', value: 'HTML, CSS, JavaScript, GSAP' },
        { label: 'Tone', value: 'Monochrome' },
      ],
    },
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
    en: {
      useJa: '',
      summary: 'The next template is in progress.',
      coverAlt: 'Red maple leaves in front of a dark rock face',
    },
  },
];
