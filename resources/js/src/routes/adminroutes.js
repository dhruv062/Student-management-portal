import { Route } from "react-router-dom";
import Layout from "../views/Admin/Layout";
import Home from "../views/Admin/Home";
import Profile from "../views/Student/Profile";
import Issues from "../views/Admin/Issues";
import Courses from "../views/Admin/Courses";
import Settings from "../views/Admin/Settings";
import AddCourse from "../views/Admin/AddCourse";
import AddIssue from "../views/Admin/AddIssue";
import CourseHome from "../views/Instructor/course/Home";
import CourseLayout from "../views/Instructor/course/Layout";
import CourseSyllabus from "../views/Instructor/course/Syllabus";
import CourseModules from "../views/Instructor/course/Modules";
import CourseAssignments from "../views/Instructor/course/Assignments";
import CoursePerformance from "../views/Instructor/course/Performance";

import Individualperformance from "../views/Instructor/course/individualperformance";
import Forum from "../views/Instructor/course/Forum";
import Submissions from "../views/Instructor/course/Submissions";
import Users from "../views/Admin/Users";
import AddUser from "../views/Admin/AddUser";
import Analytics from "../views/Admin/analytics/Analytics";
import AnalyticsLayout from "../views/Admin/analytics/Layout";
import StudentsAnalytics from "../views/Admin/analytics/Students";
import StudentAnalytics from "../views/Admin/analytics/Student";
import InstructorsAnalytics from "../views/Admin/analytics/Instructors";
import InstructorAnalytics from "../views/Admin/analytics/Instructor";
import CoordinatorsAnalytics from "../views/Admin/analytics/Coordinators";
import CoordinatorAnalytics from "../views/Admin/analytics/Coordinator";
import QaosAnalytics from "../views/Admin/analytics/Qaos";
import QaoAnalytics from "../views/Admin/analytics/Qao";
import Chat from "../views/Admin/Chat";
import Issue from "../views/Admin/Issue";
import { UnviewedMessagesProvider } from "../contexts/UnviewedMessagesContext";
import Guard from "../components/Guard";
import NewCourses from "../views/PC/Courses";
// import ContactRequests from "../views/Admin/Contacts";
import Discussion from "../views/Student/Discussion";



export default () => {
  return (
    <Route
      path="/admin"
      element={
        <Guard role="admin">
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
      <Route path="users">
        <Route index element={<Users />} />
        <Route path="adduser" element={<AddUser />} />
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
        </Route>
        <Route path="coordinators">
          <Route index element={<CoordinatorsAnalytics />} />
          <Route path=":coordinatorId" element={<CoordinatorAnalytics />} />
        </Route>
        <Route path="qaos">
          <Route index element={<QaosAnalytics />} />
          <Route path=":qaoId" element={<QaoAnalytics />} />
        </Route>
      </Route>
      <Route path="chat" element={<Chat />} />
      {/* <Route path="contacts" element={<ContactRequests />} /> */}
      <Route path="settings" element={<Settings />} />
    </Route>
  );
};

