
import comment1 from "../../assets/img/comment/comment_1.png";
import comment2 from "../../assets/img/comment/comment_2.png";
import comment3 from "../../assets/img/comment/comment_3.png";

const commentImages: Record<number, string> = {
  1: comment1,
  2: comment2,
  3: comment3,
};

const CommentsArea = () => {
  return (
    <div className="comments-area">
      <h4>05 Comments</h4>
      {[1, 2, 3].map((cmt) => (
        <div key={cmt} className="comment-list">
          <div className="single-comment justify-content-between d-flex">
            <div className="user d-flex">
              <div className="thumb">
                <img src={commentImages[cmt]} alt={`Comment ${cmt}`} />
              </div>
              <div className="desc">
                <p className="comment">
                  Multiply sea night grass fourth day sea lesser rule open subdue
                  female fill which them Blessed, give fill lesser bearing multiply
                  sea night grass fourth day sea lesser
                </p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <h5>
                      <a href="#">Emilly Blunt</a>
                    </h5>
                    <p className="date">December 4, 2017 at 3:12 pm</p>
                  </div>
                  <div className="reply-btn">
                    <a href="#" className="btn-reply text-uppercase">
                      reply
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsArea;
