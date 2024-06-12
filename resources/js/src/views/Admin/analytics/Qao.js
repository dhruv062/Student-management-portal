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
import { Bar } from "react-chartjs-2";
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

const labels = ["Policies", "Reports"];

export const data = {
  labels,
  datasets: [
    {
      label: "Submitted",
      data: [10, 2],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default () => {
  const { qaoId } = useParams();
  const [qao, setQao] = React.useState();
  useEffect(() => {
    axiosInstance
      .post("/api/users/get_user_by_id ", { user_id: qaoId })
      .then((response) => {
        // console.log(response.data);
        setQao(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        {qao && <h6 className="mt-6">{qao.FirstName + " " + qao.LastName}</h6>}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qao && (
            <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Quality Assurance Officer
              </h5>
              <p>Program: MS</p>
              <p>Department: CSE</p>
              <p>Phone: {qao.PhoneNumber}</p>
              <p>Email: {qao.Email}</p>
              <p>Address: {qao.Address}</p>
            </div>
          )}

          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Recommendations
            </h5>
            <QAOProgress />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

function QAOProgress() {
  const { qaoId } = useParams();
  const [data, setData] = React.useState({
    User_Policies: 0,
    User_Reports: 0,
    Total_Policies: 0,
    Total_Reports: 0,
  });

  useEffect(() => {
    // Replace with your backend API endpoint
    axiosInstance
      .post("/api/analytics/get_qao_progress ", { user_id: qaoId })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chartData = {
    labels: ["Policies", "Reports"],
    datasets: [
      {
        label: "User",
        data: [data.User_Policies, data.User_Reports],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total",
        data: [data.Total_Policies, data.Total_Reports],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
