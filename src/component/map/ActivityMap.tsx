import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Popup, Circle, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchAllActivities } from '../../redux/features/activities/activitiesThunk';
import type { Activity } from '../../redux/features/activities/activitiesTypes';
import './ActivityMap.css';

// Fix for default markers
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Vietnam bounds to restrict map panning
const vietnamBounds = new LatLngBounds(
  [8.0, 102.0], // Southwest corner (Ca Mau, Kien Giang)
  [23.5, 110.0] // Northeast corner (Ha Giang, Quang Ninh)
);

// Component to set map bounds
const MapBounds: React.FC = () => {
  const map = useMap();
  
  useEffect(() => {
    // Set max bounds to restrict panning
    map.setMaxBounds(vietnamBounds);
    
    // Set min/max zoom levels
    map.setMinZoom(5);
    map.setMaxZoom(10);
    
    // Add event listener to ensure map stays within bounds
    const handleMoveEnd = () => {
      if (!vietnamBounds.contains(map.getCenter())) {
        map.panInsideBounds(vietnamBounds, { animate: true });
      }
    };
    
    map.on('moveend', handleMoveEnd);
    map.on('drag', () => {
      map.panInsideBounds(vietnamBounds, { animate: false });
    });
    
    // Cleanup
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map]);
  
  return null;
};

// Coordinates for Vietnam provinces (some main provinces)
const vietnamProvinces: Record<string, { lat: number; lng: number; name: string }> = {
  'Hà Nội': { lat: 21.0285, lng: 105.8542, name: 'Hà Nội' },
  'Hồ Chí Minh': { lat: 10.8231, lng: 106.6297, name: 'TP. Hồ Chí Minh' },
  'Hải Phòng': { lat: 20.8449, lng: 106.6881, name: 'Hải Phòng' },
  'Đà Nẵng': { lat: 16.0544, lng: 108.2022, name: 'Đà Nẵng' },
  'Cần Thơ': { lat: 10.0452, lng: 105.7469, name: 'Cần Thơ' },
  'An Giang': { lat: 10.3888, lng: 104.8900, name: 'An Giang' },
  'Bà Rịa - Vũng Tàu': { lat: 10.5417, lng: 107.2431, name: 'Bà Rịa - Vũng Tàu' },
  'Bạc Liêu': { lat: 9.2940, lng: 105.7215, name: 'Bạc Liêu' },
  'Bắc Giang': { lat: 21.2731, lng: 106.1946, name: 'Bắc Giang' },
  'Bắc Kạn': { lat: 22.1470, lng: 105.8348, name: 'Bắc Kạn' },
  'Bắc Ninh': { lat: 21.1861, lng: 106.0763, name: 'Bắc Ninh' },
  'Bến Tre': { lat: 10.2433, lng: 106.3759, name: 'Bến Tre' },
  'Bình Dương': { lat: 11.3254, lng: 106.4770, name: 'Bình Dương' },
  'Bình Định': { lat: 14.1665, lng: 109.0395, name: 'Bình Định' },
  'Bình Phước': { lat: 11.7512, lng: 106.7234, name: 'Bình Phước' },
  'Bình Thuận': { lat: 11.0904, lng: 108.0721, name: 'Bình Thuận' },
  'Cà Mau': { lat: 9.1769, lng: 105.1524, name: 'Cà Mau' },
  'Cao Bằng': { lat: 22.6356, lng: 106.2610, name: 'Cao Bằng' },
  'Đắk Lắk': { lat: 12.7100, lng: 108.2378, name: 'Đắk Lắk' },
  'Đắk Nông': { lat: 12.2646, lng: 107.6098, name: 'Đắk Nông' },
  'Điện Biên': { lat: 21.8042, lng: 103.2190, name: 'Điện Biên' },
  'Đồng Nai': { lat: 11.0686, lng: 107.1676, name: 'Đồng Nai' },
  'Đồng Tháp': { lat: 10.4938, lng: 105.6881, name: 'Đồng Tháp' },
  'Gia Lai': { lat: 13.8078, lng: 108.1099, name: 'Gia Lai' },
  'Hà Giang': { lat: 22.8025, lng: 104.9784, name: 'Hà Giang' },
  'Hà Nam': { lat: 20.5835, lng: 106.0505, name: 'Hà Nam' },
  'Hà Tĩnh': { lat: 18.2943, lng: 105.8958, name: 'Hà Tĩnh' },
  'Hải Dương': { lat: 20.9385, lng: 106.3206, name: 'Hải Dương' },
  'Hậu Giang': { lat: 9.7571, lng: 105.6412, name: 'Hậu Giang' },
  'Hòa Bình': { lat: 20.6861, lng: 105.3131, name: 'Hòa Bình' },
  'Hưng Yên': { lat: 20.6464, lng: 106.0511, name: 'Hưng Yên' },
  'Khánh Hòa': { lat: 12.2388, lng: 109.0677, name: 'Khánh Hòa' },
  'Kiên Giang': { lat: 10.0125, lng: 105.0808, name: 'Kiên Giang' },
  'Kon Tum': { lat: 14.3497, lng: 108.0004, name: 'Kon Tum' },
  'Lai Châu': { lat: 22.3686, lng: 103.4638, name: 'Lai Châu' },
  'Lâm Đồng': { lat: 11.5753, lng: 108.1429, name: 'Lâm Đồng' },
  'Lạng Sơn': { lat: 21.8564, lng: 106.7615, name: 'Lạng Sơn' },
  'Lào Cai': { lat: 22.4856, lng: 103.9707, name: 'Lào Cai' },
  'Long An': { lat: 10.6956, lng: 106.2431, name: 'Long An' },
  'Nam Định': { lat: 20.4388, lng: 106.1621, name: 'Nam Định' },
  'Nghệ An': { lat: 19.2342, lng: 104.9200, name: 'Nghệ An' },
  'Ninh Bình': { lat: 20.2506, lng: 105.9744, name: 'Ninh Bình' },
  'Ninh Thuận': { lat: 11.6739, lng: 108.8629, name: 'Ninh Thuận' },
  'Phú Thọ': { lat: 21.2685, lng: 105.2045, name: 'Phú Thọ' },
  'Phú Yên': { lat: 13.1611, lng: 109.3132, name: 'Phú Yên' },
  'Quảng Bình': { lat: 17.6102, lng: 106.3487, name: 'Quảng Bình' },
  'Quảng Nam': { lat: 15.5394, lng: 108.0191, name: 'Quảng Nam' },
  'Quảng Ngãi': { lat: 15.1214, lng: 108.8044, name: 'Quảng Ngãi' },
  'Quảng Ninh': { lat: 21.0059, lng: 107.2925, name: 'Quảng Ninh' },
  'Quảng Trị': { lat: 16.7943, lng: 107.1851, name: 'Quảng Trị' },
  'Sóc Trăng': { lat: 9.6003, lng: 105.9739, name: 'Sóc Trăng' },
  'Sơn La': { lat: 21.3256, lng: 103.9188, name: 'Sơn La' },
  'Tây Ninh': { lat: 11.3349, lng: 106.1077, name: 'Tây Ninh' },
  'Thái Bình': { lat: 20.4463, lng: 106.3365, name: 'Thái Bình' },
  'Thái Nguyên': { lat: 21.5928, lng: 105.8477, name: 'Thái Nguyên' },
  'Thanh Hóa': { lat: 19.8069, lng: 105.7851, name: 'Thanh Hóa' },
  'Thừa Thiên Huế': { lat: 16.4637, lng: 107.5909, name: 'Thừa Thiên Huế' },
  'Tiền Giang': { lat: 10.4493, lng: 106.3420, name: 'Tiền Giang' },
  'Trà Vinh': { lat: 9.9345, lng: 106.3453, name: 'Trà Vinh' },
  'Tuyên Quang': { lat: 21.7767, lng: 105.2280, name: 'Tuyên Quang' },
  'Vĩnh Long': { lat: 10.2530, lng: 105.9571, name: 'Vĩnh Long' },
  'Vĩnh Phúc': { lat: 21.3608, lng: 105.6057, name: 'Vĩnh Phúc' },
  'Yên Bái': { lat: 21.6837, lng: 104.4551, name: 'Yên Bái' }
};

interface ProvinceCount {
  name: string;
  count: number;
  activities: Activity[];
  coordinates: { lat: number; lng: number };
}

const ActivityMap: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activities, loading, error } = useAppSelector((state) => state.activities);
  const [mapCenter] = useState<[number, number]>([16.0583, 108.2772]); // Trung tâm Việt Nam
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllActivities());
  }, [dispatch]);

  // Function to toggle dropdown for province
  const handleProvinceClick = (provinceName: string) => {
    setOpenDropdown(openDropdown === provinceName ? null : provinceName);
  };

  // Function to navigate to specific activity detail page
  const handleActivityClick = (activityId: string) => {
    navigate(`/activities/${activityId}`);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate number of activities by each province and get activities list
  const provinceStats = useMemo(() => {
    if (!activities || activities.length === 0) return [];

    const provinceData: Record<string, { count: number; activities: Activity[] }> = {};
    
    activities.forEach((activity: Activity) => {
      if (activity.location && typeof activity.location === 'string') {
        const location = activity.location.trim();
        if (vietnamProvinces[location]) {
          if (!provinceData[location]) {
            provinceData[location] = { count: 0, activities: [] };
          }
          provinceData[location].count += 1;
          provinceData[location].activities.push(activity);
        }
      }
    });

    return Object.entries(provinceData)
      .map(([name, data]) => ({
        name,
        count: data.count,
        activities: data.activities
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date desc
          .slice(0, 5), // Take only 5 most recent
        coordinates: vietnamProvinces[name]
      }))
      .filter(item => item.coordinates)
      .sort((a, b) => b.count - a.count);
  }, [activities]);

  const totalActivities = activities?.length || 0;
  const totalProvinces = provinceStats.length;
  const averagePerProvince = totalProvinces > 0 ? Math.round(totalActivities / totalProvinces) : 0;
  const mostActiveProvince = provinceStats[0];

  if (loading) {
    return (
      <div className="activity-map-container">
        <div className="loading-spinner">
          <div>Loading map data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="activity-map-container">
        <div className="error-message">
          Error loading data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="activity-map-container">
      <div className="map-header">
        <h2 className="map-title">Environmental Activities Map</h2>
        <p className="map-description">
          Explore environmental protection activities across Vietnam. 
          Each circle on the map represents the number of activities in each province.
          <span className="map-restriction-note">Map view is restricted to Vietnam territory.</span>
        </p>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={mapCenter}
          zoom={6}
          minZoom={5}
          maxZoom={10}
          maxBounds={vietnamBounds}
          maxBoundsViscosity={1.0}
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          style={{ height: '100%', width: '100%' }}
          attributionControl={false}
        >
          <MapBounds />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
          />
          
          {provinceStats.map((province: ProvinceCount) => {
            const radius = Math.max(20, Math.min(100, province.count * 10)); // Calculate radius based on count
            const fillOpacity = Math.max(0.3, Math.min(0.8, province.count / 10)); // Transparency
            
            return (
              <Circle
                key={province.name}
                center={[province.coordinates.lat, province.coordinates.lng]}
                radius={radius * 1000} // Convert to meters
                fillColor="#2e8a69"
                color="#1a5d4a"
                weight={2}
                opacity={0.8}
                fillOpacity={fillOpacity}
              >
                <Popup>
                  <div className="province-popup">
                    <div className="popup-title">{province.name}</div>
                    <div className="popup-activity-count">
                      <strong className="popup-count">{province.count}</strong> {province.count === 1 ? 'activity' : 'activities'}
                    </div>
                    
                    {/* Activities list */}
                    <div className="popup-activities-list" style={{ margin: '10px 0', fontSize: '12px' }}>
                      {province.activities.map((activity) => (
                        <div 
                          key={activity.activityId}
                          style={{
                            padding: '2px 0',
                            cursor: 'pointer',
                            color: '#2e8a69',
                            textDecoration: 'underline',
                            fontSize: '11px'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActivityClick(activity.activityId);
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = '#1e5f4a';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = '#2e8a69';
                          }}
                        >
                          • {activity.title.length > 30 ? `${activity.title.substring(0, 30)}...` : activity.title}
                        </div>
                      ))}
                      {province.count > 5 && (
                        <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
                          and {province.count - 5} other activities...
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>
      </div>

      {/* Statistics Cards */}
      <div className="activity-stats">
        <div className="stat-card">
          <div className="stat-number">{totalActivities}</div>
          <div className="stat-label">Total Activities</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalProvinces}</div>
          <div className="stat-label">Participating Provinces</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{averagePerProvince}</div>
          <div className="stat-label">Average per Province</div>
        </div>
        {mostActiveProvince && (
          <div className="stat-card">
            <div className="stat-number">{mostActiveProvince.count}</div>
            <div className="stat-label">Highest ({mostActiveProvince.name})</div>
          </div>
        )}
      </div>

      {/* Province List */}
      {provinceStats.length > 0 && (
        <div className="province-list">
          <h3 style={{ marginBottom: '1rem', color: '#2e8a69' }}>
            Details by Province/City
          </h3>
          {provinceStats.map((province: ProvinceCount) => (
            <div key={province.name} className="province-dropdown-container">
              <div 
                className="province-item clickable"
                onClick={() => handleProvinceClick(province.name)}
                style={{ cursor: 'pointer' }}
              >
                <span className="province-name">{province.name}</span>
                <span className="activity-count">{province.count} {province.count === 1 ? 'activity' : 'activities'}</span>
                <span className={`dropdown-arrow ${openDropdown === province.name ? 'open' : ''}`}>▼</span>
              </div>
              
              {/* Dropdown Content */}
              {openDropdown === province.name && (
                <div className="province-activities-dropdown">
                  {province.activities.map((activity) => (
                    <div 
                      key={activity.activityId}
                      className="activity-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivityClick(activity.activityId);
                      }}
                    >
                      <div className="activity-title">
                        {activity.title}
                      </div>
                      <div className="activity-date">
                        {new Date(activity.date).toLocaleDateString('vi-VN')}
                      </div>
                      {activity.description && (
                        <div className="activity-description">
                          {activity.description.length > 100 
                            ? `${activity.description.substring(0, 100)}...` 
                            : activity.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityMap;
