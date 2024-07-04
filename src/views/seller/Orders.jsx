import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagignation";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_orders } from "../../store/reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
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
      sellerId: userInfo?._id,
    };
    dispatch(get_seller_orders(obj));
  }, [dispatch, searchValue, currentPage, perPage]);

  const handleExpandClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <>
      <div className="px-2 lg:px-7 py-5">
        <div className="w-full p-4 bg-slate-100 dark:bg-slate-800 border-2 dark:border-slate-600 rounded-md">
          <h2 className="text-xl text-slate-500 dark:text-white font-semibold mb-4">Orders</h2>
          <div>
            <Search
              setPerPage={setPerPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
          </div>
          <div className="overflow-x-auto">
            {myOrders.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-white uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-white uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-white uppercase tracking-wider"
                    >
                      Payment Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-white uppercase tracking-wider"
                    >
                      Order Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-white uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-white uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700 text-slate-500 dark:text-slate-300">
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
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {order?.delivery_status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order?.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/seller/dashboard/order/details/${order?._id}`}>
                            <FaEye
                              className="text-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                            />
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400">No orders found.</div>
            )}
          </div>
          {totalOrders >= perPage ? (
            <div className="w-full flex justify-end mt-4">
              <Pagination
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
