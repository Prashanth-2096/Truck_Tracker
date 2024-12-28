import React from "react";


const events = [
  { label: "Entry Gate", date: "01:28:13" },
  { label: "Exit Gate", date: "02:05:09" },
];

const Map = () => {
  return (
    <>
    
    <div className="timeline-container">
    <h2 id="mapheader">Map</h2>
      <div className="timeline">
        
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-circle"></div>
            <div className="timeline-content">
              <p className="timeline-label">{event.label}</p>
              <p className="timeline-date">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Map;