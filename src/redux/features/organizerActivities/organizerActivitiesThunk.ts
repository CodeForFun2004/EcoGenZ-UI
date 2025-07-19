import { createAsyncThunk } from "@reduxjs/toolkit";
import * as organizerActivitiesAPI from "./organizerActivitiesAPI";
import type {
  Activity,
  ActivitySearchRequest,
} from "./organizerActivitiesTypes";

export const fetchOrganizerActivities = createAsyncThunk(
  "organizerActivities/fetchOrganizerActivities",
  async (userId: string) => {
    const data = await organizerActivitiesAPI.fetchOrganizerActivities(userId);
    return data;
  }
);

export const searchOrganizerActivities = createAsyncThunk(
  "organizerActivities/searchOrganizerActivities",
  async (searchRequest: ActivitySearchRequest) => {
    const data = await organizerActivitiesAPI.searchOrganizerActivities(
      searchRequest
    );
    return data;
  }
);

export const createActivity = createAsyncThunk<Activity, FormData>(
  "organizerActivities/createActivity",
  async (activityData) => {
    const data = await organizerActivitiesAPI.createActivity(activityData);
    return data;
  }
);

export const updateActivity = createAsyncThunk<Activity, Activity>(
  "organizerActivities/updateActivity",
  async (activityData) => {
    const data = await organizerActivitiesAPI.updateActivity(activityData);
    return data;
  }
);

export const deleteActivity = createAsyncThunk<string, string>(
  "organizerActivities/deleteActivity",
  async (activityId) => {
    await organizerActivitiesAPI.deleteActivity(activityId);
    return activityId;
  }
);
