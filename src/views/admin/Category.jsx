import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Pagination from "../Pagignation";
import { FaFileUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import LoaderOverlay from "../../components/LoaderOverlay";
import {
  addCategory,
  messageClear,
  get_category,
  updateCategory,
  deleteCategory,
} from "../../store/reducers/categoryReducer";
import { toast } from "react-hot-toast";
import Search from "../components/Search";
import Modal from "../../components/Modal";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, categories, totalCategory } =
    useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [state, setState] = useState({
    name: "",
    image: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedImage, setUpdatedImage] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleInput = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({ ...state, image: files[0] });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    if (!state.name) {
      toast.error("Please Enter Category Name");
    }
    if (!state.image) {
      toast.error("Please Enter Category Image");
    }
    if (state.name && state.image) {
      dispatch(addCategory(state));
      setState({ name: "", image: "" });
      setShow(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUpdatedImage(URL.createObjectURL(files[0]));
      setSelectedCategory({ ...selectedCategory, image: files[0] });
    }
  };

  const clearImage = () => {
    setUpdatedImage("");
    setSelectedCategory({ ...selectedCategory, image: "" });
  };

  const editCategory = (category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const delete_Category = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleSave = () => {
    dispatch(updateCategory(selectedCategory));
    setIsCategoryModalOpen(false);
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

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, perPage, dispatch]);

  return (
    <>
      <div className="px-2 lg:px-7 pt-5">
        {loader && <LoaderOverlay />}
        <div className="flex lg:hidden justify-between items-center my-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border-2 dark:border-gray-600">
          <h1 className="text-gray-500 dark:text-white font-semibold text-xl">
            Add Category
          </h1>
          <button
            onClick={() => setShow(!show)}
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 cursor-pointer text-white rounded-md text-md"
          >
            Add
          </button>
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full lg:w-7/12 bg-gray-50 dark:bg-gray-800 border-2 dark:border-gray-600 p-4 rounded-md">
            <Search
              setPerPage={setPerPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-600 text-gray-500 dark:text-gray-400 dark:bg-gray-800 tracking-wider font-medium">
                  {categories.map((d, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          className="max-h-24 max-w-24 object-contain"
                          src={d.image}
                          alt={d.name}
                        />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">{d.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-start items-center gap-4">
                          <button onClick={() => editCategory(d)}>
                            <MdEdit className="text-2xl text-gray-500 dark:text-gray-400" />
                          </button>
                          <button onClick={() => delete_Category(d)}>
                            <RiDeleteBin6Fill className="text-2xl text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalCategory > perPage && (
              <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                <Pagination
                  pageNumber={currentPage}
                  setPageNumber={setCurrentPage}
                  totalItem={totalCategory}
                  perPage={perPage}
                  showItem={3}
                />
              </div>
            )}
          </div>
          <div
            className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
              show ? "right-0" : "-right-[340px]"
            } z-40 lg:z-30 top-0 transition-all duration-500`}
          >
            <div className="w-full pl-5">
              <div className="bg-gray-50 dark:bg-gray-800 border-2 dark:border-gray-600 h-screen lg:h-auto px-3 py-2 lg:rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-grow text-center">
                    <h1 className="text-xl text-center font-semibold text-gray-500 dark:text-white">
                      Add Category
                    </h1>
                  </div>
                  <div className="lg:hidden">
                    <IoClose
                      onClick={() => setShow(!show)}
                      className="text-2xl text-gray-500 dark:text-white"
                    />
                  </div>
                </div>
                <form onSubmit={add_category}>
                  <div className="flex flex-col w-full gap-1 mb-3">
                    <label
                      className="text-gray-500 dark:text-white font-medium"
                      htmlFor="name"
                    >
                      Category Name
                    </label>
                    <input
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                      className="p-2 border-2 dark:bg-gray-700 dark:border-gray-600 caret-blue-600 text-gray-500 dark:text-white font-medium rounded-md outline-none focus:border-blue-500"
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Category Name"
                    />
                  </div>
                  <div>
                    <label
                      className="flex flex-col h-[238px] justify-center items-center cursor-pointer border-4 border-dashed rounded-md dark:border-gray-600 hover:border-blue-600 w-full"
                      htmlFor="image"
                    >
                      {image ? (
                        <img
                          className="w-full h-full object-cover"
                          src={image}
                          alt="Category"
                        />
                      ) : (
                        <>
                          <span>
                            <FaFileUpload className="text-2xl text-gray-500 dark:text-white" />
                          </span>
                          <span className="text-lg text-gray-500 dark:text-white font-semibold">
                            Upload Image
                          </span>
                        </>
                      )}
                    </label>
                    <input
                      onChange={handleInput}
                      className="hidden"
                      type="file"
                      name="image"
                      id="image"
                    />
                    <div className="text-center w-full">
                      <button
                        disabled={loader}
                        className="transition duration-500 ease-in-out bg-blue-700 hover:bg-blue-800 transform hover:-translate-y-1 hover:scale-104 p-2 w-full my-3 font-medium text-white rounded-md"
                      >
                        Add Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isCategoryModalOpen} setIsOpen={setIsCategoryModalOpen}>
          {selectedCategory && (
            <div className="">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Edit Category
              </h2>
              <form className="space-y-4">
                {/* Image Upload Section */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                    {updatedImage ? (
                      <img
                        src={updatedImage}
                        alt={selectedCategory.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={selectedCategory.image}
                        alt={selectedCategory.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="file"
                        id="updatedImage"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="updatedImage"
                        className="cursor-pointer bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md py-1 px-3 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 transition duration-200"
                      >
                        Change Image
                      </label>
                      {selectedCategory.image && (
                        <button
                          type="button"
                          className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium hover:bg-red-600 transition duration-200"
                          onClick={clearImage}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Name Section */}
                <div className="flex-col items-center ">
                  <label
                    htmlFor="name"
                    className=" mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className=" py-2 px-1 block w-full rounded-md bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm text-gray-700 dark:text-gray-300"
                    value={selectedCategory.name}
                    onChange={(e) =>
                      setSelectedCategory({
                        ...selectedCategory,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="ml-2 inline-flex justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => setIsCategoryModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </Modal>
        {/* Delete Modal */}
        <Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen}>
          <div className="flex flex-col items-center ">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion!</h2>
            {selectedCategory && (
              <>
                <p className="mb-4 ">
                  Are you sure you want to delete the category{" "}
                  <span className="font-bold">{selectedCategory.name}</span>?
                  Note: This action is Irreversible and Delete the Category
                  along with the Products Listed with the{" "}
                  <strong>{selectedCategory.name}</strong> Category.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      dispatch(deleteCategory(selectedCategory));
                      setDeleteModalOpen(false);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteModalOpen(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Category;
