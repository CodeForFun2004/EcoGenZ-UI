import React from "react";
import MediaTextLayout from "../../component/shared/MediaTextLayout";
import "./MediaTextPage.css";

const MediaTextPage: React.FC = () => {
  const handleImageUpload = (file: File) => {
    console.log("Image uploaded:", file.name);
    // Xử lý upload ảnh ở đây
  };

  const handleTextChange = (text: string) => {
    console.log("Text changed:", text);
    // Xử lý thay đổi text ở đây
  };

  return (
    <div className="media-text-page">
      <MediaTextLayout
        onImageUpload={handleImageUpload}
        onTextChange={handleTextChange}
        initialText="Nhập nội dung văn bản của bạn ở đây để bắt đầu..."
      />
    </div>
  );
};

export default MediaTextPage;
