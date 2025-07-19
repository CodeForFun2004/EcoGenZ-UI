
// PostCard.tsx
import { Heart, MessageCircle, Upload, Users } from "lucide-react";
import { Card, Image, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { DeleteConfirmModal } from "./modal/DeleteConfirmModal";
import { ParticipantModal } from "./modal/ParticipantModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteActivity } from "../../redux/features/organizerActivities/organizerActivitiesThunk";
import type { AppDispatch } from "../../redux/store";


// Định nghĩa props cho PostCard
interface PostCardProps {
  organizationName: string;
  organizationAvatar: string;
  timeAgo: string;
  postImage: string;
  title: string;
  hashtag: string;
  description: string;
  likes: string;
  comments: number;
  shares: number;
  members: number;

  activityId?: string;
  isApproved?: boolean;
  activityDate?: string;
  participants?: {

    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar: string;
  }[];
  status: 'published' | 'completed'; // Trạng thái bài đăng
  eventDate: string; // Ngày diễn ra sự kiện (để xác định trạng thái 'completed' đã qua)
}


export function PostCard({
  organizationName,
  organizationAvatar,
  timeAgo,
  postImage,
  title,
  hashtag,
  description,
  likes,
  comments,
  shares,
  members,
  activityId,
  activityDate,
}: PostCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  const DESCRIPTION_LIMIT = 150; // Giới hạn số ký tự hiển thị ban đầu cho mô tả

  // Hàm xử lý khi người dùng click vào "Delete" trong dropdown
  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true); // Mở modal xác nhận xóa
  };


  const handleConfirmDelete = async () => {
    if (activityId) {
      try {
        await dispatch(deleteActivity(activityId)).unwrap();
        console.log("Activity deleted successfully!");
      } catch (error) {
        console.error("Failed to delete activity:", error);
      }
    }
    setShowDeleteConfirmModal(false);

  };

  // Hàm xử lý khi người dùng đóng modal xác nhận xóa
  const handleCloseDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };


  const handleShowParticipantModal = () => {
    setShowParticipantModal(true);
  };


  const handleCloseParticipantModal = () => {
    setShowParticipantModal(false);
  };


  const handleEditClick = () => {
    // TODO: Implement edit functionality
    console.log("Edit activity:", activityId);
  };

  // Helper function để xác định trạng thái hoạt động
  const getActivityStatus = () => {
    if (!activityDate) return null;

    const activityDateTime = new Date(activityDate);
    const now = new Date();

    // So sánh ngày (bỏ qua giờ phút giây)
    const activityDateOnly = new Date(
      activityDateTime.getFullYear(),
      activityDateTime.getMonth(),
      activityDateTime.getDate()
    );
    const todayOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    if (activityDateOnly < todayOnly) {
      return { status: "Finished", className: "bg-secondary" };
    } else if (activityDateOnly.getTime() === todayOnly.getTime()) {
      return { status: "Today", className: "bg-warning text-dark" };
    } else {
      return { status: "Upcoming", className: "bg-info text-dark" };
    }
  };


  const isDescriptionTooLong = description.length > DESCRIPTION_LIMIT;
  const displayedDescription = showFullDescription
    ? description
    : description.substring(0, DESCRIPTION_LIMIT);


  return (
    <Card
      className="w-100 mx-auto shadow-sm rounded-lg overflow-hidden border-0 mb-5"
      style={{ maxWidth: "800px" }}
    >
      <Card.Body className="px-4 pt-3 pb-4">
        {/* Avatar, Name, and Time Ago */}

        <div className="d-flex align-items-center mb-3">
          <Image
            src={organizationAvatar}
            alt={organizationName}
            roundedCircle
            width={40}
            height={40}
            className="me-2"
          />
          <div>
            <h6 className="mb-0">{organizationName}</h6>
            <small className="text-muted">{timeAgo}</small>
          </div>
          {/* {isApproved !== undefined && (
            <div className="ms-auto">
              <span
              className={`badge ${
                isApproved ? "bg-success" : "bg-warning text-dark"
              }`}
              >
              {isApproved ? "Approved" : "Pending"}
              </span>
            </div>
            )} */}
          {/* Hiển thị trạng thái hoạt động */}
          {activityId &&
            (() => {
              const status = getActivityStatus();
              return status ? (
                <div className="ms-auto">
                  <span className={`badge ${status.className}`}>
                    {status.status}
                  </span>
                </div>
              ) : null;
            })()}
        </div>

        {/* Hình ảnh bài đăng */}
        <Image
          src={postImage}
          style={{ width: "800px" }}
          fluid
          className="mb-3 rounded"
        />
        {/* Tiêu đề bài đăng */}
        <h3>{title}</h3>
        {/* Hashtag */}
        <p className="text-muted">{hashtag}</p>

        {/* Mô tả bài đăng với logic "See more"/"Hide" */}
        <p className="mb-2">
          {displayedDescription}
          {isDescriptionTooLong && !showFullDescription && (
            <span
              className="text-primary"
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={() => setShowFullDescription(true)}
            >
              ...See more
            </span>
          )}
        </p>
        {isDescriptionTooLong && showFullDescription && (
          <small
            className="text-primary d-block mt-1"
            style={{ cursor: "pointer" }}
            onClick={() => setShowFullDescription(false)}
          >
            Hide
          </small>
        )}

        {/* Các thống kê tương tác (Likes, Comments, Shares, Members) */}
        <div className="d-flex justify-content-around text-muted mt-2 align-items-center">
          <div className="d-flex align-items-center me-2">
            <Heart size={16} className="me-1" />
            <span>{likes}</span>
          </div>
          <div className="d-flex align-items-center me-2">
            <MessageCircle size={16} className="me-1" />
            <span>{comments}</span>
          </div>
          <div className="d-flex align-items-center me-2">
            <Upload size={16} className="me-1" />
            <span>{shares}</span>
          </div>

          <div
            className="d-flex align-items-center me-2"
            style={{ cursor: "pointer" }}
            onClick={handleShowParticipantModal}
          >

            <Users size={16} className="me-1" />
            <span>{members}</span>
          </div>

          {/* Dropdown "Other" với tùy chọn Edit/Delete */}
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="p-0 border-0 bg-transparent d-flex align-items-center"
            >
              <div>Other</div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                className="d-flex align-items-center"
                onClick={handleEditClick}
              >
                <FaEdit className="me-2" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="d-flex align-items-center text-danger"
                onClick={handleDeleteClick}
              >
                <FaTrash className="me-2" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>

      {/* Modal xác nhận xóa bài đăng */}
      <DeleteConfirmModal
        show={showDeleteConfirmModal}
        onHide={handleCloseDeleteConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
      />


      {/* Tích hợp ParticipantModal */}
      <ParticipantModal
        show={showParticipantModal}
        onHide={handleCloseParticipantModal}
        activityId={activityId}
        activityDate={activityDate}
      />
    </Card>
  );

}
