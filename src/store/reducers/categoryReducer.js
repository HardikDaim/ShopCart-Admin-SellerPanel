import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      
      const { data } = await api.post("/add-category", formData, {
        withCredentials: true,
      });  
     return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_category = createAsyncThunk(
  "category/get_category",
  async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {      
      const { data } = await api.get(`/get-category?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });  
     return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Auth Slice
const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categories: [],
    totalCategory: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.categories = [...state.categories, action.payload.category]
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(get_category.fulfilled, (state, action) => {
        state.loader = false;
        state.totalCategory = action.payload.totalCategory;
        state.categories = action.payload.categories
      });
  },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
