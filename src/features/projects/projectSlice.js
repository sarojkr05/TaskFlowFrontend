import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/projects');
      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch projects");
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;