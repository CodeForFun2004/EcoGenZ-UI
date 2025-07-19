const ACTIVITY_URL = import.meta.env.VITE_ACTIVITY_URL;

export const fetchParticipantsByActivityId = async (activityId: string) => {
  const res = await fetch(`${ACTIVITY_URL}/${activityId}/registrations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Fetch participants failed");
  }

  const json = await res.json();
  console.log("Fetched participants:", json);
  return json;
};

export const updateRegistrationStatus = async (
  registrationId: string,
  status: number
) => {
  const res = await fetch(
    `${ACTIVITY_URL}/registrations/${registrationId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Update registration status failed");
  }

  return res.json();
};

export const updateRegistrationAttendance = async (
  registrationId: string,
  attended: boolean
) => {
  const res = await fetch(
    `${ACTIVITY_URL}/registrations/${registrationId}/attendance`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ attended }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Update attendance failed");
  }

  return res.json();
};
