import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  type FC,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Input, Button, Avatar } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import {
  aichatAPI,
  type ChatMessage as APIChatMessage,
} from "../../redux/features/aichat/aichataskAPI";
import "./Chatbot.css";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

const Chatbot: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi, I'm EcoGenZ Bot, how can I help you?",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = useCallback(async () => {
    const userMessageText = inputValue.trim();
    if (!userMessageText || isLoading) return;

    const newUserMessage: ChatMessage = { role: "user", text: userMessageText };

    // Add user message immediately
    setChatHistory((prevHistory) => [...prevHistory, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Convert chat history to API format
      const previousMessages: APIChatMessage[] = chatHistory.map((msg) => ({
        role: msg.role === "model" ? "assistant" : msg.role,
        content: msg.text,
      }));

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
      setIsLoading(false);
    }
  }, [inputValue, isLoading, chatHistory]);

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="gemini-chatbox-container">
      <div className="chat-display-area">
        {chatHistory.map((item, index) => (
          <div
            key={index}
            className={`message-row ${
              item.role === "user" ? "user-row" : "bot-row"
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
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          className="send-button"
        />
      </div>
    </div>
  );
};

export default Chatbot;