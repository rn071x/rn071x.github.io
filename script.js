// TRACE — モバイル時のナビメニュー開閉のみを担当するシンプルなスクリプト。
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
