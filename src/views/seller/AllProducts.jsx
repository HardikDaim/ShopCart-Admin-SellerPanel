import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagignation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  get_products,
  messageClear,
} from "../../store/reducers/ProductReducer";
import Modal from "../../components/Modal";
import { toast } from "react-hot-toast";
import LoaderOverlay from "../../components/LoaderOverlay";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, totalProducts, loader, successMessage, errorMessage } =
    useSelector((state) => state.product);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, perPage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  const delete_product = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(selectedProduct));
    setDeleteModalOpen(false);
  };
  return (
    <>
      <div className="px-2 lg:px-7 py-5">
        <div className="w-full p-4 bg-slate-100 border-2 dark:border-slate-600 dark:bg-slate-800 rounded-md">
          <h2 className="text-xl  dark:text-white font-semibold mb-4">
            All Products
          </h2>
          <div>
            <Search
              setPerPage={setPerPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-600">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-600 dark:text-slate-300 tracking-wider font-medium">
                {products.length > 0 ? (
                  products.map((d, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          className="max-w-24 max-h-24 object-contain"
                          src={d.images[0]}
                          alt={d.name}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{d.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {d.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{d.brand}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{d.price.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {d.discount}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{d.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-start items-center gap-4">
                          <Link to={`/seller/dashboard/edit-product/${d._id}`}>
                            <MdEdit className="text-2xl text-slate-500 dark:text-slate-200" />
                          </Link>
                          <button
                            onClick={() =>
                              window.open(
                                `https://shop-cart-ten-chi.vercel.app/product/details/${d.slug}`,
                                "_blank"
                              )
                            }
                          >
                            <FaEye className="text-2xl text-slate-500 dark:text-slate-200" />
                          </button>
                          <button onClick={() => delete_product(d)}>
                            <RiDeleteBin6Fill className="text-2xl text-slate-500 dark:text-slate-200" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalProducts <= perPage ? (
            ""
          ) : (
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                perPage={perPage}
                showItem={3}
              />
            </div>
          )}
        </div>

        <Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen}>
          {loader && <LoaderOverlay />}
          {selectedProduct && (
            <div className="flex flex-col items-center justify-center ">
              <h1 className="text-2xl font-bold text-center dark:text-white">
                Are you sure you want to delete this product?
              </h1>
              <div className="mt-4">
                <h2 className="text-lg font-semibold dark:text-white">
                  <strong>Product Name:</strong> {selectedProduct.name}
                </h2>
                <h2 className="text-lg font-semibold dark:text-white">
                  <strong>Product Images:</strong>{" "}
                </h2>
                <div className="overflow-x-auto">
                  <div className=" flex items-center gap-4 w-20 h-20 ">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        className="w-full h-full object-cover rounded-md "
                        src={image}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Category:</strong> {selectedProduct.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Brand:</strong> {selectedProduct.brand}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Price:</strong> ₹{selectedProduct.price}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>Stock:</strong> {selectedProduct.stock}
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default AllProducts;
