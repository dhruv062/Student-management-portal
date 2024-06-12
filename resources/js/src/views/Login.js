import axiosInstance from "../axiosConfig";
import React, { useState } from "react";
import Error from "../components/Error";
import { NavLink, Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("message")) {
      toast.success(searchParams.get("message"), {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
    } else if (searchParams.get("error")) {
      toast.error(searchParams.get("error"), {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
      });
    }
  }, []);

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
  function sendLoginData(email, password) {
    axiosInstance
      .post("/api/login ", {
        email: email,
        password: password,
      })
      .then((response) => {
        // console.log(response);
        if (response.data) {
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("id", response.data.id);
        }
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        toast.error("Invalid email or password", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
        // setError("Invalid email or password");
      });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    sendLoginData(email, password);
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
      <div className=" mx-auto mt-12 max-w-xs md:max-w-2xl ">
        <h2 className="text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="name@skillify.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">Password</label>

            {showPassword ? (
              <input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="text" // Show password in plain text
                placeholder="********"
                required
              />
            ) : (
              <input
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password" // Hide password
                placeholder="********"
                required
              />
            )}

            <div className="mb-6">
              <input
                className="w-4 inline"
                type="checkbox"
                id="showPassword"
                onChange={() => setShowPassword(!showPassword)}
                checked={showPassword}
              />
              <label
                htmlFor="showPassword"
                className="text-sm inline ml-2 cursor-pointer"
              >
                Show Password
              </label>
            </div>
          </div>
          <div className="flex">
            <NavLink
              to={"/forgotpassword"}
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Forgot Password?
            </NavLink>
          </div>
          <button
            type="submit"
            className="text-white bg-primary   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-primary dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <div className="text-sm my-4 font-medium text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <NavLink
            to={"/signup"}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}
