/* ================================
   ハンバーガーメニュー開閉
================================ */
const navToggle = document.getElementById("nav-toggle");
const globalNav = document.getElementById("global-nav");
const header = document.getElementById("header");
const overlay = document.querySelector(".nav-overlay");

function openMenu() {
    navToggle.setAttribute("aria-expanded", true);
    navToggle.classList.add("is-open");

    globalNav.classList.add("fade-in");
    globalNav.classList.remove("fade-out");

    requestAnimationFrame(() => {
        globalNav.classList.add("is-open");
    });

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    navToggle.setAttribute("aria-expanded", false);
    navToggle.classList.remove("is-open");

    globalNav.classList.remove("is-open");
    globalNav.classList.add("fade-out");
    globalNav.classList.remove("fade-in");

    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
});

/* ================================
   オーバーレイクリックで閉じる
================================ */
overlay.addEventListener("click", () => {
    closeMenu();
});

/* ================================
   スマートヘッダー（スクロール縮小）
================================ */
window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        header.classList.add("is-scrolled");
    } else {
        header.classList.remove("is-scrolled");
    }
});

/* ================================
   ★ IntersectionObserver：滑らかアクティブ切り替え
================================ */
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".header-nav a");
    const sections = document.querySelectorAll("section[id]");

    // 画面の 40% 入ったらアクティブにする
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

