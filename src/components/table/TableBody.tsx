import { ColumnDefinitionType, TableOptions } from "./Table.dto";

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  options: TableOptions;
  columns: Array<ColumnDefinitionType<T, K>>;
};

function TableBody<T, K extends keyof T>(props: TableRowsProps<T, K>) {
  const href = (item: any): string =>
    props.options.editHref?.replace(/\{(.*?)\}/g, (match, key) => item[key]) || "";

  return (
    <tbody>
      {props.data.map((item) => (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          {props.options.editHref && (
            <td className="p-4 w-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="sr-only">checkbox</label>
              </div>
            </td>
          )}
          {props.columns.map((column, index) => (
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {`${item[column.key]}`}
            </th>
          ))}
          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
            <a className="text-blue-600 dark:text-blue-500 hover:underline mx-2" href={href(item)}>
              Edit
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
