import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/img/logo.png';
import './Header.css'



const Header = () => {
  useEffect(() => {
    const handleScroll = () => {
      const stickyHeader = document.getElementById("sticky-header");
      const backTop = document.getElementById("back-top");

      if (window.scrollY < 400) {
        stickyHeader?.classList.remove("sticky");
        backTop?.classList.remove("show");
      } else {
        stickyHeader?.classList.add("sticky");
        backTop?.classList.add("show");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <div className="header-area">
        <div className="header-top_area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6 col-md-12 col-lg-8">
                <div className="short_contact_list">
                  <ul>
                    <li><a href="#"><i className="fa fa-phone"></i> +1 (454) 556-5656</a></li>
                    <li><a href="#"><i className="fa fa-envelope"></i> Yourmail@gmail.com</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-lg-4">
                <div className="social_media_links d-none d-lg-block">
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-pinterest-p"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="sticky-header" className="main-header-area">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo">
                  <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="main-menu">
                  <nav>
                    <ul id="navigation">
                      <li><Link to="/">home</Link></li>
                      <li><Link to="/about-page">About</Link></li>
                      <li>
                        <Link to="/">blog <i className="ti-angle-down"></i></Link>
                        <ul className="submenu">
                          <li><Link to="/blog-page">blog</Link></li>
                          <li><Link to="/single-blog-page">single-blog</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/contact-page">Contact</Link></li>
                    </ul>
                  </nav>
                  <div className="Appointment">
                    <div className="book_btn d-none d-lg-block">
                      <a data-scroll-nav='1' href="#">Make a Donate</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
