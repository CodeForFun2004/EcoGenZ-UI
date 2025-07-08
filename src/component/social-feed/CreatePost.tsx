import React from 'react';
import './CreatePost.css';

const CreatePost = () => {
  return (
    <div className="create-post-container">
      <div className="create-post-header">
        <img src="https://i.imgur.com/jCVN75w.jpeg" alt="Your Avatar" className="user-avatar" />
        <textarea placeholder="What are you thinking dumbass?" />
      </div>
      <div className="create-post-actions">
        <button className="action-btn">📷 Picture/Video</button>
        <button className="action-btn">👥 Tag a friend</button>
        <button className="post-btn">Post</button>
      </div>
    </div>
  );
};

export default CreatePost;