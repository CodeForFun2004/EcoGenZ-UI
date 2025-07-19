import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../redux/features/activities/activitiesThunk";
import type { RootState } from "../../redux/store";
import Slider from "react-slick";

import "../../App.css";
import "./PopularCauses.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Activity } from "../../redux/features/activities/activitiesTypes";
import footerLogo from "../../assets/img/unnamed (1).png";

const PopularCauses = () => {
  const dispatch = useDispatch();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const {
    activities = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.activities);

  useEffect(() => {
    dispatch(fetchAllActivities() as any);
  }, [dispatch]);

  const handleImageError = (activityId: string) => {
    setImageErrors((prev) => new Set([...prev, activityId]));
  };

  const shouldShowImage = (activity: Activity) => {
    return (
      activity.mediaUrl &&
      activity.mediaUrl.trim() !== "" &&
      !imageErrors.has(activity.activityId) &&
      (activity.mediaUrl.startsWith("http") ||
        activity.mediaUrl.startsWith("/") ||
        activity.mediaUrl.startsWith("data:"))
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="popular_causes_area section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section_title text-center mb-55">
              <h3>
                <span>Popular Activities</span>
              </h3>
            </div>
          </div>
        </div>
        {loading && <p className="text-center">Loading activities...</p>}
        {error && <p className="text-center text-danger">Error: {error}</p>}

        {activities.length > 0 && (
          <Slider {...settings}>
            {activities.map((activity: Activity, index: number) => (
              <div key={activity.activityId || index} className="carousel-card">
                <div className="single_cause">
                  <div className="thumb">
                    {shouldShowImage(activity) ? (
                      <img
                        src={activity.mediaUrl}
                        alt={`Activity ${index + 1}`}
                        onError={() => handleImageError(activity.activityId)}
                        onLoad={() => {
                          setImageErrors((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(activity.activityId);
                            return newSet;
                          });
                        }}
                      />
                    ) : (
                      <img
                        src={footerLogo}
                        alt="EcoGenZ Logo"
                        className="fallback-logo"
                      />
                    )}
                  </div>
                  <div className="causes_content">
                    <div className="custom_progress_bar">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "30%" }}
                          aria-valuenow={30}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <span className="progres_count">30%</span>
                        </div>
                      </div>
                    </div>
                    <div className="balance d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-1">
                        <span>
                          <i className="fa fa-user me-1" aria-hidden="true"></i>
                          {activity.amountOfPeople} |
                        </span>
                        <span>
                          <i
                            className="fa fa-map-marker-alt me-1"
                            aria-hidden="true"
                          ></i>
                          {activity.location}
                        </span>
                      </div>
                      <span>
                        <i
                          className="fa fa-calendar me-1"
                          aria-hidden="true"
                        ></i>
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <Link
                      to={`/activities/${activity.activityId}`}
                      className="read_more"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default PopularCauses;
