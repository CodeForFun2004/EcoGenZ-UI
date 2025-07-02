
import { Link } from 'react-router-dom';


import NewsSection from '../component/home/NewsSection';
import './Home.css'
import imgHelp1 from '../assets/img/help/1.png';
import imgHelp2 from '../assets/img/help/2.png';
import imgHelp3 from '../assets/img/help/3.png';



import LastestActivities from '../component/home/LastestActivities';
import PopularCauses from '../component/home/PopularCauses';
import OurVolunteer from '../component/home/OurVolunteer';
import Counter from '../component/home/Counter';


const HomePage = () => {
  return (
    <>
      {/* Slider Area Start */}
      <div className="slider_area">
        <div className="single_slider d-flex align-items-center slider_bg_1 overlay2">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="slider_text">
                  <span>Get Started Today.</span>
                  <h3>Help the children When They Need</h3>
                  <p>
                    With so much to consume and such little time, coming up <br />
                    with relevant title ideas is essential
                  </p>
                  <Link to="/about" className="boxed-btn3">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Slider Area End */}

      {/* Reason Area Start */}
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
            <div className="col-lg-4 col-md-6">
              <div className="single_reson">
                <div className="thum">
                  <div className="thum_1">
                    <img src={imgHelp1} alt="" />
                  </div>
                </div>
                <div className="help_content">
                  <h4>Collecting Fund</h4>
                  <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print.</p>
                  <Link to="#" className="read_more">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single_reson">
                <div className="thum">
                  <div className="thum_1">
                    <img src={imgHelp2} alt="" />
                  </div>
                </div>
                <div className="help_content">
                  <h4>Blood Camp</h4>
                  <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print.</p>
                  <Link to="#" className="read_more">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="single_reson">
                <div className="thum">
                  <div className="thum_1">
                    <img src={imgHelp3} alt="" />
                  </div>
                </div>
                <div className="help_content">
                  <h4>Friendly Volunteer</h4>
                  <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print.</p>
                  <Link to="#" className="read_more">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reason Area End */}

      <LastestActivities/>

      {/* Latest Activities Area Start */}
      {/* <div className="latest_activites_area">
        <div className="video_bg_1 video_activite d-flex align-items-center justify-content-center">
          <a className="popup-video" href="https://www.youtube.com/watch?v=MG3jGHnBVQs">
            <i className="flaticon-ui"></i>
          </a>
        </div>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="activites_info">
                <div className="section_title">
                  <h3><span>Watch Our Latest</span><br />Activities</h3>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim minim veniam, quis nostrud exercitation.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore dolore magna aliqua. enim minim veniam, quis nostrud exercitation. tempor incididunt ut labore dolore magna aliqua. enim minim veniam, quis nostrud exercitation.</p>
                <Link to="#" className="boxed-btn4">Donate Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Latest Activities Area End */}

      <PopularCauses/>

      {/* Popular Causes Area Start */}
      {/* <div className="popular_causes_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb-55">
                <h3><span>Popular Causes</span></h3>
              </div>
            </div>
          </div>
          <div className="row">
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-lg-4">
                <div className="single_cause">
                  <div className="thumb">
                    <img src={`../assets/img/causes/${item}.png`} alt="" />
                  </div>
                  <div className="causes_content">
                    <div className="custom_progress_bar">
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
                          <span className="progres_count">30%</span>
                        </div>
                      </div>
                    </div>
                    <div className="balance d-flex justify-content-between align-items-center">
                      <span>Raised: $5000.00 </span>
                      <span>Goal: $9000.00 </span>
                    </div>
                    <h4>Cause Title {item}</h4>
                    <p>The passage is attributed to an unknown typesetter in the century who is thought</p>
                    <Link to="/cause_details" className="read_more">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Popular Causes Area End */}


      <Counter/>
      {/* Counter Area Start */}
      {/* <div className="counter_area">
        <div className="container">
          <div className="counter_bg overlay">
            <div className="row">
              {['calendar', 'heart-beat', 'in-love', 'hug'].map((icon, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="single_counter d-flex align-items-center justify-content-center">
                    <div className="icon">
                      <i className={`flaticon-${icon}`}></i>
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
      </div> */}
      {/* Counter Area End */}

      <OurVolunteer/>
      
      {/* Volunteers Area Start */}
      {/* <div className="our_volunteer_area section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb-55">
                <h3><span>Our Volunteer</span></h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-lg-4 col-md-6">
                <div className="single_volenteer">
                  <div className="volenteer_thumb">
                    <img src={`/img/volenteer/${item}.png`} alt="" />
                  </div>
                  <div className="voolenteer_info d-flex align-items-end">
                    <div className="social_links">
                      <ul>
                        {['facebook', 'pinterest', 'linkedin', 'twitter'].map((platform, idx) => (
                          <li key={idx}>
                            <a href="#"><i className={`fa fa-${platform}`}></i></a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="info_inner">
                      <h4>Volunteer {item}</h4>
                      <p>Donner</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Volunteers Area End */}

      {/* <!-- news__area_start  --> */}
      <NewsSection/>
    {/* <!-- news__area_end  --> */}

   

      {/* Donation Area Start */}
      <div className="make_donation_area section_padding">
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
                            <span className="input-group-text">$</span>
                          </div>
                          <input type="text" className="form-control" placeholder="40,200" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="single_amount">
                      <div className="fixed_donat d-flex align-items-center justify-content-between">
                        <div className="select_prise">
                          <h4>Select Amount:</h4>
                        </div>
                        {[10, 30, 'Other'].map((amount, idx) => (
                          <div key={idx} className="single_doonate">
                            <input type="radio" id={`blns_${idx}`} name="radio-group" />
                            <label htmlFor={`blns_${idx}`}>{amount}</label>
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
                <Link to="#" className="boxed-btn4">Donate Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Donation Area End */}
    </>
  );
};

export default HomePage;
