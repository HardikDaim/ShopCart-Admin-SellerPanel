import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import {
  admin_order_status_update,
  get_admin_order, messageClear
} from "../../store/reducers/orderReducer";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { order, successMessage, errorMessage } = useSelector((state) => state.order);
  const { orderId } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order?.delivery_status);
  },[order])

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [dispatch, orderId]);

  const statusUpdate = (e) => {
    dispatch(
      admin_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };

  useEffect(() => {
    if(successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if(errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  },[dispatch, successMessage, errorMessage])

  return (
    <div className="px-4 lg:px-8 pt-6">
      <div className="w-full p-6 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md shadow-md">
        <div className="flex justify-between items-center pb-4 border-b dark:border-slate-700">
          <h2 className="text-2xl text-gray-800 dark:text-slate-200 font-semibold">
            Order Details
          </h2>
          <select
            value={status}
            onChange={statusUpdate}
            className="px-0 md:px-4 py-2 border-2 bg-white dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 rounded-md focus:border-indigo-500 dark:focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-300 transition ease-in-out duration-150"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="pt-4">
          <div className="flex flex-col lg:flex-row justify-between text-lg text-gray-700 dark:text-slate-300 font-medium">
            <h2 className="text-sm md:text-xl">Order Id: #{order?._id}</h2>
            <span className="text-sm md:text-lg">{order?.date}</span>
          </div>
          <div className="flex flex-wrap mt-4 gap-6">
            <div className="w-full lg:w-1/3">
              <div className="text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold dark:text-slate-200">
                    Deliver To: {order?.shippingInfo?.firstName}{" "}
                    {order?.shippingInfo?.lastName}
                  </h2>
                  <p className="text-sm md:text-md dark:text-slate-300">
                    {order?.shippingInfo?.address
                      ? order.shippingInfo.address + ", "
                      : ""}
                    {order?.shippingInfo?.city
                      ? order.shippingInfo.city + ", "
                      : ""}
                    {order?.shippingInfo?.state
                      ? order.shippingInfo.state + " "
                      : ""}
                    {order?.shippingInfo?.postalCode
                      ? order.shippingInfo.postalCode + ", "
                      : ""}
                    {order?.shippingInfo?.country}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <h2 className="dark:text-slate-200">Payment Status:</h2>
                  <span
                    className={`capitalize ${
                      order?.payment_status === "unpaid"
                        ? "text-red-600 "
                        : "text-green-500"
                    }`}
                  >
                    {order?.payment_status}
                  </span>
                </div>
                <span className="mt-2 block dark:text-slate-300 font-bold">
                  Price: ₹{order?.price?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <div className="space-y-4">
                {order?.suborder &&
                  order?.suborder?.map((o, i) => (
                    <div
                      key={i + 20}
                      className="p-4 bg-gray-100 dark:bg-slate-700 rounded-md"
                    >
                      <div className="text-gray-700 dark:text-slate-300">
                        <div className="flex items-center gap-3">
                          <h2>Seller {i + 1} Order:</h2>
                          <span
                            className={`${
                              o?.delivery_status === "cancelled" &&
                              "text-red-500"
                            }`}
                          >
                            {o?.delivery_status}
                          </span>
                        </div>
                        {order?.products &&
                          order?.products.map((p, i) => (
                            <div className="flex gap-3 mt-2">
                              <img
                                className="w-16 h-12 object-cover rounded-md"
                                src={p?.images[0]}
                                alt="Product"
                              />
                              <div>
                                <h2 className="dark:text-slate-200">
                                  {p.name}
                                </h2>
                                <p>
                                  <span>Brand: {p?.brand}</span>
                                  <span className="ml-4">Quantity: 3</span>
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
