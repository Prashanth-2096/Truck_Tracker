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

// truck_no: str,
//truck_type: str,
//location_enter: str,
//location_exit: str,
//time_stamp_enter: datetime,
//time_stamp_exit: datetime

// const truckData = [
//   { name: 'Truck 1',
//       truck_id: 'KA01234',

//       location_1: 'Entered_Time=09:12 and Departed_Time=09:24',
//       location_2: 'Entered_Time=10:12 and Departed_Time=10:24',
//       location_3: 'Entered_Time=11:12 and Departed_Time=11:24'
      
//   },
//   { name: 'Truck 2', 
//       truck_id: 'KA01234',
//       location_1: 'Entered_Time=09:12 and Departed_Time=09:24',
//       location_2: 'Entered_Time=10:12 and Departed_Time=10:24',
//       location_3: 'Entered_Time=11:12 and Departed_Time=11:24' 
//   },
//   { name: 'Truck 3', 
//       truck_id: 'KA01234',
//       location_1: 'Entered_Time=09:12 and Departed_Time=09:24',
//       location_2: 'Entered_Time=10:12 and Departed_Time=10:24',
//       location_3: 'Entered_Time=11:12 and Departed_Time=11:24'
//   },
  
// ];



const Dashboard = () => {
  const [selectedTruck, setSelectedTruck] = useState(null);

  const fetchTruckData = async () => {
    try {
      const response = await fetch(""); // Replace with your API endpoint
      if (response.ok) {
        const truckData = await response.json();
  
        truckData.map((item) => {
          truck_id = item.truck_no;
          truck_enter = item.location_enter;
          truck_exit = item.location_exit;
          time_in = item.time_stamp_enter;
          time_out = item.time_stamp_exit;
        } );
        //setData(abilityNames);
        setSelectedTruck(truckData)
        

      }
    } catch (err) {
      console.error("Error fetching truck data:", err);
    }
  };


  useEffect(() => {
    fetchTruckData();
  }, []);
  
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
                        <h3 id="truck_no">Truck Number: {selectedTruck.truck_id}</h3>
                        <div id="bar">                        
                        </div>
                        <p >Gate Entered :{truck_enter}</p>
                        <p>Gate Exitied :{truck_exit}</p>
                        <p>Time of  Entry:{time_in}</p>
                        <p>Time of  Exit:{time_out}</p>
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
