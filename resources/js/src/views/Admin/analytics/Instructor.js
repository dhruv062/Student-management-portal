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

export default () => {
  const { instructorId } = useParams();
  const [instructor, setInstructor] = React.useState();
  const [classes, setClasses] = React.useState();
  const [feedback, setFeedback] = React.useState();

  const createStars = (value) => {
    const totalStars = 5;
    const yellowStars = Math.round(value);
    const starArray = new Array(totalStars).fill(null);

    return starArray.map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < yellowStars ? "text-yellow-300" : "text-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    ));
  };

  useEffect(() => {
    axiosInstance
      .post("/api/users/get_user_by_id ", { user_id: instructorId })
      .then((response) => {
        // console.log(response.data);
        setInstructor(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  useEffect(() => {
    axiosInstance
      .post("/api/classes/get_instructor_classes ", {
        user_id: instructorId,
      })
      .then((response) => {
        // console.log(response.data);
        setClasses(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .post("/api/feedback/get_class_feedback ", {
        user_id: instructorId,
      })
      .then((response) => {
        // console.log(response.data);
        setFeedback(calculateInstructorRating(response.data));
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
        {instructor && (
          <h6 className="mt-6">
            {instructor.FirstName + " " + instructor.LastName}
          </h6>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {instructor && (
            <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Instructor
              </h5>
              <p>Program: MS</p>
              <p>Department: CSE</p>
              <p>Phone: {instructor.PhoneNumber}</p>
              <p>Email: {instructor.Email}</p>
              <p>Address: {instructor.Address}</p>
            </div>
          )}

          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Courses Teaching
            </h5>
            {classes &&
              classes.map((class_, id) => (
                <p id={class_.ID}>
                  {id +
                    1 +
                    " " +
                    class_.course_number +
                    " " +
                    class_.course_name}
                </p>
              ))}
          </div>
          <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ratings
            </h5>

            <div className="flex items-center space-x-1">
              {feedback && createStars(feedback)}
            </div>
          </div>
        </div>
        <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Course progress
          </h5>
          <CourseProgress />
        </div>
      </div>
    </React.Fragment>
  );
};

function calculateInstructorRating(feedbackData) {
  // Initialize variables to count and calculate the average rating
  let totalRating = 0;
  let feedbackCount = 0;

  // Iterate through the feedback data
  feedbackData.forEach((feedback) => {
    if (feedback.all_questions) {
      const feedbackObj = JSON.parse(feedback.all_questions);
      // Check if the feedback has numerical questions
      if (
        feedbackObj.q1 &&
        feedbackObj.q2 &&
        feedbackObj.q3 &&
        feedbackObj.q4 &&
        feedbackObj.q5 &&
        feedbackObj.q6 &&
        feedbackObj.q7 &&
        feedbackObj.q8
      ) {
        // Calculate the total rating for this feedback
        const numericalRating =
          feedbackObj.q1 +
          feedbackObj.q2 +
          feedbackObj.q3 +
          feedbackObj.q4 +
          feedbackObj.q5 +
          feedbackObj.q6 +
          feedbackObj.q7 +
          feedbackObj.q8;
        totalRating += numericalRating;
        feedbackCount++;
      }
    }
  });

  // Calculate the average rating
  const averageRating =
    feedbackCount > 0 ? totalRating / (feedbackCount * 8) : 0;

  return averageRating;
}

function CourseProgress() {
  const { instructorId } = useParams();

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
  useEffect(() => {
    axiosInstance
      .post("/api/analytics/get_course_progress_of_instructor ", {
        instructor_id: instructorId,
      })
      .then((response) => {
        // console.log(response.data);
        const course_progress_data = response.data;

        // Transform the course progress data
        const labels = [];
        const datasets = [...data.datasets]; // Clone the datasets

        course_progress_data.forEach((course) => {
          labels.push(course.course_name);
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
