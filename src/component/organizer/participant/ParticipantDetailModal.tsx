// src/component/modal/ParticipantDetailModal.tsx
import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { X } from 'lucide-react'; // Import icon X
import type { Participant } from '../../../data/users'; // Import Participant interface từ users.ts

interface ParticipantDetailModalProps {
  show: boolean;
  onHide: () => void;
  participant: Participant | null; // Participant được chọn để hiển thị chi tiết
}

export const ParticipantDetailModal: React.FC<ParticipantDetailModalProps> = ({ show, onHide, participant }) => {
  if (!participant) {
    return null; // Không hiển thị modal nếu không có participant
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg"> {/* size="lg" để modal lớn hơn */}
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 d-flex justify-content-between align-items-center">
          <h5>Participant Details</h5>
          <Button variant="light" onClick={onHide} className="p-0 border-0 bg-transparent">
            <X size={24} />
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="d-flex align-items-center mb-4">
          <Image
            src={participant.avatar}
            alt={participant.name}
            roundedCircle
            width={80}
            height={80}
            className="me-4 shadow-sm"
          />
          <div>
            <h4 className="mb-1">{participant.name}</h4>
            <p className="text-muted mb-0">{participant.email}</p>
            <p className="text-muted mb-0">{participant.phone}</p>
            <p className="text-muted mb-0">{participant.address}</p>
          </div>
        </div>

        <hr /> {/* Đường phân cách */}

        <h5 className="mb-3">Current Activity</h5>
        <div className="card p-3 mb-4 shadow-sm">
          <p className="mb-1"><strong>Activity:</strong> {participant.activity}</p>
          <p className="mb-1"><strong>Status:</strong> <span className={`badge bg-${
            participant.status === 'approved' ? 'success' :
            participant.status === 'pending' ? 'warning' :
            participant.status === 'rejected' ? 'danger' : 'secondary'
          }`}>
            {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
          </span></p>
          <p className="mb-1"><strong>Enroll Date:</strong> {new Date(participant.enrollDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
          <p className="mb-0"><strong>Event Date:</strong> {new Date(participant.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
        </div>

        <h5 className="mb-3">Past Activities</h5>
        {participant.pastActivities && participant.pastActivities.length > 0 ? (
          <ul className="list-group">
            {participant.pastActivities.map((activity, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded">
                <div>
                  <strong>{activity.name}</strong>
                  <div className="text-muted" style={{ fontSize: '0.9em' }}>
                    {new Date(activity.date).toLocaleDateString('en-US')} - {activity.role}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No past activities recorded.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};