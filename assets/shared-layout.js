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
    if (/^(?:[a-z]+:)?\/\//i.test(path) || /^(?:mailto|tel|sms):/i.test(path) || path.startsWith("#")) return path;
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
      return current === basePath;
    }
    if (match === "tool-home") return current.endsWith("/encrypt decrypt tool/");
    return current.includes(match.toLowerCase());
  }

  function navLink(path, label, match, extraClass = "") {
    const href = to(path);
    const active = isActive(href, match);
    return `<a href="${href}" class="nav-link ${active ? "is-active" : ""} ${extraClass}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
  }

  function ensureSharedStyles() {
    const hasMainStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some((link) => {
      const href = link.getAttribute("href") || "";
      return /(?:^|\/)style\.css(?:\?|#|$)/i.test(href);
    });
    if (hasMainStyles || document.getElementById("djpcd-shared-fallback-style")) return;

    const style = document.createElement("style");
    style.id = "djpcd-shared-fallback-style";
    style.textContent = `
      .shared-status{background:#050910;color:#9eabb9;border-bottom:1px solid rgba(39,215,242,.18);font:11px ui-monospace,monospace;letter-spacing:.04em}
      .shared-status .shared-shell{min-height:28px;display:flex;align-items:center;gap:8px}.status-dot{width:7px;height:7px;border-radius:50%;background:#27d7f2;box-shadow:0 0 10px #27d7f2}.shared-shell{width:min(1180px,calc(100% - 28px));margin-inline:auto}
      header{padding:0!important;background:rgba(5,9,16,.96)!important;border-bottom:1px solid rgba(39,215,242,.18)!important;text-align:left!important}header .shared-shell{padding:12px 0;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px 18px}
      .brand-lockup{display:inline-flex;align-items:center;gap:12px;text-decoration:none;width:fit-content}.brand-logo{width:70px!important;height:70px!important;object-fit:contain}.brand-copy{display:grid;gap:3px}.brand-name{color:#f3f7fb;font-weight:900;letter-spacing:.08em;font-size:14px}.brand-subtitle{color:#79e8ff;font-size:11px}
      .shared-tools,.shared-nav,.shared-subnav,.shared-footer-tags{display:flex;flex-wrap:wrap;align-items:center;gap:7px}.shared-tools{justify-content:flex-end}.shared-nav,.shared-subnav{grid-column:1/-1}.shared-subnav{padding-top:8px;border-top:1px solid rgba(39,215,242,.12)}
      .nav-link,.utility-link{color:#d9e2ec!important;text-decoration:none!important;font:12px ui-monospace,monospace!important;padding:6px 8px;border-radius:7px}.utility-link{border:1px solid rgba(168,179,194,.22)}.nav-link:hover,.utility-link:hover,.nav-link.is-active{color:#79e8ff!important;background:rgba(39,215,242,.09)}
      .academy-link{color:#071019!important;background:linear-gradient(115deg,#f8c43a,#ffe27a 48%,#79e8ff);font-weight:900!important}.shared-subnav:before{content:'TOOLS';color:#8996a5;font-size:10px;letter-spacing:.14em;margin-right:3px}
      footer{background:#050910!important;border-top:1px solid rgba(39,215,242,.14)!important;padding:20px 0!important;text-align:left!important}footer .shared-shell{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.footer-copy p{margin:0;color:#9eabb9}.footer-disclaimer{margin-top:6px!important;font-size:10px;max-width:650px}.shared-footer-tags{justify-content:flex-end}
      .shared-mobile-cta{display:none}@media(max-width:760px){header .shared-shell{grid-template-columns:1fr}.shared-tools{justify-content:flex-start}.brand-subtitle{display:none}footer .shared-shell{flex-direction:column}.shared-footer-tags{justify-content:flex-start}.shared-mobile-cta{position:fixed;z-index:999;left:10px;right:10px;bottom:10px;display:grid;grid-template-columns:repeat(3,1fr);background:#08101a;border:1px solid rgba(39,215,242,.25);border-radius:10px;overflow:hidden}.shared-mobile-cta a{padding:11px;text-align:center;color:#79e8ff;text-decoration:none;font:12px ui-monospace,monospace}.shared-mobile-cta a+a{border-left:1px solid rgba(39,215,242,.15)}}
    `;
    document.head.appendChild(style);
  }

  function toolSubnav() {
    const decoded = decodeURIComponent(location.pathname).toLowerCase();
    if (!decoded.includes("/encrypt decrypt tool/")) return "";
    return `
      <nav class="shared-subnav" aria-label="Encryption tools">
        ${navLink("pages/encrypt%20decrypt%20tool/index.html", "Tool Home", "tool-home")}
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
    el.innerHTML = `<div class="shared-shell"><span class="status-dot" aria-hidden="true"></span><strong>SEATTLE FREELANCE TECH</strong><span>Independent • Self-taught • Practical support</span></div>`;
    document.body.prepend(el);
  }

  function renderHeader() {
    const header = document.querySelector("header");
    if (!header) return;
    header.innerHTML = `
      <div class="shared-shell">
        <a href="${to("index.html")}" class="brand-lockup" aria-label="DJ The PC Dude home">
          <img src="${to("assets/images/djpcd-logo.svg")}" class="brand-logo" alt="DJ The PC Dude logo" width="180" height="180" />
          <span class="brand-copy"><span class="brand-name">DJ THE \"PC\" DUDE</span><span class="brand-subtitle">Seattle PC Repair • Builds • Optimization</span></span>
        </a>
        <div class="shared-tools" aria-label="Contact options">
          <a href="tel:${CONTACT.phone}" class="utility-link">CALL</a><a href="sms:${CONTACT.sms}" class="utility-link">TEXT</a><a href="mailto:${CONTACT.email}" class="utility-link">EMAIL</a>
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
        <div class="footer-copy"><p>© 2026 DJ THE PC DUDE</p><p class="footer-disclaimer">Independent freelance tech service • Self-taught • No formal IT degree or industry certifications.</p></div>
        <div class="shared-footer-tags"><a href="${to("pages/intake-checklist.html")}" class="utility-link">Intake</a><a href="${to("pages/wifi.html")}" class="utility-link">Wi-Fi</a><a href="${to("pages/privacy.html")}" class="utility-link">Privacy</a><a href="${to("pages/terms.html")}" class="utility-link">Terms</a></div>
      </div>`;
  }

  function renderMobileCTA() {
    if (document.getElementById("shared-mobile-cta")) return;
    const el = document.createElement("div");
    el.id = "shared-mobile-cta";
    el.className = "shared-mobile-cta";
    el.innerHTML = `<a href="tel:${CONTACT.phone}">Call</a><a href="sms:${CONTACT.sms}">Text</a><a href="${to("pages/services.html")}">Services</a>`;
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
    ensureSharedStyles();
    renderStatusStrip();
    renderHeader();
    renderFooter();
    renderMobileCTA();
    initFadeIn();
  });
})();
