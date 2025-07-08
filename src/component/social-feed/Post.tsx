import React, { useState } from 'react';
import type { PostData } from '../../data/dummy-posts';
import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';
import './Post.css';

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={post.avatar} alt={post.author} className="author-avatar" />
        <div className="author-info">
          <span className="author-name">{post.author}</span>
          <span className="post-timestamp">{post.timestamp}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="post-image" />}
      </div>

      <div className="post-stats">
        <span>{likesCount} Likes</span>
        <span>{post.comments.length} Comments</span>
        <span>{post.shares} Shares</span>
      </div>

      <div className="post-actions">
        <button onClick={handleLike} className={`action-button ${isLiked ? 'liked' : ''}`}>
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