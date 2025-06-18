import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the new theme
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import AddProject from './pages/AddProject';

// Components
import Header from './components/Header';

// The theme is now imported from ./theme.js

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/add-project" element={<AddProject />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
