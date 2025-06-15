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
] as const;

export type Color = (typeof colors)[number];

function tailwindColorFrom(seed: string): Color {
  const hash = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[hash % colors.length];
}

export { tailwindColorFrom, colors };
