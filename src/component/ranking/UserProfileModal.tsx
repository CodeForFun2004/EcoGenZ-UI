import { useState, useEffect } from "react";
import type { User } from "../../redux/features/auth/authTypes";
import "./UserProfileModal.css";

interface UserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ user, isOpen, onClose }: UserProfileModalProps) {
  const [achievements] = useState([
    { id: 1, title: "Eco Warrior", description: "Completed 10 environmental activities", icon: "🌱" },
    { id: 2, title: "Tree Hugger", description: "Planted 5 trees", icon: "🌳" },
    { id: 3, title: "Clean Ocean", description: "Participated in 3 beach cleanups", icon: "🌊" },
    { id: 4, title: "Green Commuter", description: "Used green transport for 30 days", icon: "🚲" },
  ]);

  const [level, setLevel] = useState(1);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (user?.impactPoints) {
      const points = user.impactPoints;
      let calculatedLevel = 1;
      let calculatedPercentage = 0;

      if (points >= 100) {
        calculatedLevel = 5;
        calculatedPercentage = 100;
      } else if (points >= 75) {
        calculatedLevel = 4;
        calculatedPercentage = ((points - 75) / 25) * 100;
      } else if (points >= 50) {
        calculatedLevel = 3;
        calculatedPercentage = ((points - 50) / 25) * 100;
      } else if (points >= 25) {
        calculatedLevel = 2;
        calculatedPercentage = ((points - 25) / 25) * 100;
      } else if (points >= 1) {
        calculatedLevel = 1;
        calculatedPercentage = (points / 25) * 100;
      }

      setLevel(calculatedLevel);
      setPercentage(Math.min(calculatedPercentage, 100));
    }
  }, [user]);

  const renderStars = (level: number) =>
    Array.from({ length: level }, (_, i) => <span key={i} className="star">★</span>);

  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="profile-modal-header">
          <img
            src={user.profilePhotoUrl || "/Helpers/profile_base.jpg"}
            alt={user.userName}
            className="profile-modal-avatar"
          />
          <div className="profile-modal-info">
            <h2 className="profile-modal-name">{user.userName}</h2>
            <div className="profile-modal-email">{user.email}</div>
            <div className="profile-modal-role">{user.role || "User"}</div>
          </div>
        </div>

        <div className="profile-modal-stats">
          <div className="stat-item">
            <div className="stat-label">Impact Points</div>
            <div className="stat-value">{user.impactPoints || 0}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Level</div>
            <div className="stat-value">{level}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Achievements</div>
            <div className="stat-value">{achievements.length}</div>
          </div>
        </div>

        <div className="profile-modal-level">
          <div className="level-header">
            <h3>Level {level}</h3>
            <div className="stars-container">{renderStars(level)}</div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-modal">
              <div
                className="progress-fill-modal"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="progress-text-modal">
              {Math.round(percentage)}% to next level
            </div>
          </div>
        </div>

        <div className="profile-modal-achievements">
          <h3>Recent Achievements</h3>
          <div className="achievements-grid">
            {achievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="achievement-item">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-info">
                  <div className="achievement-title">{achievement.title}</div>
                  <div className="achievement-description">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-modal-actions">
          <button className="btn-view-profile">View Full Profile</button>
          <button className="btn-send-message">Send Message</button>
        </div>
      </div>
    </div>
  );
}
