import React from 'react'

const ToggleSwitch = ({ enabled, setEnabled, label }) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-3 text-sm font-medium text-gray-700">{label}</span>}
      <button
        type="button"
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
        onClick={() => setEnabled(!enabled)}
      >
        <span
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  )
}

export default ToggleSwitch