// TRACE — モバイル時のナビメニュー開閉と、Worksフィルムストリップの自動スクロールを担当。
// 今後、機能を増やす場合もこのファイルに追記していく想定。

const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// メニューを開いた状態でリンクをタップしたら自動で閉じる
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Worksのフィルムストリップをゆっくり自動スクロール(端まで行ったら最初に戻る)。
// ユーザーが操作(ホイール/タッチ/ドラッグ)したら一時停止し、少し経つと再開する。
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  document.querySelectorAll('.work-strip').forEach((strip) => {
    const speed = 0.6; // px/frame
    let paused = false;
    let resumeTimer = null;

    function pause() {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 2000);
    }

    ['pointerdown', 'wheel', 'touchstart'].forEach((eventName) => {
      strip.addEventListener(eventName, pause, { passive: true });
    });

    function step() {
      const max = strip.scrollWidth - strip.clientWidth;

      if (max > 0 && !paused) {
        strip.scrollLeft += speed;
        if (strip.scrollLeft >= max) {
          strip.scrollLeft = 0;
        }
      }

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
}
