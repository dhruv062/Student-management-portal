import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Inquires
      </h5>

      <div className="relative overflow-x-auto">
        <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Received From
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href="inquiry.html">Unable to view course page</a>
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                Jonathan Perry
              </th>

              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Not viewed
                </span>
              </th>
            </tr>
            <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                Suggestions about course work
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                Haley Alexander
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Replied
                </span>
              </th>
            </tr>
            <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                Inquiry about enrollment
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tyler Ross
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span className="bg-blue-100 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  Viewed
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
