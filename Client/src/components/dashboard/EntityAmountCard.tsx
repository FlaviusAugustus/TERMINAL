import { ReactNode, HTMLAttributes, useEffect, useRef } from "react";
import { CountUp } from "countup.js";

type EntityAmountCardProps = {
  title: string;
  amount: number;
  children: ReactNode | ReactNode[];
};

/**
 * EntityAmountCard Component
 *
 * A card component that displays a title and an animated amount.
 *
 * @returns {JSX.Element} - The rendered EntityAmountCard component.
 */
const EntityAmountCard = ({
  title,
  amount,
  children,
}: EntityAmountCardProps) => {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const countUp = new CountUp(counterRef.current, amount);
    countUp.start();
  }, [amount]);

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between border-b ">
        <div className="text-sm items-center font-medium border-gray-200 h-[40.5px] p-2 flex">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div
          className="bg-white p-8 space-y-3 text-4xl flex items-center rounded-lg"
          ref={counterRef}
        >
          {amount}
        </div>
      </div>
      <div className="flex justify-between border-t">{children}</div>
    </div>
  );
};

type EntityAmountCardButtonProps = HTMLAttributes<HTMLButtonElement> & {
  title: string;
};

/**
 * EntityAmountCardButton Component
 *
 * A button component for the EntityAmountCard that can be used for actions like view details.
 *
 * @component
 */
const EntityAmountCardButton = ({
  title,
  ...rest
}: EntityAmountCardButtonProps) => {
  return (
    <button
      {...rest}
      className="text-sm items-center justify-center font-medium border-gray-200 h-[40.5px] p-2 flex w-full border-e hover:bg-gray-100 last:border-none"
    >
      {title}
    </button>
  );
};

export { EntityAmountCard, EntityAmountCardButton };
