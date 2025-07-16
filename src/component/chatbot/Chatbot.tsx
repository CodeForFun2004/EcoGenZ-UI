import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  FC, 
  ChangeEvent, 
  KeyboardEvent, 
} from "react";
import { Input, Button, Avatar } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";


interface ChatMessage {
  role: "user" | "model"; 
  text: string;
}

const Chatbot: FC = () => {
  // 2. Gán kiểu cho các state
  const [inputValue, setInputValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Hi this is 911, what's your emergency",
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  // 4. Gán kiểu cho tham số của event handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = useCallback(() => {
    const userMessageText = inputValue.trim();
    if (!userMessageText) return;

    const newUserMessage: ChatMessage = { role: "user", text: userMessageText };
    const botMessage: ChatMessage = {
      role: "model",
      text: "Hỏi cc",
    };

    setChatHistory((prevHistory) => [...prevHistory, newUserMessage, botMessage]);
    setInputValue("");
  }, [inputValue]);

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
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    ),
                  }}
                >
                  {item.text}
                </ReactMarkdown>
              </div>
            </div>
            {item.role === "user" && (
              <Avatar size={32} icon={<UserOutlined />} className="chat-avatar" />
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