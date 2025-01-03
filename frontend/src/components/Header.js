import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={onMenuClick}>
            <i className="fas fa-bars"></i>
          </button>
          <NavLink to="/" className="nav-link">
            <i class="fa-solid fa-truck"></i>
            <h1>Truck Tracker</h1>
          </NavLink>
          {/* <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input> */}
          
        </div>

        <nav className="desktop-nav">
          <NavLink to="/" className="nav-link">
            <i className="fas fa-home"></i>
            Dashboard
          </NavLink>
          <NavLink to="/analytics" className="nav-link">
            <i className="fas fa-chart-bar"></i>
            Analytics
          </NavLink>
          <NavLink to="/users" className="nav-link">
            <i className="fas fa-users"></i>
            Users
          </NavLink>
          <NavLink to="/settings" className="nav-link">
            <i className="fas fa-cog"></i>
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header; 