import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { toast } from "react-toastify";
export default function Contact() {
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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("/api/contact/add_contact_request ", formData)
      .then((response) => {
        // Handle the response from the server (e.g., show a confirmation message).
        // console.log(response.data);
        toast.success("You request has been submitted successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Some error occured");
      });
  };

  return (
    <React.Fragment>
      <nav className="bg-white  dark:bg-gray-900 border-b-[1px] border-black">
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
            id="navbar-default"
          >
            <ul className="">
              <li>
                <NavLink to="/about" className="" aria-current="page">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="https://gxp5524.uta.cloud/">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="mx-auto mt-12 max-w-xs md:max-w-2xl ">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="First Name">First Name</label>
            <input
              type="name"
              value={formData.firstName}
              name="firstName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Last Name">Last Name</label>
            <input
              type="name"
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              value={formData.description}
              name="description"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-primary   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
