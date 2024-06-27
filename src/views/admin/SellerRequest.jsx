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
  const [perPage, setperPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_seller_request(obj));
  }, [searchValue, currentPage, perPage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      // toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <>
      <div className="px-2 lg:px-7 pt-5">
      
        <h1 className="text-xl pb-4 font-bold text-gray-500">
          Sellers Request
        </h1>
        <div className="w-full p-4 bg-gray-50 border-2 rounded-md">
          <Search
            setperPage={setperPage}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
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
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Name
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
                {sellers.map((d, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">{i+1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                {d.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.payment}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/dashboard/seller/details/${d._id}`}>
                      <FaEye
                         
                        className="text-xl text-gray-600 hover:text-gray-900 cursor-pointer"
                      />

                      </Link>
                    </td>
                  </tr>
                ))}
                <tr className={show ? "bg-red-50" : "hidden"}>
                  <td className="px-6 py-4 whitespace-nowrap">#3434</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹900</td>
                  <td className="px-6 py-4 whitespace-nowrap">Pending</td>
                  <td className="px-6 py-4 whitespace-nowrap">Pending</td>
                  <td className="px-6 py-4 whitespace-nowrap hover:underline"></td>
                  <td className="px-6 py-4 whitespace-nowrap"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagignation
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              perPage={perPage}
              showItem={3}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRequest;
