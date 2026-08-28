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

  function loadThemeEngine() {
    if (window.DJThemeEngine || document.querySelector("script[data-djpcd-theme-engine]")) return;
    const script = document.createElement("script");
    script.src = to("assets/theme-engine.js");
    script.dataset.djpcdThemeEngine = "true";
    document.head.appendChild(script);
  }

  loadThemeEngine();

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
    return current.includes(match.toLowerCase());
  }

  function navLink(path, label, match, extraClass = "") {
    const href = to(path);
    const active = isActive(href, match);
    return `<a href="${href}" class="nav-link ${active ? "is-active" : ""} ${extraClass}"${active ? ' aria-current="page"' : ""}>${label}</a>`;
  }

  function ensureBrandAssets() {
    if (!document.querySelector('link[data-djpcd-favicon]')) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/svg+xml";
      favicon.href = to("assets/images/djpcd-logo.svg");
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

  function initPromos() {
    const banner = document.getElementById("promoBanner");
    const wrapper = document.querySelector(".cashapp-referral-banner");
    if (!banner || !wrapper) return;

    const promos = [
      { text: "💸 Cash App: Get $5 when you send $5+ (GTRXMJJ)", link: "https://cash.app/app/GTRXMJJ", theme: "cashapp-theme" },
      { text: "🏦 Chime: $100 bonus with qualifying direct deposit", link: "https://www.chime.com/", theme: "cashapp-theme" },
      { text: "🚀 Hostinger: Fast hosting + domain deals", link: "https://www.hostinger.com?REFERRALCODE=0E5HXMMXR5CT", theme: "hostinger-theme" }
    ];

    let i = 0;
    setInterval(() => {
      i = (i + 1) % promos.length;
      banner.textContent = promos[i].text;
      banner.href = promos[i].link;
      wrapper.className = "cashapp-referral-banner " + promos[i].theme;
    }, 5000);
  }

  async function updateLatestBlogAnnouncement() {
    const announcement = document.getElementById("latest-blog-announcement");
    const link = document.getElementById("latest-blog-link");
    const title = document.getElementById("latest-blog-title");
    const meta = document.getElementById("latest-blog-meta");
    const summary = document.getElementById("latest-blog-summary");
    if (!announcement || !link || !title || !meta || !summary) return;

    try {
      const response = await fetch(to("pages/blog.html"), { cache: "no-store" });
      if (!response.ok) throw new Error(`Blog request failed: ${response.status}`);

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const newestPost = doc.querySelector("main article");
      if (!newestPost) throw new Error("No blog articles found");

      const postLink = newestPost.querySelector("h1 a, h2 a, h3 a, a[href*='assets/posts']");
      if (!postLink) throw new Error("Newest blog article has no post link");

      const rawHref = postLink.getAttribute("href");
      const paragraphs = Array.from(newestPost.querySelectorAll("p"));
      const dateParagraph = paragraphs.find((p) => /^Posted\b/i.test(p.textContent.trim()));
      const categoryParagraph = paragraphs.find((p) => {
        const text = p.textContent.trim();
        return text && !/^Posted\b/i.test(text) && text.length < 80;
      });
      const summaryParagraph = paragraphs.find((p) => {
        const text = p.textContent.trim();
        return text.length >= 40 && !/^Posted\b/i.test(text);
      });

      const blogPageUrl = new URL(to("pages/blog.html"), location.origin);
      const resolvedPostUrl = new URL(rawHref, blogPageUrl);
      const category = categoryParagraph
        ? categoryParagraph.textContent.trim().replace(/\s*•\s*New\s*$/i, "")
        : "Latest Post";
      const date = dateParagraph
        ? dateParagraph.textContent.trim().replace(/^Posted(?:\s+on)?\s*/i, "")
        : "";

      link.href = resolvedPostUrl.href;
      title.textContent = postLink.textContent.trim();
      meta.textContent = date ? `${category} • ${date}` : category;
      if (summaryParagraph) summary.textContent = summaryParagraph.textContent.trim();
      announcement.dataset.latestBlogLoaded = "true";
    } catch (error) {
      console.warn("Latest blog announcement is using its built-in fallback.", error);
    }
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
    ensureBrandAssets();
    renderStatusStrip();
    renderHeader();
    renderFooter();
    renderMobileCTA();
    initPromos();
    updateLatestBlogAnnouncement();
    initFadeIn();
  });
})();
