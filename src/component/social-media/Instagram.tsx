

// Import từng ảnh Instagram
import post5 from '../../assets/img/post/post_5.png';
import post6 from '../../assets/img/post/post_6.png';
import post7 from '../../assets/img/post/post_7.png';
import post8 from '../../assets/img/post/post_8.png';
import post9 from '../../assets/img/post/post_9.png';
import post10 from '../../assets/img/post/post_10.png';

const instagramImages = [post5, post6, post7, post8, post9, post10];

const Instagram = () => {
  return (
    <aside className="single_sidebar_widget instagram_feeds">
      <h4 className="widget_title">Instagram Feeds</h4>
      <ul className="instagram_row flex-wrap">
        {instagramImages.map((img, index) => (
          <li key={index}>
            <a href="#">
              <img className="img-fluid" src={img} alt={`instagram_${index + 5}`} />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Instagram;
