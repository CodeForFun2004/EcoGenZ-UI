// DÙNG API THẬT

const ACTIVITY_URL = import.meta.env.VITE_POST_URL;

export const fetchAllPosts = async () => {
  const res = await fetch(`${ACTIVITY_URL}/get-all-posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Fetch posts failed");
  const json = await res.json();
  return json.result;
};



export const createPost = async (formData: FormData) => {
  const res = await fetch(`${ACTIVITY_URL}/create-post`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  const result = await res.json();
  return result.result;
};
