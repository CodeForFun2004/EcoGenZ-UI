// src/redux/slices/activitiesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllComments,
  CreateComments,
  fetchCommentByPostId,
} from "./commentThunk";
import type { CommentState } from "./commentTypes";

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  selectedComments: null,
  comment: null,
};
const activitiesSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = flatten(action.payload.result);
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch comments failed";
      })
      .addCase(CreateComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload as any);
      })
      .addCase(CreateComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      })
      .addCase(fetchCommentByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload as any);
      })
      .addCase(fetchCommentByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch comments by post ID";
      });

    // // Create Activity
    // .addCase(createActivity.fulfilled, (state, action) => {
    //   state.activities.push(action.payload);
    // })

    // // Update Activity
    // .addCase(updateActivity.fulfilled, (state, action) => {
    //   const index = state.activities.findIndex(a => a.activityId === action.payload.activityId);
    //   if (index !== -1) {
    //     state.activities[index] = action.payload;
    //   }
    // })

    // // Delete Activity
    // .addCase(deleteActivity.fulfilled, (state, action) => {
    //   state.activities = state.activities.filter(a => a.activityId !== action.payload);
    // });
  },
});

export default activitiesSlice.reducer;
function flatten(
  result: any
): import("immer").WritableDraft<import("./commentTypes").Comment>[] {
  throw new Error("Function not implemented.");
}
