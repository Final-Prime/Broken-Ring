(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const panels = [...document.querySelectorAll("[data-panel]")];
  const controls = document.querySelector(".reader-controls");
  const currentLabel = document.querySelector("#panel-current");
  const totalLabel = document.querySelector("#panel-total");
  const progress = document.querySelector(".read-progress i");
  const previous = controls?.querySelector('[data-direction="previous"]');
  const next = controls?.querySelector('[data-direction="next"]');
  let currentIndex = 0;

  if (!panels.length || !controls || !currentLabel || !totalLabel || !progress || !previous || !next) return;

  totalLabel.textContent = String(panels.length);

  const update = (index) => {
    currentIndex = Math.max(0, Math.min(index, panels.length - 1));
    currentLabel.textContent = String(currentIndex + 1);
    progress.style.width = `${((currentIndex + 1) / panels.length) * 100}%`;
    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === panels.length - 1;
  };

  const go = (index) => {
    const target = panels[Math.max(0, Math.min(index, panels.length - 1))];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    target?.focus({ preventScroll: true });
  };

  previous.addEventListener("click", () => go(currentIndex - 1));
  next.addEventListener("click", () => go(currentIndex + 1));

  if ("IntersectionObserver" in window) {
    const ratios = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
      const visible = panels
        .map((panel, index) => ({ index, ratio: ratios.get(panel) || 0 }))
        .sort((a, b) => b.ratio - a.ratio)[0];
      if (visible && visible.ratio > 0) update(visible.index);
    }, { rootMargin: "-15% 0px -45%", threshold: [0, .1, .25, .5, .75] });
    panels.forEach((panel) => observer.observe(panel));
  }

  update(0);
})();
