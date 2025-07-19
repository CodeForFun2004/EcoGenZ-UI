import type { VoiceChatState } from "./voiceChatTypes";
import { createSlice } from "@reduxjs/toolkit";
import { voiceChatThunk } from "./voiceChatThunk";

const initialState: VoiceChatState = {
    loading: false,
    error: null,
    currentResponse: null,
    chatHistory: [],
};

const voiceChatSlice = createSlice({
    name: "voiceChat",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearResponse: (state) => {
            state.currentResponse = null;
        },
        addToChatHistory: (state, action) => {
            state.chatHistory.push(action.payload);
        },
        clearChatHistory: (state) => {
            state.chatHistory = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(voiceChatThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(voiceChatThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentResponse = action.payload;
                // Add AI response to chat history
                if (action.payload.text) {
                    state.chatHistory.push({
                        role: "assistant",
                        content: action.payload.text,
                    });
                }
            })
            .addCase(voiceChatThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Voice chat failed";
            });
    },
});

export const { clearError, clearResponse, addToChatHistory, clearChatHistory } = voiceChatSlice.actions;
export default voiceChatSlice.reducer; 