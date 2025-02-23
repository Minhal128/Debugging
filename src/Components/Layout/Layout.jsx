/** @format */

import React from "react";
import Header from "../Header/Header";
import TenantSideBar from "../SideBar/Tenant/SideBar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed top-0 left-0 bottom-0 overflow-y-auto">
        <TenantSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-background p-3 overflow-x-hidden">
        <main className="mt-1">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
