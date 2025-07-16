import React, { useState, useRef } from "react";
import "./MediaTextLayout.css";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload?.(file);
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
          <div className="section-title">Phần giao diện up ảnh</div>
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
                  <button className="change-image-btn">Thay đổi ảnh</button>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📷</div>
                <div className="upload-text">
                  <p>
                    <strong>Kéo thả ảnh vào đây</strong>
                  </p>
                  <p>
                    hoặc{" "}
                    <span className="upload-link">chọn file từ máy tính</span>
                  </p>
                  <p className="upload-hint">
                    Hỗ trợ: JPG, PNG, GIF (tối đa 10MB)
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

        {/* Right side - Text Display */}
        <div className="text-section">
          <div className="section-title">
            Phần giao diện hiển thị một đoạn text
          </div>
          <div className="text-area-container">
            <textarea
              className="text-display"
              value={text}
              onChange={handleTextChange}
              placeholder="Nhập nội dung văn bản của bạn ở đây..."
              rows={12}
            />
            <div className="text-controls">
              <button className="text-control-btn">📝 Định dạng</button>
              <button className="text-control-btn">💾 Lưu</button>
              <button className="text-control-btn">🔄 Làm mới</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaTextLayout;
