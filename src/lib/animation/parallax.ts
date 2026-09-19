/** A few pixels of depth, sampled once per input frame; never a perpetual loop. */
export function initProjectDepth() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const controller = new AbortController();
  const pending = new Map<HTMLElement, [number, number]>();
  const elements = [...document.querySelectorAll<HTMLElement>(".project-lab")];
  let frame = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    pending.clear();
    elements.forEach((element) => {
      element.style.removeProperty("--depth-x");
      element.style.removeProperty("--depth-y");
    });
  };
  for (const element of elements) {
    element.addEventListener(
      "pointermove",
      (event) => {
        if (
          reduced.matches ||
          !fine.matches ||
          document.hidden ||
          event.pointerType === "touch"
        )
          return;
        const bounds = element.getBoundingClientRect();
        pending.set(element, [
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 6,
          ((event.clientY - bounds.top) / bounds.height - 0.5) * 6,
        ]);
        if (!frame)
          frame = requestAnimationFrame(() => {
            frame = 0;
            pending.forEach(([x, y], el) => {
              el.style.setProperty("--depth-x", `${x}px`);
              el.style.setProperty("--depth-y", `${y}px`);
            });
            pending.clear();
          });
      },
      { passive: true, signal: controller.signal },
    );
    element.addEventListener("pointerleave", reset, {
      signal: controller.signal,
    });
  }
  reduced.addEventListener("change", reset, { signal: controller.signal });
  fine.addEventListener("change", reset, { signal: controller.signal });
  document.addEventListener("visibilitychange", reset, {
    signal: controller.signal,
  });
  window.addEventListener(
    "pagehide",
    (event) => {
      reset();
      if (!event.persisted) controller.abort();
    },
    { signal: controller.signal },
  );
}
