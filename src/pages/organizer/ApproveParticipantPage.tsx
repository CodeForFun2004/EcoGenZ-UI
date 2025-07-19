import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Col,
  Alert,
  Card,
  Button,
  Image,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppSidebar } from "../../component/organizer/AppSidebar";
import { PageHeader } from "../../component/organizer/PageHeader";
import { useRequireCompanyRole } from "../../hooks/useAuth";
import {
  fetchParticipantsByActivityId,
  updateRegistrationStatus,
} from "../../redux/features/participants/participantsThunk";
import {
  setSelectedActivityId,
  clearError,
} from "../../redux/features/participants/participantsSlice";
import type { RootState } from "../../redux/store";
import type { AppDispatch } from "../../redux/store";
import type { Participant } from "../../redux/features/participants/participantsTypes";
import { RegistrationStatus } from "../../redux/features/participants/participantsTypes";
import { CheckCircle, XCircle, Clock, Search, ArrowLeft } from "lucide-react";
import "./ApproveParticipantPage.css";

export default function ApproveParticipantPage() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isCompany } = useRequireCompanyRole();
  const { participants, loading, error } = useSelector(
    (state: RootState) => state.participants
  );
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  useEffect(() => {
    if (activityId && isAuthenticated && isCompany) {
      dispatch(setSelectedActivityId(activityId));
      dispatch(fetchParticipantsByActivityId(activityId));
    }
  }, [dispatch, activityId, isAuthenticated, isCompany]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleStatusUpdate = async (
    registrationId: string,
    newStatus: number
  ) => {
    try {
      await dispatch(
        updateRegistrationStatus({ registrationId, status: newStatus as any })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
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

  const filteredParticipants = participants.filter(
    (participant: Participant) => {
      const searchLower = localSearchTerm.toLowerCase();
      return (
        participant.user.userName.toLowerCase().includes(searchLower) ||
        participant.user.email.toLowerCase().includes(searchLower)
      );
    }
  );

  const pendingParticipants = filteredParticipants.filter(
    (p) => p.status === RegistrationStatus.Pending
  );
  const approvedParticipants = filteredParticipants.filter(
    (p) => p.status === RegistrationStatus.Approved
  );
  const rejectedParticipants = filteredParticipants.filter(
    (p) => p.status === RegistrationStatus.Rejected
  );

  if (!isAuthenticated) {
    return (
      <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
        <Col className="d-flex flex-column ms-16">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Alert variant="info">Please log in to access this page.</Alert>
          </div>
        </Col>
      </Container>
    );
  }

  if (!isCompany) {
    return (
      <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
        <Col className="d-flex flex-column ms-16">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Alert variant="warning">
              You don't have permission to access this page.
            </Alert>
          </div>
        </Col>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0 d-flex min-vh-100 bg-gray-50">
      <AppSidebar />
      <Col className="d-flex flex-column ms-16">
        <PageHeader />
        <main className="flex-grow-1 p-4 p-md-6 p-lg-8 overflow-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate("/organizer-post")}
              >
                <ArrowLeft size={16} />
              </Button>
              <h4 className="mb-0">Manage Participants</h4>
            </div>
            <div className="text-muted">Activity ID: {activityId}</div>
          </div>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => dispatch(clearError())}
            >
              {error}
            </Alert>
          )}

          {/* Search */}
          <Card className="mb-4">
            <Card.Body>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search participants by name or email..."
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <Search size={16} />
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="row">
              {/* Pending Participants */}
              <div className="col-md-4">
                <Card className="h-100">
                  <Card.Header className="bg-warning text-dark">
                    <h6 className="mb-0">
                      <Clock size={16} className="me-2" />
                      Pending ({pendingParticipants.length})
                    </h6>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {pendingParticipants.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted mb-0">
                          No pending participants
                        </p>
                      </div>
                    ) : (
                      <div className="list-group list-group-flush">
                        {pendingParticipants.map((participant: Participant) => (
                          <div
                            key={participant.registrationId}
                            className="list-group-item"
                          >
                            <div className="d-flex align-items-center mb-2">
                              <Image
                                src={
                                  participant.user.profilePhotoUrl ||
                                  "https://api.dicebear.com/9.x/adventurer/svg?seed=default"
                                }
                                alt={participant.user.userName}
                                roundedCircle
                                width={32}
                                height={32}
                                className="me-2"
                              />
                              <div className="flex-grow-1">
                                <h6 className="mb-0">
                                  {participant.user.userName}
                                </h6>
                                <small className="text-muted">
                                  {participant.user.email}
                                </small>
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() =>
                                  handleStatusUpdate(
                                    participant.registrationId,
                                    RegistrationStatus.Approved
                                  )
                                }
                              >
                                <CheckCircle size={14} className="me-1" />
                                Approve
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  handleStatusUpdate(
                                    participant.registrationId,
                                    RegistrationStatus.Rejected
                                  )
                                }
                              >
                                <XCircle size={14} className="me-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Approved Participants */}
              <div className="col-md-4">
                <Card className="h-100">
                  <Card.Header className="bg-success text-white">
                    <h6 className="mb-0">
                      <CheckCircle size={16} className="me-2" />
                      Approved ({approvedParticipants.length})
                    </h6>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {approvedParticipants.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted mb-0">
                          No approved participants
                        </p>
                      </div>
                    ) : (
                      <div className="list-group list-group-flush">
                        {approvedParticipants.map(
                          (participant: Participant) => (
                            <div
                              key={participant.registrationId}
                              className="list-group-item"
                            >
                              <div className="d-flex align-items-center">
                                <Image
                                  src={
                                    participant.user.profilePhotoUrl ||
                                    "https://api.dicebear.com/9.x/adventurer/svg?seed=default"
                                  }
                                  alt={participant.user.userName}
                                  roundedCircle
                                  width={32}
                                  height={32}
                                  className="me-2"
                                />
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">
                                    {participant.user.userName}
                                  </h6>
                                  <small className="text-muted">
                                    {participant.user.email}
                                  </small>
                                </div>
                                {getStatusIcon(participant.status)}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>

              {/* Rejected Participants */}
              <div className="col-md-4">
                <Card className="h-100">
                  <Card.Header className="bg-danger text-white">
                    <h6 className="mb-0">
                      <XCircle size={16} className="me-2" />
                      Rejected ({rejectedParticipants.length})
                    </h6>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {rejectedParticipants.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted mb-0">
                          No rejected participants
                        </p>
                      </div>
                    ) : (
                      <div className="list-group list-group-flush">
                        {rejectedParticipants.map(
                          (participant: Participant) => (
                            <div
                              key={participant.registrationId}
                              className="list-group-item"
                            >
                              <div className="d-flex align-items-center">
                                <Image
                                  src={
                                    participant.user.profilePhotoUrl ||
                                    "https://api.dicebear.com/9.x/adventurer/svg?seed=default"
                                  }
                                  alt={participant.user.userName}
                                  roundedCircle
                                  width={32}
                                  height={32}
                                  className="me-2"
                                />
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">
                                    {participant.user.userName}
                                  </h6>
                                  <small className="text-muted">
                                    {participant.user.email}
                                  </small>
                                </div>
                                {getStatusIcon(participant.status)}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </main>
      </Col>
    </Container>
  );
}
