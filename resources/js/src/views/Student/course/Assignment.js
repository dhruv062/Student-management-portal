import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { toast } from "react-toastify";
import {
  convertToLocalTimeZone,
  convertToTimeZone,
} from "../../../utilities/utilities";

export default () => {
  const { assignmentId } = useParams();
  const [error, setError] = useState("");
  const [assignment, setAssignment] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [resubmit, setResubmit] = useState(false);
  const [submissionTimePassed, setSubmissionTimePassed] = useState(true);
  function fetchSubmissions() {
    axiosInstance
      .post("/api/submissions/get_submission_for_assignment_by_user ", {
        assignment_id: assignmentId,
        user_id: localStorage.getItem("id"),
      })
      .then((response) => {
        // console.log(response.data);
        setResubmit(false);
        setSubmissions(response.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }
  useEffect(() => {
    fetchSubmissions();
  }, []);
  useEffect(() => {
    axiosInstance
      .post("/api/assignments/get_assignment_by_id ", {
        assignment_id: assignmentId,
      })
      .then((response) => {
        console.log(response.data);
        setAssignment(response.data);
        console.log(response.data.assignment_available_date);
        setSubmissionTimePassed(
          new Date(
            convertToTimeZone(
              response.data.assignment_available_date,
              "America/Chicago"
            )
          ) > new Date()
        );
        console.log(
          new Date(
            convertToTimeZone(
              response.data.assignment_available_date,
              "America/Chicago"
            )
          ) > new Date()
        );
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);

  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Assignment
      </h5>

      <div className="relative overflow-x-auto">
        <div className=" p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {assignment.assignment_name}
            </h5>
          </a>
          <div style={{ "margin-bottom": "1.25rem" }}>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {assignment.assignment_content}
            </p>
            {assignment.attachments && (
              <div>
                <p>Attachments are provided below</p>
                <a
                  className="underline text-primary"
                  href={assignment.attachments}
                  download
                >
                  View Files
                </a>
              </div>
            )}
          </div>

          {/* {(new Date(assignment.assignment_available_date).toLocaleString(
            "en-US",
            { timeZone: "America/Chicago" }
          ) >
            new Date().toLocaleString("en-US", {
              timeZone: "America/Chicago",
            })
             || */}

          {(submissionTimePassed || resubmit) &&
            (submissions.length <= 0 || resubmit ? (
              <Submission
                props={{
                  submitted: false,
                  assignmentId: assignmentId,
                  user_id: localStorage.getItem("id"),
                  fetchSubmissions,
                }}
              />
            ) : (
              <button
                className="underline text-primary"
                onClick={() => setResubmit(true)}
              >
                Resubmit
              </button>
            ))}
        </div>
      </div>
      <p> Recent Submissions</p>
      {submissions.length <= 0 ? (
        <div>No submissions found</div>
      ) : (
        <table className=" mt-4 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                submitted file
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, idx) => {
              return <Submissions id={idx} props={{ submission, idx }} />;
            })}
          </tbody>
        </table>
      )}

      {/* <CommentBox /> */}
      <div className="relative overflow-x-auto"></div>
    </React.Fragment>
  );
};

function Submission({ props }) {
  const { submitted, assignmentId, user_id, fetchSubmissions } = props;
  const [file, setFile] = useState(null);
  const [fileLocation, setFileLocation] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const result = await uploadFile(file);
    if (result.success) {
      axiosInstance
        .post("/api/submissions/add_submission ", {
          assignment_id: assignmentId,
          user_id: localStorage.getItem("id"),
          content: "Hello World",
          attachments_link: result.file_location,
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Submission Successful");
          setFile(null);
          fetchSubmissions();
          // console.log(response.data);
        })
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 413) {
            toast.error("File size too large");
          }
          // console.log(error);
          //  setError(error.message);
        });
    } else {
      console.error(result.error);
    }
  };

  return (
    <React.Fragment>
      {submitted ? (
        <a className="underline">View Submission</a>
      ) : (
        <div>
          <p>Choose a File to Submit</p>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="multiple_files"
          ></label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="multiple_files"
            type="file"
            onChange={handleFileChange}
            accept=".pdf, .zip"
          />
          <button
            onClick={handleSubmit}
            className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium text-center text-white bg-primary rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          >
            Submit
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

function CommentBox() {
  return (
    <React.Fragment>
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Comments
      </h5>

      <form className="mt-2">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900  "
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

async function uploadFile(file) {
  const result = { success: false, file_location: "", error: "" };
  const formData = new FormData();
  formData.append("file", file);
  // console.log(formData);

  if (file.size > 2 * 1024 * 1024) {
    toast.error("File size is too large (maximum size is 2MB).");
    return result;
  }

  try {
    const response = await axiosInstance.post("/upload ", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      result["success"] = true;
      result["file_location"] = response.data.file_location;
    } else {
      if (response.data.error.status === 413) {
        toast.error("File size too large");
      }
      console.error(response.data.error);
      result["error"] = response.data.error;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    result["error"] = error.message;
  }
  return result;
}

function Submissions({ props }) {
  const { submission, idx } = props;
  // console.log(submission);
  return (
    <tr className="bg-white border-b cursor-pointer hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <a
          className="text-primary hover:underline"
          href={submission.AttachmentsLink}
          onClick={() => {
            if (!submission.AttachmentsLink) {
              alert("No Attachments found");
            }
          }}
          download
        >
          {" "}
          Download{" "}
        </a>
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {convertToLocalTimeZone(submission.submission_date, "America/Chicago")}
      </td>
    </tr>
  );
}
