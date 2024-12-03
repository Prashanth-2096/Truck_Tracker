import React, { useState } from 'react';
import './App.css';
import Headerpart from './Headerpart';
import Dashboard from './Dashboard';
import Footer from './Footer';


function App() {
    const [selectedTruck, setSelectedTruck] = useState(null);

    return (
        <div className="App">
            <Headerpart />
            <Dashboard />
            <Footer />
        </div>
    );
}

export default App;
