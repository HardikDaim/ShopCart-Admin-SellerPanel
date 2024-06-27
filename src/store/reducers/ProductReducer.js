import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/add-product", product, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async ({ perPage, page, searchValue }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/get-products?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-product/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-product`, product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { productId, oldImage, newImage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      console.log(...formData);
      const { data } = await api.post(`/product-image-update`, formData, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);


export const delete_product_image = createAsyncThunk(
  "product/delete_product_image",
  async ({ imageUrl, productId }, { rejectWithValue,fulfillWithValue }) => {
    try {
      console.log("imageUrl", imageUrl);
      console.log("productId", productId);
      const { data } = await api.post(
        `/delete-product-image`,
        { imageUrl, productId },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const add_image = createAsyncThunk(
  "product/add_image",
  async (formData, { rejectWithValue,fulfillWithValue }) => {
    try {
  console.log(...formData)
      const { data } = await api.post(
        `/add-image`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);



const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    product: "",
    products: [],
    totalProducts: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(add_product.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(add_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.products = [...state.products, action.payload.product];
      })
      .addCase(add_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Get Products
      .addCase(get_products.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.loader = false;
        state.totalProducts = action.payload.totalProducts;
        state.products = action.payload.products;
      })
      .addCase(get_products.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Get Single Product
      .addCase(get_product.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.loader = false;
        state.product = action.payload;
      })
      .addCase(get_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Update Product
      .addCase(update_product.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(update_product.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.product = action.payload.product;
      })
      .addCase(update_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Update Product Image
      .addCase(product_image_update.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(product_image_update.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.product = action.payload.product;
      })
      .addCase(product_image_update.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Delete Product Image
      .addCase(delete_product_image.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(delete_product_image.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message; 
        state.product = action.payload.product;
      })
      .addCase(delete_product_image.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // Add Product Images
      .addCase(add_image.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(add_image.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message; 
        state.product = action.payload.product;
      })
      .addCase(add_image.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      });
  },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
