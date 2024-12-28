import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = () => {
  // Sample JSON data
  const truckData = [
    {
      id: 2,
      time_stamp_enter: "2024-06-02T08:30:00",
      time_stamp_exit: "2024-06-02T12:30:00",
      truck_no: "KA01AB1234",
    },
    {
      id: 3,
      time_stamp_enter: "2024-06-03T07:00:00",
      time_stamp_exit: "2024-06-03T12:00:00",
      truck_no: "KA03EF9012",
    },
    {
      id: 4,
      time_stamp_enter: "2024-06-04T06:00:00",
      time_stamp_exit: "2024-06-04T13:00:00",
      truck_no: "KA04GH3456",
    },
  ];

  // Function to calculate duration in hours
  const calculateDuration = (enter, exit) => {
    const enterTime = new Date(enter);
    const exitTime = new Date(exit);
    return (exitTime - enterTime) / (1000 * 60 * 60); // Convert milliseconds to hours
  };

  return (
    <div>
      <h2>Individual Truck Duration Graphs</h2>
      {truckData.map((truck) => {
        const duration = calculateDuration(truck.time_stamp_enter, truck.time_stamp_exit);
        const chartData = {
          labels: ["Duration"],
          datasets: [
            {
              label: `Truck ${truck.truck_no}`,
              data: [duration],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Hours",
              },
            },
          },
        };

        return (
          <div key={truck.id} style={{ marginBottom: "20px" }}>
            <h3>{truck.truck_no}</h3>
            <Bar data={chartData} options={options} />
          </div>
        );
      })}
    </div>
  );
};

export default Chart;

