import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getuserWithPoint } from "../../redux/features/auth/authThunk";
import { truncateUsername } from "../../utils/textUtils";

const OurVolunteer = () => {
  const dispatch = useAppDispatch();
  const { userList, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getuserWithPoint());
  }, [dispatch]);

  return (
    <div className="our_volunteer_area section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section_title text-center mb-55">
              <h3>
                <span>Our Volunteers</span>
              </h3>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? (
            <p>Loading...</p>
          ) : userList.length === 0 ? (
            <p>No volunteers found.</p>
          ) : (
            userList.slice(0, 3).map((user, index) => (
              <div key={user.userId || index} className="col-lg-4 col-md-6">
                <div className="single_volenteer">
                  <div className="volenteer_thumb">
                    <img
                      src={user.profilePhotoUrl || "/default-profile.png"}
                      alt={user.userName}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
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
                      <h4 title={user.userName}>{truncateUsername(user.userName, 16)}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OurVolunteer;
