import { ReactNode } from "react";

type TableLayoutProps = {
  children: ReactNode | ReactNode[];
};

const TableLayout = ({ children }: TableLayoutProps) => {
  return (
    <div className="h-full flex gap-3 flex-wrap sm:flex-nowrap justify-center overflow-auto">
      <div className="w-full xl:w-8-12 h-full flex flex-col overflow-x-hidden p-3 ">
        {children}
      </div>
    </div>
  );
};

export default TableLayout;
