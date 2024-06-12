import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto">
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Upcoming Assignments
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
                  Phase1 (HTML AND CSS)
                </a>
                <div className="flex">
                  <span className="text-xs font-normal text-gray-600 ">
                    Available until Oct 3 at 11:59pm
                  </span>
                  <span className=" ml-4 text-xs font-normal text-gray-600 ">
                    Due Sep 26 at 11:59pm
                  </span>
                  <span className=" ml-4 text-xs font-normal text-gray-600 ">
                    -/100 Pts
                  </span>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Past Assignments
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
                  Phase1 (HTML AND CSS)
                </a>
                <div className="flex">
                  <span className="text-xs font-normal text-gray-600 ">
                    Closed{" "}
                  </span>
                  <span className=" ml-4 text-xs font-normal text-gray-600 ">
                    Due Sep 26 at 11:59pm
                  </span>
                  <span className=" ml-4 text-xs font-normal text-gray-600 ">
                    -/100 Pts
                  </span>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
