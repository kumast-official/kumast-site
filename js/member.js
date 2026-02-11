// =====================================
// メンバー一覧の読み込みとフィルター初期化
// =====================================
document.addEventListener("DOMContentLoaded", async () => {
    await loadMembers();
    setupFilter();
});

// =====================================
// メンバー情報を非同期で読み込み・描画
// =====================================
async function loadMembers() {
    const list = document.querySelector(".member-list");
    if (!list) return;

    try {
        const res = await fetch(`./data/member.json?nocache=${Date.now()}`, {
            cache: "no-store"
        });

        if (!res.ok) throw new Error("JSON を読み込めませんでした");

        const members = await res.json();

        // メンバーリストをHTMLに変換して挿入
        list.innerHTML = members.map(member => `
      <li class="member-item" data-category="${member.category}">
        <article class="member-card card" data-link="${member.page}">
          <div class="member-card__image">
            <img src="${member.image}" alt="${member.name_ja}" loading="lazy">
          </div>
          <div class="member-card__body">
            <h3 class="member-card__name-ja">${member.name_ja}</h3>
            <p class="member-card__name-en">${member.name_en}</p>
            <p class="member-card__catch">${member.catch}</p>
            <div class="member-card__links">
              ${member.links.youtube ? `<a href="${member.links.youtube}" target="_blank" rel="noopener" class="icon-youtube"></a>` : ""}
              ${member.links.x ? `<a href="${member.links.x}" target="_blank" rel="noopener" class="icon-x"></a>` : ""}
            </div>
          </div>
        </article>
      </li>
    `).join("");

        // カードクリックで詳細ページへ遷移（リンク以外の領域をクリックした場合）
        document.querySelectorAll(".member-card").forEach(card => {
            card.addEventListener("click", e => {
                if (e.target.closest(".member-card__links")) return;
                const link = card.dataset.link;
                if (link) window.location.href = link;
            });
        });

        // カードを順番にフェードイン表示
        requestAnimationFrame(() => {
            document.querySelectorAll(".member-card").forEach((card, i) => {
                setTimeout(() => card.classList.add("show"), i * 120);
            });
        });

        return true;

    } catch (err) {
        console.error("MEMBER 読み込みエラー:", err);
        list.innerHTML = `<p class="error-message">メンバー情報を読み込めませんでした。</p>`;
    }
}

// =====================================
// メンバーフィルターのセットアップ
// =====================================
function setupFilter() {
    const buttons = document.querySelectorAll(".member-filter button");
    const items = document.querySelectorAll(".member-item");

    if (!buttons.length || !items.length) {
        console.warn("フィルター対象が見つかりません");
        return;
    }

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            // アクティブボタンの切り替え
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // メンバーの表示切り替え
            items.forEach(item => {
                const cat = item.dataset.category;
                const card = item.querySelector(".card");

                if (filter === "all" || filter === cat) {
                    item.style.display = "block";
                    card.classList.remove("show");
                    setTimeout(() => card.classList.add("show"), 30);
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}
