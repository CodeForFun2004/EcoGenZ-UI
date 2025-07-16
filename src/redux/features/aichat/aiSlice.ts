import type { AIState } from "./aiTypes";
import { createSlice } from "@reduxjs/toolkit";
import { aiRecycleImageThunk } from "./aiThunk";

const initialState: AIState = {
  loading: false,
  error: null,
  recycledImage: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(aiRecycleImageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(aiRecycleImageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.recycledImage = action.payload;
      })
      .addCase(aiRecycleImageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Recycle image failed";
      });
  },
});

export default aiSlice.reducer;
