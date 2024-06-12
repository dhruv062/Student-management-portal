import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["Solved", "Pending"];

export const data = {
  labels,
  datasets: [
    {
      label: "Issues",
      data: [10, 2],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default () => {
  const { coordinatorId } = useParams();
  const [coordinator, setCoordinator] = React.useState();
  useEffect(() => {
    axiosInstance
      .post("/api/users/get_user_by_id ", { user_id: coordinatorId })
      .then((response) => {
        // console.log(response.data);
        setCoordinator(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        {coordinator && (
          <h6 className="mt-6">
            {coordinator.FirstName + " " + coordinator.LastName}
          </h6>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coordinator && (
            <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                coordinator
              </h5>
              <p>Program: MS</p>
              <p>Department: CSE</p>
              <p>Phone: {coordinator.PhoneNumber}</p>
              <p>Email: {coordinator.Email}</p>
              <p>Address: {coordinator.Address}</p>
            </div>
          )}

          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Isuues Resolved / Pending
            </h5>
            <CoordinatorProgress />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function CoordinatorProgress() {
  const { coordinatorId } = useParams();
  const [data, setData] = React.useState({
    pc_total_issues: 0,
    individual_solved_issues: 0,
    other_pc_solved_issues: 0,
    not_closed_pc_issues: 0,
  });

  useEffect(() => {
    // Replace with your backend API endpoint
    axiosInstance
      .post("/api/analytics/get_coordinator_progress ", {
        coordinator_id: coordinatorId,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chartData = {
    labels: [
      "Total Issues for PC's",
      "Individual Solved Issues",
      "Other PC Solved Issues",
      "Not Closed PC Issues",
    ],
    datasets: [
      {
        data: [
          data.pc_total_issues,
          data.individual_solved_issues,
          data.other_pc_solved_issues,
          data.not_closed_pc_issues,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
}
