import HomeIcon from "@mui/icons-material/Home";
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';


const ContactSection = () => {
  return (
    <section className="contact-section">
    <div className="container">
      <div className="mb-5 pb-4" style={{ height: "480px" }}>
        <div
          id="map"
          style={{ height: "100%", width: "100%", backgroundColor: "#ddd" }}
        >
          Google Map Placeholder
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h2 className="contact-title">Get in Touch</h2>
        </div>
        <div className="col-lg-8">
          <form className="form-contact contact_form" id="contactForm">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <textarea
                    className="form-control w-100"
                    name="message"
                    cols={30}
                    rows={9}
                    placeholder="Enter Message"
                  ></textarea>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    className="form-control valid"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    className="form-control valid"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    name="subject"
                    type="text"
                    placeholder="Enter Subject"
                  />
                </div>
              </div>
            </div>
            <div className="form-group mt-3">
              <button
                type="submit"
                className="button button-contactForm boxed-btn"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-3 offset-lg-1">
          <div className="contact-info d-flex align-items-center">
            {/* <span className="contact-info__icon"><i className="ti-home"></i></span> */}
            <span className="contact-info__icon d-flex align-items-center justify-content-center mb-3">
            <HomeIcon fontSize="inherit" style={{ fontSize: 45 }} />
            </span>
            <div className="media-body">
              <h3>Buttonwood, California.</h3>
              <p>Rosemead, CA 91770</p>
            </div>
          </div>
          <div className="contact-info d-flex align-items-center">
          <span className="contact-info__icon d-flex align-items-center justify-content-center mb-3">
            <TabletAndroidIcon fontSize="inherit" style={{ fontSize: 45 }} />
            </span>
            <div className="media-body">
              <h3>+1 253 565 2365</h3>
              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>
          <div className="contact-info d-flex align-items-center">
          <span className="contact-info__icon d-flex align-items-center justify-content-center mb-3">
            <MarkEmailReadIcon fontSize="inherit" style={{ fontSize: 45 }} />
            </span>
            <div className="media-body">
              <h3>support@colorlib.com</h3>
              <p>Send us your query anytime!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ContactSection