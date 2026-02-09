/* ================================
   NEWS 全件読み込み（news.html 用）
================================ */

// Edge 対策：DOMContentLoaded と load の両方で実行
document.addEventListener("DOMContentLoaded", initNewsAll);
window.addEventListener("load", initNewsAll);

function initNewsAll() {
    if (window.__newsAllLoaded) return;
    window.__newsAllLoaded = true;

    loadNewsAll();
}

async function loadNewsAll() {
    const list = document.getElementById("news-all-list");

    if (!list) {
        console.error("ERROR: #news-all-list が見つかりません。HTML を確認してください。");
        return;
    }

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

        // HTML 生成
        list.innerHTML = newsData
            .map(item => {
                const d = new Date(item.date);
                const formatted =
                    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

                return `
                    <li class="news-item">
                        <time class="news-date" datetime="${item.date}">${formatted}</time>
                        <h3 class="news-text">${item.title}</h3>
                    </li>
                `;
            })
            .join("");

        /* ================================
           ★ MEMBER と同じアニメーション
        ================================= */
        requestAnimationFrame(() => {
            document.querySelectorAll(".news-item").forEach((item, i) => {
                setTimeout(() => item.classList.add("show"), i * 120);
            });
        });

        console.log("NEWS 全件読み込み成功");

    } catch (error) {
        console.error("NEWS 全件読み込みエラー:", error);
        list.innerHTML = "<li>ニュースを読み込めませんでした。</li>";
    }
}
