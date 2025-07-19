import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authAPI";
import type { User } from "./authTypes";

export const loginThunk = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/login", async (credentials) => {
  const data = await authAPI.login(credentials);
  return data.result;
});

export const registerThunk = createAsyncThunk<
  User,
  {
    name: string;
    email: string;
    password: string;
    role: "User" | "Company" | null;
  }
>("auth/register", async (userInfo) => {
  const data = await authAPI.register(userInfo);
  return data;
});

export const googleLoginThunk = createAsyncThunk<
  User,
  { tokenId: string; role: "User" | "Company" | null }
>("auth/googleLogin", async ({ tokenId, role }) => {
  const data = await authAPI.googleLogin(tokenId, role);
  return data.result;
});
export const getUserByIdThunk = createAsyncThunk<User, { userId: string }>(
  "auth/fetchUserById",
  async ({ userId }) => {
    const response = await authAPI.getUserById(userId);
    return response;
  }
);

export const getuserWithPoint = createAsyncThunk(
  "auth/fetchUserWithPoint",
  async () => {
    const response = await authAPI.getuserWithPoint();
    return response;
  }
);

export const updateUserThunk = createAsyncThunk<
  User,
  { userId: string; userData: { userName?: string; email?: string; profilePhotoUrl?: string; } }
>("auth/updateUser", async ({ userId, userData }) => {
  const response = await authAPI.updateUser(userId, userData);
  return response;
});
