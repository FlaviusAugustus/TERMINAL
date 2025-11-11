const colors = [
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "emerald",
  "green",
  "lime",
  "red",
  "yellow",
  "amber",
  "orange",
  "gray",
] as const;

export type Color = (typeof colors)[number];

export function getChipStatusColors(isActive: boolean): Color {
  return isActive ? "green" : "red";
}

export function getChipValue(isActive: boolean): string {
  return isActive ? "Active" : "Not Active";
}

function tailwindColorFrom(seed: string): Color {
  const hash = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[hash % colors.length];
}

export { tailwindColorFrom, colors };
