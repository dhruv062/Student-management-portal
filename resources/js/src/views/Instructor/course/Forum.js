import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { Modal, Button, Dropdown } from "flowbite-react";
import ThemedModal from "../../../components/ThemedModal";
import Error from "../../../components/Error";
import { toast } from "react-toastify";

export default () => {
  const [forums, setForums] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState();
  const [modifyType, setModifyType] = useState("Add");
  const [loading, setLoading] = useState(false);
  const props = { openModal, setOpenModal };
  const { courseId } = useParams();
  useEffect(() => {
    // console.log(modifyForum);
  });

  const [modifyForum, setModifyForum] = useState({
    Title: "",
    Description: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendData(modifyForum, modifyType);
    setLoading(false);
  }

  function handleDelete(forum) {
    setLoading(true);
    axiosInstance
      .post("/api/forums/delete_forum ", forum)
      .then((response) => {
        // console.log(response);
        toast.info("Forum Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Error Deleting Forum: " + error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function sendData(modifyForum, modifyType) {
    if (modifyType === "Add") {
      axiosInstance
        .post("/api/forums/add_forum ", {
          ...modifyForum,
          class_id: courseId,
        })
        .then((response) => {
          // console.log(response);
          toast.info("Forum Created Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setOpenModal(undefined);
          setModifyForum({});
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Something Went Wrong: " + error.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setError(error.message);
        });
    } else {
      axiosInstance
        .post("/api/forums/update_forum ", modifyForum)
        .then((response) => {
          // console.log(response);
          toast.info("Forum Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setOpenModal(undefined);
          setModifyForum({});
          setError("");
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Something Went Wrong: " + error.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setError(error.message);
          setModifyForum({});
        });
    }
  }

  useEffect(() => {
    axiosInstance
      .post("/api/forums/get_forums_of_class ", { class_id: courseId })
      .then((response) => {
        // console.log(response.data);
        setForums(response.data);
      })
      .catch((error) => {
        setError("Some Error Occurred");
      });
  }, [openModal, loading]);

  return (
    <React.Fragment>
      <ForumModal
        props={props}
        modifyForum={modifyForum}
        setModifyForum={setModifyForum}
        error={error}
        handleSubmit={handleSubmit}
      />

      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Manage Forums
      </h5>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setModifyType("Add");
            props.setOpenModal("default");
          }}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 mt-4  rounded"
        >
          Add Forum
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Title
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
            {forums.length === 0 && <div>No forum found</div>}
            {forums.map((forum) => {
              return (
                <Forum
                  key={forum.ID}
                  props={{
                    forum,
                    setModifyForum,
                    setOpenModal,
                    setModifyType,
                    handleDelete,
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Forum({ props }) {
  const { forum, setModifyForum, setOpenModal, setModifyType, handleDelete } =
    props;
  const navigate = useNavigate();

  const handleRowClick = (ID) => {
    // console.log("clicked");
    navigate(`${ID}/`);
  };

  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {forum.Title}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {forum.Description}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white flex"
      >
        <Button
          className="bg-primary mr-4"
          onClick={() => {
            setModifyForum(forum);
            setModifyType("Edit");
            setOpenModal("default");
          }}
        >
          Edit
        </Button>
        <Button
          className="bg-primary  mr-4"
          onClick={() => {
            handleDelete(forum);
          }}
        >
          Delete
        </Button>
        <Button className="bg-primary" onClick={() => handleRowClick(forum.ID)}>
          View
        </Button>
      </th>
    </tr>
  );
}

function ForumModal({
  props,
  modifyForum,
  setModifyForum,
  error,
  handleSubmit,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        setModifyForum({});
        props.setOpenModal(undefined);
      }}
    >
      <Modal.Header>{modifyForum.ID ? "Edit Forum" : "Add Forum"}</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label for="Title">Title</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyForum({ ...modifyForum, Title: e.target.value });
              }}
              value={modifyForum.Title}
              required
            />
          </div>
          <div className="mb-6">
            <label for="Description">Description</label>
            <textarea
              type="text"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setModifyForum({ ...modifyForum, Description: e.target.value });
              }}
              value={modifyForum.Description}
              required
            ></textarea>
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
                setModifyForum({});
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
