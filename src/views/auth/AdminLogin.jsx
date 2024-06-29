import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/reducers/authReducer";
import LoaderOverlay from "../../components/LoaderOverlay";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, ssetShowPassword] = useState(false);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
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
    <div className="relative flex min-h-screen min-w-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {loader && <LoaderOverlay />}

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="E-commerce"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
          Admin Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-700"
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
                className="block transition duration-150 ease-in-out w-full rounded-md border-0 p-1.5 caret-indigo-500 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-700"
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
                className="block w-full transition duration-150 ease-in-out rounded-md border-0 p-1.5 caret-indigo-500 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => ssetShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="transition w-full flex justify-center duration-500 outline-none ease-in-out text-white font-semibold rounded-md leading-6 shadow-sm bg-indigo-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-3 py-1.5"
              disabled={loader}
            >
              Login Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
