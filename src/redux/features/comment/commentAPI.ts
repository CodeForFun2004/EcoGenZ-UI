const ACTIVITY_URL = import.meta.env.VITE_ACTIVITY_URL;

export const fetchAllComment = async () => {
  const res = await fetch(`${ACTIVITY_URL}/list-comment`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Fetch comment failed");
  const json = await res.json();
  console.log("Fetched comments:", json.result);
  return json.result;
};
export const fetchCommentByPostId = async (activityId: string) => {
  const res = await fetch(`${ACTIVITY_URL}/list-comment/${activityId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Fetch comment by postId failed");
  const json = await res.json();
  console.log("Fetched comments:", json.result);
  return json.result;
};

export const createComment = async (commentInfo: {
  content: string;
  userId: string;
  activityId: string;
}) => {
  const res = await fetch(`${ACTIVITY_URL}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentInfo),
  });
  if (!res.ok) throw new Error("Create comment failed");
  return res.json();
};
