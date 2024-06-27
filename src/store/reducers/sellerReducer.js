import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//Thunks
export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-seller-request?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update/`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_active_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-active-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_deactive_sellers = createAsyncThunk(
  "seller/get_deactive_sellers",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const create_paypal_connect_account = createAsyncThunk(
  "seller/create_paypal_connect_account",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/payment/create-paypal-connect-account`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Auth Slice
const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_seller_request.fulfilled, (state, action) => {
        state.loader = false;
        state.sellers = action.payload?.sellers;
        state.totalSeller = action.payload?.totalSeller;
        state.successMessage = action.payload.message;
      })
      .addCase(get_seller_request.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(get_seller.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_seller.fulfilled, (state, action) => {
        state.loader = false;
        state.seller = action.payload?.seller;
        state.successMessage = action.payload.message;
      })
      .addCase(get_seller.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(seller_status_update.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(seller_status_update.fulfilled, (state, action) => {
        state.loader = false;
        state.seller = action.payload?.seller;
        state.successMessage = action.payload.message;
      })
      .addCase(seller_status_update.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get active sellers
      .addCase(get_active_sellers.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_active_sellers.fulfilled, (state, action) => {
        state.loader = false;
        state.sellers = action.payload?.sellers;
        state.totalSeller = action.payload?.totalSeller;
        state.successMessage = action.payload.message;
      })
      .addCase(get_active_sellers.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get deactive sellers
      .addCase(get_deactive_sellers.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_deactive_sellers.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.sellers = action.payload?.sellers;
        state.totalSeller = action.payload?.totalSeller;
      })
      .addCase(get_deactive_sellers.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      .addCase(create_paypal_connect_account.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(create_paypal_connect_account.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.seller = action.payload?.seller;
      
      })
      .addCase(create_paypal_connect_account.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
