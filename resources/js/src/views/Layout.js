import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import React from "react";
export default function Layout({ children }) {
  // console.log(children);
  return (
    <React.Fragment>
      <Header />

      <Outlet />
    </React.Fragment>
  );
}
