/* =========================================================
   שק״ל — Shared layout (header, footer, accessibility toolbar)
   Injected into every page so the logo / nav / footer live in
   ONE place. Works when opening files directly (no fetch).
   Each page sets <body data-page="..."> to mark the active nav.
   ========================================================= */
(function () {
  "use strict";

  var NAV = [
    { href: "about.html", label: "אודות", key: "about" },
    { href: "programs.html", label: "תחומי הפעילות", key: "programs", children: [
      { href: "housing.html",              label: "דיור בקהילה" },
      { href: "employment.html",           label: "תעסוקה שיקומית" },
      { href: "emotional.html",            label: "טיפול רגשי" },
      { href: "children.html",             label: "ילדים ונוער" },
      { href: "leisure.html",              label: "צבא, השכלה ופנאי" },
      { href: "accessibility-center.html", label: "נגישות" },
      { href: "global.html",               label: "שק״ל בעולם" }
    ] },
    { href: "news.html",       label: "חדשות ואירועים",    key: "news" },
    { href: "branches.html",   label: "איפה אנחנו פעילים", key: "branches" },
    { href: "businesses.html", label: "עסקים חברתיים",     key: "businesses" },
    { href: "contact.html",    label: "יצירת קשר",         key: "contact" }
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
            '<button class="nav-sub-toggle" aria-expanded="false" aria-label="פתיחת תת-תפריט ' + n.label + '">' + CHEV + "</button>" +
          "</div>" +
          '<ul class="nav-sub">' + subs + "</ul>" +
        "</li>";
      }
      return '<li class="nav-item"><a href="' + n.href + '"' +
        (active ? ' class="is-active" aria-current="page"' : "") + ">" + n.label + "</a></li>";
    }).join("");
  }

  /* ---------- Top utility bar ---------- */
  var TOPBAR =
    '<div class="topbar">' +
      '<div class="container topbar__inner">' +
        '<a class="topbar__phone" href="contact.html"><span aria-hidden="true">✆</span> 02-6720157</a>' +
        '<nav class="topbar__links" aria-label="קישורים שימושיים">' +
          '<a href="contact.html#careers">דרושים</a>' +
          '<a class="topbar__lang" href="en/index.html" lang="en" hreflang="en"><svg class="topbar__globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>EN</a>' +
        '</nav>' +
      '</div>' +
    '</div>';

  /* ---------- Header ---------- */
  var HEADER =
    '<header class="site-header" id="siteHeader">' +
      '<div class="container header__inner">' +
        '<a class="logo" href="index.html" aria-label="שק״ל – שילוב קהילתי לאנשים עם מוגבלויות, לעמוד הבית">' +
          '<img class="logo__img" src="images/logo.svg" alt="" width="104" height="54" />' +
        '</a>' +
        '<nav class="main-nav" id="mainNav" aria-label="ניווט ראשי">' +
          '<div class="drawer-head">' +
            '<img class="logo__img" src="images/logo.svg" alt="שק״ל" width="92" height="48" />' +
            '<button class="drawer-close" id="drawerClose" aria-label="סגירת התפריט">&times;</button>' +
          '</div>' +
          '<ul>' + buildNav() + '</ul>' +
          '<a class="btn btn--donate drawer-donate" href="donate.html"><svg class="btn__heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C6 16.5 2 13 2 8.8 2 5.6 4.5 3.5 7.3 3.5c1.7 0 3.4.9 4.7 2.5 1.3-1.6 3-2.5 4.7-2.5C19.5 3.5 22 5.6 22 8.8 22 13 18 16.5 12 21z"/></svg>לתרומה</a>' +
          '<div class="drawer-utility">' +
            '<a class="drawer-lang" href="en/index.html" lang="en" hreflang="en"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg> English</a>' +
            '<a href="contact.html#careers">דרושים</a>' +
          '</div>' +
        '</nav>' +
        '<div class="header__actions">' +
          '<a class="btn btn--donate btn--sm" href="donate.html">' +
            '<svg class="btn__heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C6 16.5 2 13 2 8.8 2 5.6 4.5 3.5 7.3 3.5c1.7 0 3.4.9 4.7 2.5 1.3-1.6 3-2.5 4.7-2.5C19.5 3.5 22 5.6 22 8.8 22 13 18 16.5 12 21z"/></svg>' +
            'לתרומה</a>' +
          '<button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav" aria-label="פתיחת תפריט"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
    '</header>';

  /* ---------- Footer ---------- */
  var FOOTER =
    '<footer class="site-footer">' +
      '<div class="container footer__grid">' +
        '<div class="footer__brand">' +
          '<span class="logo logo--footer"><img class="logo__img" src="images/logo.svg" alt="שק״ל – שילוב קהילתי לאנשים עם מוגבלויות" width="124" height="64" /></span>' +
          '<p class="footer__about">רואים את האדם. בונים קהילה מכילה שבה לכל אחד יש מקום, קול ועתיד.</p>' +
          '<div class="footer__social" aria-label="רשתות חברתיות">' +
            '<a href="#" aria-label="פייסבוק"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.5h2.5V5.3c-.4-.05-1.6-.2-3-.2-3 0-5 1.8-5 5.1V13H6v3.5h2.5V24h3.5v-7.5h2.7l.4-3.5H12v-2.4c0-1 .3-1.6 1.9-1.6z"/></svg></a>' +
            '<a href="#" aria-label="יוטיוב"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.5 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1c.3-1.9.5-3.8.5-3.8s0-1.9-.5-3.8zM10 15V9l5.2 3z"/></svg></a>' +
            '<a href="#" aria-label="אינסטגרם"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="7" r="1.3"/></svg></a>' +
            '<a href="#" aria-label="לינקדאין"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div class="footer__sitemap">' +
          '<h2 class="footer__maptitle">מפת האתר</h2>' +
          '<div class="footer__cols">' +
            '<nav class="footer__col" aria-label="תחומי פעילות"><h3>תחומי פעילות</h3><ul>' +
              '<li><a href="housing.html">דיור בקהילה</a></li>' +
              '<li><a href="employment.html">תעסוקה שיקומית</a></li>' +
              '<li><a href="emotional.html">טיפול רגשי</a></li>' +
              '<li><a href="children.html">ילדים ונוער</a></li>' +
              '<li><a href="accessibility-center.html">נגישות</a></li>' +
            '</ul></nav>' +
            '<nav class="footer__col" aria-label="מידע ושירות"><h3>מידע ושירות</h3><ul>' +
              '<li><a href="about.html">אודות שק״ל</a></li>' +
              '<li><a href="businesses.html">עסקים חברתיים</a></li>' +
              '<li><a href="news.html">חדשות ואירועים</a></li>' +
              '<li><a href="donate.html">תרומה ומעורבות</a></li>' +
              '<li><a href="contact.html#careers">דרושים</a></li>' +
              '<li><a href="accessibility.html">הצהרת נגישות</a></li>' +
            '</ul></nav>' +
            '<div class="footer__col footer__contact"><h3>צרו קשר</h3><ul>' +
              '<li><span aria-hidden="true">📍</span><span>רח׳ יד חרוצים 11, תלפיות<br />ירושלים 9153002</span></li>' +
              '<li><span aria-hidden="true">✆</span><a href="tel:+97226720157">02-6720157</a></li>' +
              '<li><span aria-hidden="true">✉</span><a href="mailto:info@shekel.org.il">info@shekel.org.il</a></li>' +
            '</ul>' +
            '<a class="btn btn--donate btn--sm footer__donate" href="donate.html"><svg class="btn__heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21C6 16.5 2 13 2 8.8 2 5.6 4.5 3.5 7.3 3.5c1.7 0 3.4.9 4.7 2.5 1.3-1.6 3-2.5 4.7-2.5C19.5 3.5 22 5.6 22 8.8 22 13 18 16.5 12 21z"/></svg>לתרומה</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="footer__bottom"><div class="container footer__bottom-inner">' +
        '<p>© <span id="year">2026</span> כל הזכויות שמורות לשק״ל – שילוב קהילתי לאנשים עם מוגבלויות</p>' +
        '<p class="footer__legal">' +
          '<a href="accessibility.html">הצהרת נגישות</a><span aria-hidden="true">•</span>' +
          '<a href="privacy.html">מדיניות פרטיות</a><span aria-hidden="true">•</span>' +
          '<a href="#">תקנון</a>' +
        '</p>' +
        '<p class="footer__credit">עיצוב ובנייה ע״י' +
          '<a class="footer__credit-logo" href="https://ombee.co.il" target="_blank" rel="noopener noreferrer" aria-label="OMBee – עיצוב ובנייה (נפתח בלשונית חדשה)">' +
            '<img src="images/ombee-logo.png" alt="OMBee – Graphic Design And UI/UX" />' +
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
    '<button id="a11y-toggle" class="a11y-toggle" aria-expanded="false" aria-controls="a11y-panel" title="תפריט נגישות">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="3.8" r="2.2" /><path d="M3.5 7.5c2.8 1 5.6 1.5 8.5 1.5s5.7-.5 8.5-1.5M12 9v5m0 0l-2.8 6.5M12 14l2.8 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>' +
      '<span class="sr-only">פתחו את תפריט הנגישות</span>' +
    '</button>' +
    '<div id="a11y-panel" class="a11y-panel" role="dialog" aria-label="הגדרות נגישות" aria-modal="false" hidden>' +
      '<div class="a11y-panel__head"><h2><span aria-hidden="true">♿</span> תפריט נגישות</h2><button class="a11y-panel__close" id="a11y-close" aria-label="סגירת תפריט נגישות">&times;</button></div>' +
      '<div class="a11y-grid">' +
        aTile('contrast', 'ניגודיות גבוהה') +
        aTile('grayscale', 'גווני אפור') +
        aTile('links', 'הדגשת קישורים') +
        aTile('headings', 'הדגשת כותרות') +
        aTile('readable', 'גופן קריא') +
        aTile('line', 'גובה שורה') +
        aTile('spacing', 'ריווח טקסט') +
        aTile('align', 'יישור טקסט', true) +
        aTile('images', 'הסתרת תמונות') +
        aTile('motion', 'עצירת אנימציות') +
        aTile('cursor', 'סמן גדול') +
      '</div>' +
      '<button class="a11y-reset-all" data-a11y="reset-all"><span aria-hidden="true">⟳</span> איפוס כל ההגדרות</button>' +
      '<div class="a11y-links">' +
        '<a href="accessibility.html">הצהרת נגישות</a>' +
        '<a href="privacy.html">מדיניות פרטיות</a>' +
      '</div>' +
    '</div>';

  /* ---------- Inject ---------- */
  // Skip link (first focusable element)
  var skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  skip.textContent = "דלגו לתוכן הראשי";
  document.body.insertBefore(skip, document.body.firstChild);

  var headerMount = document.getElementById("site-header");
  if (headerMount) headerMount.outerHTML = TOPBAR + HEADER;

  var footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.outerHTML = FOOTER;

  var a11yWrap = document.createElement("div");
  a11yWrap.innerHTML = A11Y;
  while (a11yWrap.firstChild) document.body.appendChild(a11yWrap.firstChild);

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
