import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/reducers/categoryReducer";
import {
  get_product,
  messageClear,
  update_product,
  product_image_update,
  delete_product_image,
  add_image,
} from "../../store/reducers/ProductReducer";
import LoaderOverlay from "../../components/LoaderOverlay";
import { toast } from "react-hot-toast";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loader, errorMessage, successMessage, product } = useSelector(
    (state) => state.product
  );

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [catShow, setCatShow] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, perPage]);

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (product) {
      setState({
        name: product.name,
        description: product.description,
        discount: product.discount,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
      });
      setCategory(product.category);
      setImages(product.images);
      setImageShow(product.images);
    }
  }, [product]);

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
    setAllCategory(categories);
  }, [categories]);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setAllCategory(
        filteredCategories.length > 0
          ? filteredCategories
          : [{ name: "No category found" }]
      );
    } else {
      setAllCategory(categories);
    }
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...images, ...files];
      const newImageURLs = [...imageShow];
      files.forEach((file) => {
        newImageURLs.push(URL.createObjectURL(file));
        const formData = new FormData();
        formData.append("newImage", file);
        formData.append("productId", productId);
        dispatch(add_image(formData));
      });
      setImages(newImages);
      setImageShow(newImageURLs);
    }
  };

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({ oldImage: img, productId, newImage: files[0] })
      );
    }
  };

  const removeImage = (img, index) => {
    try {
      dispatch(delete_product_image({ imageUrl: img, productId }));
      const filteredImages = images.filter((_, i) => i !== index);
      const filteredImageUrls = imageShow.filter((_, i) => i !== index);
      setImages(filteredImages);
      setImageShow(filteredImageUrls);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const update = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      category,
      productId,
    };
    dispatch(update_product(obj));
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      {loader && <LoaderOverlay />}
      <div className="w-full p-4 bg-gray-200 dark:bg-gray-800 border-2 rounded-md dark:border-gray-600">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-gray-700 dark:text-white font-semibold text-xl">
            Edit Product
          </h2>
          <Link
            to="/seller/dashboard/all-products"
            className="transition duration-500 ease-in-out text-white font-semibold rounded-md bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2"
          >
            All Products
          </Link>
        </div>
        <form onSubmit={update}>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-700 dark:text-gray-300">
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="name"
              >
                Product Name
              </label>
              <input
                onChange={handleInput}
                value={state.name}
                name="name"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-600 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
                type="text"
                id="name"
                placeholder="Product Name"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="brand"
              >
                Product Brand
              </label>
              <input
                onChange={handleInput}
                value={state.brand}
                name="brand"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-600 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
                type="text"
                id="brand"
                placeholder="Product Brand"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-700 dark:text-gray-300">
            <div className="flex flex-col w-full gap-1 relative">
              <label
                className="text-sm font-semibold"
                htmlFor="category"
              >
                Category
              </label>
              <div className="relative ">
                <input
                  readOnly
                  onClick={() => setCatShow(!catShow)}
                  value={category}
                  className="w-full outline-none border-2 focus:border-blue-600 dark:focus:border-blue-600 dark:border-slate-600 rounded-md shadow-md p-2 transition-all duration-150 ease-in-out pr-10 dark:bg-gray-700 dark:text-white"
                  type="text"
                  id="category"
                  placeholder="Select Category"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {catShow ? (
                    <FiChevronUp className="text-gray-700 dark:text-white" />
                  ) : (
                    <FiChevronDown className="text-gray-700 dark:text-white" />
                  )}
                </div>
              </div>
              <div
                className={`absolute top-[101%] bg-white dark:bg-gray-700 z-50 w-full shadow-lg rounded-md p-2 ${
                  catShow ? "block" : "hidden"
                }`}
              >
                <input
                  onChange={categorySearch}
                  value={searchValue}
                  className="w-full outline-none border-b-2 p-2 mb-2 dark:bg-gray-800 dark:border-slate-600 dark:text-white"
                  type="text"
                  placeholder="Search Category"
                />
                <div className="max-h-60 overflow-y-auto">
                  {allCategory.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (c.name !== "No category found") {
                          setCategory(c.name);
                          setCatShow(false);
                        }
                      }}
                      className={`p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 ${
                        c.name === "No category found"
                          ? "cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="price"
              >
                Product Price
              </label>
              <input
                onChange={handleInput}
                value={state.price}
                name="price"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-600 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
                type="number"
                id="price"
                placeholder="Product Price"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-gray-700 dark:text-gray-300">
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="stock"
              >
                Product Stock
              </label>
              <input
                onChange={handleInput}
                value={state.stock}
                name="stock"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-600 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
                type="number"
                id="stock"
                placeholder="Product Stock"
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="discount"
              >
                Discount
              </label>
              <input
                onChange={handleInput}
                value={state.discount}
                name="discount"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-600 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-white"
                type="number"
                id="discount"
                placeholder="Discount"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 w-full text-gray-700 dark:text-gray-300">
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="description"
              >
                Product Description
              </label>
              <textarea
                onChange={handleInput}
                value={state.description}
                name="description"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-600 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out h-32 dark:bg-gray-700 dark:text-white"
                id="description"
                rows="4"
                placeholder="Product Description"
              />
            </div>
          </div>
          <div className="flex flex-col mb-3 w-full text-gray-700 dark:text-gray-300">
            <label className="text-sm font-semibold" htmlFor="images">
              Product Images
            </label>
            <div className="flex gap-2 flex-wrap">
              {imageShow.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt="product"
                    className="w-24 h-24 object-cover rounded-md border-2 dark:border-slate-600 dark:border-gray-600"
                  />
                  <input
                    onChange={(e) => changeImage(img, e.target.files)}
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={(e) => removeImage(img, i)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
              <div>
                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 dark:border-slate-600 border-dashed border-gray-500 rounded-md cursor-pointer dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-300">+</span>
                  <input
                    onChange={handleImage}
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="transition duration-500 ease-in-out text-white font-semibold rounded-md bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
