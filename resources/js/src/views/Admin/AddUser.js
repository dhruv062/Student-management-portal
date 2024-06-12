import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown } from "flowbite-react";

export default () => {
  return (
    <React.Fragment>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="users.html">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            User Details
          </h5>
          <div>
            <label
              for="Firstname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>

            <input type="text" name="First" id="Frist" value="" required />
          </div>
          <div>
            <label
              for="Modulename"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>

            <input type="text" name="course" id="course" value="" required />
          </div>
          <div>
            <label
              for="Modulename"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input type="text" name="course" id="course" value="" required />
          </div>
          <div>
            <label
              for="Role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              id="Roles"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a Role</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="PC">Coordinator</option>
              <option value="QAO">QAO</option>
              <option value="Admi">Administrator</option>
            </select>
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
