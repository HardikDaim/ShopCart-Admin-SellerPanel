import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const Row = ({ index, style }) => {
    return (
      <div
        style={style}
        className="flex text-sm text-gray-700 bg-white font-medium"
      >
        <div className="flex-1 p-2 whitespace-nowrap">{index + 1}</div>
        <div className="flex-1 p-2 whitespace-nowrap">$3434</div>
        <div className="flex-1 p-2 whitespace-nowrap">
          <span className="p-1 bg-yellow-300 text-yellow-800 rounded-md text-sm">
            Pending
          </span>
        </div>
        <div className="flex-1 p-2 whitespace-nowrap">25 Dec 2023</div>
        <div className="flex-1 p-2 whitespace-nowrap">
          <button className="bg-indigo-500 py-1 px-3 cursor-pointer text-white rounded-md">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-3">
      <div className="w-full p-4 rounded-md border-2 bg-gray-50">
        <h2 className="text-xl font-semibold pb-5 text-gray-500">
          Withdrawal Request
        </h2>
        <div className="overflow-x-auto">
          <div style={{ minWidth: "340px" }}>
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-100 flex text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex-1 p-3">S.No</div>
                <div className="flex-1 p-3">Amount</div>
                <div className="flex-1 p-3">Status</div>
                <div className="flex-1 p-3">Date</div>
                <div className="flex-1 p-3">Action</div>
              </div>
            </div>
            <List
              className="List text-center"
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
  );
};

export default PaymentRequest;
