// Try multiple URLs in order of preference
const API_BASE_URLS = [
  "https://localhost:7039/api", // HTTPS (preferred)
  "http://localhost:5250/api", // HTTP fallback
];

export interface RecycleImageResponse {
  detectedItem: string;
  recycleTip: string;
}

async function tryFetchWithFallback(
  imageFile: File
): Promise<RecycleImageResponse> {
  const formData = new FormData();
  formData.append("image", imageFile);

  for (let i = 0; i < API_BASE_URLS.length; i++) {
    const apiUrl = API_BASE_URLS[i];
    const fullUrl = `${apiUrl}/AIChat/recycle-image`;

    try {
      console.log(`Attempt ${i + 1}: Calling API:`, fullUrl);

      const response = await fetch(fullUrl, {
        method: "POST",
        body: formData,
        headers: {
          // Don't set Content-Type for FormData, browser will set it automatically
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // If this is the last URL, throw the error
        if (i === API_BASE_URLS.length - 1) {
          throw new Error(
            `API Error ${response.status}: ${response.statusText} - ${errorText}`
          );
        }
        // Otherwise, continue to next URL
        continue;
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);
      console.log(`✅ Success with URL: ${apiUrl}`);

      return responseData;
    } catch (error) {
      console.error(`❌ Failed with URL ${apiUrl}:`, error);

      // If this is the last URL, throw the error
      if (i === API_BASE_URLS.length - 1) {
        throw error;
      }
      // Otherwise, continue to next URL
      continue;
    }
  }

  throw new Error("All API endpoints failed");
}

export const aichatAPI = {
  // Recycle image endpoint
  recycleImage: async (imageFile: File): Promise<RecycleImageResponse> => {
    return await tryFetchWithFallback(imageFile);
  },
};
