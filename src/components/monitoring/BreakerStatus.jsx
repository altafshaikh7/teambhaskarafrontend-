import React from 'react'

const BreakerStatus = ({ data }) => {
  const isClosed = data.value === 1

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm text-gray-600">Breaker Status</div>
        <div className={`text-lg font-semibold ${
          isClosed ? 'text-green-600' : 'text-red-600'
        }`}>
          {isClosed ? 'CLOSED' : 'OPEN'}
        </div>
      </div>
      <div className={`w-3 h-3 rounded-full ${
        isClosed ? 'bg-green-500' : 'bg-red-500'
      }`} />
    </div>
  )
}

export default BreakerStatus