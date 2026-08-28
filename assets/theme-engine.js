(function () {
  if (window.DJThemeEngine) return;

  const THEMES = [
    {
      id: "cyber-cyan-orange",
      name: "Cyber Cyan / Orange",
      accent: "#00F5FF",
      accentSoft: "#B8FCFF",
      accent2: "#FF5A1F",
      bg1: "#031419",
      bg2: "#140A07",
      bg3: "#010407",
      panel: "#09232A",
      panel2: "#140E11",
      text: "#F5FEFF",
      muted: "#A9C5C9"
    },
    {
      id: "neon-magenta-lime",
      name: "Neon Magenta / Lime",
      accent: "#FF00CC",
      accentSoft: "#FFB5EF",
      accent2: "#A6FF00",
      bg1: "#190313",
      bg2: "#101900",
      bg3: "#050106",
      panel: "#2B0A24",
      panel2: "#111A08",
      text: "#FFF7FD",
      muted: "#D4AFCB"
    },
    {
      id: "electric-lime-violet",
      name: "Electric Lime / Violet",
      accent: "#B7FF00",
      accentSoft: "#E9FFA6",
      accent2: "#7A00FF",
      bg1: "#0B1600",
      bg2: "#10051C",
      bg3: "#020400",
      panel: "#172907",
      panel2: "#150A25",
      text: "#FBFFF0",
      muted: "#BCCAA8"
    },
    {
      id: "solar-blue",
      name: "Solar Orange / Blue",
      accent: "#FF6A00",
      accentSoft: "#FFD1A8",
      accent2: "#00A8FF",
      bg1: "#1A0A02",
      bg2: "#031322",
      bg3: "#060201",
      panel: "#321506",
      panel2: "#081C2D",
      text: "#FFF9F3",
      muted: "#D2B7A6"
    },
    {
      id: "ultraviolet-yellow",
      name: "Ultraviolet / Yellow",
      accent: "#8A2EFF",
      accentSoft: "#D8B5FF",
      accent2: "#FFF000",
      bg1: "#10031F",
      bg2: "#191600",
      bg3: "#040107",
      panel: "#24103B",
      panel2: "#211F08",
      text: "#FCF7FF",
      muted: "#C5AFD5"
    },
    {
      id: "miami-grid",
      name: "Miami Grid",
      accent: "#00FFD5",
      accentSoft: "#A8FFF0",
      accent2: "#FF2EA6",
      bg1: "#001817",
      bg2: "#1B0313",
      bg3: "#010606",
      panel: "#082A28",
      panel2: "#2A0A1D",
      text: "#F3FFFC",
      muted: "#A8CBC6"
    },
    {
      id: "toxic-gold-cobalt",
      name: "Toxic Gold / Cobalt",
      accent: "#FFE600",
      accentSoft: "#FFF6A0",
      accent2: "#2E5BFF",
      bg1: "#171400",
      bg2: "#050B1E",
      bg3: "#050400",
      panel: "#2D2908",
      panel2: "#0C1533",
      text: "#FFFEF2",
      muted: "#D0C994"
    },
    {
      id: "plasma-red-cyan",
      name: "Plasma Red / Cyan",
      accent: "#FF1744",
      accentSoft: "#FFB2C0",
      accent2: "#00E5FF",
      bg1: "#1B0209",
      bg2: "#00171A",
      bg3: "#060102",
      panel: "#32101A",
      panel2: "#08272C",
      text: "#FFF5F7",
      muted: "#D0AAB2"
    },
    {
      id: "arctic-blue-orange",
      name: "Arctic Blue / Orange",
      accent: "#00A3FF",
      accentSoft: "#B2E4FF",
      accent2: "#FF6B00",
      bg1: "#03111E",
      bg2: "#1B0901",
      bg3: "#01050A",
      panel: "#09263B",
      panel2: "#301307",
      text: "#F5FBFF",
      muted: "#ACC3D2"
    },
    {
      id: "matrix-green-magenta",
      name: "Matrix Green / Magenta",
      accent: "#00FF85",
      accentSoft: "#A8FFD2",
      accent2: "#FF00A8",
      bg1: "#00170B",
      bg2: "#18000F",
      bg3: "#000502",
      panel: "#082A17",
      panel2: "#28091B",
      text: "#F2FFF8",
      muted: "#A4C8B5"
    }
  ];

  const STORAGE_KEY = "djpcd-theme-state-v2";
  const AUTO_CHANGE_MS = 45000;
  let timer = null;
  let activeIndex = 0;

  function readState() {
    try {
      const state = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (!state || !Number.isInteger(state.index) || !Number.isFinite(state.changedAt)) return null;
      if (state.index < 0 || state.index >= THEMES.length) return null;
      return state;
    } catch {
      return null;
    }
  }

  function writeState(index) {
    const state = { index, changedAt: Date.now() };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Theme still works if storage is unavailable.
    }
    return state;
  }

  function randomIndex(exclude) {
    if (THEMES.length <= 1) return 0;
    let next = exclude;
    while (next === exclude) next = Math.floor(Math.random() * THEMES.length);
    return next;
  }

  function ensureThemeStyles() {
    if (document.getElementById("djpcd-theme-engine-styles")) return;
    const style = document.createElement("style");
    style.id = "djpcd-theme-engine-styles";
    style.textContent = `
      :root {
        --theme-accent: #00F5FF;
        --theme-accent-soft: #B8FCFF;
        --theme-accent-2: #FF5A1F;
        --theme-bg-1: #031419;
        --theme-bg-2: #140A07;
        --theme-bg-3: #010407;
        --theme-panel: #09232A;
        --theme-panel-2: #140E11;
        --theme-text: #F5FEFF;
        --theme-muted: #A9C5C9;
      }

      html {
        background: var(--theme-bg-3) !important;
      }

      body {
        color: var(--theme-text) !important;
        background:
          radial-gradient(circle at 9% -8%, color-mix(in srgb, var(--theme-accent) 34%, transparent), transparent 29rem),
          radial-gradient(circle at 91% 4%, color-mix(in srgb, var(--theme-accent-2) 30%, transparent), transparent 28rem),
          radial-gradient(circle at 48% 115%, color-mix(in srgb, var(--theme-accent) 17%, transparent), transparent 42rem),
          linear-gradient(145deg, var(--theme-bg-2) 0%, var(--theme-bg-1) 44%, var(--theme-bg-3) 100%) !important;
        transition: background 1s ease, color .7s ease;
      }

      body::before {
        opacity: .26 !important;
        background-image:
          linear-gradient(color-mix(in srgb, var(--theme-accent) 13%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--theme-accent-2) 11%, transparent) 1px, transparent 1px) !important;
        background-size: 38px 38px !important;
        filter: drop-shadow(0 0 4px color-mix(in srgb, var(--theme-accent) 20%, transparent));
      }

      body::after {
        content: "";
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        opacity: .12;
        background:
          repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 3px,
            color-mix(in srgb, var(--theme-accent) 18%, transparent) 4px
          ),
          linear-gradient(
            90deg,
            color-mix(in srgb, var(--theme-accent) 5%, transparent),
            transparent 35%,
            color-mix(in srgb, var(--theme-accent-2) 5%, transparent)
          );
        mix-blend-mode: screen;
        animation: djpcd-scan 8s linear infinite;
      }

      @keyframes djpcd-scan {
        from { transform: translateY(-4px); }
        to { transform: translateY(4px); }
      }

      :root {
        --bg: var(--theme-bg-1) !important;
        --bg-deep: var(--theme-bg-3) !important;
        --panel: var(--theme-panel) !important;
        --panel-2: var(--theme-panel-2) !important;
        --cyan: var(--theme-accent) !important;
        --cyan-soft: var(--theme-accent-soft) !important;
        --blue: var(--theme-accent-2) !important;
        --text: var(--theme-text) !important;
        --muted: var(--theme-muted) !important;
        --line: color-mix(in srgb, var(--theme-accent) 30%, transparent) !important;
      }

      .shared-status,
      header,
      footer,
      .shared-mobile-cta {
        border-color: color-mix(in srgb, var(--theme-accent) 34%, transparent) !important;
        background: color-mix(in srgb, var(--theme-bg-3) 87%, transparent) !important;
        transition: background .8s ease, border-color .8s ease, box-shadow .8s ease;
      }

      .shared-status {
        box-shadow:
          inset 0 -1px 0 color-mix(in srgb, var(--theme-accent-2) 25%, transparent),
          0 0 22px color-mix(in srgb, var(--theme-accent) 10%, transparent);
      }

      header {
        box-shadow:
          0 10px 38px rgba(0,0,0,.34),
          0 0 26px color-mix(in srgb, var(--theme-accent) 12%, transparent),
          inset 0 -1px 0 color-mix(in srgb, var(--theme-accent-2) 26%, transparent) !important;
      }

      .status-dot {
        background: var(--theme-accent) !important;
        box-shadow:
          0 0 8px var(--theme-accent),
          0 0 20px var(--theme-accent),
          0 0 34px color-mix(in srgb, var(--theme-accent-2) 72%, transparent) !important;
      }

      .brand-logo,
      .hero-logo {
        filter:
          drop-shadow(-5px 0 12px color-mix(in srgb, var(--theme-accent) 48%, transparent))
          drop-shadow(5px 0 12px color-mix(in srgb, var(--theme-accent-2) 42%, transparent))
          drop-shadow(0 18px 34px rgba(0,0,0,.38)) !important;
        transition: filter .8s ease, transform .2s ease;
      }

      h1,
      h2,
      .brand-name {
        text-shadow:
          0 0 12px color-mix(in srgb, var(--theme-accent) 14%, transparent),
          0 0 20px color-mix(in srgb, var(--theme-accent-2) 8%, transparent);
      }

      .brand-subtitle,
      .hero-eyebrow,
      .text-cyan-400,
      .text-cyan-300,
      .text-cyan-500,
      .nav-link:hover,
      .nav-link.is-active,
      .nav-link[aria-current="page"],
      .utility-link:hover,
      main a:not(.academy-link) {
        color: var(--theme-accent-soft) !important;
        text-shadow: 0 0 10px color-mix(in srgb, var(--theme-accent) 38%, transparent);
      }

      .card,
      .grid > div,
      .grid > article,
      article,
      aside > a {
        border-color: color-mix(in srgb, var(--theme-accent) 34%, transparent) !important;
        background:
          linear-gradient(145deg,
            color-mix(in srgb, var(--theme-panel) 94%, transparent),
            color-mix(in srgb, var(--theme-panel-2) 95%, transparent)) !important;
        box-shadow:
          0 18px 55px rgba(0,0,0,.4),
          -5px 0 18px color-mix(in srgb, var(--theme-accent) 8%, transparent),
          5px 0 18px color-mix(in srgb, var(--theme-accent-2) 8%, transparent),
          inset 0 1px 0 color-mix(in srgb, var(--theme-accent-soft) 11%, transparent) !important;
        transition: background .8s ease, border-color .8s ease, box-shadow .8s ease, transform .16s ease;
      }

      .card:hover,
      .grid > div:hover,
      .grid > article:hover,
      article:hover,
      aside > a:hover {
        border-color: color-mix(in srgb, var(--theme-accent) 72%, transparent) !important;
        box-shadow:
          0 22px 65px rgba(0,0,0,.46),
          -8px 0 30px color-mix(in srgb, var(--theme-accent) 20%, transparent),
          8px 0 30px color-mix(in srgb, var(--theme-accent-2) 18%, transparent),
          inset 0 0 22px color-mix(in srgb, var(--theme-accent) 5%, transparent) !important;
      }

      .hero-cta,
      .utility-link,
      .nav-link.is-active,
      .nav-link[aria-current="page"],
      input,
      textarea,
      select,
      [class*="border-cyan-"] {
        border-color: color-mix(in srgb, var(--theme-accent) 52%, transparent) !important;
      }

      .hero-cta,
      .nav-link:hover,
      .utility-link:hover,
      [class*="bg-cyan-"] {
        background:
          linear-gradient(110deg,
            color-mix(in srgb, var(--theme-accent) 13%, var(--theme-panel-2)),
            color-mix(in srgb, var(--theme-accent-2) 9%, var(--theme-panel-2))) !important;
      }

      .nav-link.is-active,
      .nav-link[aria-current="page"] {
        box-shadow:
          inset 0 0 0 1px color-mix(in srgb, var(--theme-accent) 36%, transparent),
          0 0 15px color-mix(in srgb, var(--theme-accent) 14%, transparent),
          0 0 22px color-mix(in srgb, var(--theme-accent-2) 8%, transparent) !important;
      }

      .hero-cta:hover,
      button,
      [type="submit"],
      .btn {
        background:
          linear-gradient(105deg,
            var(--theme-accent) 0%,
            color-mix(in srgb, var(--theme-accent) 55%, var(--theme-accent-2)) 48%,
            var(--theme-accent-2) 100%) !important;
        color: #020408 !important;
        border-color: color-mix(in srgb, var(--theme-accent-soft) 80%, transparent) !important;
        box-shadow:
          0 0 15px color-mix(in srgb, var(--theme-accent) 50%, transparent),
          0 0 30px color-mix(in srgb, var(--theme-accent-2) 30%, transparent),
          0 10px 32px rgba(0,0,0,.32) !important;
      }

      input,
      textarea,
      select {
        background:
          linear-gradient(120deg,
            color-mix(in srgb, var(--theme-bg-3) 88%, var(--theme-panel)),
            color-mix(in srgb, var(--theme-bg-3) 90%, var(--theme-panel-2))) !important;
        color: var(--theme-text) !important;
      }

      input:focus,
      textarea:focus,
      select:focus {
        border-color: var(--theme-accent) !important;
        box-shadow:
          0 0 0 2px color-mix(in srgb, var(--theme-accent) 28%, transparent),
          0 0 18px color-mix(in srgb, var(--theme-accent-2) 18%, transparent) !important;
      }

      blockquote {
        border-color: var(--theme-accent-2) !important;
        box-shadow: -8px 0 18px color-mix(in srgb, var(--theme-accent-2) 12%, transparent);
      }

      [class*="shadow-cyan-"] {
        --tw-shadow-color: color-mix(in srgb, var(--theme-accent) 24%, transparent) !important;
      }

      .academy-link {
        background:
          linear-gradient(110deg,
            var(--theme-accent-2),
            var(--theme-accent-soft) 48%,
            var(--theme-accent)) !important;
        color: #020408 !important;
        box-shadow:
          0 0 18px color-mix(in srgb, var(--theme-accent) 28%, transparent),
          0 0 28px color-mix(in srgb, var(--theme-accent-2) 18%, transparent) !important;
      }

      #djpcd-theme-control {
        margin-left: auto;
        border: 1px solid color-mix(in srgb, var(--theme-accent) 68%, transparent);
        border-radius: 999px;
        padding: 5px 10px;
        background:
          linear-gradient(105deg,
            color-mix(in srgb, var(--theme-accent) 14%, var(--theme-bg-3)),
            color-mix(in srgb, var(--theme-accent-2) 12%, var(--theme-bg-3))) !important;
        color: var(--theme-accent-soft) !important;
        font: 800 10px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: .075em;
        cursor: pointer;
        white-space: nowrap;
        text-shadow: 0 0 8px color-mix(in srgb, var(--theme-accent) 55%, transparent);
        box-shadow:
          0 0 13px color-mix(in srgb, var(--theme-accent) 22%, transparent),
          0 0 19px color-mix(in srgb, var(--theme-accent-2) 12%, transparent);
      }

      #djpcd-theme-control:hover {
        transform: translateY(-1px) scale(1.02);
        box-shadow:
          0 0 20px color-mix(in srgb, var(--theme-accent) 42%, transparent),
          0 0 30px color-mix(in srgb, var(--theme-accent-2) 24%, transparent);
      }

      @media (max-width: 640px) {
        #djpcd-theme-control {
          width: 100%;
          margin-left: 0;
          text-align: center;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        body,
        body::after,
        header,
        footer,
        .card,
        .grid > div,
        .grid > article,
        article,
        .brand-logo,
        .hero-logo {
          transition-duration: .01ms !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyTheme(index, persist = true) {
    const theme = THEMES[index];
    if (!theme) return;

    activeIndex = index;
    const root = document.documentElement;
    root.dataset.theme = theme.id;
    root.style.setProperty("--theme-accent", theme.accent);
    root.style.setProperty("--theme-accent-soft", theme.accentSoft);
    root.style.setProperty("--theme-accent-2", theme.accent2);
    root.style.setProperty("--theme-bg-1", theme.bg1);
    root.style.setProperty("--theme-bg-2", theme.bg2);
    root.style.setProperty("--theme-bg-3", theme.bg3);
    root.style.setProperty("--theme-panel", theme.panel);
    root.style.setProperty("--theme-panel-2", theme.panel2);
    root.style.setProperty("--theme-text", theme.text);
    root.style.setProperty("--theme-muted", theme.muted);

    const control = document.getElementById("djpcd-theme-control");
    if (control) {
      control.textContent = `THEME: ${theme.name.toUpperCase()} ↻`;
      control.setAttribute("aria-label", `Current color theme ${theme.name}. Click for another theme.`);
      control.title = "Click for another random cyber theme";
    }

    document.dispatchEvent(new CustomEvent("djpcd:themechange", { detail: { ...theme, index } }));
    if (persist) writeState(index);
  }

  function scheduleNext(delay = AUTO_CHANGE_MS) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const next = randomIndex(activeIndex);
      applyTheme(next, true);
      scheduleNext(AUTO_CHANGE_MS);
    }, Math.max(1000, delay));
  }

  function chooseAnotherTheme() {
    applyTheme(randomIndex(activeIndex), true);
    scheduleNext(AUTO_CHANGE_MS);
  }

  function installThemeControl() {
    if (document.getElementById("djpcd-theme-control")) return true;
    const shell = document.querySelector(".shared-status .shared-shell");
    if (!shell) return false;

    const button = document.createElement("button");
    button.type = "button";
    button.id = "djpcd-theme-control";
    button.addEventListener("click", chooseAnotherTheme);
    shell.appendChild(button);
    applyTheme(activeIndex, false);
    return true;
  }

  function watchForThemeControlHost() {
    if (installThemeControl()) return;
    const observer = new MutationObserver(() => {
      if (installThemeControl()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  ensureThemeStyles();

  const saved = readState();
  if (saved) {
    const elapsed = Date.now() - saved.changedAt;
    if (elapsed >= AUTO_CHANGE_MS) {
      activeIndex = randomIndex(saved.index);
      writeState(activeIndex);
      applyTheme(activeIndex, false);
      scheduleNext(AUTO_CHANGE_MS);
    } else {
      activeIndex = saved.index;
      applyTheme(activeIndex, false);
      scheduleNext(AUTO_CHANGE_MS - elapsed);
    }
  } else {
    activeIndex = randomIndex(-1);
    writeState(activeIndex);
    applyTheme(activeIndex, false);
    scheduleNext(AUTO_CHANGE_MS);
  }

  watchForThemeControlHost();

  window.DJThemeEngine = {
    themes: THEMES.map(({ id, name }) => ({ id, name })),
    next: chooseAnotherTheme,
    set(index) {
      if (!Number.isInteger(index) || index < 0 || index >= THEMES.length) return false;
      applyTheme(index, true);
      scheduleNext(AUTO_CHANGE_MS);
      return true;
    },
    current() {
      return { ...THEMES[activeIndex], index: activeIndex };
    }
  };
})();