import React, { useEffect, useState } from "react";
import { CreateComments } from "../../redux/features/comment/commentThunk";
import { useAppDispatch } from "../../redux/hook";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { getUserByIdThunk } from "../../redux/features/auth/authThunk";
import { useParams } from "react-router-dom";

const CommentsForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const [commentText, setCommentText] = useState("");
  const storedUserId = localStorage.getItem("userId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = storedUserId;
    const activityId = id;
    console.log("Comment Info:", {
      content: commentText,
      userId,
      activityId,
    });
    if (!commentText.trim() || !userId || !activityId) {
      return;
    }

    try {
      await dispatch(
        CreateComments({
          content: commentText,
          userId,
          activityId,
        })
      );
      setCommentText("");
    } catch (err) {
      console.error("Failed to submit comment", err);
    }
  };

  return (
    <div className="comment-form">
      <h4>Leave a Reply</h4>
      <form
        className="form-contact comment_form"
        id="commentForm"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <textarea
                className="form-control w-100"
                name="comment"
                id="comment"
                cols={30}
                rows={9}
                placeholder="Write Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div> */}
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="button button-contactForm btn_1 boxed-btn"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
