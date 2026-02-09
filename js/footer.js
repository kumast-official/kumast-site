/* ================================
   ページトップへ戻るボタン
================================ */
const pagetop = document.getElementById("pagetop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        pagetop.classList.add("show");
    } else {
        pagetop.classList.remove("show");
    }
});

pagetop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ================================
   コピーライトの年を自動更新
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    yearSpan.textContent = new Date().getFullYear();
});
