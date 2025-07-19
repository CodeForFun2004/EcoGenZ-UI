import { useEffect, useState, useCallback } from 'react';
import Pagination from '../../../component/common/Pagination';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import { mockParticipants as initialMockParticipants } from '../../../data/users';
import type { Participant } from '../../../data/users';
import { ParticipantDetailModal } from './ParticipantDetailModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  const TABS = ['all', 'pending', 'approved', 'rejected'];
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const filterByTab = useCallback((data: Participant[], tab: string) => {
    if (tab === 'all') {
      setFilteredParticipants(data);
    } else {
      const filtered = data.filter(participant => participant.status.toLowerCase() === tab);
      setFilteredParticipants(filtered);
    }
  }, []);

  const fetchAndFilterParticipants = useCallback(async () => {
    setFetchStatus(false);
    const data: Participant[] = initialMockParticipants;
    const sorted = [...data].sort((a, b) => new Date(b.enrollDate).getTime() - new Date(a.enrollDate).getTime());
    setParticipants(sorted);
    setFetchStatus(true);
    filterByTab(sorted, activeTab);
  }, [filterByTab, activeTab]);

  useEffect(() => {
    fetchAndFilterParticipants();
  }, [fetchAndFilterParticipants]);

  useEffect(() => {
    filterByTab(participants, activeTab);
  }, [activeTab, participants, filterByTab]);

  // 🔥 Custom toast UI function
  const showToast = (type: 'success' | 'error', message: string) => {
    toast(message, {
      type: type,
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
        borderRadius: '12px',
        background:
          type === 'success'
            ? 'linear-gradient(135deg, #4caf50, #2e7d32)'
            : 'linear-gradient(135deg, #f44336, #c62828)',
        color: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      },
      icon: type === 'success' ? <FaCheckCircle /> : <FaTimesCircle />
    });
  };

   const handleUpdateParticipantStatus = (participantId: string, newStatus: 'approved' | 'rejected') => {
    setParticipants(prevParticipants => {
      const updatedParticipants = prevParticipants.map(p =>
        p.id === participantId ? { ...p, status: newStatus } : p
      );
      return updatedParticipants;
    });

    if (newStatus === 'approved') {
      showToast('success', `Participant ${participantId} approved successfully!`);
    } else {
      showToast('error', `Participant ${participantId} rejected successfully!`);
    }
  };

  const handleViewDetail = (participant: Participant) => {
    setSelectedParticipant(participant);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedParticipant(null);
  };

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="participant-list-container p-4">
      <h2 className="mb-4">Participant List</h2>

      <div className="tabs mb-4 d-flex justify-content-center">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-button btn me-2 ${activeTab === tab ? 'btn-danger' : 'btn-light text-secondary'}`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {fetchStatus === false ? (
        <div className="history notify text-center">
          <p>Loading participants...</p>
        </div>
      ) : filteredParticipants.length === 0 ? (
        <div className="history notify text-center">
          <p>No participants found for this status.</p>
        </div>
      ) : (
        <>
          <table className="table table-hover participant-table">
            <thead className="table-header-bg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Activity</th>
                <th>Status</th>
                <th>Enroll Date</th>
                <th>Event Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((participant, index) => (
                <tr
                  key={participant.id}
                  onClick={() => handleViewDetail(participant)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{startIndex + index + 1}</td>
                  <td>{participant.name}</td>
                  <td>{participant.email}</td>
                  <td>{participant.activity}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        participant.status === 'approved'
                          ? 'success'
                          : participant.status === 'pending'
                          ? 'warning'
                          : participant.status === 'rejected'
                          ? 'danger'
                          : 'secondary'
                      }`}
                    >
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {new Date(participant.enrollDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td>
                    {new Date(participant.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>
                  <td>
                    <div className="d-flex gap-2" onClick={e => e.stopPropagation()}>
                      {participant.status === 'pending' ? (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            title="Approve"
                            onClick={() => handleUpdateParticipantStatus(participant.id, 'approved')}
                          >
                            <FaCheckCircle />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            title="Reject"
                            onClick={() => handleUpdateParticipantStatus(participant.id, 'rejected')}
                          >
                            <FaTimesCircle />
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-info btn-sm"
                          title="View Detail"
                          onClick={() => handleViewDetail(participant)}
                        >
                          <FaEye />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <ParticipantDetailModal show={showDetailModal} onHide={handleCloseDetailModal} participant={selectedParticipant} />

      {/* Toast container - quan trọng! */}
      <ToastContainer />
    </div>
  );
};

export default ParticipantList;
