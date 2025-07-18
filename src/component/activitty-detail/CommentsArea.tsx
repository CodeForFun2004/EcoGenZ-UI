import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchCommentByPostId } from "../../redux/features/comment/commentThunk";
import { useParams } from "react-router-dom";
import type { Comment } from "../../redux/features/comment/commentTypes";

const placeholderImg = "https://ui-avatars.com/api/?name=User";

const CommentsArea = () => {
  const dispatch = useAppDispatch();
  const { id: postId } = useParams();

  const {
    comments = [],
    loading,
    error,
  } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentByPostId(postId));
    }
  }, [dispatch, postId]);

  const flatComments = comments.flat();

  const uniqueComments = Array.from(
    new Map(flatComments.map((cmt) => [cmt.id, cmt])).values()
  );

  return (
    <div className="comments-area">
      <h4>{uniqueComments.length} Comments</h4>
      {loading && <p>Loading comments...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {uniqueComments.map((cmt: Comment) => {
        const user = cmt.user;

        return (
          <div key={cmt.id} className="comment-list">
            <div className="single-comment justify-content-between d-flex">
              <div className="user d-flex">
                <div className="thumb">
                  <img
                    src={user?.profilePhotoUrl || placeholderImg}
                    alt={user?.email || "User"}
                  />
                </div>
                <div className="desc">
                  <p className="comment">{cmt.text || "Loading comment..."}</p>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <h5>
                        <a href="#">{user?.email || "Anonymous"}</a>
                      </h5>
                      <p className="date">
                        {cmt.createdAt
                          ? new Date(cmt.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsArea;
