import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Calendar } from 'lucide-react'

const AssetDetails = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { asset } = location.state || {}

  if (!asset) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">No Asset Data</h1>
          <button 
            onClick={() => navigate('/asset-health')}
            className="mt-4 btn-primary"
          >
            Back to Asset Health
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/asset-health')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{asset.name}</h1>
                <p className="text-gray-500">Asset ID: {asset.id || asset.assetId}</p>
              </div>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Asset Name</label>
                  <p className="font-medium">{asset.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Asset ID</label>
                  <p className="font-medium">{asset.id || asset.assetId}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Health Score</label>
                  <p className="font-medium">{asset.healthScore}%</p>
                </div>
                {asset.type && (
                  <div>
                    <label className="text-sm text-gray-500">Type</label>
                    <p className="font-medium">{asset.type}</p>
                  </div>
                )}
                {asset.year && (
                  <div>
                    <label className="text-sm text-gray-500">Year</label>
                    <p className="font-medium">{asset.year}</p>
                  </div>
                )}
                {asset.ratedCurrent && (
                  <div>
                    <label className="text-sm text-gray-500">Rated Current</label>
                    <p className="font-medium">{asset.ratedCurrent}</p>
                  </div>
                )}
                {asset.mvaRating && (
                  <div>
                    <label className="text-sm text-gray-500">MVA Rating</label>
                    <p className="font-medium">{asset.mvaRating}</p>
                  </div>
                )}
                {asset.cooling && (
                  <div>
                    <label className="text-sm text-gray-500">Cooling Type</label>
                    <p className="font-medium">{asset.cooling}</p>
                  </div>
                )}
                {asset.ratio && (
                  <div>
                    <label className="text-sm text-gray-500">Ratio</label>
                    <p className="font-medium">{asset.ratio}</p>
                  </div>
                )}
                {asset.accuracy && (
                  <div>
                    <label className="text-sm text-gray-500">Accuracy Class</label>
                    <p className="font-medium">{asset.accuracy}</p>
                  </div>
                )}
                {asset.operations && (
                  <div>
                    <label className="text-sm text-gray-500">Operations Count</label>
                    <p className="font-medium">{asset.operations}</p>
                  </div>
                )}
                {asset.length && (
                  <div>
                    <label className="text-sm text-gray-500">Length</label>
                    <p className="font-medium">{asset.length}</p>
                  </div>
                )}
                {asset.capacity && (
                  <div>
                    <label className="text-sm text-gray-500">Capacity</label>
                    <p className="font-medium">{asset.capacity}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Health Parameters */}
            {asset.parameters && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Health Parameters</h2>
                <div className="space-y-4">
                  {Object.entries(asset.parameters).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              value >= 85 ? 'bg-green-500' : 
                              value >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Status */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Health Status</h3>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${
                  asset.healthScore >= 85 ? 'bg-green-50' : 
                  asset.healthScore >= 70 ? 'bg-yellow-50' : 'bg-red-50'
                }`}>
                  <span className={`text-2xl font-bold ${
                    asset.healthScore >= 85 ? 'text-green-600' : 
                    asset.healthScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {asset.healthScore}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">Overall Health Score</p>
                <p className={`text-xs font-medium ${
                  asset.healthScore >= 85 ? 'text-green-600' : 
                  asset.healthScore >= 70 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {asset.healthScore >= 85 ? 'Operational' : 
                   asset.healthScore >= 70 ? 'Warning' : 'Critical'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/maintenance-log', { state: { asset } })}
                  className="w-full btn-primary text-center"
                >
                  Maintenance Log
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Inspection</span>
                </button>
                <button className="w-full btn-secondary">
                  Download Report
                </button>
              </div>
            </div>

            {/* Asset Notes */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Recent Notes</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-gray-600">Last inspection completed on Jan 15, 2024</p>
                  <p className="text-gray-500 text-xs mt-1">All parameters within normal range</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Scheduled maintenance due in 45 days</p>
                  <p className="text-gray-500 text-xs mt-1">Next maintenance: Mar 1, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetDetails