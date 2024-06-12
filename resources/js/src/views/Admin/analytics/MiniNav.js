import React from "react";
import { NavLink } from "react-router-dom";
export default () => {
  return (
    <React.Fragment>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
          <NavLink to="./" className="tab ">
            Dashboard
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="students" className="tab">
            Student
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="instructors" className="tab">
            Instructor
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="coordinators" className="tab">
            PC
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink to="qaos" className="tab">
            QAO
          </NavLink>
        </li>
      </ul>
    </React.Fragment>
  );
};
