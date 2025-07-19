import { useState, useRef, useEffect } from "react"; 
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createPost, fetchAllPosts } from "../../redux/features/social_posts/postThunk";
import { toast } from "react-toastify";
import "./CreatePost.css";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setContent(textarea.value);
    
    // Auto-resize
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  // Handle Enter key to ensure line breaks work properly
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Allow natural Enter behavior (don't prevent default)
      // The textarea will automatically add \n and go to next line
    }
  };

  // Set initial height when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [content]);

  const storedUserId = localStorage.getItem("userId");

  const handleSubmit = async () => {
    if (!content && !imageFile) {
      toast.error("Please enter content or select an image.");
      return;
    }
    if (!storedUserId) {
      toast.error("User not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("userId", storedUserId);
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      // Reset form after successful creation
      setContent("");
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // Refresh the posts list
      await dispatch(fetchAllPosts());
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
      console.error("Failed to create post:", error);
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
          ref={textareaRef}
          placeholder="What's on your mind?"
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
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