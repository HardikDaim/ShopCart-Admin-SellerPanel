import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/authReducer";

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar, toggleSidebar, role]);

  return (
    <>
      {showSidebar && (
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-gray-800 opacity-50"></div>
      )}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform transform bg-gray-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul className="space-y-2 font-medium">
            <li className="flex justify-center">
              <Link to="/">
                <img className="w-44 " src="/images/logo.png" alt="Logo" />
              </Link>
            </li>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "flex items-center p-2 text-gray-900 rounded-lg bg-gray-200  group"
                      : "flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
                  }`}
                >
                  <svg className="w-5 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 ">
                    {n.icon}
                  </svg>
                  <span className="ms-1">{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({navigate, role}))}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
              >
                <svg className="w-5 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900 ">
                  <IoLogOutSharp />
                </svg>
                <span className="ms-1">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
