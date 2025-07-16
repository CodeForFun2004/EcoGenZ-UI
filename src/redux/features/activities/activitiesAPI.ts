// DÙNG API THẬT

const ACTIVITY_URL = import.meta.env.VITE_ACTIVITY_URL;

export const fetchAllActivites = async () => {
  const res = await fetch(`${ACTIVITY_URL}/get-all-activities`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Fetch activities failed");
  const json = await res.json();
  return json.result;
};

export const fetchActivityById = async (activityId: string) => {
  const res = await fetch(`${ACTIVITY_URL}/get-activity/${activityId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch activity");

  const json = await res.json();
  return json.result;
};
