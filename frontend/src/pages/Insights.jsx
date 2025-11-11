import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const Insights = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAnalytics()
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Priority Distribution</h2>

      <BarChart width={600} height={300} data={stats.priority_distribution}>
        <XAxis dataKey="priority_score" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>
    </div>
  );
};

export default Insights;
