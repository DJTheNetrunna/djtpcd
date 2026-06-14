(function () {
  const isFile = window.location.protocol === "file:";

  const BASE = (() => {
    if (isFile) return "";

    const parts = window.location.pathname.split("/").filter(Boolean);

    // GitHub Pages repo detection
    if (parts.length > 0) {
      return "/" + parts[0] + "/";
    }

    return "/";
  })();

  function to(path) {
    if (!path) return BASE;
    if (path.startsWith("http")) return path;
    if (path.startsWith("#")) return path;

    return BASE + path.replace(/^\/+/, "");
  }

  function asset(path) {
    return to(path);
  }

  window.ROUTER = { to, asset, base: BASE };
})();
