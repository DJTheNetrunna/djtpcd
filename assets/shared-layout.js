(function () {
  const CONTACT = {
    phone: "+12069811429",
    sms: "+12069811429",
    email: "contact@djthepcdude.com"
  };

  function siteBase() {
    if (location.protocol === "file:") return "";
    if (location.hostname.endsWith(".github.io")) {
      const first = location.pathname.split("/").filter(Boolean)[0];
      return first ? `/${first}/` : "/";
    }
    return "/";
  }

  const BASE = siteBase();

  function to(path) {
    if (!path) return BASE;
    if (/^(?:[a-z]+:)?\/\//i.test(path) || /^(?:mailto|tel|sms):/i.test(path) || path.startsWith("#")) {
      return path;
    }
    return BASE + path.replace(/^\/+/, "");
  }

  function normalizedPath(value) {
    try {
      const url = new URL(value, location.href);
      return decodeURIComponent(url.pathname)
        .replace(/\/index\.html$/i, "/")
        .replace(/\/+$/, "/")
        .toLowerCase();
    } catch {
      return "";
    }
  }

  function isActive(target, match) {
    const current = normalizedPath(location.href);
    if (match === "home") {
      const basePath = normalizedPath(new URL(BASE, location.origin).href);
      return current === basePath || current.endsWith("/index.html/");
    }
    return current.includes(match.toLowerCase());
  }

  function navLink(path, label, match, extraClass = "") {
    const href = to(path);
    const active = isActive(href, match);
    return `<a href="${href}" class="nav-link ${active ? "is-active" : ""} ${extraClass}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
  }

  function toolSubnav() {
    const decoded = decodeURIComponent(location.pathname).toLowerCase();
    if (!decoded.includes("/encrypt decrypt tool/")) return "";

    return `
      <nav class="shared-subnav" aria-label="Encryption tools">
        ${navLink("pages/encrypt%20decrypt%20tool/index.html", "Tool Home", "/encrypt decrypt tool/")}
        ${navLink("pages/encrypt%20decrypt%20tool/encrypt.html", "Encrypt / Decrypt", "/encrypt decrypt tool/encrypt.html")}
        ${navLink("pages/encrypt%20decrypt%20tool/hash.html", "Hash", "/encrypt decrypt tool/hash.html")}
        ${navLink("pages/encrypt%20decrypt%20tool/password.html", "Passwords", "/encrypt decrypt tool/password.html")}
        ${navLink("pages/encrypt%20decrypt%20tool/base64.html", "Base64", "/encrypt decrypt tool/base64.html")}
        ${navLink("pages/encrypt%20decrypt%20tool/filecrypt.html", "File Crypt", "/encrypt decrypt tool/filecrypt.html")}
      </nav>`;
  }

  function renderStatusStrip() {
    if (document.getElementById("shared-status")) return;
    const el = document.createElement("div");
    el.id = "shared-status";
    el.className = "shared-status";
    el.innerHTML = `
      <div class="shared-shell">
        <span class="status-dot" aria-hidden="true"></span>
        <strong>SEATTLE FREELANCE TECH</strong>
        <span>Independent • Self-taught • Practical support</span>
      </div>`;
    document.body.prepend(el);
  }

  function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    header.innerHTML = `
      <div class="shared-shell">
        <a href="${to("index.html")}" class="brand-lockup" aria-label="DJ The PC Dude home">
          <img src="${to("assets/images/djpcd-logo.svg")}" class="brand-logo" alt="DJ The PC Dude logo" width="180" height="180" />
          <span class="brand-copy">
            <span class="brand-name">DJ THE \"PC\" DUDE</span>
            <span class="brand-subtitle">Seattle PC Repair • Builds • Optimization</span>
          </span>
        </a>

        <div class="shared-tools" aria-label="Contact options">
          <a href="tel:${CONTACT.phone}" class="utility-link">CALL</a>
          <a href="sms:${CONTACT.sms}" class="utility-link">TEXT</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">EMAIL</a>
        </div>

        <nav class="shared-nav" aria-label="Main navigation">
          ${navLink("index.html", "Home", "home")}
          ${navLink("pages/services.html", "Services", "/pages/services.html")}
          ${navLink("pages/blog.html", "Blog", "/pages/blog.html")}
          ${navLink("pages/faq.html", "FAQ", "/pages/faq.html")}
          ${navLink("pages/case-studies.html", "Case Studies", "/pages/case-studies.html")}
          ${navLink("pages/encrypt%20decrypt%20tool/index.html", "Tools", "/encrypt decrypt tool/")}
          ${navLink("pages/recycle.html", "Recycle", "/pages/recycle.html")}
          ${navLink("pages/github.html", "GitHub", "/pages/github.html")}
          ${navLink("pages/donate.html", "Donate", "/pages/donate.html")}
          <a href="${to("index.html#contact")}" class="nav-link">Contact</a>
          <a href="https://djthenetrunna.github.io/dj-tech-academy/" class="nav-link academy-link" target="_blank" rel="noopener noreferrer">🎓 Tech Academy</a>
        </nav>
        ${toolSubnav()}
      </div>`;
  }

  function renderFooter() {
    const footer = document.querySelector("footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="shared-shell">
        <div class="footer-copy">
          <p>© 2026 DJ THE PC DUDE</p>
          <p class="footer-disclaimer">Independent freelance tech service • Self-taught • No formal IT degree or industry certifications.</p>
        </div>
        <div class="shared-footer-tags">
          <a href="${to("pages/intake-checklist.html")}" class="utility-link">Intake</a>
          <a href="${to("pages/wifi.html")}" class="utility-link">Wi-Fi</a>
          <a href="${to("pages/privacy.html")}" class="utility-link">Privacy</a>
          <a href="${to("pages/terms.html")}" class="utility-link">Terms</a>
        </div>
      </div>`;
  }

  function renderMobileCTA() {
    if (document.getElementById("shared-mobile-cta")) return;
    const el = document.createElement("div");
    el.id = "shared-mobile-cta";
    el.className = "shared-mobile-cta";
    el.innerHTML = `
      <a href="tel:${CONTACT.phone}">Call</a>
      <a href="sms:${CONTACT.sms}">Text</a>
      <a href="${to("pages/services.html")}">Services</a>`;
    document.body.appendChild(el);
  }

  function initFadeIn() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".fade-in-up").forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".fade-in-up").forEach((el) => observer.observe(el));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderStatusStrip();
    renderHeader();
    renderFooter();
    renderMobileCTA();
    initFadeIn();
  });
})();
