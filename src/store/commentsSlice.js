import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments } from "../api/redditApi";

// Async Thunk pour charger les commentaires d'un post
export const fetchCommentsAsync = createAsyncThunk(
  "comments/fetchComments",
  async ({ subreddit, postId }) => {
    const comments = await fetchComments(subreddit, postId);
    return comments;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearComments: (state) => {
      state.comments = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
        state.error = null;
      })
      .addCase(fetchCommentsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;