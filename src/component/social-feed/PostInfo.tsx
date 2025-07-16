import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import type { Post } from "../../redux/features/social_posts/postTypes";
import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";
import { getUserById } from "../../redux/features/auth/authThunk";

import "./Post.css";
import { toggleLike } from "../../redux/features/social_posts/postAPI";

type PostProps = {
  post: Post;
};

const Post = ({ post }: PostProps) => {
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length || 0);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatch(getUserById(storedUserId));
    }
  }, [dispatch]);
  const handleLike = async () => {
    if (!user) return;

    // Optimistic UI update
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await toggleLike(user.id, post.id);
      console.log("Like toggled successfully with+",user.id, "and post.id", post.id);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Rollback UI
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={post?.user.profilePhotoUrl || "default-avatar.png"}
          className="author-avatar"
        />
        <div className="author-info">
          <span className="author-name">{user?.Username}</span>
          <span className="post-timestamp">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.mediaUrl && (
          <img src={post.mediaUrl} alt="Post content" className="post-image" />
        )}
      </div>

      <div className="post-stats">
        <span>{likesCount} Likes</span>
        <span>{post?.comments?.length} Comments</span>
        <span>{post?.shares?.length} Shares</span>
      </div>

      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`action-button ${isLiked ? "liked" : ""}`}
        >
          <FaThumbsUp /> Like
        </button>
        <button className="action-button">
          <FaCommentAlt /> Comment
        </button>
        <button className="action-button">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default Post;
