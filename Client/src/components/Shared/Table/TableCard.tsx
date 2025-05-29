import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

type TableCardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const TableCard = ({ children, className, ...props }: TableCardProps) => {
  return (
    <div
      {...props}
      className={clsx(
        "h-[40rem] flex flex-col rounded-lg justify-between border border-gray-200 overflow-hidden bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableCard;
