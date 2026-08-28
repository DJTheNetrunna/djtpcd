(function () {
  if (window.DJHolidayTheme) return;

  const HOLIDAYS = {
    newYear: {
      name: "New Year's Day",
      icon: "✦",
      accent: "#ffd84d",
      accentSoft: "#fff3ad",
      accent2: "#a855ff",
      bg1: "#100b20",
      bg2: "#1b1231",
      bg3: "#040208",
      panel: "#2d2040",
      panel2: "#171022",
      text: "#fffcef",
      muted: "#d4c8b1"
    },
    mlk: {
      name: "Martin Luther King Jr. Day",
      icon: "✦",
      accent: "#e8b84a",
      accentSoft: "#ffe6a0",
      accent2: "#4d7cff",
      bg1: "#08101f",
      bg2: "#101a31",
      bg3: "#03060c",
      panel: "#172541",
      panel2: "#0c1425",
      text: "#fffaf0",
      muted: "#c6c0ad"
    },
    presidents: {
      name: "Presidents Day",
      icon: "★",
      accent: "#ff4d5f",
      accentSoft: "#ffadb6",
      accent2: "#4d8dff",
      bg1: "#0a1125",
      bg2: "#16162d",
      bg3: "#03050c",
      panel: "#202547",
      panel2: "#10152b",
      text: "#f8fbff",
      muted: "#b8c3d8"
    },
    valentines: {
      name: "Valentine's Day",
      icon: "♥",
      accent: "#ff3b9d",
      accentSoft: "#ffafd6",
      accent2: "#ff3955",
      bg1: "#210713",
      bg2: "#2b0a20",
      bg3: "#090206",
      panel: "#42132d",
      panel2: "#250a19",
      text: "#fff5fa",
      muted: "#d8a9c0"
    },
    easter: {
      name: "Easter",
      icon: "✿",
      accent: "#8cf2ff",
      accentSoft: "#dcfbff",
      accent2: "#d597ff",
      bg1: "#111025",
      bg2: "#10262b",
      bg3: "#05050c",
      panel: "#222a42",
      panel2: "#12172a",
      text: "#fbfbff",
      muted: "#c8c6dd"
    },
    memorial: {
      name: "Memorial Day",
      icon: "★",
      accent: "#dce8ff",
      accentSoft: "#ffffff",
      accent2: "#356dff",
      bg1: "#07101e",
      bg2: "#10192a",
      bg3: "#02050a",
      panel: "#18263b",
      panel2: "#0c1422",
      text: "#f6f9ff",
      muted: "#adb9cb"
    },
    juneteenth: {
      name: "Juneteenth",
      icon: "★",
      accent: "#ff4d55",
      accentSoft: "#ffd4d6",
      accent2: "#3f7dff",
      bg1: "#0b1022",
      bg2: "#20101a",
      bg3: "#04050a",
      panel: "#2b1a2b",
      panel2: "#14101d",
      text: "#fffafa",
      muted: "#c7b8c1"
    },
    independence: {
      name: "Independence Day",
      icon: "★",
      accent: "#ff4158",
      accentSoft: "#ffffff",
      accent2: "#3478ff",
      bg1: "#07112a",
      bg2: "#190b18",
      bg3: "#02050d",
      panel: "#182649",
      panel2: "#100d22",
      text: "#ffffff",
      muted: "#b6c2db"
    },
    labor: {
      name: "Labor Day",
      icon: "◆",
      accent: "#4fa6ff",
      accentSoft: "#c8e6ff",
      accent2: "#ff5a5f",
      bg1: "#071523",
      bg2: "#101d2c",
      bg3: "#02070c",
      panel: "#173148",
      panel2: "#0c1a29",
      text: "#f5fbff",
      muted: "#afc4d4"
    },
    octoberFederal: {
      name: "Indigenous Peoples’ Day / Columbus Day",
      icon: "◆",
      accent: "#ff9f32",
      accentSoft: "#ffd8a5",
      accent2: "#28d6bd",
      bg1: "#171006",
      bg2: "#10211d",
      bg3: "#060402",
      panel: "#302315",
      panel2: "#182018",
      text: "#fff9ef",
      muted: "#cdbca4"
    },
    halloween: {
      name: "Halloween",
      icon: "◆",
      accent: "#ff7a00",
      accentSoft: "#ffbf73",
      accent2: "#a855ff",
      bg1: "#15071c",
      bg2: "#21100b",
      bg3: "#050207",
      panel: "#33142f",
      panel2: "#1b0b1d",
      text: "#fff5e9",
      muted: "#cbb1c6"
    },
    veterans: {
      name: "Veterans Day",
      icon: "★",
      accent: "#e7c55d",
      accentSoft: "#fff0b0",
      accent2: "#416dff",
      bg1: "#071020",
      bg2: "#11192b",
      bg3: "#02050b",
      panel: "#18283e",
      panel2: "#0c1523",
      text: "#fafcff",
      muted: "#b7c0cf"
    },
    thanksgiving: {
      name: "Thanksgiving",
      icon: "◆",
      accent: "#ff9d2e",
      accentSoft: "#ffd59b",
      accent2: "#c84f28",
      bg1: "#1b0e05",
      bg2: "#281407",
      bg3: "#080401",
      panel: "#3a2110",
      panel2: "#211109",
      text: "#fff8ee",
      muted: "#d2b79f"
    },
    christmas: {
      name: "Christmas",
      icon: "✦",
      accent: "#19e67d",
      accentSoft: "#b4ffd6",
      accent2: "#ff4058",
      bg1: "#06180f",
      bg2: "#1f0a10",
      bg3: "#020704",
      panel: "#123522",
      panel2: "#190c10",
      text: "#f5fff9",
      muted: "#b1cbbd"
    }
  };

  function dateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  function nthWeekday(year, month, weekday, nth) {
    const first = new Date(year, month, 1);
    const offset = (7 + weekday - first.getDay()) % 7;
    return new Date(year, month, 1 + offset + (nth - 1) * 7);
  }

  function lastWeekday(year, month, weekday) {
    const last = new Date(year, month + 1, 0);
    const offset = (7 + last.getDay() - weekday) % 7;
    return new Date(year, month, last.getDate() - offset);
  }

  function observedFixedHoliday(year, month, day) {
    const actual = new Date(year, month, day);
    const observed = new Date(actual);
    if (actual.getDay() === 6) observed.setDate(actual.getDate() - 1);
    if (actual.getDay() === 0) observed.setDate(actual.getDate() + 1);
    return { actual, observed };
  }

  function matchesFixedOrObserved(today, month, day) {
    const candidates = [today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1];
    return candidates.some((year) => {
      const { actual, observed } = observedFixedHoliday(year, month, day);
      return sameDay(today, actual) || sameDay(today, observed);
    });
  }

  function easterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
  }

  function holidayForDate(input) {
    const today = dateOnly(input);
    const year = today.getFullYear();

    if (matchesFixedOrObserved(today, 0, 1)) return HOLIDAYS.newYear;
    if (sameDay(today, nthWeekday(year, 0, 1, 3))) return HOLIDAYS.mlk;
    if (sameDay(today, nthWeekday(year, 1, 1, 3))) return HOLIDAYS.presidents;
    if (today.getMonth() === 1 && today.getDate() === 14) return HOLIDAYS.valentines;
    if (sameDay(today, easterSunday(year))) return HOLIDAYS.easter;
    if (sameDay(today, lastWeekday(year, 4, 1))) return HOLIDAYS.memorial;
    if (matchesFixedOrObserved(today, 5, 19)) return HOLIDAYS.juneteenth;
    if (matchesFixedOrObserved(today, 6, 4)) return HOLIDAYS.independence;
    if (sameDay(today, nthWeekday(year, 8, 1, 1))) return HOLIDAYS.labor;
    if (sameDay(today, nthWeekday(year, 9, 1, 2))) return HOLIDAYS.octoberFederal;
    if (today.getMonth() === 9 && today.getDate() === 31) return HOLIDAYS.halloween;
    if (matchesFixedOrObserved(today, 10, 11)) return HOLIDAYS.veterans;
    if (sameDay(today, nthWeekday(year, 10, 4, 4))) return HOLIDAYS.thanksgiving;
    if (matchesFixedOrObserved(today, 11, 25)) return HOLIDAYS.christmas;
    return null;
  }

  function applyHoliday(theme) {
    if (!theme) return false;
    const root = document.documentElement;
    root.dataset.holidayTheme = theme.name;
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
      control.textContent = `${theme.icon} ${theme.name.toUpperCase()}`;
      control.title = `${theme.name} holiday theme is active today`;
      control.setAttribute("aria-label", `${theme.name} holiday color theme is active today`);
    }

    const statusShell = document.querySelector(".shared-status .shared-shell");
    if (statusShell && !document.getElementById("djpcd-holiday-badge")) {
      const badge = document.createElement("span");
      badge.id = "djpcd-holiday-badge";
      badge.textContent = `${theme.icon} ${theme.name}`;
      badge.style.cssText = "font-weight:800;color:var(--theme-accent-soft);border:1px solid color-mix(in srgb,var(--theme-accent) 38%,transparent);border-radius:999px;padding:2px 7px;white-space:nowrap";
      statusShell.insertBefore(badge, control || null);
    }

    return true;
  }

  function enforce() {
    const holiday = holidayForDate(new Date());
    if (!holiday) return false;
    applyHoliday(holiday);
    return true;
  }

  function watchUi() {
    enforce();
    const observer = new MutationObserver(() => enforce());
    observer.observe(document.documentElement, { childList: true, subtree: true });
    document.addEventListener("djpcd:themechange", () => queueMicrotask(enforce));
  }

  const holiday = holidayForDate(new Date());
  if (holiday) {
    applyHoliday(holiday);
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", watchUi, { once: true });
    } else {
      watchUi();
    }
  }

  window.DJHolidayTheme = {
    current: () => holidayForDate(new Date()),
    forDate: (date) => holidayForDate(new Date(date)),
    holidays: Object.values(HOLIDAYS).map(({ name, icon }) => ({ name, icon }))
  };
})();
