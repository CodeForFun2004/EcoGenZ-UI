import { useState } from "react";
import ModalVideo from "react-modal-video";
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
                  <span>See Our Community in</span>
                  <br />
                  Action
                </h3>
              </div>
              <p>
                Discover the latest environmental projects and challenges completed by the EcoGenZ community around the world. 
              </p>
              <p>
               Press play to see the difference we're making together.
              </p>
              <a 
                href="#!" 
                className="boxed-btn4"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Video */}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="gf-bFVGRsek"
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default LastestActivities;
