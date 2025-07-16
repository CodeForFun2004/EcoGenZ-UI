"use client"

import { AppSidebar } from "../../component/organizer/app-sidebar"
import { PageHeader } from "../../component/organizer/page-header"
import { CategorySearch } from "../../component/organizer/category-search"
import { PostCard } from "../../component/organizer/post-card"
import { Container, Col } from "react-bootstrap"

export default function OrganizationPage() {
  const posts = [
    {
      id: "1",
      organizationName: "وداد",
      organizationAvatar: "/placeholder.svg?height=40&width=40", // Placeholder for avatar
      timeAgo: "4 Jul",
      postImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8hpwzFwxtjPDLPmQKRoC6EcfQBgVfp.png", // The new image URL
      likes: "12.8K",
      comments: 41,
      reposts: "1.8K",
      shares: 1,
      members: 10
    },
    {
      id: "2",
      organizationName: "Sama Elkady",
      organizationAvatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "18 Jun",
      postImage: "/placeholder.svg?height=400&width=600", // Placeholder for other posts
      likes: "5.2K",
      comments: 15,
      reposts: "0.5K",
      shares: 2,
      members: 10
    },
    {
      id: "3",
      organizationName: "Tech Insights",
      organizationAvatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "1w",
      postImage: "/placeholder.svg?height=400&width=600",
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
