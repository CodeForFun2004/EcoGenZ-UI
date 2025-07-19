// src/components/BlogList.tsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActivities } from "../../redux/features/activities/activitiesThunk";
import type { RootState } from "../../redux/store";
import type { Activity } from "../../redux/features/activities/activitiesTypes";
import Pagination from "../common/Pagination";

const BlogList = () => {
  const dispatch = useDispatch();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { activities = [] } = useSelector(
    (state: RootState) => state.activities
  );

  useEffect(() => {
    dispatch(fetchAllActivities() as any);
  }, [dispatch]);

  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = activities.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  return (
    <div className="col-lg-8 mb-5 mb-lg-0">
      <div className="blog_left_sidebar">
        {currentItems.map((activity: Activity, index: number) => (
          <article key={activity.activityId} className="blog_item">
            {shouldShowImage(activity) && (
              <div className="blog_item_img">
                <img
                  className="card-img rounded-0"
                  src={activity.mediaUrl}
                  alt={`Blog ${index + 1}`}
                  onError={() => handleImageError(activity.activityId)}
                  onLoad={() => {
                    setImageErrors((prev) => {
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
                      <i className="fa-regular fa-location-dot"></i>{" "}
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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default BlogList;
