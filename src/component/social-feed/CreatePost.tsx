import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook"; // ✅ Use typed hooks
import { createPost } from "../../redux/features/social_posts/postThunk";
import { getUserById } from "../../redux/features/auth/authThunk";
import "./CreatePost.css";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatch(getUserById(storedUserId));
    }
    console.log("User fetched:", user);
  }, [dispatch]);

  const handleSubmit = () => {
    if (!content) {
      alert("Please enter some content.");
      return;
    }

    if (!user?.userId) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", user.userId);
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
          src={user?.profilePhotoUrl || "default-avatar.png"}
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
