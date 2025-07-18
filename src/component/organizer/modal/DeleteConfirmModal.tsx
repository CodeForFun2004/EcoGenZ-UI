import { Modal, Button } from 'react-bootstrap';
import './DeleteConfirmModal.css'; // Dùng file CSS thường

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function DeleteConfirmModal({
  show,
  onHide,
  onConfirm,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
}: DeleteConfirmModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="custom-modal"
      dialogClassName="custom-dialog"
    >
      <Modal.Body className="text-center">
        <h5 className="fw-bold mb-3">{title}</h5>
        <p className="text-muted">{message}</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            variant="light"
            className="rounded-pill px-4 py-2 shadow-sm cancel-btn"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="rounded-pill px-4 py-2 shadow-sm delete-btn"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
