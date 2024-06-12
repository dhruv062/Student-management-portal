import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Link } from "react-router-dom";

export default () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forums, setForums] = useState([]);
  useEffect(() => {
    axiosInstance
      .post("api/forums/get_forums_of_all_classes ")
      .then((response) => {
        // console.log(response);
        setForums(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);

  return (
    <React.Fragment>
      <h6 className="my-10"> Discussions</h6>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {forums.map((forum) => {
          return <Forum key={forum.forum_id} forum={forum} />;
        })}
      </ul>
    </React.Fragment>
  );
};

function Forum({ forum }) {
  return (
    <li className="pb-3 sm:pb-4">
      <Link to={forum.forum_id + "/"}>
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              Sub: {forum.forum_title}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {"Class " +
                forum.class_number +
                " - " +
                forum.course_name +
                " By " +
                forum.instructor_first_name +
                " " +
                forum.instructor_last_name}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
        </div>
      </Link>
    </li>
  );
}
