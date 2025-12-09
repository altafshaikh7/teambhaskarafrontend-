import React from 'react'
import SubstationMap from './SubstationMap'

const Twin2DView = ({ onAssetSelect, assetData }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">2D Single Line Diagram</h3>
      
      <div className="bg-white rounded-lg p-4 border border-gray-200 min-h-[400px] lg:min-h-[500px]">
        <SubstationMap onAssetSelect={onAssetSelect} assetData={assetData} />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Click on components to view real-time data and status. Colors indicate equipment health status.</p>
      </div>
    </div>
  )
}

export default Twin2DView