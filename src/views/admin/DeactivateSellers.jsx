import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagignation from "../Pagignation";
import { useDispatch, useSelector } from "react-redux";
import { get_deactive_sellers } from "../../store/reducers/sellerReducer";
import Pagination from "../Pagignation";
const DeactivateSellers = () => {
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setperPage] = useState(5);
  const [show, setShow] = useState(false);

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
        <h1 className="text-xl pb-4 font-bold text-gray-500">
          Deactivate Sellers
        </h1>

        <div className="w-full p-4 bg-gray-50 border-2 rounded-md">
          <div className="flex justify-between items-center mb-6">
            <select
              onChange={(e) => setperPage(parseInt(e.target.value))}
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
              <input
                type="search"
                className="block w-full pl-10 pr-2 py-3 text-sm text-gray-900 border-2 outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-500"
                placeholder="Search here"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    ShopName
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    E-Mail
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    state
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
              {sellers.length > 0 ? (
                sellers.map((seller, index) => (
                  <React.Fragment key={seller?._id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={seller?.image} />
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
                        <Link to={`/admin/dashboard/seller/details/${seller?._id}`} className="cursor-pointer">
                          <FaEye className="text-xl text-gray-600 hover:text-gray-900" />
                        </Link>
                      </td>
                    </tr>
                    
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center">
                    No deactive sellers found
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
    </>
  );
};

export default DeactivateSellers;
