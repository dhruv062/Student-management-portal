import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
export default () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosInstance
      .post("/api/issues/get_all_issues ", {
        assigned_for: "admin",
      })
      .then((response) => {
        // console.log(response.data);
        setIssues(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Issues
      </h5>

      <div className="relative overflow-x-auto">
        <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Subject
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Description
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => {
              return <Issue key={issue.Id} issue={issue} />;
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Issue({ issue }) {
  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link to={issue.Id + "/"}>{issue.subject}</Link>
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        {issue.Description}
      </th>

      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        <IssueStatus status={issue.Status} />
      </th>
    </tr>
  );
}

function IssueStatus({ status }) {
  if (status !== "closed") {
    return (
      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
        Not viewed
      </span>
    );
  } else {
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
        Replied
      </span>
    );
  }
}
