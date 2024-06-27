import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  add_profile_info,
} from "../../store/reducers/authReducer";
import LoaderOverlay from "../../components/LoaderOverlay";
import { toast } from "react-hot-toast";
import { create_paypal_connect_account } from "../../store/reducers/sellerReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.seller
  );

  const [state, setState] = useState({
    shopName: userInfo?.shopInfo?.shopName || "",
    state: userInfo?.shopInfo?.state || "",
    city: userInfo?.shopInfo?.city || "",
    country: userInfo?.shopInfo?.country || "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const addImage = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_profile_info(state));
    setIsEditing(false); 
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 py-5">
      {loader && <LoaderOverlay />}
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12 mb-6 md:mb-0">
          <div className="w-full p-4 bg-gray-50 border-2 rounded-md text-gray-500">
            <div className="flex justify-center items-center py-4">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="relative flex flex-col h-[210px] w-[210px] cursor-pointer justify-center items-center rounded-full overflow-hidden border-4 border-indigo-500 shadow-md"
                >
                  <img
                    src={userInfo?.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {loader && (
                    <div className="absolute w-full h-full top-0 left-0 bg-white opacity-70 flex justify-center items-center z-20">
                      <FadeLoader color="#4A90E2" />
                    </div>
                  )}
                </label>
              ) : (
                <label
                  htmlFor="img"
                  className="relative flex flex-col h-[210px] w-[210px] cursor-pointer border-2 border-indigo-600 border-dashed hover:border-red-600 justify-center items-center rounded-full"
                >
                  <FaImages className="text-4xl text-gray-500 mb-2" />
                  <span className="text-lg">Upload Profile Picture</span>
                  {loader && (
                    <div className="absolute w-full h-full top-0 left-0 bg-white opacity-70 flex justify-center items-center z-20">
                      <FadeLoader color="#4A90E2" />
                    </div>
                  )}
                </label>
              )}
              <input
                required
                onChange={addImage}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="relative flex justify-between text-sm flex-col gap-2 p-4 bg-white rounded-md border-2">
                <span
                  className="absolute right-2 top-2 p-[6px] rounded-full border-2 hover:bg-gray-100 cursor-pointer "
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaRegEdit className="text-xl text-gray-500" />
                </span>
                <div className="flex gap-2">
                  <span>Name :</span>
                  <span>{userInfo?.name} </span>
                </div>
                <div className="flex gap-2">
                  <span>E-Mail :</span>
                  <span>{userInfo?.email} </span>
                </div>
                <div className="flex gap-2">
                  <span>Role :</span>
                  <span className="capitalize">{userInfo?.role} </span>
                </div>
                <div className="flex gap-2">
                  <span>Status :</span>
                  <span
                    className={`${
                      userInfo?.status === "pending" ||
                      userInfo?.status === "deactive"
                        ? "text-red-600"
                        : "text-green-500"
                    } font-semibold capitalize`}
                  >
                    {userInfo?.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account :</span>
                  <p>
                    {userInfo?.payment === "active" ? (
                      <span className="text-green-500 capitalize">
                        {userInfo?.payment}{" "}
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          dispatch(create_paypal_connect_account())
                        }
                        className="text-red-600 cursor-pointer hover:underline font-semibold"
                      >
                        Click to Activate{" "}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo?.shopName || isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col w-full gap-1 mb-4">
                    <label
                      className="text-sm font-semibold text-gray-700"
                      htmlFor="shopName"
                    >
                      Shop Name
                    </label>
                    <input
                      required
                      onChange={handleInput}
                      name="shopName"
                      value={state.shopName}
                      className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                      type="text"
                      id="shopName"
                      placeholder="Shop Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-4">
                    <label
                      className="text-sm font-semibold text-gray-700"
                      htmlFor="state"
                    >
                      State Name
                    </label>
                    <input
                      required
                      onChange={handleInput}
                      name="state"
                      value={state.state}
                      className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                      type="text"
                      id="state"
                      placeholder="State Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-4">
                    <label
                      className="text-sm font-semibold text-gray-700"
                      htmlFor="city"
                    >
                      City Name
                    </label>
                    <input
                      required
                      onChange={handleInput}
                      name="city"
                      value={state.city}
                      className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                      type="text"
                      id="city"
                      placeholder="City Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-4">
                    <label
                      className="text-sm font-semibold text-gray-700"
                      htmlFor="country"
                    >
                      Country Name
                    </label>
                    <input
                      required
                      onChange={handleInput}
                      name="country"
                      value={state.country}
                      className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                      type="text"
                      id="country"
                      placeholder="Country Name"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      disabled={loader}
                      className="transition duration-500 ease-in-out my-4 text-white font-semibold rounded-md bg-orange-500 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="transition duration-500 ease-in-out my-4 text-white font-semibold rounded-md bg-gray-500 hover:bg-gray-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="relative flex justify-between text-sm flex-col gap-2 p-4 bg-white rounded-md border-2">
                  <span
                    className="absolute right-2 top-2 p-[6px] rounded-full border-2 hover:bg-gray-100 cursor-pointer "
                    onClick={() => setIsEditing(true)}
                  >
                    <FaRegEdit className="text-xl text-gray-500" />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name :</span>
                    <span>{userInfo?.shopInfo?.shopName} </span>
                  </div>
                  <div className="flex gap-2">
                    <span>State :</span>
                    <span>{userInfo?.shopInfo?.state} </span>
                  </div>
                  <div className="flex gap-2">
                    <span>City :</span>
                    <span>{userInfo?.shopInfo?.city} </span>
                  </div>
                  <div className="flex gap-2">
                    <span>Country :</span>
                    <span>{userInfo?.shopInfo?.country} </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full md:pl-7">
            <div className="bg-gray-50 rounded-md border-2 p-4 text-gray-500">
              <h2 className="font-semibold py-4 text-xl">Change Password</h2>
              <form>
                <div className="flex flex-col w-full gap-1 mb-4">
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="email"
                  >
                    E-Mail
                  </label>
                  <input
                    required
                    name="email"
                    className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                    type="text"
                    id="email"
                    placeholder="E-Mail"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-4">
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    required
                    name="password"
                    className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-4">
                  <label
                    className="text-sm font-semibold text-gray-700"
                    htmlFor="conpass"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    name="conpass"
                    className="outline-none border-2 rounded-md shadow-md focus:border-indigo-600 p-2 transition duration-150 ease-in-out"
                    type="password"
                    id="conpass"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="flex justify-center">
                  <button className="transition duration-500 ease-in-out my-4 text-white font-semibold rounded-md bg-orange-500 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;