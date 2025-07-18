// src/redux/slices/activitiesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllActivities,
  fetchActivityById,
  registerActivities,
  //   createActivity,
  //   updateActivity,
  //   deleteActivity,
} from "./activitiesThunk";
import type { ActivityState } from "./activitiesTypes";

const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
  selectedActivity: null,
  message: "",
};
const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch activities failed";
      })
      .addCase(fetchActivityById.pending, (state) => {
        state.loading = true;
        state.selectedActivity = null;
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedActivity = action.payload;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch activity";
      })
      .addCase(registerActivities.pending, (state) => {
        state.loading = true;
        state.selectedActivity = null;
      })
      .addCase(registerActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(registerActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register activity";
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
