import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { convertToLocalTimeZone } from "../../../utilities/utilities";
export default () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");
  const { courseId } = useParams();
  useEffect(() => {
    axiosInstance
      .post("/api/assignments/get_published_assignments_by_class ", {
        class_id: courseId,
      })
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    // console.log(assignments);
  });
  return (
    <React.Fragment>
      <div className="relative overflow-x-auto">
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Assignments
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log(assignments)}
            {assignments.length == 0 && <div>No assignments found</div>}
            {assignments.map((assignment) => {
              return (
                <UpcomingAssignment
                  key={assignment.assignment_id}
                  assignment={assignment}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function UpcomingAssignment({ assignment }) {
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {assignment.assignment_type == "exam" ? (
          <Link
            to={"exam/"+assignment.assignment_id + "/"}
            className="hover:underline "
          >
            {assignment.assignment_name}
          </Link>
        ) : (
          <Link
            to={"assignment/"+assignment.assignment_id + "/"}
            className="hover:underline "
          >
            {assignment.assignment_name}
          </Link>
        )}

        <div className="flex">
          <span className="text-xs font-normal text-gray-600 ">
            Available until{" "}
            {convertToLocalTimeZone(
              assignment.assignment_available_date,
              "America/Chicago"
            )}
          </span>
          <span className=" ml-4 text-xs font-normal text-gray-600 ">
            Due until {convertToLocalTimeZone(assignment.assignment_due_date)}
          </span>
          <span className=" ml-4 text-xs font-normal text-gray-600 ">
            -/{assignment.assignment_total_marks} Pts
          </span>
        </div>
      </th>
    </tr>
  );
}
