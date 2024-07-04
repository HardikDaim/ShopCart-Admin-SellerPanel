import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagignation from "../Pagignation";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import {
  get_seller_request,
  messageClear,
} from "../../store/reducers/sellerReducer";
import toast from "react-hot-toast";
import LoaderOverlay from "../../components/LoaderOverlay";

const SellerRequest = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, sellers, totalSeller } =
    useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_seller_request(obj));
  }, [searchValue, currentPage, perPage, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <>
      <div className="px-2 lg:px-7 pt-5">
        <h1 className="text-xl pb-4 font-bold text-gray-500 dark:text-gray-300">
          Sellers Request
        </h1>
        <div className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-2 dark:border-gray-700 rounded-md">
          <Search
            setPerPage={setPerPage}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    S.No
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
                    E-Mail
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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 text-gray-500 dark:text-gray-300">
                {sellers.map((d, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{d.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{d.payment}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{d.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/dashboard/seller/details/${d._id}`}>
                        <FaEye className="text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {sellers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      No seller requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalSeller >= perPage && (
            <div className="w-full flex justify-end mt-4">
              <Pagignation
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalSeller}
                perPage={perPage}
                showItem={3}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerRequest;
