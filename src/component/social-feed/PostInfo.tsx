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
      <div className="post-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={post?.user.profilePhotoUrl || "default-avatar.png"}
            className="author-avatar"
          />
          <div className="author-info ms-2">
            <span className="author-name">{post?.user?.userName}</span>
            <span className="post-timestamp">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        {loggedInUserId === post.userId && (
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        )}
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.mediaUrl &&
          post.mediaUrl.trim() !== "" &&
          !post.mediaUrl.includes("/Helpers/profile_base.jpg") && (
            <img
              src={post.mediaUrl}
              alt="Post content"
              className="post-image"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
      </div>
    </div>
  );
};

export default Post;
