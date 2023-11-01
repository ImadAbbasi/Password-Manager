import Nav from "@/components/Nav";
import SideNav from "@/components/SideNav";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="absolute z-10 top-[3.7rem] w-[100vw] bottom-0 grid grid-cols-6 md:grid-cols-5 bg-gray-100">
        <SideNav />
        <div className="col-span-5 md:col-span-4 max-h-full overflow-y-scroll mt-2 mb-2 mr-2 rounded-md w-auto p-4 bg-gray-200 shadow-md">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
