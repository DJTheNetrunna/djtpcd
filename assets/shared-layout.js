(function () {
  const CONTACT = {
    phone: '+1-206-981-1429',
    sms: '+12069811429',
    email: 'contact@djthepcdude.com'
  };

  function path() {
    return (window.location.pathname || '/').replace(/\/+/g, '/');
  }

  function navLink(href, label, activeMatch) {
    const active = activeMatch(path()) ? 'nav-active' : '';
    return `<a href="${href}" class="nav-link ${active}">${label}</a>`;
  }

  function renderHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    const nav = [
      navLink('/', 'Home', (p) => p === '/' || p.endsWith('/index.html')),
      navLink('/pages/services.html', 'Services', (p) => p.includes('/pages/services.html')),
      navLink('/pages/blog.html', 'Blog', (p) => p.includes('/pages/blog.html') || p.includes('/assets/posts/')),
      navLink('/pages/faq.html', 'FAQ', (p) => p.includes('/pages/faq.html')),
      navLink('/pages/case-studies.html', 'Case Studies', (p) => p.includes('/pages/case-studies.html')),
      navLink('/pages/encrypt%20decrypt%20tool/index.html', 'Encrypt Kit', (p) => p.includes('/encrypt decrypt tool/')),
      navLink('/pages/github.html', 'GitHub', (p) => p.includes('/pages/github.html')),
      navLink('/pages/recycle.html', 'Recycle', (p) => p.includes('/pages/recycle.html')),
      navLink('/pages/intake-checklist.html', 'Intake', (p) => p.includes('/pages/intake-checklist.html')),
      navLink('/#contact', 'Contact', (p) => p === '/' || p.endsWith('/index.html')),
      navLink('/pages/donate.html', 'Donate', (p) => p.includes('/pages/donate.html'))
    ].join('');

    header.innerHTML = `
      <div class="shared-shell">
        <h1 class="shared-brand">DJ THE PC DUDE</h1>
        <div class="shared-sub">SEATTLE TECH OPS // FILEPORTAL STYLE</div>
        <div class="shared-tools">
          <a href="tel:${CONTACT.phone}" class="utility-link">CALL</a>
          <a href="sms:${CONTACT.sms}" class="utility-link">SMS</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">EMAIL</a>
        </div>
        <nav class="shared-nav">${nav}</nav>
      </div>
    `;
  }

  function renderStatusStrip() {
    if (document.getElementById('shared-status')) return;
    const el = document.createElement('div');
    el.id = 'shared-status';
    el.className = 'shared-status';
    el.innerHTML = `
      <div class="shared-shell">
        <span class="status-dot"></span>
        <strong>STATUS: ONLINE</strong>
        <span>Typical reply 15-60 min</span>
        <span>Emergency tier: 08:00-22:00</span>
      </div>
    `;
    document.body.prepend(el);
  }

  function renderMobileCta() {
    if (document.getElementById('shared-mobile-cta')) return;
    const cta = document.createElement('div');
    cta.id = 'shared-mobile-cta';
    cta.className = 'shared-mobile-cta';
    cta.innerHTML = `
      <a href="tel:${CONTACT.phone}">Call</a>
      <a href="sms:${CONTACT.sms}">Text</a>
      <a href="/pages/services.html">Pricing</a>
    `;
    document.body.appendChild(cta);
  }

  function renderFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
      <div class="shared-shell">
        <a href="https://cash.app/$CabbagePatch206"
   target="_blank"
   rel="noopener"
   class="utility-link cash pulse">

        <p class="shared-sub shared-footer-tags">
          <a href="sms:${CONTACT.sms}" class="utility-link">SMS</a>
          <a href="tel:${CONTACT.phone}" class="utility-link">Call</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">Backup Email</a>
        <p>&copy; 2025 DJ The PC Dude. All rights reserved.</p>
        </p>
        <p class="shared-sub shared-footer-tags">
          <a href="/pages/privacy.html" class="utility-link">Privacy</a>
          <a href="/pages/terms.html" class="utility-link">Terms</a>
          <a href="/pages/faq.html" class="utility-link">FAQ</a>
          <a href="/pages/case-studies.html" class="utility-link">Case Studies</a>
        </p>
      </div>
    `;
  }

  function initAnalytics() {
    fetch('/assets/site-config.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg) => {
        if (!cfg || !cfg.analytics || !cfg.analytics.enabled) return;
        if (document.getElementById('analytics-loader')) return;
        const s = document.createElement('script');
        s.id = 'analytics-loader';
        s.defer = true;
        s.src = cfg.analytics.script;
        if (cfg.analytics.domain) s.setAttribute('data-domain', cfg.analytics.domain);
        document.head.appendChild(s);
      })
      .catch(function () {});
  }

  function ensureStyle() {
    if (document.getElementById('shared-layout-style')) return;
    const style = document.createElement('style');
    style.id = 'shared-layout-style';
    style.textContent = `
      .shared-shell { max-width: 1100px; margin: 0 auto; }
      .shared-brand { margin: 0; font-family: "Share Tech Mono", monospace; letter-spacing: .12em; text-transform: uppercase; }
      .shared-sub { margin-top: 6px; font-size: .82rem; color: var(--muted, #7ddff5); }
      .shared-tools { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; }
      .shared-nav { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 10px; }
      .nav-link { padding: 7px 10px; border: 0; border-radius: 8px; color: var(--muted, #7ddff5); text-decoration: none; font-size: .82rem; }
      .nav-link:hover { color: var(--accent-2, #2de2e6); }
      .nav-active { color: var(--text, #ffe7ef); }
      .utility-link { padding: 5px 8px; border: 1px solid var(--line, rgba(85,229,129,.32)); border-radius: 8px; text-decoration: none; color: var(--muted, #7ddff5); font-size: .8rem; margin-right: 4px; display: inline-block; }
      .utility-link:hover { color: var(--accent-2, #2de2e6); border-color: rgba(85,229,129,.52); }
      .shared-status { border-bottom: 1px solid var(--line, rgba(85,229,129,.32)); padding: 8px 14px; font-size: .82rem; color: var(--muted, #7ddff5); position: sticky; top: 0; z-index: 25; background: rgba(3, 13, 8, .95); backdrop-filter: blur(3px); }
      .shared-status .shared-shell { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
      .status-dot { width: 8px; height: 8px; border-radius: 999px; background: #57e582; box-shadow: 0 0 8px #57e582; }
      .shared-footer-tags { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; }
      .shared-footer-tags .utility-link { padding: 3px 6px; font-size: .72rem; margin-right: 0; }
      .shared-mobile-cta { display: none; }
      @media (max-width: 760px) {
        .shared-mobile-cta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; position: fixed; left: 12px; right: 12px; bottom: 10px; z-index: 35; }
        .shared-mobile-cta a { text-align: center; padding: 10px 8px; text-decoration: none; border-radius: 8px; border: 1px solid var(--line, rgba(85,229,129,.32)); color: var(--text, #ffe7ef); background: rgba(5,15,9,.95); font-size: .84rem; }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureStyle();
    renderStatusStrip();
    renderHeader();
    renderFooter();
    renderMobileCta();
    initAnalytics();
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');

      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(isHidden));
      menuBtn.textContent = isHidden ? '✕' : '☰';
    });

    // auto-close on link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });
  }
});