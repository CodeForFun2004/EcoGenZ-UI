import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { FaImage } from "react-icons/fa";

interface ModalUpPostProps {
  show: boolean;
  handleClose: () => void;
}

export function ModalUpPost({ show, handleClose }: ModalUpPostProps) {
  const [title, setTitle] = useState<string>("");
  const [hashtag, setHashtag] = useState<string>("");
  const [postText, setPostText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setImage(fileURL);
    }
  };

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Hashtag:", hashtag);
    console.log("Post:", postText);
    console.log("Image:", image);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Writing a Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Title input */}
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />

          {/* Hashtag + Upload */}
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="#hashtag"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                className="mb-4"
              />
            </Col>
            <Col xs={3}>
              <Form.Group controlId="formFile" className="mb-3 text-center">
                <Form.Label className="btn btn-outline-primary w-100 d-flex justify-content-center align-items-center">
                  <FaImage size={24} />
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    hidden
                  />
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          {/* Textarea */}
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            style={{ resize: "vertical", minHeight: "190px" }}
            className="mb-3"
          />

          {/* Image preview */}
          {image && (
            <div className="mb-3 text-center">
              <Image src={image} fluid rounded style={{ maxHeight: "200px" }} />
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
