import React from "react";
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const Chart = () => {
 
    const data = {
      labels: ['Location 1', 'Location 2','Location 3'],
      datasets: [
        {
          label: 'Colors Distribution',
          data: [12, 12, 12], 
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',  
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',  
        
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
  
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  
    return (
      <>
      
      <div className="graph" style={{ width: '300px', height: '350px' }}>
        <h3>Time Spent at each Location</h3>
        <Doughnut data={data} options={options} />
      </div>
      </>
    );
  };
  
export default Chart;