import clsx from "clsx";
import { HTMLProps, useMemo } from "react";
import { Color, tailwindColorFrom } from "utils/colorUtils";

type ChipProps = HTMLProps<HTMLSpanElement> & {
  value: string;
  getColorValue?: () => Color;
};

const colorStyles: Record<Color, string> = {
  pink: "bg-pink-200 border-pink-400 text-pink-600",
  rose: "bg-rose-200 border-rose-400 text-rose-600",
  fuchsia: "bg-fuchsia-200 border-fuchsia-400 text-fuchsia-600",
  purple: "bg-purple-200 border-purple-400 text-purple-600",
  violet: "bg-violet-200 border-violet-400 text-violet-600",
  indigo: "bg-indigo-200 border-indigo-400 text-indigo-600",
  red: "bg-red-200 border-red-400 text-red-600",
  blue: "bg-blue-200 border-blue-400 text-blue-600",
  cyan: "bg-cyan-200 border-cyan-400 text-cyan-600",
  teal: "bg-teal-200 border-teal-400 text-teal-600",
  emerald: "bg-emerald-200 border-emerald-400 text-emerald-600",
  green: "bg-green-200 border-green-400 text-green-600",
  lime: "bg-lime-200 border-lime-400 text-lime-600",
  yellow: "bg-yellow-200 border-yellow-400 text-yellow-600",
  amber: "bg-amber-200 border-amber-400 text-amber-600",
  orange: "bg-orange-200 border-orange-400 text-orange-600",
  gray: "bg-gray-200 border-gray-400 text-gray-600",
};

const Chip = ({
  value,
  getColorValue,
  className,
  children,
  ...rest
}: ChipProps) => {
  const colorClasses = useMemo(() => {
    return getColorValue
      ? colorStyles[getColorValue()]
      : colorStyles[tailwindColorFrom(value)];
  }, [value]);

  return (
    <span
      {...rest}
      className={clsx(
        "flex items-center border rounded-full py-1 px-2",
        colorClasses,
        className
      )}
    >
      {value}
      {children}
    </span>
  );
};

export default Chip;
