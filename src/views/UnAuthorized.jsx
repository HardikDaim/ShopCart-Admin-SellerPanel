import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";

const UnAuthorized = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8  rounded-lg my-10 animate-fadeIn">
          <h2 className="text-3xl font-semibold mb-4">Unauthorized Access</h2>
          <p className="mb-4">
            You do not have permission to access this page. Please contact
            support if you believe this is an error.
          </p>
          <Link
            to="/"
            className="bg-blue-700 hover:bg-blue-600 text-white flex justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
