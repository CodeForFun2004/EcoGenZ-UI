import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchOrganizerActivities,
  searchOrganizerActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "./organizerActivitiesThunk";
import type {
  OrganizerActivitiesState,
  Activity,
} from "./organizerActivitiesTypes";

const initialState: OrganizerActivitiesState = {
  activities: [],
  loading: false,
  error: null,
  searchTerm: "",
  selectedActivity: null,
};

const organizerActivitiesSlice = createSlice({
  name: "organizerActivities",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedActivity: (state, action: PayloadAction<Activity | null>) => {
      state.selectedActivity = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearActivities: (state) => {
      state.activities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Organizer Activities
      .addCase(fetchOrganizerActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizerActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload || [];
      })
      .addCase(fetchOrganizerActivities.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Fetch organizer activities failed";
      })

      // Search Organizer Activities
      .addCase(searchOrganizerActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchOrganizerActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload?.items || action.payload || [];
      })
      .addCase(searchOrganizerActivities.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Search organizer activities failed";
      })

      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activities.unshift(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Create activity failed";
      })

      // Update Activity
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.activities.findIndex(
          (activity) => activity.activityId === action.payload.activityId
        );
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update activity failed";
      })

      // Delete Activity
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = state.activities.filter(
          (activity) => activity.activityId !== action.payload
        );
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Delete activity failed";
      });
  },
});

export const {
  setSearchTerm,
  setSelectedActivity,
  clearError,
  clearActivities,
} = organizerActivitiesSlice.actions;

export default organizerActivitiesSlice.reducer;
