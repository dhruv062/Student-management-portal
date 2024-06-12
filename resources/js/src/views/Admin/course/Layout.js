import React from "react";
import { Outlet } from "react-router-dom";

import MiniNav from "./MiniNav";
export default () => {
  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        CSE 5335 WEB Data Management
      </h5>
      <MiniNav />
      <Outlet />
    </React.Fragment>
  );
};
