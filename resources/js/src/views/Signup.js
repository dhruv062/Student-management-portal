import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Error from "../components/Error";
import axiosInstance from "../axiosConfig";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    // Set a timeout to clear the message after 2000 milliseconds
    const timeoutId = setTimeout(() => {
      setError("");
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [error]);
  const initialFormData = Object.freeze({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
    dob: "",
    phoneNumber: "",
    address: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function sendLoginData(formData) {
    axiosInstance
      .post("/api/register ", formData)
      .then((response) => {
        // console.log(response.data);
        alert(response.data.message);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error logging in:", error);

        toast.error(error.response.data.error);
      });
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (!validate(formData)) {
      return;
    }
    setLoading(true);
    sendLoginData(formData);
    setLoading(false);
  }
  return (
    <React.Fragment>
      {loading && <Loading />}

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
      {error && <Error message={error} />}

      <div className="mx-auto mt-12 max-w-xs md:max-w-2xl ">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              // max="2005-01-01"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role">Role</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="pc">PC</option>
              <option value="qao">QAO</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-primary   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-primary dark:focus-ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

function validate(formData) {
  if (formData.password.length < 8) {
    toast.error("Password must be atleast 8 characters long");

    return false;
  }
  if (formData.password !== formData.confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }
  const pattern =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!pattern.test(formData.phoneNumber)) {
    toast.error("Phone number is not valid.");
    return false;
  }
  // Calculate the user's age based on the date of birth
  const dob = new Date(formData.dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dob.getFullYear();

  if (age < 18) {
    toast.error("You must be at least 18 years old to register.");
    return false;
  }

  return true;
}
