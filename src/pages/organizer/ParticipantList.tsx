// src/pages/ParticipantList.tsx
import { useEffect, useState, useCallback } from 'react';
import Pagination from '../../component/common/Pagination';
// import { Image } from 'react-bootstrap'; // Không cần import Image nếu không hiển thị
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

import { mockParticipants as initialMockParticipants } from '../../data/users';
import type { Participant } from '../../data/users'; // Import type riêng biệt

export const ParticipantList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [fetchStatus, setFetchStatus] = useState(false);

  // Định nghĩa các tab trạng thái
  const TABS = ['all', 'pending', 'approved', 'rejected'];

  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  // Hàm lọc participants dựa trên tab được chọn
  const filterByTab = useCallback((data: Participant[], tab: string) => {
    if (tab === 'all') {
      setFilteredParticipants(data);
    } else {
      const filtered = data.filter(participant => participant.status.toLowerCase() === tab);
      setFilteredParticipants(filtered);
    }
  }, []); // Không có dependencies bên trong hàm này

  // Hàm mô phỏng việc fetch dữ liệu và sắp xếp
  const fetchAndFilterParticipants = useCallback(async () => {
    setFetchStatus(false); // Bắt đầu loading
    const data: Participant[] = initialMockParticipants; // Lấy dữ liệu mock
    
    // Sắp xếp participants theo ngày đăng ký mới nhất
    const sorted = [...data].sort((a, b) => new Date(b.enrollDate).getTime() - new Date(a.enrollDate).getTime());
    setParticipants(sorted);
    setFetchStatus(true); // Kết thúc loading
    filterByTab(sorted, activeTab); // Lọc dữ liệu ngay sau khi fetch
  }, [filterByTab, activeTab]); // Dependencies: filterByTab và activeTab

  // useEffect để fetch dữ liệu khi component mount hoặc dependencies thay đổi
  useEffect(() => {
    fetchAndFilterParticipants();
  }, [fetchAndFilterParticipants]); // Dependency: fetchAndFilterParticipants

  // useEffect để lọc lại dữ liệu khi participants hoặc activeTab thay đổi
  useEffect(() => {
    filterByTab(participants, activeTab);
  }, [activeTab, participants, filterByTab]); // Dependencies: activeTab, participants, filterByTab

  // Xử lý cập nhật trạng thái participant
  const handleUpdateParticipantStatus = (participantId: string, newStatus: 'approved' | 'rejected') => {
    if (window.confirm(`Are you sure you want to change status of ${participantId} to ${newStatus}?`)) {
      setParticipants(prevParticipants => {
        const updatedParticipants = prevParticipants.map(p =>
          p.id === participantId ? { ...p, status: newStatus } : p
        );
        return updatedParticipants;
      });
      alert(`Participant ${participantId} status updated to ${newStatus}.`);
    }
  };

  // Xử lý xem chi tiết participant
  const handleViewDetail = (participantId: string) => {
    alert(`Viewing detail for participant: ${participantId}`);
    // Trong ứng dụng thực tế, bạn có thể chuyển hướng hoặc mở modal chi tiết tại đây
  };

  // Logic phân trang
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="participant-list-container p-4">
      <h2 className="mb-4">Participant List</h2>

      {/* Các tab trạng thái được căn giữa và có màu sắc tùy chỉnh */}
      <div className="tabs mb-4 d-flex justify-content-center">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-button btn me-2 ${
              activeTab === tab
                ? 'btn-danger' // Tất cả các tab active sẽ có màu đỏ (giống Pending)
                : 'btn-light text-secondary' // Các tab không active có màu xám nhạt và chữ xám
            }`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1); // Reset về trang đầu tiên khi đổi tab
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Hiển thị Loading, No Data, hoặc Bảng dữ liệu */}
      {fetchStatus === false ? ( // Hiển thị loading khi đang fetch dữ liệu
        <div className='history notify text-center'><p>Loading participants...</p></div>
      ) : filteredParticipants.length === 0 ? ( // Hiển thị "No participants" nếu không có dữ liệu sau khi fetch
        <div className='history notify text-center'><p>No participants found for this status.</p></div>
      ) : (
        <>
          <table className="table table-hover participant-table">
            <thead className="table-header-bg"> {/* Class cho nền xám của header */}
              <tr>
                <th>#</th>
                {/* Cột Avatar đã được ẩn theo yêu cầu */}
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
                <tr key={participant.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{participant.name}</td>
                  <td>{participant.email}</td>
                  <td>{participant.activity}</td>
                  <td>
                    <span className={`badge bg-${
                      participant.status === 'approved' ? 'success' :
                      participant.status === 'pending' ? 'warning' :
                      participant.status === 'rejected' ? 'danger' : 'secondary'
                    }`}>
                      {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                    </span>
                  </td>
                  <td>{new Date(participant.enrollDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                  <td>{new Date(participant.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                  <td>
                    <div className="d-flex gap-2">
                      {participant.status === 'pending' && (
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
                      )}
                      {participant.status !== 'pending' && (
                        <button
                          className="btn btn-info btn-sm"
                          title="View Detail"
                          onClick={() => handleViewDetail(participant.id)}
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

          {/* Component phân trang */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ParticipantList;