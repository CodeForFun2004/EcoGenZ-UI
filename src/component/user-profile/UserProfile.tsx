import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { useAppDispatch } from '../../redux/hook';
import { updateUserThunk } from '../../redux/features/auth/authThunk';
import './UserProfile.css';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    profilePhotoUrl: '',
    bio: '',
    location: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login-page');
      return;
    }
    
    setFormData({
      userName: user.userName || '',
      email: user.email || '',
      profilePhotoUrl: user.profilePhotoUrl || '',
      bio: '',
      location: '',
    });
    setPreviewUrl(user.profilePhotoUrl || '');
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setFormData(prev => ({
          ...prev,
          profilePhotoUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await dispatch(updateUserThunk({
        userId: user.userId,
        userData: formData
      })).unwrap();
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="eco-particles"></div>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-6">
            <div className="profile-section-wrapper">
              {/* Profile Card */}
              <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar-container">
                  <div className="avatar-ring">
                    <img
                      src={
                        previewUrl && previewUrl.trim() !== ""
                          ? previewUrl
                          : "https://i.pravatar.cc/120"
                      }
                      alt="Profile Avatar"
                      className="avatar-image"
                    />
                  </div>
                  <div className="eco-badge">
                    <i className="fa fa-leaf"></i>
                  </div>
                </div>
                
                <div className="profile-info">
                  <h2 className="profile-name">{user.userName}</h2>
                  <p className="profile-email">{user.email}</p>
                  <div className="eco-level">
                    <span className="level-badge">Eco Warrior</span>
                  </div>
                </div>

                <div className="impact-showcase">
                  <div className="impact-item">
                    <div className="impact-icon">
                      <i className="fa fa-leaf"></i>
                    </div>
                    <div className="impact-details">
                      <span className="impact-value">{user.impactPoints || 0}</span>
                      <span className="impact-label">Impact Points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="col-lg-7 col-md-6">
            <div className="tabs-section-wrapper">
            {/* Tabs Navigation */}
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <i className="fa fa-user"></i>
                Profile
              </button>
              <button 
                className={`tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
                onClick={() => setActiveTab('activities')}
              >
                <i className="fa fa-chart-line"></i>
                Activities
              </button>
              <button 
                className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
                onClick={() => setActiveTab('achievements')}
              >
                <i className="fa fa-trophy"></i>
                Achievements
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'profile' && (
                <div className="profile-content">
                  <div className="edit-form-container">
                    <h3 className="section-title">
                      <i className="fa fa-edit"></i>
                      Profile Information
                    </h3>
                    <form onSubmit={handleSubmit} className="eco-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="userName">
                            <i className="fa fa-user"></i>
                            Username
                          </label>
                          <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="form-control eco-input"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">
                            <i className="fa fa-envelope"></i>
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control eco-input"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="profilePhoto">
                          <i className="fa fa-camera"></i>
                          Profile Photo
                        </label>
                        <div className="file-input-container">
                          <input
                            type="file"
                            id="profilePhoto"
                            name="profilePhoto"
                            onChange={handleFileChange}
                            className="form-control eco-input file-input"
                            accept="image/*"
                          />
                          <div className="file-input-preview">
                            {previewUrl ? (
                              <img src={previewUrl} alt="Preview" className="preview-image" />
                            ) : (
                              <div className="preview-placeholder">
                                <i className="fa fa-image"></i>
                                <span>Choose an image</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="bio">
                          <i className="fa fa-quote-left"></i>
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                          className="form-control eco-input"
                          rows={3}
                          placeholder="Tell us about your eco journey..."
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="location">
                          <i className="fa fa-map-marker"></i>
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="form-control eco-input"
                          placeholder="City, Country"
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          type="submit"
                          className="btn eco-btn-success save-btn"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <i className="fa fa-spinner fa-spin"></i>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="fa fa-save"></i>
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="activities-content">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="fa fa-tree"></i>
                      </div>
                      <div className="stat-info">
                        <h4>0</h4>
                        <p>Trees Planted</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="fa fa-recycle"></i>
                      </div>
                      <div className="stat-info">
                        <h4>0</h4>
                        <p>Items Recycled</p>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <i className="fa fa-calendar-check-o"></i>
                      </div>
                      <div className="stat-info">
                        <h4>0</h4>
                        <p>Activities Joined</p>
                      </div>
                    </div>
                  </div>

                  <div className="recent-activities">
                    <h3 className="section-title">
                      <i className="fa fa-clock-o"></i>
                      Recent Activities
                    </h3>
                    <div className="activity-list">
                      <div className="activity-placeholder">
                        <i className="fa fa-leaf"></i>
                        <p>Start your eco journey by joining activities!</p>
                        <button className="btn eco-btn-primary">
                          Explore Activities
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="achievements-content">
                  <h3 className="section-title">
                    <i className="fa fa-trophy"></i>
                    Achievements & Badges
                  </h3>
                  
                  <div className="achievements-grid">
                    <div className="achievement-item locked">
                      <div className="achievement-icon">
                        <i className="fa fa-leaf"></i>
                      </div>
                      <div className="achievement-info">
                        <h4>Green Starter</h4>
                        <p>Join your first eco activity</p>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                        <span className="progress-text">0/1</span>
                      </div>
                    </div>

                    <div className="achievement-item locked">
                      <div className="achievement-icon">
                        <i className="fa fa-tree"></i>
                      </div>
                      <div className="achievement-info">
                        <h4>Tree Hugger</h4>
                        <p>Plant 10 trees</p>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                        <span className="progress-text">0/10</span>
                      </div>
                    </div>

                    <div className="achievement-item locked">
                      <div className="achievement-icon">
                        <i className="fa fa-recycle"></i>
                      </div>
                      <div className="achievement-info">
                        <h4>Recycling Champion</h4>
                        <p>Recycle 50 items</p>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                        <span className="progress-text">0/50</span>
                      </div>
                    </div>

                    <div className="achievement-item locked">
                      <div className="achievement-icon">
                        <i className="fa fa-users"></i>
                      </div>
                      <div className="achievement-info">
                        <h4>Community Leader</h4>
                        <p>Organize 5 activities</p>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '0%' }}></div>
                        </div>
                        <span className="progress-text">0/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
