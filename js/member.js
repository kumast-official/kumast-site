document.addEventListener("DOMContentLoaded", () => {
    loadMembers().then(() => {
        setupFilter();
    });
});

/* ================================
   MEMBER 読み込み
================================ */
async function loadMembers() {
    const list = document.querySelector(".member-list");
    if (!list) return;

    try {
        const res = await fetch("./data/member.json?nocache=" + Date.now(), {
            cache: "no-store"
        });

        if (!res.ok) throw new Error("JSON を読み込めませんでした");

        const members = await res.json();

        // HTML 生成（article のまま）
        list.innerHTML = members.map(member => {
            return `
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
            `;
        }).join("");

        // カードクリックでページ遷移
        document.querySelectorAll(".member-card").forEach(card => {
            card.addEventListener("click", e => {
                // SNS アイコンをクリックした場合は遷移させない
                if (e.target.closest(".member-card__links")) return;

                const link = card.dataset.link;
                if (link) window.location.href = link;
            });
        });

        // アニメーション付与
        requestAnimationFrame(() => {
            document.querySelectorAll(".member-card").forEach((card, i) => {
                setTimeout(() => card.classList.add("show"), i * 120);
            });
        });

        return true;

    } catch (err) {
        console.error("MEMBER 読み込みエラー:", err);
        list.innerHTML = "<p>メンバー情報を読み込めませんでした。</p>";
    }
}

/* ================================
   フィルター UI
================================ */
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

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            items.forEach(item => {
                const cat = item.dataset.category;

                if (filter === "all" || filter === cat) {
                    item.style.display = "block";

                    const card = item.querySelector(".card");
                    card.classList.remove("show");
                    setTimeout(() => card.classList.add("show"), 30);

                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}
