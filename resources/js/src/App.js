import logo from "./logo.svg";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import Layout from "./views/Layout";
import Home from "./views/Home";
import About from "./views/About";
import Services from "./views/Services";
import Login from "./views/Login";
import LoginController from "./controllers/Login";
import Contact from "./views/Contact";
import Signup from "./views/Signup";
import FP from "./views/ForgotPassword";
import UP from "./views/UpdatePassword";
import studentroutes from "./routes/studentroutes";
import NotFound from "./components/NotFound";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import instructorroutes from "./routes/instructorroutes";
import adminroutes from "./routes/adminroutes";
import pcroutes from "./routes/pcroutes";
import qaoroutes from "./routes/qaoroutes";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PermissionsProvider } from "./contexts/PermissionsContext";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  const notify = () => toast("Wow so easy !");
  return (
    <React.Fragment>
      <PermissionsProvider>
        <ThemeProvider>
          <UserProvider>
            <SocketProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                  </Route>
                  <Route path="/contacts" element={<Contact />} />
                  <Route path="/login" element={<LoginController />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgotpassword" element={<FP />} />
                  <Route path="/reset-password" element={<UP />} />
                  <Route path="*" element={<NotFound />} />
                  {studentroutes()}
                  {instructorroutes()}
                  {adminroutes()}
                  {pcroutes()}
                  {qaoroutes()}
                </Routes>
              </BrowserRouter>
            </SocketProvider>
          </UserProvider>
          <ToastContainer />
        </ThemeProvider>
      </PermissionsProvider>
    </React.Fragment>
  );
}

export default App;
