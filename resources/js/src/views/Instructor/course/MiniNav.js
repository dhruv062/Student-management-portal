import React from "react";
import { NavLink } from "react-router-dom";
export default () => {
  return (
    <React.Fragment>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {/* <li className="mr-2">
          <NavLink to="./" aria-current="page" className="tab">
            Dashboard
          </NavLink>
        </li> */}
        <li className="mr-2">
          <NavLink to="syllabus " className="tab">
            Syllabus
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="modules " className="tab">
            Modules
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="assignments " className="tab">
            Assignments and Exams
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="performance " className="tab">
            Performance
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="forum " className="tab">
            Forum
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};
