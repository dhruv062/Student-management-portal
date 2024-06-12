import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { useNavigate } from "react-router-dom";

export default () => {
  const [users, setUsers] = React.useState([{}]);
  const [error, setError] = React.useState("");
  useEffect(() => {
    axiosInstance
      .post("/api/users/get_users_by_role ", { role: "instructor" })
      .then((response) => {
        // console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        setError("Some Error occured");
      });
  }, []);

  return (
    <React.Fragment>
      <h6 className="mt-6">Select an Instructor</h6>

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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.ID} user={user} />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const handleRowClick = (ID) => {
    navigate(`${ID}/`);
  };
  return (
    <tr
      onClick={() => handleRowClick(user.ID)}
      className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.FirstName}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.LastName}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium hover:underline text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.Email}
      </th>
    </tr>
  );
}
