import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import activitiesReducer from "./features/activities/activitiesSlice";
import activityCreateReducer from "./features/activities/activityCreateSlice";
import postReducer from "./features/social_posts/postSlice";
import commentReducer from "./features/comment/commentSlice";
import organizerActivitiesReducer from "./features/organizerActivities/organizerActivitiesSlice";
import participantsReducer from "./features/participants/participantsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    activities: activitiesReducer,
    activityCreate: activityCreateReducer,
    posts: postReducer,
    comments: commentReducer,
    organizerActivities: organizerActivitiesReducer,
    participants: participantsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
