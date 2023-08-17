import React from "react";

function TableFooter() {
  return (
    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-600 p-4 flex flex-row">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <span className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </span>
          </li>
          <li>
            <span className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              1
            </span>
          </li>
          <li>
            <span className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              2
            </span>
          </li>
          <li>
            <span className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              3
            </span>
          </li>
          <li>
            <span className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              4
            </span>
          </li>
          <li>
            <span className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              5
            </span>
          </li>
          <li>
            <span className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TableFooter;
