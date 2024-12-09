import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" className="nav-item" onClick={onClose}>
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" className="nav-item" onClick={onClose}>
                <i className="fas fa-chart-bar"></i>
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className="nav-item" onClick={onClose}>
                <i className="fas fa-users"></i>
                <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="nav-item" onClick={onClose}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
