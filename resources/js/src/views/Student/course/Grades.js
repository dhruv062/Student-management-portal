import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

export default () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const { courseId } = useParams();
  useEffect(() => {
    axiosInstance
      .post("/api/submissions/get_all_published_grades_for_id ", {
        class_id: courseId,
        user_id: localStorage.getItem("id"),
      })
      .then((response) => {
        // console.log(response.data);
        setSubmissions(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
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
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.length == 0 && <div>No Grades found</div>}
            {submissions.map((submission) => {
              return (
                <Submission
                  key={submission.assignment_id}
                  submission={submission}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Submission({ submission }) {
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.assignment_name}
      </th>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.assignment_due_date}
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <GradeStatus graded={submission.grade} />
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.grade ? submission.grade : "-"} /{" "}
        {submission.assignment_total_marks}
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.comments}
      </td>
    </tr>
  );
}

function GradeStatus({ graded }) {
  return (
    <React.Fragment>
      {graded ? (
        <span className="bg-blue-100 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          Graded
        </span>
      ) : (
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Not Graded
        </span>
      )}
    </React.Fragment>
  );
}
