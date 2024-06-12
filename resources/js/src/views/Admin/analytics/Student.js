import React, { useEffect } from "react";
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
import { useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

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
  const { studentId } = useParams();
  const [student, setStudent] = React.useState();
  const [classes, setClasses] = React.useState();
  useEffect(() => {
    axiosInstance
      .post("/api/users/get_user_by_id ", { user_id: studentId })
      .then((response) => {
        // console.log(response.data);
        setStudent(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  useEffect(() => {
    axiosInstance
      .post("/api/classes/get_user_enrolled_classes ", {
        user_id: studentId,
      })
      .then((response) => {
        // console.log(response.data);
        setClasses(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
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
        {student && (
          <h6 className="mt-6">{student.FirstName + " " + student.LastName}</h6>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {student && (
            <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Student
              </h5>
              <p>Program: MS</p>
              <p>Department: CSE</p>
              <p>Phone: {student.PhoneNumber}</p>
              <p>Email: {student.Email}</p>
              <p>Address: {student.Address}</p>
            </div>
          )}

          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Courses enrolled
            </h5>
            {classes && classes.length > 0 ? (
              classes.map((class_, id) => (
                <p id={class_.ID}>
                  {id +
                    1 +
                    " " +
                    class_.Number +
                    " " +
                    class_.Name +
                    " By " +
                    class_.instructor_first_name +
                    " " +
                    class_.instructor_last_name}
                </p>
              ))
            ) : (
              <p>No courses enrolled</p>
            )}
          </div>
        </div>
        <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Assignments/Exams Submissions
          </h5>
          <StudentProgress />
        </div>
      </div>
    </React.Fragment>
  );
};

function StudentProgress() {
  const [data, setData] = React.useState([]);
  const { studentId } = useParams();

  useEffect(() => {
    // Replace with your backend API endpoint
    axiosInstance
      .post("api/analytics/get_student_stats ", { student_id: studentId })
      .then((response) => {
        setData(response.data); // Assuming the API response is an array of data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (data.length === 0) {
    return <div> No results found</div>; // Display a loading message while fetching data
  }

  // Extract unique course names
  const courseNames = Array.from(new Set(data.map((item) => item.course_name)));

  // Define RGB colors
  const colors = ["rgb(75, 192, 192)", "rgb(92, 116, 87)"];

  // Create separate datasets for grades and total marks for each course
  const chartData = {
    labels: data.map((item) => item.assignment_or_exam_name),
    datasets: courseNames.flatMap((courseName, index) => [
      {
        label: `${courseName} - Grades`,
        data: data
          .filter((item) => item.course_name === courseName)
          .map((item) => item.assignment_or_exam_grade),
        backgroundColor: colors[0], // Use the first color for grades
        stack: `group${index}`,
      },
      {
        label: `${courseName} - Total Marks`,
        data: data
          .filter((item) => item.course_name === courseName)
          .map((item) => item.assignment_or_exam_total_marks),
        backgroundColor: colors[1], // Use the second color for total marks
        stack: `group${index}`,
      },
    ]),
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
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
