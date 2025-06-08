// features/task/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    selectedTask: null,
    filterStatus: "all", // optional UI filter (e.g., "all", "pending", "completed")
  },
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  setSelectedTask,
  clearSelectedTask,
  setFilterStatus,
} = taskSlice.actions;

export default taskSlice.reducer;
