import React, { useState } from 'react'
import FaultSelector from '../../components/simulator/FaultSelector'
import FaultLocationSelector from '../../components/simulator/FaultLocationSelector'
import SimulationResults from '../../components/simulator/SimulationResults'
import AnimationView from '../../components/simulator/AnimationView'
import CurrentFlowAnimation from './CurrentFlowAnimation'

const FaultSimulator = () => {
  const [selectedFault, setSelectedFault] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [simulationRunning, setSimulationRunning] = useState(false)
  const [results, setResults] = useState(null)
  const [simulationHistory, setSimulationHistory] = useState([])

  const handleStartSimulation = () => {
    if (!selectedFault || !selectedLocation) {
      alert('Please select both fault type and location')
      return
    }

    setSimulationRunning(true)
    setResults(null)
    
    // Simulate API call
    setTimeout(() => {
      const simulationResult = {
        id: Date.now(),
        faultType: selectedFault,
        location: selectedLocation,
        timestamp: new Date().toISOString(),
        duration: '2.5 cycles',
        magnitude: '15.8 kA',
        protectionOperation: 'Breaker tripped successfully',
        impact: 'Localized outage, no cascade',
        recommendations: [
          'Verify protection settings',
          'Inspect affected equipment',
          'Review sequence of events'
        ],
        parameters: {
          voltageDip: '45%',
          currentSurge: '320%',
          clearingTime: '85 ms',
          energyReleased: '45 MJ'
        }
      }
      
      setResults(simulationResult)
      setSimulationRunning(false)
      setSimulationHistory(prev => [simulationResult, ...prev.slice(0, 9)])
    }, 3000)
  }

  const handleClearHistory = () => {
    setSimulationHistory([])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Fault Simulation & Analysis</h1>
        <div className="text-sm text-gray-500">
          Test and analyze fault scenarios in real-time
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

          <CurrentFlowAnimation />

          <div className="card">
            <div className="flex space-x-4">
              <button
                onClick={handleStartSimulation}
                disabled={simulationRunning || !selectedFault || !selectedLocation}
                className="flex-1 btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {simulationRunning ? 'Running Simulation...' : 'Start Simulation'}
              </button>
              <button
                onClick={() => {
                  setSelectedFault(null)
                  setSelectedLocation(null)
                  setResults(null)
                }}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Simulation History */}
          {simulationHistory.length > 0 && (
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Simulation History</h3>
                <button
                  onClick={handleClearHistory}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear History
                </button>
              </div>
              
              <div className="space-y-3">
                {simulationHistory.map((sim) => (
                  <div key={sim.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-gray-900 capitalize">
                          {sim.faultType.replace('_', ' ')} at {sim.location}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(sim.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {sim.duration}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Magnitude: <strong>{sim.magnitude}</strong> • {sim.protectionOperation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <SimulationResults 
            results={results}
            running={simulationRunning}
          />

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Simulations</h3>
            
            <div className="space-y-2">
              {[
                { fault: 'short_circuit', location: 'bus_400_1', label: '400kV Bus Short Circuit' },
                { fault: 'ground_fault', location: 'line_400_1', label: '400kV Line Ground Fault' },
                { fault: 'transformer_fault', location: 'xfmr_400_1', label: 'Transformer Internal Fault' },
                { fault: 'over_voltage', location: 'bus_220_1', label: '220kV Over Voltage' }
              ].map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedFault(scenario.fault)
                    setSelectedLocation(scenario.location)
                  }}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Statistics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Simulations:</span>
                <span className="font-medium">{simulationHistory.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Successful:</span>
                <span className="font-medium text-green-600">
                  {simulationHistory.filter(s => s.protectionOperation.includes('successfully')).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Duration:</span>
                <span className="font-medium">2.8 cycles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most Common:</span>
                <span className="font-medium">Short Circuit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaultSimulator