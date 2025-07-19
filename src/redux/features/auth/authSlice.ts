import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./authTypes";
import {
  loginThunk,
  registerThunk,
  googleLoginThunk,
  getUserByIdThunk,
  getuserWithPoint,
  updateUserThunk,
} from "./authThunk";

// Lấy lại user từ localStorage nếu có
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
  usersById: {},
  userList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userId", action.payload.userId);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })

      // Register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userId", action.payload.userId);
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Register failed";
      })

      // Google Login
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        // Save to localStorage
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userId", action.payload.userId);
      })

      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Google login failed123";
      })

      // Get User by ID
      .addCase(getUserByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        const user = action.payload;
        state.loading = false;
        state.usersById[user.userId] = user;
      })
      .addCase(getUserByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load user";
      })
      .addCase(getuserWithPoint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getuserWithPoint.fulfilled, (state, action) => {
        state.loading = false;
        // Map to expected User format
        state.userList = action.payload.map((user: any) => ({
          userId: user.id,
          userName: user.userName,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          impactPoints: user.impactPoints,
        }));
      })
      .addCase(getuserWithPoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load list user";
      })
      // Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
