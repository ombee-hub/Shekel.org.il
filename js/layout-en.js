/* =========================================================
   SHEKEL — Shared layout for the English site (en/)
   Mirrors js/layout.js but: English copy, LTR, asset paths
   resolved with ../ , and area links point to programs.html#anchors.
   ========================================================= */
(function () {
  "use strict";

  var NAV = [
    { href: "about.html", label: "About", key: "about" },
    { href: "programs.html", label: "Areas of Activity", key: "programs", children: [
      { href: "programs.html#housing",       label: "Community Housing" },
      { href: "programs.html#employment",    label: "Rehabilitative Employment" },
      { href: "programs.html#emotional",     label: "Emotional Care" },
      { href: "programs.html#children",      label: "Children & Youth" },
      { href: "programs.html#leisure",       label: "Service, Education & Leisure" },
      { href: "programs.html#accessibility", label: "Accessibility" },
      { href: "programs.html#global",        label: "Shekel Worldwide" }
    ] },
    { href: "news.html",       label: "News & Events",     key: "news" },
    { href: "branches.html",   label: "Where We Operate",  key: "branches" },
    { href: "businesses.html", label: "Social Enterprises", key: "businesses" },
    { href: "contact.html",    label: "Contact",           key: "contact" },
    { href: "contact.html#careers", label: "Careers",      key: "careers" }
  ];

  var page = document.body.getAttribute("data-page") || "home";

  var CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function buildNav() {
    return NAV.map(function (n) {
      var active = n.key === page;
      if (n.children) {
        var subs = n.children.map(function (c) {
          return '<li><a href="' + c.href + '">' + c.label + "</a></li>";
        }).join("");
        return '<li class="nav-item has-sub' + (active ? " is-active" : "") + '">' +
          '<div class="nav-parent">' +
            '<a href="' + n.href + '"' + (active ? ' aria-current="page"' : "") + ">" + n.label + "</a>" +
            '<button class="nav-sub-toggle" aria-expanded="false" aria-label="Open Areas of Activity submenu">' + CHEV + "</button>" +
          "</div>" +
          '<ul class="nav-sub">' + subs + "</ul>" +
        "</li>";
      }
      return '<li class="nav-item"><a href="' + n.href + '"' +
        (active ? ' class="is-active" aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");
  }

  var HEART = '<svg class="btn__heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C6 16.5 2 13 2 8.8 2 5.6 4.5 3.5 7.3 3.5c1.7 0 3.4.9 4.7 2.5 1.3-1.6 3-2.5 4.7-2.5C19.5 3.5 22 5.6 22 8.8 22 13 18 16.5 12 21z"/></svg>';

  /* ---------- Top utility bar ---------- */
  // Slim brand accent line, kept connected to the header below it.
  var TOPBAR = '<div class="topbar" aria-hidden="true"></div>';

  /* ---------- Header ---------- */
  var HEADER =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container header__inner">' +
        '<a class="logo" href="index.html" aria-label="SHEKEL – Community Integration for People with Disabilities, home">' +
          '<img class="logo__img" src="../images/logo-shekel.webp" alt="" width="104" height="54" />' +
        '</a>' +
        '<nav class="main-nav" id="mainNav" aria-label="Main navigation">' +
          '<div class="drawer-head">' +
            '<img class="logo__img" src="../images/logo-shekel.webp" alt="SHEKEL" width="92" height="48" />' +
            '<button class="drawer-close" id="drawerClose" aria-label="Close menu">&times;</button>' +
          '</div>' +
          '<ul>' + buildNav() + '</ul>' +
          '<a class="btn btn--donate drawer-donate" href="donate.html">' + HEART + 'Donate</a>' +
          '<div class="drawer-utility">' +
            '<a class="drawer-lang" href="../index.html" lang="he" hreflang="he"><img class="lang-flag" src="../images/flag-il.webp" width="20" height="13" alt="" /> עברית</a>' +
          '</div>' +
        '</nav>' +
        '<div class="header__actions">' +
          '<div class="lang-dd">' +
            '<button class="lang-btn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Choose language">' +
              '<img class="lang-flag" src="../images/flag-uk.webp" width="20" height="13" alt="" /> English' +
              '<svg class="lang-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
            '</button>' +
            '<div class="lang-menu">' +
              '<a href="#" aria-current="true"><img class="lang-flag" src="../images/flag-uk.webp" width="20" height="13" alt="" /> English</a>' +
              '<a href="../index.html" lang="he" hreflang="he"><img class="lang-flag" src="../images/flag-il.webp" width="20" height="13" alt="" /> עברית</a>' +
            '</div>' +
          '</div>' +
          '<a class="btn btn--donate btn--sm" href="donate.html">' + HEART + 'Donate</a>' +
          '<button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
    '</header>';

  /* ---------- Footer ---------- */
  var FOOTER =
    '<footer class="site-footer">' +
      '<div class="container footer__grid">' +
        '<div class="footer__brand">' +
          '<span class="logo logo--footer"><img class="logo__img" src="../images/logo-shekel.webp" alt="SHEKEL – Community Integration for People with Disabilities" width="124" height="64" /></span>' +
          '<p class="footer__about">We see the person. Building an inclusive community where everyone has a place, a voice and a future.</p>' +
          '<div class="footer__social" aria-label="Social media">' +
            '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2.5V5.3c-.4-.05-1.6-.2-3-.2-3 0-5 1.8-5 5.1V13H6v3.5h2.5V24h3.5v-7.5h2.7l.4-3.5H12v-2.4c0-1 .3-1.6 1.9-1.6z"/></svg></a>' +
            '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.5 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1c.3-1.9.5-3.8.5-3.8s0-1.9-.5-3.8zM10 15V9l5.2 3z"/></svg></a>' +
            '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="7" r="1.3"/></svg></a>' +
            '<a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div class="footer__sitemap">' +
          '<h2 class="footer__maptitle">Site Map</h2>' +
          '<div class="footer__cols">' +
            '<nav class="footer__col" aria-label="Areas of Activity"><h3>Areas of Activity</h3><ul>' +
              '<li><a href="programs.html#housing">Community Housing</a></li>' +
              '<li><a href="programs.html#employment">Rehabilitative Employment</a></li>' +
              '<li><a href="programs.html#emotional">Emotional Care</a></li>' +
              '<li><a href="programs.html#children">Children & Youth</a></li>' +
              '<li><a href="programs.html#accessibility">Accessibility</a></li>' +
            '</ul></nav>' +
            '<nav class="footer__col" aria-label="Information"><h3>Information</h3><ul>' +
              '<li><a href="about.html">About Shekel</a></li>' +
              '<li><a href="businesses.html">Social Enterprises</a></li>' +
              '<li><a href="news.html">News & Events</a></li>' +
              '<li><a href="donate.html">Donate & Get Involved</a></li>' +
              '<li><a href="contact.html#careers">Careers</a></li>' +
              '<li><a href="accessibility.html">Accessibility Statement</a></li>' +
            '</ul></nav>' +
            '<div class="footer__col footer__contact"><h3>Contact</h3><ul>' +
              '<li><span aria-hidden="true">📍</span><span>11 Yad Harutzim St., Talpiot<br />Jerusalem 9153002, Israel</span></li>' +
              '<li><span aria-hidden="true">✆</span><a href="tel:+97226720157">+972-2-672-0157</a></li>' +
              '<li><span aria-hidden="true">✉</span><a href="mailto:info@shekel.org.il">info@shekel.org.il</a></li>' +
            '</ul>' +
            '<a class="btn btn--donate btn--sm footer__donate" href="donate.html">' + HEART + 'Donate</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer__bottom"><div class="container footer__bottom-inner">' +
        '<p>© <span id="year">2026</span> SHEKEL – Community Integration for People with Disabilities. All rights reserved.</p>' +
        '<p class="footer__legal">' +
          '<a href="accessibility.html">Accessibility Statement</a><span aria-hidden="true">•</span>' +
          '<a href="privacy.html">Privacy Policy</a><span aria-hidden="true">•</span>' +
          '<a href="#">Terms</a>' +
        '</p>' +
        '<p class="footer__credit">Design &amp; development by' +
          '<a class="footer__credit-logo" href="https://ombee.co.il" target="_blank" rel="noopener noreferrer" aria-label="OMBee – design & development (opens in a new tab)">' +
            '<img src="../images/ombee-logo.webp" alt="OMBee – Graphic Design And UI/UX" />' +
          '</a></p>' +
      '</div></div>' +
    '</footer>';

  /* ---------- Accessibility toolbar ---------- */
  var A_ICONS = {
    contrast:  '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 3a9 9 0 010 18z" fill="currentColor"/></svg>',
    grayscale: '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c4 5 6 8 6 11a6 6 0 11-12 0c0-3 2-6 6-11z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    links:     '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 14.5l5-5M10 7l1-1a4 4 0 015.6 5.6l-1 1M14 17l-1 1A4 4 0 016.4 12.4l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    headings:  '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5v14M13 5v14M5 12h8M17 10l3-1.2V19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    readable:  '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19l5.5-14L14 19M5 14h7M17.5 19v-8.5c1.5-1.6 4-.6 4 1.8V19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    line:      '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h12M9 12h12M9 18h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4 4v16M4 4L2.3 6.2M4 4l1.7 2.2M4 20l-1.7-2.2M4 20l1.7-2.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    spacing:   '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12M6 16h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 12h18M3 12l2.2-1.7M3 12l2.2 1.7M21 12l-2.2-1.7M21 12l-2.2 1.7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    align:     '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M9 12h11M4 18h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    images:    '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="14" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 16l4.5-3.5 3 2.2M13.5 13l3-2 4 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3l18 18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    motion:    '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="5" width="3.6" height="14" rx="1.2" fill="currentColor"/><rect x="13.4" y="5" width="3.6" height="14" rx="1.2" fill="currentColor"/></svg>',
    cursor:    '<svg class="a11y-tile__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l12.5 7.5-5.2 1.3L15.7 18l-2.3.9-2.4-5.3L7 17z" fill="currentColor"/></svg>'
  };
  function aTile(key, label, cycle) {
    return '<button class="a11y-tile' + (cycle ? ' a11y-tile--cycle' : '') + '" data-a11y="' + key + '" aria-pressed="false">' +
      A_ICONS[key] + '<span class="a11y-tile__label"' + (key === 'align' ? ' id="a11yAlignLabel"' : '') + '>' + label + '</span></button>';
  }

  var A11Y =
    '<button id="a11y-toggle" class="a11y-toggle" aria-expanded="false" aria-controls="a11y-panel" title="Accessibility menu">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><circle cx="12" cy="3.8" r="2.2" /><path d="M20.5 8.7c-2.6.7-5.5 1.1-8.5 1.1s-5.9-.4-8.5-1.1c-.5-.1-1 .2-1.1.7-.1.5.2 1 .7 1.1 2.3.6 4.7 1 7.2 1.1v3.6L7.5 21c-.2.5 0 1.1.5 1.3.5.2 1.1 0 1.3-.5L11.7 16h.6l2.4 5.8c.2.5.8.7 1.3.5.5-.2.7-.8.5-1.3L13.7 15v-3.5c2.5-.1 4.9-.5 7.2-1.1.5-.1.8-.6.7-1.1-.1-.5-.6-.8-1.1-.7z" /></svg>' +
      '<span class="sr-only">Open the accessibility menu</span>' +
    '</button>' +
    '<div id="a11y-panel" class="a11y-panel" role="dialog" aria-label="Accessibility settings" aria-modal="false" hidden>' +
      '<div class="a11y-panel__head"><h2><svg class="a11y-head-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="3.8" r="2.2"/><path d="M20.5 8.7c-2.6.7-5.5 1.1-8.5 1.1s-5.9-.4-8.5-1.1c-.5-.1-1 .2-1.1.7-.1.5.2 1 .7 1.1 2.3.6 4.7 1 7.2 1.1v3.6L7.5 21c-.2.5 0 1.1.5 1.3.5.2 1.1 0 1.3-.5L11.7 16h.6l2.4 5.8c.2.5.8.7 1.3.5.5-.2.7-.8.5-1.3L13.7 15v-3.5c2.5-.1 4.9-.5 7.2-1.1.5-.1.8-.6.7-1.1-.1-.5-.6-.8-1.1-.7z"/></svg> Accessibility</h2><button class="a11y-panel__close" id="a11y-close" aria-label="Close accessibility menu">&times;</button></div>' +
      '<div class="a11y-grid">' +
        aTile('contrast', 'High Contrast') +
        aTile('grayscale', 'Grayscale') +
        aTile('links', 'Highlight Links') +
        aTile('headings', 'Highlight Titles') +
        aTile('readable', 'Readable Font') +
        aTile('line', 'Line Height') +
        aTile('spacing', 'Text Spacing') +
        aTile('align', 'Text Align', true) +
        aTile('images', 'Hide Images') +
        aTile('motion', 'Stop Animations') +
        aTile('cursor', 'Big Cursor') +
      '</div>' +
      '<button class="a11y-reset-all" data-a11y="reset-all"><span aria-hidden="true">⟳</span> Reset all settings</button>' +
      '<div class="a11y-links">' +
        '<a href="accessibility.html">Accessibility Statement</a>' +
        '<a href="privacy.html">Privacy Policy</a>' +
      '</div>' +
    '</div>';

  /* ---------- Inject ---------- */
  var skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  skip.textContent = "Skip to main content";
  document.body.insertBefore(skip, document.body.firstChild);

  var headerMount = document.getElementById("site-header");
  if (headerMount) headerMount.outerHTML = HEADER;

  var footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.outerHTML = FOOTER;

  /* accessibility widget is injected by the self-contained js/accessibility.js */

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Language dropdown (flag menu) ---------- */
  (function () {
    var dd = document.querySelector(".lang-dd");
    if (!dd) return;
    var btn = dd.querySelector(".lang-btn");
    var menu = dd.querySelector(".lang-menu");
    if (!btn || !menu) return;
    var items = menu.querySelectorAll("a");
    function toggle(open) {
      dd.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      if (open && items.length) items[0].focus();
    }
    btn.addEventListener("click", function () { toggle(!dd.classList.contains("open")); });
    Array.prototype.forEach.call(items, function (a) {
      a.addEventListener("click", function (e) {
        if (a.getAttribute("href") === "#") { e.preventDefault(); toggle(false); btn.focus(); }
      });
    });
    document.addEventListener("click", function (e) { if (!dd.contains(e.target)) toggle(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && dd.classList.contains("open")) { toggle(false); btn.focus(); }
    });
  })();

  /* ---------- Cookie banner (home page only, first visit) ---------- */
  if (page === "home") {
    var cookieBanner = document.createElement("div");
    cookieBanner.className = "cookie-banner";
    cookieBanner.id = "cookie-banner";
    cookieBanner.innerHTML =
      '<p><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style="vertical-align:-5px;margin-inline-end:7px;flex-shrink:0"><circle cx="12" cy="12" r="10" fill="#d99a4e"/><circle cx="19.5" cy="4.5" r="4.6" fill="#fff"/><circle cx="22.5" cy="9.5" r="3" fill="#fff"/><circle cx="8" cy="8.5" r="1.6" fill="#6b4420"/><circle cx="13.5" cy="11" r="1.2" fill="#6b4420"/><circle cx="9" cy="14.5" r="1.4" fill="#6b4420"/><circle cx="14.5" cy="16" r="1.1" fill="#6b4420"/><circle cx="6.5" cy="12" r="0.9" fill="#6b4420"/></svg>' +
      'This website uses cookies to improve your browsing experience. <a href="privacy.html">Privacy Policy</a></p>' +
      '<div class="cookie-btns"><button class="cookie-accept" type="button">Accept</button><button class="cookie-reject" type="button">Decline</button></div>';
    document.body.appendChild(cookieBanner);
    var COOKIE_KEY = "shekel-cookie-consent";
    var closeCookie = function (val) {
      try { localStorage.setItem(COOKIE_KEY, val); } catch (e) {}
      cookieBanner.classList.remove("show");
    };
    cookieBanner.querySelector(".cookie-accept").addEventListener("click", function () { closeCookie("accepted"); });
    cookieBanner.querySelector(".cookie-reject").addEventListener("click", function () { closeCookie("rejected"); });
    var cookieConsent = null;
    try { cookieConsent = localStorage.getItem(COOKIE_KEY); } catch (e) {}
    if (!cookieConsent) { setTimeout(function () { cookieBanner.classList.add("show"); }, 800); }
  }
})();
