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
        <p>This list provides Performance Metrics</p>
      </div>
      
      <div className="grid-container">
        <div className="card">
          <h3 className="card-title">Traffic Analysis</h3>
          <p>This provides the Traffic Analysis</p>
        </div>
        
        <div className="card">
          <h3 className="card-title">User Engagement</h3>
          <p>Provides list of users</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 