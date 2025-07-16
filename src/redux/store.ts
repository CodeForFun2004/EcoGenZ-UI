import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import activitiesReducer from "./features/activities/activitiesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activitiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
