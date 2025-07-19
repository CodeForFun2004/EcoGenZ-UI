import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchParticipantsByActivityId,
  updateRegistrationStatus,
  updateRegistrationAttendance,
} from "./participantsThunk";
import type { ParticipantsState } from "./participantsTypes";

const initialState: ParticipantsState = {
  participants: [],
  loading: false,
  error: null,
  selectedActivityId: null,
  searchTerm: "",
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setSelectedActivityId: (state, action: PayloadAction<string | null>) => {
      state.selectedActivityId = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearParticipants: (state) => {
      state.participants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Participants
      .addCase(fetchParticipantsByActivityId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipantsByActivityId.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload || [];
      })
      .addCase(fetchParticipantsByActivityId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch participants failed";
      })

      // Update Registration Status
      .addCase(updateRegistrationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRegistrationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const participant = state.participants.find(
          (p) => p.registrationId === action.payload.registrationId
        );
        if (participant) {
          participant.status = action.payload.status as any;
        }
      })
      .addCase(updateRegistrationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Update registration status failed";
      })

      // Update Registration Attendance
      .addCase(updateRegistrationAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRegistrationAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const participant = state.participants.find(
          (p) => p.registrationId === action.payload.registrationId
        );
        if (participant) {
          participant.attended = action.payload.attended;
        }
      })
      .addCase(updateRegistrationAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update attendance failed";
      });
  },
});

export const {
  setSelectedActivityId,
  setSearchTerm,
  clearError,
  clearParticipants,
} = participantsSlice.actions;

export default participantsSlice.reducer;
