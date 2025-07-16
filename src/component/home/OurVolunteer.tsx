import v1 from "../../assets/img/volenteer/1.png";
import v2 from "../../assets/img/volenteer/2.png";
import v3 from "../../assets/img/volenteer/3.png";

const volunteerImages = [v1, v2, v3];

const OurVolunteer = () => {
  return (
    <div className="our_volunteer_area section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section_title text-center mb-55">
              <h3>
                <span>Our Volunteer</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {volunteerImages.map((imgSrc, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="single_volenteer">
                <div className="volenteer_thumb">
                  <img src={imgSrc} alt={`Volunteer ${index + 1}`} />
                </div>
                <div className="voolenteer_info d-flex align-items-end">
                  <div className="social_links">
                    <ul>
                      {["facebook", "pinterest", "linkedin", "twitter"].map(
                        (platform, idx) => (
                          <li key={idx}>
                            <a href="#">
                              <i className={`fa fa-${platform}`}></i>
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="info_inner">
                    <h4>Volunteer {index + 1}</h4>
                    <p>Donner</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurVolunteer;
