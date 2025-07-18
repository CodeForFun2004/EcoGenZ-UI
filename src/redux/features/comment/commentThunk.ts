import { createAsyncThunk } from "@reduxjs/toolkit";
import * as commentAPI from "./commentAPI";

export const fetchAllComments = createAsyncThunk(
  "activities/fetchAllComment",
  async () => {
    const data = await commentAPI.fetchAllComment();
    return data;
  }
);
// commentThunk.ts
export const fetchCommentByPostId = createAsyncThunk(
  "comments/fetchAll",
  async (postId: string) => {
    const data = await commentAPI.fetchCommentByPostId(postId);
    return data;
  }
);

export const CreateComments = createAsyncThunk<
  Comment,
  { content: string; userId: string; activityId: string }
>("activities/createComment", async (commentInfo) => {
  const data = await commentAPI.createComment(commentInfo);
  return data;
});
