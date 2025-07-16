import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import {
  MessageOutlined,
  CloseOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import Chatbot from "./Chatbot"; 
import "./FloatingChatButton.css";

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`chatbox-wrapper ${isOpen ? "open" : ""}`}>
        <div className="chatbox-header">
          <span>
            <RobotOutlined /> EcoGenZ Assistant
          </span>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={toggleChat}
            size="small"
            className="close-chat-button"
          />
        </div>
        {/* Chỉ render Chatbot khi được mở để tối ưu hiệu suất */}
        {isOpen && <Chatbot />}
      </div>

      <Tooltip
        title={isOpen ? "Close" : "Chat with AI Assistant"}
        placement="left"
      >
        <Button
          className="floating-chat-button"
          type="primary"
          shape="circle"
          size="large"
          icon={isOpen ? <CloseOutlined /> : <MessageOutlined />}
          onClick={toggleChat}
        />
      </Tooltip>
    </>
  );
};

export default FloatingChatButton;