import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  type FC,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Input, Button, Avatar, message } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined, AudioOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { voiceChatThunk } from "../../redux/features/aichat/voiceChatThunk";
import { addToChatHistory } from "../../redux/features/aichat/voiceChatSlice";
import type { ChatMessage as APIChatMessage } from "../../redux/features/aichat/voiceChatTypes";
import { aichatAPI } from "../../redux/features/aichat/aichataskAPI";
import VoiceRecorder from "./VoiceRecorder";
import { convertAudioToWav, createAudioFile, getAudioDuration, formatDuration, processAIAudioResponse } from "./audioUtils";
import "./Chatbot.css";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  audioUrl?: string;
  isVoiceMessage?: boolean;
  duration?: string;
}

const Chatbot: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: voiceChatLoading, error: voiceChatError } = useSelector((state: RootState) => state.voiceChat);

  const [inputValue, setInputValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi, I'm EcoGenZ Bot, how can I help you?",
    },
  ]);
  // Use Redux loading state for voice chat, local state for text chat
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  // Handle voice chat errors
  useEffect(() => {
    if (voiceChatError) {
      message.error(`Voice chat error: ${voiceChatError}`);
    }
  }, [voiceChatError]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = useCallback(async () => {
    const userMessageText = inputValue.trim();
    if (!userMessageText || isTextLoading) return;

    const newUserMessage: ChatMessage = { role: "user", text: userMessageText };

    // Add user message immediately
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setInputValue("");
    setIsTextLoading(true);

    try {
      // Convert chat history to API format
      const previousMessages: APIChatMessage[] = chatHistory.map((msg) => ({
        role: msg.role === "model" ? "assistant" : msg.role,
        content: msg.text,
      }));

      // Use existing aichatAPI for text chat
      const response = await aichatAPI.chatAsk({
        message: userMessageText,
        previousMessages,
      });

      const botMessage: ChatMessage = {
        role: "model",
        text: response.response,
      };

      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi kết nối đến server.";
      const errorBotMessage: ChatMessage = {
        role: "model",
        text: `❌ Lỗi: ${errorMessage}\n\nVui lòng thử lại sau hoặc kiểm tra kết nối mạng.`,
      };
      setChatHistory((prevHistory) => [...prevHistory, errorBotMessage]);
    } finally {
      setIsTextLoading(false);
    }
  }, [inputValue, isTextLoading, chatHistory]);

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceMessage = useCallback(async (audioBlob: Blob) => {
    try {
      // Convert audio to WAV format
      const wavBlob = await convertAudioToWav(audioBlob);
      const audioFile = createAudioFile(wavBlob);
      const duration = await getAudioDuration(audioBlob);

      // Create audio URL for playback
      const audioUrl = URL.createObjectURL(audioBlob);

      // Add voice message to chat
      const voiceMessage: ChatMessage = {
        role: "user",
        text: "🎤 Voice message",
        audioUrl,
        isVoiceMessage: true,
        duration: formatDuration(duration),
      };

      setChatHistory((prevHistory) => [...prevHistory, voiceMessage]);
      // Voice chat loading is handled by Redux

      // Convert chat history to API format
      const previousMessages: APIChatMessage[] = chatHistory.map((msg) => ({
        role: msg.role === "model" ? "assistant" : msg.role,
        content: msg.text,
      }));

      // Send voice message to backend using Redux
      const result = await dispatch(voiceChatThunk({
        audioFile,
        previousMessages,
      }));

      if (voiceChatThunk.fulfilled.match(result)) {
        const response = result.payload;

        let botMessage: ChatMessage;

        if (response.audioUrl && response.audioBlob) {
          // AI returned audio response
          const audioInfo = await processAIAudioResponse(response.audioBlob);
          botMessage = {
            role: "model",
            text: response.text || "🎵 Voice response from AI",
            audioUrl: response.audioUrl,
            isVoiceMessage: true,
            duration: audioInfo.duration,
          };
        } else {
          // AI returned text response only
          botMessage = {
            role: "model",
            text: response.text || "No response received",
          };
        }

        setChatHistory((prevHistory) => [...prevHistory, botMessage]);
      } else {
        throw new Error("Voice chat failed");
      }
    } catch (error) {
      console.error("Error processing voice message:", error);
      const errorMessage = error instanceof Error ? error.message : "Lỗi xử lý voice message";
      message.error(`Lỗi: ${errorMessage}`);

      // Remove the voice message if there was an error
      setChatHistory((prevHistory) => prevHistory.slice(0, -1));
    } finally {
      setIsRecording(false);
    }
  }, [chatHistory, dispatch]);

  const toggleVoiceRecorder = () => {
    setShowVoiceRecorder(!showVoiceRecorder);
  };

  return (
    <div className="gemini-chatbox-container">
      <div className="chat-display-area">
        {chatHistory.map((item, index) => (
          <div
            key={index}
            className={`message-row ${item.role === "user" ? "user-row" : "bot-row"
              }`}
          >
            {item.role === "model" && (
              <Avatar
                size={32}
                src="https://cdn-icons-png.flaticon.com/512/8649/8649588.png"
                icon={<RobotOutlined />}
                className="chat-avatar"
              />
            )}
            <div className="message-bubble">
              <div className="message-author">
                {item.role === "user" ? "Bạn" : "EcoGenZ Bot"}
              </div>
              <div className="message-text">
                {item.isVoiceMessage && item.audioUrl ? (
                  <div className="voice-message">
                    <AudioOutlined className="voice-message-icon" />
                    <audio controls src={item.audioUrl} style={{ maxWidth: '200px' }} />
                    <span className="voice-message-text">
                      {item.duration || "AI Voice Response"}
                    </span>
                  </div>
                ) : (
                  <ReactMarkdown
                    components={{
                      a: ({ ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {item.text}
                  </ReactMarkdown>
                )}
                {/* Show both text and audio if both exist */}
                {item.isVoiceMessage && item.audioUrl && item.text && item.text !== "🎵 Voice response from AI" && (
                  <div className="ai-text-response">
                    <ReactMarkdown
                      components={{
                        a: ({ ...props }) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" />
                        ),
                      }}
                    >
                      {item.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
            {item.role === "user" && (
              <Avatar
                size={32}
                icon={<UserOutlined />}
                className="chat-avatar"
              />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your messages"
          onPressEnter={handlePressEnter}
          className="chat-input-field"
        />
        <Button
          type="text"
          shape="circle"
          icon={<AudioOutlined />}
          onClick={toggleVoiceRecorder}
          disabled={voiceChatLoading || isRecording}
          className="voice-button"
          title="Voice message"
        />
        <Button
          type="text"
          shape="circle"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTextLoading}
          className="send-button"
        />
      </div>

      {showVoiceRecorder && (
        <div className="voice-recorder-container">
          <VoiceRecorder
            onAudioRecorded={handleVoiceMessage}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;