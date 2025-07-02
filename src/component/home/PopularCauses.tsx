import { Link } from 'react-router-dom';
import img1 from '../../assets/img/causes/1.png';
import img2 from '../../assets/img/causes/2.png';
import img3 from '../../assets/img/causes/3.png';

import "../../App.css"; 


const imageList = [img1, img2, img3];

const PopularCauses = () => {
  return (
    <div className="popular_causes_area section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section_title text-center mb-55">
              <h3><span>Popular Causes</span></h3>
            </div>
          </div>
        </div>
        <div className="row">
          {imageList.map((img, index) => (
            <div key={index} className="col-lg-4">
              <div className="single_cause">
                <div className="thumb">
                  <img src={img} alt={`Cause ${index + 1}`} />
                </div>
                <div className="causes_content">
                  <div className="custom_progress_bar">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: '30%' }}
                        aria-valuenow={30}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <span className="progres_count">30%</span>
                      </div>
                    </div>
                  </div>
                  <div className="balance d-flex justify-content-between align-items-center">
                    <span>Raised: $5000.00</span>
                    <span>Goal: $9000.00</span>
                  </div>
                  <h4>Cause Title {index + 1}</h4>
                  <p>The passage is attributed to an unknown typesetter in the century who is thought</p>
                  <Link to="/cause_details" className="read_more">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCauses;
