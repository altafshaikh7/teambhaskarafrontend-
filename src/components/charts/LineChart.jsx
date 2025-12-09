import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomLineChart = ({ data, lines, height = 300, showGrid = true }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            name={line.name}
            dot={{ r: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CustomLineChart