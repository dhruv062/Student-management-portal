import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useUnviewedMessages } from "../../contexts/UnviewedMessagesContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default () => {
  return (
    <div className="">
      <ProgramOverview />
    </div>
  );
};

function ChatTile({ chat }) {
  return (
    <li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-50">
      <Link>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {chat.SenderFirstName[0]}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {chat.SenderFirstName + " " + chat.SenderLastName}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {chat.Message}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {new Date(chat.TimeStamp)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")}
          </div>
        </div>
      </Link>
    </li>
  );
}

function AssignmentTile({ assignment }) {
  return (
    <li className="py-3 sm:py-4 cursor-pointer hover:bg-gray-50">
      <Link
        to={`courses/${assignment.class_id}/assignments/${assignment.assignment_id}/`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {assignment.course_name[1]}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {assignment.assignment_name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {assignment.course_name}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {assignment.assignment_due_date}
          </div>
        </div>
      </Link>
    </li>
  );
}

function AssignmentBox() {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    axiosInstance
      .post("/api/assignments/get_assignments_by_student ")
      .then((response) => {
        // console.log(response.data);
        setAssignments(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="w-full  p-4 bg-white border  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Recent Assignments
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {assignments.map((assignment) => {
              return <AssignmentTile assignment={assignment} />;
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
function ChatBox() {
  const { unviewedMessages } = useUnviewedMessages();

  return (
    <div className="w-full  p-4 bg-white border  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-primary dark:text-white">
          New Chats
        </h5>
        <Link
          to="#"
          className="text-sm font-medium text-primary hover:underline dark:text-blue-500"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {unviewedMessages.length > 0 ? (
            unviewedMessages.map((chat) => {
              return <ChatTile chat={chat} />;
            })
          ) : (
            <p className="font-normal text-gray-700 dark:text-gray-400">
              No New Messages
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

function Discussions() {
  return (
    <Link
      to="#"
      className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Discussions
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        No New Discussions
      </p>
    </Link>
  );
}

function CoursesEnrolled() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    axiosInstance
      .post("/api/classes/total_classes_enrolled_by_id ")
      .then((response) => {
        setNumber(response.data.num_classes);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <Link
      to="#"
      className="block  p-6  border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
        Total Courses Enrolled
      </h5>
      <p className="font-normal text-gray-400">
        <h6 className="text-white">{number}</h6>
      </p>
    </Link>
  );
}

function ProgramOverview() {
  return (
    <React.Fragment>
      <div
        // style={{ backgroundImage: "url(/images/cs.jpeg)" }}

        className=" py-16 bg-primary flex flex-col items-center justify-center"
      ></div>
      <section>
        <h6 className="text-primary my-12 text-center">
          Hello Student, Welcome to MS CS portal{" "}
        </h6>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <Link
            to="#"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white text-center"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Home
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Explore the welcome page and announcements.
            </p>
          </Link>

          <Link
            to="profile"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white text-center"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Profile
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Manage your profile information.
            </p>
          </Link>

          <Link
            to="issues"
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-white text-center"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark-text-white">
              Issues
            </h5>
            <p className="font-normal text-gray-700 dark-text-gray-400">
              Report and track any issues related to the platform.
            </p>
          </Link>

          <Link
            to="chat"
            className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700 text-white text-center dark-bg-purple-200 dark-border-purple-400 dark-hover-bg-purple-300 dark-text-black"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark-text-black">
              Chat
            </h5>
            <p className="font-normal text-white dark-text-black">
              Engage in real-time chat with other users.
            </p>
          </Link>

          <Link
            to="courses"
            className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700 text-white text-center dark-bg-blue-200 dark-border-blue-400 dark-hover-bg-blue-300 dark-text-black"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark-text-black">
              Courses
            </h5>
            <p className="font-normal text-white dark-text-black">
              Access your enrolled courses and view assignments.
            </p>
          </Link>

          <Link
            to="discussions"
            className="block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover-bg-gray-700 text-white text-center dark-bg-orange-200 dark-border-orange-400 dark-hover-bg-orange-300 dark-text-black"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark-text-black">
              Discussions
            </h5>
            <p className="font-normal text-white dark-text-black">
              Participate in course-related discussions.
            </p>
          </Link>
        </div>
        <div className="p-4"></div>
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          <AssignmentBox />

          {/* <ChatBox /> */}

          {/* <CoursesEnrolled /> */}
        </div>
        <Overview />
      </section>
    </React.Fragment>
  );
}

function Backup() {
  return (
    <div>
      <div className="mb-4">
        <Discussions />
      </div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        <AssignmentBox />
        {/* <AssignmentBox /> */}
        <ChatBox />
        <CoursesEnrolled />
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h6 className="mt-12">MS CS Program Overview</h6>

      <h6 className="text-xl mt-4 text-primary mb-0">About the Course</h6>
      <p>
        The MS CS program is designed to provide students with a deep
        understanding of advanced computer science topics. It covers areas such
        as algorithms, artificial intelligence, data science, and cybersecurity,
        ensuring that graduates are technically proficient.
      </p>

      <h6 className="text-xl mt-4 text-primary mb-0">Key Program Highlights</h6>
      <ul>
        <li>
          <strong>Advanced Technical Expertise:</strong> The program equips
          students with in-depth knowledge of advanced computer science
          concepts.
        </li>
        <li>
          <strong>Research and Innovation:</strong> Emphasizes research as a
          cornerstone, fostering innovation and development of new technologies.
        </li>
        <li>
          <strong>Practical Application:</strong> Students have access to
          state-of-the-art labs and work on real-world projects.
        </li>
        <li>
          <strong>Interdisciplinary Learning:</strong> Promotes the application
          of computer science in various industries and domains.
        </li>
        <li>
          <strong>Ethical and Social Responsibility:</strong> Instills a strong
          sense of ethics and social responsibility in graduates.
        </li>
      </ul>

      <h6 className="text-xl mt-4 text-primary mb-0">
        Importance of Performance Measurement and Assessment
      </h6>
      <p>
        Performance measurement and assessment are vital for the program's
        success and continuous improvement:
      </p>
      <ul>
        <li>
          <strong>Student Success:</strong> Identifies students who may need
          additional support to succeed.
        </li>
        <li>
          <strong>Continuous Improvement:</strong> Helps the program evolve to
          keep pace with the rapidly changing field of computer science.
        </li>
        <li>
          <strong>Personalized Learning:</strong> Empowers students to tailor
          their academic path to their interests and career goals.
        </li>
        <li>
          <strong>Research Excellence:</strong> Identifies students with
          exceptional research potential for advanced research projects.
        </li>
        <li>
          <strong>Industry Alignment:</strong> Ensures graduates possess skills
          sought after by industry leaders.
        </li>
        <li>
          <strong>Accreditation and Recognition:</strong> Signals program
          quality and student competence, enhancing graduates' job market
          prospects.
        </li>
      </ul>

      <h6 className=" mt-12 ">Sample List of MS CS Program Courses</h6>

      <h6 className="text-xl mt-4 text-primary mb-0">
        Algorithms and Data Structures
      </h6>
      <p>
        <strong>Course Objectives:</strong> This course aims to provide students
        with a strong foundation in algorithms and data structures, enabling
        them to design efficient algorithms and analyze their complexity.
      </p>
      <p>
        <strong>Course Content:</strong> Topics include sorting algorithms,
        graph algorithms, data structures like trees and heaps, and algorithmic
        problem-solving.
      </p>
      <p>
        <strong>Additional Information:</strong> Prerequisite - Bachelor's-level
        data structures and programming.
      </p>

      <h6 className="text-xl mt-4 text-primary mb-0">Machine Learning</h6>
      <p>
        <strong>Course Objectives:</strong> Explore machine learning techniques,
        understand their theoretical foundations, and apply them to real-world
        problems.
      </p>
      <p>
        <strong>Course Content:</strong> Topics include supervised and
        unsupervised learning, deep learning, and practical machine learning
        applications.
      </p>
      <p>
        <strong>Additional Information:</strong> Prerequisites - Linear algebra,
        statistics, and programming skills.
      </p>

      <h6 className="text-xl mt-4 text-primary mb-0">Software Engineering</h6>
      <p>
        <strong>Course Objectives:</strong> Develop skills in software design,
        architecture, and project management, with a focus on producing
        high-quality software.
      </p>
      <p>
        <strong>Course Content:</strong> Topics include software development
        methodologies, design patterns, testing, and project management.
      </p>
      <p>
        <strong>Additional Information:</strong> No prerequisites.
      </p>

      <h6 className="text-xl mt-4 text-primary mb-0">
        Cybersecurity and Network Defense
      </h6>
      <p>
        <strong>Course Objectives:</strong> Explore cybersecurity principles,
        threats, and defensive strategies to secure computer systems and
        networks.
      </p>
      <p>
        <strong>Course Content:</strong> Topics include cryptography, network
        security, ethical hacking, and security best practices.
      </p>
      <p>
        <strong>Additional Information:</strong> Prerequisite - Basic
        understanding of networking.
      </p>
    </div>
  );
}
