import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//Thunks
export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/get-admin-orders?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
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

export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { perPage, page, searchValue, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/seller/get-seller-orders/${sellerId}?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
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

export const get_admin_order = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-admin-order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_seller_order = createAsyncThunk(
  "order/get_seller_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-seller-order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/admin-order-status/update/${orderId}`,
        info,
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

export const seller_order_status_update = createAsyncThunk(
  "order/seller_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/seller/seller-order-status/update/${orderId}`,
        info,
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

// Auth Slice
const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    order: {},
    myOrders: [],
    totalOrders: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // get admin orders
      .addCase(get_admin_orders.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_admin_orders.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.totalOrders = action.payload?.totalOrders;
        state.myOrders = action.payload?.orders;
      })
      .addCase(get_admin_orders.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get admin order details
      .addCase(get_admin_order.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_admin_order.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.order = action.payload?.order;
      })
      .addCase(get_admin_order.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // admin order status update
      .addCase(admin_order_status_update.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(admin_order_status_update.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
      })
      .addCase(admin_order_status_update.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get seller orders
      .addCase(get_seller_orders.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_seller_orders.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.totalOrders = action.payload?.totalOrders;
        state.myOrders = action.payload?.orders;
      })
      .addCase(get_seller_orders.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get seller order details
      .addCase(get_seller_order.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_seller_order.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.order = action.payload?.order;
      })
      .addCase(get_seller_order.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
        // seller order status update
        .addCase(seller_order_status_update.pending, (state) => {
          state.loader = true;
          state.errorMessage = "";
          state.successMessage = "";
        })
        .addCase(seller_order_status_update.fulfilled, (state, action) => {
          state.loader = false;
          state.successMessage = action.payload.message;
        })
        .addCase(seller_order_status_update.rejected, (state, action) => {
          state.loader = false;
          state.errorMessage = action.payload?.error;
        })
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
