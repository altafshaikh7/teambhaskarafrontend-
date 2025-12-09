import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const CustomBarChart = ({ data, bars, height = 300, layout = 'vertical' }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={layout}>
        <CartesianGrid strokeDasharray="3 3" />
        {layout === 'vertical' ? (
          <>
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
          </>
        ) : (
          <>
            <XAxis type="category" dataKey="name" />
            <YAxis type="number" />
          </>
        )}
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.color}
            name={bar.name}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart