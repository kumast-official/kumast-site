// =====================================
// トップページ：最新ニュースの読み込み
// =====================================
document.addEventListener("DOMContentLoaded", () => {
    loadNews();
});

// =====================================
// ニュースデータを取得して表示
// =====================================
async function loadNews() {
    const list = document.getElementById("news-list");
    if (!list) return;

    try {
        const res = await fetch(`./data/news.json?nocache=${Date.now()}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("JSON が取得できませんでした");
        }

        const newsItems = await res.json();

        // 日付の新しい順にソート
        newsItems.sort((a, b) => new Date(b.date) - new Date(a.date));

        // 最新3件を抽出
        const latestNews = newsItems.slice(0, 3);

        // ニュースリストをHTMLに変換して挿入
        list.innerHTML = latestNews.map(item => {
            const date = new Date(item.date);
            const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

            return `
        <li class="top-news-item" data-link="${item.url}"> <!-- ★ -->
          <time class="top-news-date" datetime="${item.date}">${formattedDate}</time>
          <h3 class="top-news-text">${item.title}</h3>
        </li>
      `;
        }).join("");

        // ニュース項目を順番にフェードイン表示
        requestAnimationFrame(() => {
            document.querySelectorAll(".top-news-item").forEach((item, i) => {
                setTimeout(() => item.classList.add("show"), i * 120);
            });
        });

        // カードクリックでリンク先へ遷移
        list.querySelectorAll(".top-news-item").forEach(item => {
            item.addEventListener("click", () => {
                const link = item.dataset.link;
                if (link) window.location.href = link;
            });
        });

    } catch (error) {
        console.error("NEWS 読み込みエラー:", error);
        list.innerHTML = `<li class="top-news-error">ニュースを読み込めませんでした。</li>`;
    }
}
