import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../redux/features/activities/activitiesThunk";
import type { RootState } from "../../redux/store";

import "../../App.css";
import type { Activity } from "../../redux/features/activities/activitiesTypes";

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
    setImageErrors(prev => new Set([...prev, activityId]));
  };

  const shouldShowImage = (activity: Activity) => {
    return (
      activity.mediaUrl && 
      activity.mediaUrl.trim() !== "" && 
      !imageErrors.has(activity.activityId) &&
      (activity.mediaUrl.startsWith('http') || activity.mediaUrl.startsWith('/') || activity.mediaUrl.startsWith('data:'))
    );
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
        <div className="row">
          {activities.map((activity: Activity, index: number) => (
            <div key={activity.activityId || index} className="col-lg-4">
              <div className="single_cause">
                {shouldShowImage(activity) && (
                  <div className="thumb">
                    <img
                      src={activity.mediaUrl}
                      alt={`Cause ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      onError={() => handleImageError(activity.activityId)}
                      onLoad={() => {
                        // Remove from error set if image loads successfully
                        setImageErrors(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(activity.activityId);
                          return newSet;
                        });
                      }}
                    />
                  </div>
                )}
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
                    <span>Raised: $5000.00</span>
                    <span>Goal: $9000.00</span>
                  </div>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                  {/* <Route path="/activities/:id" element={<SingleBlogPage />} /> */}
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
        </div>
      </div>
    </div>
  );
};

export default PopularCauses;
