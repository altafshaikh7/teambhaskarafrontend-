import React from 'react'

const StatusBadge = ({ status, children }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'operational':
        return 'status-operational'
      case 'warning':
        return 'status-warning'
      case 'critical':
        return 'status-critical'
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium'
      default:
        return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium'
    }
  }

  return (
    <span className={getStatusClass(status)}>
      {children || status}
    </span>
  )
}

export default StatusBadge