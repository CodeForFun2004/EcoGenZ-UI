// PostCard.tsx
import { Heart, MessageCircle, Upload, Users } from "lucide-react"
import { Card, Image, Dropdown } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { DeleteConfirmModal } from './modal/DeleteConfirmModal' // Đảm bảo đường dẫn đúng đến file modal
import { ParticipantModal } from './modal/ParticipantModal'; // <--- IMPORT ParticipantModal
import { useState } from "react"

interface PostCardProps {
  organizationName: string
  organizationAvatar: string
  timeAgo: string
  postImage: string
  title: string
  hashtag: string
  description: string
  likes: string
  comments: number
  shares: number
  members: number
  // <--- THÊM participants VÀO PROPS NẾU DỮ LIỆU ĐƯỢC TRUYỀN TỪ NGOÀI VÀO
  // Nếu không, bạn có thể fetch dữ liệu này bên trong PostCard hoặc ParticipantModal
  participants?: { // Thêm kiểu dữ liệu cho participants
    id: number;
    name: string;
    role: string;
    email: string;
    phone: string;
    avatar: string;
  }[];
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
    participants, // <--- Nhận participants từ props
  }: PostCardProps) {

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(false); // <--- State mới cho ParticipantModal

  const DESCRIPTION_LIMIT = 150;

  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    console.log("Đã xác nhận xóa bài viết!");
    setShowDeleteConfirmModal(false);
  };

  const handleCloseDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  // <--- Hàm xử lý hiển thị ParticipantModal
  const handleShowParticipantModal = () => {
    setShowParticipantModal(true);
  };

  // <--- Hàm xử lý đóng ParticipantModal
  const handleCloseParticipantModal = () => {
    setShowParticipantModal(false);
  };

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

  // Lưu ý: Avatar của Nicholas Gordon đang trỏ đến ảnh bạn đã cung cấp.
  // Các avatar khác là ảnh placeholder từ randomuser.me.

  return (
    <Card className="w-100 mx-auto shadow-sm rounded-lg overflow-hidden border-0 mb-5" style={{ maxWidth: '800px' }}>
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
        </div>

        <Image
          src={postImage} style={{ width: '800px' }}
          fluid
          className="mb-3 rounded"
        />
        <h3>{title}</h3>
        <p className="text-muted">{hashtag}</p>

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
          {/* <--- CẬP NHẬT Users ICON ĐỂ MỞ MODAL */}
          <div className="d-flex align-items-center me-2" style={{ cursor: 'pointer' }} onClick={handleShowParticipantModal}>
            <Users size={16} className="me-1" />
            <span>{members}</span>
          </div>

          {/* Dropdown 3 dots */}
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

      {/* Tích hợp DeleteConfirmModal */}
      <DeleteConfirmModal
        show={showDeleteConfirmModal}
        onHide={handleCloseDeleteConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
      />

      {/* <--- Tích hợp ParticipantModal */}
      <ParticipantModal
        show={showParticipantModal}
        onHide={handleCloseParticipantModal}
        participants={defaultParticipants} // Truyền dữ liệu participants vào modal
      />
    </Card>
  )
}