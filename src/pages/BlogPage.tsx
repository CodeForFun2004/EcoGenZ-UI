

const BlogPage = () => {
  return (
    <div>
      

      <div className="bradcam_area breadcam_bg overlay d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>Blog</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="blog_area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="blog_left_sidebar">
                {[1, 2, 3, 4, 5].map((id) => (
                  <article key={id} className="blog_item">
                    <div className="blog_item_img">
                      <img className="card-img rounded-0" src={`img/blog/single_blog_${id}.png`} alt="" />
                      <a href="#" className="blog_item_date">
                        <h3>15</h3>
                        <p>Jan</p>
                      </a>
                    </div>
                    <div className="blog_details">
                      <a className="d-inline-block" href="single-blog.html">
                        <h2>Google inks pact for new 35-storey office</h2>
                      </a>
                      <p>That dominion stars lights dominion divide years for fourth have don't stars is that he earth it first without heaven in place seed it second morning saying.</p>
                      <ul className="blog-info-link">
                        <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                        <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
                      </ul>
                    </div>
                  </article>
                ))}
                <nav className="blog-pagination justify-content-center d-flex">
                  <ul className="pagination">
                    <li className="page-item">
                      <a href="#" className="page-link" aria-label="Previous">
                        <i className="ti-angle-left"></i>
                      </a>
                    </li>
                    <li className="page-item"><a href="#" className="page-link">1</a></li>
                    <li className="page-item active"><a href="#" className="page-link">2</a></li>
                    <li className="page-item">
                      <a href="#" className="page-link" aria-label="Next">
                        <i className="ti-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                <aside className="single_sidebar_widget search_widget">
                  <form action="#">
                    <div className="form-group">
                      <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder='Search Keyword' />
                        <div className="input-group-append">
                          <button className="btn" type="button"><i className="ti-search"></i></button>
                        </div>
                      </div>
                    </div>
                    <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">Search</button>
                  </form>
                </aside>

                <aside className="single_sidebar_widget post_category_widget">
                  <h4 className="widget_title">Category</h4>
                  <ul className="list cat-list">
                    {["Resaurant food (37)", "Travel news (10)", "Modern technology (03)", "Product (11)", "Inspiration (21)", "Health Care (21)"]
                      .map((cat, idx) => (
                        <li key={idx}>
                        <a href="#" className="d-flex">
                          <p>{cat.split('(')[0]}</p>
                          <p>({cat.match(/\((\d+)\)/)?.[1] ?? "0"})</p>
                        </a>
                      </li>
                      
                      ))}
                  </ul>
                </aside>

                <aside className="single_sidebar_widget popular_post_widget">
                  <h3 className="widget_title">Recent Post</h3>
                  {[1, 2, 3, 4].map((id) => (
                    <div key={id} className="media post_item">
                      <img src={`img/post/post_${id}.png`} alt="post" />
                      <div className="media-body">
                        <a href="single-blog.html">
                          <h3>Sample Post {id}</h3>
                        </a>
                        <p>Sample Date</p>
                      </div>
                    </div>
                  ))}
                </aside>

                <aside className="single_sidebar_widget tag_cloud_widget">
                  <h4 className="widget_title">Tag Clouds</h4>
                  <ul className="list">
                    {["project", "love", "technology", "travel", "restaurant", "life style", "design", "illustration"].map((tag, i) => (
                      <li key={i}><a href="#">{tag}</a></li>
                    ))}
                  </ul>
                </aside>

                <aside className="single_sidebar_widget instagram_feeds">
                  <h4 className="widget_title">Instagram Feeds</h4>
                  <ul className="instagram_row flex-wrap">
                    {[5, 6, 7, 8, 9, 10].map((id) => (
                      <li key={id}><a href="#"><img className="img-fluid" src={`img/post/post_${id}.png`} alt="" /></a></li>
                    ))}
                  </ul>
                </aside>

                <aside className="single_sidebar_widget newsletter_widget">
                  <h4 className="widget_title">Newsletter</h4>
                  <form action="#">
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder='Enter email' required />
                    </div>
                    <button className="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">Subscribe</button>
                  </form>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default BlogPage;
