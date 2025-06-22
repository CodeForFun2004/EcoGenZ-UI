import React from "react";
import { Link } from "react-router-dom";
import footer_logo from "../../assets/img/footer_logo.png";
import news_1 from "../../assets/img/news/news_1.png";
import news_2 from "../../assets/img/news/news_2.png";
import '../../App.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" style={{ marginTop: '500px' }}>
      <div className="footer_top">
        <div className="container">
          <div className="row">

            <div className="col-xl-4 col-md-6 col-lg-4">
              <div className="footer_widget">
                <div className="footer_logo">
                  <Link to="/">
                    <img src={footer_logo} alt="Footer Logo" />
                  </Link>
                </div>
                <p className="address_text">
                  Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
                  elit, sed do <br /> eiusmod tempor incididunt ut labore.
                </p>
                <div className="socail_links">
                  <ul>
                    <li><a href="#"><i className="ti-facebook"></i></a></li>
                    <li><a href="#"><i className="ti-twitter-alt"></i></a></li>
                    <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-md-6 col-lg-2">
              <div className="footer_widget">
                <h3 className="footer_title">Services</h3>
                <ul className="links">
                  <li><a href="#">Donate</a></li>
                  <li><a href="#">Sponsor</a></li>
                  <li><a href="#">Fundraise</a></li>
                  <li><a href="#">Volunteer</a></li>
                  <li><a href="#">Partner</a></li>
                  <li><a href="#">Jobs</a></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">Contacts</h3>
                <div className="contacts">
                  <p>
                    +2(305) 587-3407 <br />
                    info@loveuscharity.com <br />
                    Flat 20, Reynolds Neck, North Helenaville, FV77 8WS
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 col-lg-3">
              <div className="footer_widget">
                <h3 className="footer_title">Top News</h3>
                <ul className="news_links">
                  <li>
                    <div className="thumb">
                      <a href="#"><img src={news_1} alt="News 1" /></a>
                    </div>
                    <div className="info">
                      <a href="#"><h4>School for African Childrens</h4></a>
                      <span>Jun 12, 2019</span>
                    </div>
                  </li>
                  <li>
                    <div className="thumb">
                      <a href="#"><img src={news_2} alt="News 2" /></a>
                    </div>
                    <div className="info">
                      <a href="#"><h4>School for African Childrens</h4></a>
                      <span>Jun 12, 2019</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="copy-right_text">
        <div className="container">
          <div className="row">
            <div className="bordered_1px"></div>
            <div className="col-xl-12">
              <div className="copy_right text-center">
                <p>
                  Copyright &copy; {currentYear} All rights reserved |
                  This template is made with <i className="ti-heart" aria-hidden="true"></i> by{" "}
                  <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
