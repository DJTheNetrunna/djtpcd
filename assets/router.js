(function () {
  const isFile = location.protocol === "file:";

  const BASE = (() => {
    if (isFile) return "";

    const pathParts = location.pathname.split("/").filter(Boolean);

    // GitHub Pages repo detection
    if (pathParts.length > 0) {
      return "/" + pathParts[0] + "/";
    }

    return "/";
  })();

  function to(path) {
    if (!path) return BASE;
    if (path.startsWith("http")) return path;
    if (path.startsWith("#")) return path;

    return BASE + path.replace(/^\/+/, "");
  }

  window.ROUTER = { to, base: BASE };
})();
