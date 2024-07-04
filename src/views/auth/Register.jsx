import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderOverlay from "../../components/LoaderOverlay";
import {
  messageClear,
  seller_register,
} from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../../layout/Header";
import { SiTheregister } from "react-icons/si";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorMessage, successMessage, loader } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  return (
    <div className="flex min-h-screen min-w-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-slate-900">
      {loader && <LoaderOverlay />}
      <Header />
      <li className="flex justify-center items-center">
        <div className=" text-3xl lg:text-5xl font-bold flex items-center text-slate-900 dark:text-slate-100">
          <span className="text-blue-700">
            <SiTheregister />
          </span>
          <span className="ml-1">ShopCart</span>

          <sub className="text-xs ml-1 capitalize">Seller Panel</sub>
        </div>
      </li>
      <h2 className=" my-4 text-center text-2xl font-bold leading-9 tracking-tight text-blue-700 dark:text-blue-600">
        Please Register your account
      </h2>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-700 dark:text-slate-200"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                name="name"
                type="text"
                id="name"
                onChange={handleInput}
                value={state.name}
                required
                className="block dark:bg-slate-800 transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-blue-700 text-gray-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-700 dark:focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-700 dark:text-slate-200"
            >
              E-Mail
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                id="email"
                onChange={handleInput}
                value={state.email}
                required
                className="block dark:bg-slate-800 transition duration-150 ease-in-out w-full rounded-md border-0 p-1.5 caret-blue-700 outline-none text-gray-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-700 dark:focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-700 dark:text-slate-200"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleInput}
                value={state.password}
                required
                className="block dark:bg-slate-800 w-full rounded-md border-0 p-1.5 caret-blue-700 outline-none text-gray-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-700 dark:focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-700 dark:text-slate-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className="w-4 h-3 mr-1 dark:bg-slate-700 dark:border-slate-600"
            />
            <label
              htmlFor="checkbox"
              className="text-gray-700 dark:text-slate-200"
            >
              I agree to Terms and Privacy Policy
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="transition w-full flex justify-center duration-500 outline-none ease-in-out text-white font-semibold rounded-md leading-6 shadow-sm bg-blue-700 hover:bg-blue-600 transform hover:-translate-y-1 hover:scale-110 px-3 py-1.5"
              disabled={loader}
            >
              Create Now
            </button>
            <p className="block text-sm font-medium leading-6 text-gray-700 dark:text-slate-200 py-2">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-blue-700 dark:text-blue-600 ml-1"
              >
                Log in now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
