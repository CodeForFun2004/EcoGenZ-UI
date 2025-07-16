import type { RecycleImageResponse } from "./aiTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as aichatAPI from "./aichatAPI";

export const aiRecycleImageThunk = createAsyncThunk<RecycleImageResponse, File>(
  "aichat/recycleImage",
  async (file) => {
    const data = await aichatAPI.aiRecycleImage(file);
    return data;
  }
);
