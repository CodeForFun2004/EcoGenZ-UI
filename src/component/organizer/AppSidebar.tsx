// src/components/layout/AppSidebar.tsx
import { useState } from "react";
// Import tất cả các icon cần thiết từ lucide-react
import { Home, FileText, Users, Bell, Search, Plus, LogOut } from "lucide-react";
import { Nav } from "react-bootstrap";
// Đảm bảo đường dẫn đúng tới ModalUpPost của bạn
import { ModalUpPost } from "./modal/UpPostModal"; 
// Import Link và useLocation từ react-router-dom để xử lý điều hướng và trạng thái active
import { Link, useLocation } from "react-router-dom";
// Import CSS tùy chỉnh cho sidebar
import './AppSidebar.css'; 

export function AppSidebar() {
  // State để quản lý việc hiển thị/ẩn ModalUpPost
  const [showModal, setShowModal] = useState(false);
  // Hook useLocation để lấy thông tin về đường dẫn URL hiện tại
  const location = useLocation(); 

  // Hàm xử lý khi click vào icon Plus để mở ModalUpPost
  const handleShowModal = () => setShowModal(true);

  // Hàm kiểm tra xem đường dẫn hiện tại có khớp với path của icon không
  // Dùng để áp dụng class 'active' cho icon tương ứng
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Hàm xử lý logic đăng xuất
  const handleLogout = () => {
    // TODO: Thực hiện logic logout ở đây (ví dụ: xóa token, chuyển hướng về trang đăng nhập)
    console.log("User logged out!");
    // Ví dụ: navigate('/login'); // Nếu bạn có history/navigate object từ useHistory/useNavigate
    alert("Logged out!"); // Thông báo tạm thời để minh họa
  };

  return (
    <>
     <aside
        className="position-fixed top-0 start-0 bg-white border-end d-flex flex-column align-items-center py-4 shadow-sm"
        style={{ width: "80px", height: "100vh", zIndex: 1050 }}
      >
        <Nav className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
          {/* Link Home */}
          <Link 
            className={`mb-4 nav-icon-item ${isActive('/organizer-dashboard') ? 'active' : ''}`} 
            to='/organizer-dashboard'
          >
            <Home size={24} />
            <span className="sr-only">Home</span>
          </Link>
          {/* Link Posts: Thay LayoutGrid bằng FileText */}
          <Link 
            className={`mb-4 nav-icon-item ${isActive('/organizer-post') ? 'active' : ''}`} 
            to='/organizer-post'
          >
            <FileText size={24} /> {/* <--- THAY ICON TẠI ĐÂY */}
            <span className="sr-only">Posts</span>
          </Link>
          {/* Link Participants: Thay MessageCircle bằng Users */}
          <Link 
            className={`mb-4 nav-icon-item ${isActive('/approve-participant') ? 'active' : ''}`} 
            to="/approve-participant"
          >
            <Users size={24} /> {/* <--- THAY ICON TẠI ĐÂY */}
            <span className="sr-only">Participants</span>
          </Link>
          {/* Link Notifications */}
          <Link 
            className={`mb-4 nav-icon-item ${isActive('/notifications') ? 'active' : ''}`} 
            to="/notifications" 
          >
            <Bell size={24} />
            <span className="sr-only">Notifications</span>
          </Link>
          {/* Link Search */}
          <Link 
            className={`mb-4 nav-icon-item ${isActive('/search') ? 'active' : ''}`} 
            to="/search" 
          >
            <Search size={24} />
            <span className="sr-only">Search</span>
          </Link>

          {/* Icon Plus */}
          <div
            className="mb-4 plus-icon-button" 
            onClick={handleShowModal} 
          >
            <Plus size={24} />
            <span className="sr-only">Add New Post</span>
          </div>

        </Nav>

        {/* Icon Logout */}
        <div 
          className="mt-auto mb-4 logout-icon-button" 
          onClick={handleLogout}
        >
          <LogOut size={24} />
          <span className="sr-only">Logout</span>
        </div>
      </aside>

      {/* Modal UpPost được render ở đây, quản lý bởi state showModal */}
      <ModalUpPost show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}