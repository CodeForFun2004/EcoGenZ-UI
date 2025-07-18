"use client"

import { AppSidebar } from "../../component/organizer/AppSidebar"
import { PageHeader } from "../../component/organizer/PageHeader"
import { CategorySearch } from "../../component/organizer/CategorySearch"
import { PostCard } from "../../component/organizer/PostCard"
import { Container, Col } from "react-bootstrap"

export default function OrganizationPage() {
  const posts = [
    {
      id: "1",
      organizationName: "وداد",
      organizationAvatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery.svg?height=40&width=40", // Placeholder for avatar
      timeAgo: "4 Jul",
      postImage: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1IsNDV.img?w=1080&h=607&m=4&q=91", // The new image URL
      title: "Environment 1",
      hashtag: "#123 #321 #999",
      description: "Nhân kỷ niệm 78 năm ngày Thương binh - Liệt sỹ (27/7/1947 - 27/7/2025), Tổng Bí thư Tô Lâm chiều nay cùng đoàn công tác Trung ương tới thăm, tặng quà thương binh, bệnh binh tại Trung tâm Điều dưỡng thương binh Thuận Thành (phường Ninh Xá, tỉnh Bắc Ninh). Cùng đi có các ủy viên Bộ Chính trị: Bí thư Trung ương Đảng, Trưởng Ban Tổ chức Trung ương Lê Minh Hưng; Đại tướng Phan Văn Giang, Bộ trưởng Quốc phòng; Đại tướng Lương Tam Quang, Bộ trưởng Công an. Ngoài ra còn có Bí thư Trung ương Đảng, Chánh Văn phòng Trung ương Đảng Lê Hoài Trung; Phó Thủ tướng Lê Thành Long và một số ủy viên Trung ương Đảng, lãnh đạo ban, bộ, ngành, cơ quan Trung ương và tỉnh Bắc Ninh.",
      likes: "12.8K",
      comments: 41,
      reposts: "1.8K",
      shares: 1,
      members: 10
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
      reposts: "0.5K",
      shares: 2,
      members: 10
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
      reposts: "300",
      shares: 2,
      members: 10
    },
  ]

  return (
    <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
      <AppSidebar />
      <Col className="d-flex flex-column ms-16">
        {" "}
        {/* ms-16 for sidebar width */}
        <PageHeader />
        <main className="flex-grow-1 p-4 p-md-6 p-lg-8 overflow-auto">
          <CategorySearch />
          <div className="d-flex flex-column gap-6 w-100">
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
              />
            ))}
          </div>
        </main>
      </Col>
    </Container>
  )
}
