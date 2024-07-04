import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { add_product, messageClear } from "../../store/reducers/ProductReducer";
import { get_category } from "../../store/reducers/categoryReducer";
import LoaderOverlay from "../../components/LoaderOverlay";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(get_category({ searchValue: "", perPage: "", page: "" }));
  }, [dispatch]);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const [catShow, setCatShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srchValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(
        srchValue.length > 0 ? srchValue : [{ name: "No category found" }]
      );
    } else {
      setAllCategory(categories);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const handleImage = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = [...images, ...files];
      const newImageURLs = [...imageShow];
      for (let i = 0; i < files.length; i++) {
        newImageURLs.push({ url: URL.createObjectURL(files[i]) });
      }
      setImages(newImages);
      setImageShow(newImageURLs);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      const newImages = [...images];
      const newImageURLs = [...imageShow];
      newImages[index] = img;
      newImageURLs[index] = { url: URL.createObjectURL(img) };
      setImages(newImages);
      setImageShow(newImageURLs);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("brand", state.brand);
    formData.append("stock", state.stock);
    formData.append("shopName", "Easy Shop");
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(add_product(formData));
  };

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
    }
  }, [errorMessage, successMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 py-5">
      {loader && <LoaderOverlay />}
      <div className="w-full p-4 bg-slate-100 dark:bg-slate-800 border-2 dark:border-slate-600 rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-slate-700 dark:text-slate-200 font-semibold text-xl">Add Product</h2>
          <Link
            to="/seller/dashboard/all-products"
            className="transition duration-500 ease-in-out text-white font-semibold rounded-md bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2"
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-slate-700 dark:text-slate-200">
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
                  className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-slate-700"
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  required
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
                  className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-slate-700"
                  type="text"
                  id="brand"
                  placeholder="Product Brand"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-slate-700 dark:text-slate-200">
              <div className="flex flex-col w-full gap-1 relative">
                <label
                  className="text-sm font-semibold"
                  htmlFor="category"
                >
                  Category
                </label>
                <div className="relative">
                  <input
                    readOnly
                    onClick={() => setCatShow(!catShow)}
                    value={category}
                    className="w-full outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out pr-10 dark:bg-slate-700"
                    type="text"
                    id="category"
                    placeholder="Select Category"
                    required
                  />
                  <div className="absolute  inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {catShow ? (
                      <FiChevronUp className="text-slate-700 dark:text-slate-300" />
                    ) : (
                      <FiChevronDown className="text-slate-700 dark:text-slate-300" />
                    )}
                  </div>
                </div>
                <div
                  className={`absolute z-10 top-[102%] bg-white dark:bg-slate-700 border-2 dark:border-slate-600 w-full transition-all ${
                    catShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      onChange={categorySearch}
                      value={searchValue}
                      className="px-3 py-1 w-full bg-transparent border-2 dark:border-slate-600 focus:border-blue-600 dark:focus:border-blue-600 outline-none rounded-md transition duration-150 ease-in-out overflow-hidden dark:bg-slate-600"
                      type="text"
                      placeholder="Search..."
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex flex-col gap-2 justify-start items-start h-[200px] overflow-x-scroll">
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        onClick={() => {
                          setCatShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categories);
                        }}
                        className="cursor-pointer py-2 px-4 w-full bg-slate-50 dark:bg-slate-600 hover:bg-slate-200 rounded-md"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
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
                  className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-slate-700"
                  type="number"
                  id="stock"
                  placeholder="Product stock"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-slate-700 dark:text-slate-200">
              <div className="flex flex-col w-full gap-1">
                <label
                  className="text-sm font-semibold"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  onChange={handleInput}
                  value={state.price}
                  name="price"
                  className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-slate-700"
                  type="number"
                  id="price"
                  placeholder="Price"
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label
                  className="text-sm font-semibold"
                  htmlFor="discount"
                >
                  Discount in '%'
                </label>
                <input
                  onChange={handleInput}
                  value={state.discount}
                  name="discount"
                  className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-slate-700"
                  type="number"
                  id="discount"
                  placeholder="Discount by '%'"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label
                className="text-sm font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                rows="5"
                cols="10"
                onChange={handleInput}
                value={state.description}
                name="description"
                className="outline-none border-2 dark:border-slate-600 rounded-md shadow-md focus:border-blue-700 dark:focus:border-blue-600 p-2 transition duration-150 ease-in-out dark:bg-slate-700"
                id="description"
                placeholder="Description"
                required
              />
            </div>
            <div className="w-full my-4 text-slate-700 dark:text-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {imageShow.map((img, i) => (
                <div className="h-[180px] relative" key={i}>
                  <label htmlFor={`image-${i}`}>
                    <img
                      className="w-full h-full rounded-md"
                      src={img.url}
                      alt={`Product Image ${i + 1}`}
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[0], i)}
                    type="file"
                    className="hidden"
                    id={`image-${i}`}
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="absolute z-10 cursor-pointer top-1 right-1 rounded-full bg-white p-1 hover:bg-slate-200 dark:bg-slate-600"
                  >
                    <IoMdCloseCircle className="text-2xl text-red-500" />
                  </span>
                </div>
              ))}
              <label
                className="flex w-full bg-white shadow-md dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold flex-col h-[180px] cursor-pointer border-2 border-dashed dark:border-slate-600 dark:hover:border-blue-600 hover:border-blue-600 justify-center items-center"
                htmlFor="image"
              >
                <span>
                  <IoMdImages className="text-xl" />
                </span>
                <span>Select Images</span>
              </label>
              <input
                multiple
                onChange={handleImage}
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div className="flex justify-center">
              <button
                disabled={loader}
                className="transition duration-500 ease-in-out my-4 text-white font-semibold rounded-md bg-orange-500 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 px-7 py-2 "
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
