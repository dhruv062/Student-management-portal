import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
export default () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/api/enrollments/get_enrollments_by_student ")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <Link
        className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        to={"enrollclass"}
      >
        Enroll in a Class
      </Link>
      <div className="p-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && (
          <Course
            course={{
              course_number: (
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              ),
              course_name: (
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              ),
              course_description: (
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              ),
            }}
          />
        )}
        {courses.map((course) => {
          return <Course key={course.course_id} course={course} />;
        })}
      </div>
    </React.Fragment>
  );
};

function Course({ course }) {
  // console.log(course);
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {"Class " + course.class_number + " - "}
            {course.course_number}
          </h5>
          <Link to={course.class_id + "/syllabus/"}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
              {course.course_name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {course.course_description}
          </p>
          <Link
            to={course.course_id + "/assignments"}
            className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-primary underline rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          >
            Assignments
          </Link>
          <Link
            to={course.course_id + "/modules"}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-primary underline rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          >
            Modules
          </Link>
        </div>
      </div>
    </div>
  );
}
