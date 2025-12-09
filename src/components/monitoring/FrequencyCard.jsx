import React from 'react'

const FrequencyCard = ({ data }) => {
  const isNormal = data.value >= 49.8 && data.value <= 50.2

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm text-gray-600">Frequency</div>
        <div className={`text-lg font-semibold ${
          isNormal ? 'text-green-600' : 'text-red-600'
        }`}>
          {data.value.toFixed(2)} Hz
        </div>
      </div>
      <span className="text-xs text-gray-500">{data.unit}</span>
    </div>
  )
}

export default FrequencyCard