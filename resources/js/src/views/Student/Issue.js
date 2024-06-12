import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";

export default () => {
  const { issueId } = useParams();
  const [error, setError] = useState("");
  const [issue, setIssue] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("/api/issues/get_issue_by_id ", { issue_id: issueId })
      .then((response) => {
        // console.log(response.data)
        setIssue(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Inquiry
      </h5>

      <div className="relative overflow-x-auto">
        <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sub: {issue.subject}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {issue.Description}
          </p>
        </div>
      </div>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Reply
      </h5>
      <div className="relative overflow-x-auto">
        <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {issue.Reply_Message}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
