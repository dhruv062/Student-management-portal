import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Modal, Button } from "flowbite-react";
import ThemedModal from "../../components/ThemedModal";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { PermissionsContext } from "../../contexts/PermissionsContext";

export default () => {
  const [courses, setCourses] = useState([]);
  const { permissions } = React.useContext(PermissionsContext);
  const { create: allowCreate } = permissions.courses;
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState();
  const [modifyType, setModifyType] = useState("Add");
  const [loading, setLoading] = useState(false);
  const props = { openModal, setOpenModal };

  const [modifyCourse, setModifyCourse] = useState({
    Number: "",
    Name: "",
    Description: "",
    CourseObjectives: "",
    CourseContent: "",
    AdditionalInformation: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendData(modifyCourse, modifyType);
    setLoading(false);
  }

  function handleDelete(course) {
    setLoading(true);
    axiosInstance
      .post("/api/courses/delete_course ", { Id: course.Id })
      .then((response) => {
        toast.info("Course Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error("Error Deleting Course" + " " + error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function sendData(modifyCourse, modifyType) {
    if (modifyType === "Add") {
      axiosInstance
        .post("/api/courses/add_course ", modifyCourse)
        .then((response) => {
          toast.info("Course Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setOpenModal(undefined);
          setModifyCourse({});
        })
        .catch((error) => {
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setError(error.message);
        });
    } else {
      axiosInstance
        .post("/api/courses/update_course ", modifyCourse)
        .then((response) => {
          toast.info("Course Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setOpenModal(undefined);
          setModifyCourse({});
          setError("");
        })
        .catch((error) => {
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setError(error.message);
          setModifyCourse({});
        });
    }
  }

  useEffect(() => {
    axiosInstance
      .post("/api/courses/get_all_courses ")
      .then((response) => {
        // console.log(response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        setError("Some Error Occurred");
      });
  }, [openModal, loading]);

  return (
    <React.Fragment>
      <CourseModal
        props={props}
        modifyCourse={modifyCourse}
        setModifyCourse={setModifyCourse}
        error={error}
        handleSubmit={handleSubmit}
      />
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Manage Courses
      </h5>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setModifyType("Add");
            props.setOpenModal("default");
          }}
          className={`bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded${
            !allowCreate ? " cursor-not-allowed" : ""
          }`}
          disabled={!allowCreate}
        >
          Add Course
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className="mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Course Number
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Description
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => {
                return (
                  <Course
                    key={course.Id}
                    props={{
                      course,
                      setModifyCourse,
                      setOpenModal,
                      setModifyType,
                      handleDelete,
                    }}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Course({ props }) {
  const { course, setModifyCourse, setOpenModal, setModifyType, handleDelete } =
    props;
  const { permissions } = React.useContext(PermissionsContext);
  const { edit: allowEdit, delete: allowDelete } = permissions.courses;
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {course.Number}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {course.Name}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {course.Description}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white flex"
      >
        <button
          color="blue"
          className={`text-white bg-primary border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700${
            !allowEdit ? " cursor-not-allowed" : ""
          }`}
          disabled={!allowEdit}
          onClick={() => {
            setModifyCourse(course);
            setModifyType("Edit");
            setOpenModal("default");
          }}
        >
          Edit
        </button>
        <button
          color="blue"
          className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700${
            !allowDelete ? " cursor-not-allowed" : ""
          }`}
          disabled={!allowDelete}
          onClick={() => {
            handleDelete(course);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}

function CourseModal({
  props,
  modifyCourse,
  setModifyCourse,
  error,
  handleSubmit,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        setModifyCourse({});
        props.setOpenModal(undefined);
      }}
    >
      <Modal.Header>
        {modifyCourse.Id ? "Edit Course" : "Add Course"}
      </Modal.Header>

      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="Course Number">Course Number</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyCourse({ ...modifyCourse, Number: e.target.value });
              }}
              value={modifyCourse.Number}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Course Name">Course Name</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyCourse({ ...modifyCourse, Name: e.target.value });
              }}
              value={modifyCourse.Name}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyCourse({
                  ...modifyCourse,
                  Description: e.target.value,
                });
              }}
              value={modifyCourse.Description}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Course Objectives">Course Objectives</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyCourse({
                  ...modifyCourse,
                  CourseObjectives: e.target.value,
                });
              }}
              value={modifyCourse.CourseObjectives}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Course Content">Course Content</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyCourse({
                  ...modifyCourse,
                  CourseContent: e.target.value,
                });
              }}
              value={modifyCourse.CourseContent}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Additional Information">
              Additional Information
            </label>
            <input
              type="text"
              onChange={(e) => {
                setModifyCourse({
                  ...modifyCourse,
                  AdditionalInformation: e.target.value,
                });
              }}
              value={modifyCourse.AdditionalInformation}
              required
            />
          </div>
          {/* Add the rest of the course fields as needed */}
          <div className="mb-6 flex">
            <button
              type="submit"
              className="text-white mr-4 bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary dark:hover-bg-primary dark:focus:ring-blue-800"
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
