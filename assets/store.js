(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const links = Array.from(document.querySelectorAll(".gear-types a"));
  const controls = document.querySelector(".gear-controls");
  let current = 0;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    links.forEach(link => {
      if (link.hash === "#" + slides[current].id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    document.getElementById("position").textContent = (current + 1) + " of " + slides.length;
  }

  function followHash() {
    const index = slides.findIndex(slide => "#" + slide.id === location.hash);
    if (index >= 0) show(index);
    else if (!location.hash) show(0);
  }

  function step(offset) {
    show(current + offset);
    history.replaceState(null, "", "#" + slides[current].id);
  }

  show(0);
  followHash();
  controls.hidden = false;
  window.addEventListener("hashchange", followHash);
  document.getElementById("prev").addEventListener("click", () => step(-1));
  document.getElementById("next").addEventListener("click", () => step(1));
})();
