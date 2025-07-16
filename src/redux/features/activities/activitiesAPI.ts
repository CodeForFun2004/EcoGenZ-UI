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
