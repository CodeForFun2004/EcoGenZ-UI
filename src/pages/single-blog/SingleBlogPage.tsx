import SingleBlogBanner from "../../component/activitty-detail/SingleBlogBanner";
import Search from "../../component/social-media/Search";
import Category from "../../component/social-media/Category";
import PopularPost from "../../component/social-media/PopularPost";
import Tag from "../../component/social-media/Tag";
import Instagram from "../../component/social-media/Instagram";
import NewsLetter from "../../component/social-media/NewsLetter";
import SingleBlog from "../../component/activitty-detail/SingleBlog";
import BlogAuthor from "../../component/activitty-detail/BlogAuthor";
import CommentsArea from "../../component/activitty-detail/CommentsArea";
import CommentsForm from "../../component/activitty-detail/CommentsForm";

const SingleBlogPage = () => {
  return (
    <div>
      <SingleBlogBanner />

      <section className="blog_area single-post-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 posts-list">
              <SingleBlog />
              {/* <NavPost /> */}
              <BlogAuthor />
              <CommentsArea />
              <CommentsForm />
            </div>
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                <Search />
                <Category />
                <PopularPost />
                <Tag />
                <Instagram />
                <NewsLetter />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBlogPage;
