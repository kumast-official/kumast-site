/* ================================
   NEWS 自動読み込み（トップページ用：最新3件）
================================ */

document.addEventListener("DOMContentLoaded", () => {
    loadNews();
});

async function loadNews() {
    const list = document.getElementById("news-list");
    if (!list) return;

    try {
        const res = await fetch("./data/news.json?nocache=" + Date.now(), {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("JSON が取得できませんでした");
        }

        const newsData = await res.json();

        // 新しい順に並び替え
        newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 最新3件だけ
        const latest = newsData.slice(0, 3);

        // HTML 生成
        list.innerHTML = latest
            .map(item => {
                const d = new Date(item.date);
                const formatted =
                    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

                return `
                    <li class="top-news-item">
                        <time class="top-news-date" datetime="${item.date}">${formatted}</time>
                        <h3 class="top-news-text">${item.title}</h3>
                    </li>
                `;
            })
            .join("");

        /* ================================
           ★ MEMBER と同じアニメーション
        ================================= */
        requestAnimationFrame(() => {
            document.querySelectorAll(".top-news-item").forEach((item, i) => {
                setTimeout(() => item.classList.add("show"), i * 120);
            });
        });

    } catch (error) {
        console.error("NEWS 読み込みエラー:", error);
        list.innerHTML = "<li>ニュースを読み込めませんでした。</li>";
    }
}
