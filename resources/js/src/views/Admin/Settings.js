import React, { useContext, useEffect, useState } from "react";
import { usePermissions } from "../../contexts/PermissionsContext";
import { ThemeContext } from "../../contexts/ThemeContext";

function Settings() {
  const { permissions: initialPermissions } = usePermissions();
  const { selectedTheme: initialTheme, handleChangeTheme: updateTheme } =
    useContext(ThemeContext);
  const { updatePermissions } = usePermissions();
  const [permissions, setPermissions] = useState(initialPermissions);

  const handlePermissionChange = (section, permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [section]: {
        ...prevPermissions[section],
        [permission]: !prevPermissions[section][permission],
      },
    }));
  };
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const handleChangeTheme = (theme) => {
    setSelectedTheme(theme);
  };

  useEffect(() => {
    // console.log(permissions);
    // console.log(selectedTheme);
  });

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(permissions);
    updatePermissions(permissions);
    updateTheme(selectedTheme);
  }
  return (
    <div>
      <h6>Themes and permissions</h6>
      <form onSubmit={handleSubmit}>
        {/* <button className={`bg-primary`}>Test</button> */}
        <div className="flex">
          <div>
            <label htmlFor="themes">Select a Theme</label>
            <select
              id="themes"
              value={selectedTheme}
              onChange={(e) => handleChangeTheme(e.target.value)}
            >
              <option value="light">Blue</option>
              {/* <option value="summer">Summer</option> */}
              <option value="forest">Green</option>
              <option value="dark">Cyan</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="text-white mt-4 mx-20 bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="max-w-sm">
          <div className="">
            <table className=" mt-4 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-primary text-white">
                    Permission
                  </th>
                  <th scope="col" className="px-6 py-3 bg-primary text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Enroll Class
                  </th>
                  <td>
                    <input
                      checked={permissions.enrollments.enroll}
                      type="checkbox"
                      onChange={() =>
                        handlePermissionChange("enrollments", "enroll")
                      }
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Drop Class
                  </th>
                  <td>
                    <input
                      checked={permissions.enrollments.drop}
                      type="checkbox"
                      onChange={() =>
                        handlePermissionChange("enrollments", "drop")
                      }
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Create Class
                  </th>
                  <td>
                    <input
                      checked={permissions.classes.create}
                      type="checkbox"
                      onChange={() =>
                        handlePermissionChange("classes", "create")
                      }
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Edit Class
                  </th>
                  <td>
                    <input
                      checked={permissions.classes.edit}
                      type="checkbox"
                      onChange={() => handlePermissionChange("classes", "edit")}
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Delete Class
                  </th>
                  <td>
                    <input
                      checked={permissions.classes.delete}
                      type="checkbox"
                      onChange={() =>
                        handlePermissionChange("classes", "delete")
                      }
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Create Course
                  </th>
                  <td>
                    <input
                      checked={permissions.courses.create}
                      type="checkbox"
                      onChange={() =>
                        handlePermissionChange("courses", "create")
                      }
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Edit Course
                  </th>
                  <td>
                    <input
                      checked={permissions.courses.edit}
                      type="checkbox"
                      onChange={() => handlePermissionChange("courses", "edit")}
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Delete Course
                  </th>
                  <td>
                    <input
                      checked={permissions.courses.delete}
                      type="checkbox"
                      onChange={() =>
                        handlePermissionChange("courses", "delete")
                      }
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Create User
                  </th>
                  <td>
                    <input
                      checked={permissions.users.create}
                      type="checkbox"
                      onChange={() => handlePermissionChange("users", "create")}
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Edit User
                  </th>
                  <td>
                    <input
                      checked={permissions.users.edit}
                      type="checkbox"
                      onChange={() => handlePermissionChange("users", "edit")}
                    />
                  </td>
                </tr>

                <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Delete User
                  </th>
                  <td>
                    <input
                      checked={permissions.users.delete}
                      type="checkbox"
                      onChange={() => handlePermissionChange("users", "delete")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Settings;
