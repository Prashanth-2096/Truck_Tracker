import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? '←' : '→'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#" className="nav-item">
                <i className="fas fa-home"></i>
                <span className={isOpen ? 'show' : 'hide'}>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-item">
                <i className="fas fa-chart-bar"></i>
                <span className={isOpen ? 'show' : 'hide'}>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-item">
                <i className="fas fa-users"></i>
                <span className={isOpen ? 'show' : 'hide'}>Users</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav-item">
                <i className="fas fa-cog"></i>
                <span className={isOpen ? 'show' : 'hide'}>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {!isOpen && windowWidth < 768 && (
        <div className="mobile-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar; 