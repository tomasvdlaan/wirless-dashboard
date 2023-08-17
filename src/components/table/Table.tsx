import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { ColumnDefinitionType, TableOptions, TableProps } from "./Table.dto";
import { Brand } from "../../lib/entities/brand.entity";
import { Paginated } from "../../lib/models/page.dto";
import { useEffect, useState } from "react";
import TableFilter from "./TableFilter";
import TableFooter from "./TableFooter";

const columns: ColumnDefinitionType<Brand, keyof Brand>[] = [
  { key: "name", header: "title" },
];

const tableOptions: TableOptions = {
  enableSelection: true,
};

function Table() {
  const [result, setResult] = useState<Paginated<Brand>>();

  useEffect(() => {
    fetch("http://localhost:3000/brand?page=1&itemsPerPage=10")
      .then((data) => data.json())
      .then((data) => setResult(data));
  }, []);

  return (
    <div className="m-4 sm:rounded-lg overflow-hidden">
      <TableFilter />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader columns={columns} options={tableOptions} />
        {result?.data && (
          <TableBody
            columns={columns}
            data={result?.data}
            options={tableOptions}
          />
        )}
        <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-4">
          <td />
          <td colSpan={columns.length} className="p-2 px-6">
            showing {result?.data.length} of {result?.meta.itemCount} items
          </td>
          <td />
        </tr>
      </table>
      <TableFooter />
    </div>
  );
}

export default Table;
