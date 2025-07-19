// src/components/search/CategorySearch.tsx
import { Search } from "lucide-react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
// Import CSS tùy chỉnh của bạn
import './CategorySearch.css'; // Đảm bảo bạn có file này và đã import nó

export function CategorySearch() {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center ">
      <Row className="w-100" style={{ maxWidth: '780px' }}>
        <Col>
          <InputGroup className="custom-search-input-group">
            <Form.Control
              type="text"
              placeholder="Search post by title..."
              className="custom-search-input" // Class tùy chỉnh
              style={{
                borderRadius: '8px 0 0 8px', // Bo tròn góc trái
                padding: '0.5rem 1rem',      // Padding cho input (tăng nhẹ chiều cao)
                fontSize: '1rem',            // Kích thước chữ input
                height: '42px',              // Chiều cao cố định cho input
                borderRight: 'none',         // Xóa đường viền bên phải để nối với button
              }}
            />
            <Button
              variant="primary" // Giữ variant primary để Bootstrap áp dụng một số style cơ bản
              className="custom-search-button" // Class tùy chỉnh cho màu sắc và các override khác
              style={{
                // Inline styles cho kích thước để đảm bảo ưu tiên cao nhất
                borderRadius: '0 8px 8px 0', // Bo tròn góc phải
                padding: '0.5rem 0.8rem',    // <--- GIẢM PADDING NGANG CỦA BUTTON ĐỂ NÓ NGẮN LẠI
                height: '42px',              // Chiều cao cố định cho button
                minWidth: '42px',            // Đảm bảo nút không quá nhỏ, gần vuông
                display: 'flex',             // Để căn giữa icon
                alignItems: 'center',        // Căn giữa icon
                justifyContent: 'center',    // Căn giữa icon
              }}
            >
              <Search size={20} /> {/* Kích thước icon */}
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
}