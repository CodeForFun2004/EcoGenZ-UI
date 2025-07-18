import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { FaImage } from "react-icons/fa";
import './UpPostModal.css'; // Dùng file CSS thường

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
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      contentClassName="custom-modal"
      dialogClassName="custom-dialog"
    >
      <Modal.Body>
        <h5 className="fw-bold mb-3 text-center">Writing a Post</h5>
        <Form>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />

          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="#hashtag"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                className="mb-3"
              />
            </Col>
            <Col xs={3}>
              <Form.Group controlId="formFile" className="text-center">
                <Form.Label className="btn btn-outline-success w-100 d-flex justify-content-center align-items-center">
                  <FaImage size={20} />
                  <Form.Control type="file" onChange={handleImageChange} hidden />
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>

          <Form.Control
            as="textarea"
            rows={5}
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            style={{ resize: "vertical", minHeight: "150px" }}
            className="mb-3"
          />

          {image && (
            <div className="mb-3 text-center">
              <Image src={image} fluid rounded style={{ maxHeight: "200px" }} />
            </div>
          )}
        </Form>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            variant="light"
            className="rounded-pill px-4 py-2 shadow-sm cancel-btn"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="rounded-pill px-4 py-2 shadow-sm create-btn"
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
