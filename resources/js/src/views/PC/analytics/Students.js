import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <React.Fragment>
      <h6 className="mt-6">Select a Student</h6>

      <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-primary text-white">
              First name
            </th>
            <th scope="col" className="px-6 py-3 bg-primary text-white">
              Last name
            </th>
            <th scope="col" className="px-6 py-3 bg-primary text-white">
              email
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              <Link to="../student">Jonathan</Link>
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              Perry
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              jonathan.perry@yahoo.com
            </th>
          </tr>
          <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              Haley
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              Alexander
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              h.alexander@aol.com
            </th>
          </tr>
          <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              Tyler
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              Ross
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
            >
              t_l_ross@aol.com
            </th>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};
