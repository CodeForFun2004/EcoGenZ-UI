// Try multiple URLs in order of preference
const API_BASE_URLS = [
    "https://localhost:7039/api", // HTTPS (preferred)
    "http://localhost:5250/api", // HTTP fallback
  ];
  
  export interface RecycleImageResponse {
    detectedItem: string;
    recycleTip: string;
  }
  
  export interface ChatMessage {
    role: string;
    content: string;
  }
  
  export interface ChatRequest {
    message: string;
    previousMessages?: ChatMessage[];
  }
  
  export interface ChatResponse {
    response: string;
    conversation: ChatMessage[];
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
        const response = await fetch(fullUrl, {
          method: "POST",
          body: formData,
          headers: {
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          if (i === API_BASE_URLS.length - 1) {
            throw new Error(
              `API Error ${response.status}: ${response.statusText} - ${errorText}`
            );
          }
          continue;
        }
  
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        if (i === API_BASE_URLS.length - 1) {
          throw error;
        }
        continue;
      }
    }
  
    throw new Error("All API endpoints failed");
  }
  
  async function tryChatWithFallback(
    chatRequest: ChatRequest
  ): Promise<ChatResponse> {
    for (let i = 0; i < API_BASE_URLS.length; i++) {
      const apiUrl = API_BASE_URLS[i];
      const fullUrl = `${apiUrl}/AIChat/ask`;
  
      try {
        const response = await fetch(fullUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chatRequest),
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          if (i === API_BASE_URLS.length - 1) {
            throw new Error(
              `API Error ${response.status}: ${response.statusText} - ${errorText}`
            );
          }
          continue;
        }
  
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        if (i === API_BASE_URLS.length - 1) {
          throw error;
        }
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
  
    // Chat with AI endpoint
    chatAsk: async (chatRequest: ChatRequest): Promise<ChatResponse> => {
      return await tryChatWithFallback(chatRequest);
    },
  };
  