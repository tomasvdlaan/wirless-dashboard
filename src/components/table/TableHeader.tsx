import React from "react";
import { ColumnDefinitionType, TableOptions } from "./Table.dto";

type TableHeaderProps<T, K extends keyof T> = {
  options: TableOptions;
  columns: Array<ColumnDefinitionType<T, K>>;
};

function TableHeader<T, K extends keyof T>(props: TableHeaderProps<T, K>) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {props.options.enableSelection && (
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="sr-only">checkbox</label>
            </div>
          </th>
        )}
        {props.columns.map((c) => (
          <th scope="col" className="px-6 py-3">
            {c.header}
          </th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
}

export default TableHeader;
