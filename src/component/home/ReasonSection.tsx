import { Link } from "react-router-dom"
import imgHelp1 from '../../assets/img/help/1.png';
import imgHelp2 from '../../assets/img/help/2.png';
import imgHelp3 from '../../assets/img/help/3.png';

const ReasonSection = () => {
  return (
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
                  <h4>Join Hands. Clean Lands</h4>
                  <p>Be part of environmental actions that matter</p>
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
                  <h4>Act Local, Impact Global</h4>
                  <p>Sign up, show up, and make Earth greener</p>             
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
                  <h4>Green Moves Start with You</h4>
                  <p>Discover and join eco-friendly activities today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ReasonSection