import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <h6 className="mt-6">Overall Stats</h6>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {" "}
              Classes Conducted
            </h5>
            <canvas id="courses"></canvas>
          </div>
        </div>

        <div>
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total No of Users
            </h5>
            <canvas id="noofusers"></canvas>
          </div>
        </div>
        <div>
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total Assignments / Exams conducted
            </h5>
            <canvas id="assignments"></canvas>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
