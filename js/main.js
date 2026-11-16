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

  /* Accessibility: handled by the self-contained js/accessibility.js widget */

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
