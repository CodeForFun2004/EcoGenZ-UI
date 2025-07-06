const CommentsForm = () => {
  return (
    <div className="comment-form">
      <h4>Leave a Reply</h4>
      <form className="form-contact comment_form" id="commentForm">
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
              ></textarea>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <input className="form-control" placeholder="Name" />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <input className="form-control" placeholder="Email" />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <input className="form-control" placeholder="Website" />
            </div>
          </div>
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
