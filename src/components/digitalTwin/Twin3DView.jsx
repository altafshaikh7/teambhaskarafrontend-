// src/components/digitalTwin/DigitalTwin3D.jsx
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Environment } from '@react-three/drei'
import Loader from '../common/Loader'

// 3D Models for different components
const Transformer = ({ position, onClick, isSelected, data, rotation }) => {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current && data?.temperature?.value > 80) {
      meshRef.current.rotation.y += 0.01 // Subtle animation for warning state
    }
  })

  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* Main Tank */}
      <mesh ref={meshRef} castShadow>
        <cylinderGeometry args={[1.2, 1.2, 3, 16]} />
        <meshStandardMaterial 
          color={isSelected ? '#3b82f6' : data?.status === 'warning' ? '#f59e0b' : '#4b5563'} 
          emissive={data?.temperature?.value > 80 ? '#f59e0b' : '#000000'}
          emissiveIntensity={data?.temperature?.value > 80 ? 0.3 : 0}
        />
      </mesh>
      
      {/* Cooling Fins */}
      <mesh position={[0, 0, 1.2]} castShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.3, 16]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      <mesh position={[0, 0, -1.2]} castShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.3, 16]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>
      
      {/* Bushings */}
      <mesh position={[1.5, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      <mesh position={[-1.5, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>

      {isSelected && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          Transformer
        </Text>
      )}
    </group>
  )
}

const CircuitBreaker = ({ position, onClick, isSelected, data }) => {
  const getBreakerColor = () => {
    if (isSelected) return '#3b82f6'
    if (data?.status === 'open') return '#ef4444'
    if (data?.status === 'closed') return '#10b981'
    return '#6b7280'
  }

  return (
    <group position={position} onClick={onClick}>
      {/* Breaker Tank */}
      <mesh castShadow>
        <cylinderGeometry args={[0.8, 0.8, 2, 16]} />
        <meshStandardMaterial color={getBreakerColor()} />
      </mesh>
      
      {/* Operating Mechanism */}
      <mesh position={[0, 1.2, 0.6]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Bushings */}
      <mesh position={[0, 0.8, 1.1]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      <mesh position={[0, 0.8, -1.1]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>

      {isSelected && (
        <Text
          position={[0, 1.8, 0]}
          fontSize={0.2}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          Circuit Breaker
        </Text>
      )}
    </group>
  )
}

const Isolator = ({ position, onClick, isSelected, data, rotation }) => {
  const isOpen = data?.status === 'open'
  
  return (
    <group position={position} rotation={rotation} onClick={onClick}>
      {/* Base */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      
      {/* Insulator Stack */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      
      {/* Moving Contact Arm */}
      <mesh position={[isOpen ? 0.5 : 0, 0.8, 0]} rotation={[0, 0, isOpen ? Math.PI/6 : 0]} castShadow>
        <boxGeometry args={[1, 0.05, 0.05]} />
        <meshStandardMaterial color={isSelected ? '#3b82f6' : '#f59e0b'} />
      </mesh>

      {isSelected && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          Isolator ({isOpen ? 'Open' : 'Closed'})
        </Text>
      )}
    </group>
  )
}

const Busbar = ({ position, length, rotation, onClick, isSelected }) => (
  <group position={position} rotation={rotation} onClick={onClick}>
    <mesh castShadow>
      <cylinderGeometry args={[0.1, 0.1, length, 8]} />
      <meshStandardMaterial color={isSelected ? '#3b82f6' : '#f59e0b'} />
    </mesh>

    {isSelected && (
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Busbar
      </Text>
    )}
  </group>
)

const TransmissionTower = ({ position, onClick, isSelected }) => (
  <group position={position} onClick={onClick}>
    {/* Tower Legs */}
    <mesh position={[-0.5, 2, -0.5]} castShadow>
      <boxGeometry args={[0.1, 4, 0.1]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
    <mesh position={[0.5, 2, -0.5]} castShadow>
      <boxGeometry args={[0.1, 4, 0.1]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
    <mesh position={[-0.5, 2, 0.5]} castShadow>
      <boxGeometry args={[0.1, 4, 0.1]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
    <mesh position={[0.5, 2, 0.5]} castShadow>
      <boxGeometry args={[0.1, 4, 0.1]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
    
    {/* Cross Arms */}
    <mesh position={[0, 3.5, 0]} rotation={[0, 0, 0]} castShadow>
      <boxGeometry args={[1.2, 0.05, 0.05]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
    <mesh position={[0, 3, 0]} rotation={[0, 0, 0]} castShadow>
      <boxGeometry args={[1.2, 0.05, 0.05]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>

    {isSelected && (
      <Text
        position={[0, 4.5, 0]}
        fontSize={0.2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Transmission Tower
      </Text>
    )}
  </group>
)

const Reactor = ({ position, onClick, isSelected, data }) => (
  <group position={position} onClick={onClick}>
    {/* Reactor Coil */}
    <mesh castShadow>
      <torusGeometry args={[0.8, 0.3, 16, 32]} />
      <meshStandardMaterial color={isSelected ? '#3b82f6' : '#7c3aed'} />
    </mesh>
    
    {/* Support Structure */}
    <mesh position={[0, -1, 0]} castShadow>
      <cylinderGeometry args={[0.4, 0.4, 1, 8]} />
      <meshStandardMaterial color="#4b5563" />
    </mesh>

    {isSelected && (
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Reactor
      </Text>
    )}
  </group>
)

const DigitalTwin3D = ({ onAssetSelect, assetData }) => {
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [contextLost, setContextLost] = useState(false)

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset)
    onAssetSelect(asset)
  }

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = (event) => {
      console.warn('WebGL context lost')
      event.preventDefault()
      setContextLost(true)
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
      setContextLost(false)
    }

    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      }
    }
  }, [])

  const substationLayout = {
    transformers: [
      { id: 'XFMR_400_1', type: 'transformer', position: [-8, 1.5, 0], rotation: [0, 0, 0], data: assetData['XFMR_400_1'] },
      { id: 'XFMR_400_2', type: 'transformer', position: [8, 1.5, 0], rotation: [0, 0, 0], data: assetData['XFMR_400_2'] },
    ],
    breakers: [
      { id: 'BREAKER_400_1', type: 'breaker', position: [-5, 1, -3], data: assetData['BREAKER_400_1'] },
      { id: 'BREAKER_400_2', type: 'breaker', position: [5, 1, -3], data: assetData['BREAKER_400_2'] },
      { id: 'BREAKER_220_1', type: 'breaker', position: [-3, 1, 4], data: assetData['BREAKER_220_1'] },
    ],
    isolators: [
      { id: 'ISOLATOR_400_1', type: 'isolator', position: [-6, 0.8, -3], rotation: [0, Math.PI/2, 0], data: assetData['ISOLATOR_400_1'] },
      { id: 'ISOLATOR_400_2', type: 'isolator', position: [6, 0.8, -3], rotation: [0, Math.PI/2, 0], data: assetData['ISOLATOR_400_2'] },
    ],
    busbars: [
      { id: 'BUSBAR_400_1', type: 'busbar', position: [0, 3, -4], length: 20, rotation: [0, 0, 0] },
      { id: 'BUSBAR_220_1', type: 'busbar', position: [0, 2, 5], length: 12, rotation: [0, 0, 0] },
    ],
    towers: [
      { id: 'TOWER_IN_1', type: 'tower', position: [-12, 0, -6], data: assetData['TOWER_IN_1'] },
      { id: 'TOWER_IN_2', type: 'tower', position: [12, 0, -6], data: assetData['TOWER_IN_2'] },
    ],
    reactors: [
      { id: 'REACTOR_1', type: 'reactor', position: [-4, 1, 8], data: assetData['REACTOR_1'] },
      { id: 'REACTOR_2', type: 'reactor', position: [4, 1, 8], data: assetData['REACTOR_2'] },
    ]
  }

  if (contextLost) {
    return (
      <div className="card h-96 lg:h-[500px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg font-semibold mb-2">3D View Temporarily Unavailable</div>
          <p className="text-sm">WebGL context was lost. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 btn-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card h-96 lg:h-[500px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Substation Overview</h3>
      
      <Suspense fallback={<Loader className="h-64" />}>
        <Canvas
          camera={{ position: [15, 12, 15], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          shadows
          dpr={[1, 2]}
        >
          <color attach="background" args={['#f8fafc']} />
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8} 
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={30}
          />
          
          <Environment preset="city" />
          
          {/* Grid */}
          <gridHelper args={[30, 30, '#e2e8f0', '#f1f5f9']} />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>

          {/* Transformers */}
          {substationLayout.transformers.map((asset) => (
            <Transformer
              key={asset.id}
              position={asset.position}
              rotation={asset.rotation}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
          
          {/* Circuit Breakers */}
          {substationLayout.breakers.map((asset) => (
            <CircuitBreaker
              key={asset.id}
              position={asset.position}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
          
          {/* Isolators */}
          {substationLayout.isolators.map((asset) => (
            <Isolator
              key={asset.id}
              position={asset.position}
              rotation={asset.rotation}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
          
          {/* Busbars */}
          {substationLayout.busbars.map((busbar) => (
            <Busbar
              key={busbar.id}
              position={busbar.position}
              length={busbar.length}
              rotation={busbar.rotation}
              onClick={() => handleAssetClick(busbar)}
              isSelected={selectedAsset?.id === busbar.id}
            />
          ))}
          
          {/* Transmission Towers */}
          {substationLayout.towers.map((asset) => (
            <TransmissionTower
              key={asset.id}
              position={asset.position}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
          
          {/* Reactors */}
          {substationLayout.reactors.map((asset) => (
            <Reactor
              key={asset.id}
              position={asset.position}
              onClick={() => handleAssetClick(asset)}
              isSelected={selectedAsset?.id === asset.id}
              data={asset.data}
            />
          ))}
        </Canvas>
      </Suspense>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Click on equipment to view details. Drag to rotate, scroll to zoom.</p>
      </div>
    </div>
  )
}

export default DigitalTwin3D