import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

// Handling wheel event
function handleOnWheel({ deltaY }) {
  // Logic for handling wheel event
}

// Custom outer element type with forwardRef
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  // Row component for rendering each row in the list
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-slate-700 bg-white dark:bg-slate-800 dark:text-slate-300 font-medium">
        <div className="flex-1 p-3">{index + 1}</div>
        <div className="flex-1 p-3">${3434}</div>
        <div className="flex-1 p-3">
          <span className="p-1 bg-yellow-300 text-yellow-800 rounded-md text-sm">Pending</span>
        </div>
        <div className="flex-1 p-3">25 Dec 2023</div>
        <div className="flex-1 p-3">
          <button className="bg-blue-700 py-1 px-3 cursor-pointer text-white rounded-md">Confirm</button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-3">
      <div className="w-full p-4 rounded-md border-2 dark:border-slate-600 bg-slate-50 dark:bg-slate-900">
        <h2 className="text-xl font-semibold pb-5 text-slate-500 dark:text-slate-300">Withdrawal Request</h2>
        <div className="overflow-x-auto">
          <div style={{ minWidth: "340px" }}>
            <div className="min-w-full divide-y divide-slate-200">
              <div className="bg-slate-100 dark:bg-slate-700 flex text-center text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
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
