import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_dashboard_data } from "../../store/reducers/dashboardReducer";
import moment from "moment";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    recentOrder,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_seller_dashboard_data());
  }, [dispatch]);

  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
      },
      {
        name: "Revenue",
        data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
      },
      {
        name: "Sellers",
        data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
      },
    ],
    options: {
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#94a3b8" // Adjust this color for light theme if needed
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#fff",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#94a3b8", // Light theme color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#94a3b8", // Light theme color
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          colors: "#94a3b8", // Light theme color
        },
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };


  return (
    <div className="px-2 lg:px-7 py-5 dark:bg-slate-800 bg-slate-100 dark:text-slate-100 rounded-md">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">₹{totalSale}</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-yellow-400 flex justify-center items-center text-xl">
            <MdCurrencyRupee />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl">
            <MdProductionQuantityLimits />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-pink-400 flex justify-center items-center text-xl">
            <GrDeliver />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">{totalPendingOrder}</h2>
            <span className="text-md font-medium">Pending Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-blue-400 flex justify-center items-center text-xl">
            <MdOutlinePendingActions />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap my-7">
        <div className="w-full lg:w-7/12 lg:pr-3 pb-3 lg:pb-0">
          <div className="w-full p-4 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600  rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-3 pt-3 lg:pt-0">
          <div className="w-full rounded-md p-4 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600  text-slate-800 dark:text-slate-200">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg pb-3">Recent Customer Message</h2>
              <Link
                to="/seller/dashboard/chat-customer"
                className="font-semibold text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              {recentMessage.length > 0 ? (
                <ol className="text-slate-700 dark:text-slate-300">
                  {recentMessage.map((m, i) => (
                    <li key={i} className="mb-3 ml-2 mr-2 flex items-start">
                      <div className="p-3 rounded-lg border-2 dark:border-slate-600   bg-slate-200 dark:bg-slate-600 w-full">
                        <div className="flex flex-row items-center gap-3">
                          {m?.senderId === userInfo._id ? (
                            <Link
                              to={`/seller/dashboard/chat-customer/${m?.receiverId}`}
                            >
                              <div className="rounded-full overflow-hidden w-10 h-10">
                                <img
                                  className="w-full h-full"
                                  src={userInfo.image}
                                />
                              </div>
                            </Link>
                          ) : (
                            <Link
                              to={`/seller/dashboard/chat-customer/${m?.senderId}`}
                            >
                              <div className="rounded-full overflow-hidden w-10 h-10">
                                <img
                                  className="w-full h-full"
                                  src="/images/user.png"
                                />
                              </div>
                            </Link>
                          )}
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-2">
                              <Link to="" className="text-md font-normal">
                                {m?.senderName}
                              </Link>
                              <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                                {moment(m?.createdAt).startOf("hour").fromNow()}
                              </time>
                            </div>
                            <div className="p-2 text-xs font-normal rounded-lg bg-slate-300 dark:bg-slate-500 border-2 border-slate-400 dark:border-slate-400">
                              {m?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="flex justify-center items-center">
                  <p>No Recent Customer Messages yet!!!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-md p-4 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 ">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 pb-3">
            Recent Orders
          </h2>
          <Link
            to="/seller/dashboard/orders"
            className="font-semibold text-sm hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {recentOrder.length > 0 ? (
              <>
                <thead className="bg-slate-100  dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold dark:text-slate-300 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold dark:text-slate-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold dark:text-slate-300 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold dark:text-slate-300 uppercase tracking-wider">
                      Order Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold dark:text-slate-300 uppercase tracking-wider">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-700 divide-y divide-slate-200 dark:text-slate-300 tracking-wider font-medium">
                  {recentOrder.map((m, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        #{m._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.price.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {m.payment_status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {m.delivery_status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-blue-700 dark:text-blue-300 hover:underline ">
                        <Link to={`/seller/dashboard/order/details/${m._id}`}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <p>No Recent Orders Found</p>
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
