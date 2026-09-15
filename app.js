// ===== Product data (cleaned up from the Nano Technology listings) =====
const PRODUCTS = [
  {
    name: "HP ProBook 435 G8",
    tagline: "Convertible 2-in-1 for study, office and light creative work.",
    price: 72000,
    stock: 10,
    specs: [
      { label: "Processor", value: "Ryzen 7 5650U" },
      { label: "Memory", value: "16GB RAM" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "13.5\" touch, 360°" },
    ],
  },
  {
    name: "HP EliteBook 840 G8",
    tagline: "Slim business laptop built for all-day multitasking.",
    price: 66999,
    stock: 10,
    specs: [
      { label: "Processor", value: "Core i5, 11th Gen" },
      { label: "Memory", value: "16GB RAM" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14\" FHD" },
    ],
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    tagline: "Legendary keyboard, ultra-light build, limited stock.",
    price: 42000,
    stock: 3,
    specs: [
      { label: "Processor", value: "Core i5, 6th Gen" },
      { label: "Memory", value: "8GB RAM" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14\" HD" },
    ],
  },
  {
    name: "HP EliteBook 1040 G8",
    tagline: "The flagship — touch display and top-tier performance.",
    price: 97000,
    stock: null,
    specs: [
      { label: "Processor", value: "Core i7, 11th Gen" },
      { label: "Memory", value: "16GB DDR4" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14\" FHD touch, 360°" },
    ],
  },
];

function formatPrice(n){
  return n.toLocaleString("en-US");
}

function renderProducts(){
  const grid = document.getElementById("product-grid");
  if(!grid) return;

  grid.innerHTML = PRODUCTS.map(p => {
    const lowStock = typeof p.stock === "number" && p.stock <= 3;
    const stockAttr = lowStock ? ` low-stock data-stock="Only ${p.stock} left"` : "";
    const specsHtml = p.specs.map(s => `
      <li>
        <span class="spec-label">${s.label}</span>
        <span class="spec-value">${s.value}</span>
      </li>`).join("");

    return `
      <article class="product-card"${stockAttr}>
        <div class="product-eyebrow"><span class="dot"></span>In stock</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-tagline">${p.tagline}</p>
        <ul class="spec-list">${specsHtml}</ul>
        <div class="product-foot">
          <div class="price-block">
            <span class="price-label">Price</span>
            <span class="price">${formatPrice(p.price)}<sup>ETB</sup></span>
          </div>
          <a class="btn btn-ghost product-cta" href="https://t.me/nano_laptops" target="_blank" rel="noopener">Ask about this</a>
        </div>
      </article>`;
  }).join("");
}

// header scroll state
function initHeaderScroll(){
  const header = document.getElementById("site-header");
  if(!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// mobile nav
function initMobileNav(){
  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initYear(){
  const el = document.getElementById("year");
  if(el) el.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initHeaderScroll();
  initMobileNav();
  initYear();
});
