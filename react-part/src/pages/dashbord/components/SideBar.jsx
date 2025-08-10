import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="w-[30%] h-[100vh] pt-5 "
      style={{ boxShadow: "4px 0 6px rgba(0,0,0,0.1)" }}
    >
      <Link to={"/dashboard/users"}>
        <p className="bg-green-300 w-[90%] m-auto text-center rounded-[10px] py-2 mb-5 cursor-pointer hover:bg-green-200">
          Users
        </p>
      </Link>
    </div>
  );
}

export default SideBar;
