import { Search } from "lucide-react"
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap"

export function CategorySearch() {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center mb-3">
      <Row className="w-100" style={{ maxWidth: '780px' }}>
        <Col>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search post by title ..."
            />
            <Button variant="primary">
              <Search size={26} />
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  )
}
