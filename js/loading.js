// =====================================
// シンプルなローディング演出
// =====================================
window.addEventListener("load", () => {
    const loading = document.getElementById("loading");
    const logo = document.querySelector(".loading-logo");

    // ロゴをフェードイン＆スケールアップ
    logo?.classList.add("animate");

    // ローディングを非表示に（1.2秒後）
    setTimeout(() => {
        loading?.classList.add("hide");
    }, 1200);
});

