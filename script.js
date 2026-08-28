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

  function ensureBrandAssets() {
    if (!document.querySelector('link[data-djpcd-favicon]')) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/svg+xml";
      favicon.href = safe("assets/images/djpcd-logo.svg");
      favicon.dataset.djpcdFavicon = "true";
      document.head.appendChild(favicon);
    }
  }

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

  function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = `
      <div class="shared-shell">
        <a href="${safe("index.html")}" class="brand-lockup" aria-label="DJ The PC Dude home">
          <img
            src="${safe("assets/images/djpcd-logo.svg")}" 
            class="brand-logo"
            alt="DJ The PC Dude logo"
            width="180"
            height="180"
          />
          <span class="brand-copy">
            <span class="brand-name">DJ THE \"PC\" DUDE</span>
            <span class="brand-subtitle">Seattle PC Repair • Builds • Optimization</span>
          </span>
        </a>

        <div class="shared-tools">
          <a href="tel:${CONTACT.phone}" class="utility-link">CALL</a>
          <a href="sms:${CONTACT.sms}" class="utility-link">SMS</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">EMAIL</a>
        </div>

        <nav class="shared-nav" aria-label="Main navigation">
          <a href="${safe("index.html")}" class="nav-link">Home</a>
          <a href="${safe("pages/services.html")}" class="nav-link">Services</a>
          <a href="${safe("pages/blog.html")}" class="nav-link">Blog</a>
          <a href="${safe("pages/faq.html")}" class="nav-link">FAQ</a>
          <a href="${safe("pages/github.html")}" class="nav-link">GitHub</a>
          <a href="${safe("pages/donate.html")}" class="nav-link">Donate</a>

          <a
            href="https://djthenetrunna.github.io/dj-tech-academy/"
            class="nav-link inline-flex items-center gap-2 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-300 px-4 py-2 font-black text-gray-950 shadow-lg shadow-amber-500/30 transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-gray-900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DJ Tech Academy — opens in a new tab"
          >
            <span aria-hidden="true">🎓</span>
            <span>DJ Tech Academy</span>
          </a>
        </nav>
      </div>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="shared-shell">
        <p>© 2026 DJ THE PC DUDE</p>

        <div class="shared-footer-tags">
          <a href="${safe("pages/privacy.html")}" class="utility-link">Privacy</a>
          <a href="${safe("pages/terms.html")}" class="utility-link">Terms</a>
        </div>
      </div>
    `;
  }

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
      wrapper.className = "cashapp-referral-banner " + promos[i].theme;
    }, 5000);
  }

  function initFadeIn() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureBrandAssets();
    renderStatusStrip();
    renderHeader();
    renderFooter();
    renderMobileCTA();
    initPromos();
    initFadeIn();
  });
})();
