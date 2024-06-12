import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosConfig";

export default () => {
  const [syllabus, setSyllabus] = useState([]);
  const [error, setError] = useState("");
  const { courseId } = useParams();
  useEffect(() => {
    axiosInstance
      .post("/api/syllabus/get_syllabus_by_id ", { class_id: courseId })
      .then((response) => {
        // console.log(response.data);
        setSyllabus(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);
  return (
    <React.Fragment>
      <h6 className="mt-4"> Syllabus</h6>
      <div>{syllabus["syllabus"]}</div>
    </React.Fragment>
  );
};
