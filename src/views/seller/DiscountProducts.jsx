import React, { useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagignation";

const DiscountProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="px-2 lg:px-7 py-5">
        <div className="w-full p-4 bg-slate-100 border-2 dark:border-slate-600 dark:bg-slate-800 rounded-md">
          <h2 className="text-xl text-slate-500  dark:text-slate-300 dark:text-white font-semibold mb-4">
            Discount Products
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
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-slate-500  dark:text-slate-300 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200 dark:divide-slate-600 dark:bg-slate-800 text-slate-500  dark:text-slate-300 tracking-wider font-medium">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">1</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      className="max-h-24 max-w-24 object-contain"
                      src="/images/category/1.jpg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Shoes</td>
                  <td className="px-6 py-4 whitespace-nowrap">Shoes</td>
                  <td className="px-6 py-4 whitespace-nowrap">Shoes</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹3,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">10%</td>
                  <td className="px-6 py-4 whitespace-nowrap">20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link>
                        <MdEdit className="text-2xl text-slate-500  dark:text-slate-300" />
                      </Link>
                      <Link>
                        <FaEye className="text-2xl text-slate-500  dark:text-slate-300" />
                      </Link>
                      <Link>
                        <RiDeleteBin6Fill className="text-2xl text-slate-500  dark:text-slate-300" />
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">2</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      className="md:w-40 md:h-40"
                      src="/images/category/2.jpg"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Watch</td>
                  <td className="px-6 py-4 whitespace-nowrap">Shoes</td>
                  <td className="px-6 py-4 whitespace-nowrap">Shoes</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹3,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">10%</td>
                  <td className="px-6 py-4 whitespace-nowrap">20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-start items-center gap-4">
                      <Link>
                        <MdEdit className="text-2xl text-slate-500  dark:text-slate-300" />
                      </Link>
                      <Link>
                        <FaEye className="text-2xl text-slate-500  dark:text-slate-300" />
                      </Link>
                      <Link>
                        <RiDeleteBin6Fill className="text-2xl text-slate-500  dark:text-slate-300" />
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                perPage={perPage}
                showItem={3}
              />
            </div>
        </div>
      </div>
    </>
  );
};

export default DiscountProducts;
