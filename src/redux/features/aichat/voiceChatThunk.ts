import type { VoiceChatRequest, VoiceChatResponse } from "./voiceChatTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { voiceChatAPI } from "./voiceChatAPI";

export const voiceChatThunk = createAsyncThunk<VoiceChatResponse, VoiceChatRequest>(
    "aichat/voiceChat",
    async (request) => {
        const data = await voiceChatAPI(request);
        return data;
    }
); 