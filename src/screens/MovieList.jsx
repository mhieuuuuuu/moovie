import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShowList from "../components/ShowList";
import { Outlet } from "react-router";

const MovieList = () => {
  return (
    <div className="w-screen h-full bg-background">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MovieList;
