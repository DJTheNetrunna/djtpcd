(function () {
  if (window.DJSocialShare) return;

  function firstMeta(selectors) {
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      const value = el && (el.getAttribute("content") || el.getAttribute("href"));
      if (value) return value.trim();
    }
    return "";
  }

  function shareInfo() {
    const canonical = firstMeta(['link[rel="canonical"]']) || location.href.split("#")[0];
    const title = firstMeta(['meta[property="og:title"]', 'meta[name="twitter:title"]']) || document.title || "DJ The PC Dude";
    const description = firstMeta(['meta[property="og:description"]', 'meta[name="twitter:description"]', 'meta[name="description"]']) || "Seattle PC repair, practical tech support, builds, guides, and local technology coverage from DJ The PC Dude.";
    const image = firstMeta(['meta[property="og:image"]', 'meta[name="twitter:image"]']) || new URL("/assets/images/logo.png", location.origin).href;
    return { url: canonical, title, text: description, image };
  }

  function addMeta(property, value, useName) {
    const selector = useName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
    if (document.querySelector(selector)) return;
    const meta = document.createElement("meta");
    meta.setAttribute(useName ? "name" : "property", property);
    meta.content = value;
    document.head.appendChild(meta);
  }

  function ensureBrowserMetadata() {
    const info = shareInfo();
    addMeta("og:site_name", "DJ The PC Dude", false);
    addMeta("og:title", info.title, false);
    addMeta("og:description", info.text, false);
    addMeta("og:url", info.url, false);
    addMeta("og:image", info.image, false);
    addMeta("og:image:alt", `${info.title} — DJ The PC Dude`, false);
    addMeta("twitter:card", "summary_large_image", true);
    addMeta("twitter:title", info.title, true);
    addMeta("twitter:description", info.text, true);
    addMeta("twitter:image", info.image, true);
  }

  function enc(value) {
    return encodeURIComponent(value || "");
  }

  function networkLinks(info) {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(info.url)}`,
      x: `https://twitter.com/intent/tweet?text=${enc(info.title)}&url=${enc(info.url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(info.url)}`,
      bluesky: `https://bsky.app/intent/compose?text=${enc(`${info.title}\n${info.url}`)}`,
      email: `mailto:?subject=${enc(info.title)}&body=${enc(`${info.text}\n\n${info.url}`)}`
    };
  }

  function openPopup(url) {
    const popup = window.open(url, "djpcd-share", "popup=yes,width=720,height=640,resizable=yes,scrollbars=yes");
    if (popup) popup.opener = null;
  }

  async function copyLink(button) {
    const info = shareInfo();
    try {
      await navigator.clipboard.writeText(info.url);
    } catch {
      const input = document.createElement("textarea");
      input.value = info.url;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    if (button) {
      const previous = button.textContent;
      button.textContent = "COPIED";
      setTimeout(() => { button.textContent = previous; }, 1500);
    }
  }

  async function nativeShare() {
    const info = shareInfo();
    if (navigator.share) {
      try {
        await navigator.share({ title: info.title, text: info.text, url: info.url });
        return true;
      } catch (error) {
        if (error && error.name === "AbortError") return true;
      }
    }
    return false;
  }

  function installStyles() {
    if (document.getElementById("djpcd-social-share-styles")) return;
    const style = document.createElement("style");
    style.id = "djpcd-social-share-styles";
    style.textContent = `
      .dj-share-fab {
        position: fixed;
        z-index: 998;
        right: 18px;
        bottom: 18px;
        display: inline-flex;
        align-items: center;
        gap: 7px;
        border: 1px solid color-mix(in srgb, var(--theme-accent, #27d7f2) 58%, transparent) !important;
        border-radius: 999px !important;
        padding: 9px 13px !important;
        background: color-mix(in srgb, var(--theme-bg-3, #03060b) 88%, transparent) !important;
        color: var(--theme-accent-soft, #79e8ff) !important;
        box-shadow:
          0 0 18px color-mix(in srgb, var(--theme-accent, #27d7f2) 18%, transparent),
          0 10px 30px rgba(0,0,0,.35) !important;
        font: 900 11px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        letter-spacing: .08em;
      }

      .dj-share-fab:hover { transform: translateY(-2px); }

      .dj-share-panel {
        position: fixed;
        z-index: 999;
        right: 18px;
        bottom: 66px;
        width: min(330px, calc(100vw - 28px));
        padding: 13px;
        border: 1px solid color-mix(in srgb, var(--theme-accent, #27d7f2) 42%, transparent);
        border-radius: 14px;
        background:
          linear-gradient(145deg,
            color-mix(in srgb, var(--theme-panel, #202b3b) 97%, transparent),
            color-mix(in srgb, var(--theme-panel-2, #111925) 98%, transparent));
        box-shadow:
          -6px 0 24px color-mix(in srgb, var(--theme-accent, #27d7f2) 12%, transparent),
          6px 0 24px color-mix(in srgb, var(--theme-accent-2, #168cff) 12%, transparent),
          0 24px 55px rgba(0,0,0,.5);
      }

      .dj-share-panel[hidden] { display: none !important; }
      .dj-share-title { margin: 0 0 9px; color: var(--theme-text, #fff); font-size: 12px; font-weight: 900; letter-spacing: .08em; }
      .dj-share-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
      .dj-share-action {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 38px;
        border: 1px solid color-mix(in srgb, var(--theme-accent, #27d7f2) 30%, transparent) !important;
        border-radius: 8px !important;
        background: color-mix(in srgb, var(--theme-accent, #27d7f2) 7%, var(--theme-panel-2, #111925)) !important;
        color: var(--theme-accent-soft, #79e8ff) !important;
        text-decoration: none !important;
        font: 800 11px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
        cursor: pointer;
      }
      .dj-share-action:hover {
        border-color: color-mix(in srgb, var(--theme-accent-2, #168cff) 68%, transparent) !important;
        box-shadow: 0 0 16px color-mix(in srgb, var(--theme-accent-2, #168cff) 18%, transparent);
      }

      .dj-article-share {
        margin: 16px 0 28px;
        padding: 12px;
        border: 1px solid color-mix(in srgb, var(--theme-accent, #27d7f2) 32%, transparent);
        border-radius: 10px;
        background: linear-gradient(110deg,
          color-mix(in srgb, var(--theme-accent, #27d7f2) 7%, transparent),
          color-mix(in srgb, var(--theme-accent-2, #168cff) 7%, transparent));
      }
      .dj-article-share-label { margin: 0 0 8px; color: var(--theme-accent-soft, #79e8ff) !important; font-size: 11px; font-weight: 900; letter-spacing: .09em; }
      .dj-article-share-actions { display: flex; flex-wrap: wrap; gap: 7px; }
      .dj-article-share .dj-share-action { min-height: 34px; padding: 0 10px !important; }

      @media (max-width: 760px) {
        .dj-share-fab { right: 12px; bottom: 72px; }
        .dj-share-panel { right: 12px; bottom: 118px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .dj-share-fab,
        .dj-share-action { transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function actionButton(label, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dj-share-action";
    button.textContent = label;
    button.dataset.shareAction = action;
    return button;
  }

  function bindAction(el) {
    el.addEventListener("click", async (event) => {
      const action = el.dataset.shareAction;
      const info = shareInfo();
      const links = networkLinks(info);

      if (action === "native") {
        event.preventDefault();
        const shared = await nativeShare();
        if (!shared) copyLink(el);
        return;
      }
      if (action === "copy") {
        event.preventDefault();
        copyLink(el);
        return;
      }
      if (links[action]) {
        event.preventDefault();
        if (action === "email") location.href = links[action];
        else openPopup(links[action]);
      }
    });
  }

  function makeActions(includeAll) {
    const actions = [
      actionButton("SHARE", "native"),
      actionButton("COPY LINK", "copy"),
      actionButton("FACEBOOK", "facebook"),
      actionButton("X", "x"),
      actionButton("LINKEDIN", "linkedin")
    ];
    if (includeAll) {
      actions.push(actionButton("BLUESKY", "bluesky"));
      actions.push(actionButton("EMAIL", "email"));
    }
    actions.forEach(bindAction);
    return actions;
  }

  function installFloatingShare() {
    if (document.getElementById("dj-share-fab")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.id = "dj-share-fab";
    button.className = "dj-share-fab";
    button.textContent = "SHARE ↗";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "dj-share-panel");

    const panel = document.createElement("div");
    panel.id = "dj-share-panel";
    panel.className = "dj-share-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Share this page");

    const title = document.createElement("p");
    title.className = "dj-share-title";
    title.textContent = "SHARE THIS PAGE";

    const grid = document.createElement("div");
    grid.className = "dj-share-grid";
    makeActions(true).forEach((action) => grid.appendChild(action));
    panel.append(title, grid);

    function setOpen(open) {
      panel.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    }

    button.addEventListener("click", async () => {
      if (navigator.share && matchMedia("(max-width: 760px)").matches) {
        const shared = await nativeShare();
        if (shared) return;
      }
      setOpen(panel.hidden);
    });

    document.addEventListener("click", (event) => {
      if (!panel.hidden && !panel.contains(event.target) && event.target !== button) setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });

    document.body.append(panel, button);
  }

  function installArticleShare() {
    const article = document.querySelector("main article");
    if (!article || document.getElementById("dj-article-share")) return;

    const isArticle = location.pathname.includes("/assets/posts/") ||
      document.querySelector('meta[property="og:type"][content="article"]') ||
      document.querySelector('script[type="application/ld+json"]');
    if (!isArticle) return;

    const h1 = article.querySelector("h1");
    if (!h1) return;

    const box = document.createElement("div");
    box.id = "dj-article-share";
    box.className = "dj-article-share";
    box.setAttribute("aria-label", "Share this article");

    const label = document.createElement("p");
    label.className = "dj-article-share-label";
    label.textContent = "SHARE THIS ARTICLE";

    const actions = document.createElement("div");
    actions.className = "dj-article-share-actions";
    makeActions(false).forEach((action) => actions.appendChild(action));
    box.append(label, actions);

    const next = h1.nextElementSibling;
    if (next && next.tagName === "P") next.insertAdjacentElement("afterend", box);
    else h1.insertAdjacentElement("afterend", box);
  }

  function init() {
    installStyles();
    ensureBrowserMetadata();
    installFloatingShare();
    installArticleShare();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.DJSocialShare = {
    info: shareInfo,
    share: nativeShare,
    copy: () => copyLink(null)
  };
})();
