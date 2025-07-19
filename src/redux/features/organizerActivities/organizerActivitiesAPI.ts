const ACTIVITY_URL = import.meta.env.VITE_ACTIVITY_URL;

export const fetchOrganizerActivities = async (userId: string) => {
  const res = await fetch(
    `${ACTIVITY_URL}/get-all-activities-by-userid/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.errorMessages?.[0] || "Fetch organizer activities failed"
    );
  }

  const json = await res.json();
  console.log("Fetched organizer activities:", json.result);
  return json.result;
};

export const searchOrganizerActivities = async (searchRequest: any) => {
  const queryParams = new URLSearchParams();

  Object.entries(searchRequest).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const res = await fetch(
    `${ACTIVITY_URL}/search-activities?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.errorMessages?.[0] || "Search organizer activities failed"
    );
  }

  const json = await res.json();
  console.log("Searched organizer activities:", json.result);
  return json.result;
};

export const createActivity = async (activityData: FormData) => {
  const res = await fetch(`${ACTIVITY_URL}/create-activity`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: activityData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errorMessages?.[0] || "Create activity failed");
  }

  return res.json();
};

export const updateActivity = async (activityData: any) => {
  const res = await fetch(`${ACTIVITY_URL}/update-activity`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(activityData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errorMessages?.[0] || "Update activity failed");
  }

  return res.json();
};

export const deleteActivity = async (activityId: string) => {
  const res = await fetch(`${ACTIVITY_URL}/delete-activity/${activityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.errorMessages?.[0] || "Delete activity failed");
  }

  return res.json();
};
