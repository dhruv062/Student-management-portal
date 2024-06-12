import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { Modal, Button, Dropdown } from "flowbite-react";
import Error from "../../components/Error";
import { toast } from "react-toastify";
import ThemedModal from "../../components/ThemedModal";
import { PermissionsContext } from "../../contexts/PermissionsContext";

export default () => {
  const { permissions } = React.useContext(PermissionsContext);
  const { create: allowCreate } = permissions.users;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState();
  const [modifytype, setmodifyType] = useState("Add");
  const [loading, setLoading] = useState(false);
  const props = { openModal, setOpenModal };

  const [modifyuser, setModifyUser] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Address: "",
    PhoneNumber: "",
    Date: "",
    Role: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(modifyuser)) return false;
    setLoading(true);
    sendData(modifyuser, modifytype);

    setLoading(false);
  }
  function handleDelete(user) {
    setLoading(true);
    axiosInstance
      .post("/api/users/delete_user ", user)
      .then((response) => {
        // console.log(response);
        toast.info("User Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Error Deleting User" + " " + error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function sendData(modifyuser, modifytype) {
    if (modifytype === "Add") {
      axiosInstance
        .post("/api/users/add_user ", modifyuser)
        .then((response) => {
          // console.log(response);
          toast.info("User Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setOpenModal(undefined);
          setModifyUser({});
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setError(error.message);
        });
    } else {
      axiosInstance
        .post("/api/users/update_user ", modifyuser)
        .then((response) => {
          // console.log(response);
          toast.info("User Updated Successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setOpenModal(undefined);
          setModifyUser({});
          setError("");
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Something Went Wrong", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setError(error.message);
          setModifyUser({});
        });
    }
  }
  useEffect(() => {
    axiosInstance
      .get("/api/users/get_all_users ")
      .then((response) => {
        // console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        setError("Some Error occured");
      });
  }, [openModal, loading]);
  useEffect(() => {
    // console.log(modifyuser);
  });
  return (
    <React.Fragment>
      <UserModal
        props={props}
        modifyuser={modifyuser}
        setModifyUser={setModifyUser}
        error={error}
        handleSubmit={handleSubmit}
      />
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Manage Users
      </h5>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setmodifyType("Add");
            props.setOpenModal("default");
          }}
          className={`bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded${
            !allowCreate ? " cursor-not-allowed" : ""
          }`}
          disabled={!allowCreate}
        >
          Add User
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className=" mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                First name
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Last name
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                email
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                role
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => {
                return (
                  <User
                    key={user.user_id}
                    props={{
                      user,
                      setModifyUser,
                      setOpenModal,
                      setmodifyType,
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

function User({ props }) {
  const { user, setModifyUser, setOpenModal, setmodifyType, handleDelete } =
    props;
  const { permissions } = React.useContext(PermissionsContext);
  const { edit: allowEdit, delete: allowDelete } = permissions.users;
  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.FirstName}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.LastName}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.Email}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.Role}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium   text-gray-900 whitespace-nowrap dark:text-white flex"
      >
        <button
          onClick={() => {
            setModifyUser(user);
            setmodifyType("Edit");
            setOpenModal("default");
          }}
          className={`text-white bg-primary border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700${
            !allowEdit ? " cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          disabled={!allowEdit}
        >
          Edit
        </button>
        {user.user_id == localStorage.getItem("id") && (
          <button
            className={`text-primary border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 
             cursor-not-allowed
            }`}
            disabled
            onClick={() => {
              handleDelete(user);
            }}
          >
            Delete
          </button>
        )}
        {user.user_id != localStorage.getItem("id") && (
          <button
            onClick={() => {
              handleDelete(user);
            }}
            className={`text-white bg-primary border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700${
              !allowDelete ? " cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            disabled={!allowDelete}
          >
            Delete
          </button>
        )}
      </th>
    </tr>
  );
}

function UserModal({ props, modifyuser, setModifyUser, error, handleSubmit }) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        {
          setModifyUser({});
          props.setOpenModal(undefined);
        }
      }}
    >
      <Modal.Header>Add User</Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
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
                setModifyUser({ ...modifyuser, Password: e.target.value })
              }
              value={modifyuser.Password}
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
          <div className="mb-6">
            <label for="Date">Date of Birth</label>
            <input
              type="date"
              onChange={(e) => {
                setModifyUser({ ...modifyuser, Date: e.target.value });
              }}
              value={modifyuser.Date}
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
                setModifyUser({ ...modifyuser, Role: e.target.value });
              }}
              value={modifyuser.Role}
              id="Roles"
              className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled={
                localStorage.getItem("id") == modifyuser.user_id ? true : false
              }
              required
            >
              <option value="">Choose a Role</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="pc">Coordinator</option>
              <option value="qao">QAO</option>
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
                setModifyUser({});
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

function validate(modifyuser) {
  if (modifyuser.Password.length < 8) {
    toast.error("Password must be atleast 8 characters long");

    return false;
  }
  const pattern =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!pattern.test(modifyuser.PhoneNumber)) {
    toast.error("Phone number is not valid.");
    return false;
  }
  const dob = new Date(modifyuser.Date);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();

  if (age < 18) {
    toast.error("Age should be atleast 18 years");
    return false;
  }

  return true;
}
