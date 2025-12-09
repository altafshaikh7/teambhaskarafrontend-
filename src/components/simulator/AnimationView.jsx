import React, { useEffect, useState } from 'react'

const AnimationView = ({ faultType, location, running }) => {
  const [animationStage, setAnimationStage] = useState(0)

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setAnimationStage(prev => (prev + 1) % 4)
      }, 800)
      return () => clearInterval(interval)
    } else {
      setAnimationStage(0)
    }
  }, [running])

  const getAnimationColor = () => {
    if (!faultType) return '#6b7280'
    
    switch (faultType) {
      case 'short_circuit':
      case 'ground_fault':
        return '#ef4444'
      case 'over_voltage':
        return '#f59e0b'
      case 'under_voltage':
        return '#3b82f6'
      default:
        return '#6b7280'
    }
  }

  const getFaultDescription = () => {
    if (!faultType || !location) return 'Select fault type and location to begin simulation'
    
    const faultNames = {
      short_circuit: 'Short Circuit',
      ground_fault: 'Ground Fault',
      over_voltage: 'Over Voltage',
      under_voltage: 'Under Voltage',
      transformer_fault: 'Transformer Fault',
      line_fault: 'Line Fault'
    }
    
    return `Simulating ${faultNames[faultType]} at ${location}`
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Animation</h3>
      
      <div className="bg-gray-900 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 mb-6">
          {/* Substation diagram */}
          <div className="absolute inset-0 border-2 border-gray-600 rounded-lg">
            {/* Busbars */}
            <div className="absolute top-1/4 left-4 right-4 h-1 bg-yellow-400"></div>
            <div className="absolute top-3/4 left-4 right-4 h-1 bg-yellow-400"></div>
            
            {/* Transformers */}
            <div className="absolute top-1/3 left-1/4 w-8 h-16 bg-blue-500 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/3 left-3/4 w-8 h-16 bg-blue-500 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Breakers */}
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Fault animation */}
            {running && faultType && (
              <div 
                className="absolute w-6 h-6 rounded-full animate-ping"
                style={{
                  backgroundColor: getAnimationColor(),
                  top: animationStage % 2 === 0 ? '25%' : '75%',
                  left: animationStage < 2 ? '25%' : '75%',
                }}
              />
            )}
          </div>
        </div>
        
        <div className="text-center text-white">
          <div className="text-lg font-semibold mb-2">
            {running ? 'Simulation Running...' : 'Ready for Simulation'}
          </div>
          <div className="text-sm text-gray-300">
            {getFaultDescription()}
          </div>
          {running && (
            <div className="mt-2 text-yellow-300 text-sm">
              Stage {animationStage + 1}: {['Fault Initiation', 'Current Surge', 'Protection Activation', 'System Response'][animationStage]}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnimationView