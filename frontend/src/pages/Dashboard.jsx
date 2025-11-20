import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import "./Dashboard.css"; // we’ll create this next

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics().then(res => setStats(res.data));
  }, []);

  if (!stats) return <p className="loading">Loading Dashboard...</p>;

  return (
    <div className="dashboard-shell">
      <h1 className="dashboard-title">Overview</h1>
      <p className="dashboard-subtitle">Your task snapshot at a glance</p>

      <div className="stats-grid">
        <StatCard title="Total Tasks" value={stats.total_tasks} color="#3b82f6" />
        <StatCard title="Completed" value={stats.completed} color="#22c55e" />
        <StatCard title="Pending" value={stats.pending} color="#f59e0b" />
        <StatCard title="Overdue" value={stats.overdue} color="#ef4444" />
        <StatCard title="Due Next 7 Days" value={stats.due_next_7_days} color="#6366f1" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="stat-card">
      <div className="stat-color-bar" style={{ background: color }} />
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}
