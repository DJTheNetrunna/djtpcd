(function () {
  const CONTACT = {
    phone: "+1-206-981-1429",
    sms: "+12069811429",
    email: "contact@djthepcdude.com"
  };

  function safe(path) {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (path.startsWith("#")) return path;
    return window.ROUTER ? ROUTER.to(path) : path;
  }

  /* =========================
     STATUS STRIP
  ========================== */
  function renderStatusStrip() {
    if (document.getElementById("shared-status")) return;

    const el = document.createElement("div");
    el.id = "shared-status";
    el.className = "shared-status";

    el.innerHTML = `
      <div class="shared-shell">
        <span class="status-dot"></span>
        <strong>STATUS: ONLINE</strong>
        <span>Typical reply 15–60 min</span>
      </div>
    `;

    document.body.prepend(el);
  }

  /* =========================
     HEADER / NAV
  ========================== */
  function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = `
      <div class="shared-shell">
        <h1 class="shared-brand">DJ THE PC DUDE</h1>

        <div class="shared-tools">
          <a href="tel:${CONTACT.phone}" class="utility-link">CALL</a>
          <a href="sms:${CONTACT.sms}" class="utility-link">SMS</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">EMAIL</a>
        </div>

        <nav class="shared-nav">
          <a href="${safe("index.html")}" class="nav-link">Home</a>
          <a href="${safe("pages/services.html")}" class="nav-link">Services</a>
          <a href="${safe("pages/blog.html")}" class="nav-link">Blog</a>
          <a href="${safe("pages/faq.html")}" class="nav-link">FAQ</a>
          <a href="${safe("pages/github.html")}" class="nav-link">GitHub</a>
          <a href="${safe("pages/donate.html")}" class="nav-link">Donate</a>
        </nav>
      </div>
    `;
  }

  /* =========================
     FOOTER
  ========================== */
  function renderFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="shared-shell">
        <p>© 2025 DJ THE PC DUDE</p>

        <div class="shared-footer-tags">
          <a href="${safe("pages/privacy.html")}" class="utility-link">Privacy</a>
          <a href="${safe("pages/terms.html")}" class="utility-link">Terms</a>
        </div>
      </div>
    `;
  }

  /* =========================
     MOBILE CTA
  ========================== */
  function renderMobileCTA() {
    if (document.getElementById("shared-mobile-cta")) return;

    const el = document.createElement("div");
    el.id = "shared-mobile-cta";
    el.className = "shared-mobile-cta";

    el.innerHTML = `
      <a href="tel:${CONTACT.phone}">Call</a>
      <a href="sms:${CONTACT.sms}">Text</a>
      <a href="${safe("pages/services.html")}">Services</a>
    `;

    document.body.appendChild(el);
  }

  /* =========================
     PROMO BANNER ROTATION
  ========================== */
  function initPromos() {
    const banner = document.getElementById("promoBanner");
    const wrapper = document.querySelector(".cashapp-referral-banner");

    if (!banner || !wrapper) return;

    const promos = [
      {
        text: "💸 Cash App: Get $5 when you send $5+ (GTRXMJJ)",
        link: "https://cash.app/app/GTRXMJJ",
        theme: "cashapp-theme"
      },
      {
        text: "🏦 Chime: $100 bonus with qualifying direct deposit",
        link: "https://www.chime.com/",
        theme: "cashapp-theme"
      },
      {
        text: "🚀 Hostinger: Fast hosting + domain deals",
        link: "https://www.hostinger.com?REFERRALCODE=0E5HXMMXR5CT",
        theme: "hostinger-theme"
      }
    ];

    let i = 0;

    setInterval(() => {
      i = (i + 1) % promos.length;

      banner.textContent = promos[i].text;
      banner.href = promos[i].link;

      wrapper.className =
        "cashapp-referral-banner " + promos[i].theme;
    }, 5000);
  }

  /* =========================
     INIT
  ========================== */
  document.addEventListener("DOMContentLoaded", () => {
    renderStatusStrip();
    renderHeader();
    renderFooter();
    renderMobileCTA();
    initPromos();
  });
})();// scripts.js

// 🌙 Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleTheme');
  const userPref = localStorage.getItem('theme');

  if (userPref === 'dark') {
    document.body.classList.add('dark');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
    });
  }

  // ✨ Fade-in on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('section, header, footer').forEach((el) => {
    observer.observe(el);
  });
});
