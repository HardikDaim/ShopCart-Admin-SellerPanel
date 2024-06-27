import React from "react";

const Search = ({ setPerPage, setSearchValue, searchValue }) => {
  return (
   
      <div className="flex justify-between items-center mb-6">
        <select
          onChange={(e) => setPerPage(parseInt(e.target.value))}
          className="p-2 pr-0 hover:bg-gray-100 border-2  outline-none bg-gray-50 rounded-md text-gray-700"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
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
          <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue}
            type="search"
            className="block w-full pl-10 pr-2 py-3 text-sm text-gray-900 border-2 outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-500 "
            placeholder="Search here"
            required
          />
        </div>
      </div>
 
  );
};

export default Search;
