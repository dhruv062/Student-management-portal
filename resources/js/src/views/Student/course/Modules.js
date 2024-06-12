import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default () => {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState("");
  const { courseId } = useParams();

  useEffect(() => {
    axiosInstance
      .post("/api/modules/get_published_modules_by_class ", {
        class_id: courseId,
      })
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="relative overflow-x-auto">
        <table className=" mt-10 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Getting Started
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {modules.length == 0 && <div>No Modules found</div>}
            {modules.map((module) => {
              return <Module key={module.module_id} module={module} />;
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

function Module({ module }) {
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {module.Name}
      </th>
      <th
        scope="row"
        className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <a
          href={module.Attachments}
          onClick={() => {
            if (!module.Attachments) {
              alert("No Attachments found");
            }
          }}
          className={
            "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 "
          }
          download
        >
          Download
        </a>
      </th>
    </tr>
  );
}
