import React from "react";
import MediaTextLayout from "../../component/shared/MediaTextLayout";
import "./MediaTextPage.css";

const MediaTextPage: React.FC = () => {
  const handleImageUpload = (file: File) => {
    console.log("Image uploaded:", file.name);
    // Image processing will be handled by MediaTextLayout component
  };

  const handleTextChange = (text: string) => {
    console.log("Text changed:", text);
    // Handle text changes if needed for additional processing
  };

  return (
    <div className="media-text-page">
      <MediaTextLayout
        onImageUpload={handleImageUpload}
        onTextChange={handleTextChange}
        initialText="AI suggestions will be displayed here..."
      />
    </div>
  );
};

export default MediaTextPage;
