import { Link } from 'react-router-dom';
import blog1 from '../../assets/img/blog/single_blog_1.png';
import blog2 from '../../assets/img/blog/single_blog_2.png';
import blog3 from '../../assets/img/blog/single_blog_3.png';
import blog4 from '../../assets/img/blog/single_blog_4.png';
import blog5 from '../../assets/img/blog/single_blog_5.png';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const images = [blog1, blog2, blog3, blog4, blog5];

const BlogList = () => {
  return (
    <div className="col-lg-8 mb-5 mb-lg-0">
      <div className="blog_left_sidebar">
        {images.map((img, index) => (
          <article key={index} className="blog_item">
            <div className="blog_item_img">
              <img className="card-img rounded-0" src={img} alt={`Blog ${index + 1}`} />
              <a href="#" className="blog_item_date">
                <h3>15</h3>
                <p>Jan</p>
              </a>
            </div>
            <div className="blog_details">
              <Link to='/' className="d-inline-block" >
                <h2>Google inks pact for new 35-storey office</h2>
              </Link>
              <p>
                That dominion stars lights dominion divide years for fourth have don't stars is that he
                earth it first without heaven in place seed it second morning saying.
              </p>
              <ul className="blog-info-link">
                <li><a href="#"><i className="fa fa-user"></i> Travel, Lifestyle</a></li>
                <li><a href="#"><i className="fa fa-comments"></i> 03 Comments</a></li>
              </ul>
            </div>
          </article>
        ))}

<nav className="blog-pagination justify-content-center d-flex">
  <ul className="pagination flex">
    <li className="page-item">
      <a href="#" className="page-link group" aria-label="Previous">
        <ChevronLeftIcon className="w-5 h-5 mb-1 text-gray-500 group-hover:text-[#3CC78F]" />
      </a>
    </li>
    <li className="page-item">
      <a href="#" className="page-link">1</a>
    </li>
    <li className="page-item active">
      <a href="#" className="page-link">2</a>
    </li>
    <li className="page-item">
      <a href="#" className="page-link group" aria-label="Next">
      <ChevronRightIcon className="w-5 h-5 mb-1 text-gray-500 group-hover:text-[#3CC78F] transition-colors duration-200" />


      </a>
    </li>
  </ul>
</nav>
      </div>
    </div>
  );
};

export default BlogList;
