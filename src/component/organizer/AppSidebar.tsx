import { useState } from "react"
import { Home, LayoutGrid, MessageCircle, Bell, Search, Plus } from "lucide-react"
import { Nav, Button } from "react-bootstrap"
import { ModalUpPost } from "./modal/UpPostModal"
import { Link } from "react-router-dom"

export function AppSidebar() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <aside
        className="position-fixed top-0 start-0 bg-white border-end d-flex flex-column align-items-center py-4 shadow-sm"
        style={{ width: "80px", height: "100vh", zIndex: 1050 }}
      >
        <Nav className="flex-grow-1 d-flex flex-column align-items-center mt-4">
          <Link className="d-flex flex-column align-items-center text-muted mb-4" to='/organizer-post'>
            <Home size={24} />
            <span className="sr-only">Home</span>
          </Link>
          <Link className="d-flex flex-column align-items-center text-muted mb-4" to='/approve-participant'>
            <LayoutGrid size={24} />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Nav.Link className="d-flex flex-column align-items-center text-muted mb-4">
            <MessageCircle size={24} />
            <span className="sr-only">Messages</span>
          </Nav.Link>
          <Nav.Link className="d-flex flex-column align-items-center text-muted mb-4">
            <Bell size={24} />
            <span className="sr-only">Notifications</span>
          </Nav.Link>
          <Nav.Link className="d-flex flex-column align-items-center text-muted mb-4">
            <Search size={24} />
            <span className="sr-only">Search</span>
          </Nav.Link>
        </Nav>

        <div className="mb-3">
          <Button
            variant="primary"
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            <span className="sr-only">Post</span>
          </Button>
        </div>
      </aside>

      {/* Modal popup */}
      <ModalUpPost show={showModal} handleClose={() => setShowModal(false)} />
    </>
  )
}
