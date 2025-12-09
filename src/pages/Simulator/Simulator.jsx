import React, { useState } from 'react'
import FaultSelector from '../../components/simulator/FaultSelector'
import FaultLocationSelector from '../../components/simulator/FaultLocationSelector'
import SimulationResults from '../../components/simulator/SimulationResults'
import AnimationView from '../../components/simulator/AnimationView'

const Simulator = () => {
  const [selectedFault, setSelectedFault] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [results, setResults] = useState(null)

  const handleStartSimulation = () => {
    if (!selectedFault || !selectedLocation) {
      alert('Please select both fault type and location')
      return
    }

    setSimulationRunning(true)
    
    // Simulate API call
    setTimeout(() => {
      setResults({
        faultType: selectedFault,
        location: selectedLocation,
        duration: '2.5 cycles',
        magnitude: '15.8 kA',
        protectionOperation: 'Breaker tripped successfully',
        impact: 'Localized outage, no cascade',
        recommendations: [
          'Verify protection settings',
          'Inspect affected equipment',
          'Review sequence of events'
        ]
      })
      setSimulationRunning(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Fault Simulator</h1>
        <div className="text-sm text-gray-500">
          Test and analyze fault scenarios
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FaultSelector 
              selectedFault={selectedFault}
              onFaultSelect={setSelectedFault}
            />
            <FaultLocationSelector 
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation}
            />
          </div>

          <AnimationView 
            faultType={selectedFault}
            location={selectedLocation}
            running={simulationRunning}
          />

          <div className="card">
            <button
              onClick={handleStartSimulation}
              disabled={simulationRunning || !selectedFault || !selectedLocation}
              className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {simulationRunning ? 'Running Simulation...' : 'Start Simulation'}
            </button>
          </div>
        </div>

        <div>
          <SimulationResults 
            results={results}
            running={simulationRunning}
          />
        </div>
      </div>
    </div>
  )
}

export default Simulator