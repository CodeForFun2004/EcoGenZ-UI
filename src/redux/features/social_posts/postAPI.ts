// DÙNG API THẬT

const ACTIVITY_URL = import.meta.env.VITE_POST_URL;
const LIKE_URL = import.meta.env.VITE_LIKE_URL;
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
export const updatePost = async (postInfo: {
   id: string;
  content: string;
  mediaUrl: string;
  userid:string;
}) => {
  const res = await fetch(`${ACTIVITY_URL}/update-post`, {
    method: "PUT",
    body: JSON.stringify(postInfo),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }
  const result = await res.json();
  return result.result;
};

export const deletePostById = async (postId: string) => {
  const res = await fetch(`${ACTIVITY_URL}/delete-post/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Delete post by postId failed");
  const json = await res.json();
  return json.result;
};

export const toggleLike = async (userId: string, postId: string) => {
  const res = await fetch(`${LIKE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  });

  if (!res.ok) {
    throw new Error("Failed to like post");
  }

  const result = await res.json();
  return result.result; // or whatever your API returns
};
