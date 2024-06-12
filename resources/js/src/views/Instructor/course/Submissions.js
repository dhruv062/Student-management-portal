import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown } from "flowbite-react";
import ThemedModal from "../../../components/ThemedModal";
import Error from "../../../components/Error";
import { convertToLocalTimeZone } from "../../../utilities/utilities";

export default () => {
  const [modules, setModules] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const { courseId, assignmentId } = useParams();
  const [openModal, setOpenModal] = useState();
  const [loading, setLoading] = useState(false);
  const props = { openModal, setOpenModal };
  const [modifygrade, setModifyGrade] = useState({
    grade: "",
    comments: "",
  });

  useEffect(() => {
    axiosInstance
      .post("/api/submissions/get_submissions_for_assignment ", {
        assignment_id: assignmentId,
      })
      .then((response) => {
        // console.log(response.data);
        setSubmissions(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, [openModal]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendData(modifygrade);

    setLoading(false);
  }

  function sendData(modifygrade) {
    axiosInstance
      .post("/api/submissions/update_grade ", modifygrade)
      .then((response) => {
        // console.log(response);
        setOpenModal(undefined);
        setModifyGrade({});
        setError("");
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
        setModifyGrade({});
      });
  }

  return (
    <React.Fragment>
      <div className="relative overflow-x-auto">
        <UpdateModal
          props={props}
          modifygrade={modifygrade}
          setModifyGrade={setModifyGrade}
          error={error}
          handleSubmit={handleSubmit}
          maxmarks={submissions[0] && submissions[0].assignment_total_marks}
        />

        <h6 className="my-4">Submissions</h6>

        <table className=" mt-4 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                submitted file
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Date
              </th>

              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Marks
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Status
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              return (
                <Submission
                  key={submission.user_id}
                  props={{ submission, setModifyGrade, setOpenModal }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Submission({ props }) {
  const { submission, setModifyGrade, setOpenModal } = props;
  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link className="hover:underline " href="#">
          {submission.first_name + " " + submission.last_name}
        </Link>
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.submission_attachments && (
          <a
            className="text-primary hover:underline"
            href={submission.submission_attachments}
            download
          >
            View File
          </a>
        )}
        {!submission.submission_attachments && (
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            Not submitted
          </span>
        )}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.submission_attachments
          ? convertToLocalTimeZone(submission.submission_date)
          : ""}
      </th>

      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {submission.grade ? submission.grade : 0}/
        {submission.assignment_total_marks}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {Graded(submission.grade)}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            setOpenModal("default");
            setModifyGrade(submission);
          }}
        >
          Update
        </button>
      </th>
    </tr>
  );
}

function UpdateModal({
  props,
  modifygrade,
  setModifyGrade,
  error,
  handleSubmit,
  maxmarks,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        {
          setModifyGrade({});
          props.setOpenModal(undefined);
        }
      }}
    >
      <Modal.Header>Modify Grade</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label for="grade">Grade</label>
            <input
              type="number"
              step="any"
              max={maxmarks}
              onChange={(e) => {
                setModifyGrade({ ...modifygrade, grade: e.target.value });
              }}
              value={modifygrade.grade}
              required
            />
          </div>
          <div className="mb-6">
            <label for="comments">Comments</label>
            <input
              type="name"
              onChange={(e) => {
                setModifyGrade({ ...modifygrade, comments: e.target.value });
              }}
              value={modifygrade.comments}
              required
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
                setModifyGrade({});
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

function Graded(grade) {
  return (
    <React.Fragment>
      {grade ? (
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
