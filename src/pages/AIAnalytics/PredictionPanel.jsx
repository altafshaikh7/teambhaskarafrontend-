import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const PredictionPanel = () => {
  const failureData = [
    { month: 'Jan', actual: 2, predicted: 1.8 },
    { month: 'Feb', actual: 3, predicted: 2.9 },
    { month: 'Mar', actual: 1, predicted: 1.2 },
    { month: 'Apr', actual: 4, predicted: 3.8 },
    { month: 'May', actual: 2, predicted: 2.1 },
    { month: 'Jun', actual: 3, predicted: 2.9 },
    { month: 'Jul', actual: 2, predicted: 2.2 },
    { month: 'Aug', actual: 1, predicted: 1.1 },
    { month: 'Sep', actual: 3, predicted: 2.8 },
    { month: 'Oct', actual: 2, predicted: 2.3 },
    { month: 'Nov', actual: 4, predicted: 3.7 },
    { month: 'Dec', actual: 3, predicted: 2.9 },
  ]

  const predictionMetrics = [
    { metric: 'Model Accuracy', value: '94.2%' },
    { metric: 'Precision', value: '91.5%' },
    { metric: 'Recall', value: '89.8%' },
    { metric: 'F1 Score', value: '90.6%' },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Failure Prediction Analytics</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h4 className="text-md font-medium text-gray-700 mb-4">Actual vs Predicted Failures</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={failureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Actual Failures"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Failures"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-4">Model Performance</h4>
          <div className="space-y-4">
            {predictionMetrics.map((item) => (
              <div key={item.metric} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                <span className="text-lg font-bold text-blue-600">{item.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-medium text-green-800 mb-2">Next 30 Days Prediction</h5>
            <p className="text-sm text-green-700">
              <strong>2-3 equipment failures</strong> predicted with 87% confidence
            </p>
            <p className="text-xs text-green-600 mt-1">
              High risk: Transformer XFMR_400_2
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionPanel