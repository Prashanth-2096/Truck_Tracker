import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import PrivacyP from './pages/PrivacyP';
import ImageDetection from './components/ImageDetection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/ImageDetection" element={<ImageDetection/>}/>
              <Route path="/privacy" element={<PrivacyP />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;