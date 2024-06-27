import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import Pagignation from "../Pagignation";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders, totalOrders } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [dispatch, searchValue, currentPage, perPage]);

  const handleExpandClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4 bg-gray-50 border-2 rounded-md">
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
            {myOrders.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Price
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
                      Order Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      Expand
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-gray-500">
                  {myOrders.map((order) => (
                    <React.Fragment key={order?._id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          #{order?._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ₹{order?.price.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {order?.payment_status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowra capitalize">
                          {order?.delivery_status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/admin/dashboard/order/details/${order?._id}`}
                            className="hover:underline"
                          >
                            View
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <IoIosArrowDropdown
                            onClick={() => handleExpandClick(order?._id)}
                            className="text-xl text-gray-600 hover:text-gray-900 cursor-pointer"
                          />
                        </td>
                      </tr>
                      {expandedOrder === order?._id &&
                        order.suborder.map((o, i) => (
                          <tr className="bg-red-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              #{o?.orderId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              ₹{o?.price.toLocaleString("en-IN")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {o?.payment_status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {o?.delivery_status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap hover:underline"></td>
                            <td className="px-6 py-4 whitespace-nowrap"></td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-gray-500">No orders found.</div>
            )}
          </div>
          {totalOrders >= perPage ? (
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagignation
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalOrders}
                perPage={perPage}
                showItem={3}
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

export default Orders;
