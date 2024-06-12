import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <React.Fragment>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="./course.html">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Course Details
          </h5>
          <div>
            <label
              for="coursename"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>

            <input type="text" name="course" id="course" value="" required />
          </div>
          <div>
            <label
              for="coursename"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Number
            </label>
            <input type="text" name="course" id="course" value="" required />
          </div>

          <div>
            <label
              for="coursename"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
