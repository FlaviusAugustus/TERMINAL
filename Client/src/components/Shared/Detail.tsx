import { ReactNode } from "react";

type DetailProps = {
  label: string;
  value: ReactNode | undefined;
};

const Detail = ({ label, value }: DetailProps) => {
  return (
    <div className="flex flex-col gap-1 items-start">
      <p className="flex items-center text-xs text-gray-500 uppercase">
        {label}
      </p>
      <p className="text-base">{value}</p>
    </div>
  );
};

export default Detail;
