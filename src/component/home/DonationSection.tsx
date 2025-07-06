import { Link } from "react-router-dom"


const DonationSection = () => {
  return (
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
  )
}

export default DonationSection