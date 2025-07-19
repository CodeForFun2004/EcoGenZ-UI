import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../redux/features/activities/activitiesThunk";
import type { RootState } from "../../redux/store";
import type { Activity } from "../../redux/features/activities/activitiesTypes";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const BlogList = () => {
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
    <div className="col-lg-8 mb-5 mb-lg-0">
      <div className="blog_left_sidebar">
        {activities.map((activity: Activity, index: number) => (
          <article key={activity.activityId} className="blog_item">
            {shouldShowImage(activity) && (
              <div className="blog_item_img">
                <img
                  className="card-img rounded-0"
                  src={activity.mediaUrl}
                  alt={`Blog ${index + 1}`}
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
                <a className="blog_item_date">
                  <h3>{new Date(activity.date).getDate()}</h3>
                  <p>
                    {new Date(activity.date).toLocaleString("en-US", {
                      month: "short",
                    })}
                  </p>
                </a>
              </div>
            )}
            <div className="blog_details d-flex justify-content-between align-items-start">
              <div style={{ flex: 1 }}>
                <h2>{activity.title}</h2>
                <p>{activity.description}</p>
                <ul className="blog-info-link">
                  <li>
                    <a href="#">
                      <i className="fa fa-user"></i> {activity.amountOfPeople}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-regular fa-location-dot"></i>
                      {activity.location}
                    </a>
                  </li>
                </ul>
              </div>
              <Link
                to={`/activities/${activity.activityId}`}
                className="d-inline-block"
              >
                <button
                  className="btn ms-3"
                  style={{
                    backgroundColor: "#3CC78F",
                    whiteSpace: "nowrap",
                    height: "fit-content",
                    color: "#fff",
                  }}
                >
                  View Detail Activity
                </button>
              </Link>
            </div>
          </article>
        ))}

        <nav className="blog-pagination justify-content-center d-flex">
          <ul className="pagination flex">
            <li className="page-item">
              <a href="#" className="page-link group" aria-label="Previous">
                <ChevronLeftIcon className="w-5 h-5 mb-1 text-gray-500 group-hover:text-[#3CC78F]" />
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                1
              </a>
            </li>
            <li className="page-item active">
              <a href="#" className="page-link">
                2
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link group" aria-label="Next">
                <ChevronRightIcon className="w-5 h-5 mb-1 text-gray-500 group-hover:text-[#3CC78F] transition-colors duration-200" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BlogList;
