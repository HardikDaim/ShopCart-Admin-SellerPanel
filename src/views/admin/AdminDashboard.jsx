import React from "react";
import { Link } from "react-router-dom";
import { MdCurrencyRupee } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaSellcast } from "react-icons/fa";
import { GrDeliver } from "react-icons/gr";
import Chart from "react-apexcharts";

const AdminDashboard = () => {
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
      },
      legend: { position: "top" },
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
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-gray-50 border-2 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-gray-800 ">
            <h2 className="text-3xl font-bold">₹3343</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-yellow-400 flex justify-center items-center text-xl">
            <MdCurrencyRupee />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-gray-50 border-2 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-gray-800 ">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="text-md font-medium">Products </span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl">
            <MdProductionQuantityLimits />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-gray-50 border-2 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-gray-800 ">
            <h2 className="text-3xl font-bold">10</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-pink-400 flex justify-center items-center text-xl">
            <FaSellcast />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-gray-50 border-2 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-gray-800 ">
            <h2 className="text-3xl font-bold">54</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-blue-400 flex justify-center items-center text-xl">
            <GrDeliver />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap my-7">
        <div className="w-full lg:w-7/12 lg:pr-3 pb-3 lg:pb-0">
          <div className="w-full p-4 bg-gray-50 border-2 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12  lg:pl-3 pt-3 lg:pt-0">
          <div className="w-full rounded-md p-4 bg-gray-50 border-2 text-gray-800 ">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-800 pb-3">
                Recent Seller Message
              </h2>
              <Link to="" className="font-semibold text-sm text-gray-800 hover:underline">
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-2 text-gray-700">
              <ol className="">
                <li className="mb-3 ml-2 mr-2 flex items-start">
                  <div className="p-3 rounded-lg border-2 bg-gray-200 w-full">
                    <div className="flex flex-row items-center gap-3">
                      <div className="rounded-full overflow-hidden w-10 h-10">
                        <img
                          className="w-full h-full"
                          src="/images/admin.jpg"
                          alt="Admin"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <Link to="" className="text-md font-normal">
                            Admin
                          </Link>
                          <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                            2 Days ago
                          </time>
                        </div>
                        <div className="p-2 text-xs font-normal rounded-lg bg-gray-300 border-2 border-gray-400">
                          {" "}
                          How are You?
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-2 mr-2 flex items-start">
                  <div className="p-3 rounded-lg border-2 bg-gray-200 w-full">
                    <div className="flex flex-row items-center gap-3">
                      <div className="rounded-full overflow-hidden w-10 h-10">
                        <img
                          className="w-full h-full"
                          src="/images/admin.jpg"
                          alt="Admin"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <Link to="" className="text-md font-normal">
                            Admin
                          </Link>
                          <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                            2 Days ago
                          </time>
                        </div>
                        <div className="p-2 text-xs font-normal rounded-lg bg-gray-300 border-2 border-gray-400">
                          {" "}
                          How are You?
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mb-3 ml-2 mr-2 flex items-start">
                  <div className="p-3 rounded-lg border-2 bg-gray-200 w-full">
                    <div className="flex flex-row items-center gap-3">
                      <div className="rounded-full overflow-hidden w-10 h-10">
                        <img
                          className="w-full h-full"
                          src="/images/admin.jpg"
                          alt="Admin"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <Link to="" className="text-md font-normal">
                            Admin
                          </Link>
                          <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                            2 Days ago
                          </time>
                        </div>
                        <div className="p-2 text-xs font-normal rounded-lg bg-gray-300 border-2 border-gray-400">
                          {" "}
                          How are You?
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-md p-4 bg-gray-50 border-2">
      <div className="flex flex-row justify-between ">
        <h2 className="font-semibold text-lg text-gray-800 pb-3">Recent Orders</h2>
        <Link to="" className="font-semibold text-sm text-gray-800 hover:underline">View All</Link>
      </div>
        <div className="overflow-x-auto">
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
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-gray-500 tracking-wider font-medium">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">$100</td>
                <td className="px-6 py-4 whitespace-nowrap">Paid</td>
                <td className="px-6 py-4 whitespace-nowrap">Shipped</td>
                <td className="px-6 py-4 whitespace-nowrap">Yes</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2</td>
                <td className="px-6 py-4 whitespace-nowrap">$75</td>
                <td className="px-6 py-4 whitespace-nowrap">Pending</td>
                <td className="px-6 py-4 whitespace-nowrap">Processing</td>
                <td className="px-6 py-4 whitespace-nowrap">No</td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
};

export default AdminDashboard;
