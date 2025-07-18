import { createAsyncThunk } from "@reduxjs/toolkit";
import * as activityAPI from "./activityAPI";
import type {
  CreateActivityRequest,
  ActivitySearchRequest,
  ActivityFormData,
} from "./activityTypes";

// Lấy tất cả activities
export const fetchAllActivities = createAsyncThunk<
  any, // Response type từ API
  void
>("activities/fetchAll", async () => {
  const data = await activityAPI.fetchAllActivities();
  return data;
});

// Tìm kiếm activities
export const searchActivities = createAsyncThunk<
  any, // Response type từ API
  ActivitySearchRequest
>("activities/search", async (searchRequest: ActivitySearchRequest) => {
  const data = await activityAPI.searchActivities(searchRequest);
  return data;
});

// Lấy activity theo ID
export const fetchActivityById = createAsyncThunk<
  any, // Response type từ API
  string
>("activities/fetchById", async (activityId: string) => {
  const data = await activityAPI.fetchActivityById(activityId);
  return data;
});

// Tạo activity mới
export const createActivity = createAsyncThunk<
  any, // Response type từ API
  ActivityFormData
>("activities/create", async (activityData: ActivityFormData) => {
  const data = await activityAPI.createActivity(activityData);
  return data;
});

// Cập nhật activity
export const updateActivity = createAsyncThunk<
  any, // Response type từ API
  CreateActivityRequest & { activityId: string }
>(
  "activities/update",
  async (activityData: CreateActivityRequest & { activityId: string }) => {
    const data = await activityAPI.updateActivity(activityData);
    return data;
  }
);

// Xóa activity
export const deleteActivity = createAsyncThunk<{ activityId: string }, string>(
  "activities/delete",
  async (activityId: string) => {
    const data = await activityAPI.deleteActivity(activityId);
    return data;
  }
);

// Reset search results
export const resetSearch = createAsyncThunk<void, void>(
  "activities/resetSearch",
  async () => {
    // Không cần gọi API, chỉ reset state
    return;
  }
);

// Clear errors
export const clearErrors = createAsyncThunk<void, void>(
  "activities/clearErrors",
  async () => {
    // Không cần gọi API, chỉ clear errors
    return;
  }
);
