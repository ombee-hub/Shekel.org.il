/* =========================================================
   שק״ל — Redesign
   Interactions: header, mobile nav, accessibility toolbar,
   scroll reveal, animated counters, newsletter
   ========================================================= */
(function () {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LANG = (document.documentElement.lang || "he").toLowerCase().indexOf("en") === 0 ? "en" : "he";

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const nav = $("#mainNav");
  const navToggle = $("#navToggle");
  let backdrop = $(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
  }

  const setNav = (open) => {
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    // Lock background scroll while the drawer is open. The scroll container is
    // <html> (it carries overflow-x: clip), so lock it there — locking <body>
    // alone leaves the page scrollable behind the drawer.
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : "";
  };

  navToggle.addEventListener("click", () =>
    setNav(navToggle.getAttribute("aria-expanded") !== "true")
  );
  backdrop.addEventListener("click", () => setNav(false));
  const drawerClose = $("#drawerClose");
  if (drawerClose) drawerClose.addEventListener("click", () => setNav(false));
  $$("#mainNav a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
  });

  /* ---------- Dropdown submenu (תחומי הפעילות) ---------- */
  const closeAllSubs = (except) => {
    $$(".has-sub").forEach((item) => {
      if (item === except) return;
      item.classList.remove("is-open");
      const b = item.querySelector(".nav-sub-toggle");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  };
  $$(".nav-sub-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = btn.closest(".has-sub");
      const open = !item.classList.contains("is-open");
      closeAllSubs(open ? item : null);
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-sub")) closeAllSubs(null);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllSubs(null);
  });

  /* =========================================================
     Accessibility toolbar
     ========================================================= */
  const STORE_KEY = "shekel-a11y";
  const root = document.documentElement;
  const panel = $("#a11y-panel");
  const a11yToggle = $("#a11y-toggle");
  const a11yClose = $("#a11y-close");

  const state = {
    font: 0,
    contrast: false, grayscale: false, links: false, headings: false,
    readable: false, line: false, spacing: false, images: false,
    motion: false, cursor: false,
    align: "" // '', 'right', 'center', 'left'
  };

  // toggle key -> <html> class
  const A11Y_CLASSES = {
    contrast: "a11y-contrast", grayscale: "a11y-grayscale", links: "a11y-links",
    headings: "a11y-headings", readable: "a11y-readable", line: "a11y-line",
    spacing: "a11y-spacing", images: "a11y-images", motion: "a11y-no-motion",
    cursor: "a11y-cursor"
  };
  const ALIGN_STEPS = ["", "right", "center", "left"];
  const ALIGN_LABELS = LANG === "en"
    ? { "": "Text Align", right: "Align Right", center: "Align Center", left: "Align Left" }
    : { "": "יישור טקסט", right: "יישור לימין", center: "יישור למרכז", left: "יישור לשמאל" };

  const FONT_STEP = 0.08, FONT_MIN = -3, FONT_MAX = 6;

  function load() {
    try { Object.assign(state, JSON.parse(localStorage.getItem(STORE_KEY) || "{}")); } catch (e) { /* ignore */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }
  function setPressed(name, val) {
    const btn = $(`[data-a11y="${name}"]`);
    if (btn) btn.setAttribute("aria-pressed", String(val));
  }

  function apply() {
    Object.keys(A11Y_CLASSES).forEach((k) => {
      root.classList.toggle(A11Y_CLASSES[k], !!state[k]);
      setPressed(k, !!state[k]);
    });

    // text alignment (cycles through the options)
    ALIGN_STEPS.forEach((a) => { if (a) root.classList.toggle("a11y-align-" + a, state.align === a); });
    setPressed("align", !!state.align);
    const alignLabel = $("#a11yAlignLabel");
    if (alignLabel) alignLabel.textContent = ALIGN_LABELS[state.align] || ALIGN_LABELS[""];
  }

  function openPanel() {
    panel.hidden = false;
    a11yToggle.setAttribute("aria-expanded", "true");
    panel.querySelector("button, a")?.focus();
  }
  function closePanel() {
    panel.hidden = true;
    a11yToggle.setAttribute("aria-expanded", "false");
    a11yToggle.focus();
  }

  a11yToggle.addEventListener("click", () =>
    panel.hidden ? openPanel() : closePanel()
  );
  a11yClose.addEventListener("click", closePanel);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) closePanel();
  });
  document.addEventListener("click", (e) => {
    if (!panel.hidden && !panel.contains(e.target) && !a11yToggle.contains(e.target)) {
      closePanel();
    }
  });

  $$("[data-a11y]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.a11y;
      if (action === "font-inc") state.font = Math.min(FONT_MAX, state.font + 1);
      else if (action === "font-dec") state.font = Math.max(FONT_MIN, state.font - 1);
      else if (action === "font-reset") state.font = 0;
      else if (action === "align") {
        state.align = ALIGN_STEPS[(ALIGN_STEPS.indexOf(state.align) + 1) % ALIGN_STEPS.length];
      } else if (action === "reset-all") {
        state.font = 0; state.align = "";
        Object.keys(A11Y_CLASSES).forEach((k) => { state[k] = false; });
      } else if (action in A11Y_CLASSES) {
        state[action] = !state[action];
      } else { return; }
      apply();
      save();
    });
  });

  load();
  apply();

  /* =========================================================
     Scroll reveal
     ========================================================= */
  const revealEls = $$(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* =========================================================
     Animated counters
     ========================================================= */
  const counters = $$(".stat__num");
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion) { el.textContent = target.toLocaleString("he-IL") + suffix; return; }
    const duration = 1600;
    let startTime = null;
    const tick = (now) => {
      if (startTime === null) startTime = now;
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased).toLocaleString("he-IL") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const cio = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((c) => cio.observe(c));
    }
  }

  /* =========================================================
     Newsletter (demo handler)
     ========================================================= */
  const form = $("#newsletterForm");
  if (form) {
    const status = $("#nlStatus");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#nl-name").value.trim();
      const email = $("#nl-email").value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk) {
        status.style.color = "var(--coral-600)";
        status.textContent = "אנא מלאו שם ודוא״ל תקין.";
        return;
      }
      status.style.color = "var(--green)";
      status.textContent = `תודה, ${name}! נרשמתם בהצלחה לרשימת התפוצה. 💛`;
      form.reset();
    });
  }

  /* =========================================================
     Contact form (demo handler)
     ========================================================= */
  const cForm = $("#contactForm");
  if (cForm) {
    const cStatus = $("#contactStatus");
    cForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#c-name").value.trim();
      const email = $("#c-email").value.trim();
      const msg = $("#c-msg").value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !msg) {
        cStatus.style.color = "var(--coral-600)";
        cStatus.textContent = LANG === "en"
          ? "Please enter your name, a valid email and a message."
          : "אנא מלאו שם, דוא״ל תקין ותוכן הודעה.";
        return;
      }
      cStatus.style.color = "var(--green)";
      cStatus.textContent = LANG === "en"
        ? `Thank you, ${name}! Your message has been sent — we'll get back to you soon. 💛`
        : `תודה, ${name}! ההודעה נשלחה ונחזור אליכם בהקדם. 💛`;
      cForm.reset();
    });
  }
})();
