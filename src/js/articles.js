const JSON_URL = './api/articles.json';

const wrap = document.querySelector(".blog__list");

const card = (a) => `
  <article class="post" data-id="${a.id}">
    <img class="post__img" src="${a.image}" alt="${a.title}" width="285" height="180" loading="lazy">
    <div class="post__body">
      <h3 class="post__title">${a.title}</h3>
      <a class="btn-default post__btn" href="../../index.html">READ</a>
      <p class="post__excerpt">${a.excerpt ?? ""}</p>
    </div>
  </article>
`;

async function fetchArticles() {
    const res = await fetch(JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : (data.items || []);
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
