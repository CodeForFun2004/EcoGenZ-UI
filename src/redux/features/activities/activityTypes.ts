export interface Activity {
  activityId: string;
  title: string;
  description: string;
  location: string;
  amountOfPeople: number;
  date: string;
  mediaUrl?: string;
  createdByCompanyId: string;
  isApproved: boolean;
  companyUser?: {
    id: string;
    email: string;
    profilePhotoUrl?: string;
  };
}

export interface CreateActivityRequest {
  title: string;
  description: string;
  location: string;
  amountOfPeople: number;
  date: string;
  createdByCompanyId: string;
  isApproved?: boolean;
}

export interface ActivitySearchRequest {
  searchTerm?: string;
  location?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface ActivityState {
  activities: Activity[];
  currentActivity: Activity | null;
  loading: boolean;
  error: string | null;
  searchResults: Activity[];
  searchLoading: boolean;
  searchError: string | null;
  createLoading: boolean;
  createError: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export interface ActivityFormData {
  title: string;
  description: string;
  location: string;
  amountOfPeople: number;
  date: string;
  imageFile?: File;
  createdByCompanyId?: string;
}
