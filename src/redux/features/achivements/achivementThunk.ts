// src/redux/achievements/achievementsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as achievementsAPI from "../achivements/achivementsAPI";
import type { Achievement } from "../achivements/achivementTypes";

export const fetchAllAchievements = createAsyncThunk(
  "achievements/fetchAll",
  async () => {
    const data = await achievementsAPI.fetchAllAchievements();
    return data;
  }
);

export const fetchAchievementByUserId = createAsyncThunk(
  "achievements/fetchByUserId",
  async (userId: string) => {
    const data = await achievementsAPI.fetchAchievementByUserId(userId);
    return data;
  }
);
