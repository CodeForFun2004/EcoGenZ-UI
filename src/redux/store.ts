import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import activitiesReducer from "./features/activities/activitiesSlice";
import postReducer from "./features/social_posts/postSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activitiesReducer,
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
