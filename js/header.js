// =====================================
// ナビゲーション制御に必要な要素を取得
// =====================================
const navToggle = document.getElementById("nav-toggle");       // ハンバーガーメニューのトグルボタン
const globalNav = document.getElementById("global-nav");       // ナビゲーションメニュー本体
const header = document.getElementById("header");              // 固定ヘッダー
const overlay = document.querySelector(".nav-overlay");       // メニュー開閉時の背景オーバーレイ

// =====================================
// メニュー開閉処理（スマホ用）
// =====================================

/**
 * メニューを開く
 */
function openMenu() {
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.classList.add("is-open");

  globalNav.classList.remove("fade-out");
  globalNav.classList.add("fade-in");

  requestAnimationFrame(() => {
    globalNav.classList.add("is-open");
  });

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * メニューを閉じる
 */
function closeMenu() {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.classList.remove("is-open");

  globalNav.classList.remove("is-open", "fade-in");
  globalNav.classList.add("fade-out");

  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ハンバーガーボタンのクリックでメニュー開閉を切り替え
navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  isExpanded ? closeMenu() : openMenu();
});

// オーバーレイをクリックしたらメニューを閉じる
overlay.addEventListener("click", closeMenu);

// =====================================
// スクロール時のヘッダー縮小処理
// =====================================
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
});

// =====================================
// セクションに応じたナビリンクのアクティブ切り替え
// =====================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".header-nav a");
  const sections = document.querySelectorAll("section[id]");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});

// =====================================
// debounce関数：連続イベント発火の抑制
// =====================================
function debounce(fn, delay = 200) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

// =====================================
// リサイズ時：ナビゲーション状態をリセット（モバイル→PC対策）
// =====================================
const handleResize = debounce(() => {
  if (window.innerWidth > 768) {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.classList.remove("is-open");

    globalNav?.classList.remove("is-open", "fade-in", "fade-out");
    overlay?.classList.remove("active");

    document.body.style.overflow = "";
  }
}, 200);

window.addEventListener("resize", handleResize);
