import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Loader from '../../components/common/Loader'

// Mock 3D components
const Transformer = ({ position, onClick, isSelected }) => (
  <mesh position={position} onClick={onClick}>
    <boxGeometry args={[2, 3, 2]} />
    <meshStandardMaterial color={isSelected ? '#3b82f6' : '#6b7280'} />
  </mesh>
)

const Breaker = ({ position, onClick, isSelected }) => (
  <mesh position={position} onClick={onClick}>
    <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
    <meshStandardMaterial color={isSelected ? '#3b82f6' : '#9ca3af'} />
  </mesh>
)

const Busbar = ({ position, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[10, 0.2, 0.2]} />
    <meshStandardMaterial color="#f59e0b" />
  </mesh>
)

const DigitalTwin3D = ({ onAssetSelect }) => {
  const [selectedAsset, setSelectedAsset] = React.useState(null)

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset)
    onAssetSelect(asset)
  }

  const assets = [
    { id: 'XFMR_400_1', type: 'transformer', position: [0, 1.5, 0] },
    { id: 'XFMR_400_2', type: 'transformer', position: [4, 1.5, 0] },
    { id: 'BREAKER_400_1', type: 'breaker', position: [-2, 1, 2] },
    { id: 'BREAKER_400_2', type: 'breaker', position: [2, 1, 2] },
  ]

  return (
    <div className="card h-96 lg:h-[500px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Substation View</h3>
      
      <Suspense fallback={<Loader className="h-64" />}>
        <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          
          <Environment preset="city" />
          <OrbitControls />
          
          {/* Grid */}
          <gridHelper args={[20, 20, '#bbb', '#ddd']} />
          
          {/* Assets */}
          {assets.map((asset) => (
            <React.Fragment key={asset.id}>
              {asset.type === 'transformer' && (
                <Transformer
                  position={asset.position}
                  onClick={() => handleAssetClick(asset)}
                  isSelected={selectedAsset?.id === asset.id}
                />
              )}
              {asset.type === 'breaker' && (
                <Breaker
                  position={asset.position}
                  onClick={() => handleAssetClick(asset)}
                  isSelected={selectedAsset?.id === asset.id}
                />
              )}
            </React.Fragment>
          ))}
          
          {/* Busbars */}
          <Busbar position={[0, 3, 0]} rotation={[0, 0, 0]} />
          <Busbar position={[0, 3, 4]} rotation={[0, 0, 0]} />
        </Canvas>
      </Suspense>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Click on assets to view details. Use mouse to rotate, scroll to zoom.</p>
      </div>
    </div>
  )
}

export default DigitalTwin3D