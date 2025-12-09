import React from 'react'

const CurrentFlowAnimation = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Flow Visualization</h3>
      <div className="bg-gray-900 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-lg font-semibold mb-2">Current Flow Animation</div>
          <div className="text-sm text-gray-300">
            Real-time power flow visualization during simulation
          </div>
          <div className="mt-4 text-yellow-300">
            ⚡ Current flowing through transmission lines
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentFlowAnimation