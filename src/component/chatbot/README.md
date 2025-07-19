# Voice Chat Integration

## Tổng quan
Tính năng voice chat cho phép người dùng thu âm và gửi tin nhắn voice đến AI chatbot. Audio sẽ được chuyển đổi sang định dạng WAV trước khi gửi về backend.

## Các component chính

### 1. VoiceRecorder.tsx
Component chính để thu âm:
- Sử dụng MediaRecorder API để thu âm
- Hỗ trợ định dạng audio/webm
- Hiển thị trạng thái thu âm với animation
- Kiểm tra hỗ trợ trình duyệt

### 2. audioUtils.ts
Các utility functions để xử lý audio:
- `convertAudioToWav()`: Chuyển đổi audio sang WAV format
- `createAudioFile()`: Tạo File object từ Blob
- `getAudioDuration()`: Lấy thời lượng audio
- `formatDuration()`: Format thời lượng hiển thị

### 3. Chatbot.tsx (đã cập nhật)
- Tích hợp VoiceRecorder component
- Xử lý voice messages
- Hiển thị audio player cho voice messages
- Gửi audio file về backend

## API Endpoints

### Voice Chat API
```typescript
POST /api/voicechatbot/voice-chat
Content-Type: multipart/form-data

FormData:
- audioFile: File (WAV format)
- previousMessages: string (JSON array)

Response Types:
1. JSON Response (Text):
   Content-Type: application/json
   {
     "response": "Text response from AI",
     "conversation": [...]
   }

2. Audio Response (MP3):
   Content-Type: audio/mpeg or application/octet-stream
   Binary audio file (.mp3)
```

## Cách sử dụng

1. **Thu âm**: Click vào nút microphone để bắt đầu thu âm
2. **Dừng thu âm**: Click lại để dừng và gửi
3. **Nghe lại**: Click vào audio player trong chat
4. **Xem thời lượng**: Hiển thị bên cạnh audio player

## Tính năng

- ✅ Thu âm real-time
- ✅ Chuyển đổi sang WAV format
- ✅ Hiển thị audio player
- ✅ Hiển thị thời lượng
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design

## Browser Support

- Chrome 47+
- Firefox 25+
- Safari 14.1+
- Edge 79+

## Backend Requirements

Backend cần hỗ trợ:
1. Endpoint `/api/voicechatbot/voice-chat`
2. Xử lý multipart/form-data
3. Speech-to-text conversion
4. Trả về response theo 2 format:
   - **Text Response**: JSON với `response` field
   - **Audio Response**: File .mp3 (AI voice response)

### Response Format Examples:

**Text Response:**
```json
{
  "response": "Đây là câu trả lời bằng text từ AI",
  "conversation": [...]
}
```

**Audio Response:**
- Content-Type: `audio/mpeg` hoặc `application/octet-stream`
- Binary data: File .mp3 chứa giọng nói AI

## Troubleshooting

### Lỗi "Trình duyệt không hỗ trợ thu âm"
- Kiểm tra HTTPS connection (required cho getUserMedia)
- Cập nhật trình duyệt lên phiên bản mới hơn

### Lỗi "Không thể truy cập microphone"
- Kiểm tra quyền truy cập microphone
- Đảm bảo microphone không bị sử dụng bởi ứng dụng khác

### Audio không phát được
- Kiểm tra định dạng audio được hỗ trợ
- Đảm bảo audio file không bị corrupt 