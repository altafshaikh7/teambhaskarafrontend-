import React, { useState } from 'react'
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

const MaintenanceSchedule = () => {
  const [view, setView] = useState('upcoming')

  const maintenanceTasks = [
    {
      id: 'M001',
      asset: 'XFMR_400_1',
      type: 'Preventive Maintenance',
      description: 'Oil testing and bushing inspection',
      scheduledDate: '2024-02-01',
      dueDate: '2024-02-15',
      priority: 'High',
      status: 'Scheduled',
      duration: '8 hours',
      team: 'Transformer Team'
    },
    {
      id: 'M002',
      asset: 'BREAKER_400_2',
      type: 'Corrective Maintenance',
      description: 'Contact replacement and mechanism check',
      scheduledDate: '2024-01-20',
      dueDate: '2024-01-20',
      priority: 'Critical',
      status: 'In Progress',
      duration: '6 hours',
      team: 'Switchgear Team'
    },
    {
      id: 'M003',
      asset: 'LINE_400_1',
      type: 'Condition Assessment',
      description: 'Thermal imaging and visual inspection',
      scheduledDate: '2024-02-10',
      dueDate: '2024-02-28',
      priority: 'Medium',
      status: 'Scheduled',
      duration: '4 hours',
      team: 'Transmission Team'
    },
    {
      id: 'M004',
      asset: 'CT_400_1',
      type: 'Calibration',
      description: 'Accuracy verification and calibration',
      scheduledDate: '2024-01-25',
      dueDate: '2024-01-25',
      priority: 'Medium',
      status: 'Scheduled',
      duration: '3 hours',
      team: 'Protection Team'
    },
    {
      id: 'M005',
      asset: 'BUS_400_1',
      type: 'Infrared Inspection',
      description: 'Thermal scan of busbar connections',
      scheduledDate: '2024-01-18',
      dueDate: '2024-01-18',
      priority: 'Low',
      status: 'Completed',
      duration: '2 hours',
      team: 'Testing Team'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800'
      case 'High': return 'bg-orange-100 text-orange-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'In Progress': return <Clock className="h-4 w-4 text-blue-500" />
      case 'Scheduled': return <Calendar className="h-4 w-4 text-gray-500" />
      case 'Overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredTasks = maintenanceTasks.filter(task => 
    view === 'all' || 
    (view === 'upcoming' && task.status !== 'Completed') ||
    (view === 'completed' && task.status === 'Completed')
  )

  const stats = {
    total: maintenanceTasks.length,
    completed: maintenanceTasks.filter(t => t.status === 'Completed').length,
    inProgress: maintenanceTasks.filter(t => t.status === 'In Progress').length,
    upcoming: maintenanceTasks.filter(t => t.status === 'Scheduled').length
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setView('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setView('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setView('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Tasks
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tasks</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{stats.inProgress}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{stats.upcoming}</div>
          <div className="text-sm text-gray-600">Upcoming</div>
        </div>
      </div>

      <div className="card">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.asset}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.scheduledDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      <span className="text-sm text-gray-500">{task.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.team}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Calendar View */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Calendar</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-2 text-sm">
            {/* Calendar Header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {Array.from({ length: 31 }, (_, i) => {
              const date = i + 1
              const hasMaintenance = maintenanceTasks.some(task => 
                task.scheduledDate === `2024-01-${date.toString().padStart(2, '0')}`
              )
              
              return (
                <div
                  key={date}
                  className={`text-center p-2 rounded ${
                    hasMaintenance
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {date}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceSchedule