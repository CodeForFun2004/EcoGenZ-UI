// src/redux/thunks/activitiesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as activitiesAPI from "./activitiesAPI";
import type { Activity } from "./activitiesTypes";

export const fetchAllActivities = createAsyncThunk(
  "activities/fetchActivities",
  async () => {
    const data = await activitiesAPI.fetchAllActivites();
    return data;
  }
);

// activitiesThunk.ts
export const fetchActivityById = createAsyncThunk(
  "activities/get-activity",
  async (activityId: string) => {
    const res = await activitiesAPI.fetchActivityById(activityId);
    return await res;
  }
);

export const registerActivities = createAsyncThunk<
  string,
  { activityId: string; userId: string },
  { rejectValue: string }
>(
  "activities/register",
  async ({ activityId, userId }, { rejectWithValue }) => {
    try {
      const res = await activitiesAPI.registerActivities(activityId, userId);

      if (
        res === "User already registered." ||
        res === "Registered successfully."
      ) {
        return res;
      }

      // If message is not expected
      return rejectWithValue("Unexpected response from server.");
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);
