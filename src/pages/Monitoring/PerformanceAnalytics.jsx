import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const PerformanceAnalytics = () => {
  const performanceData = [
    { parameter: 'Voltage Stability', score: 94, target: 95 },
    { parameter: 'Load Factor', score: 88, target: 85 },
    { parameter: 'Power Quality', score: 96, target: 95 },
    { parameter: 'Equipment Utilization', score: 82, target: 80 },
    { parameter: 'System Reliability', score: 98, target: 97 },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="parameter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" name="Actual Score" fill="#3b82f6" />
            <Bar dataKey="target" name="Target" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PerformanceAnalytics