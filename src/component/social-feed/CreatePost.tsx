import { useState, useRef } from "react"; 
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createPost } from "../../redux/features/social_posts/postThunk";
import "./CreatePost.css";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const storedUserId = localStorage.getItem("userId");

  const handleSubmit = () => {
    if (!content && !imageFile) {
      alert("Please enter content or select an image.");
      return;
    }
    if (!storedUserId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", storedUserId);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    dispatch(createPost(formData));
    setContent("");
    setImageFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <img
          src={user?.profilePhotoUrl || "https://i.pravatar.cc/40"}
          alt="Your Avatar"
          className="user-avatar"
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <input
        type="file"
        accept="image/*,video/*" 
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
          }
        }}
        ref={fileInputRef}
        style={{ display: "none" }} 
      />
      
      {imageFile && <div className="file-name-display">Selected: {imageFile.name}</div>}

      <div className="create-post-actions">
        <button className="action-btn" onClick={handleImageIconClick}>
          📷 Picture/Video
        </button>
        <button className="action-btn">👥 Tag a friend</button>
        <button className="post-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
};

export default CreatePost;