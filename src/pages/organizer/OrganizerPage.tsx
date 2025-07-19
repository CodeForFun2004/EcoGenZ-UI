// src/pages/organizer/OrganizationPage.tsx
import { Container, Col } from "react-bootstrap"
import { CategorySearch } from "../../component/organizer/CategorySearch"
import { AppSidebar } from "../../component/organizer/AppSidebar"
import { PostCard } from "../../component/organizer/PostCard"
import './OrganizationPage.css'; // Đảm bảo import CSS

export default function OrganizationPage() {
  const posts = [
    {
      id: "1",
      organizationName: "وداد",
      organizationAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery.svg?height=40&width=40", // Placeholder for avatar
      timeAgo: "4 Jul",
      postImage: "https://media.istockphoto.com/id/1195024424/photo/group-of-people-cleaning-the-environment.jpg?s=170667a&w=0&k=20&c=vAx-iXRbs4w7h67ZKtzESZajK8DVNALrP6Yrr5LA9bQ=", // The new image URL
      title: "Environment 1",
      hashtag: "#123 #321 #999",
      description: "Nhân kỷ niệm 78 năm ngày Thương binh - Liệt sỹ (27/7/1947 - 27/7/2025), Tổng Bí thư Tô Lâm chiều nay cùng đoàn công tác Trung ương tới thăm, tặng quà thương binh, bệnh binh tại Trung tâm Điều dưỡng thương binh Thuận Thành (phường Ninh Xá, tỉnh Bắc Ninh). Cùng đi có các ủy viên Bộ Chính trị: Bí thư Trung ương Đảng, Trưởng Ban Tổ chức Trung ương Lê Minh Hưng; Đại tướng Phan Văn Giang, Bộ trưởng Quốc phòng; Đại tướng Lương Tam Quang, Bộ trưởng Công an. Ngoài ra còn có Bí thư Trung ương Đảng, Chánh Văn phòng Trung ương Đảng Lê Hoài Trung; Phó Thủ tướng Lê Thành Long và một số ủy viên Trung ương Đảng, lãnh đạo ban, bộ, ngành, cơ quan Trung ương và tỉnh Bắc Ninh.",
      likes: "12.8K",
      comments: 41,
      // reposts: "1.8K", // Removed as it's not in PostCardProps
      shares: 1,
      members: 10,
      status: 'published', // <--- ADD STATUS
      eventDate: '2025-07-20T00:00:00Z' // <--- ADD EVENTDATE (Future date)
    },
    {
      id: "2",
      organizationName: "Sama Elkady",
      organizationAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emeryvg?height=40&width=40",
      timeAgo: "18 Jun",
      postImage: "https://th.bing.com/th/id/R.181a9b0ba853650dececc0ee22643f49?rik=cyNrFFcjhyj92Q&pid=ImgRaw&r=0",
      title: "Environment 2",
      hashtag: "#123 #321 #999",
      description: "Nhân kỷ niệm 78 năm ngày Thương binh - Liệt sỹ (27/7/1947 - 27/7/2025), Tổng Bí thư Tô Lâm chiều nay cùng đoàn công tác Trung ương tới thăm, tặng quà thương binh, bệnh binh tại Trung tâm Điều dưỡng thương binh Thuận Thành (phường Ninh Xá, tỉnh Bắc Ninh). Cùng đi có các ủy viên Bộ Chính trị: Bí thư Trung ương Đảng, Trưởng Ban Tổ chức Trung ương Lê Minh Hưng; Đại tướng Phan Văn Giang, Bộ trưởng Quốc phòng; Đại tướng Lương Tam Quang, Bộ trưởng Công an. Ngoài ra còn có Bí thư Trung ương Đảng, Chánh Văn phòng Trung ương Đảng Lê Hoài Trung; Phó Thủ tướng Lê Thành Long và một số ủy viên Trung ương Đảng, lãnh đạo ban, bộ, ngành, cơ quan Trung ương và tỉnh Bắc Ninh.",
      likes: "5.2K",
      comments: 15,
      // reposts: "0.5K", // Removed
      shares: 2,
      members: 10,
      status: 'published', // <--- ADD STATUS
      eventDate: '2025-08-01T00:00:00Z' // <--- ADD EVENTDATE (Future date)
    },
    {
      id: "3",
      organizationName: "Tech Insights",
      organizationAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery=40&width=40",
      timeAgo: "1w",
      postImage: "https://img.freepik.com/premium-photo/group-elementary-school-students-picking-up-trash-park_441990-9836.jpg",
      title: "Environment 3",
      hashtag: "#123 #321 #999",
      description: "Nhân kỷ niệm 78 năm ngày Thương binh - Liệt sỹ (27/7/1947 - 27/7/2025), Tổng Bí thư Tô Lâm chiều nay cùng đoàn công tác Trung ương tới thăm, tặng quà thương binh, bệnh binh tại Trung tâm Điều dưỡng thương binh Thuận Thành (phường Ninh Xá, tỉnh Bắc Ninh). Cùng đi có các ủy viên Bộ Chính trị: Bí thư Trung ương Đảng, Trưởng Ban Tổ chức Trung ương Lê Minh Hưng; Đại tướng Phan Văn Giang, Bộ trưởng Quốc phòng; Đại tướng Lương Tam Quang, Bộ trưởng Công an. Ngoài ra còn có Bí thư Trung ương Đảng, Chánh Văn phòng Trung ương Đảng Lê Hoài Trung; Phó Thủ tướng Lê Thành Long và một số ủy viên Trung ương Đảng, lãnh đạo ban, bộ, ngành, cơ quan Trung ương và tỉnh Bắc Ninh.",
      likes: "850",
      comments: 12,
      // reposts: "300", // Removed
      shares: 2,
      members: 10,
      status: 'completed', // <--- ADD STATUS
      eventDate: '2024-06-01T00:00:00Z' // <--- ADD EVENTDATE (Past date)
    },
    {
      id: "4",
      organizationName: "Green Future",
      organizationAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Future.svg?height=40&width=40",
      timeAgo: "2 days ago",
      postImage: "https://t4.ftcdn.net/jpg/12/37/19/49/360_F_1237194948_Ny1jpZWDtwXPGR4Xc3q1SKvve3QL4Qld.jpg",
      title: "Urban Farming Workshop",
      hashtag: "#sustainable #urbanfarming",
      description: "Join us for an exciting workshop on urban farming techniques. Learn how to grow your own food in small spaces and contribute to a greener city.",
      likes: "2.1K",
      comments: 25,
      // reposts: "150", // Removed
      shares: 5,
      members: 50,
      status: 'published',
      eventDate: '2025-09-10T10:00:00Z'
    }
  ];

  return (
    <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
      <AppSidebar />
      {/* Leave ms-16 for Col to create spacing with sidebar */}
      <Col className="d-flex flex-column ms-16 flex-grow-1"> {/* Add flex-grow-1 for Col to take remaining space */}
        
        <main className="flex-grow-1 p-4 p-md-6 p-lg-8 overflow-auto">
          {/* Wrap h3 and CategorySearch in a div for alignment */}
          <div className="content-header-area"> {/* Add new class for styling */}
            <h3 className="page-title mb-4">Manage Post</h3> {/* Add class and mb-4 */}
            <CategorySearch />
          </div>
          
          <div className="d-flex flex-column gap-6 w-100 mt-5"> {/* Add mt-5 for spacing with search */}
            {posts.map((post) => (
              <PostCard
                key={post.id}
                organizationName={post.organizationName}
                organizationAvatar={post.organizationAvatar}
                timeAgo={post.timeAgo}
                postImage={post.postImage}
                title={post.title}
                hashtag={post.hashtag}
                description={post.description}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                members={post.members}
                status={post.status.toLowerCase() as 'published' | 'completed'} // <--- PASS STATUS PROP
                eventDate={post.eventDate} // <--- PASS EVENTDATE PROP
              />
            ))}
          </div>
        </main>
      </Col>
    </Container>
  );
}