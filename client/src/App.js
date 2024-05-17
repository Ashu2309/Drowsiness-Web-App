import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './Pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
