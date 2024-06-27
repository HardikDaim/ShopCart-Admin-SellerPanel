import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Thunks
export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_sellers = createAsyncThunk(
  "chat/get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/get-sellers`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_customer_message = createAsyncThunk(
  "chat/get_customer_message",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-customer-message/${customerId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/seller/send-message-to-customer`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const send_message_seller_admin = createAsyncThunk(
  "chat/send_message_seller_admin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/send-message-seller-admin`, info, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_admin_message = createAsyncThunk(
  "chat/get_admin_message",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receiverId}`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const get_seller_message = createAsyncThunk(
  "chat/get_seller_message",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-messages`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: '',
    friends: [],
    seller_admin_message: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateSellers: (state, action) => {
      state.activeSeller = action.payload;
    },
    updateCustomers: (state, action) => {
      state.activeCustomer = action.payload;
    },
    updateAdminMessage: (state, action) => {
      state.seller_admin_message = [...state.seller_admin_message, action.payload];
    },
    updateSellerMessage: (state, action) => {
      state.seller_admin_message = [...state.seller_admin_message, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_customers.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_customers.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.customers = action.payload?.customers;
      })
      .addCase(get_customers.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // get customer message
      .addCase(get_customer_message.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_customer_message.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload.message;
        state.messages = action.payload?.messages;
        state.currentCustomer = action.payload?.currentCustomer;
      })
      .addCase(get_customer_message.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
      // send message to customer
      .addCase(send_message.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(send_message.fulfilled, (state, action) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(f => f.fdId === action.payload?.message?.receiverId);
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, action.payload?.message];
        state.successMessage = "Message Sent Successfully";
      })
      .addCase(send_message.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      // get sellers
      .addCase(get_sellers.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_sellers.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        state.sellers = action.payload?.sellers;
      })
      .addCase(get_sellers.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      // send message seller admin
      .addCase(send_message_seller_admin.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(send_message_seller_admin.fulfilled, (state, action) => {
        state.seller_admin_message = [...state.seller_admin_message, action.payload.message];
        state.successMessage = "Message Sent Successfully";
      })
      .addCase(send_message_seller_admin.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      // get admin messages
      .addCase(get_admin_message.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_admin_message.fulfilled, (state, action) => {
        state.seller_admin_message = action.payload.messages;
        state.currentSeller = action.payload.currentSeller;
      })
      .addCase(get_admin_message.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      })
      // get seller messages
      .addCase(get_seller_message.pending, (state) => {
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(get_seller_message.fulfilled, (state, action) => {
        state.seller_admin_message = action.payload.messages;
      })
      .addCase(get_seller_message.rejected, (state, action) => {
        state.errorMessage = action.payload?.error;
      });
  },
});

export const { messageClear, updateMessage, updateSellers, updateCustomers, updateSellerMessage, updateAdminMessage } = chatReducer.actions;
export default chatReducer.reducer;
