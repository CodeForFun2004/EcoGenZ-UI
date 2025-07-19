// src/modal/ParticipantModal.tsx
import React, { useEffect } from "react";
import { Modal, Button, Image, Badge, Spinner, Alert } from "react-bootstrap";
import { X, CheckCircle, XCircle, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchParticipantsByActivityId } from "../../../redux/features/participants/participantsThunk";
import {
  setSelectedActivityId,
  clearError,
} from "../../../redux/features/participants/participantsSlice";
import type { RootState } from "../../../redux/store";
import type { AppDispatch } from "../../../redux/store";
import type { Participant } from "../../../redux/features/participants/participantsTypes";
import { RegistrationStatus } from "../../../redux/features/participants/participantsTypes";

// Định nghĩa props cho ParticipantModal
interface ParticipantModalProps {
  show: boolean;
  onHide: () => void;
  activityId?: string;
  activityDate?: string;
}

export function ParticipantModal({
  show,
  onHide,
  activityId,
  activityDate,
}: ParticipantModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { participants, loading, error } = useSelector(
    (state: RootState) => state.participants
  );

  useEffect(() => {
    if (show && activityId) {
      dispatch(setSelectedActivityId(activityId));
      dispatch(fetchParticipantsByActivityId(activityId));
    }
  }, [dispatch, show, activityId]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const getStatusBadge = (status: number) => {
    switch (status) {
      case RegistrationStatus.Approved:
        return <Badge bg="success">Approved</Badge>;
      case RegistrationStatus.Rejected:
        return <Badge bg="danger">Rejected</Badge>;
      case RegistrationStatus.Pending:
      default:
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: number) => {
    switch (status) {
      case RegistrationStatus.Approved:
        return <CheckCircle size={16} className="text-success" />;
      case RegistrationStatus.Rejected:
        return <XCircle size={16} className="text-danger" />;
      case RegistrationStatus.Pending:
      default:
        return <Clock size={16} className="text-warning" />;
    }
  };

  const isActivityUpcoming = () => {
    if (!activityDate) return false;
    const activityDateTime = new Date(activityDate);
    const now = new Date();
    const activityDateOnly = new Date(
      activityDateTime.getFullYear(),
      activityDateTime.getMonth(),
      activityDateTime.getDate()
    );
    const todayOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    return activityDateOnly >= todayOnly;
  };

  const handleApproveParticipant = () => {
    if (activityId) {
      navigate(`/approve-participant/${activityId}`);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="w-100 d-flex justify-content-between align-items-center">
          <h5>Participants</h5>
          <Button
            variant="light"
            onClick={onHide}
            className="p-0 border-0 bg-transparent"
          >
            <X size={24} />
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => dispatch(clearError())}
          >
            {error}
          </Alert>
        )}

        {isActivityUpcoming() && (
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Registration Status Management</span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleApproveParticipant}
            >
              Manage Approvals
            </Button>
          </div>
        )}

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : participants.length === 0 ? (
          <div className="text-center py-5">
            <h6 className="text-muted">No participants found</h6>
            <p className="text-muted">
              No one has registered for this activity yet.
            </p>
          </div>
        ) : (
          <div className="list-group">
            {participants.map((participant: Participant) => (
              <div
                key={participant.registrationId}
                className="list-group-item list-group-item-action d-flex align-items-center py-3 px-3 mb-2 rounded shadow-sm"
              >
                <Image
                  src={
                    participant.user.profilePhotoUrl ||
                    "https://api.dicebear.com/9.x/adventurer/svg?seed=default"
                  }
                  alt={participant.user.userName}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-0">{participant.user.userName}</h6>
                      <small className="text-muted">
                        {participant.user.email}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {getStatusIcon(participant.status)}
                      {getStatusBadge(participant.status)}
                      {!isActivityUpcoming() && (
                        <Badge
                          bg={participant.attended ? "success" : "secondary"}
                        >
                          {participant.attended ? "Attended" : "Absent"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
