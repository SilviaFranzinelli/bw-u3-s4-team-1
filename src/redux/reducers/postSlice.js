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

// Create a new post
export const createPost = createAsyncThunk("posts/createPost", async (newPost) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(newPost),
  });
  return response.json();
});

// Update a post
export const updatePost = createAsyncThunk("posts/updatePost", async ({ id, updatedPost }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(updatedPost),
  });
  return response.json();
});

// Delete a post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
  return id;
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    content: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.content.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.content.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state.content[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.content = state.content.filter((post) => post._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
