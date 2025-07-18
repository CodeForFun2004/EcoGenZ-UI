import { AppSidebar } from "../../component/organizer/AppSidebar"
import { PageHeader } from "../../component/organizer/PageHeader"
import { Container, Col } from "react-bootstrap"
import ParticipantList from "./ParticipantList"

const ParticipantPage= () => {
  return (
    <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
      <AppSidebar />
      <Col className="d-flex flex-column ms-16">
        <PageHeader />
        <main className="flex-grow-1 p-4 p-md-6 p-lg-4 overflow-auto">
          <div className="d-flex flex-column gap-6 w-100" style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <ParticipantList/>
          </div>
        </main>
      </Col>
    </Container>
  )
}

export default ParticipantPage