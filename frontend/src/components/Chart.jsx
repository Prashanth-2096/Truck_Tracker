import React from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ truckData }) => {
  // Function to format duration in minutes to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Function to get time difference in minutes
  const getTimeDifferenceInMinutes = (time1, time2) => {
    if (!time1 || !time2) return 0;
    return Math.round((new Date(time2) - new Date(time1)) / (1000 * 60));
  };

  // Process location data and calculate durations
  const processLocationData = () => {
    if (!truckData) return { locations: [], totalTime: 0 };

    const locationOrder = [
      { name: truckData.location_enter, time: truckData.time_stamp_enter },
      { name: 'Location P', time: truckData.location_p },
      { name: 'Location Q', time: truckData.location_q },
      { name: 'Location R', time: truckData.location_r },
      { name: 'Location S', time: truckData.location_s },
      { name: 'Location T', time: truckData.location_t },
      { name: 'Location U', time: truckData.location_u },
      { name: 'Location V', time: truckData.location_v },
      { name: 'Location W', time: truckData.location_w },
      { name: truckData.location_exit, time: truckData.time_stamp_exit }
    ].filter(loc => loc.time !== null);

    const locations = locationOrder.map((loc, index) => {
      if (index === locationOrder.length - 1) {
        return { ...loc, duration: 0 };
      }
      return {
        ...loc,
        duration: getTimeDifferenceInMinutes(loc.time, locationOrder[index + 1].time)
      };
    });

    const totalTime = getTimeDifferenceInMinutes(
      truckData.time_stamp_enter,
      truckData.time_stamp_exit
    );

    return { locations, totalTime };
  };

  const { locations, totalTime } = processLocationData();

  const data = {
    labels: locations.map(loc => loc.name),
    datasets: [
      {
        label: 'Time Spent(min)',
        data: locations.map(loc => loc.duration),
        backgroundColor: locations.map((_, index) => {
          if (index === 0) return 'rgba(76, 175, 80, .6)'; // Start
          if (index === locations.length - 1) return 'rgba(244, 67, 54, .6)'; // End
          return 'rgba(33, 150, 243, .6)'; // Middle points
        }),
        borderColor: locations.map((_, index) => {
          if (index === 0) return 'rgb(76, 175, 80)';
          if (index === locations.length - 1) return 'rgb(244, 67, 54)';
          return 'rgb(33, 150, 243)';
        }),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Total Time in Plant: ${formatDuration(totalTime)}`,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const duration = context.raw;
            return `Time spent: ${formatDuration(duration)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Time (minutes)',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="#chart">
      <h3>Time Analysis</h3>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
      <div className="time-details">
        {locations.map((loc, index) => (
          <div key={index} className="time-item">
            <span className="location-name">{loc.name}</span>
            <span className="time-info">
              {new Date(loc.time).toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
              {loc.duration > 0 && ` (${formatDuration(loc.duration)} until next stop)`}
            </span>
          </div>
        ))}
        <div className="total-time">
          <strong>Total Time in Plant: {formatDuration(totalTime)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Chart;
