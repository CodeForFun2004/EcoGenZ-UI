import { Link } from "react-router-dom"


const SliderSection = () => {
  return (
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
                  <Link to="/about-page" className="boxed-btn3">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SliderSection