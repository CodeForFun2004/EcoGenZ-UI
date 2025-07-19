import type { VoiceChatRequest, VoiceChatResponse } from "./voiceChatTypes";

const AI_URL = "https://localhost:7039/api";

export const voiceChatAPI = async (
  request: VoiceChatRequest
): Promise<VoiceChatResponse> => {
  const formData = new FormData();
  formData.append("audioFile", request.audioFile);

  if (request.previousMessages) {
    formData.append(
      "previousMessages",
      JSON.stringify(request.previousMessages)
    );
  }

  const response = await fetch(`${AI_URL}/voicechatbot/voice-chat`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }

  // Check content type to determine response format
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    // JSON response (text response)
    const responseData = await response.json();
    return {
      text: responseData.response,
      conversation: responseData.conversation,
    };
  } else if (
    contentType &&
    (contentType.includes("audio/") ||
      contentType.includes("application/octet-stream"))
  ) {
    // Audio file response
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    return {
      audioUrl,
      audioBlob,
      text: "🎵 Voice response from AI",
    };
  } else {
    // Try to parse as JSON first, if fails then treat as audio
    try {
      const responseData = await response.json();
      return {
        text: responseData.response,
        conversation: responseData.conversation,
      };
    } catch {
      // If JSON parsing fails, treat as audio file
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return {
        audioUrl,
        audioBlob,
        text: "🎵 Voice response from AI",
      };
    }
  }
};
