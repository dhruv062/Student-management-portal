import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { convertToLocalTimeZone } from "../../../utilities/utilities";

export default () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const { courseId, studentId } = useParams();
  useEffect(() => {
    axiosInstance
      .post("/api/submissions/get_all_grades_for_id ", {
        class_id: courseId,
        user_id: studentId,
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
      {submissions.length > 0 && (
        <h6>
          {" "}
          {submissions[0].student_first_name +
            " " +
            submissions[0].student_last_name}
        </h6>
      )}
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
        {convertToLocalTimeZone(submission.assignment_due_date)}
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
