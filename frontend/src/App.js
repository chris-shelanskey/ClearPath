import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "1rem", background: "#eee" }}>
          <a href="/" style={{ marginRight: "1rem" }}>Dashboard</a>
          <a href="/tasks" style={{ marginRight: "1rem" }}>Tasks</a>
          <a href="/insights">Insights</a>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
