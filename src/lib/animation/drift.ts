/**
 * Zero-gravity tiles: each one wanders on its own, nudges its neighbours,
 * parts around the cursor and can be caught or thrown. All units are shares
 * of the field's width, so the same numbers work at every size.
 */
export const ASPECT = 0.8;

interface Tile {
  node: HTMLElement;
  face: HTMLElement;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  tilt: number;
  homeX: number;
  homeY: number;
  fx: number;
  fy: number;
  px: number;
  py: number;
}

const WANDER = 0.03;
const HOME = 0.22;
const MAX_SPEED = 1.1;

export function initDrift(root: HTMLElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const tiles: Tile[] = [...root.querySelectorAll<HTMLElement>("[data-tile]")].map(
    (node, i) => {
      const [x, y, size, tilt] = node.dataset.tile!.split(",").map(Number);
      return {
        node,
        face: node.firstElementChild as HTMLElement,
        size, x, y, tilt,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        angle: tilt,
        // Each tile gets its own slow rhythm so no two drift in step.
        fx: 0.13 + ((i * 0.37) % 0.21),
        fy: 0.11 + ((i * 0.53) % 0.23),
        px: i * 2.1,
        py: i * 1.3,
      };
    },
  );
  let scale = 1;
  let time = 0;
  let last = 0;
  let frame = 0;
  let pointer: { x: number; y: number } | undefined;
  let hovered: Tile | undefined;
  let held: { tile: Tile; dx: number; dy: number; vx: number; vy: number; t: number } | undefined;

  const toField = (event: PointerEvent) => {
    const box = root.getBoundingClientRect();
    return { x: (event.clientX - box.left) / box.width, y: (event.clientY - box.top) / box.width };
  };
  // Small screens get bigger tiles so the icons stay readable.
  const resize = () => {
    scale = root.clientWidth < 440 ? 1.3 : 1;
    for (const tile of tiles) tile.node.style.width = `${tile.size * scale * 100}cqw`;
  };

  const step = (dt: number) => {
    time += dt;
    const height = ASPECT;
    for (const tile of tiles) {
      if (tile === held?.tile) continue;
      if (tile === hovered) {
        // Catch the tile under the cursor so it can be read.
        tile.vx *= 1 - Math.min(dt * 8, 1);
        tile.vy *= 1 - Math.min(dt * 8, 1);
      } else {
        // Wander freely, with a soft pull home so the field stays balanced.
        const wx = Math.cos(time * tile.fx + tile.px) * WANDER + (tile.homeX - tile.x) * HOME;
        const wy = Math.sin(time * tile.fy + tile.py) * WANDER + (tile.homeY - tile.y) * HOME;
        tile.vx += (wx - tile.vx) * Math.min(dt * 0.9, 1);
        tile.vy += (wy - tile.vy) * Math.min(dt * 0.9, 1);
        if (pointer) {
          const dx = tile.x - pointer.x;
          const dy = tile.y - pointer.y;
          const reach = 0.2;
          const dist = Math.hypot(dx, dy);
          if (dist < reach && dist > 0.001) {
            const push = (1 - dist / reach) ** 2 * 2.4 * dt;
            tile.vx += (dx / dist) * push;
            tile.vy += (dy / dist) * push;
          }
        }
      }
      const speed = Math.hypot(tile.vx, tile.vy);
      if (speed > MAX_SPEED) {
        tile.vx *= MAX_SPEED / speed;
        tile.vy *= MAX_SPEED / speed;
      }
      tile.x += tile.vx * dt;
      tile.y += tile.vy * dt;
    }
    // Neighbours bump softly instead of passing through each other.
    for (let i = 0; i < tiles.length; i++) {
      for (let j = i + 1; j < tiles.length; j++) {
        const a = tiles[i];
        const b = tiles[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const min = (a.size + b.size) * scale * 0.56;
        const dist = Math.hypot(dx, dy) || 0.0001;
        if (dist >= min) continue;
        const nx = dx / dist;
        const ny = dy / dist;
        const fixedA = a === held?.tile;
        const fixedB = b === held?.tile;
        const shareA = fixedA ? 0 : fixedB ? 1 : 0.5;
        const overlap = min - dist;
        a.x -= nx * overlap * shareA;
        a.y -= ny * overlap * shareA;
        b.x += nx * overlap * (1 - shareA);
        b.y += ny * overlap * (1 - shareA);
        const closing = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
        if (closing > 0) {
          // 1 + restitution: a soft bounce, not a pinball hit.
          const bounce = closing * 1.4;
          a.vx -= nx * bounce * shareA;
          a.vy -= ny * bounce * shareA;
          b.vx += nx * bounce * (1 - shareA);
          b.vy += ny * bounce * (1 - shareA);
        }
      }
    }
    for (const tile of tiles) {
      const r = (tile.size * scale) / 2;
      if (tile !== held?.tile) {
        if (tile.x < r) { tile.x = r; tile.vx = Math.abs(tile.vx) * 0.6; }
        if (tile.x > 1 - r) { tile.x = 1 - r; tile.vx = -Math.abs(tile.vx) * 0.6; }
        if (tile.y < r) { tile.y = r; tile.vy = Math.abs(tile.vy) * 0.6; }
        if (tile.y > height - r) { tile.y = height - r; tile.vy = -Math.abs(tile.vy) * 0.6; }
      }
      // Lean into the direction of travel; straighten up when caught.
      const still = tile === hovered || tile === held?.tile;
      const target = still ? 0 : tile.tilt + Math.max(-18, Math.min(18, tile.vx * 90));
      tile.angle += (target - tile.angle) * Math.min(dt * 5, 1);
    }
  };

  const draw = () => {
    for (const tile of tiles) {
      tile.node.style.transform = `translate(${(tile.x * 100).toFixed(3)}cqw, ${(tile.y * 100).toFixed(3)}cqw) translate(-50%, -50%)`;
      tile.face.style.rotate = `${tile.angle.toFixed(2)}deg`;
    }
  };
  const tick = (now: number) => {
    const dt = Math.min(now - (last || now), 40) / 1000;
    last = now;
    step(dt);
    draw();
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (frame || reduced.matches) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  root.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    pointer = toField(event);
    if (held) {
      const t = event.timeStamp;
      const dt = Math.max((t - held.t) / 1000, 0.008);
      const x = pointer.x + held.dx;
      const y = pointer.y + held.dy;
      held.vx = held.vx * 0.5 + ((x - held.tile.x) / dt) * 0.5;
      held.vy = held.vy * 0.5 + ((y - held.tile.y) / dt) * 0.5;
      held.tile.vx = held.vx;
      held.tile.vy = held.vy;
      held.tile.x = Math.max(0, Math.min(1, x));
      held.tile.y = Math.max(0, Math.min(ASPECT, y));
      held.t = t;
    }
  });
  root.addEventListener("pointerleave", () => (pointer = undefined));
  for (const tile of tiles) {
    tile.node.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") hovered = tile;
    });
    tile.node.addEventListener("pointerleave", () => {
      if (hovered === tile) hovered = undefined;
    });
    tile.node.addEventListener("pointerdown", (event) => {
      if (reduced.matches) return;
      const at = toField(event);
      if (event.pointerType === "touch") {
        // A tap flicks the tile away from the finger and names it.
        const dx = tile.x - at.x || 0.01;
        const dy = tile.y - at.y - 0.02;
        const dist = Math.hypot(dx, dy);
        tile.vx += (dx / dist) * 0.45;
        tile.vy += (dy / dist) * 0.45;
        tile.node.classList.add("is-named");
        setTimeout(() => tile.node.classList.remove("is-named"), 1400);
        return;
      }
      event.preventDefault();
      tile.node.setPointerCapture(event.pointerId);
      tile.node.classList.add("is-held");
      held = { tile, dx: tile.x - at.x, dy: tile.y - at.y, vx: 0, vy: 0, t: event.timeStamp };
    });
    const release = () => {
      if (held?.tile !== tile) return;
      // Let go and the tile keeps the speed it was thrown with.
      tile.vx = held.vx;
      tile.vy = held.vy;
      tile.node.classList.remove("is-held");
      held = undefined;
    };
    tile.node.addEventListener("pointerup", release);
    tile.node.addEventListener("pointercancel", release);
  }

  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(root);
  reduced.addEventListener("change", () => (reduced.matches ? stop() : start()));
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop(),
    ).observe(root);
  } else start();
}
