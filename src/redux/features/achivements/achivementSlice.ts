// src/redux/achievements/achievementsSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { AchievementState } from "../achivements/achivementTypes";
import {
  fetchAllAchievements,
  fetchAchievementByUserId,
} from "../achivements/achivementThunk";

const initialState: AchievementState = {
  achievements: [],
  userAchievements: [],
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      .addCase(fetchAllAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch achievements";
      })
      .addCase(fetchAchievementByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAchievementByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userAchievements = action.payload;
      })
      .addCase(fetchAchievementByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch user achievements";
      });
  },
});

export default achievementsSlice.reducer;
