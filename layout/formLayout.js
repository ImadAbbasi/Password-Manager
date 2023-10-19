import React from "react";

const FormLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-fuchsia-300">
      <div className="mx-5 bg-slate-100 shadow-lg rounded-md w-96">
        <div className="flex flex-col justify-evenly h-full">
          <div className="text-center py-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
