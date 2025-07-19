import React from 'react';
import ActivityMap from '../../component/map/ActivityMap';

const ActivityMapPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem 0' }}>
      <div className="container">
        <ActivityMap />
      </div>
    </div>
  );
};

export default ActivityMapPage;
