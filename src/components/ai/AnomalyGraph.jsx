import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts'

const AnomalyGraph = () => {
  const data = [
    { hour: '00:00', anomalies: 2, threshold: 5 },
    { hour: '02:00', anomalies: 1, threshold: 5 },
    { hour: '04:00', anomalies: 0, threshold: 5 },
    { hour: '06:00', anomalies: 3, threshold: 5 },
    { hour: '08:00', anomalies: 8, threshold: 5 },
    { hour: '10:00', anomalies: 12, threshold: 5 },
    { hour: '12:00', anomalies: 15, threshold: 5 },
    { hour: '14:00', anomalies: 18, threshold: 5 },
    { hour: '16:00', anomalies: 14, threshold: 5 },
    { hour: '18:00', anomalies: 9, threshold: 5 },
    { hour: '20:00', anomalies: 6, threshold: 5 },
    { hour: '22:00', anomalies: 3, threshold: 5 },
  ]

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="threshold" 
          stroke="#ef4444" 
          fill="#fecaca" 
          strokeWidth={0}
          fillOpacity={0.3}
        />
        <Line 
          type="monotone" 
          dataKey="anomalies" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AnomalyGraph