(function () {
  if (window.DJHolidayTheme) return;

  const HOLIDAYS = {
    newYear: {
      name: "New Year's Day",
      icon: "✦",
      accent: "#FFE600",
      accentSoft: "#FFF7A8",
      accent2: "#7A00FF",
      bg1: "#171400",
      bg2: "#10051C",
      bg3: "#040300",
      panel: "#2D2908",
      panel2: "#170B28",
      text: "#FFFDF2",
      muted: "#D1C99A"
    },
    mlk: {
      name: "Martin Luther King Jr. Day",
      icon: "✦",
      accent: "#FFD43B",
      accentSoft: "#FFF0A3",
      accent2: "#315CFF",
      bg1: "#171000",
      bg2: "#050B22",
      bg3: "#040300",
      panel: "#2C2208",
      panel2: "#0C1537",
      text: "#FFFDF4",
      muted: "#D0C6A7"
    },
    presidents: {
      name: "Presidents Day",
      icon: "★",
      accent: "#FF1744",
      accentSoft: "#FFB1BF",
      accent2: "#00B8FF",
      bg1: "#1A0208",
      bg2: "#031527",
      bg3: "#050103",
      panel: "#301019",
      panel2: "#092640",
      text: "#FFF6F8",
      muted: "#CFAAB2"
    },
    valentines: {
      name: "Valentine's Day",
      icon: "♥",
      accent: "#FF00A8",
      accentSoft: "#FFB2E2",
      accent2: "#00FFD5",
      bg1: "#1A0010",
      bg2: "#001815",
      bg3: "#050103",
      panel: "#300A21",
      panel2: "#082B26",
      text: "#FFF5FB",
      muted: "#D2ABC4"
    },
    easter: {
      name: "Easter",
      icon: "✿",
      accent: "#9B5CFF",
      accentSoft: "#DCC4FF",
      accent2: "#B7FF00",
      bg1: "#11051D",
      bg2: "#0C1600",
      bg3: "#040206",
      panel: "#25103A",
      panel2: "#182806",
      text: "#FCF8FF",
      muted: "#C7B4D6"
    },
    memorial: {
      name: "Memorial Day",
      icon: "★",
      accent: "#00A8FF",
      accentSoft: "#B7E7FF",
      accent2: "#FF2B4D",
      bg1: "#031321",
      bg2: "#1A0208",
      bg3: "#010408",
      panel: "#09263B",
      panel2: "#301018",
      text: "#F6FBFF",
      muted: "#ADC2D0"
    },
    juneteenth: {
      name: "Juneteenth",
      icon: "★",
      accent: "#FF1744",
      accentSoft: "#FFD1D8",
      accent2: "#246BFF",
      bg1: "#1B0208",
      bg2: "#031028",
      bg3: "#050102",
      panel: "#321019",
      panel2: "#0A1D40",
      text: "#FFF7F8",
      muted: "#D0ADB4"
    },
    independence: {
      name: "Independence Day",
      icon: "★",
      accent: "#FF1744",
      accentSoft: "#FFFFFF",
      accent2: "#246BFF",
      bg1: "#1A0208",
      bg2: "#03102B",
      bg3: "#030106",
      panel: "#321019",
      panel2: "#0A1E45",
      text: "#FFFFFF",
      muted: "#C3CBE0"
    },
    labor: {
      name: "Labor Day",
      icon: "◆",
      accent: "#00A8FF",
      accentSoft: "#B5E8FF",
      accent2: "#FF6A00",
      bg1: "#031523",
      bg2: "#1A0901",
      bg3: "#010508",
      panel: "#0A2940",
      panel2: "#311306",
      text: "#F5FBFF",
      muted: "#ACC4D1"
    },
    octoberFederal: {
      name: "Indigenous Peoples’ Day / Columbus Day",
      icon: "◆",
      accent: "#FF7A00",
      accentSoft: "#FFD0A0",
      accent2: "#00E5D4",
      bg1: "#1A0A01",
      bg2: "#001916",
      bg3: "#050301",
      panel: "#321606",
      panel2: "#082D29",
      text: "#FFF9F2",
      muted: "#D1B9A5"
    },
    halloween: {
      name: "Halloween",
      icon: "◆",
      accent: "#FF6A00",
      accentSoft: "#FFC28F",
      accent2: "#8A2EFF",
      bg1: "#190901",
      bg2: "#10031F",
      bg3: "#050201",
      panel: "#311306",
      panel2: "#25103B",
      text: "#FFF7EF",
      muted: "#CEB1A0"
    },
    veterans: {
      name: "Veterans Day",
      icon: "★",
      accent: "#FFE600",
      accentSoft: "#FFF6A0",
      accent2: "#315CFF",
      bg1: "#171400",
      bg2: "#050B22",
      bg3: "#040300",
      panel: "#2C2808",
      panel2: "#0C1537",
      text: "#FFFDF2",
      muted: "#CDC69B"
    },
    thanksgiving: {
      name: "Thanksgiving",
      icon: "◆",
      accent: "#FF7A00",
      accentSoft: "#FFD0A2",
      accent2: "#00D7C8",
      bg1: "#1A0A01",
      bg2: "#001713",
      bg3: "#050301",
      panel: "#321606",
      panel2: "#082A26",
      text: "#FFF8F0",
      muted: "#D0B8A5"
    },
    christmas: {
      name: "Christmas",
      icon: "✦",
      accent: "#00FF73",
      accentSoft: "#B5FFD2",
      accent2: "#FF1744",
      bg1: "#00170A",
      bg2: "#1A0208",
      bg3: "#000502",
      panel: "#082A16",
      panel2: "#301018",
      text: "#F3FFF8",
      muted: "#A9C8B5"
    }
  };

  let activeHoliday = null;
  let lastHolidayName = "";

  function dateOnly(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
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
    return [today.getFullYear() - 1, today.getFullYear(), today.getFullYear() + 1].some((year) => {
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

  function removeBadge() {
    document.getElementById("djpcd-holiday-badge")?.remove();
  }

  function installBadge(theme) {
    const statusShell = document.querySelector(".shared-status .shared-shell");
    if (!statusShell || !theme) return;

    let badge = document.getElementById("djpcd-holiday-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "djpcd-holiday-badge";
      badge.style.cssText = [
        "font-weight:900",
        "color:var(--theme-accent-soft)",
        "border:1px solid color-mix(in srgb,var(--theme-accent) 68%,transparent)",
        "border-radius:999px",
        "padding:3px 8px",
        "white-space:nowrap",
        "text-shadow:0 0 8px color-mix(in srgb,var(--theme-accent) 65%,transparent)",
        "box-shadow:0 0 12px color-mix(in srgb,var(--theme-accent) 28%,transparent),0 0 18px color-mix(in srgb,var(--theme-accent-2) 18%,transparent)"
      ].join(";");
      const control = document.getElementById("djpcd-theme-control");
      statusShell.insertBefore(badge, control || null);
    }
    badge.textContent = `${theme.icon} ${theme.name}`;
  }

  function applyHoliday(theme) {
    if (!theme) return false;

    activeHoliday = theme;
    lastHolidayName = theme.name;
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
      control.textContent = `${theme.icon} ${theme.name.toUpperCase()} • CYBER HOLIDAY`;
      control.title = `${theme.name} neon holiday theme is active today`;
      control.setAttribute("aria-label", `${theme.name} neon holiday color theme is active today`);
    }

    installBadge(theme);
    return true;
  }

  function restoreRegularTheme() {
    delete document.documentElement.dataset.holidayTheme;
    activeHoliday = null;
    lastHolidayName = "";
    removeBadge();

    if (window.DJThemeEngine?.current) {
      const current = window.DJThemeEngine.current();
      if (Number.isInteger(current.index)) window.DJThemeEngine.set(current.index);
    }
  }

  function enforce() {
    const holiday = holidayForDate(new Date());

    if (holiday) {
      applyHoliday(holiday);
      return true;
    }

    if (activeHoliday || lastHolidayName) restoreRegularTheme();
    return false;
  }

  function start() {
    enforce();

    document.addEventListener("djpcd:themechange", () => {
      const holiday = holidayForDate(new Date());
      if (holiday) queueMicrotask(() => applyHoliday(holiday));
    });

    const uiTimer = setInterval(() => {
      if (activeHoliday) installBadge(activeHoliday);
      if (activeHoliday && document.getElementById("djpcd-theme-control")) clearInterval(uiTimer);
    }, 250);

    setInterval(enforce, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

  window.DJHolidayTheme = {
    current: () => holidayForDate(new Date()),
    forDate: (date) => holidayForDate(new Date(date)),
    holidays: Object.values(HOLIDAYS).map(({ name, icon }) => ({ name, icon }))
  };
})();