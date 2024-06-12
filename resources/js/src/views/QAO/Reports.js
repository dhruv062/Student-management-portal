import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Modal, Button } from "flowbite-react";
import ThemedModal from "../../components/ThemedModal";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
export default () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState();
  const [modifyType, setModifyType] = useState("Add");
  const [loading, setLoading] = useState(false);
  const props = { openModal, setOpenModal };

  const [modifyReport, setModifyReport] = useState({
    Report_ID: "",
    Title: "",
    ReportData: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendData(modifyReport, modifyType);
    setLoading(false);
  }
  useEffect(() => {
    // console.log(modifyReport);
  });

  function handleDelete(report) {
    setLoading(true);
    axiosInstance
      .post("/api/reports/delete_report ", report)
      .then((response) => {
        toast.success("Report Deleted");
        // console.log(response);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Some Error Occured");
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function sendData(modifyReport, modifyType) {
    if (modifyType === "Add") {
      axiosInstance
        .post("/api/reports/add_report ", modifyReport)
        .then((response) => {
          toast.success("Report Added");
          // console.log(response);
          setOpenModal(undefined);
          setModifyReport({});
        })
        .catch((error) => {
          toast.error("Some Error Occured");
          // console.log(error);
          setError(error.message);
        });
    } else {
      axiosInstance
        .post("/api/reports/update_report ", modifyReport)
        .then((response) => {
          toast.success("Report Updated");
          // console.log(response);
          setOpenModal(undefined);
          setModifyReport({});
          setError("");
        })
        .catch((error) => {
          // console.log(error);
          toast.error("Some Error Occured");
          setError(error.message);
          setModifyReport({});
        });
    }
  }

  useEffect(() => {
    axiosInstance
      .post("/api/reports/get_all_reports ")
      .then((response) => {
        // console.log(response.data);
        setReports(response.data);
      })
      .catch((error) => {
        setError("Some error occurred");
      });
  }, [openModal, loading]);

  return (
    <React.Fragment>
      <ReportModal
        props={props}
        modifyReport={modifyReport}
        setModifyReport={setModifyReport}
        error={error}
        handleSubmit={handleSubmit}
      />
      <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Manage Reports
      </h5>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setModifyType("Add");
            props.setOpenModal("default");
          }}
          className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 mt-4 rounded"
        >
          Add Report
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="mt-6 w-full text-sm text-left text-gray-500 border dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Title
              </th>
              <th scope="col" className="px-6 py-3 bg-primary text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => {
                return (
                  <Report
                    key={report.Report_ID}
                    props={{
                      report,
                      setModifyReport,
                      setOpenModal,
                      setModifyType,
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

function Report({ props }) {
  const { report, setModifyReport, setOpenModal, setModifyType, handleDelete } =
    props;

  return (
    <tr className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
      >
        {report.Title}
      </th>

      <th
        scope="row"
        className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white flex"
      >
        <Button
          color="blue"
          className="mr-2 bg-primary"
          onClick={() => {
            setModifyReport(report);
            setModifyType("Edit");
            setOpenModal("default");
          }}
        >
          Edit
        </Button>
        <Button
          color="blue"
          className="bg-primary mr-2"
          onClick={() => {
            handleDelete(report);
          }}
        >
          Delete
        </Button>
      </th>
    </tr>
  );
}

function ReportModal({
  props,
  modifyReport,
  setModifyReport,
  error,
  handleSubmit,
}) {
  return (
    <ThemedModal
      show={props.openModal === "default"}
      onClose={() => {
        setModifyReport({});
        props.setOpenModal(undefined);
      }}
    >
      <Modal.Header>
        {modifyReport.Report_ID ? "Edit" : "Add"} Report
      </Modal.Header>
      <Modal.Body>
        {error && <Error message={error} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyReport({ ...modifyReport, Title: e.target.value });
              }}
              value={modifyReport.Title}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="ReportData">Report Data</label>
            <input
              type="text"
              onChange={(e) => {
                setModifyReport({
                  ...modifyReport,
                  ReportData: e.target.value,
                });
              }}
              value={modifyReport.ReportData}
              required
            />
          </div>
          <div>
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
                  setModifyReport({});
                  props.setOpenModal(undefined);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </ThemedModal>
  );
}
