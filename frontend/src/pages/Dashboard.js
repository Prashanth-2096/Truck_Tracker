import React from 'react';
import { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import Map from '../components/Map';
import ReactDOM from 'react-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [trucks, setTrucks] = useState([]); // State to store all truck data
  const [selectedTruck, setSelectedTruck] = useState(null); // State to store the selected truck

  // Function to fetch truck data from the API
  const fetchTruckData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/"); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setTrucks(data); // Update the trucks state with API data
      } else {
        console.error("Failed to fetch truck data:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching truck data:", err);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTruckData();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Truck Tracker Dashboard</h1>
      </div>
      <h2>List of Trucks</h2>
      <div className="truck-list">
        {trucks.length === 0 ? (
          <p>Loading trucks...</p>
        ) : (
          trucks.map((truck, index) => (
          <div key={index} className="card">
            <p>Truck Number: {truck.truck_no}</p>
            <p>Truck Type: {truck.truck_type}</p>
            <button
              className="view-details-button"
              onClick={() => setSelectedTruck(truck)}
            >
              View Details
            </button>
          </div>
          ))
        )}
      </div>

      {selectedTruck && (
        <div className="modal" onClick={() => setSelectedTruck(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Truck Details</h3>
            <p>Truck Number: {selectedTruck.truck_no}</p>
            <p>Truck Type: {selectedTruck.truck_type}</p>
            <p>Entered Location: {selectedTruck.location_enter}</p>
            <p>Exited Location: {selectedTruck.location_exit}</p>
            <p>Time of Entry: {new Date(selectedTruck.time_stamp_enter).toLocaleString()}</p>
            <p>Time of Exit: {new Date(selectedTruck.time_stamp_exit).toLocaleString()}</p>
            <button className="close-button" onClick={() => setSelectedTruck(null)}>
              Close
            </button>

            {/* Placeholder for Chart */}
            <div className="chart-map-container">
              <div id="chart">
                <Chart />
            </div>
            <div id="map">
                <Map />
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
