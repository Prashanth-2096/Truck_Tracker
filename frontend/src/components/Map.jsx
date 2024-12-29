import React from "react";
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Map({ truckData }) {
  // Function to format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Predefined coordinates for each location to create a map-like view
  const locationCoordinates = {
    'Gate-a': [5, 50],
    'Gate-b': [50, 5],
    'Gate-c': [95, 50],
    'Gate-d': [55,95],
    'Location P': [15, 50],
    'Location Q': [30, 70],
    'Location R': [50, 70],
    'Location S': [85, 70],
    'Location T': [85, 50],
    'Location U': [85, 15],
    'Location V': [50, 15],
    'Location W': [15, 15]
  };

  // Function to get all valid locations and timestamps
  const getLocationData = (truck) => {
    const locations = [
      { name: truck.location_enter, time: truck.time_stamp_enter },
      { name: 'Location P', time: truck.location_p },
      { name: 'Location Q', time: truck.location_q },
      { name: 'Location R', time: truck.location_r },
      { name: 'Location S', time: truck.location_s },
      { name: 'Location T', time: truck.location_t },
      { name: 'Location U', time: truck.location_u },
      { name: 'Location V', time: truck.location_v },
      { name: 'Location W', time: truck.location_w },
      { name: truck.location_exit, time: truck.time_stamp_exit }
    ].filter(loc => loc.time !== null)
    .map(loc => ({
      ...loc,
      timestamp: new Date(loc.time).getTime()
    }))
    .sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp

    return locations;
  };

  const locations = truckData ? getLocationData(truckData) : [];
  
  // Create dataset for points and path
  const points = locations.map(loc => ({
    x: locationCoordinates[loc.name]?.[0] || 0,
    y: locationCoordinates[loc.name]?.[1] || 0,
    location: loc.name,
    time: loc.time
  }));

  const chartData = {
    datasets: [
      // Path line
      {
        type: 'line',
        label: 'Path',
        data: points,
        borderColor: 'rgba(75, 192, 192, 0.5)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        showLine: true,
        pointRadius: 0,
      },
      // Location points
      {
        type: 'scatter',
        label: `Truck ${truckData?.truck_no || ''} Locations`, // Fixed here
        data: points,
        backgroundColor: 'rgb(75, 192, 192)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 12,
        pointBackgroundColor: points.map((_, index) => 
          index === 0 ? '#4CAF50' : // Start point
          index === points.length - 1 ? '#f44336' : // End point
          '#2196F3' // Middle points
        ),
      }
      
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = points[context.dataIndex];
            return [
                `Location: ${point.location}`,
                `Time: ${formatTime(point.time)}`
              ];
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          display: false
        }
      }
    },
    layout: {
      padding: 20
    }
  };

  return (
    <div className="#map">
      <h3 className="map-title">Map</h3>
      <div className="map-chart">
        <Scatter data={chartData} options={options} />
      </div>
      <div className="location-legend">
        <div className="legend-item">
          <span className="legend-dot start"></span>
          <span>Start Location</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot middle"></span>
          <span>Checkpoints</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot end"></span>
          <span>End Location</span>
        </div>
      </div>
    </div>
  );
}

export default Map;