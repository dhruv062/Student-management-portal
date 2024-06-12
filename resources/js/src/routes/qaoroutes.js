import { Route } from "react-router-dom";
import Layout from "../views/QAO/Layout";
import Home from "../views/QAO/Home";
import Profile from "../views/Student/Profile";

import Policies from "../views/QAO/Policies";
import StudentsAnalytics from "../views/Admin/analytics/Students";
import StudentAnalytics from "../views/Admin/analytics/Student";
import Reports from "../views/QAO/Reports";
import Chat from "../views/QAO/Chat";
import { UnviewedMessagesProvider } from "../contexts/UnviewedMessagesContext";

import Guard from "../components/Guard";
export default () => {
  return (
    <Route
      path="/qao"
      element={
        <Guard role="qao">
          <UnviewedMessagesProvider>
            <Layout />
          </UnviewedMessagesProvider>
        </Guard>
      }
    >
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="policies" element={<Policies />} />

      <Route path="analytics">
        <Route path="students">
          <Route index element={<StudentsAnalytics />} />
          <Route path=":studentId" element={<StudentAnalytics />} />
        </Route>
      </Route>
      <Route path="reports" element={<Reports />} />
      <Route path="chat" element={<Chat />} />
    </Route>
  );
};
