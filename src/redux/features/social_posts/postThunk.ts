import { createAsyncThunk } from "@reduxjs/toolkit";
import * as postAPI from "./postAPI";
import type { Post } from "./postTypes";
import { toast } from "react-toastify";

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

export const updatePost = createAsyncThunk<
  Post,
  { id: string; content: string; mediaUrl: string; userid: string }
>("post/create-post", async (postInfo) => {
  const data = await postAPI.updatePost(postInfo);
  return data;
});
export const deletePostById = createAsyncThunk(
  "post/deletePostById",
  async (postId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/Post/delete-post/${postId}`, {
        method: "DELETE",
        credentials: "include", // if using cookies for auth
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        return rejectWithValue(error);
      }

      toast.success("Post deleted successfully");
      return postId;
    } catch (err) {
      toast.error("Failed to delete post");
      return rejectWithValue(err);
    }
  }
);
