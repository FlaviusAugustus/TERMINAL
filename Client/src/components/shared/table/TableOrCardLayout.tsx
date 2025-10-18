import { Table } from "@tanstack/react-table";
import TableView from "./TableView";
import CardView from "./CardView";
import TableCard from "./TableCard";
import TableManagement from "./TableManagment";

interface TableElement {
  id: string;
}

export interface TableViewProps<T extends TableElement> {
  table: Table<T>;
  handleClickRow?: (id: string) => void;
}

/**
 * TableView Component
 *
 * A generic table view component that renders a table with sortable headers and clickable rows.
 *
 * @component
 */
const TableOrCardLayout = <T extends TableElement>(
  props: TableViewProps<T>
) => {
  return (
    <>
      <div className="hidden md:block">
        <TableCard className="!h-full">
          <TableView<T> table={props.table} />
          <TableManagement<T> table={props.table} />
        </TableCard>
      </div>
      <div className="md:hidden">
        <CardView<T> {...props} />
      </div>
    </>
  );
};

export default TableOrCardLayout;
