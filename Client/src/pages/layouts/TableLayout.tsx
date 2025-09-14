import { ReactNode } from "react";

type TableLayoutProps = {
  children: ReactNode | ReactNode[];
};

const TableLayout = ({ children }: TableLayoutProps) => {
  return (
    <div className="h-full flex gap-3 flex-wrap sm:flex-nowrap justify-center p-3 overflow-auto">
      <div className="sm:w-10/12 xl:w-8-12 h-full flex flex-col overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default TableLayout;
