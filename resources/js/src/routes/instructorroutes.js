import { Route } from "react-router-dom";
import Layout from "../views/Instructor/Layout";
import Home from "../views/Instructor/Home";
import Profile from "../views/Student/Profile";
import Issues from "../views/Student/Issues";
import Courses from "../views/Instructor/Courses";
import Chat from "../views/Instructor/Chat";
import AddIssue from "../views/Instructor/AddIssue";
import CourseHome from "../views/Instructor/course/Home";
import CourseLayout from "../views/Instructor/course/Layout";
import CourseSyllabus from "../views/Instructor/course/Syllabus";
import CourseModules from "../views/Instructor/course/Modules";
import CourseAssignments from "../views/Instructor/course/Assignments";
import CoursePerformance from "../views/Instructor/course/Performance";
import Individualperformance from "../views/Instructor/course/individualperformance";

import Forum from "../views/Instructor/course/Forum";
import Submissions from "../views/Instructor/course/Submissions";
import AddCourse from "../views/Instructor/AddCourse";
import Issue from "../views/Student/Issue";
import { UnviewedMessagesProvider } from "../contexts/UnviewedMessagesContext";
import Discussion from "../views/Student/Discussion";
import Guard from "../components/Guard";


export default () => {
  return (
    <Route
      path="/instructor"
      element={
        <Guard role="instructor">
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

      <Route path="courses">
        <Route index element={<Courses />} />
        <Route path="addcourse" element={<AddCourse />} />
      </Route>
      <Route path="chat" element={<Chat />} />

      <Route path="courses/:courseId/" element={<CourseLayout />}>
        <Route index element={<CourseHome />} />
        <Route path="syllabus" element={<CourseSyllabus />} />
        <Route path="modules" element={<CourseModules />} />
        <Route path="assignments" element={<CourseAssignments />} />
        <Route path="performance">
          <Route index element={<CoursePerformance />} />
          <Route path=":studentId" element={<Individualperformance />} />
        </Route>

        <Route path="forum" element={<Forum />} />
        <Route path="forum/:discussionId" element={<Discussion />} />
        <Route
          path="assignments/:assignmentId/submissions"
          element={<Submissions />}
        />
      </Route>
    </Route>
  );
};

