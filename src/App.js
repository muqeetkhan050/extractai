

import './App.css';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  // Track login state reactively
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

  return (
    <Routes>
      {/* Pass setIsAuthenticated to Login so it can update App state */}
      <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Main route */}
      <Route
        path="/Main"
        element={
          isAuthenticated ? <Main /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
