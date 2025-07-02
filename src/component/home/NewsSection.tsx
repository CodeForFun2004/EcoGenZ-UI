import Slider from "react-slick";
import newsImage1 from "../../assets/img/news/1.png";
import newsImage2 from "../../assets/img/news/2.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewsSection.css"; // 

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const newsData = [
  {
    image: newsImage1,
    date: "July 18, 2019",
    title: "Pure Water Is More Essential",
    description:
      "The passage experienced a surge in popularity during the 1960s when used it on their sheets, and again.",
    link: "single-blog.html",
  },
  {
    image: newsImage2,
    date: "July 18, 2019",
    title: "Pure Water Is More Essential",
    description:
      "The passage experienced a surge in popularity during the 1960s when used it on their sheets, and again.",
    link: "single-blog.html",
  },
];

const NewsSection = () => {
  return (
    <div className="news__area section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section_title text-center mb-55">
              <h3><span>News & Updates</span></h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <Slider {...sliderSettings} className="news-slider">
              {newsData.map((item, index) => (
                <div className="single__blog d-flex align-items-center news-slide" key={index}>
                  <div className="thum">
                    <img src={item.image} alt="news" />
                  </div>
                  <div className="newsinfo">
                    <span>{item.date}</span>
                    <a href={item.link}>
                      <h3>{item.title}</h3>
                    </a>
                    <p>{item.description}</p>
                    <a className="read_more" href={item.link}>Read More</a>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
