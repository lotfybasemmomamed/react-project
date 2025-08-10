import React from "react";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <div className=" p-6 flex justify-between shadow-md">
      <Link to={"/dashboard"} className="text-2xl text-blue-500 hover:text-blue-600">Dashboard</Link>
      <Link to={"/"} className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-md transition-colors duration-300 shadow-md">
        Go To Website
      </Link>
    </div>
  );
}

export default TopBar;
