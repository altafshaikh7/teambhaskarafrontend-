import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const RealTimeCharts = () => {
  const voltageData = [
    { time: '10:00', 'Bus 400kV': 401.2, 'Bus 220kV': 221.5 },
    { time: '10:05', 'Bus 400kV': 400.8, 'Bus 220kV': 220.9 },
    { time: '10:10', 'Bus 400kV': 402.1, 'Bus 220kV': 222.3 },
    { time: '10:15', 'Bus 400kV': 399.8, 'Bus 220kV': 219.7 },
    { time: '10:20', 'Bus 400kV': 401.5, 'Bus 220kV': 221.8 },
  ]

  const currentData = [
    { time: '10:00', 'Transformer 1': 850, 'Line 1': 1200 },
    { time: '10:05', 'Transformer 1': 920, 'Line 1': 1150 },
    { time: '10:10', 'Transformer 1': 780, 'Line 1': 1250 },
    { time: '10:15', 'Transformer 1': 1100, 'Line 1': 1100 },
    { time: '10:20', 'Transformer 1': 950, 'Line 1': 1180 },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Real-time Trends</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Voltage (kV)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Bus 400kV" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="Bus 220kV" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Current (A)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Transformer 1" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="Line 1" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default RealTimeCharts