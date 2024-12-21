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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      
      <div className="grid-container">
        <div className="card">
          <h3 className="card-title">Active Users</h3>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        
        <div className="card">
          <h3 className="card-title">User Groups</h3>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
      </div>
    </div>
  );
};

export default Users; 