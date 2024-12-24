import React from 'react';

const Users = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Users</h1>
        <p>Manage your users and permissions</p>
      </div>
      
      <div className="card">
        <h3 className="card-title">User List</h3>
        <p>Provides List of users.</p>
      </div>
      
      <div className="grid-container">
        <div className="card">
          <h3 className="card-title">Active Users</h3>
          <p>Provides list of active users.</p>
        </div>
        
    
      </div>
    </div>
  );
};

export default Users; 