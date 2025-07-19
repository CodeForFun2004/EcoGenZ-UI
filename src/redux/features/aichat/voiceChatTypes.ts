export interface ChatMessage {
    role: string;
    content: string;
}

export interface VoiceChatRequest {
    audioFile: File;
    previousMessages?: ChatMessage[];
}

export interface VoiceChatResponse {
    text?: string;
    audioUrl?: string;
    audioBlob?: Blob;
    conversation?: ChatMessage[];
}

export interface VoiceChatState {
    loading: boolean;
    error: string | null;
    currentResponse: VoiceChatResponse | null;
    chatHistory: ChatMessage[];
} 