// =====================================
// ニュース一覧ページ：全件読み込み処理
// =====================================

// 初期化処理をDOMContentLoadedとloadの両方で実行（重複防止付き）
document.addEventListener("DOMContentLoaded", initNewsAll);
window.addEventListener("load", initNewsAll);

// =====================================
// ニュース全件読み込みの初期化：二重読み込みを防止
// =====================================
function initNewsAll() {
    if (window.__newsAllLoaded) return;
    window.__newsAllLoaded = true;

    loadNewsAll();
}

// =====================================
// ニュースデータを取得して表示
// =====================================
async function loadNewsAll() {
    const list = document.getElementById("news-all-list");

    if (!list) {
        console.error("ERROR: #news-all-list が見つかりません。HTML を確認してください。");
        return;
    }

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

        // ニュースリストをHTMLに変換して挿入
        list.innerHTML = newsItems.map(item => {
            const date = new Date(item.date);
            const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

            return `
        <li class="news-item" data-link="${item.url}"> <!-- ★ -->
          <time class="news-date" datetime="${item.date}">${formattedDate}</time>
          <h3 class="news-text">${item.title}</h3>
        </li>
      `;
        }).join("");

        // ニュース項目を順番にフェードイン表示
        requestAnimationFrame(() => {
            document.querySelectorAll(".news-item").forEach((item, i) => {
                setTimeout(() => item.classList.add("show"), i * 120);
            });
        });

        // カードクリックでリンク先へ遷移
        list.querySelectorAll(".news-item").forEach(item => {
            item.addEventListener("click", () => {
                const link = item.dataset.link;
                if (link) window.location.href = link;
            });
        });

        console.log("NEWS 全件読み込み成功");

    } catch (error) {
        console.error("NEWS 全件読み込みエラー:", error);
        list.innerHTML = `<li class="news-error">ニュースを読み込めませんでした。</li>`;
    }
}
