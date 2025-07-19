import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  fetchActivityById,
  registerActivities,
} from "../../redux/features/activities/activitiesThunk";
import ConfirmModal from "../ConfirmModal/ConfirmModalProps";

const SingleBlog = () => {
  const { id } = useParams();
  console.log("SingleBlog id:", id);
  const dispatch = useDispatch<AppDispatch>();
  const activity = useSelector((state: RootState) =>
    state.activities.selectedActivity?.activityId === id
      ? state.activities.selectedActivity
      : null
  );
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const shouldShowImage = (activity: any) => {
    return (
      activity?.mediaUrl && 
      activity.mediaUrl.trim() !== "" && 
      !imageError &&
      (activity.mediaUrl.startsWith('http') || activity.mediaUrl.startsWith('/') || activity.mediaUrl.startsWith('data:'))
    );
  };

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    const userId = localStorage.getItem("userId");
    if (!userId || !id) return;

    try {
      const message = await dispatch(
        registerActivities({ activityId: id, userId })
      ).unwrap();
      if (message === "User already registered.") {
        setApplied(true);
        setAlreadyApplied(true);
      } else if (message === "Registered successfully.") {
        setApplied(true);
        setAlreadyApplied(false);
      }
      setShowThanks(true);
      // setTimeout(() => setShowThanks(false), 7000);
      dispatch(fetchActivityById(id));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (id) dispatch(fetchActivityById(id));
  }, [dispatch, id]);

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <div className="single-post">
      {shouldShowImage(activity) && (
        <div className="feature-img">
          <img
            className="img-fluid"
            src={activity.mediaUrl}
            alt=""
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        </div>
      )}
      <div className="blog_details d-flex justify-content-between align-items-start">
        <div style={{ flex: 1 }}>
          <h2>{activity.title}</h2>
          <ul className="blog-info-link mt-3 mb-4">
            <li>
              <a>
                <i className="fa fa-user"></i> {activity.amountOfPeople} people
              </a>
            </li>
            <li>
              <a>
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

        <div className=" ms-3">
          <button
            className="btn"
            style={{
              backgroundColor: "#3CC78F",
              whiteSpace: "nowrap",
              height: "fit-content",
              color: "#fff",
            }}
            onClick={handleApplyClick}
            disabled={applied}
          >
            {applied ? "You have applied" : "Apply for Activity"}
          </button>
          {showThanks && (
            <div className="popup-notification">
              {alreadyApplied
                ? "⚠️ You have already applied for this activity before."
                : "✅ Thanks for registering! We'll contact you soon."}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        show={showModal}
        message="Are you sure you want to apply?"
        onConfirm={handleConfirm}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SingleBlog;
