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
    slug: 'plate',
    no: '03',
    status: 'available',
    title: 'PLATE',
    use: 'Single-Photo Portfolio',
    useJa: '',
    summary: 'A one-page portfolio that shows one photo at a time on a plain white page. Edit one file to make it yours.',
    price: '$29',
    priceNote: 'License for one website',
    purchaseUrl: 'https://buy.polar.sh/polar_cl_CETKxkBvMuJSpmwymf1tEaQileBr2lqUBMgpI1qiRFy',
    previewUrl: 'https://plate.rn071-work.workers.dev/',
    cover: 'images/templates/plate/hero.jpg',
    productImages: [
      'images/templates/plate/product-4x3.jpg',
      'images/templates/plate/product-1x1.jpg',
    ],
    coverAlt: 'The PLATE page: one architectural photo in the middle of a white page, with a name, page number and email in small type',
    description: [
      'A one-page portfolio for photographers, artists, architects and designers who want to show their work without anything else in the way.',
      'Photos appear one at a time, never cropped, and change with a slow crossfade. Use the arrow keys, click either side of the photo, or swipe on a phone. Your name, email, links and photo list all live in one file, settings.js — no coding needed.',
    ],
    features: [
      { title: 'One photo at a time', text: 'Portrait, landscape and square photos are shown whole, with generous white space.' },
      { title: 'Arrow keys, click, swipe', text: 'Move with the keyboard, by clicking either side, or by swiping on a phone.' },
      { title: 'One file to edit', text: 'Name, email, links and the photo list are all in settings.js. Replace photos by dropping them into the images folder.' },
      { title: 'Beginner guide', text: 'A step-by-step guide in English and Japanese, from changing your name to publishing.' },
    ],
    gallery: [
      { src: 'images/templates/plate/portrait.jpg', alt: 'A portrait photo shown whole, with a small “Next” label beside the cursor', caption: 'Portrait' },
      { src: 'images/templates/plate/square.jpg', alt: 'A square photo of a leaf in a glass on the white page', caption: 'Square' },
      { src: 'images/templates/plate/about.jpg', alt: 'The optional About text shown after clicking the name', caption: 'About (optional)' },
    ],
    mobile: [
      { src: 'images/templates/plate/m-hero.jpg', alt: 'A landscape photo on a smartphone' },
      { src: 'images/templates/plate/m-portrait.jpg', alt: 'A portrait photo on a smartphone' },
      { src: 'images/templates/plate/m-square.jpg', alt: 'A square photo on a smartphone' },
    ],
    includes: [
      'HTML / CSS / JavaScript files (no build step, no external libraries)',
      'settings.js — the only file you edit',
      'Step-by-step guide (START_HERE, in English and Japanese)',
      'Placeholder images named photo-01 to photo-16',
    ],
    specs: [
      { label: 'Pages', value: 'Single page' },
      { label: 'Controls', value: 'Arrow keys / Click / Swipe' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript' },
      { label: 'Tone', value: 'White / Olive accent' },
    ],
    ja: {
      useJa: '写真を1枚ずつ見せるポートフォリオ',
      summary: '白いページに写真を1枚ずつ見せる、1ページのポートフォリオ。編集するのはファイル1つだけです。',
      priceNote: '1サイト分のライセンス',
      coverAlt: 'PLATEの画面。白いページの中央に建築写真が1枚あり、名前・ページ番号・メールが小さく並ぶ',
      description: [
        '写真家、アーティスト、建築家、デザイナーなど、作品だけを見せたい人のための1ページのポートフォリオテンプレートです。',
        '写真は1枚ずつ、トリミングせずに表示され、ゆっくりしたクロスフェードで切り替わります。矢印キー、写真の左右のクリック、スマホのスワイプで移動できます。名前・メール・SNS・写真の一覧は settings.js の1ファイルにまとまっていて、コードの知識は必要ありません。',
      ],
      features: [
        { title: 'One photo at a time', text: '縦長・横長・正方形の写真を、切り取らずに余白とともに表示します。' },
        { title: 'Arrow keys, click, swipe', text: 'キーボード、写真の左右のクリック、スマホのスワイプで移動できます。' },
        { title: 'One file to edit', text: '名前・メール・SNS・写真の一覧は settings.js にまとまっています。写真は images フォルダに入れるだけで差し替えられます。' },
        { title: 'Beginner guide', text: '名前の変更から公開まで、日本語と英語の手順ガイド付きです。' },
      ],
      gallery: [
        { src: 'images/templates/plate/portrait.jpg', alt: '縦長の写真を切り取らずに表示し、カーソルの横に小さく Next と出ている画面', caption: 'Portrait' },
        { src: 'images/templates/plate/square.jpg', alt: '白いページに置かれた、ガラスに挿した葉の正方形の写真', caption: 'Square' },
        { src: 'images/templates/plate/about.jpg', alt: '名前をクリックすると表示されるプロフィールの文章', caption: 'About(任意)' },
      ],
      mobile: [
        { src: 'images/templates/plate/m-hero.jpg', alt: 'スマートフォンでの横長の写真' },
        { src: 'images/templates/plate/m-portrait.jpg', alt: 'スマートフォンでの縦長の写真' },
        { src: 'images/templates/plate/m-square.jpg', alt: 'スマートフォンでの正方形の写真' },
      ],
      includes: [
        'HTML / CSS / JavaScript 一式(ビルド不要・外部ライブラリなし)',
        'settings.js(編集するのはこのファイルだけ)',
        '手順ガイド(START_HERE・日本語/英語)',
        'photo-01〜16 の名前の仮の画像',
      ],
      specs: [
        { label: 'Pages', value: '1ページ構成' },
        { label: 'Controls', value: '矢印キー / クリック / スワイプ' },
        { label: 'Built with', value: 'HTML, CSS, JavaScript' },
        { label: 'Tone', value: 'White / Olive accent' },
      ],
    },
  },
  {
    slug: 'studio',
    no: '04',
    status: 'available',
    title: 'STUDIO',
    use: 'Studio Portfolio & Business',
    useJa: '',
    summary: 'A five-page site that presents an independent creator as a small studio — with work, services and a way to get in touch.',
    price: '$59',
    priceNote: 'License for one website',
    purchaseUrl: 'https://buy.polar.sh/polar_cl_ooh3MCtSDUKs8faZv6nLqqvxlQgx4qDdYehSI1QiuJb',
    previewUrl: 'https://studio.rn071-work.workers.dev/',
    cover: 'images/templates/studio/hero.jpg',
    productImages: [
      'images/templates/studio/product-4x3.jpg',
      'images/templates/studio/product-1x1.jpg',
    ],
    coverAlt: 'The STUDIO home page: a full photo of a modern house with the words SMALL STUDIO. CAREFUL WORK. over it',
    description: [
      'A portfolio and business website for designers, photographers, directors and small teams who want to look like a studio, not a profile page.',
      'Five pages: Home, Work, a page for each project, About and Contact with a form. Your studio, services and links live in settings.js and your projects in works.js — no coding needed. White and charcoal by default, with a dark theme.',
    ],
    features: [
      { title: 'Full-photo opening', text: 'A full-screen photo with your line, location and live local time.' },
      { title: 'Stacking project cards', text: 'Projects stack as you scroll, with titles floating over the photos.' },
      { title: 'Motion with weight', text: 'Weighted scrolling, page curtains, words that rise and numbers that count up.' },
      { title: 'Two files to edit', text: 'settings.js for the studio, works.js for projects, with a step-by-step guide.' },
    ],
    gallery: [
      { src: 'images/templates/studio/intro.jpg', alt: 'The studio name across the full width, with the introduction and big numbers below', caption: 'Introduction' },
      { src: 'images/templates/studio/showcase.jpg', alt: 'A project card with the title SHIFT CHAIR over a photo of a black chair', caption: 'Selected work' },
      { src: 'images/templates/studio/works.jpg', alt: 'The Work page with photos and a charcoal panel of text', caption: 'Work' },
      { src: 'images/templates/studio/detail.jpg', alt: 'A project page with a charcoal panel of project details', caption: 'Project page' },
      { src: 'images/templates/studio/contact.jpg', alt: 'The Contact page with a charcoal panel and a form', caption: 'Contact' },
    ],
    mobile: [
      { src: 'images/templates/studio/m-hero.jpg', alt: 'The home page on a smartphone' },
      { src: 'images/templates/studio/m-showcase.jpg', alt: 'A project card on a smartphone' },
      { src: 'images/templates/studio/m-works.jpg', alt: 'The Work page on a smartphone' },
    ],
    includes: [
      'HTML / CSS / JavaScript files (no build step, no external libraries)',
      'settings.js and works.js — the only files you edit',
      'Step-by-step guide (START_HERE, in English and Japanese)',
      'Placeholder images with the same names as the demo',
    ],
    specs: [
      { label: 'Pages', value: 'Home / Work / Project / About / Contact' },
      { label: 'Themes', value: 'Light / Dark / Custom panel color' },
      { label: 'Built with', value: 'HTML, CSS, JavaScript' },
      { label: 'Form', value: 'Email app, or Formspree and similar' },
    ],
    ja: {
      useJa: '小さなスタジオのポートフォリオ兼ビジネスサイト',
      summary: 'ひとりのクリエイターを「小さなスタジオ」として見せる、5ページのサイト。作品・サービス・問い合わせまでそろっています。',
      priceNote: '1サイト分のライセンス',
      coverAlt: 'STUDIOのトップ画面。モダンな住宅の全面写真に、SMALL STUDIO. CAREFUL WORK. の文字が重なる',
      description: [
        'デザイナー、写真家、ディレクター、小さなチームなど、プロフィールページではなく「スタジオ」として見せたい人のためのポートフォリオ兼ビジネスサイトです。',
        'Home・作品一覧・作品ごとのページ・About・フォーム付きのContactの5ページ構成。スタジオの情報やサービスは settings.js、作品は works.js にまとまっていて、コードの知識は必要ありません。標準は白とチャコールで、ダークテーマにも切り替えられます。',
      ],
      features: [
        { title: 'Full-photo opening', text: '全面の写真に、一言・拠点・現地の時刻を重ねたファーストビュー。' },
        { title: 'Stacking project cards', text: '作品カードがスクロールで重なり、作品名が写真の上に浮かびます。' },
        { title: 'Motion with weight', text: '重みのあるスクロール、ページの幕、せり上がる見出し、カウントアップする数字。' },
        { title: 'Two files to edit', text: 'スタジオは settings.js、作品は works.js。手順ガイド付きです。' },
      ],
      gallery: [
        { src: 'images/templates/studio/intro.jpg', alt: '画面幅いっぱいのスタジオ名と、その下の紹介文と大きな数字', caption: 'Introduction' },
        { src: 'images/templates/studio/showcase.jpg', alt: '黒い椅子の写真に SHIFT CHAIR の作品名が重なる作品カード', caption: 'Selected work' },
        { src: 'images/templates/studio/works.jpg', alt: '写真とチャコールの文章パネルが並ぶ作品一覧', caption: 'Work' },
        { src: 'images/templates/studio/detail.jpg', alt: 'チャコールのパネルに作品情報が並ぶ作品ページ', caption: 'Project page' },
        { src: 'images/templates/studio/contact.jpg', alt: 'チャコールのパネルとフォームが並ぶお問い合わせページ', caption: 'Contact' },
      ],
      mobile: [
        { src: 'images/templates/studio/m-hero.jpg', alt: 'スマートフォンでのトップ画面' },
        { src: 'images/templates/studio/m-showcase.jpg', alt: 'スマートフォンでの作品カード' },
        { src: 'images/templates/studio/m-works.jpg', alt: 'スマートフォンでの作品一覧' },
      ],
      includes: [
        'HTML / CSS / JavaScript 一式(ビルド不要・外部ライブラリなし)',
        'settings.js と works.js(編集するのはこの2ファイルだけ)',
        '手順ガイド(START_HERE・日本語/英語)',
        'デモと同じ名前の仮の画像',
      ],
      specs: [
        { label: 'Pages', value: 'Home / Work / 作品ページ / About / Contact' },
        { label: 'Themes', value: 'ライト / ダーク / パネルの色を変更' },
        { label: 'Built with', value: 'HTML, CSS, JavaScript' },
        { label: 'Form', value: 'メールソフト、または Formspree など' },
      ],
    },
  },
  {
    slug: '',
    no: '05',
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
