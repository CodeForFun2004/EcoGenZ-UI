import { useState } from "react"
import { Navbar, Button } from "react-bootstrap"
import { ModalUpPost } from "./modal-up-post"

export function PageHeader() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Navbar bg="white" className="border-bottom ml-16 px-4 py-0 h-16 flex-shrink-0 mt-3">
        <Navbar.Brand className="text-2xl font-bold text-gray-900 me-4" style={{marginLeft: '120px'}}>Home</Navbar.Brand>
        <div className="h-8 w-px bg-gray-200 hidden md-block me-4" />
        <div className="flex items-center gap-4 ms-auto mb-2">
          <Button
            variant="outline-secondary"
            className="rounded-pill px-4 py-2 text-sm font-medium"
            onClick={() => setShowModal(true)}
          >
            Start writing
          </Button>
        </div>
      </Navbar>

      <ModalUpPost
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  )
}
