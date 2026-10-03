/* ==========================================================
   TRACE — テンプレートのデータ / Template data
   ----------------------------------------------------------
   英語が基本(メイン)。日本語版(/ja/)の文面は各テンプレートの ja にまとめる
   (ja に書かなかった項目は英語のまま使われる)。
   English is the default. Japanese text for /ja/ goes in each template's "ja" block.

   新しいテンプレートを追加するときは、
   1. この配列に1件追加する
   2. templates/<slug>/ と ja/templates/<slug>/ を既存のフォルダから複製して作る
      (中の index.html の <title>・description・data-template を書き換える)
   3. 画像を images/templates/<slug>/ に置く
   画像パスはサイトのルートからの相対パスで書く。
   price は Polar の価格と合わせる。purchaseUrl は Polar のチェックアウトリンク、
   previewUrl は公開URL(空なら Live Preview を出さない)。
   データを変えたら、最後に次のコマンドで構造化データ(JSON-LD)と sitemap.xml を更新する:
     node tools/build-structured-data.js
   ========================================================== */

window.TRACE_TEMPLATES = [
  {
    slug: 'mono-archive',
    no: '01',
    status: 'available',
    title: 'MONO ARCHIVE',
    use: 'Photographer Portfolio',
    useJa: '',
    summary: 'A portfolio template for photographers. Black and white, with sections that shift as you scroll.',
    price: '$59',
    priceNote: 'License for one website',
    purchaseUrl: 'https://buy.polar.sh/polar_cl_lFFFEtLeRZizXNFzRkh97l4e1JDdkEgtJagMi2vw36B',
    previewUrl: 'https://mono-archive.rn071-work.workers.dev/',
    cover: 'images/templates/mono-archive/hero.jpg',
    productImages: [
      'images/templates/mono-archive/product-4x3.jpg',
      'images/templates/mono-archive/product-1x1.jpg',
    ],
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
      'A guide to customizing the template (README in English and Japanese)',
      'Desktop and smartphone support / reduced-motion support',
    ],
    specs: [
      { label: 'Pages', value: 'Single page' },
      { label: 'Sections', value: 'Opening / Works / Gallery / About / Archive / Contact' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript, GSAP' },
      { label: 'Tone', value: 'Monochrome' },
    ],
    ja: {
      useJa: '写真家のポートフォリオ',
      summary: '写真家向けのポートフォリオテンプレート。白と黒を基調に、スクロールに合わせて画面が切り替わります。',
      priceNote: '1サイト分のライセンス',
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
        '差し替え方をまとめたガイド(README・日本語/英語)',
        'PC・スマートフォン対応 / 動きを抑える設定にも対応',
      ],
      specs: [
        { label: 'Pages', value: '1ページ構成' },
        { label: 'Sections', value: 'Opening / Works / Gallery / About / Archive / Contact' },
        { label: 'Built with', value: 'HTML, CSS, JavaScript, GSAP' },
        { label: 'Tone', value: 'Monochrome' },
      ],
    },
  },
  {
    slug: 'ecru',
    no: '02',
    status: 'available',
    title: 'ÉCRU',
    use: 'Creator Portfolio',
    useJa: '',
    summary: 'A portfolio template for independent creators. Generous space and clean type keep the focus on the work.',
    price: '$39',
    priceNote: 'License for one website',
    purchaseUrl: 'https://buy.polar.sh/polar_cl_sP2AdDAHApajl9JwY95p5dLKAMwf1EKXrvrZn1Uhm8g',
    previewUrl: 'https://ecru.rn071-work.workers.dev/',
    cover: 'images/templates/ecru/hero.jpg',
    productImages: [
      'images/templates/ecru/product-4x3.jpg',
      'images/templates/ecru/product-1x1.jpg',
    ],
    coverAlt: 'The ÉCRU top page: the heading “Considered forms.” beside a photo of white vases with cherry blossoms',
    description: [
      'A portfolio template for photographers, designers, makers and other independent creators.',
      'Five pages: Home, Works, Work Detail, About and Contact. Add one entry to the data file and the work appears in the list with its own detail page. It also works on smartphones.',
    ],
    features: [
      { title: 'Home', text: 'A hero photo with a short line, four selected works, a short profile and a link to contact.' },
      { title: 'Works', text: 'Works laid out in varied sizes and positions, with category filters.' },
      { title: 'Work Detail', text: 'A large image with year, category, description and background.' },
      { title: 'Motion', text: 'Only slow fades and a very small hover effect.' },
    ],
    gallery: [
      { src: 'images/templates/ecru/works.jpg', alt: 'The Works page with works in different sizes and positions', caption: 'Works' },
      { src: 'images/templates/ecru/detail.jpg', alt: 'A work detail page showing a large photo of a white vase', caption: 'Work Detail' },
      { src: 'images/templates/ecru/about.jpg', alt: 'The About page with a portrait and a short profile', caption: 'About' },
    ],
    mobile: [
      { src: 'images/templates/ecru/m-hero.jpg', alt: 'The top page on a smartphone' },
      { src: 'images/templates/ecru/m-works.jpg', alt: 'The Works page on a smartphone' },
      { src: 'images/templates/ecru/m-detail.jpg', alt: 'A work detail page on a smartphone' },
    ],
    includes: [
      'HTML / CSS / JavaScript files (no build step, no external libraries)',
      'Data files for replacing text, photos and works',
      'A guide to customizing the template (README in English and Japanese)',
      'Desktop and smartphone support / reduced-motion support',
    ],
    specs: [
      { label: 'Pages', value: '5 pages' },
      { label: 'Pages list', value: 'Home / Works / Work Detail / About / Contact' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript' },
      { label: 'Tone', value: 'Warm white / Grey' },
    ],
    ja: {
      useJa: 'クリエイターのポートフォリオ',
      summary: '個人クリエイター向けのポートフォリオテンプレート。余白と端正な文字で、作品を静かに見せます。',
      priceNote: '1サイト分のライセンス',
      coverAlt: 'ÉCRUのトップ画面。Considered forms. の見出しと、白い花瓶に挿した桜の写真',
      description: [
        '写真家、デザイナー、作家など、個人や小規模で活動するクリエイター向けのポートフォリオテンプレートです。',
        'Home、作品一覧、作品詳細、プロフィール、お問い合わせの5ページ構成。作品はデータファイルに1件足すだけで、一覧と詳細ページに自動で表示されます。スマートフォンにも対応しています。',
      ],
      features: [
        { title: 'Home', text: 'トップの写真と短いコピー、代表作4点、プロフィールの抜粋、お問い合わせへの導線。' },
        { title: 'Works', text: '大きさと配置に緩急をつけた作品一覧。カテゴリで絞り込めます。' },
        { title: 'Work Detail', text: '大きな作品画像を中心に、制作年・カテゴリ・説明・制作背景を表示。' },
        { title: 'Motion', text: 'ゆっくりしたフェードと、ごく小さなホバーの動きだけ。' },
      ],
      gallery: [
        { src: 'images/templates/ecru/works.jpg', alt: '大きさと配置の異なる作品が並ぶ作品一覧', caption: 'Works' },
        { src: 'images/templates/ecru/detail.jpg', alt: '白い壺の写真を大きく見せる作品詳細ページ', caption: 'Work Detail' },
        { src: 'images/templates/ecru/about.jpg', alt: 'ポートレートと紹介文のプロフィールページ', caption: 'About' },
      ],
      mobile: [
        { src: 'images/templates/ecru/m-hero.jpg', alt: 'スマートフォンでのトップ画面' },
        { src: 'images/templates/ecru/m-works.jpg', alt: 'スマートフォンでの作品一覧' },
        { src: 'images/templates/ecru/m-detail.jpg', alt: 'スマートフォンでの作品詳細' },
      ],
      includes: [
        'HTML / CSS / JavaScript 一式(ビルド不要・外部ライブラリなし)',
        '文章・写真・作品を差し替えるためのデータファイル',
        '差し替え方をまとめたガイド(README・日本語/英語)',
        'PC・スマートフォン対応 / 動きを抑える設定にも対応',
      ],
      specs: [
        { label: 'Pages', value: '5ページ構成' },
        { label: 'Pages list', value: 'Home / Works / Work Detail / About / Contact' },
        { label: 'Built with', value: 'HTML, CSS, JavaScript' },
        { label: 'Tone', value: 'Warm white / Grey' },
      ],
    },
  },
  {
    slug: '',
    no: '03',
    status: 'soon',
    title: 'In preparation',
    use: 'Next template',
    useJa: '',
    summary: 'The next template is in progress.',
    cover: 'images/brand/10.jpg',
    coverAlt: 'Red maple leaves in front of a dark rock face',
    ja: {
      useJa: '次のテンプレート',
      summary: '次のテンプレートを準備中です。',
      coverAlt: '暗い岩肌の前で色づく紅葉',
    },
  },
];
