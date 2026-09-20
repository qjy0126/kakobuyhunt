(function () {
 const params = new URLSearchParams(location.search);
 const $ = (sel) => document.querySelector(sel);
 function fill(id, html) {
 const el = document.getElementById(id);
 if (el) el.innerHTML = html;
 }

 KF.applyExtraCategories();
 KF.ui.bind();

 function trending() {
 const featured = KF.products.filter((p) => p.featured);
 return (featured.length ? featured : KF.products).slice(0, 20);
 }

 function renderHome() {
 fill("cat-grid", KF.categories.map(KF.categoryCard).join(""));
 const trendBox = document.getElementById("trending-grid");
    if (!trendBox || !trendBox.children.length) {
      fill("trending-grid", trending().map(KF.ui.productCard).join(""));
    }
    const faqBox = document.getElementById("faq-list");
    if (faqBox && !faqBox.children.length) {
      fill("faq-list", KF.activeFaqs().map((f) => `<article class="faq-item"><h3>${f.q}</h3><p>${f.a}</p></article>`).join(""));
    }
 }

 function pagerHtml(page, pages, extras) {
 if (pages <= 1) return "";
 function href(n) {
 const next = new URL(location.pathname, location.href);
 Object.entries(extras).forEach(([k, v]) => { if (v) next.searchParams.set(k, v); });
 if (n > 1) next.searchParams.set("page", String(n));
 return next.pathname + next.search;
 }
 const nums = [];
 const from = Math.max(1, page - 2);
 const to = Math.min(pages, page + 2);
 if (page > 1) nums.push(`<a href="${href(page - 1)}">Prev</a>`);
 if (from > 1) nums.push(`<a href="${href(1)}">1</a>`);
 if (from > 2) nums.push("<span>…</span>");
 for (let n = from; n <= to; n++) {
 nums.push(n === page ? `<span class="is-on">${n}</span>` : `<a href="${href(n)}">${n}</a>`);
 }
 if (to < pages - 1) nums.push("<span>…</span>");
 if (to < pages) nums.push(`<a href="${href(pages)}">${pages}</a>`);
 if (page < pages) nums.push(`<a href="${href(page + 1)}">Next</a>`);
 return nums.join("");
 }

 function renderShop() {
 const cat = document.body.dataset.cat || params.get("cat") || "";
 const brandSlug = params.get("brand") || "";
 const q = (params.get("q") || "").toLowerCase();
 const sort = params.get("sort") || "latest";
 const pageSize = 48;
 const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);
 let list = KF.products.slice();
 if (cat) list = list.filter((p) => KF.inCategory(p, cat));
 if (brandSlug) list = list.filter((p) => KF.matchesBrand(p, brandSlug));
 if (q) list = list.filter((p) => `${p.title} ${p.collection} ${KF.productCats(p).join(" ")}`.toLowerCase().includes(q));
 if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
 if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
 if (sort === "popular") list.sort((a, b) => b.rating - a.rating);

 const title = (
 KF.categories.find((c) => c.slug === cat) ||
 { label: brandSlug ? KF.brandLabel(brandSlug) : (q ? `Search: ${params.get("q")}` : "All finds") }
 ).label;
 const h1 = $("#shop-title");
 if (h1) h1.textContent = title;
 document.title = `${title} — Kakobuy Hunt`;

 const total = list.length;
 const pages = Math.max(1, Math.ceil(total / pageSize));
 const safePage = Math.min(page, pages);
 const start = (safePage - 1) * pageSize;
 const slice = list.slice(start, start + pageSize);
 fill("shop-count", total ? `Showing ${start + 1}–${start + slice.length} of ${total}` : "No products found");
 fill("product-grid", slice.map(KF.ui.productCard).join("") || "<p>No finds in this filter.</p>");
 fill("pager", pagerHtml(safePage, pages, { cat, brand: brandSlug, q: params.get("q"), sort: sort === "latest" ? "" : sort }));

 const sortBox = $("#sort");
 if (sortBox) {
 sortBox.value = sort;
 sortBox.addEventListener("change", () => {
 const next = new URL(location.pathname, location.href);
 if (cat) next.searchParams.set("cat", cat);
 if (brandSlug) next.searchParams.set("brand", brandSlug);
 if (q) next.searchParams.set("q", params.get("q"));
 if (sortBox.value !== "latest") next.searchParams.set("sort", sortBox.value);
 location.href = next.pathname + next.search;
 });
 }
 }

 function renderItem() {
 const wanted = params.get("id");
 const item = KF.products.find((p) => p.id === wanted);
 if (!item) {
 location.replace(KF.findsPath());
 return;
 }
 document.title = `${item.title} — Kakobuy Hunt`;
 $("#item-title").textContent = item.title;
 $("#item-price").textContent = KF.money(item.price);

 const local = KF.asset(item.image || ((item.gallery && item.gallery[0]) || ""));
 const gallery = [local];
 let photo = 0;
 const main = $("#item-main");
 main.src = local;
 main.alt = item.title;
 main.addEventListener("error", () => {
 if (main.getAttribute("src") !== local) {
 main.src = local;
 }
 });

 function itemIdFrom(p) {
 const fromId = String(p.id || "").replace(/^p-/, "");
 if (/^\d+$/.test(fromId)) return fromId;
 const m = String(p.sourceUrl || "").match(/itemID=(\d+)/i);
 return m ? m[1] : "";
 }
 function photoExists(src) {
 return new Promise((resolve) => {
 const img = new Image();
 img.onload = () => resolve(true);
 img.onerror = () => resolve(false);
 img.src = src;
 });
 }
 function renderThumbs() {
 fill("thumbs", gallery.map((src, i) => `
 <button type="button" data-i="${i}" class="${i === photo ? "is-on" : ""}" aria-label="Photo ${i + 1}">
 <img src="${src}" alt="" loading="lazy" decoding="async" />
 </button>
 `).join(""));
 }
 function show(i) {
 if (!gallery.length) return;
 photo = (i + gallery.length) % gallery.length;
 main.src = gallery[photo];
 document.querySelectorAll("#thumbs button").forEach((btn, n) => btn.classList.toggle("is-on", n === photo));
 }
 renderThumbs();
 const thumbsEl = $("#thumbs");
 if (thumbsEl) {
 thumbsEl.addEventListener("click", (e) => {
 const btn = e.target.closest("button");
 if (btn) show(Number(btn.dataset.i));
 });
 }
 const pid = itemIdFrom(item);
 if (pid) {
 Promise.all([2, 3].map((n) => {
 const src = KF.asset(`img/products/${pid}-${n}.webp`);
 return photoExists(src).then((ok) => (ok ? src : ""));
 })).then((found) => {
 found.filter(Boolean).forEach((src) => gallery.push(src));
 if (found.some(Boolean)) renderThumbs();
 });
 }

 $("#buy-link").href = KF.kakobuyUrl(item.sourceUrl);
 fill("crumbs", `
 <a href="index.html">Home</a><span>/</span>
 <a href="${KF.findsPath()}">All finds</a><span>/</span>
 <a href="${KF.catPath(item.category)}">${KF.catLabel(item.category)}</a><span>/</span>
 <span>${KF.ui.escapeHtml(item.title)}</span>
 `);
 const related = KF.products.filter((p) => p.category === item.category && p.id !== item.id).slice(0, 16);
 fill("related-grid", related.map(KF.ui.productCard).join(""));
 const seeAll = $("#related-see-all");
 if (seeAll) {
 seeAll.href = KF.catPath(item.category);
 seeAll.hidden = related.length === 0;
 }
 const relatedHead = $("#related-heading");
 if (relatedHead) relatedHead.textContent = `More in ${KF.catLabel(item.category)}`;

 const used = new Set([item.id, ...related.map((p) => p.id)]);
 const price = Number(item.price) || 0;
 const pool = KF.products.filter((p) => !used.has(p.id));
 pool.sort((a, b) => {
 const af = a.featured ? 0 : 1;
 const bf = b.featured ? 0 : 1;
 if (af !== bf) return af - bf;
 const ad = Math.abs((Number(a.price) || 0) - price);
 const bd = Math.abs((Number(b.price) || 0) - price);
 return ad - bd;
 });
 let interest = pool.slice(0, 5);
 if (interest.length < 5) {
 const extra = KF.products.filter((p) => p.id !== item.id && !interest.some((x) => x.id === p.id));
 interest = interest.concat(extra.slice(0, 5 - interest.length));
 }
 fill("interest-grid", interest.map(KF.ui.productCard).join(""));
 const interestHead = $("#interest-head");
 if (interestHead) interestHead.hidden = interest.length === 0;
 KF.track("view_item", { currency: "USD", value: Number(item.price) || 0, items: KF.gaItem(item) });
 $("#buy-link").addEventListener("click", () => {
 KF.track("buy_kakobuy", {
 agent: "kakobuy",
 item_id: String(item.id),
 item_name: item.title || "",
 currency: "USD",
 value: Number(item.price) || 0,
 items: KF.gaItem(item),
 });
 });
 }

 function renderFaq() {
    const faqBox = document.getElementById("faq-list");
    if (faqBox && !faqBox.children.length) {
      fill("faq-list", KF.activeFaqs().map((f) => `<article class="faq-item"><h3>${f.q}</h3><p>${f.a}</p></article>`).join(""));
    }
 }

 function renderBrands() {
 const names = {};
 KF.products.forEach((p) => {
 const n = String(p.collection || "").trim();
 if (n) names[n] = true;
 });
 const list = Object.keys(names).sort((a, b) => a.localeCompare(b));
 fill("brand-cloud", list.map((n) => `<a href="${KF.brandPath(n)}">${KF.ui.escapeHtml(n)}</a>`).join(""));
 }

 const page = document.body.dataset.page;
 if (page === "home") renderHome();
 if (page === "shop") renderShop();
 if (page === "item") renderItem();
 if (page === "faq") renderFaq();
 if (page === "brands") renderBrands();
})();
