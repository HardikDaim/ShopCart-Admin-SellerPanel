import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const get_admiin_dashboard_data = createAsyncThunk(
  "dashboard/get_admiin_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-dashboard-data", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
export const get_seller_dashboard_data = createAsyncThunk(
  "dashboard/get_seller_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/seller/get-dashboard-data", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Auth Slice
const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrder: [],
    recentMessage: []
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_admiin_dashboard_data.fulfilled, (state, action) => {
        state.totalSale = action.payload.totalSale;
        state.totalOrder = action.payload.totalOrder;
        state.totalProduct = action.payload.totalProduct;
        state.totalSeller = action.payload.totalSeller;
        state.recentOrder = action.payload.recentOrder;
        state.recentMessage = action.payload.messages;
      })     
      .addCase(get_seller_dashboard_data.fulfilled, (state, action) => {
        state.totalSale = action.payload.totalSale;
        state.totalOrder = action.payload.totalOrder;
        state.totalProduct = action.payload.totalProduct;
        state.totalPendingOrder = action.payload.totalPendingOrder;
        state.recentOrder = action.payload.recentOrder;
        state.recentMessage = action.payload.messages;
      })     
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
