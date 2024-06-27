import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";
import { MdCurrencyRupee } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";

function handleOnWheel({ deltaY }) {}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const Row = ({ index, style }) => {
  return (
    <div
      style={style}
      className="flex text-sm overflow-x-auto text-gray-700  bg-white font-medium"
    >
      <div className="flex-1 p-2 whitespace-nowrap">{index + 1}</div>
      <div className="flex-1 p-2 whitespace-nowrap">$3434</div>
      <div className="flex-1 p-2 whitespace-nowrap">
        <span className="p-1 bg-yellow-300 text-yellow-800 rounded-md text-sm">
          Pending
        </span>
      </div>
      <div className="flex-1 p-2 whitespace-nowrap">25 Dec 2023</div>
    </div>
  );
};
const Payments = () => {
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
            <span className="text-md font-medium">Available Amount </span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl">
            <MdProductionQuantityLimits />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-gray-50 border-2 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-gray-800 ">
            <h2 className="text-3xl font-bold">10</h2>
            <span className="text-md font-medium">Withdrawl Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-pink-400 flex justify-center items-center text-xl">
            <GrDeliver />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-gray-50 border-2 rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-gray-800 ">
            <h2 className="text-3xl font-bold">1</h2>
            <span className="text-md font-medium">Pending Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-blue-400 flex justify-center items-center text-xl">
            <MdOutlinePendingActions />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 my-7">
        <div className="bg-gray-50 border-2 text-gray-500 p-5 rounded-md">
          <h2 className="text-lg">Send Request</h2>
          <div className="py-3">
            <form>
              <div className="flex flex-wrap gap-3">
                <div className="flex w-full">
                  <div className="relative flex-grow">
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
                      name="amount"
                      type="number"
                      min="0"
                      className="block w-full pl-10 pr-4 py-3 text-gray-500 border-2 outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 caret-indigo-500"
                      placeholder="Search here"
                      required
                    />
                  </div>
                  <button className="ml-3 transition duration-500 ease-in-out text-white font-semibold rounded-md bg-indigo-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 w-1/4 p-1 md:px-5 md:py-2">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg pb-4">Pending Request</h2>
            <div className="overflow-x-auto">
              <div>
                <div className="min-w-full divide-y divide-gray-200">
                  <div className="bg-gray-100 flex text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex-1 p-3">S.No</div>
                    <div className="flex-1 p-3">Amount</div>
                    <div className="flex-1 p-3">Status</div>
                    <div className="flex-1 p-3">Date</div>
                  </div>
                </div>
                <List
                  style={{ minWidth: "340px" }}
                  className="List text-cente overflow-x-auto"
                  height={500}
                  itemCount={1000}
                  itemSize={50}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border-2 text-green-600 font-semibold p-5 rounded-md">
          <h2 className="text-lg">Success Withdraw</h2>
          <div className="py-3"></div>
          <div className="overflow-x-auto">
            <div>
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-100 flex text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex-1 p-3">S.No</div>
                  <div className="flex-1 p-3">Amount</div>
                  <div className="flex-1 p-3">Status</div>
                  <div className="flex-1 p-3">Date</div>
                </div>
              </div>
              <List
                style={{ minWidth: "340px" }}
                className="List text-cente overflow-x-auto"
                height={600}
                itemCount={1000}
                itemSize={50}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
