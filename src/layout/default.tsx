import React from "react";
import { CgMenuGridO } from "react-icons/cg";

function DefaultLayout() {
  return (
    <div className="flex flex-row dark:bg-gray-900 min-h-screen">
      <div className="w-16 bg-gray-800 flex flex-col items-center">
        <div className="text-gray-400 p-2">
          <CgMenuGridO className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
