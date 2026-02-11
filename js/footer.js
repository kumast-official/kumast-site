// =====================================
// ページトップへ戻るボタンの表示制御とスクロール処理
// =====================================

// ページトップへ戻るボタンの要素を取得
const pagetop = document.getElementById("pagetop");

// スクロール位置に応じてボタンの表示・非表示を切り替え
window.addEventListener("scroll", () => {
    const shouldShow = window.scrollY > 300;
    pagetop.classList.toggle("show", shouldShow);
});

// ページトップへ戻るボタンをクリックしたら、ページ最上部へスムーススクロール
pagetop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =====================================
// フッターの年号を自動で現在の年に更新
// =====================================
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
