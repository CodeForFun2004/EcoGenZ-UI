import { Heart, MessageCircle, Upload, Users } from "lucide-react"
import { Card, Image, Dropdown } from "react-bootstrap"
import { FaEdit, FaTrash } from "react-icons/fa"

interface PostCardProps {
  organizationName: string
  organizationAvatar: string
  timeAgo: string
  postImage: string
  likes: string
  comments: number
  shares: number
  members: number
}

export function PostCard({
  likes,
  comments,
  shares,
  members,
}: PostCardProps) {
  return (
    <Card className="w-100 mx-auto shadow-sm rounded-lg overflow-hidden border-0 mb-5" style={{ maxWidth: '800px' }}>
      <Card.Body className="px-4 pt-3 pb-4">
        <Image
          src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1IsNDV.img?w=1080&h=607&m=4&q=91"
          fluid
          className="mb-3 rounded"
        />
        <div>Hello world</div>

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
              <Dropdown.Item className="d-flex align-items-center text-danger">
                <FaTrash className="me-2" />
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  )
}






