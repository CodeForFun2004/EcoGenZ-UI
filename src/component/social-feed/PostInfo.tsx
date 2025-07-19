import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import type { Post } from "../../redux/features/social_posts/postTypes";
import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";
import { getUserByIdThunk } from "../../redux/features/auth/authThunk";

import "./Post.css";
import {
  deletePostById,
  toggleLike,
} from "../../redux/features/social_posts/postAPI";

type PostProps = {
  post: Post;
};

const Post = ({ post }: PostProps) => {
  const dispatch = useAppDispatch();

  // Get userId from localStorage
  const loggedInUserId = localStorage.getItem("userId");

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      console.log("Deleting post with ID:", postId); // log post ID
      await deletePostById(postId); // No dispatch
    }
  };

  useEffect(() => {
    const userId = post.userId;
    if (userId) {
      dispatch(getUserByIdThunk({ userId }));
    }
  }, [dispatch, post.user.userId]);

  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={post?.user.profilePhotoUrl || "default-avatar.png"}
          className="author-avatar"
        />
        <div className="author-info">
          <span className="author-name">{post?.user.userName}</span>
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

      {loggedInUserId === post.userId && (
        <div className="post-controls">
          <button
            className="delete-button"
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
