import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchActivityById } from "../../redux/features/activities/activitiesThunk";
import singleBlog1 from "../../assets/img/blog/single_blog_1.png";

const SingleBlog = () => {
  const { id } = useParams();
  console.log("SingleBlog id:", id);
  const dispatch = useDispatch<AppDispatch>();

  const activity = useSelector((state: RootState) =>
    state.activities.selectedActivity?.activityId === id
      ? state.activities.selectedActivity
      : null
  );

  useEffect(() => {
    if (id) dispatch(fetchActivityById(id));
  }, [dispatch, id]);

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <div className="single-post">
      <div className="feature-img">
        <img
          className="img-fluid"
          src={activity.mediaUrl || singleBlog1}
          alt=""
        />
      </div>
      <div className="blog_details">
        <h2>{activity.title}</h2>
        <ul className="blog-info-link mt-3 mb-4">
          <li>
            <a href="#">
              <i className="fa fa-user"></i> {activity.amountOfPeople} people
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-map-marker-alt"></i> {activity.location}
            </a>
          </li>
        </ul>
        <p className="excert">{activity.description}</p>
        <p>
          This event is scheduled for{" "}
          <strong>{new Date(activity.date).toLocaleString()}</strong>.
        </p>
      </div>
    </div>
  );
};

export default SingleBlog;
