import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunks for fetching jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetch("/api/jobs");
  return response.json();
});

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    content: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
