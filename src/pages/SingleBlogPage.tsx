

const SingleBlogPage = () => {
  return (
    <div>
      

      <div className="bradcam_area breadcam_bg overlay d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Single Blog</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog_area single-post-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <div className="single-post">
                <div className="feature-img">
                  <img className="img-fluid" src="img/blog/single_blog_1.png" alt="" />
                </div>
                <div className="blog_details">
                  <h2>Second divided from form fish beast made every of seas all gathered us saying he our</h2>
                  <ul className="blog-info-link mt-3 mb-4">
                    <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                    <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
                  </ul>
                  <p className="excert">MCSE boot camps have its supporters and its detractors...</p>
                  <p>MCSE boot camps have its supporters and its detractors...</p>
                  <div className="quote-wrapper">
                    <div className="quotes">MCSE boot camps have its supporters and its detractors...</div>
                  </div>
                  <p>MCSE boot camps have its supporters and its detractors...</p>
                  <p>MCSE boot camps have its supporters and its detractors...</p>
                </div>
              </div>

              <div className="navigation-top">
                <div className="d-sm-flex justify-content-between text-center">
                  <p className="like-info"><span className="align-middle"><i className="fa fa-heart"></i></span> Lily and 4 people like this</p>
                  <ul className="social-icons">
                    <li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                    <li><a href="#"><i className="fa fa-behance"></i></a></li>
                  </ul>
                </div>

                <div className="navigation-area">
                  <div className="row">
                    <div className="col-lg-6 nav-left">
                      <div className="thumb"><a href="#"><img className="img-fluid" src="img/post/preview.png" alt="" /></a></div>
                      <div className="arrow"><a href="#"><span className="lnr text-white ti-arrow-left"></span></a></div>
                      <div className="detials">
                        <p>Prev Post</p>
                        <a href="#"><h4>Space The Final Frontier</h4></a>
                      </div>
                    </div>

                    <div className="col-lg-6 nav-right">
                      <div className="detials">
                        <p>Next Post</p>
                        <a href="#"><h4>Telescopes 101</h4></a>
                      </div>
                      <div className="arrow"><a href="#"><span className="lnr text-white ti-arrow-right"></span></a></div>
                      <div className="thumb"><a href="#"><img className="img-fluid" src="img/post/next.png" alt="" /></a></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blog-author">
                <div className="media align-items-center">
                  <img src="img/blog/author.png" alt="" />
                  <div className="media-body">
                    <a href="#"><h4>Harvard milan</h4></a>
                    <p>Second divided from form fish beast made...</p>
                  </div>
                </div>
              </div>

              <div className="comments-area">
                <h4>05 Comments</h4>
                {[1, 2, 3].map((cmt) => (
                  <div key={cmt} className="comment-list">
                    <div className="single-comment justify-content-between d-flex">
                      <div className="user d-flex">
                        <div className="thumb"><img src={`img/comment/comment_${cmt}.png`} alt="" /></div>
                        <div className="desc">
                          <p className="comment">Multiply sea night grass fourth day sea lesser rule open subdue female fill...</p>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <h5><a href="#">Emilly Blunt</a></h5>
                              <p className="date">December 4, 2017 at 3:12 pm </p>
                            </div>
                            <div className="reply-btn"><a href="#" className="btn-reply text-uppercase">reply</a></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="comment-form">
                <h4>Leave a Reply</h4>
                <form className="form-contact comment_form" id="commentForm">
                  <div className="row">
                    <div className="col-12"><textarea className="form-control w-100" placeholder="Write Comment" rows={9}></textarea></div>
                    <div className="col-sm-6"><input className="form-control" placeholder="Name" /></div>
                    <div className="col-sm-6"><input className="form-control" placeholder="Email" /></div>
                    <div className="col-12"><input className="form-control" placeholder="Website" /></div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="button button-contactForm btn_1 boxed-btn">Send Message</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                {/* You can reuse previous sidebar component here as well */}
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default SingleBlogPage;
