import React from 'react'
import { ToggleLeft, ToggleRight } from 'lucide-react'

const IsolatorStatus = ({ data }) => {
  const isClosed = data?.value === 1

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm text-gray-600">Isolator Status</div>
        <div className={`text-lg font-semibold ${
          isClosed ? 'text-green-600' : 'text-red-600'
        }`}>
          {isClosed ? 'CLOSED' : 'OPEN'}
        </div>
      </div>
      
      <div className="relative">
        {isClosed ? (
          <ToggleRight className="h-8 w-8 text-green-500" />
        ) : (
          <ToggleLeft className="h-8 w-8 text-red-500" />
        )}
      </div>
    </div>
  )
}

export default IsolatorStatus