import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const Analytics = () => {
  const { activities, loading } = useData();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Simple activity count per day (last 7 days placeholder)
    const data = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dateStr = day.toISOString().split('T')[0];
      const count = activities.filter((a) => a.created_at.startsWith(dateStr)).length;
      data.push({ date: day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), count });
    }
    setChartData(data);
  }, [activities]);

  if (loading) return <div className="text-center py-10">Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Recent Activity (last 7 days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4FD1C5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
