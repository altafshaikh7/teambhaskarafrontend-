import React, { useState } from 'react'
import DigitalTwin3D from './DigitalTwin3D'
import DigitalTwin2D from './DigitalTwin2D'
import AssetDetailsPanel from './AssetDetailsPanel'
import ToggleSwitch from '../../components/common/ToggleSwitch'

const DigitalTwin = () => {
  const [is3DView, setIs3DView] = useState(true)
  const [selectedAsset, setSelectedAsset] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Twin</h1>
          <p className="text-sm text-gray-500">
            Interactive 2D/3D visualization of substation assets
          </p>
        </div>
        
        <ToggleSwitch
          enabled={is3DView}
          setEnabled={setIs3DView}
          label={is3DView ? '3D View' : '2D View'}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          {is3DView ? (
            <DigitalTwin3D onAssetSelect={setSelectedAsset} />
          ) : (
            <DigitalTwin2D onAssetSelect={setSelectedAsset} />
          )}
        </div>
        
        <div>
          <AssetDetailsPanel asset={selectedAsset} />
        </div>
      </div>
    </div>
  )
}

export default DigitalTwin