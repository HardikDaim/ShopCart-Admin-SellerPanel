import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdCurrencyRupee, MdProductionQuantityLimits } from "react-icons/md";
import { FaSellcast } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { get_admiin_dashboard_data } from "../../store/reducers/dashboardReducer";
import moment from "moment";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalSeller,
    recentOrder,
    recentMessage,
  } = useSelector((state) => state.dashboard);
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(get_admiin_dashboard_data());
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
    <div className="px-2 lg:px-7 py-5 dark:bg-slate-800 rounded-md">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">₹{totalSale}</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-yellow-400 flex justify-center items-center text-xl text-slate-800 dark:text-slate-900">
            <MdCurrencyRupee />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">{totalProduct}</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl text-slate-800 dark:text-slate-900">
            <MdProductionQuantityLimits />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">{totalSeller}</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-pink-400 flex justify-center items-center text-xl text-slate-800 dark:text-slate-900">
            <FaSellcast />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-slate-800 dark:text-slate-200">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-blue-400 flex justify-center items-center text-xl text-slate-800 dark:text-slate-900">
            <GrDeliver />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap my-7">
        <div className="w-full lg:w-7/12 lg:pr-3 pb-3 lg:pb-0">
          <div className="w-full p-4 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-3 pt-3 lg:pt-0">
          <div className="w-full rounded-md p-4 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 pb-3">
                Recent Seller Message
              </h2>
              <Link
                to="/admin/dashboard/live-chat"
                className="font-semibold text-sm text-slate-800 dark:text-slate-200 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-2 text-slate-700 dark:text-slate-300">
              {recentMessage.length > 0 ? (
                <ol className="">
                  {recentMessage.map((m, i) => (
                    <li key={i} className="mb-3 ml-2 mr-2 flex items-start">
                      <div className="p-3 rounded-lg border-2 dark:border-slate-600 bg-slate-200 dark:bg-slate-600 w-full">
                        <div className="flex flex-row items-center gap-3">
                          {m.senderId === "" ? (
                            <Link
                              to={`/admin/dashboard/live-chat/${m.receiverId}`}
                            >
                              <div className="rounded-full overflow-hidden w-10 h-10">
                                <img
                                  className="w-full h-full"
                                  src="/images/admin.jpg"
                                  alt="Admin"
                                />
                              </div>
                            </Link>
                          ) : (
                            <Link
                              to={`/admin/dashboard/live-chat/${m.senderId}`}
                            >
                              <div className="rounded-full overflow-hidden w-10 h-10">
                                <img
                                  className="w-full h-full"
                                  src="/images/seller.png"
                                  alt="Seller"
                                />
                              </div>
                            </Link>
                          )}
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-2">
                              <Link
                                to={`/admin/dashboard/live-chat/${m.senderId}`}
                                className="text-md font-normal dark:text-slate-200"
                              >
                                {m.senderName}
                              </Link>
                              <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0 dark:text-slate-300">
                                {moment(m.createdAt).startOf("hour").fromNow()}
                              </time>
                            </div>
                            <Link
                              to={`/admin/dashboard/live-chat/${m.senderId}`}
                            >
                              <div className="p-2 text-xs font-normal rounded-lg bg-slate-300 dark:bg-slate-500 border-2 dark:border-slate-600">
                                {m.message}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="dark:text-slate-300">No Recent Seller Messages yet!!!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-md p-4 bg-slate-50 dark:bg-slate-700 border-2 dark:border-slate-600">
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 pb-3">
            Recent Orders
          </h2>
          <Link
            to="/admin/dashboard/orders"
            className="font-semibold text-sm text-slate-800 dark:text-slate-200 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-600">
            {recentOrder.length > 0 ? (
              <>
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                    >
                      Price
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
                      Order Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                    >
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-700 divide-y divide-slate-200 dark:divide-slate-600 text-slate-500 dark:text-slate-300 tracking-wider font-medium">
                  {recentOrder.map((m, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">#{m._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{m.price.toLocaleString("en-IN")}</td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {m.payment_status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        {m.delivery_status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admin/dashboard/order/details/${m._id}`}
                          className="text-blue-700 dark:text-blue-300 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <p className="dark:text-slate-300">No Recent Orders Found</p>
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
