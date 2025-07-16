import React, { useState, useRef } from "react";
import "./MediaTextLayout.css";
import {
  aichatAPI,
  type RecycleImageResponse,
} from "../../redux/features/aichat/aichatAPI";

interface MediaTextLayoutProps {
  onImageUpload?: (file: File) => void;
  onTextChange?: (text: string) => void;
  initialText?: string;
}

const MediaTextLayout: React.FC<MediaTextLayoutProps> = ({
  onImageUpload,
  onTextChange,
  initialText = "",
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [text, setText] = useState(initialText);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload?.(file);

      // Call API to get recycle information
      try {
        setIsProcessing(true);
        setText("Analyzing image...");

        const response: RecycleImageResponse = await aichatAPI.recycleImage(
          file
        );

        const recycleText = `🔍 Item: ${response.detectedItem}\n\n♻️ Recycling Guide:\n${response.recycleTip}`;
        setText(recycleText);
        onTextChange?.(recycleText);
      } catch (error) {
        console.error("Error processing image:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setText(
          `❌ Error: ${errorMessage}\n\n🔧 Please check:\n- Backend is running?\n- Network connection\n- Console log for more details`
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange?.(e.target.value);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="media-text-layout">
      <div className="media-text-container">
        {/* Left side - Image Upload */}
        <div className="upload-section">
          <div className="section-title">Uploads Image</div>
          <div
            className={`upload-area ${isDragOver ? "drag-over" : ""} ${
              uploadedImage ? "has-image" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
          >
            {uploadedImage ? (
              <div className="uploaded-image-container">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="uploaded-image"
                />
                <div className="image-overlay">
                  <button className="change-image-btn">Change Image</button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📷</div>
                <div className="upload-text">
                  <p>
                    <strong>Drag and drop image here</strong>
                  </p>
                  <p>
                    or{" "}
                    <span className="upload-link">
                      select file from computer
                    </span>
                  </p>
                  <p className="upload-hint">
                    Support: JPG, PNG, GIF (max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>

        {/* Right side - Recycling suggestions */}
        <div className="text-section">
          <div className="section-title">Recycling suggestions</div>
          <div className="text-area-container">
            <textarea
              className="text-display"
              value={text}
              onChange={handleTextChange}
              placeholder="Upload an image to get recycling information..."
              rows={12}
              disabled={isProcessing}
            />
            {isProcessing && (
              <div className="processing-indicator">⏳ Analyzing image...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaTextLayout;
