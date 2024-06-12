import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import { ThemeContext } from "../../contexts/ThemeContext";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import { toast } from "react-toastify";
const EnrollClass = () => {
  const [classes, setClasses] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { permissions } = React.useContext(PermissionsContext);
  const { drop: allowDrop, enroll: allowEnroll } = permissions.enrollments;

  useEffect(() => {
    // Fetch available classes from your backend API
    axiosInstance.post("/api/classes/get_all_classes ").then((response) => {
      // console.log(response);
      setClasses(response.data);
    });
    axiosInstance
      .post("/api/enrollments/get_enrollments_by_student ")
      .then((response) => {
        // console.log(response);
        setEnrolledClasses(response.data);
      });
  }, [loading]);

  const enrollInClass = (classId) => {
    // Send a POST request to enroll in a class
    setLoading(true);
    axiosInstance
      .post("/api/enrollments/enroll ", {
        class_id: classId,
        user_id: localStorage.getItem("id"),
      })
      .then((response) => {
        // Refresh the enrolled classes list
        // console.log(response);
        toast.success("Enrolled in class successfully");
      })
      .catch((error) => {
        toast.error("Error enrolling in class");
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const dropClass = (classId) => {
    setLoading(true);
    axiosInstance
      .post("/api/enrollments/drop ", {
        class_id: classId,
        user_id: localStorage.getItem("id"),
      })
      .then((response) => {
        // Refresh the enrolled classes list
        toast.success("Dropped class successfully");
        // console.log(response);
      })
      .catch((error) => {
        toast.error("Error dropping class");
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h6>Classes Available</h6>
      <div className="relative overflow-x-auto">
        <table className="mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3 bg-primary text-white">Course</th>
              <th className="px-6 py-3 bg-primary text-white">Section</th>
              <th className="px-6 py-3 bg-primary text-white">Taught By</th>
              <th className="px-6 py-3 bg-primary text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr
                key={classItem.class_id}
                className="bg-white border-b cursor-pointer hover:bg-slate-100"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {classItem.course_description}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {`Class ${classItem.class_number} - ${classItem.course_number}`}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {classItem.instructor_first_name +
                    " " +
                    classItem.instructor_last_name}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {enrolledClasses.some(
                    (enrolledClass) =>
                      enrolledClass.class_id === classItem.class_id
                  ) ? (
                    <React.Fragment>
                      <button
                        className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ${
                          allowDrop ? "" : " cursor-not-allowed"
                        }`}
                        onClick={() => {
                          // console.log("clicked");
                          dropClass(classItem.class_id);
                        }}
                        disabled={!allowDrop}
                      >
                        Drop
                      </button>
                    </React.Fragment>
                  ) : (
                    <button
                      className={`bg-primary text-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ${
                        allowEnroll ? "" : " cursor-not-allowed"
                      }`}
                      onClick={() => {
                        // console.log("clicked");
                        enrollInClass(classItem.class_id);
                      }}
                      disabled={!allowEnroll}
                    >
                      Enroll
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollClass;
