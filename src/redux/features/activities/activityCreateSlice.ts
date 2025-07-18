import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllActivities,
  searchActivities,
  fetchActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  resetSearch,
  clearErrors,
} from "./activityThunk";
import type { ActivityState } from "./activityTypes";

const initialState: ActivityState = {
  activities: [],
  currentActivity: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  searchError: null,
  createLoading: false,
  createError: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    // Sync reducers nếu cần
    setCurrentActivity: (state, action) => {
      state.currentActivity = action.payload;
    },
    clearCurrentActivity: (state) => {
      state.currentActivity = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Activities
      .addCase(fetchAllActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload.result || action.payload.data || [];
        state.totalCount = action.payload.totalCount || state.activities.length;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch activities";
      })

      // Search Activities
      .addCase(searchActivities.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchActivities.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults =
          action.payload.result || action.payload.data || [];
        state.totalCount =
          action.payload.totalCount || state.searchResults.length;
      })
      .addCase(searchActivities.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError =
          action.error.message || "Failed to search activities";
      })

      // Fetch Activity By ID
      .addCase(fetchActivityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentActivity = action.payload.result || action.payload.data;
      })
      .addCase(fetchActivityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch activity";
      })

      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.createLoading = false;
        const newActivity = action.payload.result || action.payload.data;
        if (newActivity) {
          state.activities.unshift(newActivity);
        }
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.error.message || "Failed to create activity";
      })

      // Update Activity
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        const updatedActivity = action.payload.result || action.payload.data;
        if (updatedActivity) {
          const index = state.activities.findIndex(
            (a) => a.activityId === updatedActivity.activityId
          );
          if (index !== -1) {
            state.activities[index] = updatedActivity;
          }
          // Cập nhật currentActivity nếu đang hiển thị
          if (
            state.currentActivity?.activityId === updatedActivity.activityId
          ) {
            state.currentActivity = updatedActivity;
          }
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update activity";
      })

      // Delete Activity
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload.activityId;
        state.activities = state.activities.filter(
          (a: any) => a.activityId !== deletedId
        );
        // Clear currentActivity nếu đã bị xóa
        if (state.currentActivity?.activityId === deletedId) {
          state.currentActivity = null;
        }
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete activity";
      })

      // Reset Search
      .addCase(resetSearch.fulfilled, (state) => {
        state.searchResults = [];
        state.searchError = null;
        state.searchLoading = false;
      })

      // Clear Errors
      .addCase(clearErrors.fulfilled, (state) => {
        state.error = null;
        state.searchError = null;
        state.createError = null;
      });
  },
});

export const { setCurrentActivity, clearCurrentActivity, setCurrentPage } =
  activitySlice.actions;

export default activitySlice.reducer;
