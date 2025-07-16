import type { RecycleImageResponse } from "./aiTypes.ts";

async function tryFetchWithFallback(
  imageFile: File
): Promise<RecycleImageResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const fullUrl = `${import.meta.env.VITE_API_BASE_URLS}/AIChat/recycle-image`;

  try {
    console.log(`Attempt 1: Calling API:`, fullUrl);

    const response = await fetch(fullUrl, {
      method: "POST",
      body: formData,
      headers: {},
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    console.log("Response is OK, parsing JSON...");
    console.log("Response headers:", response.headers);

    const responseData = await response.json();
    console.log("API Response:", responseData);
    console.log(`✅ Success with URL: ${fullUrl}`);

    return responseData;
  } catch (error) {
    console.error(`❌ Failed with URL ${fullUrl}:`, error);
    throw error;
  }
}

export const aichatAPI = {
  // Recycle image endpoint
  recycleImage: async (imageFile: File): Promise<RecycleImageResponse> => {
    return await tryFetchWithFallback(imageFile);
  },
};
