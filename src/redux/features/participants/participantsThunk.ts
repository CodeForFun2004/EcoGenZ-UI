import { createAsyncThunk } from "@reduxjs/toolkit";
import * as participantsAPI from "./participantsAPI";
import type {
  UpdateRegistrationStatusRequest,
  UpdateAttendanceRequest,
} from "./participantsTypes";

export const fetchParticipantsByActivityId = createAsyncThunk(
  "participants/fetchParticipantsByActivityId",
  async (activityId: string) => {
    const data = await participantsAPI.fetchParticipantsByActivityId(
      activityId
    );
    return data;
  }
);

export const updateRegistrationStatus = createAsyncThunk<
  { registrationId: string; status: number },
  UpdateRegistrationStatusRequest
>(
  "participants/updateRegistrationStatus",
  async ({ registrationId, status }) => {
    await participantsAPI.updateRegistrationStatus(registrationId, status);
    return { registrationId, status };
  }
);

export const updateRegistrationAttendance = createAsyncThunk<
  { registrationId: string; attended: boolean },
  UpdateAttendanceRequest
>(
  "participants/updateRegistrationAttendance",
  async ({ registrationId, attended }) => {
    await participantsAPI.updateRegistrationAttendance(
      registrationId,
      attended
    );
    return { registrationId, attended };
  }
);
