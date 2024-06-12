import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto">
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Due
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Status
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a className="hover:underline " href="/demo.pdf">
                  Agreement
                </a>
                <div className="flex">
                  <span className="text-xs font-normal text-gray-600 ">
                    Discussions
                  </span>
                </div>
              </th>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a className="hover:underline " href="/demo.pdf">
                  Aug 29 by 11:59pm
                </a>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span className="bg-blue-100 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  Graded
                </span>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a className="hover:underline " href="/demo.pdf">
                  100 / 100
                </a>
              </td>
            </tr>

            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a className="hover:underline " href="/demo.pdf">
                  Phase 1 ( HTML and CSS)
                </a>
                <div className="flex">
                  <span className="text-xs font-normal text-gray-600 ">
                    project phase
                  </span>
                </div>
              </th>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a className="hover:underline " href="/demo.pdf">
                  Sep 26 by 11:59pm
                </a>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Pending
                </span>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a className="hover:underline " href="/demo.pdf">
                  - / 100
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
