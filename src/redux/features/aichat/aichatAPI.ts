const AI_URL = import.meta.env.VITE_AICHAT_URL;

export const aiRecycleImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${AI_URL}/recycle-image`, {
    method: "POST",
    body: formData,
    headers: {},
  });

  if (!response.ok)
    throw new Error(`API Error ${response.status}: ${response.statusText}`);

  return response.json();
};
