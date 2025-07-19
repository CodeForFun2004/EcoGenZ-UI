// Import ảnh
import { Link } from "react-router-dom";
import post1 from "../../assets/img/post/post_1.png";
import post2 from "../../assets/img/post/post_2.png";
import post3 from "../../assets/img/post/post_3.png";
import post4 from "../../assets/img/post/post_4.png";

import "../../App.css";

const posts = [
  {
    image: post1,
    title: "10 Ways to Save the Environment",
    date: "January 12, 2019",
  },
  {
    image: post2,
    title: "The Impact of Plastic Waste",
    date: "02 Hours ago",
  },
  {
    image: post3,
    title: "How Trees Help Our Planet",
    date: "03 Hours ago",
  },
  {
    image: post4,
    title: "Renewable Energy for a Greener Future",
    date: "01 Hours ago",
  },
];

const PopularPost = () => {
  return (
    <aside className="single_sidebar_widget popular_post_widget">
      <h3 className="widget_title">Popular Post</h3>
      {posts.map((post, index) => (
        <div key={index} className="media post_item">
          <img src={post.image} alt="post" />
          <div className="media-body">
            <Link to="/">
              <h3>{post.title}</h3>
            </Link>
            <p>{post.date}</p>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default PopularPost;
