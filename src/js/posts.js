const API_BASE = "https://ceramic-api.onrender.com";
const POSTS_URL = new URL("/api/posts", API_BASE).toString();

const wrap = document.querySelector(".blog__list");

const card = (a) => {
    const imgSrc = a.image ? new URL(a.image, API_BASE).toString() : "";
    return `
    <article class="post" data-id="${a.id}">
      <img class="post__img" src="${imgSrc}" alt="${a.title}" width="285" height="180" loading="lazy">
      <div class="post__body">
        <h3 class="post__title">${a.title}</h3>
        <a class="btn-default post__btn" href="../../index.html">READ</a>
        <p class="post__excerpt">${a.excerpt ?? ""}</p>
      </div>
    </article>
  `;
};

async function fetchArticles() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(POSTS_URL, {
            method: "GET",
            headers: {Accept: "application/json"},
            cache: "no-store",
            mode: "cors",
            credentials: "omit",
            signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("Bad content-type");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Bad payload: expected an array");

        return data;
    } finally {
        clearTimeout(timer);
    }
}

async function initBlog() {
    if (!wrap) return;
    try {
        const items = await fetchArticles();
        wrap.innerHTML = items.map(card).join("");
    } catch (e) {
        console.error(e);
        wrap.innerHTML = `<div class="error">Failed to load (${e.message})</div>`;
    }
}

document.addEventListener("DOMContentLoaded", initBlog);
