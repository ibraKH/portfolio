/** A soft light follows the cursor across each project card; sampled once per frame. */
export function initCardLight() {
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  for (const card of document.querySelectorAll<HTMLElement>(".project-visual")) {
    let frame = 0;
    let x = 0;
    let y = 0;
    card.addEventListener("pointermove", (event) => {
      if (!fine.matches || reduced.matches) return;
      const box = card.getBoundingClientRect();
      x = event.clientX - box.left;
      y = event.clientY - box.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        card.style.setProperty("--light-x", `${x}px`);
        card.style.setProperty("--light-y", `${y}px`);
      });
    });
  }
}
