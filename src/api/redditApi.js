import axios from "axios";

const redditApi = axios.create({
  baseURL: "https://www.reddit.com",
  timeout: 15000,
});

export const fetchPosts = async (subreddit = "popular", after = null) => {
  try {
    const url = after 
      ? `/r/${subreddit}/hot.json?after=${after}` 
      : `/r/${subreddit}/hot.json`;
    const response = await redditApi.get(url);
    
    return {
      posts: response.data.data.children.map((child) => child.data),
      after: response.data.data.after
    };

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const searchPosts = async (searchTerm, after = null) => {
  try {
    const url = after
      ? `/search.json?q=${encodeURIComponent(searchTerm)}&sort=relevance&t=all&after=${after}`
      : `/search.json?q=${encodeURIComponent(searchTerm)}&sort=relevance&t=all`;
    const response = await redditApi.get(url);
    
    return {
      posts: response.data.data.children.map((child) => child.data),
      after: response.data.data.after
    };
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
}

export const fetchComments = async (subreddit, postId) => {
  try {
    const response = await redditApi.get(`/r/${subreddit}/comments/${postId}.json`);
    return response.data[1].data.children.map((child) => child.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};