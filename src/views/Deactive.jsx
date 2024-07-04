import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';

const Deactive = () => {
    return (
        <div className="flex items-start justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center animate-fadeIn">
                <h2 className="text-3xl font-semibold text-red-600 mb-4">Account Deactivated</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Your seller account has been deactivated by the admin due to one or more of the following reasons:
                </p>
                <ul className="list-disc text-left ml-6 text-slate-600 dark:text-slate-400 mb-6">
                    <li>Violation of ShopCart's terms and conditions.</li>
                    <li>Multiple customer complaints regarding product quality or service.</li>
                    <li>Suspicious or fraudulent activities detected.</li>
                    <li>Failure to comply with our seller policies and guidelines.</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    If you believe this is a mistake or if you need further information, please contact our support team. We are here to assist you and resolve any issues.
                </p>
                <Link
                    to="/seller/dashboard/chat-support"
                    className="inline-flex items-center bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    <FaQuestionCircle className="mr-2" />
                    Chat with Support
                </Link>
            </div>
        </div>
    );
};

export default Deactive;
