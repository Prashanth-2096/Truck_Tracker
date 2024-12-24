import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on initial load
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button className={`hamburger-btn ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          {!isMobile && (
            <button className="toggle-btn" onClick={toggleSidebar}>
              {isOpen ? '←' : '→'}
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" className="nav-item" onClick={() => isMobile && setIsOpen(false)}>
                <i className="fas fa-home"></i>
                <span className={isOpen ? 'show' : 'hide'}>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" className="nav-item" onClick={() => isMobile && setIsOpen(false)}>
                <i className="fas fa-chart-bar"></i>
                <span className={isOpen ? 'show' : 'hide'}>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" className="nav-item" onClick={() => isMobile && setIsOpen(false)}>
                <i className="fas fa-users"></i>
                <span className={isOpen ? 'show' : 'hide'}>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="nav-item" onClick={() => isMobile && setIsOpen(false)}>
                <i className="fas fa-cog"></i>
                <span className={isOpen ? 'show' : 'hide'}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && isMobile && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;