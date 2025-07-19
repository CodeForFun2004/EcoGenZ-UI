export const RegistrationStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
} as const;

export type RegistrationStatusType =
  (typeof RegistrationStatus)[keyof typeof RegistrationStatus];

export interface Participant {
  registrationId: string;
  userId: string;
  status: RegistrationStatusType;
  attended: boolean;
  user: {
    id: string;
    userName: string;
    email: string;
    profilePhotoUrl?: string;
  };
}

export interface ParticipantsState {
  participants: Participant[];
  loading: boolean;
  error: string | null;
  selectedActivityId: string | null;
  searchTerm: string;
}

export interface UpdateRegistrationStatusRequest {
  registrationId: string;
  status: RegistrationStatusType;
}

export interface UpdateAttendanceRequest {
  registrationId: string;
  attended: boolean;
}
