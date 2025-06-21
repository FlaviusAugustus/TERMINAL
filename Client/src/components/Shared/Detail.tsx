import { ReactNode } from "react";

type DetailProps = {
  label: string;
  children: ReactNode | undefined;
};

const Detail = ({ label, children }: DetailProps) => {
  const Comp = typeof children === "string" ? "p" : "div";

  return (
    <div className="flex flex-col gap-1 items-start">
      <p className="flex items-center text-xs text-gray-500 uppercase">
        {label}
      </p>
      <Comp className="text-base w-full">{children} </Comp>
    </div>
  );
};

export default Detail;
