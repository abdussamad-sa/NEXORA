import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Simple overview with project count and task status chart
const Overview = () => {
  const { projects, tasks, loading } = useData();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Aggregate tasks completed over time (dummy by month)
    const data = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    months.forEach((m, idx) => {
      const completed = tasks.filter(t => new Date(t.created_at).getMonth() === idx && t.completed).length;
      data.push({ month: m, completed });
    });
    setChartData(data);
  }, [tasks]);

  if (loading) return <div className="text-center py-10">Loading overview...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, Abdussamad Ansari</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-400">Projects</p>
          <p className="text-3xl font-semibold">{projects.length}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-400">Tasks</p>
          <p className="text-3xl font-semibold">{tasks.length}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-400">Completed Tasks</p>
          <p className="text-3xl font-semibold">{tasks.filter(t => t.completed).length}</p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-2">Task Completion Over Months</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#4FD1C5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
