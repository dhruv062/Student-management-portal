import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import MiniNav from "./MiniNav";
import axiosInstance from "../../../axiosConfig";
export default () => {
  const { courseId } = useParams();
  const [classInfo, setClassInfo] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    axiosInstance
      .post("/api/classes/get_class_info ", { class_id: courseId })
      .then((response) => {
        setClassInfo(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
  return (
    <React.Fragment>
      {classInfo.length > 0 && (
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {classInfo[0].course_number + " " + classInfo[0].course_name}
        </h5>
      )}

      <MiniNav />
      <Outlet />
    </React.Fragment>
  );
};
