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
      navLink('/pages/github.html', 'GitHub', (p) => p.includes('/pages/github.html')),
      navLink('/pages/recycle.html', 'Recycle', (p) => p.includes('/pages/recycle.html')),
      navLink('/pages/intake-checklist.html', 'Intake', (p) => p.includes('/pages/intake-checklist.html')),
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

        <div class="shared-footer-tags">
          <a href="sms:${CONTACT.sms}" class="utility-link">SMS</a>
          <a href="tel:${CONTACT.phone}" class="utility-link">Call</a>
          <a href="mailto:${CONTACT.email}" class="utility-link">Email</a>
        </div>

        <p>&copy; 2025 DJ The PC Dude</p>

        <div class="shared-footer-tags">
          <a href="/pages/privacy.html" class="utility-link">Privacy</a>
          <a href="/pages/terms.html" class="utility-link">Terms</a>
          <a href="/pages/faq.html" class="utility-link">FAQ</a>
        </div>

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
        <span>Typical reply 15–60 min</span>
        <span>Emergency: 08:00–22:00</span>
      </div>

      <div class="cashapp-referral-banner cashapp-theme">
        <a id="cashappBannerLink"
           href="https://cash.app/app/GTRXMJJ"
           target="_blank"
           rel="noopener noreferrer">
          💸 Get $5 when you send $5+ with Cash App. Use code GTRXMJJ
        </a>
      </div>
    `;

    document.body.prepend(el);
  }

  function ensureStyle() {
    if (document.getElementById('shared-layout-style')) return;

    const style = document.createElement('style');
    style.id = 'shared-layout-style';

    style.textContent = `
      .shared-shell { max-width: 1100px; margin: 0 auto; }
      .shared-brand { font-family: "Share Tech Mono", monospace; letter-spacing:.12em; text-transform:uppercase; margin:0; }
      .shared-sub { font-size:.82rem; color:#7ddff5; margin-top:6px; }

      .shared-tools, .shared-nav { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }

      .nav-link { color:#7ddff5; text-decoration:none; padding:7px 10px; font-size:.82rem; border-radius:8px; }
      .nav-active { color:#fff; }

      .utility-link {
        padding:5px 8px;
        border:1px solid rgba(85,229,129,.32);
        border-radius:8px;
        color:#7ddff5;
        text-decoration:none;
        font-size:.8rem;
      }

      .shared-status {
        position:sticky;
        top:0;
        z-index:25;
        background:rgba(3,13,8,.95);
        backdrop-filter:blur(3px);
        padding:8px 14px;
        border-bottom:1px solid rgba(85,229,129,.32);
      }

      .status-dot {
        width:8px;
        height:8px;
        border-radius:50%;
        background:#57e582;
        box-shadow:0 0 8px #57e582;
      }

      .shared-mobile-cta {
        display:none;
      }

      @media (max-width:760px){
        .shared-mobile-cta{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          position:fixed;
          bottom:10px;
          left:12px;
          right:12px;
          gap:8px;
          z-index:35;
        }

        .shared-mobile-cta a{
          text-align:center;
          padding:10px;
          border-radius:8px;
          border:1px solid rgba(85,229,129,.32);
          background:rgba(5,15,9,.95);
          color:#fff;
          text-decoration:none;
        }
      }

      /* ===== PROMO THEMES ===== */

      .cashapp-referral-banner{
        text-align:center;
        padding:12px;
        font-weight:700;
        backdrop-filter:blur(6px);
        transition:.3s ease;
      }

      .cashapp-theme{
        background:linear-gradient(90deg,rgba(0,214,50,.15),rgba(45,226,230,.15));
        border-top:1px solid rgba(0,214,50,.35);
        border-bottom:1px solid rgba(0,214,50,.35);
      }

      .hostinger-theme{
        background:linear-gradient(90deg,rgba(102,0,255,.18),rgba(255,102,0,.12));
        border-top:1px solid rgba(120,0,255,.35);
        border-bottom:1px solid rgba(255,90,0,.25);
      }

      .cashapp-referral-banner a{
        display:block;
        text-decoration:none;
        transition:.2s ease;
      }

      .cashapp-theme a{ color:#57e582; }
      .hostinger-theme a{ color:#d6b3ff; }

      .cashapp-referral-banner a:hover{
        color:#fff;
        text-shadow:0 0 10px rgba(255,255,255,.4);
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

    const promos = [
      {
        text: "💸 Get $5 when you send $5+ with Cash App. Use code GTRXMJJ",
        link: "https://cash.app/app/GTRXMJJ",
        theme: "cashapp-theme"
      },
      {
        text: "🏦 $100 for you + $100 for a friend with Chime (direct deposit required)",
        link: "https://www.chime.com/",
        theme: "cashapp-theme"
      },
      {
        text: "🚀 Build your website with Hostinger — fast hosting + AI builder",
        link: "https://www.hostinger.com?REFERRALCODE=0E5HXMMXR5CT",
        theme: "hostinger-theme"
      }
    ];

    let i = 0;

    setInterval(() => {
      const banner = document.getElementById("cashappBannerLink");
      const wrapper = document.querySelector(".cashapp-referral-banner");
      if (!banner || !wrapper) return;

      i = (i + 1) % promos.length;
      const p = promos[i];

      banner.innerHTML = p.text;
      banner.parentElement.href = p.link;

      wrapper.className = "cashapp-referral-banner " + p.theme;
    }, 5000);
  });

})();
