import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ showSidebar, toggleSidebar }) => {
  const { userInfo, role } = useSelector((state) => state.auth);
  
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-50 py-1.5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[260px] transition-all">
        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => toggleSidebar(!showSidebar)}
              className="lg:hidden"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <form className="max-w-auto-full mx-auto hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-12 py-3 text-sm text-gray-900 border-2 outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-500 "
                  placeholder="Search here"
                  required
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center justify-center px-2  m-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-row justify-center gap-x-2">
            <div className="flex flex-col text-end justify-center items-end  relative">
              {userInfo ? (
                <div className="flex flex-col text-end justify-center items-end  relative">
                  <h2 className="text-md font-bold">{userInfo?.name}</h2>
                </div>
              ) : (
                "UserName"
              )}
              <span className="text-sm">{role}</span>
            </div>
            {userInfo?.role === 'admin' ? 
               <img
               className="h-14 w-14 rounded-full overflow-hidden"
               src="/images/admin.jpg"
             />
          :
          
          <img
            className="h-14 w-14 rounded-full overflow-hidden"
            src={userInfo?.image}
          />
          
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
