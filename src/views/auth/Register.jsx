import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoaderOverlay from "../../components/LoaderOverlay"; 
import { messageClear, seller_register } from "../../store/reducers/authReducer";
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {errorMessage, successMessage, loader } = useSelector((state) => state.auth);
  const [state, setState] = useState({ name: "", email: "", password: "" });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));

  };

  useEffect(() => {
    if(errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if(successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate('/');
    }
  }, [errorMessage,successMessage, dispatch, navigate]);

  return (

    <div className="flex min-h-screen min-w-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
       {loader && <LoaderOverlay />} 
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto  w-auto"
          src="/images/logo.png"
          alt="E-commerce"
        />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
          Please Register your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-700 "
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
                className="block transition duration-150 ease-in-out w-full rounded-md border-0 outline-none p-1.5 caret-indigo-500 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                id="password"
                onChange={handleInput}
                value={state.password}
                required
                className="block w-full rounded-md border-0 p-1.5 caret-indigo-500 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-2">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className="w-4 h-4 mr-1"
            ></input>
            <label htmlFor="checkbox">
              I agree to Terms and Privacy Policy
            </label>
          </div>
          <div>
          <button
              type="submit"
              className="transition w-full flex justify-center duration-500 outline-none ease-in-out text-white font-semibold rounded-md leading-6 shadow-sm bg-indigo-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-3 py-1.5"
              disabled={loader}
            >
              Create Now
            </button>
            <p className="block text-sm font-medium leading-6 text-gray-900 py-2">
              Already have an account?
              <Link to="/login" className="font-semibold text-indigo-600 ml-1">
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
