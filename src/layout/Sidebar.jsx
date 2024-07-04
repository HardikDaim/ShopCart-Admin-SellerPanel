import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/reducers/authReducer";
import { SiTheregister } from "react-icons/si";

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
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-slate-800 dark:bg-slate-900 opacity-50"></div>
      )}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform transform bg-slate-50 dark:bg-slate-900 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-slate-50 dark:bg-slate-900">
          <ul className="space-y-2 font-medium">
            <li className="flex justify-center items-center">
              <Link
                to="/"
                className="text-2xl font-bold flex items-center text-slate-900 dark:text-slate-100"
              >
                <span className="text-blue-700">
                  <SiTheregister />
                </span>
                <span className="ml-1">ShopCart</span>
                <span className="text-xs ml-1 capitalize">
                  <sub>{role} Panel</sub>
                </span>
              </Link>
            </li>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "flex items-center p-2 text-slate-900 dark:text-slate-100 rounded-lg bg-slate-200 dark:bg-slate-800 group"
                      : "flex items-center p-2 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 group"
                  }`}
                >
                  <svg className="w-5 h-4 text-slate-500 dark:text-slate-400 transition duration-75 group-hover:text-slate-900 dark:group-hover:text-slate-100">
                    {n.icon}
                  </svg>
                  <span className="ms-1">{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="w-full flex items-center p-2 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 group"
              >
                <svg className="w-5 h-4 text-slate-500 dark:text-slate-400 transition duration-75 group-hover:text-slate-900 dark:group-hover:text-slate-100">
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
