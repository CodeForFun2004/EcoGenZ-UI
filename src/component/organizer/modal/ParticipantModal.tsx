// src/modal/ParticipantModal.tsx
import { Modal, Button, Image } from 'react-bootstrap';
import { X } from 'lucide-react'; // Import icon X từ lucide-react

// Định nghĩa interface cho một user
interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string; // URL avatar của người dùng
}

// Định nghĩa props cho ParticipantModal
interface ParticipantModalProps {
  show: boolean;
  onHide: () => void;
  participants: User[]; // Danh sách người tham gia
}

export function ParticipantModal({ show, onHide, participants }: ParticipantModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 d-flex justify-content-between align-items-center">
          <h5>Participants</h5>
          <Button variant="light" onClick={onHide} className="p-0 border-0 bg-transparent">
            <X size={24} />
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="list-group">
          {participants.map((user) => (
            <div key={user.id} className="list-group-item list-group-item-action d-flex align-items-center py-2 px-3 mb-2 rounded shadow-sm">
              <Image
                src={user.avatar}
                alt={user.name}
                roundedCircle
                width={40}
                height={40}
                className="me-3"
              />
              <div>
                <h6 className="mb-0">{user.name}</h6>
                <small className="text-muted">{user.role}</small>
                <div className="text-muted" style={{ fontSize: '0.85em' }}>
                  {user.email} | {user.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}