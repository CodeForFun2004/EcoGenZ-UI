export default function ProfileCard() {
    return (
      <div className="profile-card">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
          alt="Rey Mibourne"
          className="profile-avatar"
        />
        <h3 className="profile-name">Rey Mibourne</h3>
        <div className="level-badge">Level 3</div>
        <div className="stars">
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    );
  }