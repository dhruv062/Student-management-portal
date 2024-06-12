import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { Link, useParams } from "react-router-dom";
import { Modal, Button, Dropdown } from "flowbite-react";
import ThemedModal from "../../../components/ThemedModal";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";
import uploadFile from "../../../controllers/upload";

export default () => {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [modifytype, setmodifyType] = useState("Add");
  const { courseId } = useParams();
  useEffect(() => {
    // console.log(modifymodule);
    // console.log(file);
  });
  const props = { openModal, setOpenModal };
  const initialModule = {
    class_id: courseId,
    Name: "",
    content: "",
    publish_date: true,
    Attachments: "",
  };
  function handleDelete(module) {
    sendData(module, "Delete");
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const [modifymodule, setModifyModule] = useState(initialModule);

  useEffect(() => {
    axiosInstance
      .post("/api/modules/get_modules_by_class ", { class_id: courseId })
      .then((response) => {
        // console.log(response.data);
        setModules(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, [loading, openModal]);

  useEffect(() => {
    // console.log(loading);
  });
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(file);
    if (file) {
      // console.log("File is there");
      const result = await uploadFile(file);
      // console.log(result);
      if (result.success) {
        setLoading(true);
        sendData(
          { ...modifymodule, Attachments: result.file_location },
          modifytype
        );
        setLoading(false);
      } else {
        console.error(result.error);
        return;
      }
    } else {
      setLoading(true);
      sendData(modifymodule, modifytype);
      setLoading(false);
    }
  }
  function sendData(modifymodule, modifytype) {
    if (modifytype === "Add") {
      axiosInstance
        .post("/api/modules/add_module ", modifymodule)
        .then((response) => {
          // console.log(response);
          toast.info("Module Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setOpenModal(undefined);
          setModifyModule({});
        })
        .catch((error) => {
          // console.log(error);
          setError(error.message);
        });
    } else if (modifytype === "Delete") {
      setLoading(true);

      axiosInstance
        .post("/api/modules/delete_module ", modifymodule)
        .then((response) => {
          // console.log(response);
          toast.info("Module Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        })
        .catch((error) => {
          // console.log(error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axiosInstance
        .post("/api/modules/update_module ", modifymodule)
        .then((response) => {
          // console.log(response);
          toast.info("Module Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          setOpenModal(undefined);
          setModifyModule({});
          setError("");
        })
        .catch((error) => {
          // console.log(error);
          setError(error.message);
          setModifyModule({});
        });
    }
  }

  return (
    <React.Fragment>
      <ModuleModal
        props={props}
        modifymodule={modifymodule}
        setModifyModule={setModifyModule}
        error={error}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
        modifytype={modifytype}
      />
      <div className="flex justify-end">
        <button
          onClick={() => {
            setmodifyType("Add");
            setFile(null);
            setModifyModule(initialModule);
            props.setOpenModal("default");
          }}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 mt-4  rounded"
        >
          Add Module
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Modules
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                PUBLISH STATUS
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href="/demo.pdf">WDM section 5</a>
              </th>
            </tr> */}
            {modules.length === 0 && <div> No Modules found</div>}
            {modules.map((module) => {
              return (
                <Module
                  key={module.Id}
                  props={{
                    module,
                    setModifyModule,
                    setmodifyType,
                    setOpenModal,
                    handleDelete,
                    setFile,
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

function Module({ props }) {
  const {
    module,
    setModifyModule,
    setmodifyType,
    setOpenModal,
    handleDelete,
    setFile,
  } = props;
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link>{module.Name}</Link>
      </th>
      <td
        scope="row"
        className="px-6 py-4 hover:underline font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Publish published={module.date_published} />
      </td>
      <td
        scope="row"
        className="px-6 py-4 flex  font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <button
          color="blue"
          className="text-white ml-4 bg-primary border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => {
            setModifyModule({
              ...module,
              publish_date: module.date_published ? true : false,
            });
            setmodifyType("Edit");
            setFile(null);
            setOpenModal("default");
          }}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDelete(module)}
          className="text-gray-900 ml-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Delete
        </button>
        <a
          className="text-gray-900 ml-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          href={module.Attachments}
          onClick={() => {
            if (!module.Attachments) {
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

function ModuleModal({
  props,
  modifymodule,
  setModifyModule,
  error,
  handleSubmit,
  handleFileChange,
  modifytype,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        {
          setModifyModule({});
          props.setOpenModal(undefined);
        }
      }}
    >
      <Modal.Header>{modifytype} Module</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="Name">Name</label>
            <input
              type="name"
              onChange={(e) => {
                setModifyModule({ ...modifymodule, Name: e.target.value });
              }}
              value={modifymodule.Name}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Content">Content</label>
            <input
              type="name"
              onChange={(e) => {
                setModifyModule({ ...modifymodule, content: e.target.value });
              }}
              value={modifymodule.content}
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex">
              <label>
                Publish
                <input
                  type="checkbox"
                  name="publish_date"
                  checked={modifymodule.publish_date}
                  onChange={(e) => {
                    setModifyModule({
                      ...modifymodule,
                      publish_date: !modifymodule.publish_date,
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
              className="text-white mr-4 bg-primary hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-primary dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <Button
              color="gray"
              onClick={() => {
                setModifyModule({});
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

function DeleteModal() {}
