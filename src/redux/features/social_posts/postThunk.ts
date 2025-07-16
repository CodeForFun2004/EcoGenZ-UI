import { createAsyncThunk } from "@reduxjs/toolkit";
import * as postAPI from "./postAPI";
import type { Post } from "./postTypes";

export const fetchAllPosts = createAsyncThunk(
  "post/get-all-posts",
  async () => {
    const data = await postAPI.fetchAllPosts();
    return data;
  }
);

export const createPost = createAsyncThunk<Post, FormData>(
  "post/create-post",
  async (formData) => {
    const data = await postAPI.createPost(formData);
    return data;
  }
);
