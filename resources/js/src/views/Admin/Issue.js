import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";

export default () => {
  const { issueId } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("/api/issues/get_issue_by_id ", { issue_id: issueId })
      .then((response) => {
        console.log(response.data);
        setIssue(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, [loading]);
  useEffect(() => {
    console.log(issue);
  },);
  function handleSubmit(message) {
    setLoading(true);
    axiosInstance
      .post("/api/issues/update_issue_by_id ", {
        issue_id: issueId,
        reply_message: message,
      })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
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
          {issue.Status === "Open" && (
            <IssueReply handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

function IssueReply({ handleSubmit }) {
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  return editing ? (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(reply);
        }}
      >
        <textarea
          id="message"
          rows="8"
          className="block mt-6 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your reply"
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
          }}
        ></textarea>
        <div className="flex">
          <button className="mt-4 text-white bg-primary   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
          <button
            type="submit"
            onClick={() => {
              setEditing(false);
            }}
            className="mt-4 text-white bg-primary   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-blue-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  ) : (
    <button
      onClick={() => {
        setEditing(true);
      }}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
    >
      Reply
      <svg
        className="w-3.5 h-3.5 ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  );
}
