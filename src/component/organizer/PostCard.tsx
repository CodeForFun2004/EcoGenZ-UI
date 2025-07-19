// src/component/organizer/PostCard.tsx
import { Heart, MessageCircle, Upload, Users } from "lucide-react"
import { Card, Image, Dropdown } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { DeleteConfirmModal } from './modal/DeleteConfirmModal' // Đảm bảo đường dẫn đúng đến file modal
import { ParticipantModal } from './modal/ParticipantModal'; // Import ParticipantModal
import { useState } from "react"

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
  participants?: { // Danh sách người tham gia (tùy chọn)
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

export function PostCard(
  {
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
    participants,
    status,
    eventDate,
  }: PostCardProps) {

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false);

  const DESCRIPTION_LIMIT = 150; // Giới hạn số ký tự hiển thị ban đầu cho mô tả

  // Hàm xử lý khi người dùng click vào "Delete" trong dropdown
  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true); // Mở modal xác nhận xóa
  };

  // Hàm xử lý khi người dùng xác nhận xóa trong modal
  const handleConfirmDelete = () => {
    console.log("Đã xác nhận xóa bài viết!");
    // TODO: Thực hiện logic xóa bài viết ở đây (ví dụ: gọi API)
    setShowDeleteConfirmModal(false); // Đóng modal sau khi xóa thành công
  };

  // Hàm xử lý khi người dùng đóng modal xác nhận xóa
  const handleCloseDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  // Hàm xử lý hiển thị ParticipantModal
  const handleShowParticipantModal = () => {
    setShowParticipantModal(true);
  };

  // Hàm xử lý đóng ParticipantModal
  const handleCloseParticipantModal = () => {
    setShowParticipantModal(false);
  };

  // Kiểm tra xem mô tả có cần cắt bớt hay không và hiển thị phần mô tả
  const isDescriptionTooLong = description.length > DESCRIPTION_LIMIT;
  const displayedDescription = showFullDescription
    ? description
    : description.substring(0, DESCRIPTION_LIMIT);

  // Dữ liệu mock cho participants nếu không có từ props
  const defaultParticipants = participants || [
    { id: 1, name: "Nicholas Gordon", role: "Developer", email: "ernest.mason@gmail.com", phone: "561-303-6106", avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Brians" },
    { id: 2, name: "Bradley Malone", role: "Manager", email: "bradley.m@gmail.com", phone: "242-576-7666", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 3, name: "Janie Todd", role: "Designer", email: "stroman.hanna@yahoo.com", phone: "467-624-8505", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 4, name: "Marvin Lambert", role: "Developer", email: "micaela.okuneva@zemlak.biz", phone: "716-937-5782", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
    { id: 5, name: "Teresa Lloyd", role: "Designer", email: "carlee_erdman@gmail.com", phone: "496-144-8261", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  // Logic để xác định nếu bài đăng đã hoàn thành và ngày sự kiện đã qua
  const isCompletedAndPast = status === 'completed' && new Date(eventDate) < new Date();

  return (
    <Card 
      // Áp dụng class 'post-completed' nếu bài đăng đã hoàn thành và ngày sự kiện đã qua
      className={`w-100 mx-auto shadow-sm rounded-lg overflow-hidden border-0 mb-5 ${isCompletedAndPast ? 'post-completed' : ''}`} 
      style={{ maxWidth: '800px' }}
    >
      <Card.Body className="px-4 pt-3 pb-4 position-relative"> {/* Thêm position-relative để position badge */}
        {/* Status Badge ở góc trên bên phải của card */}
        <div className="post-status-badge">
          <span className={`badge bg-${
            status === 'published' ? 'success' : // Màu xanh lá cây cho Published
            status === 'completed' ? 'info' : // Màu xanh nhạt cho Completed
            ''
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)} {/* Hiển thị trạng thái với chữ cái đầu viết hoa */}
          </span>
        </div>

        {/* Avatar tổ chức, Tên tổ chức và Thời gian đăng */}
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
        </div>

        {/* Hình ảnh bài đăng */}
        <Image
          src={postImage} style={{ width: '800px' }}
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
              style={{ cursor: 'pointer', marginLeft: '5px' }}
              onClick={() => setShowFullDescription(true)}
            >
              ...See more
            </span>
          )}
        </p>
        {isDescriptionTooLong && showFullDescription && (
          <small
            className="text-primary d-block mt-1"
            style={{ cursor: 'pointer' }}
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
          {/* Icon Users để mở ParticipantModal */}
          <div className="d-flex align-items-center me-2" style={{ cursor: 'pointer' }} onClick={handleShowParticipantModal}>
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
              <Dropdown.Item className="d-flex align-items-center">
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

      {/* Modal hiển thị danh sách người tham gia */}
      <ParticipantModal
        show={showParticipantModal}
        onHide={handleCloseParticipantModal}
        participants={defaultParticipants}
      />
    </Card>
  )
}
