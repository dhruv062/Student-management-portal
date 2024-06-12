import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { Link, useParams } from "react-router-dom";
import { Modal, Button, Dropdown } from "flowbite-react";
import Error from "../../../components/Error";
import ThemedModal from "../../../components/ThemedModal";
import Loading from "../../../components/Loading";
import uploadFile from "../../../controllers/upload";
import { toast } from "react-toastify";
import {
  convertToLocalTimeZone,
  convertToTimeZone,
  convertToTimeZoneforDate,
  convertToUTC,
} from "../../../utilities/utilities";
import { DateTime } from "luxon";
export default () => {
  const [assignments, setAssignments] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [loading, setLoading] = useState(false);
  const [modifytype, setmodifyType] = useState("Add");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const { courseId } = useParams();
  const props = { openModal, setOpenModal };
  const initialAssignmentsAndExams = {
    class_id: courseId,
    assignment_name: "",
    assignment_due_date: DateTime.utc().toFormat("yyyy-MM-dd HH:mm:ss"),
    assignment_available_date: DateTime.utc().toFormat("yyyy-MM-dd HH:mm:ss"),
    assignment_published: false,
    assignment_content: "",
    assignment_total_marks: 0,
    assignment_type: "Assignment",
    attachments: "",
  };
  function handleDelete(assignment) {
    sendData(assignment, "Delete");
  }
  const [modifyassignment, setModifyAssignment] = useState(
    initialAssignmentsAndExams
  );
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    axiosInstance
      .post("/api/assignments/get_assignments_by_class ", {
        class_id: courseId,
      })
      .then((response) => {
        // console.log(response.data);
        setAssignments(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [loading, openModal]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (file) {
      // console.log("File is there");
      const result = await uploadFile(file);
      // console.log(result);
      if (result.success) {
        setLoading(true);
        sendData(
          { ...modifyassignment, attachments: result.file_location },
          modifytype
        );
        setLoading(false);
      } else {
        console.error(result.error);
        return;
      }
    } else {
      setLoading(true);
      sendData(modifyassignment, modifytype);
      setLoading(false);
    }
  }
  function sendData(modifyassignment, modifytype) {
    if (modifytype === "Add") {
      axiosInstance
        .post("/api/assignments/add_assignment ", modifyassignment)
        .then((response) => {
          // console.log(response);
          toast.success("Assignment/Exam Added Successfully");
          setOpenModal(undefined);
          setModifyAssignment({});
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.response.data.error);
        });
    } else if (modifytype === "Delete") {
      setLoading(true);

      axiosInstance
        .post("/api/assignments/delete_assignment ", modifyassignment)
        .then((response) => {
          toast.success("Assignment/Exam Deleted Successfully");
          // console.log(response);
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.response.data.error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axiosInstance
        .post("/api/assignments/update_assignment ", modifyassignment)
        .then((response) => {
          // console.log(response);
          toast.success("Assignment/Exam Updated Successfully");
          setOpenModal(undefined);
          setModifyAssignment({});
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.response.data.error);

          // setModifyAssignment({});
        });
    }
  }
  return (
    <React.Fragment>
      <AssignmentModal
        props={props}
        modifyassignment={modifyassignment}
        setModifyAssignment={setModifyAssignment}
        initialAssignmentsAndExams={initialAssignmentsAndExams}
        error={error}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        modifytype={modifytype}
      />
      <div className="flex justify-end">
        <button
          onClick={() => {
            setmodifyType("Add");
            setModifyAssignment(initialAssignmentsAndExams);
            props.setOpenModal("default");
          }}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 mt-4  rounded"
        >
          Add Assignment or Exam
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Assignments
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Publish
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Submissions
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!assignments.some(
              (assignment) => assignment.assignment_type === "assignment"
            ) && <p> No Assignments found </p>}
            {assignments.map((assignment) => {
              if (assignment.assignment_type === "assignment") {
                return (
                  <Assignment
                    key={assignment.assignment_id}
                    props={{
                      assignment,
                      setmodifyType,
                      setOpenModal,
                      handleDelete,
                      setModifyAssignment,
                    }}
                  />
                );
              }
            })}
          </tbody>
        </table>

        <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Exams
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Publish
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Submissions
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {!assignments.some(
              (assignment) => assignment.assignment_type === "exam"
            ) && <p> No Exams found </p>}
            {assignments.map((assignment) => {
              if (assignment.assignment_type === "exam") {
                return (
                  <Assignment
                    key={assignment.assignment_id}
                    props={{
                      assignment,
                      setmodifyType,
                      setOpenModal,
                      setModifyAssignment,
                      handleDelete,
                    }}
                  />
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Assignment({ props }) {
  const {
    assignment,
    setModifyAssignment,
    setmodifyType,
    setOpenModal,
    handleDelete,
  } = props;
  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        {assignment.assignment_name}

        <div className="flex">
          <span className="text-xs font-normal text-gray-600 ">
            Available until{" "}
            {convertToLocalTimeZone(assignment.assignment_available_date)}
          </span>
          <span className=" ml-4 text-xs font-normal text-gray-600 ">
            Due until {convertToLocalTimeZone(assignment.assignment_due_date)}
          </span>
          <span className=" ml-4 text-xs font-normal text-gray-600 ">
            -/{assignment.assignment_total_marks} Pts
          </span>
        </div>
      </th>
      <td
        scope="row"
        className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Publish published={assignment.assignment_published} />
      </td>
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link to={assignment.assignment_id + "/submissions"}>
          View Submissions
        </Link>
      </th>

      <td
        scope="row"
        className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <button
          type="button"
          onClick={() => {
            setModifyAssignment(assignment);
            setmodifyType("Edit");
            setOpenModal("default");
          }}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Update
        </button>

        <button
          type="button"
          onClick={() => handleDelete(assignment)}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Delete
        </button>
        <a
          className="text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          href={assignment.attachments}
          onClick={() => {
            if (!assignment.attachments) {
              alert("No Attachments found");
            }
          }}
          download
        >
          Download
        </a>
      </td>
    </tr>
  );
}

function Publish({ published }) {
  return (
    <React.Fragment>
      {published ? (
        <span className="bg-blue-100 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          Published
        </span>
      ) : (
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Not Published
        </span>
      )}
    </React.Fragment>
  );
}

function AssignmentModal({
  props,
  modifyassignment,
  setModifyAssignment,
  error,
  handleSubmit,
  initialAssignmentsAndExams,
  handleFileChange,
  modifytype,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        {
          setModifyAssignment({});
          props.setOpenModal(undefined);
        }
      }}
    >
      <Modal.Header>{modifytype} Assignment</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label for="assignment_name">Title</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyAssignment({
                  ...modifyassignment,
                  assignment_name: e.target.value,
                });
              }}
              value={modifyassignment.assignment_name}
              required
            />
          </div>
          <div className="mb-6">
            <label for="assignment_type">Type</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => {
                setModifyAssignment({
                  ...modifyassignment,
                  assignment_type: e.target.value,
                });
              }}
              value={modifyassignment.assignment_type}
              required
            >
              <option value="Assignment">Assignment</option>
              <option value="Exam">Exam</option>
            </select>
          </div>
          <div className="mb-6">
            <label for="assignment_content">Content</label>
            <textarea
              type="text"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setModifyAssignment({
                  ...modifyassignment,
                  assignment_content: e.target.value,
                });
              }}
              value={modifyassignment.assignment_content}
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label for="assignment_due_date">Due Date</label>
            <input
              type="datetime-local"
              onChange={(e) => {
                setModifyAssignment({
                  ...modifyassignment,
                  assignment_due_date: convertToUTC(
                    e.target.value,
                    "America/Chicago"
                  ),
                });
              }}
              value={convertToTimeZone(
                modifyassignment.assignment_due_date,
                "America/Chicago"
              )}
              required
            />
          </div>
          <div className="mb-6">
            <label for="assignment_available_date">Available Date</label>
            <input
              type="datetime-local"
              onChange={(e) => {
                setModifyAssignment({
                  ...modifyassignment,
                  assignment_available_date: convertToUTC(
                    e.target.value,
                    "America/Chicago"
                  ),
                });
              }}
              value={convertToTimeZone(
                modifyassignment.assignment_available_date,
                "America/Chicago"
              )}
              required
            />
          </div>
          <div className="mb-6">
            <label for="assignment_total_marks">Total Marks</label>
            <input
              type="number"
              min={0}
              onChange={(e) => {
                setModifyAssignment({
                  ...modifyassignment,
                  assignment_total_marks: parseInt(e.target.value),
                });
              }}
              value={modifyassignment.assignment_total_marks}
              required
            />
          </div>
          <div className="mb-6">
            <div className="flex">
              <label>
                Publish
                <input
                  type="checkbox"
                  name="publish"
                  checked={modifyassignment.assignment_published}
                  onChange={(e) => {
                    setModifyAssignment({
                      ...modifyassignment,
                      assignment_published:
                        !modifyassignment.assignment_published,
                    });
                  }}
                />{" "}
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label for="Attachment">Attachments</label>
            <input
              type="file"
              accept=".pdf, .zip"
              onChange={handleFileChange}
            />
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
                setModifyAssignment(initialAssignmentsAndExams);
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
