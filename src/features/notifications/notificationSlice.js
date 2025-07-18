import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const selectNotifications = createSelector(
  (state) => state.notifications.items,
  (items) => items
);

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/notifications"); // 👈 FIXED
      return data.notifications;  
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications"
      );
    }
  }
);

export const markAllAsRead = createAsyncThunk(
    "notification/markNotificationAsRead",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.patch(`/notifications/read-all`);
            return data.notifications;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to mark notification as read"
            );
        }
    }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default notificationSlice.reducer;