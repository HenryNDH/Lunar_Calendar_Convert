// src/App.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <>
        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          <Outlet />
        </main>
        <footer style={{ padding: '10px 20px', borderTop: '1px solid #ccc', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
          <p>&copy; 2025 Lunar Calendar App</p>
        </footer>
      </>
  );
}

export default App;