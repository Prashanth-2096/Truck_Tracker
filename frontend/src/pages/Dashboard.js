import React from 'react';
import { useState } from 'react';
import Chart from '../components/Chart';
import Map from '../components/Map';

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
const truckData = [
  { name: 'Truck 1',
      truck_id: 'KA01234',

      location_1: 'Entered_Time=09:12 and Departed_Time=09:24',
      location_2: 'Entered_Time=10:12 and Departed_Time=10:24',
      location_3: 'Entered_Time=11:12 and Departed_Time=11:24'
      
  },
  { name: 'Truck 2', 
      truck_id: 'KA01234',
      location_1: 'Entered_Time=09:12 and Departed_Time=09:24',
      location_2: 'Entered_Time=10:12 and Departed_Time=10:24',
      location_3: 'Entered_Time=11:12 and Departed_Time=11:24' 
  },
  { name: 'Truck 3', 
      truck_id: 'KA01234',
      location_1: 'Entered_Time=09:12 and Departed_Time=09:24',
      location_2: 'Entered_Time=10:12 and Departed_Time=10:24',
      location_3: 'Entered_Time=11:12 and Departed_Time=11:24'
  },
  
];

const Dashboard = () => {
  const [selectedTruck, setSelectedTruck] = useState(null);
  
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Truck Tracker Dashboard</h1> 
      </div>
      <h2 id="h2_title">List of Trucks </h2>
            {truckData.map((truck, index) => (
                    <div key={index} className="card" onClick={() => setSelectedTruck(truck)}>
                    {truck.name}
                    </div>
                
            ))}

            {selectedTruck && (
                <div className="modal" onClick={() => setSelectedTruck(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{selectedTruck.name}</h2>
                        <h3>Truck Number: {selectedTruck.truck_id}</h3>
                        <div id="bar">                        
                        </div>
                        <p >Location 1 :{selectedTruck.location_1}</p>
                        <p>Location 2 :{selectedTruck.location_2}</p>
                        <p>Location 3 :{selectedTruck.location_3}</p>
                        <button className="close-button" onClick={() => setSelectedTruck(null)}>Close</button>
                        <div id="chart">
                           <Chart />  
                        </div>
                        <div id="map">
                          <Map />
                        </div>
                       
                    </div>
                </div>
            )}

    </div>
  );
};

export default Dashboard; 