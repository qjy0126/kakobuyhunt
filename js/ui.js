(function () {
 const $ = (sel, root = document) => root.querySelector(sel);
 const t = (k) => (typeof KF.t === "function" ? KF.t(k) : k);
 const homeHref = () => (KF.lang === "pl" ? "/pl/" : "/");
 const pageHref = (file) => (file === "brands.html" ? "/brands/" : (KF.lang === "pl" ? "/pl/" : "/") + file);

 function brandLink() {
 return `
 <a class="brand" href="${homeHref()}">
 <span class="brand-copy">
 <strong>kakobuy <span>Spreadsheet</span></strong>
 </span>
 </a>`;
 }

 function header() {
 const catLabel = (c) => (typeof KF.catLabelI18n === "function" ? KF.catLabelI18n(c.slug) : c.label);
 return `
 <header class="site-header">
 <div class="wrap header-row">
 <button class="menu-btn" data-open="nav" aria-label="${t("menu")}">☰</button>
 ${brandLink()}
 <div class="search-wrap">
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
 <input id="global-search" placeholder="${t("searchPlaceholder")}" autocomplete="off" />
 <div class="search-hits" id="search-hits"></div>
 </div>
 <div class="header-tools">
 ${typeof KF.langSwitch === "function" ? KF.langSwitch() : ""}
 <span class="chip">USD</span>
 </div>
 </div>
 <nav class="catbar">
 <div class="wrap catbar-row">
 <a href="${KF.findsPath()}" data-cat="">${t("all")}</a>
 ${KF.categories.map((c) => `<a href="${KF.catPath(c.slug)}" data-cat="${c.slug}">${catLabel(c)}</a>`).join("")}
 </div>
 </nav>
 </header>
 <div class="overlay" id="overlay"></div>
 <aside class="mobile-nav" id="mobile-nav">
 <input class="search-input-mobile" id="mobile-search" placeholder="${t("searchPlaceholder")}" />
 <a href="${homeHref()}">${t("home")}</a>
 <a href="${KF.findsPath()}">${t("allFinds")}</a>
 ${KF.categories.map((c) => `<a href="${KF.catPath(c.slug)}">${catLabel(c)}</a>`).join("")}
 <a href="${pageHref("how-to-buy.html")}">${t("howToBuy")}</a>
 <a href="${pageHref("faq.html")}">${t("faq")}</a>
 <a href="${pageHref("about.html")}">${t("about")}</a>
 <a href="${pageHref("contact.html")}">${t("contact")}</a>
 ${typeof KF.langSwitch === "function" ? KF.langSwitch() : ""}
 <a href="${KF.site.signup}" target="_blank" rel="noopener">${t("signup")}</a>
 </aside>
 `;
 }

 function footer() {
 const email = KF.site.email;
 const discord = KF.site.discordUser;
 const whoBody = t("whoBehindBody")
 .replace("{discord}", `<a href="${KF.site.discordUrl}" target="_blank" rel="noopener">${discord}</a>`)
 .replace("{email}", `<a href="mailto:${email}">${email}</a>`);
 const catLabel = (c) => (typeof KF.catLabelI18n === "function" ? KF.catLabelI18n(c.slug) : c.label);
 return `
 <footer class="site-footer">
 <div class="wrap">
 <div class="footer-grid">
 <div class="footer-col">
 ${brandLink()}
 <p>${t("footerBlurb")}</p>
 </div>
 <div class="footer-col">
 <h3>${t("categories")}</h3>
 ${KF.categories.slice(0, 8).map((c) => `<a href="${KF.catPath(c.slug)}">${catLabel(c)}</a>`).join("")}
 </div>
 <div class="footer-col">
 <h3>${t("quickLinks")}</h3>
 <a href="${homeHref()}">${t("home")}</a>
 <a href="${KF.findsPath()}">${t("allFinds")}</a>
 <a href="${pageHref("brands.html")}">${t("brands")}</a>
 <a href="${pageHref("how-to-buy.html")}">${t("howToBuy")}</a>
 <a href="${pageHref("faq.html")}">${t("faq")}</a>
 <a href="${pageHref("about.html")}">${t("about")}</a>
 <a href="${pageHref("contact.html")}">${t("contact")}</a>
 </div>
 </div>
 <div class="legal">
 <p><strong>${t("whoBehind")}</strong> ${whoBody}</p>
 <p><strong>${t("disclaimer")}</strong> ${t("disclaimerBody")}</p>
 <p><strong>${t("affiliate")}</strong> ${t("affiliateBody")}</p>
 <p><strong>${t("external")}</strong> ${t("externalBody")}</p>
 <p>${t("copyright")}</p>
 </div>
 </div>
 </footer>
 `;
 }

 function discordFloat() {
 return `
 <a class="discord-float" href="${KF.site.discordUrl}" target="_blank" rel="noopener" aria-label="Discord ${KF.site.discordUser}">
 <svg viewBox="0 0 24 24" aria-hidden="true">
 <path fill="currentColor" d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14 14 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.9.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.899.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418"/>
 </svg>
 </a>`;
 }

 function productCard(p) {
 return `
 <a class="product-card" href="${KF.itemPath(p)}" data-id="${p.id}">
 <span class="thumb"><img src="${KF.asset(p.image)}" alt="${escapeHtml(p.title)}" loading="lazy" decoding="async" /></span>
 <span class="body">
 <h3>${escapeHtml(p.title)}</h3>
 <b class="price">${KF.money(p.price)}</b>
 </span>
 </a>
 `;
 }

 function escapeHtml(value) {
 return String(value || "").replace(/[&<>"']/g, (ch) => ({
 "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
 }[ch]));
 }

 function closeAll() {
 $("#overlay") && $("#overlay").classList.remove("show");
 $("#mobile-nav") && $("#mobile-nav").classList.remove("show");
 }

 function bind() {
 if (typeof KF.injectSeo === "function") KF.injectSeo();
 if (!document.querySelector(".site-header")) {
 document.body.insertAdjacentHTML("afterbegin", header());
 } else {
 // inject language switch into existing static header tools
 const tools = document.querySelector(".header-tools");
 if (tools && !tools.querySelector(".lang-switch") && typeof KF.langSwitch === "function") {
 tools.insertAdjacentHTML("afterbegin", KF.langSwitch());
 }
 }
 if (!document.querySelector(".site-footer")) {
 document.body.insertAdjacentHTML("beforeend", footer());
 }
 if (!document.querySelector(".discord-float")) {
 document.body.insertAdjacentHTML("beforeend", discordFloat());
 }

 const cat = document.body.dataset.cat || new URLSearchParams(location.search).get("cat") || "";
 document.querySelectorAll(".catbar a").forEach((a) => {
 if (a.dataset.cat === cat) a.classList.add("is-on");
 });

 document.addEventListener("click", (e) => {
 const open = e.target.closest("[data-open]");
 const overlay = $("#overlay");
 const mobile = $("#mobile-nav");
 if (open && open.dataset.open === "nav" && overlay && mobile) {
 overlay.classList.add("show");
 mobile.classList.add("show");
 } else if (e.target.id === "overlay") {
 closeAll();
 }
 const buy = e.target.closest("[data-buy]");
 if (buy) {
 const item = KF.products.find((p) => p.id === buy.dataset.buy);
 if (item) {
 KF.track("buy_kakobuy", {
 agent: "kakobuy",
 item_id: String(item.id),
 item_name: item.title || "",
 currency: "USD",
 value: Number(item.price) || 0,
 items: KF.gaItem(item),
 });
 }
 }
 });

 const input = $("#global-search");
 const hits = $("#search-hits");

 function phraseFromTitle(title, query) {
 const text = String(title || "").replace(/\s+/g, " ").trim();
 if (!text) return "";
 const lower = text.toLowerCase();
 const q = query.toLowerCase();
 let start = lower.indexOf(q);
 if (start < 0) return "";
 while (start > 0 && text[start - 1] !== " ") start -= 1;
 const words = text.slice(start).split(" ").filter(Boolean).slice(0, 5);
 let phrase = words.join(" ");
 if (phrase.length > 48) phrase = phrase.slice(0, 45).replace(/\s+\S*$/, "").trim();
 return phrase;
 }

 function suggestKeywords(raw) {
 const query = String(raw || "").trim().toLowerCase();
 if (!query) return [];
 const suggestions = [];
 const seen = new Set();
 const push = (label, href, kind) => {
 const key = String(label || "").trim().toLowerCase();
 if (!key || seen.has(key)) return;
 seen.add(key);
 suggestions.push({ label: String(label).trim(), href, kind });
 };

 (KF.featuredBrands || []).forEach((name) => {
 const n = String(name || "");
 const slug = KF.brandSlug(n);
 if (n.toLowerCase().includes(query) || slug.includes(query.replace(/\s+/g, "-"))) {
 push(n, KF.brandPath(n), "Brand");
 }
 });

 (KF.categories || []).forEach((c) => {
 if (String(c.label || "").toLowerCase().includes(query)) {
 push(c.label, KF.catPath(c.slug), "Category");
 }
 });

 const phraseScore = new Map();
 (KF.products || []).forEach((p) => {
 const blob = `${p.title || ""} ${p.collection || ""}`.toLowerCase();
 if (!blob.includes(query)) return;
 const col = String(p.collection || "").trim();
 if (col && col.toLowerCase() !== "find" && col.toLowerCase().includes(query)) {
 phraseScore.set(col, (phraseScore.get(col) || 0) + 3);
 }
 const phrase = phraseFromTitle(p.title, query);
 if (phrase && phrase.toLowerCase() !== query) {
 phraseScore.set(phrase, (phraseScore.get(phrase) || 0) + 1);
 }
 });

 [...phraseScore.entries()]
 .sort((a, b) => b[1] - a[1] || a[0].length - b[0].length)
 .slice(0, 8)
 .forEach(([phrase]) => {
 push(phrase, `${KF.findsPath()}?q=${encodeURIComponent(phrase)}`, "Search");
 });

 return suggestions.slice(0, 10);
 }

 function renderHits(q) {
 if (!hits) return;
 const query = String(q || "").trim();
 if (!query) {
 hits.classList.remove("show");
 hits.innerHTML = "";
 return;
 }
 const list = suggestKeywords(query);
 const rows = list.map((s) =>
 `<a class="suggest-row" href="${s.href}"><span class="suggest-kind">${escapeHtml(s.kind)}</span><span class="suggest-text">${escapeHtml(s.label)}</span></a>`
 ).join("");
 const fallback = `<a class="suggest-row suggest-all" href="${KF.findsPath()}?q=${encodeURIComponent(query)}"><span class="suggest-kind">Search</span><span class="suggest-text">${escapeHtml(query)}</span></a>`;
 hits.innerHTML = (rows || "") + fallback;
 hits.classList.add("show");
 }
 if (input) {
 input.addEventListener("input", () => renderHits(input.value));
 input.addEventListener("keydown", (e) => {
 if (e.key === "Enter") goSearch(input.value);
 if (e.key === "Escape") {
 hits && hits.classList.remove("show");
 }
 });
 }
 function goSearch(q) {
 const query = String(q || "").trim();
 location.href = KF.findsPath() + (query ? "?q=" + encodeURIComponent(query) : "");
 }
 const mobileSearch = $("#mobile-search");
 if (mobileSearch) {
 mobileSearch.addEventListener("keydown", (e) => {
 if (e.key === "Enter") goSearch(mobileSearch.value);
 });
 }
 document.addEventListener("keydown", (e) => {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
 e.preventDefault();
 if (input) input.focus();
 }
 });
 document.addEventListener("click", (e) => {
 if (hits && !e.target.closest(".search-wrap")) hits.classList.remove("show");
 });
 }

 KF.ui = { productCard, bind, escapeHtml };
})();
