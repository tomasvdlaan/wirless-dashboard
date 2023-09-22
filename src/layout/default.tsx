import React from "react";
import { CgMenuGridO } from "react-icons/cg";
import DefaultSidebar from "./default/components/sidebar";
import DefaultNavbar from "./default/components/navbar";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="flex flex-row min-h-screen w-screen bg-blue-100 justify-items-stretch scro">
      <DefaultSidebar />
      <div className="flex flex-col w-full overflow-x-hidden">
        <DefaultNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
