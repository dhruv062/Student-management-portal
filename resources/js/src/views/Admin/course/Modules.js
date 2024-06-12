import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto">
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Getting Started
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href="/demo.pdf">About the Instructor</a>
              </th>
            </tr>

            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href="/demo.pdf">Meet Your Instructor</a>
              </th>
            </tr>
            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href="/demo.pdf">About Course Technologies</a>
              </th>
            </tr>
            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                How to Succeed in this course
              </th>
            </tr>
          </tbody>
        </table>
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Syllabus
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href="/demo.pdf">WDM section 5</a>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
