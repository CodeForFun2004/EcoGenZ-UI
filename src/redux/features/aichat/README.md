# AI Chat Redux Structure

## Tổng quan
Module aichat được tổ chức theo Redux Toolkit pattern với các slice riêng biệt cho từng tính năng.

## Cấu trúc thư mục

```
src/redux/features/aichat/
├── aiTypes.ts              # Types cho AI features (recycle image)
├── aiSlice.ts              # Redux slice cho AI features
├── aiThunk.ts              # Async thunks cho AI features
├── aichatAPI.ts            # API functions cho AI features
├── voiceChatTypes.ts       # Types cho voice chat
├── voiceChatSlice.ts       # Redux slice cho voice chat
├── voiceChatThunk.ts       # Async thunks cho voice chat
├── voiceChatAPI.ts         # API functions cho voice chat
├── aichataskAPI.ts         # Legacy API (text chat only)
└── README.md               # This file
```

## AI Features (Recycle Image)

### Types (`aiTypes.ts`)
```typescript
export interface RecycleImageResponse {
  detectedItem: string;
  recycleTip: string;
}

export interface AIState {
  loading: boolean;
  error: string | null;
  recycledImage: RecycleImageResponse | null;
}
```

### API (`aichatAPI.ts`)
```typescript
export const aiRecycleImage = async (imageFile: File) => {
  // Upload image and get recycling tips
}
```

### Thunk (`aiThunk.ts`)
```typescript
export const aiRecycleImageThunk = createAsyncThunk<RecycleImageResponse, File>(
  "aichat/recycleImage",
  async (file) => {
    const data = await aichatAPI.aiRecycleImage(file);
    return data;
  }
);
```

### Slice (`aiSlice.ts`)
- Manages loading, error, and recycledImage state
- Handles pending, fulfilled, rejected cases

## Voice Chat Features

### Types (`voiceChatTypes.ts`)
```typescript
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
```

### API (`voiceChatAPI.ts`)
```typescript
export const voiceChatAPI = async (request: VoiceChatRequest): Promise<VoiceChatResponse> => {
  // Handles both JSON and audio responses
  // Supports text response and MP3 audio response
}
```

### Thunk (`voiceChatThunk.ts`)
```typescript
export const voiceChatThunk = createAsyncThunk<VoiceChatResponse, VoiceChatRequest>(
  "aichat/voiceChat",
  async (request) => {
    const data = await voiceChatAPI(request);
    return data;
  }
);
```

### Slice (`voiceChatSlice.ts`)
- Manages loading, error, currentResponse, and chatHistory state
- Handles pending, fulfilled, rejected cases
- Provides actions: clearError, clearResponse, addToChatHistory, clearChatHistory

## Store Integration

```typescript
// src/redux/store.ts
export const store = configureStore({
  reducer: {
    // ... other reducers
    ai: aiReducer,
    voiceChat: voiceChatReducer,
  },
});
```

## Usage in Components

### AI Features
```typescript
import { useDispatch, useSelector } from 'react-redux';
import { aiRecycleImageThunk } from '../redux/features/aichat/aiThunk';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { loading, error, recycledImage } = useSelector((state: RootState) => state.ai);

  const handleImageUpload = async (file: File) => {
    await dispatch(aiRecycleImageThunk(file));
  };
};
```

### Voice Chat
```typescript
import { useDispatch, useSelector } from 'react-redux';
import { voiceChatThunk } from '../redux/features/aichat/voiceChatThunk';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { loading, error, currentResponse } = useSelector((state: RootState) => state.voiceChat);

  const handleVoiceMessage = async (audioFile: File) => {
    const result = await dispatch(voiceChatThunk({
      audioFile,
      previousMessages: chatHistory
    }));
    
    if (voiceChatThunk.fulfilled.match(result)) {
      // Handle success
    }
  };
};
```

## API Endpoints

### AI Features
- `POST /api/AIChat/recycle-image` - Upload image for recycling tips

### Voice Chat
- `POST /api/voicechatbot/voice-chat` - Send voice message
  - Input: multipart/form-data with audioFile and previousMessages
  - Output: JSON (text) or audio/mpeg (MP3 file)

## Environment Variables

```env
VITE_AICHAT_URL=https://localhost:7039/api
```

## Error Handling

Both slices handle errors consistently:
- `pending`: Sets loading = true, clears error
- `fulfilled`: Sets loading = false, stores response
- `rejected`: Sets loading = false, stores error message

## Future Improvements

1. **Text Chat Slice**: Create separate Redux slice for text chat
2. **Unified Chat State**: Combine text and voice chat into single chat slice
3. **Real-time Updates**: Add WebSocket support for real-time chat
4. **Message Persistence**: Add local storage for chat history
5. **File Upload Progress**: Add progress tracking for large files 