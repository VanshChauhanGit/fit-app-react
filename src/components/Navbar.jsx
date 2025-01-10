import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaRunning } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { BsLightningCharge } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 items-center w-full px-6 py-2 text-white bg-black md:hidden md:w-auto">
        <div className="flex items-center gap-2 text-2xl font-bold text-primary">
          Fit <BsLightningCharge size={24} />
        </div>
      </nav>
      <nav className="fixed bottom-0 z-50 w-full text-white bg-black md:fixed md:top-0 md:w md:h-20 md:w-full md:flex md:items-center md:px-8 md:py-4">
        {/* Desktop App Name */}
        <div className="hidden gap-2 text-2xl font-bold md:flex md:items-center text-primary">
          Fit <BsLightningCharge size={24} />
        </div>
        <div className="flex items-center justify-around md:ml-auto">
          {/* Dashboard Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaHome size={24} />
            <span className="text-sm">Dashboard</span>
          </NavLink>
          {/* Workout Plan Link */}
          <NavLink
            to="/workoutplan"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <AiFillSchedule size={24} />
            <span className="text-sm">Workout Plan</span>
          </NavLink>
          {/* Workout Link */}
          <NavLink
            to="/workout"
            className={({ isActive }) =>
              `flex flex-col items-center px-4 py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaRunning size={24} />
            <span className="text-sm">Workout</span>
          </NavLink>
          {/* Profile Link */}
          {/* <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center px-4 py-2 ${
              isActive ? "text-primary" : "text-gray-400"
            }`
          }
        >
          <FaUser size={24} />
          <span className="text-sm">Profile</span>
        </NavLink> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
