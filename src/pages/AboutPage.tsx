import React from "react";

const AboutPage = () => {
  return (
    <>
      <div className="bradcam_area breadcam_bg overlay d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text text-center">
                <h3>About US</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reson_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb-55">
                <h3><span>Reason of Helping</span></h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[1, 2, 3].map((num) => (
              <div key={num} className="col-lg-4 col-md-6">
                <div className="single_reson">
                  <div className="thum">
                    <div className="thum_1">
                      <img src={`img/help/${num}.png`} alt="" />
                    </div>
                  </div>
                  <div className="help_content">
                    <h4>Collecting Fund</h4>
                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print.</p>
                    <a href="#" className="read_more">Read More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="latest_activites_area">
        <div className="video_bg_1 video_activite d-flex align-items-center justify-content-center">
          <a className="popup-video" href="https://www.youtube.com/watch?v=MG3jGHnBVQs" target="_blank" rel="noopener noreferrer">
            <i className="flaticon-ui"></i>
          </a>
        </div>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="activites_info">
                <div className="section_title">
                  <h3><span>Watch Our Latest </span><br />Activities</h3>
                </div>
                <p className="para_1">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim minim veniam, quis nostrud exercitation.</p>
                <p className="para_2">Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim minim veniam, quis nostrud exercitation. tempor incididunt ut labore dolore magna aliqua. enim minim veniam, quis nostrud exercitation.</p>
                <a href="#" className="boxed-btn4">Donate Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="counter_area pt-120">
        <div className="container">
          <div className="counter_bg overlay">
            <div className="row">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="col-lg-3 col-md-6">
                  <div className="single_counter d-flex align-items-center justify-content-center">
                    <div className="icon">
                      <i className="flaticon-calendar"></i>
                    </div>
                    <div className="events">
                      <h3 className="counter">120</h3>
                      <p>Finished Event</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="our_volunteer_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb-55">
                <h3><span>Our Volunteer</span></h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[
              { name: "Sakil khan", role: "Donner", img: "1.png" },
              { name: "Emran Ahmed", role: "Volunteer", img: "2.png" },
              { name: "Sabbir Ahmed", role: "Volunteer", img: "3.png" }
            ].map((vol, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className="single_volenteer">
                  <div className="volenteer_thumb">
                    <img src={`img/volenteer/${vol.img}`} alt="" />
                  </div>
                  <div className="voolenteer_info d-flex align-items-end">
                    <div className="social_links">
                      <ul>
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      </ul>
                    </div>
                    <div className="info_inner">
                      <h4>{vol.name}</h4>
                      <p>{vol.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div data-scroll-index='1' className="make_donation_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb-55">
                <h3><span>Make a Donation</span></h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <form className="donation_form">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <div className="single_amount">
                      <div className="input_field">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">$</span>
                          </div>
                          <input type="text" className="form-control" placeholder="40,200" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="single_amount">
                      <div className="fixed_donat d-flex align-items-center justify-content-between">
                        <div className="select_prise"><h4>Select Amount:</h4></div>
                        {["10", "30", "Other"].map((amt, index) => (
                          <div key={index} className="single_doonate">
                            <input type="radio" id={`blns_${index}`} name="radio-group" defaultChecked />
                            <label htmlFor={`blns_${index}`}>{amt}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="donate_now_btn text-center">
                <a href="#" className="boxed-btn4">Donate Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
