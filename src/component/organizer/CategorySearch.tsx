import { Search } from "lucide-react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchOrganizerActivities,
  fetchOrganizerActivities,
} from "../../redux/features/organizerActivities/organizerActivitiesThunk";
import type { AppDispatch } from "../../redux/store";

interface CategorySearchProps {
  userId?: string;
}

export function CategorySearch({ userId }: CategorySearchProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchOrganizerActivities({ searchTerm: searchTerm.trim() }));
    } else if (userId) {
      dispatch(fetchOrganizerActivities(userId));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (userId) {
      dispatch(fetchOrganizerActivities(userId));
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mb-3"
    >
      <Row className="w-100" style={{ maxWidth: "780px" }}>
        <Col>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search post by title ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <Search size={26} />
              </Button>
              {searchTerm && (
                <Button variant="outline-secondary" onClick={handleClearSearch}>
                  Clear
                </Button>
              )}
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
