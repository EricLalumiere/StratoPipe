import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

import AssetUpload from "./components/AssetUpload";
import NotificationHandler from "./notifications/NotificationHandler";
import Register from "./components/Register";
import Login from "./components/Login";
import ProjectManagement from "./components/ProjectManagement";
import './styles/AssetList.css';
import AssetList from './components/AssetList.js';
// import Home from './Home'; // Remove or keep commented if you don’t have this file

const App = () => {
  return (
    <Router>
      <div>
        <header style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff" }}>
          <h1>StratoPipe</h1>
          <nav>
            <ul style={{ listStyleType: "none", display: "flex", gap: "15px", padding: 0 }}>
              <li><Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>Register</Link></li>
              <li><Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link></li>
              <li><Link to="/assets" style={{ color: "#fff", textDecoration: "none" }}>Asset List</Link></li>
              <li><Link to="/upload" style={{ color: "#fff", textDecoration: "none" }}>Asset Upload</Link></li>
              <li><Link to="/project-management" style={{ color: "#fff", textDecoration: "none" }}>Project Management</Link></li>
            </ul>
          </nav>
        </header>

        <NotificationHandler />

        <main style={{ padding: "20px" }}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Navigate replace to="/projects" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/assets" element={<AssetList />} />
            <Route path="/upload" element={<AssetUpload />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/project-management" element={<ProjectManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
