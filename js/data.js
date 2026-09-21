window.KF = window.KF || {};

KF.site = {
 name: "Kakobuy Hunt",
 domain: "kakobuyhunt.com",
 origin: "https://kakobuyhunt.com",
 updated: "September 20, 2026",
 signup: "https://www.kakobuy.com/register?affcode=9v88f",
 email: "contact@kakobuyhunt.com",
 discordUser: "@kakobuyqcsheets",
 discordUrl: "https://discord.gg/7DRMaMAADv",
 publisher: "Kakobuy Hunt",
 editor: "kakobuyhunt",
};

KF.asset = (path) => {
 const s = String(path || "");
 if (!s || /^https?:\/\//i.test(s)) return s;
 const clean = s.replace(/^\.\//, "").replace(/^\//, "");
 return (KF.root || "") + clean;
};

KF.slugify = (text) => String(text || "")
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, "-")
 .replace(/^-+|-+$/g, "")
 .replace(/-+/g, "-")
 .slice(0, 60);

KF.itemSlug = (p) => {
 const id = String((p && p.id) || "").replace(/^p-/, "");
 const base = KF.slugify(p && p.title);
 return (base ? base + "-" : "") + id;
};

KF.itemPath = (p) => {
  const map = typeof window !== "undefined" && window.KF_SLUGS;
  const mapped = map && map[String(p.id)];
  return "/item/" + (mapped || KF.itemSlug(p)) + "/";
};
KF.catPath = (slug) => (slug ? "/" + encodeURIComponent(slug) + "/" : "/finds/");
KF.brandSlug = (name) => KF.slugify(name);
KF.brandPath = (name) => "/brands/" + KF.brandSlug(name) + "/";
KF.findsPath = () => "/finds/";

/* Many spreadsheet rows tag collection as "Find" while the brand only appears in the title. */
KF.brandAliases = {
  "arc-teryx": ["arcteryx", "arc'teryx", "arc teryx"],
  arcteryx: ["arcteryx", "arc'teryx", "arc teryx"],
  "maison-margiela": ["maison margiela", "margiela"],
  "louis-vuitton": ["louis vuitton", "lv"],
  lv: ["louis vuitton", "lv"],
  amiri: ["amiri"],
  yeezy: ["yeezy"],
  nocta: ["nocta"],
  "rick-owens": ["rick owens"],
  hermes: ["hermes", "hermès"],
  cartier: ["cartier"],
  "syna-world": ["syna world", "syna"],
  "off-white": ["off white", "off-white", "offwhite"],
  "gallery-dept": ["gallery dept", "gallery department"],
  "chrome-hearts": ["chrome hearts"],
  "denim-tears": ["denim tears"],
  "palm-angels": ["palm angels"],
  "stone-island": ["stone island"],
  "ralph-lauren": ["ralph lauren"],
  "canada-goose": ["canada goose"],
  "the-north-face": ["the north face", "north face"],
  "acne-studios": ["acne studios"],
  bape: ["bape"],
};

KF.brandLabel = (slug) => {
  const s = String(slug || "").toLowerCase();
  if (!s) return "";
  const hit = (KF.featuredBrands || []).find((n) => KF.brandSlug(n) === s);
  if (hit) return hit;
  if (s === "lv") return "Louis Vuitton";
  return s.replace(/-/g, " ");
};

KF.matchesBrand = (p, brandSlug) => {
  const slug = String(brandSlug || "").toLowerCase();
  if (!slug) return true;
  const colSlug = KF.brandSlug(p && p.collection);
  if (colSlug === slug) return true;
  if (colSlug && colSlug.replace(/-/g, "") === slug.replace(/-/g, "")) return true;

  const hay = `${(p && p.title) || ""} ${(p && p.collection) || ""}`.toLowerCase();
  const hayCompact = hay.replace(/[^a-z0-9]+/g, "");
  const aliases = KF.brandAliases[slug] || [slug.replace(/-/g, " ")];
  for (let i = 0; i < aliases.length; i++) {
    const a = String(aliases[i]).toLowerCase();
    if (!a) continue;
    if (a.length <= 2) {
      if (colSlug === a) return true;
      if (new RegExp(`(?:^|[^a-z0-9])${a}(?:[^a-z0-9]|$)`, "i").test(hay)) return true;
      continue;
    }
    if (hay.includes(a)) return true;
    if (hayCompact.includes(a.replace(/[^a-z0-9]+/g, ""))) return true;
  }
  const compact = slug.replace(/-/g, "");
  if (compact.length >= 4 && hayCompact.includes(compact)) return true;
  return false;
};

KF.categories = [
 { slug: "shoes", label: "Shoes" },
 { slug: "jackets", label: "Jackets & Vests" },
 { slug: "hoodies", label: "Hoodies & Sweaters" },
 { slug: "t-shirts", label: "T-Shirts" },
 { slug: "sets", label: "Tracksuits" },
 { slug: "pants", label: "Pants" },
 { slug: "shorts", label: "Shorts" },
 { slug: "headwear", label: "Headwear" },
 { slug: "bags", label: "Bags" },
 { slug: "accessories", label: "Accessories" },
 { slug: "other", label: "Other Stuff" },
];

KF.nav = KF.categories.map((c) => ({ slug: c.slug, label: c.label }));

KF.products = [];

KF.featuredBrands = [
 "Nike", "Balenciaga", "Jordan", "Louis Vuitton", "Chrome Hearts", "Corteiz", "Moncler",
 "Dior", "Ralph Lauren", "Supreme", "Gucci", "Stussy", "Burberry", "Off-White",
 "Maison Margiela", "Stone Island", "BAPE", "Syna World", "Prada", "Amiri", "Adidas",
 "Essentials", "Palm Angels", "Yeezy", "Canada Goose", "Gallery Dept", "NOCTA", "Rick Owens",
 "Denim Tears", "Trapstar", "Goyard", "Carhartt", "Hellstar", "Acne Studios", "Arc'teryx",
 "Lacoste", "Rolex", "The North Face", "Cartier", "Sp5der", "Hermes",
];

KF.faqs = [
  {
    "q": "What is a Kakobuy Spreadsheet?",
    "a": "A Kakobuy Spreadsheet is a free curated catalog of finds with photos, USD prices, and direct Kakobuy checkout links. Kakobuy Hunt lists 4000+ items across shoes, hoodies, jackets and more. This site never holds stock or payments."
  },
  {
    "q": "Is the spreadsheet free to use?",
    "a": "Yes — browsing every find and link on Kakobuy Hunt is free, with no account, signup, or paywall."
  },
  {
    "q": "Is Kakobuy safe and legit?",
    "a": "Yes — Kakobuy is an established Chinese shopping agent that buys on your behalf, holds items in a warehouse, and photographs them for QC before international shipping. Kakobuy Hunt only links out and does not process payments. Always review QC photos before you approve shipment."
  },
  {
    "q": "How much does Kakobuy shipping cost?",
    "a": "It depends on weight, dimensions, destination, and the line you choose. Use Kakobuy’s estimator once items are in the warehouse — removing bulky packaging and consolidating into one parcel usually lowers the total."
  },
  {
    "q": "How long does delivery take?",
    "a": "Usually about 7–20 days after dispatch, depending on the shipping line. Express is faster and costs more; economy is cheaper and slower. Customs and holidays can add time."
  },
  {
    "q": "Who runs Kakobuy Hunt?",
    "a": "The kakobuyhunt team maintains this spreadsheet — sourcing finds and checking links and USD prices. Contact: Discord @kakobuyqcsheets or email contact@kakobuyhunt.com."
  }
];

KF.faqsPl = [
 {
 q: "Czym jest Kakobuy Spreadsheet?",
 a: "To wyselekcjonowana lista produktów z działającymi linkami Kakobuy — bez przeszukiwania Discorda i Yupoo. Kakobuy Hunt to ten pomysł jako strona: 4000+ znalezisk (buty, bluzy, kurtki i więcej), każde ze zdjęciem, ceną w USD i bezpośrednim linkiem. Przeglądanie jest darmowe; nie magazynujemy towaru ani nie przyjmujemy płatności.",
 },
 {
 q: "Czy spreadsheet jest darmowy?",
 a: "Tak. Przeglądanie wszystkich znalezisk i linków jest całkowicie darmowe — bez konta, rejestracji i paywalla.",
 },
 {
 q: "Czy Kakobuy jest bezpieczny i legalny?",
 a: "Kakobuy to uznany chiński agent zakupowy — kupuje za Ciebie dla Ciebie, trzyma paczki w magazynie i robi zdjęcia QC przed wysyłką międzynarodową. Ta strona tylko linkuje do Kakobuy; nie obsługujemy płatności. Zawsze sprawdź zdjęcia QC przed zatwierdzeniem wysyłki.",
 },
 {
 q: "Ile kosztuje wysyłka Kakobuy?",
 a: "Zależy od wagi, wymiarów, kierunku i wybranej linii. Użyj kalkulatora Kakobuy, gdy rzeczy są już w magazynie. Usunięcie opakowań i konsolidacja paczki zwykle obniża koszt.",
 },
 {
 q: "Jak długo trwa dostawa?",
 a: "Zależy od linii — ekspres jest szybszy i droższy, ekonomiczna tańsza i wolniejsza. Wiele haulów dochodzi w ok. 7–20 dni od nadania, choć cło i święta mogą wydłużyć czas.",
 },
 {
 q: "Kto prowadzi Kakobuy Hunt?",
 a: "Kakobuy Hunt utrzymuje zespół kakobuyhunt — kupujący, którzy dbają o działające linki i ceny USD. Discord @kakobuyqcsheets lub contact@kakobuyhunt.com.",
 },
];

KF.activeFaqs = () => (KF.lang === "pl" && KF.faqsPl ? KF.faqsPl : KF.faqs);

KF.productCats = (p) => {
 const cats = [p.category].concat(p.categories || []).filter(Boolean);
 const seen = {};
 return cats.filter((c) => (seen[c] ? false : (seen[c] = true)));
};
KF.inCategory = (p, slug) => KF.productCats(p).includes(slug);
KF.applyExtraCategories = () => {
 const skip = /sock|suitcase|luggage/i;
 const extraSet = /tracksuit|track\s*suit|sportsuit|\bsuit\b/i;
 KF.products.forEach((p) => {
 const title = String(p.title || "");
 const extra = p.categories || [];
 if (!skip.test(title) && extraSet.test(title) && p.category !== "sets" && !extra.includes("sets")) {
 extra.push("sets");
 }
 if (/\bshorts?\b/i.test(title) && !extra.includes("shorts")) extra.push("shorts");
 if (/\b(bag|bags|backpack|tote|handbag)\b/i.test(title) && !extra.includes("bags")) extra.push("bags");
 p.categories = extra;
 });
};

KF.iconSvg = (slug) => {
 const safe = String(slug || "other");
 return `<img class="cat-line" src="${KF.asset("img/cats/" + safe + ".png")}" alt="" width="46" height="46" loading="lazy" decoding="async" />`;
};

KF.categoryCard = (c) => `
 <a class="cat-icon" href="${KF.catPath(c.slug)}">
 <i>${KF.iconSvg(c.slug)}</i>
 <span>${typeof KF.catLabelI18n === "function" ? KF.catLabelI18n(c.slug) : c.label}</span>
 </a>`;

KF.money = (n) => `$${Number(n || 0).toFixed(2)}`;
KF.invite = { kakobuy: "9v88f" };
KF.listing = (sourceUrl) => {
  const url = String(sourceUrl || "");
  const weidian = url.match(/itemID=(\d+)/i);
  if (weidian || /weidian\.com/i.test(url)) {
    const id = weidian ? weidian[1] : "";
    const raw = id ? `https://weidian.com/item.html?itemID=${id}` : url;
    return { id, channel: "weidian", url: raw };
  }
  const tb = url.match(/[?&]id=(\d+)/i);
  if (/taobao\.com|tmall\.com/i.test(url)) {
    return { id: tb ? tb[1] : "", channel: "taobao", url };
  }
  const ali = url.match(/offer\/(\d+)/i);
  if (/1688\.com/i.test(url)) {
    return { id: ali ? ali[1] : "", channel: "1688", url };
  }
  return { id: "", channel: "weidian", url };
};
KF.kakobuyUrl = (sourceUrl) => {
 const L = KF.listing(sourceUrl);
 const enc = encodeURIComponent(L.url);
 if (L.channel === "weidian" && L.id) {
 return `https://www.kakobuy.com/item/details?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D${L.id}&affcode=${KF.invite.kakobuy}`;
 }
 return `https://www.kakobuy.com/item/details?url=${enc}&affcode=${KF.invite.kakobuy}`;
};

KF.catLabel = (slug) => (KF.categories.find((c) => c.slug === slug) || { label: slug || "Find" }).label;

KF.gaItem = (p) => {
 if (!p) return [];
 return [{
 item_id: String(p.id),
 item_name: p.title || "",
 item_category: p.category || "",
 price: Number(p.price) || 0,
 quantity: 1,
 }];
};
KF.track = (name, params) => {
 try {
 if (typeof gtag !== "function") return;
 gtag("event", name, Object.assign({ transport_type: "beacon" }, params || {}));
 } catch (_) {}
};

KF.pagePath = () => {
 const file = (location.pathname.split("/").pop() || "index.html").replace(/^\s*$/, "index.html");
 return file === "index.html" || file === "" ? "/" : "/" + file;
};

KF.injectSeo = () => {
 const head = document.head;
 if (!head || head.querySelector('script[data-kf-schema="org"]')) return;
 const title = document.title || KF.site.name;
 const descEl = head.querySelector('meta[name="description"]');
 const desc = (descEl && descEl.getAttribute("content")) || "";
 const url = KF.site.origin + KF.pagePath();
 const image = KF.site.origin + "/img/favicon.svg";
 const ensure = (attr, sel, attrs) => {
 if (head.querySelector(sel)) return;
 const el = document.createElement(attr === "link" ? "link" : "meta");
 Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
 head.appendChild(el);
 };
 ensure("link", 'link[rel="canonical"]', { rel: "canonical", href: url });
 ensure("link", 'link[rel="alternate"][type="text/plain"]', { rel: "alternate", type: "text/plain", href: KF.site.origin + "/llms.txt", title: "llms.txt" });
 ensure("meta", 'meta[name="author"]', { name: "author", content: KF.site.editor });
 ensure("meta", 'meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large" });
 ensure("meta", 'meta[property="og:type"]', { property: "og:type", content: "website" });
 ensure("meta", 'meta[property="og:title"]', { property: "og:title", content: title });
 ensure("meta", 'meta[property="og:description"]', { property: "og:description", content: desc });
 ensure("meta", 'meta[property="og:url"]', { property: "og:url", content: url });
 ensure("meta", 'meta[property="og:image"]', { property: "og:image", content: image });
 ensure("meta", 'meta[property="og:site_name"]', { property: "og:site_name", content: KF.site.name });
 ensure("meta", 'meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
 const org = {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Organization",
 "@id": KF.site.origin + "/#organization",
 name: KF.site.name,
 url: KF.site.origin + "/",
 email: KF.site.email,
 sameAs: [KF.site.discordUrl],
 },
 {
 "@type": "WebSite",
 "@id": KF.site.origin + "/#website",
 name: KF.site.name,
 url: KF.site.origin + "/",
 publisher: { "@id": KF.site.origin + "/#organization" },
 description: desc || "Curated Kakobuy spreadsheet finds with USD prices and direct links.",
 },
 ],
 };
 if (document.body && document.body.dataset.page === "faq" && KF.faqs && KF.faqs.length) {
 org["@graph"].push({
 "@type": "FAQPage",
 mainEntity: KF.faqs.map((f) => ({
 "@type": "Question",
 name: f.q,
 acceptedAnswer: { "@type": "Answer", text: f.a },
 })),
 });
 }
 const script = document.createElement("script");
 script.type = "application/ld+json";
 script.dataset.kfSchema = "org";
 script.textContent = JSON.stringify(org);
 head.appendChild(script);
};
