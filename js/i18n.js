window.KF = window.KF || {};

(function () {
 const path = String(location.pathname || "");
 const inPl = /(?:^|\/)pl(?:\/|$)/i.test(path) || document.documentElement.lang === "pl";
 KF.lang = inPl ? "pl" : "en";
 KF.root = KF.lang === "pl" ? "../" : "";

 const dict = {
 en: {
 searchPlaceholder: "Search products…",
 all: "All",
 home: "Home",
 allFinds: "All finds",
 brands: "Brands",
 howToBuy: "How to buy",
 faq: "FAQ",
 about: "About",
 contact: "Contact",
 signup: "Sign up to Kakobuy",
 categories: "Categories",
 quickLinks: "Quick links",
 footerBlurb: "Updated Kakobuy Spreadsheet with 4000+ finds — USD prices, QC photos, and working Kakobuy links.",
 whoBehind: "Who's behind this.",
 whoBehindBody: "The kakobuyhunt team maintains this spreadsheet — sourcing finds, checking that links and prices still work, and refreshing the catalog. We're buyers ourselves. Reach us on Discord {discord} or {email}.",
 disclaimer: "Disclaimer.",
 disclaimerBody: "Kakobuy Hunt is an informational platform. It is not endorsed by or operated by Kakobuy or any marketplace or brand. Our only function is to help users discover products available on third-party platforms. We do not sell products, hold inventory, process payments, or act as a middleman. All purchases are made by you, on Kakobuy, at your own discretion and risk.",
 affiliate: "Affiliate disclosure.",
 affiliateBody: "This site contains affiliate links. We may earn a small commission from sign-up links and from freight-forwarding services — never from individual product sales — at no additional cost to you. These commissions fund the upkeep of the site.",
 external: "External content.",
 externalBody: "We have no control over, and accept no responsibility for, the content, accuracy, legality or quality of items on external platforms. Always verify product details and authenticity yourself before purchasing.",
 copyright: "© 2026 Kakobuy Hunt — All rights reserved.",
 viewDetails: "View details",
 viewOnKakobuy: "View on Kakobuy →",
 backCatalog: "Back to catalog",
 langEn: "EN",
 langPl: "PL",
 menu: "Menu",
 cats: {
 shoes: "Shoes",
 jackets: "Jackets & Vests",
 hoodies: "Hoodies & Sweaters",
 "t-shirts": "T-Shirts",
 sets: "Tracksuits",
 pants: "Pants",
 shorts: "Shorts",
 headwear: "Headwear",
 bags: "Bags",
 accessories: "Accessories",
 other: "Other Stuff",
 },
 },
 pl: {
 searchPlaceholder: "Szukaj produktów…",
 all: "Wszystkie",
 home: "Strona główna",
 allFinds: "Wszystkie znaleziska",
 brands: "Marki",
 howToBuy: "Jak kupować",
 faq: "FAQ",
 about: "O nas",
 contact: "Kontakt",
 signup: "Załóż konto Kakobuy",
 categories: "Kategorie",
 quickLinks: "Szybkie linki",
 footerBlurb: "Aktualny Kakobuy Spreadsheet z 4000+ znaleziskami — ceny w USD, zdjęcia QC oraz działające linki Kakobuy.",
 whoBehind: "Kto za tym stoi.",
 whoBehindBody: "Zespół kakobuyhunt utrzymuje ten spreadsheet — wyszukuje znaleziska, sprawdza linki i ceny USD oraz odświeża katalog. Sami jesteśmy kupującymi. Napisz na Discord {discord} lub {email}.",
 disclaimer: "Zastrzeżenie.",
 disclaimerBody: "Kakobuy Hunt to platforma informacyjna. Nie jest powiązana z Kakobuy, Tmall ani żadną marką. Pomagamy tylko odkrywać produkty na zewnętrznych platformach. Nie sprzedajemy produktów, nie magazynujemy i nie obsługujemy płatności. Zakupy realizujesz samodzielnie na Kakobuy, na własne ryzyko.",
 affiliate: "Informacja o afiliacji.",
 affiliateBody: "Ta strona zawiera linki afiliacyjne. Możemy otrzymać prowizję z rejestracji oraz usług spedycyjnych — nigdy ze sprzedaży pojedynczych produktów — bez dodatkowych kosztów dla Ciebie.",
 external: "Treści zewnętrzne.",
 externalBody: "Nie odpowiadamy za treść, dokładność, legalność ani jakość produktów na zewnętrznych platformach. Zawsze weryfikuj szczegóły przed zakupem.",
 copyright: "© 2026 Kakobuy Hunt — Wszelkie prawa zastrzeżone.",
 viewDetails: "Szczegóły",
 viewOnKakobuy: "Otwórz na Kakobuy →",
 backCatalog: "Wróć do katalogu",
 langEn: "EN",
 langPl: "PL",
 menu: "Menu",
 cats: {
 shoes: "Buty",
 jackets: "Kurtki i kamizelki",
 hoodies: "Bluzy",
 "t-shirts": "T-shirty",
 sets: "Dresy",
 pants: "Spodnie",
 shorts: "Szorty",
 headwear: "Czapki",
 bags: "Torby",
 accessories: "Akcesoria",
 other: "Inne",
 },
 },
 };

 KF.t = (key) => {
 const pack = dict[KF.lang] || dict.en;
 return pack[key] != null ? pack[key] : (dict.en[key] != null ? dict.en[key] : key);
 };

 KF.catLabelI18n = (slug) => {
 const pack = dict[KF.lang] || dict.en;
 return (pack.cats && pack.cats[slug]) || KF.catLabel(slug);
 };

 KF.pageHref = (file) => {
 const name = file || "index.html";
 return name;
 };

 KF.langHref = (target) => {
 const parts = path.split("/").filter(Boolean);
 let file = parts[parts.length - 1] || "index.html";
 if (!/\.html$/i.test(file)) file = "index.html";
 const q = location.search || "";
 if (target === "pl") {
 return KF.lang === "pl" ? file + q : "pl/" + file + q;
 }
 return KF.lang === "pl" ? "../" + file + q : file + q;
 };

 KF.langSwitch = () => {
 const enOn = KF.lang === "en" ? " is-on" : "";
 const plOn = KF.lang === "pl" ? " is-on" : "";
 return `<span class="lang-switch" aria-label="Language">
 <a class="lang-link${enOn}" href="${KF.langHref("en")}" hreflang="en">EN</a>
 <a class="lang-link${plOn}" href="${KF.langHref("pl")}" hreflang="pl">PL</a>
 </span>`;
 };
})();
