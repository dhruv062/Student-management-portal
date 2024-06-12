import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Link } from "react-router-dom";
import { Modal, Button, Dropdown } from "flowbite-react";
import Error from "../../components/Error";

export default () => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [modifyissue, setModifyIssue] = useState({
    Assigned_for: "",
    Subject: "",
    Description: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendData(modifyissue);

    setLoading(false);
  }
  function sendData(modifyissue) {
    axiosInstance
      .post("/api/issues/add_issue_by_user ", modifyissue)
      .then((response) => {
        // console.log(response);
        setOpenModal(undefined);
        setModifyIssue({});
        setError("");
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
        setModifyIssue({});
      });
  }
  useEffect(() => {
    axiosInstance
      .post("/api/issues/get_issues_by_user ")
      .then((response) => {
        // console.log(response);
        setIssues(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, [openModal]);
  return (
    <React.Fragment>
      <IssueModal
        props={props}
        modifyissue={modifyissue}
        setModifyIssue={setModifyIssue}
        error={error}
        handleSubmit={handleSubmit}
      />
      <Button
        className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setOpenModal("default");
        }}
      >
        Add Issue
      </Button>
      <h6 className="my-10"> Issue Status</h6>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {issues.map((issue) => {
          return <Issue key={issue.Id} issue={issue} />;
        })}
      </ul>
    </React.Fragment>
  );
};

function Issue({ issue }) {
  return (
    <li className="pb-3 sm:pb-4">
      <Link to={issue.Id + "/"}>
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Sub: {issue.subject}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              sent to:{" "}
              {issue.Assigned_for === "admin" ? "Administrator" : "Coordinator"}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {issue.Status === "Open" ? "pending" : "resolved"}
          </div>
        </div>
      </Link>
    </li>
  );
}

function IssueModal({
  props,
  modifyissue,
  setModifyIssue,
  error,
  handleSubmit,
}) {
  return (
    <Modal
      show={props.openModal === "default"}
      onClose={() => {
        {
          setModifyIssue({});
          props.setOpenModal(undefined);
        }
      }}
    >
      <Modal.Header>Add Issue</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label for="Subject">Subject</label>
            <input
              type="name"
              onChange={(e) => {
                setModifyIssue({ ...modifyissue, Subject: e.target.value });
              }}
              value={modifyissue.FirstName}
              required
            />
          </div>
          <div className="mb-6">
            <label for="Description">Description</label>
            <input
              type="name"
              onChange={(e) => {
                setModifyIssue({ ...modifyissue, Description: e.target.value });
              }}
              value={modifyissue.LastName}
              required
            />
          </div>

          <div>
            <label
              for="Role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              onChange={(e) => {
                setModifyIssue({
                  ...modifyissue,
                  Assigned_for: e.target.value,
                });
              }}
              value={modifyissue.Role}
              id="Roles"
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Choose a Role</option>
              <option value="pc">Coordinator</option>
              <option value="admin">Administrator</option>
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
                setModifyIssue({});
                props.setOpenModal(undefined);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
