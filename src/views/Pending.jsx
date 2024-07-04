import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import { useSelector } from "react-redux";
import { FaQuestionCircle } from "react-icons/fa";

const Pending = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="flex items-center justify-center mx-2">
        <div
          className={`dark:bg-slate-800 bg-slate-200 p-8 rounded-lg  animate-fadeIn mx-auto`}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Welcome to ShopCart's Seller Community!
          </h3>
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Hi <strong>{userInfo?.name}</strong>, we are excited to have you on
            board. ShopCart is committed to providing you with the best platform
            to showcase and sell your products. Complete your seller profile
            today to start exploring all the features and benefits of our
            dashboard. If you need any assistance, our support team is just a
            click away.
          </p>

          <h2 className="text-3xl font-semibold my-4">Profile Incomplete</h2>
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Your seller profile is incomplete. Please complete your profile to
            access all features of the application.
          </p>
          <Link
            to="/seller/dashboard/profile"
            className={`bg-blue-700 hover:bg-blue-600 text-white flex justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Complete Your Profile Now
          </Link>

          {/* Additional Content */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              What you can do now:
            </h3>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-400">
              <li>Complete your seller profile to unlock all features.</li>
              <li>View and manage your orders under the Orders page.</li>
              <li>
                Contact support if you have any questions or need assistance.
              </li>
            </ul>
          </div>

          {/* Chat with Support */}
          <div className="mt-8">
            <p className="text-slate-600 dark:text-slate-400">
              Need help completing your profile or have questions? Our support
              team is here to assist you.
            </p>
            <Link
              to="/seller/dashboard/chat-support"
              className={`mt-4 bg-black text-white flex items-center justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              <FaQuestionCircle className="mr-2" />
              Chat with Support
            </Link>
          </div>

          {/* Additional Seller Dashboard Information */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Seller Dashboard Overview
            </h3>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              The ShopCart's Seller Dashboard is designed to provide you with
              all the tools and information you need to manage your online store
              efficiently.
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-400">
              <li>Track your orders and manage your inventory in real-time.</li>
              <li>
                Analyze sales data and generate reports to help grow your
                business.
              </li>
              <li>
                Access marketing tools to promote your products and increase
                visibility.
              </li>
              <li>
                Communicate with customers and handle inquiries directly through
                the dashboard.
              </li>
            </ul>
          </div>

          {/* Welcome Message */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Welcome to ShopCart's Seller Community!
            </h3>
            <p className="mb-4 text-slate-600 dark:text-slate-400">
              We are excited to have you on board. ShopCart is committed to
              providing you with the best platform to showcase and sell your
              products. Complete your seller profile today to start exploring
              all the features and benefits of our dashboard. If you need any
              assistance, our support team is just a click away.
            </p>
            <Link
              to="/seller/dashboard/profile"
              className={`mt-4 bg-blue-700 hover:bg-blue-600 text-white flex justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              Complete Your Profile Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pending;
