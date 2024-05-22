import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  );
}

export default App;
