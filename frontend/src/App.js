import React, { useState } from 'react';
import './App.css';
import Headerpart from './Components/Headerpart';
import Dashboard from './Components/Dashboard';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';

function App() {
    const [selectedTruck, setSelectedTruck] = useState(null);

    return (
        <div className="App">
            <Headerpart />
            <section className="dash_and_side">
                <Sidebar />
                <Dashboard />
            </section>
            <Footer />
        </div>
    );
}

export default App;
