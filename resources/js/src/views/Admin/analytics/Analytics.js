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
import axiosInstance from "../../../axiosConfig";

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
  const [usersdata, setUsersData] = React.useState({});
  const [coursesdata, setCoursesData] = React.useState({});
  const [error, setError] = React.useState("");
  const [classdata, setClassData] = React.useState({});

  useEffect(() => {
    // Define an array of URLs for your requests
    const urls = [
      "/api/analytics/get_no_of_users ",
      "/api/analytics/get_no_of_classes ",
    ];

    // Use Promise.all to send the requests concurrently
    Promise.all(urls.map((url) => axiosInstance.get(url)))
      .then((responses) => {
        // Handle the responses here and update the state for each set of data
        setUsersData({
          labels: responses[0].data.map((item) => item.Role),
          datasets: [
            {
              label: "Users",
              data: responses[0].data.map((item) => item.user_count),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
          ],
        });
        setCoursesData({
          labels: responses[1].data.map((item) => item.CourseName),
          datasets: [
            {
              label: "Classes",
              data: responses[1].data.map((item) => item.ClassesTaught),
              backgroundColor: [
                "rgb(255, 195, 55,0.8)",
                "rgb(54,162,235, 0.8)",
                "rgb(255,97,130, 1)",
                "rgb(92, 116, 87)",
                "rgb(255, 166, 158)",
              ],
            },
          ],
          options: {
            plugins: {
              datalabels: {
                display: false,
              },
            },
          },
        });
      })
      // setClassData({
      //     labels: ["Assignments", "Exams"],
      //     datasets: [
      //       {
      //         data: [25, 10],
      //         backgroundColor: [
      //           "rgb(255, 195, 55,0.8)",
      //           "rgb(54,162,235, 0.8)",
      //         ], // Customize the colors
      //       },
      //     ],
      //   });
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axiosInstance
      .post("/api/analytics/get_total_no_of_assignments_and_exams ")
      .then((response) => {
        // console.log(response.data);
        setClassData({
          labels: ["Assignments", "Exams"],
          datasets: [
            {
              data: [response.data["assignments"], response.data["exams"]],
              backgroundColor: [
                "rgb(255, 195, 55,0.8)",
                "rgb(54,162,235, 0.8)",
              ], // Customize the colors
            },
          ],
        });
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  }, []);

  // const usersdata = {
  //   labels: ["Students", "Instructors", "Coordinators", "QAO", "Admin"],
  //   datasets: [
  //     {
  //       label: "Users",
  //       data: [30, 20, 10, 5, 3],
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 2,
  //     },
  //   ],
  // };
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
      <h6 className="mt-6">Overall Stats</h6>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {" "}
              classes Conducted
            </h5>

            {Object.keys(coursesdata).length > 0 && (
              <Doughnut data={coursesdata} />
            )}
          </div>
        </div>

        <div>
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total No of Users
            </h5>
            {Object.keys(usersdata).length > 0 && (
              <Bar data={usersdata} options={usersoptions} />
            )}
          </div>
        </div>
        <div>
          <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Total Assignments / Exams conducted
            </h5>
            {Object.keys(classdata).length > 0 && <Doughnut data={classdata} />}
          </div>
        </div>
      </div>
      <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Course progress
        </h5>
        <CourseProgress />
      </div>
    </React.Fragment>
  );
};

function CourseProgress() {
  const [data, setData] = React.useState({
    labels: [],
    datasets: [
      {
        label: "Exams",
        data: [],
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "Modules",
        data: [],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Assignments",
        data: [],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Forums",
        data: [],
        backgroundColor: "rgb(92, 116, 87)",
      },
    ],
  });

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Course Progress",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  useEffect(() => {
    axiosInstance
      .post("/api/analytics/get_all_course_progress ")
      .then((response) => {
        // console.log(response.data);
        const course_progress_data = response.data;

        // Transform the course progress data
        const labels = [];
        const datasets = [...data.datasets]; // Clone the datasets

        course_progress_data.forEach((course) => {
          labels.push(course.class_number + " - " + course.course_name);
          datasets[0].data.push(course.exam_count);
          datasets[1].data.push(course.module_count);
          datasets[2].data.push(course.assignment_count);
          datasets[3].data.push(course.forum_count);
        });

        // Update the state with the transformed data
        setData({ labels, datasets });
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <Bar options={options} data={data} />
    </React.Fragment>
  );
}
