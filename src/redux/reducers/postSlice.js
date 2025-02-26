import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://striveschool-api.herokuapp.com/api/posts";
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjNGRkZmU3MDMzNzAwMTUzMTZkYjIiLCJpYXQiOjE3NDA1NTc1ODAsImV4cCI6MTc0MTc2NzE4MH0.0fJ5NgSpFMU4uWETthgkfLu0gaAgNedZ8PkAQhPYzUk";

// Fetch all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
  return response.json();
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    content: [],
    status: "idle",
    error: null,
    visiblePostsCount: 20, // Numero di post visibili inizialmente
  },
  reducers: {
    loadMorePosts: (state) => {
      state.visiblePostsCount += 20; // Aumenta il numero di post visibili per ogni clic
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { loadMorePosts } = postSlice.actions;

export default postSlice.reducer;
