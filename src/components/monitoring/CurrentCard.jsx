import React from 'react'

const CurrentCard = ({ data }) => {
  const isNormal = data.value <= 1500

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm text-gray-600">Current</div>
        <div className={`text-lg font-semibold ${
          isNormal ? 'text-green-600' : 'text-red-600'
        }`}>
          {data.value.toFixed(1)} A
        </div>
      </div>
      <span className="text-xs text-gray-500">{data.unit}</span>
    </div>
  )
}

export default CurrentCard