// Build-time geometry for the project illustrations. It runs during `astro build`
// and emits plain path strings; none of it ships to the browser.
export type Pt = readonly [number, number];
export type Project = (x: number, y: number, z?: number) => Pt;
export interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

const COS = Math.cos(Math.PI / 6);
const r = (n: number) => Math.round(n * 10) / 10;

/** Isometric projection: world (0, 0, 0) lands on `origin`, `unit` px per world unit. */
export const iso =
  (origin: Pt, unit: number): Project =>
  (x, y, z = 0) => [
    origin[0] + (x - y) * COS * unit,
    origin[1] + (x + y) * 0.5 * unit - z * unit,
  ];

export const poly = (pts: Pt[]) =>
  `M${pts.map(([x, y]) => `${r(x)} ${r(y)}`).join("L")}Z`;

export const line = (a: Pt, b: Pt) =>
  `M${r(a[0])} ${r(a[1])}L${r(b[0])} ${r(b[1])}`;

/** The three visible faces of a box, plus its corners for measuring. */
export const box = (
  p: Project,
  x: number,
  y: number,
  w: number,
  d: number,
  h: number,
  z = 0,
) => ({
  top: poly([p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)]),
  left: poly([p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)]),
  right: poly([p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)]),
  corners: [
    p(x, y, z), p(x + w, y, z), p(x + w, y + d, z), p(x, y + d, z),
    p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h),
  ],
});

/** A patch on a left-facing wall (the plane y = Y). */
export const onLeft = (p: Project, Y: number, x0: number, x1: number, z0: number, z1: number) =>
  poly([p(x0, Y, z0), p(x1, Y, z0), p(x1, Y, z1), p(x0, Y, z1)]);

/** A patch on a right-facing wall (the plane x = X). */
export const onRight = (p: Project, X: number, y0: number, y1: number, z0: number, z1: number) =>
  poly([p(X, y0, z0), p(X, y1, z0), p(X, y1, z1), p(X, y0, z1)]);

/** Transform that prints text flat onto a left-facing wall, starting at `at`. */
export const leftText = ([x, y]: Pt) => `matrix(${COS.toFixed(4)} 0.5 0 1 ${r(x)} ${r(y)})`;

export const bounds = (pts: Pt[], pad = 0): Rect => ({
  x0: r(Math.min(...pts.map((q) => q[0])) - pad),
  y0: r(Math.min(...pts.map((q) => q[1])) - pad),
  x1: r(Math.max(...pts.map((q) => q[0])) + pad),
  y1: r(Math.max(...pts.map((q) => q[1])) + pad),
});

/** Corner brackets around a rectangle, the way a detector draws a region. */
export const brackets = ({ x0, y0, x1, y1 }: Rect, len = 14) =>
  `M${x0} ${y0 + len}V${y0}H${x0 + len}M${x1 - len} ${y0}H${x1}V${y0 + len}` +
  `M${x1} ${y1 - len}V${y1}H${x1 - len}M${x0 + len} ${y1}H${x0}V${y1 - len}`;

/** Approximate width of a mono label chip, for sizing its background. */
export const chipWidth = (text: string, size = 12) => Math.round(text.length * size * 0.66 + 16);
