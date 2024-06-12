import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";

import Login from "../views/Login";

const App = () => {
  const [user, setUser] = useState(false);
  const [error, setError] = useState("");
  // console.log(user);
  useEffect(() => {
    // Make an Axios request to the backend to check if the user is logged in
    // Usage example (no need to specify the full URL)
    if (localStorage.getItem("role")) {
        setUser({role: localStorage.getItem("role")});
    }

  }, []);

  return (
    <div>
      {user ? (
        user.role === "student" ? (
          <Navigate to="/student/" />
        ) : user.role === "instructor" ? (
          <Navigate to="/instructor/" />
        ) : user.role === "admin" ? (
          <Navigate to="/admin/" />
        ) : user.role === "pc" ? (
          <Navigate to="/pc/" />
        ) : user.role === "qao" ? (
          <Navigate to="/qao/" />
        ) : (
          <Navigate to="/login" />
        )
      ) : (
        // Navigate the user to a protected page if logged in

        // Show the login page if not logged in
        <Login error={""}/>
      )}
    </div>
  );
};

export default App;
