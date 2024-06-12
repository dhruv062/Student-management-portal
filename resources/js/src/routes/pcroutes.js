import { Route } from "react-router-dom";
import Layout from "../views/PC/Layout";
import Home from "../views/PC/Home";
import Profile from "../views/Student/Profile";

import Inquiries from "../views/PC/Inquiries";
import Analytics from "../views/Admin/analytics/Analytics";
import AnalyticsLayout from "../views/PC/analytics/Layout";
import StudentsAnalytics from "../views/Admin/analytics/Students";
import StudentAnalytics from "../views/Admin/analytics/Student";
import InstructorsAnalytics from "../views/Admin/analytics/Instructors";
import InstructorAnalytics from "../views/Admin/analytics/Instructor";
import Chat from "../views/PC/Chat";
import Issues from "../views/Admin/Issues";
import AddIssue from "../views/Admin/AddIssue";
import Issue from "../views/Admin/Issue";
import Courses from "../views/Admin/Courses";
import CourseHome from "../views/Instructor/course/Home";
import CourseLayout from "../views/Instructor/course/Layout";
import CourseSyllabus from "../views/Instructor/course/Syllabus";
import CourseModules from "../views/Instructor/course/Modules";
import CourseAssignments from "../views/Instructor/course/Assignments";
import CoursePerformance from "../views/Instructor/course/Performance";
import Forum from "../views/Instructor/course/Forum";
import Submissions from "../views/Instructor/course/Submissions";

import Individualperformance from "../views/Instructor/course/individualperformance";
import { UnviewedMessagesProvider } from "../contexts/UnviewedMessagesContext";

import Guard from "../components/Guard";
import Discussion from "../views/Student/Discussion";

import NewCourses from "../views/PC/Courses";

export default () => {
  return (
    <Route
      path="/pc"
      element={
        <Guard role="pc">
          <UnviewedMessagesProvider>
            <Layout />
          </UnviewedMessagesProvider>
        </Guard>
      }
    >
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="inquiry">
        <Route index element={<Inquiries />} />
        <Route path="addissue" element={<AddIssue />} />
        <Route path=":issueId" element={<Issue />} />
      </Route>
      <Route path="courses">
        <Route index element={<Courses />} />
        <Route path="managecourses" element={<NewCourses />} />
      </Route>
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
      <Route path="analytics" element={<AnalyticsLayout />}>
        <Route index element={<Analytics />} />
        <Route path="students">
          <Route index element={<StudentsAnalytics />} />
          <Route path=":studentId" element={<StudentAnalytics />} />
        </Route>
        <Route path="instructors">
          <Route index element={<InstructorsAnalytics />} />
          <Route path=":instructorId" element={<InstructorAnalytics />} />
        </Route>{" "}
      </Route>
      <Route path="chat" element={<Chat />} />
    </Route>
  );
};
