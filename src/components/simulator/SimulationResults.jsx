import React from 'react'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import Loader from '../common/Loader'

const SimulationResults = ({ results, running }) => {
  if (running) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Results</h3>
        <div className="text-center py-8">
          <Loader size="lg" className="mb-4" />
          <p className="text-gray-600">Running simulation...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Results</h3>
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p>Run simulation to see results</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Results</h3>
      
      <div className="space-y-4">
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Simulation Completed</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Fault Type:</span>
            <span className="text-sm font-medium capitalize">{results.faultType.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Location:</span>
            <span className="text-sm font-medium">{results.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Duration:</span>
            <span className="text-sm font-medium">{results.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Fault Current:</span>
            <span className="text-sm font-medium">{results.magnitude}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Protection Response</h4>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>{results.protectionOperation}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">System Impact</h4>
          <p className="text-sm text-gray-600">{results.impact}</p>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SimulationResults