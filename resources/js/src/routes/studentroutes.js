import { Route } from "react-router-dom";
import Layout from "../views/Student/Layout";
import Home from "../views/Student/Home";
import Profile from "../views/Student/Profile";
import Issues from "../views/Student/Issues";
import Courses from "../views/Student/Courses";
import Chat from "../views/Student/Chat";
import AddIssue from "../views/Student/AddIssue";
import CourseHome from "../views/Student/course/Home";
import CourseLayout from "../views/Student/course/Layout";
import CourseSyllabus from "../views/Student/course/Syllabus";
import CourseModules from "../views/Student/course/Modules";
import CourseAssignments from "../views/Student/course/Assignments";
import CourseGrades from "../views/Student/course/Grades";
import Issue from "../views/Student/Issue";
import Discussions from "../views/Student/Discussions";
import Discussion from "../views/Student/Discussion";
import Assignment from "../views/Student/course/Assignment";
import { UnviewedMessagesProvider } from "../contexts/UnviewedMessagesContext";
import EnrollClass from "../views/Student/EnrollClass";
import Feedbackform from "../views/Student/course/feedbackform";
import Guard from "../components/Guard";
import Exam from "../views/Student/course/Exam";
export default () => {
  return (
    <Route
      path="/student"
      element={
        <Guard role="student">
          <UnviewedMessagesProvider>
            <Layout />
          </UnviewedMessagesProvider>
        </Guard>
      }
    >
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="issues">
        <Route index element={<Issues />} />
        <Route path="addissue" element={<AddIssue />} />
        <Route path=":issueId" element={<Issue />} />
      </Route>
      <Route path="chat" element={<Chat />} />

      <Route path="courses">
        <Route index element={<Courses />} />

        {/* <Route path=":courseId" element={<Courses />} /> */}
        <Route path="enrollclass" element={<EnrollClass />} />
      </Route>
      <Route path="courses/:courseId/" element={<CourseLayout />}>
        <Route index element={<CourseHome />} />
        <Route path="syllabus" element={<CourseSyllabus />} />
        <Route path="modules" element={<CourseModules />} />
        <Route path="assignments" element={<CourseAssignments />} />
        {/* <Route path="assignments/:assignmentId" element={<Assignment />} /> */}
        <Route path="assignments/exam/:assignmentId" element={<Exam />} />
        <Route path="assignments/assignment/:assignmentId" element={<Assignment />} />

        <Route path="grades" element={<CourseGrades />} />
        <Route path="feedbackform" element={<Feedbackform />} />
      </Route>
      <Route path="discussions" element={<Discussions />} />

      <Route path="exam" element={<Exam />} />
      <Route path="discussions/:discussionId" element={<Discussion />} />
      {/* <Route path="course/:courseId" element={<CourseLayout />}>
        <Route path=":courseId" element={<Courses />} />
        <Route index element={<CourseHome />} />
        <Route path="syllabus" element={<CourseSyllabus />} />
        <Route path="modules" element={<CourseModules />} />
        <Route path="assignments" element={<CourseAssignments />} />
        <Route path="grades" element={<CourseGrades />} />
      </Route> */}
    </Route>
  );
};
