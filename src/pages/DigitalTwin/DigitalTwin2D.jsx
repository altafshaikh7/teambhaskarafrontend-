import React from 'react'
import SubstationMap from '../../components/digitalTwin/SubstationMap'

const DigitalTwin2D = ({ onAssetSelect }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">2D Single Line Diagram</h3>
      
      <div className="bg-gray-50 rounded-lg p-6 min-h-[400px] lg:min-h-[500px]">
        <SubstationMap onAssetSelect={onAssetSelect} />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Click on components to view real-time data and status.</p>
      </div>
    </div>
  )
}

export default DigitalTwin2D