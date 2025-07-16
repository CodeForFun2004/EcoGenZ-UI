// src/redux/thunks/activitiesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as activitiesAPI from "./activitiesAPI";


export const fetchAllActivities = createAsyncThunk(
  "activities/fetchActivities",
  async () => {
    const data = await activitiesAPI.fetchAllActivites();
    return data;
  }
);
