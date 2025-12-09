import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, CheckCircle, Clock, Plus, Download } from 'lucide-react'

const MaintenanceLog = () => {
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

  // Mock maintenance data
  const maintenanceHistory = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Routine Inspection',
      technician: 'Rajesh Kumar',
      status: 'completed',
      description: 'Regular quarterly inspection and testing performed. All parameters checked and found within normal limits.',
      duration: '4 hours',
      cost: '₹15,000'
    },
    {
      id: 2,
      date: '2023-10-20',
      type: 'Preventive Maintenance',
      technician: 'Amit Sharma',
      status: 'completed',
      description: 'Scheduled maintenance work including contact inspection and mechanism lubrication.',
      duration: '6 hours',
      cost: '₹25,000'
    },
    {
      id: 3,
      date: '2023-07-05',
      type: 'Gas Top-up',
      technician: 'Suresh Patel',
      status: 'completed',
      description: 'SF6 gas pressure maintenance and leak testing performed.',
      duration: '3 hours',
      cost: '₹12,000'
    },
    {
      id: 4,
      date: '2024-02-20',
      type: 'Scheduled Maintenance',
      technician: 'Pending',
      status: 'scheduled',
      description: 'Next scheduled maintenance including comprehensive testing.',
      duration: '8 hours',
      cost: '₹30,000'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Maintenance Log</h1>
                <p className="text-gray-500">{asset.name} • {asset.id || asset.assetId}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Log</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Maintenance</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">₹2.4L</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-yellow-600">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Maintenance History</h2>
            <p className="text-sm text-gray-500 mt-1">Complete maintenance record for this asset</p>
          </div>
          
          <div className="divide-y">
            {maintenanceHistory.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {getStatusIcon(record.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{record.type}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                      <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{record.technician}</span>
                        </div>
                        <div>
                          <span>Duration: {record.duration}</span>
                        </div>
                        <div>
                          <span>Cost: {record.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-secondary text-xs">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Schedule New Maintenance</span>
          </button>
          <button 
            onClick={() => navigate(`/asset-details`, { state: { asset } })}
            className="btn-secondary"
          >
            View Asset Details
          </button>
          <button 
            onClick={() => navigate('/asset-health')}
            className="btn-secondary"
          >
            Back to Assets
          </button>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceLog