import { ReactNode } from "react";

type DetailProps = {
  label: string;
  children: ReactNode | undefined;
};

const Detail = ({ label, children }: DetailProps) => {
  return (
    <div className="flex flex-col gap-1 items-start">
      <p className="flex items-center text-xs text-gray-500 uppercase">
        {label}
      </p>
      <p className="text-base w-full">{children}</p>
    </div>
  );
};

export default Detail;
