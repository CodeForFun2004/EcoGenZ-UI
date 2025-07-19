export interface Activity {
  activityId: string;
  title: string;
  description: string;
  location: string;
  date: string;
  amountOfPeople: number;
  isApproved: boolean;
  mediaUrl?: string;
  createdByCompanyId: string;
  companyUser?: {
    id: string;
    userName: string;
    email: string;
    profilePhotoUrl?: string;
  };
}

export interface OrganizerActivitiesState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedActivity: Activity | null;
}

export interface ActivitySearchRequest {
  searchTerm?: string;
  title?: string;
  description?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  minPeople?: number;
  maxPeople?: number;
  isApproved?: boolean;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
