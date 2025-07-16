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
  { name: string; email: string; password: string }
>("auth/register", async (userInfo) => {
  const data = await authAPI.register(userInfo);
  return data;
});

export const googleLoginThunk = createAsyncThunk<User, { tokenId: string }>(
  "auth/googleLogin",
  async ({ tokenId }) => {
    const data = await authAPI.googleLogin(tokenId);
    return data;
  }
);
export const getUserById = createAsyncThunk<User, string>(
  "auth/fetchUserById",
  async (userId) => {
    const response = await authAPI.getUserById(userId);
    return response;
  }
);
