(function () {
  const CONTACT = {
    phone: "+1-425-565-4257",
    sms: "+14255654257",
    email: "austinejones37@gmail.com"
  };

  function link(href, label) {
    const url = window.ROUTER ? ROUTER.to(href) : href;
    return `<a href="${url}" class="nav-link">${label}</a>`;
  }

  function renderHeader() {
    const el = document.querySelector("header");
    if (!el) return;

    el.innerHTML = `
      <div class="shared-shell">
        <h1 class="shared-brand">DJ THE "PC" DUDE</h1>

        <div class="shared-tools">
          <a href="tel:${CONTACT.phone}" class="utility-link">CALL</a>
          <a href="sms:${CONTACT.sms}" class="utility-link">SMS</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">EMAIL</a>
        </div>

        <nav class="shared-nav">
          ${link("index.html", "Home")}
          ${link("pages/services.html", "Services")}
          ${link("pages/blog.html", "Blog")}
          ${link("pages/faq.html", "FAQ")}
          ${link("pages/github.html", "GitHub")}
          ${link("pages/donate.html", "Donate")}
          ${link("https://djthenetrunna.github.io/dj-tech-academy/", "DJ's Tech Academy!")}
        </nav>
      </div>
    `;
  }

  function renderFooter() {
    const el = document.querySelector("footer");
    if (!el) return;

    el.innerHTML = `
      <div class="shared-shell">
        <div>
          <p>© 2026 DJ THE PC DUDE</p>
          <p class="mt-2 text-xs text-gray-400">
            Independent freelance tech service • Self-taught • No formal IT degree or industry certifications.
          </p>
        </div>

        <div class="shared-footer-tags">
          <a href="${ROUTER.to("pages/privacy.html")}">Privacy</a>
          <a href="${ROUTER.to("pages/terms.html")}">Terms</a>
        </div>
      </div>
    `;
  }

  function renderCTA() {
    if (document.getElementById("cta")) return;

    const el = document.createElement("div");
    el.id = "cta";
    el.innerHTML = `
      <a href="tel:${CONTACT.phone}">Call</a>
      <a href="${ROUTER.to("pages/services.html")}">Services</a>
    `;
    document.body.appendChild(el);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    renderCTA();
  });
})();
