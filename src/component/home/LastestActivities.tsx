import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import "react-modal-video/css/modal-video.min.css";
import { FaPlay } from "react-icons/fa"; // ⬅️ Thêm dòng này

import "react-modal-video/css/modal-video.min.css";
import "../../App.css"; // Đảm bảo chứa layout và bạn sẽ thêm flaticon vào
// import flaticonCSS from '../../assets/fonts/flaticon.css'; // nếu bạn có file flaticon

const LastestActivities = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="latest_activites_area">
      <div className="video_bg_1 video_activite d-flex align-items-center justify-content-center">
        <a
          className="popup-video"
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          style={{
            background: "#20c997",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaPlay style={{ color: "#fff", fontSize: "72px", paddingLeft:"15px" }} />
        </a>
      </div>

      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-7">
            <div className="activites_info">
              <div className="section_title">
                <h3>
                  <span>Watch Our Latest</span>
                  <br />
                  Activities
                </h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
                eiusmod tempor incididunt ut labore dolore magna aliqua. enim
                minim veniam, quis nostrud exercitation.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
                eiusmod tempor incididunt ut labore dolore magna aliqua. enim
                minim veniam, quis nostrud exercitation. tempor incididunt ut
                labore dolore magna aliqua. enim minim veniam, quis nostrud
                exercitation.
              </p>
              <Link to="#" className="boxed-btn4">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Video */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="MG3jGHnBVQs"
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default LastestActivities;
