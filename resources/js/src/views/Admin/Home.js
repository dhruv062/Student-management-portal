import React from "react";
import { Link } from "react-router-dom";
export default () => {
  return (
    <React.Fragment>
      <ProgramOverview />
    </React.Fragment>
  );
};

function ProgramOverview() {
  return (
    <React.Fragment>
      <div className=" py-16 bg-primary flex flex-col items-center justify-center"></div>
      <section>
        <h6 className="text-primary my-12 text-center">
          Hello Admin, Welcome to MS CS portal{" "}
        </h6>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <Link
            to="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white text-center"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Home
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Explore the welcome page and announcements.
            </p>
          </Link>

          <Link
            to="profile"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white text-center"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Manage your profile information.
            </p>
          </Link>

          <Link
            to="issues"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white text-center"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark-text-white">
              Issues
            </h5>
            <p className="font-normal text-gray-700 dark-text-gray-400">
              Report and track any issues related to the platform.
            </p>
          </Link>

          <Link
            to="chat"
            className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700 text-white text-center dark-bg-purple-200 dark-border-purple-400 dark-hover-bg-purple-300 dark-text-black"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark-text-black">
              Chat
            </h5>
            <p className="font-normal text-white dark-text-black">
              Engage in real-time chat with other users.
            </p>
          </Link>

          <Link
            to="courses"
            className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700 text-white text-center dark-bg-blue-200 dark-border-blue-400 dark-hover-bg-blue-300 dark-text-black"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark-text-black">
              Courses
            </h5>
            <p className="font-normal text-white dark-text-black">
              Access your enrolled courses and view assignments.
            </p>
          </Link>

          <Link
            to="Analytics"
            className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700 text-white text-center dark-bg-orange-200 dark-border-orange-400 dark-hover-bg-orange-300 dark-text-black"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark-text-black">
              Analytics
            </h5>
            <p className="font-normal text-white dark-text-black">
              Perform Analysis
            </p>
          </Link>
        </div>
        <div className="p-4"></div>
      </section>
    </React.Fragment>
  );
}
