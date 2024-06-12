import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import Error from "../components/Error";
export default function Forgot() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("/api/forgot_password ", {
        email: email,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.error) {
          setError(response.data.error);
          return;
        }
        setReplyMessage("Password reset link sent to your email address.");
      })
      .catch((error) => {
        // console.log(error.response.data);
        setError(error.response.data.error);
      });
  }
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
          <div className="mainnav hidden" id="navbar-default">
            <ul className="">
              <li>
                <NavLink to="/about" className="" aria-current="page">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <NavLink to="https://gxp5524.uta.cloud/">Blog</NavLink>

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

      <div className="mx-auto mt-12 max-w-xs md:max-w-2xl">
        <h2>Forgot Password</h2>
        {replyMessage.length > 0 ? (
          <p>{replyMessage}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6 mt-24">
              {error.length > 0 && <Error message={error} />}

              <label for="Email">Email</label>
              <input
                type="email"
                placeholder="name@skillify.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        )}
      </div>
    </React.Fragment>
  );
}
