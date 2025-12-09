import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const VoltageCard = ({ data }) => {
  const isNormal = data.value >= 395 && data.value <= 405
  const trend = data.value > 400 ? 'up' : data.value < 400 ? 'down' : 'stable'

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm text-gray-600">Voltage</div>
        <div className={`text-lg font-semibold ${
          isNormal ? 'text-green-600' : 'text-red-600'
        }`}>
          {data.value.toFixed(1)} kV
        </div>
      </div>
      
      <div className="flex items-center">
        {trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
        {trend === 'down' && <TrendingDown className="h-4 w-4 text-blue-500" />}
        <span className="text-xs text-gray-500 ml-1">{data.unit}</span>
      </div>
    </div>
  )
}

export default VoltageCard