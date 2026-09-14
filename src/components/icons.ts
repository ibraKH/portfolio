// Line icons on a 16px grid. Text arrows such as ↗ render as colour emoji on
// iOS, so every arrow on the site is drawn with one of these instead.
export const icons = {
  "arrow-up-right": "M4.5 11.5L11.5 4.5M5.5 4.5H11.5V10.5",
  "arrow-down-right": "M4.5 4.5L11.5 11.5M11.5 5.5V11.5H5.5",
  "arrow-down": "M8 3V13M3.5 8.5L8 13L12.5 8.5",
  "arrow-up": "M8 13V3M3.5 7.5L8 3L12.5 7.5",
  "arrow-left": "M13 8H3M7.5 3.5L3 8L7.5 12.5",
};

export type IconName = keyof typeof icons;
