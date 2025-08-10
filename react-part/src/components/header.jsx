import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useUserContext } from "../context/UserContext";
import {logOut} from '../apis/api'

function Header() {
  const cookie = new Cookies()
  const [UIHeader,setUIHeader]=useState(cookie.get('Bearer') )
  const {  setUserContext } = useUserContext();
  function handleLogOut() {
    // cookie.set("Bearer", null);
    logOut()
    cookie.remove("Bearer");
    setUserContext({})
    window.location.pathname = "/";
  }
  return (
    <div className="bg-blue-300 m-2 rounded-md shadow-lg">
      <div className="container flex justify-between items-center py-5">
        <div className="flex gap-6 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            About
          </Link>
        </div>

        {UIHeader ? (
          <div className="flex gap-4">
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-md transition-colors duration-300 shadow-md"
            >
              Dashboard
            </Link>
            <Link
              onClick={handleLogOut}
              className="bg-red-500 text-white hover:bg-red-600 px-5 py-2 rounded-md transition-colors duration-300 shadow-md"
            >
              Log Out
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 text-white hover:bg-blue-600 px-5 py-2 rounded-md transition-colors duration-300 shadow-md"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-500 hover:bg-blue-50 border border-blue-500 px-5 py-2 rounded-md transition-colors duration-300 shadow-md"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
