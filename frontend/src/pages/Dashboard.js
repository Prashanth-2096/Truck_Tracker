import React from 'react';
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
  // Dummy data for charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Deliveries Completed',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: ['Truck A', 'Truck B', 'Truck C', 'Truck D', 'Truck E'],
    datasets: [
      {
        label: 'Distance Covered (km)',
        data: [300, 450, 280, 390, 420],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Active', 'Maintenance', 'Idle'],
    datasets: [
      {
        data: [12, 3, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Truck Tracker Dashboard</h1>
        <p>Monitor your fleet's performance and status</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <i className="fas fa-truck"></i>
          <div className="stat-info">
            <h3>20</h3>
            <p>Total Trucks</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-route"></i>
          <div className="stat-info">
            <h3>150</h3>
            <p>Active Routes</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-box"></i>
          <div className="stat-info">
            <h3>1,234</h3>
            <p>Deliveries</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-wrench"></i>
          <div className="stat-info">
            <h3>3</h3>
            <p>In Maintenance</p>
          </div>
        </div>
      </div>

      <div className="grid-container">
        <div className="card chart-card">
          <h3 className="card-title">Monthly Deliveries</h3>
          <Line data={lineChartData} />
        </div>
        
        <div className="card chart-card">
          <h3 className="card-title">Distance by Truck</h3>
          <Bar data={barChartData} />
        </div>
        
        <div className="card chart-card">
          <h3 className="card-title">Fleet Status</h3>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 