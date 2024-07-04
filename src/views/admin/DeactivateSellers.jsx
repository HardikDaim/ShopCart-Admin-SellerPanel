import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { get_deactive_sellers } from "../../store/reducers/sellerReducer";
import Pagination from '../Pagignation';

const DeactivateSellers = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_deactive_sellers(obj));
  }, [dispatch, searchValue, currentPage, perPage]);

  return (
    <>
      <div className="px-2 lg:px-7 pt-5">
        <h1 className="text-xl pb-4 font-bold text-slate-500 dark:text-slate-300">
          Deactivate Sellers
        </h1>

        <div className="w-full p-4 bg-slate-50 dark:bg-slate-900 border-2 dark:border-slate-600 rounded-md">
          <div className="flex justify-between items-center mb-6">
            <select
              onChange={(e) => setPerPage(parseInt(e.target.value))}
              className="p-2 pr-0 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 dark:border-slate-600 outline-none bg-slate-50 dark:bg-slate-800 rounded-md text-slate-700 dark:text-slate-300"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-500 dark:text-slate-300"
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
                className="block w-full pl-10 pr-2 py-3 text-sm text-slate-900 dark:text-slate-300 border-2 outline-none border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-blue-700 focus:border-blue-700 dark:focus:ring-blue-700 dark:focus:border-blue-700 caret-blue-700"
                placeholder="Search here"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    ShopName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    E-Mail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    State
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700 text-slate-500 dark:text-slate-300">
                {sellers.length > 0 ? (
                  sellers.map((seller, index) => (
                    <React.Fragment key={seller?._id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={seller?.image} className="max-h-16 max-w-16 rounded-md" alt={seller?.name} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {seller?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {seller?.shopInfo?.shopName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {seller?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {seller?.payment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {seller?.shopInfo?.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {seller?.shopInfo?.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {seller?.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/admin/dashboard/seller/details/${seller?._id}`}
                            className="cursor-pointer"
                          >
                            <FaEye className="text-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" />
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-6 py-4 text-center">
                      No deactive sellers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalSeller >= perPage && (
            <div className="w-full flex justify-end mt-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalSeller}
                perPage={perPage}
                showItem={5}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeactivateSellers;
