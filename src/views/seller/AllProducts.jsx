import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Pagination from "../Pagignation";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/reducers/ProductReducer";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, totalProducts } = useSelector((state) => state.product);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, perPage]);
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
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
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
                {products.map((d, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img className="max-w-24 max-h-24 object-contain" src={d.images[0]} alt={d.name} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {d.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{d.price.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {d.discount}% 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{d.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-start items-center gap-4">
                        <Link to={`/seller/dashboard/edit-product/${d._id}`}>
                          <MdEdit className="text-2xl text-slate-500 dark:text-slate-200" />
                        </Link>
                        <Link>
                          <FaEye className="text-2xl text-slate-500 dark:text-slate-200" />
                        </Link>
                        <Link>
                          <RiDeleteBin6Fill className="text-2xl text-slate-500 dark:text-slate-200" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
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
                parPage={parPage}
                showItem={3}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
