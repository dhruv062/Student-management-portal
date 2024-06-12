import React from "react";
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

import { ArcElement } from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);

export default () => {
  const classdata = {
    labels: ["Assignments", "Exams"],
    datasets: [
      {
        data: [25, 10],
        backgroundColor: ["rgb(255, 195, 55,0.8)", "rgb(54,162,235, 0.8)"], // Customize the colors
      },
    ],
  };

  const usersdata = {
    labels: [
      "CSE 5335 WDM",
      "CSE 5338 Data Mining",
      "CSE 5245 AI",
      "CSE 5300 Machine Learning",
    ],
    datasets: [
      {
        label: "Percentage",
        data: [80, 40, 90, 85],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(0, 0, 255, 0.6)",
          "rgba(255, 255, 0, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(255, 255, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const usersoptions = {
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  return (
    <React.Fragment>
      <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        <h6 className="mt-6">Jonathan Perry</h6>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Student
            </h5>
            <p>Id no: 10023464388</p>
            <p>Batch: 2020</p>
            <p>Program: MS</p>
            <p>Department: CSE</p>
            <p>Section: A</p>
            <p>CGPA: 3.5</p>
            <p>Phone: 01712345678</p>
            <p>Email: jperry@gmail.com</p>
            <p>Address: 123, ABC Street, Dallas, Texas, USA</p>
          </div>
          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Courses enrolled
            </h5>
            <p>1. CSE 5335 WEB Data Management By Elizabeth Diaz</p>
            <p>2. CSE 5338 Data Mining</p>
            <p>3. CSE 5245 Artificial Intelligence</p>
            <p>4. CSE 5300 Machine Learning</p>
          </div>
          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Course Percentage
            </h5>
            <Bar data={usersdata} options={usersoptions} />
          </div>
          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Assignments/Exams Submissions
            </h5>
            <Doughnut data={classdata} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
