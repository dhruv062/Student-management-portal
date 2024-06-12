import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, Button, Dropdown } from "flowbite-react";
import axiosInstance from "../../axiosConfig";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import uploadFile from "../../controllers/upload";
export default () => {
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [modifyuser, setModifyUser] = useState({});
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  useEffect(() => {
    // Set a timeout to clear the message after 2000 milliseconds
    const timeoutId = setTimeout(() => {
      setError("");
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [error]);
  useEffect(() => {
    axiosInstance
      .post("/api/profile/get_profile ")
      .then((response) => {
        setUser(response.data);
        setModifyUser({ ...response.data, password: "*******" });
      })
      .catch((error) => {
        setError("Some Error occured");
      });
  }, [openModal]);
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(file);
    if (file) {
      const result = await uploadFile(file);
      if (result.success) {
        setLoading(true);
        sendData({ ...modifyuser, ProfilePicture: result.file_location });
        setLoading(false);
      } else {
        console.error(result.error);
        return;
      }
    }
  }
  async function sendData(modifyuser) {
    // console.log("Sending Data");

    // console.log(modifyuser);
    axiosInstance
      .post("/api/profile/update_profile ", modifyuser)
      .then((response) => {
        // console.log(response);
        setOpenModal(undefined);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }

  useEffect(() => {
    // console.log(modifyuser);
  });
  return (
    <React.Fragment>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          {error && <Error message={error} />}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label for="Image">Profile Picture</label>
              <input
                type="file"
                accept=".img,.png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-6">
              <label for="First Name">First Name</label>

              <input
                type="name"
                onChange={(e) => {
                  setModifyUser({ ...modifyuser, FirstName: e.target.value });
                }}
                value={modifyuser.FirstName}
                required
              />
            </div>
            <div className="mb-6">
              <label for="Last Name">Last Name</label>
              <input
                type="name"
                onChange={(e) => {
                  setModifyUser({ ...modifyuser, LastName: e.target.value });
                }}
                value={modifyuser.LastName}
                required
              />
            </div>
            <div className="mb-6">
              <label for="Email">Email</label>
              <input
                name="useremail"
                type="email"
                onChange={(e) =>
                  setModifyUser({ ...modifyuser, Email: e.target.value })
                }
                value={modifyuser.Email}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-6">
              <label for="Password">Password</label>
              <input
                name="userpassword"
                type="password"
                onChange={(e) =>
                  setModifyUser({ ...modifyuser, password: e.target.value })
                }
                value={modifyuser.password}
                required
                autoComplete="off"
              />
            </div>
            <div className="mb-6">
              <label for="Address">Address</label>
              <input
                type="text"
                onChange={(e) => {
                  setModifyUser({ ...modifyuser, Address: e.target.value });
                }}
                value={modifyuser.Address}
                required
              />
            </div>
            <div className="mb-6">
              <label for="Phone">Phone</label>
              <input
                type="phone"
                onChange={(e) => {
                  setModifyUser({ ...modifyuser, PhoneNumber: e.target.value });
                }}
                value={modifyuser.PhoneNumber}
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
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {Object.keys(user).length > 0 ? (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4">
            <Dropdown
              dismissOnClick={false}
              renderTrigger={() => (
                <svg
                  className="w-5 h-5 cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              )}
            >
              <div
                className="py-2 px-8 cursor-pointer"
                onClick={() => props.setOpenModal("default")}
              >
                Edit
              </div>
            </Dropdown>
          </div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={user.ProfilePicture}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.FirstName + " " + user.LastName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.Role}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Email: {user.Email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Phone: {user.PhoneNumber}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6"></div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};
