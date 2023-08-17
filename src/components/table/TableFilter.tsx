import React from "react";
import { FiSearch } from "react-icons/fi";

function TableFilter() {
  return (
    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-row">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
          <FiSearch />
        </div>
        <input
          type="text"
          id="table-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>


    </div>
  );
}

export default TableFilter;
