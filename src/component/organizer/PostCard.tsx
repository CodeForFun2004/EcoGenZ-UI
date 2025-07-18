import { Heart, MessageCircle, Upload, Users } from "lucide-react"
import { Card, Image, Dropdown } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"
import { DeleteConfirmModal } from './modal/DeleteConfirmModal' // Đảm bảo đường dẫn đúng đến file modal
import { useState } from "react"
// import { Button } from "@mui/material" // Không cần thiết nếu chỉ dùng react-bootstrap Button

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
  }: PostCardProps) {

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false); // State mới để quản lý hiển thị full description

  const DESCRIPTION_LIMIT = 150; // Giới hạn số ký tự hiển thị ban đầu

  // Hàm xử lý khi người dùng click vào "Delete" trong dropdown
  const handleDeleteClick = () => {
    setShowDeleteConfirmModal(true); // Mở modal xác nhận
  };

  // Hàm xử lý khi người dùng xác nhận xóa trong modal
  const handleConfirmDelete = () => {
    console.log("Đã xác nhận xóa bài viết!");
    // TODO: Thực hiện logic xóa bài viết ở đây (ví dụ: gọi API)

    // Đóng modal sau khi xóa thành công
    setShowDeleteConfirmModal(false);
  };

  // Hàm xử lý khi người dùng đóng modal (hủy hoặc click nút X)
  const handleCloseDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  // Kiểm tra xem mô tả có cần cắt bớt hay không
  const isDescriptionTooLong = description.length > DESCRIPTION_LIMIT;
  const displayedDescription = showFullDescription
    ? description
    : description.substring(0, DESCRIPTION_LIMIT);

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
        <p className="text-muted">{hashtag}</p> {/* Đã thêm class text-muted vào đây */}

        {/* Logic hiển thị description */}
        <p className="mb-2"> {/* Thêm mb-2 để tạo khoảng cách với nút hide nếu có */}
          {displayedDescription}
          {isDescriptionTooLong && !showFullDescription && (
            <span
              className="text-primary" // Màu xanh để dễ nhận biết là link
              style={{ cursor: 'pointer', marginLeft: '5px' }}
              onClick={() => setShowFullDescription(true)}
            >
              ...See more
            </span>
          )}
        </p>
        {isDescriptionTooLong && showFullDescription && (
          <small
            className="text-primary d-block mt-1" // d-block để xuống dòng, mt-1 tạo khoảng cách
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
          <div className="d-flex align-items-center me-2">
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
              {/* <MoreHorizontal size={20} /> */}
              <div>Other</div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="d-flex align-items-center">
                <FaEdit className="me-2" />
                Edit
              </Dropdown.Item>
              {/* Thay đổi cách gọi hàm xóa tại đây */}
              <Dropdown.Item
                className="d-flex align-items-center text-danger"
                onClick={handleDeleteClick} // Gọi hàm để mở modal
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
    </Card>
  )
}