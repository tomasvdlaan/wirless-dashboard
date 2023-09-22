import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { ColumnDefinitionType, TableOptions } from "./Table.dto";
import { Brand } from "../../lib/entities/brand.entity";
import { Paginated } from "../../lib/models/page.dto";
import { useEffect, useState } from "react";
import TableFilter from "./TableFilter";
import TableFooter from "./TableFooter";

const columns: ColumnDefinitionType<Brand, keyof Brand>[] = [
  { key: "name", header: "title" },
];

const tableOptions: TableOptions = {
  editHref: "/brands/edit/{id}",
};

type TableProps<T, K extends keyof T> = {
  options: TableOptions;
  columns: Array<ColumnDefinitionType<T, K>>;
  data?: Paginated<T>
};

function Table<T, K extends keyof T>(props: TableProps<T, K>) {

  return (
    <div className="m-4 sm:rounded-lg overflow-hidden">
      <TableFilter />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader columns={columns} options={tableOptions} />
        {props.data?.data && (
          <TableBody
            columns={props.columns}
            data={props.data?.data}
            options={tableOptions}
          />
        )}
        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-4">
          <td />
          <td colSpan={columns.length} className="p-2 px-6">
            showing {props.data?.data.length} of {props.data?.meta.itemCount} items
          </td>
          <td />
        </tr>
      </table>
      <TableFooter />
    </div>
  );
}

export default Table;
