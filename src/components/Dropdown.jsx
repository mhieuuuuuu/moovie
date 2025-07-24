import React, { useState } from "react";
import { Link } from "react-router";

const Dropdown = (props) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <ul
        className={
          dropdown
            ? "w-30 absolute top-[55px] bg-white list-none text-left z-10 rounded-xl overflow-hidden hidden"
            : "w-30 absolute top-[55px] bg-white list-none text-left z-10 rounded-xl overflow-hidden shadow-[-4px_0_8px_rgba(0,0,0,0.1),4px_0_8px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.15)]"
        }
        onClick={() => setDropdown(!dropdown)}
      >
        {props.data.map((item) => {
          return (
            <li key={item.id} className="bg-white cursor-pointer m-2 ">
              <Link
                to={item.path}
                className="text-[#868686] w-full h-[30px] no-underline text-s p-4 hover:text-black"
                onClick={() => setDropdown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
