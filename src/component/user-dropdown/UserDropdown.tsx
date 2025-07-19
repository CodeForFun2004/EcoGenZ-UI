import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { logout } from '../../redux/features/auth/authSlice';
import type { User } from '../../redux/features/auth/authTypes';
import { truncateUsername, truncateText } from '../../utils/textUtils';
import './UserDropdown.css';

interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout());
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    console.log('Dropdown toggle clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    console.log('User trigger clicked');
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <div 
        className="user-trigger" 
        onClick={handleTriggerClick}
        onMouseDown={(e) => {
          console.log('Mouse down on user trigger');
          e.stopPropagation();
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="d-flex align-items-center gap-2">
          <img
            src={
              user.profilePhotoUrl && user.profilePhotoUrl.trim() !== ""
                ? user.profilePhotoUrl
                : "https://i.pravatar.cc/40"
            }
            alt="avatar"
            className="user-avatar"
          />
          <span className="user-name" title={user.userName}>
            {truncateUsername(user.userName, 12)}
          </span>
          <i className={`fa fa-chevron-${isOpen ? 'up' : 'down'} dropdown-arrow`}></i>
        </div>
      </div>

      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <div className="dropdown-header">
            <div className="user-info">
              <img
                src={
                  user.profilePhotoUrl && user.profilePhotoUrl.trim() !== ""
                    ? user.profilePhotoUrl
                    : "https://i.pravatar.cc/40"
                }
                alt="avatar"
                className="user-avatar-large"
              />
              <div className="user-details">
                <div className="user-name-full" title={user.userName}>
                  {truncateUsername(user.userName, 20)}
                </div>
                <div className="user-email" title={user.email}>
                  {truncateText(user.email, 25)}
                </div>
                <div className="user-points">
                  <i className="fa fa-star"></i>
                  <span>{user.impactPoints || 0} Points</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-body">
            <Link 
              to="/user-profile" 
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              <span>My Profile</span>
            </Link>
            
            {/* <Link 
              to="/my-activities" 
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              <i className="fa fa-calendar"></i>
              <span>My Activities</span>
            </Link> */}
            
            {/* <Link 
              to="/settings" 
              className="dropdown-item"
              onClick={() => setIsOpen(false)}
            >
              <span>Settings</span>
            </Link> */}
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-footer">
            <button 
              onClick={handleLogout}
              className="dropdown-item logout-item"
            >
              <i className="fa fa-sign-out"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
    </div>
  );
};

export default UserDropdown;
