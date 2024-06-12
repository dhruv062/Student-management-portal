import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { toast } from "react-toastify";
// Create the PermissionsContext
export const PermissionsContext = createContext();

// Define a custom provider for managing permissions
export const PermissionsProvider = ({ children }) => {
  useEffect(() => {
    getPermissionsBackend();
  }, []);

  const initialPermissions = {
    enrollments: {
      enroll: true,
      drop: true,
    },
    classes: {
      create: true,
      edit: true,
      delete: true,
    },
    courses: {
      create: true,
      edit: true,
      delete: true,
    },
    users: {
      create: true,
      edit: true,
      delete: true,
    },
  };
  const [permissions, setPermissions] = useState(initialPermissions);

  const updatePermissions = (newPermissions) => {
    setPermissions(newPermissions);
    updatePermissionBackend(newPermissions);
  };

  const handlePermissionChange = (section, permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [section]: {
        ...prevPermissions[section],
        [permission]: !prevPermissions[section][permission],
      },
    }));
  };

  function updatePermissionBackend(newPermissions) {
    // console.log(JSON.stringify(newPermissions));
    axiosInstance
      .post("/api/themeandpermissions/update_permissions ", {
        name: JSON.stringify(newPermissions),
      })
      .then((response) => {
        // console.log(response);
        setPermissions(newPermissions);
        toast.success("Permissions Updated Successfully");
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Error Updating Permissions: " + error.message);
      });
  }

  function getPermissionsBackend() {
    axiosInstance
      .post("/api/themeandpermissions/get_permissions ")
      .then((response) => {
        // console.log(response);
        setPermissions(JSON.parse(response.data[0].name));
      })
      .catch((error) => {
        // console.log(error);
        setPermissions(initialPermissions);
        // toast.error("Error Fetching Permissions: " + error.message);
      });
  }

  return (
    <PermissionsContext.Provider
      value={{ permissions, handlePermissionChange, updatePermissions }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

// Create a custom hook to access the permissions context
export const usePermissions = () => useContext(PermissionsContext);
