import { Container, Col, Row, Card, Button } from "react-bootstrap"; // Removed ProgressBar
// Import AppSidebar (đảm bảo đường dẫn đúng)
import { AppSidebar } from "../../component/organizer/AppSidebar";
// Import các icon cần thiết từ lucide-react
import { Users, FileText, Clock, CalendarDays, Award, Plus } from "lucide-react"; 
import { useState, useEffect } from "react";

import { ModalUpPost } from "../../component/organizer/modal/UpPostModal"; // Import ModalUpPost
import './DashboardPage.css'; // Import CSS cho dashboard

// Định nghĩa interface cho dữ liệu thống kê dashboard
interface DashboardStats {
  totalPosts: number;
  totalParticipants: number;
  pendingParticipants: number;
  completedActivities: number;
}

// Định nghĩa interface cho một hoạt động
interface Activity {
  id: string;
  name: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participantsCount: number;
}

// Định nghĩa interface cho một bài đăng gần đây
interface RecentPost {
  id: string;
  title: string;
  date: string;
  status: 'published' | 'draft';
}

// Dữ liệu mock cho thống kê dashboard
const mockDashboardData: DashboardStats = {
  totalPosts: 120,
  totalParticipants: 850,
  pendingParticipants: 45,
  completedActivities: 75,
};

// Dữ liệu mock cho các hoạt động sắp tới
const mockUpcomingActivities: Activity[] = [
  { id: 'UA001', name: 'Beach Cleanup Da Nang', date: '2025-08-01', status: 'upcoming', participantsCount: 150 },
  { id: 'UA002', name: 'Tree Planting Son Tra', date: '2025-08-10', status: 'upcoming', participantsCount: 80 },
  { id: 'UA003', name: 'River Restoration Project', date: '2025-08-25', status: 'upcoming', participantsCount: 200 },
];

// Dữ liệu mock cho các bài đăng gần đây
const mockRecentPosts: RecentPost[] = [
  { id: 'RP001', title: 'New initiative for urban greening', date: '2025-07-15', status: 'published' },
  { id: 'RP002', title: 'Call for volunteers: Mountain Cleanup', date: '2025-07-12', status: 'published' },
  { id: 'RP003', title: 'Draft: Recycling awareness campaign', date: '2025-07-10', status: 'draft' },
];

// Import CSS cho dashboard (đảm bảo đường dẫn đúng)
import './DashboardPage.css'; 

const DashBoardPage = () => {
  // State để lưu trữ dữ liệu thống kê
  const [stats, setStats] = useState<DashboardStats | null>(null);
  // State để lưu trữ danh sách hoạt động sắp tới
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([]);
  // State để lưu trữ danh sách bài đăng gần đây
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  // State để quản lý trạng thái loading dữ liệu
  const [loading, setLoading] = useState(true);

  // useEffect để mô phỏng việc fetch dữ liệu khi component mount
  useEffect(() => {
    // Giả lập độ trễ khi fetch data
    setTimeout(() => {
      setStats(mockDashboardData);
      setUpcomingActivities(mockUpcomingActivities);
      setRecentPosts(mockRecentPosts);
      setLoading(false); // Kết thúc loading
    }, 1000); // Giả lập 1 giây delay
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được mount

    // State để quản lý việc hiển thị/ẩn ModalUpPost
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
      {/* Sidebar của ứng dụng */}
      <AppSidebar />
      {/* Cột chính chứa nội dung dashboard */}
      <Col className="d-flex flex-column ms-16 " style={{marginLeft: '80px'}}>
        <main className="flex-grow-1 p-4 p-md-6 p-lg-8 overflow-auto">
          {/* Khu vực tiêu đề trang dashboard */}
          <div className="content-header-area">
            <h2 className="page-title mb-4">Dashboard</h2>
          </div>

          {/* Hiển thị spinner loading nếu dữ liệu đang được tải */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Hàng chứa các thẻ tóm tắt thống kê */}
              <Row className="mb-5 g-4 dashboard-cards-row"> {/* g-4 để tạo khoảng cách giữa các cột */}
                {/* Thẻ Tổng số bài đăng */}
                <Col md={6} lg={3}>
                  <Card className="shadow-sm border-0 dashboard-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="dashboard-icon-wrapper bg-success-light me-3">
                        <FileText size={28} className="text-success" />
                      </div>
                      <div>
                        <h5 className="mb-0 text-muted">Total Posts</h5>
                        <h3 className="mb-0 text-dark">{stats?.totalPosts.toLocaleString()}</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Thẻ Tổng số người tham gia */}
                <Col md={6} lg={3}>
                  <Card className="shadow-sm border-0 dashboard-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="dashboard-icon-wrapper bg-info-light me-3">
                        <Users size={28} className="text-info" />
                      </div>
                      <div>
                        <h5 className="mb-0 text-muted">Total Participants</h5>
                        <h3 className="mb-0 text-dark">{stats?.totalParticipants.toLocaleString()}</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Thẻ Người tham gia đang chờ duyệt */}
                <Col md={6} lg={3}>
                  <Card className="shadow-sm border-0 dashboard-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="dashboard-icon-wrapper bg-warning-light me-3">
                        <Clock size={28} className="text-warning" />
                      </div>
                      <div>
                        <h5 className="mb-0 text-muted">Pending Participants</h5>
                        <h3 className="mb-0 text-dark">{stats?.pendingParticipants.toLocaleString()}</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Thẻ Hoạt động đã hoàn thành */}
                <Col md={6} lg={3}>
                  <Card className="shadow-sm border-0 dashboard-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="dashboard-icon-wrapper bg-primary-light me-3">
                        <Award size={28} className="text-primary" />
                      </div>
                      <div>
                        <h5 className="mb-0 text-muted">Completed Activities</h5>
                        <h3 className="mb-0 text-dark">{stats?.completedActivities.toLocaleString()}</h3>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Hàng chứa các phần Bài đăng gần đây và Hoạt động sắp tới */}
              <Row className="g-4">
                {/* Cột Bài đăng gần đây */}
                <Col lg={6}>
                  <Card className="shadow-sm border-0">
                    <Card.Header className="bg-white border-bottom py-3">
                      <h5 className="mb-0 text-success">Recent Posts</h5>
                    </Card.Header>
                    <Card.Body>
                      {recentPosts.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {recentPosts.map(post => (
                            <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-0">{post.title}</h6>
                                <small className="text-muted">{new Date(post.date).toLocaleDateString()}</small>
                              </div>
                              <span className={`badge bg-${post.status === 'published' ? 'success' : 'secondary'}`}>
                                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted text-center">No recent posts.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                {/* Cột Hoạt động sắp tới */}
                <Col lg={6}>
                  <Card className="shadow-sm border-0">
                    <Card.Header className="bg-white border-bottom py-3">
                      <h5 className="mb-0 text-success">Upcoming Activities</h5>
                    </Card.Header>
                    <Card.Body>
                      {upcomingActivities.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {upcomingActivities.map(activity => (
                            <li key={activity.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-0">{activity.name}</h6>
                                <small className="text-muted">
                                  <CalendarDays size={14} className="me-1" />
                                  {new Date(activity.date).toLocaleDateString()}
                                </small>
                              </div>
                              <span className="badge bg-info">
                                {activity.participantsCount.toLocaleString()} Participants
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted text-center">No upcoming activities.</p>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Phần Hành động nhanh */}
              <Row className="mt-5">
                <Col>
                  <Card className="shadow-sm border-0">
                    <Card.Body className="text-center">
                      <h5 className="mb-3 text-success">Quick Actions</h5>
                      <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Button variant="success" className="dashboard-action-btn"  onClick={handleShowModal}>
                          <Plus size={20} className="me-2" /> Create New Post
                        </Button>
                        <Button variant="outline-primary" className="dashboard-action-btn">
                          <Users size={20} className="me-2" /> View All Participants
                        </Button>
                        <Button variant="outline-info" className="dashboard-action-btn">
                          <Award size={20} className="me-2" /> Manage Certificates
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </main>
      </Col>
      {/* Modal UpPost được render ở đây, quản lý bởi state showModal */}
            <ModalUpPost show={showModal} handleClose={() => setShowModal(false)} />
    </Container>
  );
};

export default DashBoardPage;
