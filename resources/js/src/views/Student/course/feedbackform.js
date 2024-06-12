import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const { courseId } = useParams();
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(true);
  useEffect(() => {
    axiosInstance
      .post("/api/feedback/feed_back_already_exists ", {
        class_id: courseId,
        student_id: localStorage.getItem("id"),
      })
      .then((response) => {
        // console.log(response.data);
        setInitialLoaded(true);
        if (response.data.message == "Already exists") {
          setAlreadySubmitted(true);
        } else {
          setAlreadySubmitted(false);
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error("Some Error Occured");
      });
  }, []);

  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/api/feedback/add_feedback ", {
        class_id: courseId,
        student_id: localStorage.getItem("id"),
        all_questions: JSON.stringify(feedback),
      })
      .then((response) => {
        // console.log(response.data);
        setAlreadySubmitted(true);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(`Some Error Occured ${error}`);
      });
  };

  return (
    <div>
      {initialLoaded && alreadySubmitted && (
        <div> Feedback Already Submitted. Thank you!</div>
      )}
      {initialLoaded && !alreadySubmitted && (
        <div>
          <h6 className="mt-2 md:mt-6 ">Course/Instructor Evaluation</h6>
          <form onSubmit={handleSubmit}>
            <p className="font-bold">
              Please rate the following statements on a scale of 1 to 5, with 1
              being strongly disagree and 5 being strongly agree:
            </p>

            <ol className="[&>*]:py-4">
              <li>
                The course content was well-organized and easy to follow.
                <input
                  type="number"
                  name="q1"
                  min="1"
                  max="5"
                  value={feedback.q1}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                The instructor explained the material clearly and effectively.
                <input
                  type="number"
                  name="q2"
                  min="1"
                  max="5"
                  value={feedback.q2}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                The instructor was knowledgeable about the subject matter.
                <input
                  type="number"
                  name="q3"
                  min="1"
                  max="5"
                  value={feedback.q3}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                The course materials (e.g., textbooks, handouts) were helpful.
                <input
                  type="number"
                  name="q4"
                  min="1"
                  max="5"
                  value={feedback.q4}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                The instructor provided prompt and constructive feedback on
                assignments and assessments.
                <input
                  type="number"
                  name="q5"
                  min="1"
                  max="5"
                  value={feedback.q5}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                The instructor encouraged class participation and discussion.
                <input
                  type="number"
                  name="q6"
                  min="1"
                  max="5"
                  value={feedback.q6}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                The course assessments (exams, quizzes, assignments) were fair
                and relevant.
                <input
                  type="number"
                  name="q7"
                  min="1"
                  max="5"
                  value={feedback.q7}
                  onChange={handleChange}
                  required
                />
              </li>
              <li>
                Overall, I found the course to be a valuable learning
                experience.
                <input
                  type="number"
                  name="q8"
                  min="1"
                  max="5"
                  value={feedback.q8}
                  onChange={handleChange}
                  required
                />
              </li>
            </ol>

            <label htmlFor="q9">
              What aspects of the course or instruction do you think worked
              particularly well?
            </label>
            <textarea
              id="q9"
              name="q9"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={feedback.q9}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="q10">
              Are there any areas where you believe improvements are needed?
              Please provide suggestions or comments.
            </label>
            <textarea
              id="q10"
              name="q10"
              rows="4"
              value={feedback.q10}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="q11">
              Do you have any additional comments or feedback you would like to
              share with us?
            </label>
            <textarea
              id="q11"
              name="q11"
              rows="4"
              value={feedback.q11}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              required
            ></textarea>

            <input
              className="mt-4 bg-primary text-white"
              type="submit"
              value="Submit Feedback"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
