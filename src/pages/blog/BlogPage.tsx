import BlogBanner from "../../component/activities/BlogBanner";
import BlogList from "../../component/activities/BlogList";
import Category from "../../component/social-media/Category";
import Instagram from "../../component/social-media/Instagram";
import NewsLetter from "../../component/social-media/NewsLetter";
import PopularPost from "../../component/social-media/PopularPost";
import Search from "../../component/social-media/Search";
import Tag from "../../component/social-media/Tag";


const BlogPage = () => {
  return (
    <div>
      <BlogBanner/>
      <section className="blog_area section-padding">
        <div className="container">
          <div className="row">
            <BlogList/>
            <div className="col-lg-4">
              <div className="blog_right_sidebar">
                <Search/>
                <Category/>
                <PopularPost/>
                <Tag/>
                <Instagram/>
                <NewsLetter/>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default BlogPage;
