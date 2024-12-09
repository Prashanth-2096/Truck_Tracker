import React from 'react';

const Analytics = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>View your analytics and statistics</p>
      </div>
      
      <div className="card">
        <h3 className="card-title">Performance Metrics</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      
      <div className="grid-container">
        <div className="card">
          <h3 className="card-title">Traffic Analysis</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        
        <div className="card">
          <h3 className="card-title">User Engagement</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 