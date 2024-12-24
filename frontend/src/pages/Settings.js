import React from 'react';

const Settings = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your application settings</p>
      </div>
      
      <div className="grid-container">
        <div className="card">
          <h3 className="card-title">General Settings</h3>
          <p> This displays the general settings</p>
        </div>
        
        
        <div className="card">
          <h3 className="card-title">Preferences</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 