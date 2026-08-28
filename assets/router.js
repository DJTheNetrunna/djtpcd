(function () {
  const isFile = location.protocol === "file:";
  const isGitHubPages = location.hostname.endsWith(".github.io");

  const BASE = (() => {
    if (isFile) return "";

    if (isGitHubPages) {
      const pathParts = location.pathname.split("/").filter(Boolean);
      if (pathParts.length > 0) return "/" + pathParts[0] + "/";
    }

    // Custom domain (djthepcdude.com) serves the repository at site root.
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
