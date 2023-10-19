import Nav from "@/components/Nav";
import SideNav from "@/components/SideNav";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="min-h-[89.5vh] grid grid-cols-5 bg-gray-50">
        <SideNav />
        <div className="col-span-4 mt-2 mb-2 mr-2 rounded-md w-auto p-4 bg-gray-200 shadow-md">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
