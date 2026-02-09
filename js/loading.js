/* ================================
   KUMAST Brand Awakening
   ロゴ浮上 → バウンド → カーブ吸い込み
   → 光の尾 → ヘッダー点灯 → 背景フェード
================================ */
window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    const loadingLogo = document.querySelector(".loading-logo");
    const trail = document.querySelector(".loading-trail");
    const headerLogo = document.querySelector(".header-logo-img");

    // 1) ロゴ吸い込み開始（カーブ軌道）
    setTimeout(() => {
        loadingLogo.classList.add("shrink");
        trail.classList.add("active");
    }, 700);

    // 2) ローディング背景フェードアウト
    setTimeout(() => {
        loading.classList.add("hide");
    }, 1500);

    // 3) ヘッダーロゴを点灯（ポンッ）
    setTimeout(() => {
        headerLogo.classList.add("glow");
    }, 1600);
});
