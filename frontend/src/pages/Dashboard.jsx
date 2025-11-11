import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics()
      .then(res => setStats(res.data))
      .catch(err => console.error("Analytics error:", err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Tasks" value={stats.total_tasks} />
        <Card title="Completed" value={stats.completed} />
        <Card title="Pending" value={stats.pending} />
        <Card title="Overdue" value={stats.overdue} />
      </div>
    </div>
  );
};

// Reusable card component
const Card = ({ title, value }) => (
  <div className="bg-white shadow p-4 rounded">
    <p className="text-gray-600">{title}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default Dashboard;
