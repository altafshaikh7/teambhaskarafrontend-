import React from 'react'
import { Thermometer } from 'lucide-react'

const TemperatureCard = ({ data }) => {
  const getTemperatureColor = (temp) => {
    if (temp > 85) return 'text-red-600'
    if (temp > 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm text-gray-600">Temperature</div>
        <div className={`text-lg font-semibold ${getTemperatureColor(data.value)}`}>
          {data.value.toFixed(1)} °C
        </div>
      </div>
      <Thermometer className="h-4 w-4 text-gray-400" />
    </div>
  )
}

export default TemperatureCard