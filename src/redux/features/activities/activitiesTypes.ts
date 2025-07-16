export interface Activity {
  activityId: string;
  mediaUrl: string;
  title: string;
  description: string;
  location: string;
  amountOfPeople: number;
  date: string;
  createdByCompanyId: string;
}

export interface ActivityState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}
