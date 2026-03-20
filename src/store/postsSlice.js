import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, searchPosts } from '../api/redditApi';

// Async Thunks
export const fetchPostsAsync = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit = 'popular') => {
    const response = await fetchPosts(subreddit);
    return response; // { posts, after }
  }
);

export const loadMorePostsAsync = createAsyncThunk(
  'posts/loadMorePosts',
  async ({ subreddit = 'popular', searchTerm = '', after }) => {
    let response;
    if (searchTerm) {
      response = await searchPosts(searchTerm, after);
    } else {
      response = await fetchPosts(subreddit, after);
    }
    return response; // { posts, after }
  }
);

export const searchPostsAsync = createAsyncThunk(
  'posts/searchPosts',
  async (searchTerm) => {
    const response = await searchPosts(searchTerm);
    return response;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    loadingMore: false,
    error: null,
    selectedSubreddit: 'popular',
    searchTerm: '',
    afterToken: null,
  },
  reducers: {
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
      state.afterToken = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.afterToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.afterToken = action.payload.after;
        state.error = null;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchPostsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchPostsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.afterToken = action.payload.after;
        state.error = null;
      })
      .addCase(searchPostsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadMorePostsAsync.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(loadMorePostsAsync.fulfilled, (state, action) => {
        state.loadingMore = false;
        // On AJOUTE les nouveaux posts au lieu de remplacer
        state.posts = [...state.posts, ...action.payload.posts];
        state.afterToken = action.payload.after;
      })
      .addCase(loadMorePostsAsync.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedSubreddit, setSearchTerm } = postsSlice.actions;
export default postsSlice.reducer;