
import { Box } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3'; // hoặc EmojiPeople

const icons = [
  <EventAvailableIcon sx={{ fontSize: 88, color: 'white' }} />,
  <MonitorHeartIcon sx={{ fontSize: 88, color: 'white' }} />,
  <VolunteerActivismIcon sx={{ fontSize: 88, color: 'white' }} />,
  <Diversity3Icon sx={{ fontSize: 88, color: 'white' }} />
];

const Counter = () => {
  return (
    <div className="counter_area">
      <div className="container">
        <div className="counter_bg overlay">
          <div className="row">
            {icons.map((icon, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="single_counter d-flex align-items-center justify-content-center text-white text-center py-4">
                  <Box className="icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
                    {icon}
                  </Box>
                  <div className="events">
                    <h3 className="counter m-0">120</h3>
                    <p className="m-0">Finished Event</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
