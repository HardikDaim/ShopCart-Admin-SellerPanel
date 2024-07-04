import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_seller, messageClear, seller_status_update } from "../../store/reducers/sellerReducer";
import { toast } from 'react-hot-toast';
import LoaderOverlay from '../../components/LoaderOverlay';

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, loader, errorMessage, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();
  const [status, setStatus] = useState('');

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_status_update({ sellerId, status }));
  };

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId, dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  useEffect(() => {
    if (seller) {
      setStatus(seller?.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      {loader && <LoaderOverlay />}
      <h1 className="text-xl pb-4 font-bold text-gray-700 dark:text-gray-300">Sellers Request</h1>
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-900 border-2 dark:border-gray-700 rounded-md">
        <div className="flex flex-wrap text-gray-700 dark:text-gray-300">
          <div className="w-full md:w-4/12 lg:w-3/12 flex justify-center items-center py-3">
            <div>
              {seller?.image ? (
                <img className="max-w-full max-h-60 object-contain outline-4 outline-dotted outline-gray-400 dark:outline-gray-600 rounded-md shadow-md" src={seller?.image} />
              ) : (
                <span className="text-gray-500 dark:text-gray-400">Image not Uploaded</span>
              )}
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg font-medium">
                <h2>Basic Info</h2>
              </div>
              <div className="flex flex-col justify-between gap-2 border-2 text-sm p-4 bg-gray-100 dark:border-slate-600 dark:bg-gray-800 rounded-md">
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Seller Id :</span> <span>{seller?._id}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Name :</span> <span>{seller?.name}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>E-Mail :</span> <span>{seller?.email}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400 capitalize">
                  <span>Role :</span> <span>{seller?.role}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Status :</span>
                  <span className={`${seller?.status === "pending" || seller?.status === "deactive" ? "text-red-600" : "text-green-500"} font-semibold capitalize`}>
                    {seller?.status}
                  </span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Payment Status :</span>
                  <span className={`capitalize ${seller?.payment === 'pending' ? "text-red-600" : "text-green-500"}`}>
                    {seller?.payment}
                  </span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Created At :</span> <span>{seller?.createdAt}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Updated At :</span> <span>{seller?.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg font-medium">
                <h2>Address</h2>
              </div>
              <div className="flex flex-col justify-between gap-2 border-2 text-sm p-4 bg-gray-100 dark:border-slate-600 dark:bg-gray-800 rounded-md">
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Shop Name :</span> <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>State :</span> <span>{seller?.shopInfo?.state}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>City :</span> <span>{seller?.shopInfo?.city}</span>
                </div>
                <div className="flex gap-2 font-bold text-gray-600 dark:text-gray-400">
                  <span>Country :</span> <span>{seller?.shopInfo?.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={submit}>
            <div className="flex flex-col md:flex-row gap-4 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="outline-none md:ml-0 text-gray-700 dark:border-slate-600 dark:text-gray-300 font-semibold p-2 border-2 focus:border-indigo-600 dark:focus:border-indigo-400 rounded-md bg-white dark:bg-gray-700"
                name="status"
                id="status"
              >
                <option value="">Select Status</option>
                <option value="active">Activate</option>
                <option value="pending">Pending</option>
                <option value="deactive">Deactivate</option>
              </select>
              <button type="submit" className="bg-blue-700  text-center p-2 w-full md:w-40 font-medium text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
