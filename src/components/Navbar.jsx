import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router";
import { MovieDropdown, PeopleDropdown, TVDropdown } from "./NavItems";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { User, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [dropdownTV, setDropdownTV] = useState(false);
  const [dropdownPeople, setDropdownPeople] = useState(false);
  const { currentUser } = useAuth();
  return (
    <>
      <div className="w-screen h-[64px] block "></div>
      <div className="fixed z-[100] top-0 h-[64px] w-screen flex items-center justify-between pt-4 pb-4 pl-10 pr-10 mb-10 bg-surface">
        <div className="w-[50%] flex justify-start items-center gap-10">
          <Link to="/">
            <div className="h-[32px] font-bold text-2xl text-white">MOOVIE</div>
          </Link>
          <a
            className="flex items-center h-[64px]"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <a href="#" className="text-xl text-white">
              Movies
            </a>

            {dropdown && <Dropdown data={MovieDropdown} />}
          </a>
          <a
            className="flex items-center h-[64px]"
            onMouseEnter={() => setDropdownTV(true)}
            onMouseLeave={() => setDropdownTV(false)}
          >
            <a href="#" className="text-xl text-white">
              TV Shows
            </a>

            {dropdownTV && <Dropdown data={TVDropdown} />}
          </a>
          <a
            className="flex items-center h-[64px]"
            onMouseEnter={() => setDropdownPeople(true)}
            onMouseLeave={() => setDropdownPeople(false)}
          >
            <a href="#" className="text-xl text-white">
              People
            </a>

            {dropdownPeople && <Dropdown data={PeopleDropdown} />}
          </a>
        </div>
        <div className="w-[50%] flex justify-end">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-xl text-white">
                Hello, {currentUser.displayName || currentUser.email}
              </span>
              <Link to="/profile">
                <User size={24} className="text-white hover:text-hover" />
              </Link>

              <div className="flex justify-between items-center ">
                <button
                  onClick={() => signOut(auth)}
                  className="text-white text-lg font-bold hover:text-hover "
                >
                  <LogOut size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center ">
              <Link
                to="/login"
                className="text-white text-lg font-bold hover:text-hover "
              >
                <LogIn size={24} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
