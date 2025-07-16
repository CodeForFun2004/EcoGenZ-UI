import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook"; // ✅ Use typed hooks
import { createPost } from "../../redux/features/social_posts/postThunk";
import { getUserByIdThunk } from "../../redux/features/auth/authThunk";
import "./CreatePost.css";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const storedUserId = localStorage.getItem("userId");
  // const userId = storedUserId ? JSON.parse(storedUserId) : null;

  const handleSubmit = () => {
    if (!content) {
      alert("Please enter some content.");
      return;
    }

    if (!storedUserId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", storedUserId); // Must be a plain string, not null
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    dispatch(createPost(formData));
    setContent("");
    setImageFile(null);
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
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            setImageFile(e.target.files[0]);
          }
        }}
      />

      <div className="create-post-actions">
        <button className="action-btn">📷 Picture/Video</button>
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
