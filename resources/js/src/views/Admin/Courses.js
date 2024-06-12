import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Modal, Button, Dropdown } from "flowbite-react";
import { PermissionsContext } from "../../contexts/PermissionsContext";

import ThemedModal from "../../components/ThemedModal";
import Error from "../../components/Error";
import { toast } from "react-toastify";
export default () => {
  const { permissions } = React.useContext(PermissionsContext);
  const { create: allowCreate } = permissions.classes;
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState();
  const [modifytype, setmodifyType] = useState("Add");
  const [allcourses, setAllCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [courseInstructor, setCourseInstructor] = useState();
  const props = { openModal, setOpenModal };
  const navigate = useNavigate();
  const [modifycourse, setModifyCourse] = useState({
    course_name: "",
    course_number: "",
    course_description: "",
    syllabus: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendData(modifycourse, modifytype);

    setLoading(false);
  }
  function sendData(modifycourse, modifytype) {
    if (modifytype === "Add") {
      axiosInstance
        .post("/api/classes/add_class_by_instructor ", {
          ...modifycourse,
          instructor_id: courseInstructor,
        })
        .then((response) => {
          // console.log(response);
          toast.success("Class Added Successfully");
          setOpenModal(undefined);
          setModifyCourse({});
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Error Adding Class: " + error.response.data.error);
        });
    } else {
      axiosInstance
        .post("/api/classes/update_class_by_instructor ", {
          ...modifycourse,
          instructor_id: courseInstructor,
        })
        .then((response) => {
          // console.log(response);
          toast.success("Class Updated Successfully");
          setOpenModal(undefined);
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Error Updating Class: " + error.response.data.error);
          setModifyCourse({});
        });
    }
  }
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/api/users/get_users_by_role ", { role: "instructor" })
      .then((response) => {
        // console.log(response.data);
        setInstructors(response.data);
      })
      .catch((error) => {});
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .post("/api/courses/get_all_courses ")
      .then((response) => {
        // console.log(response.data);
        setAllCourses(response.data);
      })
      .catch((error) => {});
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/api/classes/get_all_classes ", {
        user_id: localStorage.getItem("id"),
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {});
    setLoading(false);
  }, [openModal]);
  useEffect(() => {
    // console.log(courses);
    // console.log(modifycourse);
  });
  return (
    <React.Fragment>
      <CourseModal
        props={props}
        modifycourse={modifycourse}
        setModifyCourse={setModifyCourse}
        error={error}
        handleSubmit={handleSubmit}
        allcourses={allcourses}
        setCourseInstructor={setCourseInstructor}
        courseInstructor={courseInstructor}
        instructors={instructors}
      />
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <button
              onClick={() => navigate("managecourses")}
              className="bg-primary mb-8 hover:bg-primary  text-white font-bold py-2 px-4  rounded"
            >
              Manage Courses
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                props.setOpenModal("default");
                setCourseInstructor();
                setmodifyType("Add");
                setModifyCourse({});
              }}
              className={`bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded${
                !allowCreate ? " cursor-not-allowed" : ""
              }`}
              disabled={!allowCreate}
            >
              Add New Class
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.length > 0 ? (
              courses.map((course) => {
                return (
                  <Course
                    key={course.course_id + course.Schedule}
                    props={{
                      course,
                      setModifyCourse,
                      setOpenModal,
                      setmodifyType,
                      setCourseInstructor,
                      instructors,
                    }}
                  />
                );
              })
            ) : (
              <div>No courses found</div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

function Course({ props }) {
  const {
    course,
    setModifyCourse,
    setOpenModal,
    setmodifyType,
    setCourseInstructor,
  } = props;
  const { permissions } = React.useContext(PermissionsContext);
  const { edit: allowEdit } = permissions.classes;
  return (
    <div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex mt-4 justify-end ">
          <button
            onClick={() => {
              setModifyCourse(course);
              setmodifyType("Edit");
              setCourseInstructor(course.instructor_id);
              setOpenModal("default");
            }}
            className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700${
              !allowEdit ? " cursor-not-allowed" : ""
            }`}
            disabled={!allowEdit}
          >
            Edit
          </button>
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {course.course_number}
          </h5>
          <Link to={course.course_id + "/syllabus"}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
              {course.course_name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {course.course_description}
          </p>
          <Link
            to={course.course_id + "/assignments"}
            className="inline-flex  items-center px-3 py-2 text-sm font-medium text-center text-primary underline rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
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

function CourseModal({
  props,
  modifycourse,
  setModifyCourse,
  error,
  handleSubmit,
  allcourses,
  setCourseInstructor,
  instructors,
  courseInstructor,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        {
          setModifyCourse({});
          props.setOpenModal(undefined);
        }
      }}
    >
      <Modal.Header>Add Class</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label for="start_date">Start Date</label>
            <input
              type="date"
              onChange={(e) => {
                setModifyCourse({
                  ...modifycourse,
                  START_DATE: e.target.value,
                });
              }}
              value={modifycourse.START_DATE}
            />
          </div>
          <div className="mb-6">
            <label for="end_date">End Date</label>
            <input
              type="date"
              onChange={(e) => {
                setModifyCourse({
                  ...modifycourse,
                  END_DATE: e.target.value,
                });
              }}
              value={modifycourse.END_DATE}
            />
          </div>
          <div className="mb-6">
            <label for="number">class Number</label>
            <input
              type="number"
              onChange={(e) => {
                setModifyCourse({
                  ...modifycourse,
                  class_number: e.target.value,
                });
              }}
              value={modifycourse.class_number}
              required
            />
          </div>
          <div className="mb-6">
            <label for="Schedule">Schedule</label>
            <input
              type="name"
              onChange={(e) => {
                setModifyCourse({
                  ...modifycourse,
                  Schedule: e.target.value,
                });
              }}
              value={modifycourse.Schedule}
              required
            />
          </div>
          <div className="mb-6">
            <label for="syllabus">Syllabus</label>
            <textarea
              type="text"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setModifyCourse({
                  ...modifycourse,
                  syllabus: e.target.value,
                });
              }}
              value={modifycourse.syllabus}
              required
            ></textarea>
          </div>
          <div>
            <label
              for="Role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Courses
            </label>
            <select
              onChange={(e) => {
                setModifyCourse({
                  ...modifycourse,
                  course_id: parseInt(e.target.value),
                });
              }}
              value={modifycourse.course_id}
              id="courses"
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Choose a Course</option>
              {allcourses.map((course) => {
                return (
                  <option id={course.Id} value={course.Id}>
                    {course.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              for="instructor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Instructor
            </label>
            <select
              onChange={(e) => {
                setCourseInstructor(parseInt(e.target.value));
              }}
              value={courseInstructor}
              id="courses"
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Choose an Instructor</option>
              {instructors.map((instructor) => {
                return (
                  <option id={instructor.ID} value={instructor.ID}>
                    {instructor.FirstName + " " + instructor.LastName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-6 flex">
            <button
              type="submit"
              className="text-white mr-4 bg-primary   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <Button
              color="gray"
              onClick={() => {
                setModifyCourse({});
                props.setOpenModal(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </ThemedModal>
  );
}
