const API_BASE = "https://ceramic-api.onrender.com";

const sym = (c) => (c === "EUR" ? "€" : c || "");

function productToHTML(p) {
    const src = new URL(p.image, API_BASE).toString();
    return `
    <article class="catalog__card" data-id="${p.id}" data-category="${p.category}">
      <img class="catalog__img" src="${src}" alt="${p.title}" width="285" height="180" loading="lazy">
      <div class="catalog__meta">
        <span class="catalog__name">${p.title}</span>
        <span class="catalog__price">${p.price.toFixed(2)} ${sym(p.currency)}</span>
      </div>
    </article>`;
}

async function fetchProducts() {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
}

async function renderProducts(category = "tea") {
    const grid = document.querySelector(".catalog__grid");
    if (!grid) return;

    grid.innerHTML = `<div class="loading">Loading...</div>`;

    try {
        const data = await fetchProducts();
        const shown = category ? data.filter(p => p.category === category) : data;

        grid.innerHTML = shown.length
            ? shown.map(productToHTML).join("")
            : `<div class="empty">Nothing here yet</div>`;
    } catch (err) {
        console.error(err);
        grid.innerHTML = `<div class="error">Failed to load</div>`;
    }
}

function setupTabs() {
    const buttons = document.querySelectorAll(".catalog__filter");
    if (!buttons.length) return;

    buttons.forEach((btn) =>
        btn.addEventListener("click", () => {
            buttons.forEach((b) => {
                const on = b === btn;
                b.classList.toggle("active", on);
                b.setAttribute("aria-selected", on ? "true" : "false");
            });
            renderProducts(btn.dataset.category);
        })
    );
}

document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    renderProducts("tea");
});
