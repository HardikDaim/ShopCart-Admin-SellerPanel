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
} from "../../store/reducers/categoryReducer";
import { toast } from "react-hot-toast";
import Search from "../components/Search";

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

  const handleInput = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({ ...state, image: files[0] });
    }
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(addCategory(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
      setState({
        name: "",
        image: "",
      });
      setImage("");
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
  }, [searchValue, currentPage, perPage]);

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
                          <Link>
                            <MdEdit className="text-2xl text-gray-500 dark:text-gray-400" />
                          </Link>
                          <Link>
                            <RiDeleteBin6Fill className="text-2xl text-gray-500 dark:text-gray-400" />
                          </Link>
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
            } z-40 top-0 transition-all duration-500`}
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
      </div>
    </>
  );
};

export default Category;
