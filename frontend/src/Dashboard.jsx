import React from "react";
import { useState } from "react";


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

function Dashboard(){
    const [selectedTruck, setSelectedTruck] = useState(null);
    return(
        <>
           <h2>List of Trucks </h2>
            {truckData.map((truck, index) => (
                <div key={index} className="card" onClick={() => setSelectedTruck(truck)}>
                    {truck.name}
                </div>
            ))}

            {selectedTruck && (
                <div className="modal" onClick={() => setSelectedTruck(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{selectedTruck.name}</h2>
                        <h3>Truck_Number: {selectedTruck.truck_id}</h3>
                        <p>Location 1 :{selectedTruck.location_1}</p>
                        <p>Location 2 :{selectedTruck.location_2}</p>
                        <p>Location 3 :{selectedTruck.location_3}</p>
                        <button className="close-button" onClick={() => setSelectedTruck(null)}>Close</button>
                    </div>
                </div>
            )} 
        </>
    );
}

export default Dashboard;