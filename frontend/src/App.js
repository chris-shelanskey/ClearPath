// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Insights from "./pages/Insights";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-shell">
        {/* NAVBAR */}
        <nav className="nav-shell">
          <div className="nav-inner">
            <div className="nav-logo">
              <span className="nav-logo-dot" />
              <span>ClearPath</span>
            </div>

            <div className="nav-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " nav-link-active" : "")
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " nav-link-active" : "")
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " nav-link-active" : "")
                }
              >
                Insights
              </NavLink>
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
