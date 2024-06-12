import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";
export default function Header() {
  const loggedIn = localStorage.getItem("role");
  // console.log(loggedIn);

  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [smallSize, setSmallSize] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleScreenSizeChange = (event) => {
      setSmallSize(event.matches);
      if (event.matches) {
        // Close the sidebar when the screen size is small
        setNavbarOpen(false);
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
    <nav className="bg-white top-0 fixed w-full z-10 border-b-[1px] border-black dark:bg-gray-900">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4 md:px-16">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
            Skillify
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={toggleNavbar}
        >
          <span className="sr-only">Open main menu</span>

          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`mainnav ${isNavbarOpen || !smallSize ? "" : "hidden"}`}
        >
          <ul className="">
            <li>
              <NavLink
                to="about"
                className=""
                aria-current="page"
                onClick={closeNavbar}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="services" onClick={closeNavbar}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="https://gxp5524.uta.cloud/" onClick={closeNavbar}>
                Blog
              </NavLink>
            </li>
            {!loggedIn ? (
              <React.Fragment>
                <li>
                  <NavLink to="contacts" onClick={closeNavbar}>
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="login" onClick={closeNavbar}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="signup" onClick={closeNavbar}>
                    Signup
                  </NavLink>
                </li>
              </React.Fragment>
            ) : (
              <li>
                <NavLink to="/login" onClick={closeNavbar}>
                  Home
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
