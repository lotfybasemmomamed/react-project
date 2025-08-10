import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="flex">
        <SideBar />
        <div className="w-[70%] ">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
