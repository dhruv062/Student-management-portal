import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
export default () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [smallSize, setSmallSize] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleScreenSizeChange = (event) => {
      setSmallSize(event.matches);
      if (event.matches) {
        // Close the sidebar when the screen size is small
        setSidebarOpen(false);
      }
    };

    // Add an event listener for screen size changes
    mediaQuery.addEventListener("change", handleScreenSizeChange);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);

  return (
    <React.Fragment>
      <Navbar toggleSidebar={toggleSidebar} />
      {(isSidebarOpen || !smallSize) && <Sidebar closeSidebar={closeSidebar} />}
      {/* <Sidebar /> */}
      <div className="my-auto p-4 pt-20 md:p-6 md:mt-20  md:ml-64">
        <Outlet />
      </div>
    </React.Fragment>
  );
};
