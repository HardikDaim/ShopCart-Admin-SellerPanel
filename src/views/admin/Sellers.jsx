import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_active_sellers } from "../../store/reducers/sellerReducer";
import Pagination from "../Pagignation";
import LoaderOverlay from "../../components/LoaderOverlay";
import { Link } from "react-router-dom";

const Sellers = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller, loader } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_active_sellers(obj));
  }, [dispatch, searchValue, currentPage, perPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-2 dark:border-gray-600 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="p-2 pr-0 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 dark:border-gray-600 outline-none bg-gray-50 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              className="block w-full pl-10 pr-2 py-3 text-sm text-gray-900 dark:text-gray-300 border-2 outline-none border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-500"
              placeholder="Search here"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Shop Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  E-Mail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  State
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200  text-gray-500 dark:text-gray-300">
              {sellers.length > 0 ? (
                sellers.map((seller, index) => (
                  <React.Fragment key={seller?._id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          className="max-h-16 max-w-16 rounded-md mx-auto"
                          src={seller?.image}
                          alt={seller?.name}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{seller?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{seller?.shopInfo?.shopName}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{seller?.payment}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{seller?.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{seller?.shopInfo?.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">{seller?.shopInfo?.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/dashboard/seller/details/${seller?._id}`}
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 "
                        >
                          <FaEye className="text-xl" />
                        </Link>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center">
                    No active sellers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalSeller >= perPage ? (
          <div className="w-full flex justify-end mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
              perPage={perPage}
              showItem={5}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Sellers;
