import React, { useState } from 'react';
import './ImageDetection.css';

const ImageDetection = () => {
  const images = [
    "/assets/KA152249.jpg",
    "/assets/KA19AA8149.jpg",
    "/assets/KA12A7926.jpg",
    "/assets/KA16AA7198.jpg",
    "/assets/KA19AC4999.jpg",
    "/assets/KA19AE6165.jpg",
    "/assets/KA20AA3608_MIXED.jpg",
    "/assets/KA20AB7897.jpg",
    "/assets/KA20AB3806.jpg",
    "/assets/MH46F4951.jpg"
  ];

  const [loadingStates, setLoadingStates] = useState(Array(images.length).fill(false));
  const [plateNumbers, setPlateNumbers] = useState(Array(images.length).fill(null));

  const fetchNumberPlate = async (index) => {
    // Set loading state for this image
    setLoadingStates((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    try {
      // Simulate a GET request (Replace with your backend endpoint)
      const response = await fetch(`http://127.0.0.1:8000/truck/{truck_no}=${index}`);
      const data = await response.json();

      // Update the plate number
      setPlateNumbers((prev) => {
        const updated = [...prev];
        updated[index] = data.plateNumber; // Backend should return the plate number
        return updated;
      });
    } catch (error) {
      console.error('Error fetching plate number:', error);
    } finally {
      // Remove loading state
      setLoadingStates((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };

  return (
    <div className="gallery">
      {images.map((url, index) => (
        <div className="gallery-item" key={index}>
            {console.log(url)}
          <img src={url} alt={`Image ${index + 1}`} />
          <button
            onClick={() => fetchNumberPlate(index)}
            disabled={loadingStates[index]}
            className="fetch-button"
          >
            {loadingStates[index] ? 'Loading...' : 'Plate No'}
          </button>
          {plateNumbers[index] && <p className="plate-number">Plate Number: {plateNumbers[index]}</p>}
        </div>
      ))}
    </div>
  );
};

export default ImageDetection;
