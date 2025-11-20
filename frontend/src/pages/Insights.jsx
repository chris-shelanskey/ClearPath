// src/pages/Insights.jsx
import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./Insights.css";

export default function Insights() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics().then((r) => setStats(r.data));
  }, []);

  if (!stats) {
    return (
      <div className="insights-page insights-loading">
        <p>Loading…</p>
      </div>
    );
  }

  // Convert strings to numbers for Recharts if needed
  const data = stats.priority_distribution.map((d) => ({
    priority_score: Number(d.priority_score),
    count: Number(d.count),
  }));

  return (
    <div className="insights-page">
      {/* Header */}
      <header className="insights-header">
        <h1 className="insights-title">Insights</h1>
        <p className="insights-subtitle">
          Task trends and analytics based on your activity.
        </p>
      </header>

      <main className="insights-main">
        {/* Chart Card */}
        <section className="insights-card">
          <h2 className="insights-card-title">Priority Distribution</h2>
          <p className="insights-card-description">
            How many tasks you have at each priority score.
          </p>

          <div className="insights-chart-wrapper">
            <BarChart width={640} height={320} data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="priority_score"
                tick={{ fill: "#cbd5e1" }}
                stroke="#475569"
              />
              <YAxis tick={{ fill: "#cbd5e1" }} stroke="#475569" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
              />
              <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </div>
        </section>
      </main>
    </div>
  );
}
