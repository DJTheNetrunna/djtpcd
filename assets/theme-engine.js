(function () {
  if (window.DJThemeEngine) return;

  const THEMES = [
    {
      id: "cyber-cyan",
      name: "Cyber Cyan",
      accent: "#20f4ff",
      accentSoft: "#9afaff",
      accent2: "#3478ff",
      bg1: "#04121a",
      bg2: "#071827",
      bg3: "#02060b",
      panel: "#0c2633",
      panel2: "#07151f",
      text: "#f2fdff",
      muted: "#9cc3cc"
    },
    {
      id: "neon-magenta",
      name: "Neon Magenta",
      accent: "#ff2bd6",
      accentSoft: "#ff9bea",
      accent2: "#8b5cff",
      bg1: "#1b0619",
      bg2: "#21092d",
      bg3: "#08030d",
      panel: "#32102f",
      panel2: "#19091e",
      text: "#fff5fd",
      muted: "#d7a9ca"
    },
    {
      id: "electric-lime",
      name: "Electric Lime",
      accent: "#b6ff22",
      accentSoft: "#e1ff99",
      accent2: "#22ffd3",
      bg1: "#07170b",
      bg2: "#10230d",
      bg3: "#020805",
      panel: "#17351b",
      panel2: "#0b1d10",
      text: "#f8fff1",
      muted: "#b8cda9"
    },
    {
      id: "solar-flare",
      name: "Solar Flare",
      accent: "#ff7a18",
      accentSoft: "#ffd08a",
      accent2: "#ff3158",
      bg1: "#1d0b04",
      bg2: "#2a1008",
      bg3: "#090301",
      panel: "#3a190d",
      panel2: "#211008",
      text: "#fff8ef",
      muted: "#d8b29b"
    },
    {
      id: "ultraviolet",
      name: "Ultraviolet",
      accent: "#a855ff",
      accentSoft: "#d9adff",
      accent2: "#5d7cff",
      bg1: "#10051f",
      bg2: "#170a2c",
      bg3: "#05020b",
      panel: "#25103f",
      panel2: "#130824",
      text: "#fbf5ff",
      muted: "#c5add8"
    },
    {
      id: "miami-vice",
      name: "Miami Vice",
      accent: "#00f5d4",
      accentSoft: "#8dfff0",
      accent2: "#ff4ecd",
      bg1: "#03171c",
      bg2: "#12112d",
      bg3: "#02070b",
      panel: "#0a2b33",
      panel2: "#10162a",
      text: "#f3fffd",
      muted: "#a7c8ca"
    },
    {
      id: "acid-gold",
      name: "Acid Gold",
      accent: "#ffe600",
      accentSoft: "#fff49a",
      accent2: "#ff8a00",
      bg1: "#191604",
      bg2: "#221c05",
      bg3: "#080701",
      panel: "#332b08",
      panel2: "#1b1705",
      text: "#fffdeb",
      muted: "#d4c991"
    },
    {
      id: "plasma-red",
      name: "Plasma Red",
      accent: "#ff3b57",
      accentSoft: "#ff9cab",
      accent2: "#ff6b00",
      bg1: "#1b0509",
      bg2: "#26070c",
      bg3: "#080203",
      panel: "#351017",
      panel2: "#1c080c",
      text: "#fff4f6",
      muted: "#d5a5ab"
    },
    {
      id: "arctic-blue",
      name: "Arctic Blue",
      accent: "#55b8ff",
      accentSoft: "#b7e4ff",
      accent2: "#6d5cff",
      bg1: "#061326",
      bg2: "#0a1c36",
      bg3: "#020711",
      panel: "#102b4b",
      panel2: "#09182c",
      text: "#f4faff",
      muted: "#aac1d6"
    },
    {
      id: "emerald-pulse",
      name: "Emerald Pulse",
      accent: "#13f287",
      accentSoft: "#93ffc5",
      accent2: "#00c8ff",
      bg1: "#03180f",
      bg2: "#06261a",
      bg3: "#010905",
      panel: "#0b3524",
      panel2: "#071d15",
      text: "#f1fff8",
      muted: "#a2cab4"
    }
  ];

  const STORAGE_KEY = "djpcd-theme-state-v1";
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
        --theme-accent: #20f4ff;
        --theme-accent-soft: #9afaff;
        --theme-accent-2: #3478ff;
        --theme-bg-1: #04121a;
        --theme-bg-2: #071827;
        --theme-bg-3: #02060b;
        --theme-panel: #0c2633;
        --theme-panel-2: #07151f;
        --theme-text: #f2fdff;
        --theme-muted: #9cc3cc;
      }

      html {
        background: var(--theme-bg-3) !important;
      }

      body {
        color: var(--theme-text) !important;
        background:
          radial-gradient(circle at 10% -5%, color-mix(in srgb, var(--theme-accent-2) 30%, transparent), transparent 30rem),
          radial-gradient(circle at 88% 4%, color-mix(in srgb, var(--theme-accent) 24%, transparent), transparent 28rem),
          radial-gradient(circle at 55% 115%, color-mix(in srgb, var(--theme-accent-2) 16%, transparent), transparent 38rem),
          linear-gradient(145deg, var(--theme-bg-2) 0%, var(--theme-bg-1) 46%, var(--theme-bg-3) 100%) !important;
        transition: background 1.1s ease, color .8s ease;
      }

      body::before {
        background-image:
          linear-gradient(color-mix(in srgb, var(--theme-accent) 9%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--theme-accent) 7%, transparent) 1px, transparent 1px) !important;
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
        --line: color-mix(in srgb, var(--theme-accent) 24%, transparent) !important;
      }

      .shared-status,
      header,
      footer,
      .shared-mobile-cta {
        border-color: color-mix(in srgb, var(--theme-accent) 24%, transparent) !important;
        background: color-mix(in srgb, var(--theme-bg-3) 90%, transparent) !important;
        transition: background .9s ease, border-color .9s ease, box-shadow .9s ease;
      }

      header {
        box-shadow: 0 8px 34px color-mix(in srgb, var(--theme-accent) 10%, transparent) !important;
      }

      .status-dot {
        background: var(--theme-accent) !important;
        box-shadow: 0 0 14px var(--theme-accent), 0 0 28px color-mix(in srgb, var(--theme-accent) 50%, transparent) !important;
      }

      .brand-logo,
      .hero-logo {
        filter:
          drop-shadow(0 0 14px color-mix(in srgb, var(--theme-accent) 40%, transparent))
          drop-shadow(0 18px 34px rgba(0,0,0,.35)) !important;
        transition: filter .9s ease, transform .2s ease;
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
      }

      .card,
      .grid > div,
      .grid > article,
      article,
      aside > a {
        border-color: color-mix(in srgb, var(--theme-accent) 24%, transparent) !important;
        background: linear-gradient(145deg,
          color-mix(in srgb, var(--theme-panel) 94%, transparent),
          color-mix(in srgb, var(--theme-panel-2) 96%, transparent)) !important;
        box-shadow:
          0 18px 55px rgba(0,0,0,.34),
          0 0 28px color-mix(in srgb, var(--theme-accent) 6%, transparent) !important;
        transition: background .9s ease, border-color .9s ease, box-shadow .9s ease, transform .16s ease;
      }

      .card:hover,
      .grid > div:hover,
      .grid > article:hover,
      article:hover {
        border-color: color-mix(in srgb, var(--theme-accent) 58%, transparent) !important;
        box-shadow:
          0 22px 60px rgba(0,0,0,.44),
          0 0 36px color-mix(in srgb, var(--theme-accent) 18%, transparent) !important;
      }

      .hero-cta,
      .utility-link,
      .nav-link.is-active,
      .nav-link[aria-current="page"],
      input,
      textarea,
      select,
      [class*="border-cyan-"] {
        border-color: color-mix(in srgb, var(--theme-accent) 42%, transparent) !important;
      }

      .hero-cta,
      .nav-link:hover,
      .utility-link:hover,
      [class*="bg-cyan-"] {
        background: color-mix(in srgb, var(--theme-accent) 10%, var(--theme-panel-2)) !important;
      }

      .hero-cta:hover,
      button,
      [type="submit"],
      .btn {
        background: linear-gradient(120deg, var(--theme-accent-2), var(--theme-accent)) !important;
        color: #02060a !important;
        border-color: color-mix(in srgb, var(--theme-accent-soft) 62%, transparent) !important;
        box-shadow: 0 10px 30px color-mix(in srgb, var(--theme-accent) 18%, transparent) !important;
      }

      input,
      textarea,
      select {
        background: color-mix(in srgb, var(--theme-bg-3) 82%, var(--theme-panel)) !important;
        color: var(--theme-text) !important;
      }

      input:focus,
      textarea:focus,
      select:focus {
        border-color: var(--theme-accent) !important;
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-accent) 16%, transparent) !important;
      }

      blockquote {
        border-color: color-mix(in srgb, var(--theme-accent) 58%, transparent) !important;
      }

      [class*="shadow-cyan-"] {
        --tw-shadow-color: color-mix(in srgb, var(--theme-accent) 18%, transparent) !important;
      }

      .academy-link {
        background: linear-gradient(115deg, var(--theme-accent-2), var(--theme-accent-soft) 52%, var(--theme-accent)) !important;
        color: #02060a !important;
        box-shadow: 0 8px 24px color-mix(in srgb, var(--theme-accent) 20%, transparent) !important;
      }

      #djpcd-theme-control {
        margin-left: auto;
        border: 1px solid color-mix(in srgb, var(--theme-accent) 42%, transparent);
        border-radius: 999px;
        padding: 4px 9px;
        background: color-mix(in srgb, var(--theme-accent) 9%, var(--theme-bg-3)) !important;
        color: var(--theme-accent-soft) !important;
        font: 700 10px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        letter-spacing: .07em;
        cursor: pointer;
        white-space: nowrap;
        box-shadow: 0 0 16px color-mix(in srgb, var(--theme-accent) 8%, transparent);
      }

      #djpcd-theme-control:hover {
        transform: translateY(-1px);
        box-shadow: 0 0 20px color-mix(in srgb, var(--theme-accent) 20%, transparent);
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
        header,
        footer,
        .card,
        .grid > div,
        .grid > article,
        article,
        .brand-logo,
        .hero-logo {
          transition-duration: .01ms !important;
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
      control.title = "Click for another random theme";
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
