import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Modal, Button } from "flowbite-react";
import ThemedModal from "../../components/ThemedModal";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

export default () => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState();
  const [modifyType, setModifyType] = useState("Add");
  const [loading, setLoading] = useState(false);
  const initialPolicy = {
    Title: "",
    Description: "",
  };
  const [modifyPolicy, setModifyPolicy] = useState(initialPolicy);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendData(modifyPolicy, modifyType);

    setLoading(false);
  };

  const handleDelete = (policy) => {
    setLoading(true);
    axiosInstance
      .post("/api/policies/delete_policy ", { PolicyID: policy.PolicyID })
      .then((response) => {
        // console.log(response);
        toast.success("Policy Deleted");
        refreshPolicies();
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Some Error Occured");
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendData = (modifyPolicy, modifyType) => {
    if (modifyType === "Add") {
      axiosInstance
        .post("/api/policies/add_policy ", modifyPolicy)
        .then((response) => {
          // console.log(response);
          toast.success("Policy Added");
          setOpenModal(undefined);
          setModifyPolicy({});
          refreshPolicies();
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Some Error Occured");
          setError(error.message);
        });
    } else {
      axiosInstance
        .post("/api/policies/update_policy ", {
          PolicyID: modifyPolicy.PolicyID,
          NewTitle: modifyPolicy.Title,
          NewDescription: modifyPolicy.Description,
        })
        .then((response) => {
          // console.log(response);
          toast.success("Policy Updated");
          setOpenModal(undefined);
          setModifyPolicy({});
          setError("");
          refreshPolicies();
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Some Error Occured");
          setError(error.message);
          setModifyPolicy({});
        });
    }
  };

  const refreshPolicies = () => {
    axiosInstance
      .post("/api/policies/get_all_policies ")
      .then((response) => {
        // console.log(response.data);
        setPolicies(response.data);
      })
      .catch((error) => {
        setError("Some Error occurred");
      });
  };

  useEffect(() => {
    refreshPolicies();
  }, [openModal, loading]);

  return (
    <div>
      <PolicyModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modifyPolicy={modifyPolicy}
        setModifyPolicy={setModifyPolicy}
        error={error}
        handleSubmit={handleSubmit}
        modifyType={modifyType}
      />

      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Manage Policies
      </h5>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setModifyType("Add");
            setModifyPolicy(initialPolicy);
            setOpenModal("default");
          }}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 mt-4  rounded"
        >
          Add Policy
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className="mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
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
            {policies.length > 0 ? (
              policies.map((policy) => {
                return (
                  <Policy
                    key={policy.PolicyID}
                    policy={policy}
                    setModifyPolicy={setModifyPolicy}
                    setOpenModal={setOpenModal}
                    setModifyType={setModifyType}
                    handleDelete={handleDelete}
                  />
                );
              })
            ) : (
              <Loading />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function Policy({
  policy,
  setModifyPolicy,
  setOpenModal,
  setModifyType,
  handleDelete,
}) {
  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {policy.Title}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {policy.Description}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white flex"
      >
        <Button
          color="blue"
          className="bg-primary mr-4"
          onClick={() => {
            setModifyPolicy(policy);
            setModifyType("Edit");
            setOpenModal("default");
          }}
        >
          Edit
        </Button>
        <Button
          color="blue"
          className="bg-primary"
          onClick={() => handleDelete(policy)}
        >
          Delete
        </Button>
      </th>
    </tr>
  );
}

function PolicyModal({
  openModal,
  setOpenModal,
  modifyPolicy,
  setModifyPolicy,
  error,
  handleSubmit,
  modifyType,
}) {
  return (
    <ThemedModal
      show={openModal === "default"}
      onClose={() => setOpenModal(undefined)}
    >
      <Modal.Header>{modifyType} Policy</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              onChange={(e) =>
                setModifyPolicy({ ...modifyPolicy, Title: e.target.value })
              }
              value={modifyPolicy.Title}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Description">Description</label>

            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) =>
                setModifyPolicy({
                  ...modifyPolicy,
                  Description: e.target.value,
                })
              }
              value={modifyPolicy.Description}
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
            <Button color="gray" onClick={() => setOpenModal(undefined)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </ThemedModal>
  );
}
