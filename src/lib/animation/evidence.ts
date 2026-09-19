/** Count only existing source values, once. The accessible value stays final. */
export function initEvidence() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) return;
  const running = new Map<HTMLElement, number>();
  const finish = () => {
    running.forEach((id, element) => {
      cancelAnimationFrame(id);
      element.textContent = element.dataset.count!;
    });
    running.clear();
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        if (reduced.matches || document.hidden) return;
        const value = Number(element.dataset.count);
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 720);
          element.textContent = String(
            Math.round(value * (1 - Math.pow(1 - progress, 3))),
          );
          if (progress < 1) running.set(element, requestAnimationFrame(tick));
          else running.delete(element);
        };
        running.set(element, requestAnimationFrame(tick));
      });
    },
    { threshold: 1 },
  );
  document
    .querySelectorAll<HTMLElement>("[data-count]")
    .forEach((element) => observer.observe(element));
  reduced.addEventListener("change", finish);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) finish();
  });
  window.addEventListener("pagehide", (event) => {
    finish();
    if (!event.persisted) observer.disconnect();
  });
}
