import React, { useState } from 'react'
import { Search, Filter, UserPlus, Edit, Trash2, Shield } from 'lucide-react'

const RoleManager = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@substation.com',
      role: 'admin',
      department: 'IT',
      lastLogin: '2024-01-15 14:30',
      status: 'active',
      permissions: ['read', 'write', 'admin']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@substation.com',
      role: 'operator',
      department: 'Operations',
      lastLogin: '2024-01-15 12:15',
      status: 'active',
      permissions: ['read', 'write']
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@substation.com',
      role: 'engineer',
      department: 'Maintenance',
      lastLogin: '2024-01-14 16:45',
      status: 'active',
      permissions: ['read', 'write']
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@substation.com',
      role: 'viewer',
      department: 'Planning',
      lastLogin: '2024-01-13 09:20',
      status: 'inactive',
      permissions: ['read']
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.b@substation.com',
      role: 'operator',
      department: 'Operations',
      lastLogin: '2024-01-15 08:30',
      status: 'active',
      permissions: ['read', 'write']
    }
  ]

  const roles = [
    { id: 'admin', name: 'Administrator', description: 'Full system access' },
    { id: 'operator', name: 'Operator', description: 'Operations and monitoring' },
    { id: 'engineer', name: 'Engineer', description: 'Maintenance and configuration' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access' }
  ]

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800'
      case 'operator': return 'bg-blue-100 text-blue-800'
      case 'engineer': return 'bg-green-100 text-green-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  }

  const filteredUsers = users.filter(user =>
    (roleFilter === 'all' || user.role === roleFilter) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User & Role Management</h1>
        <button className="btn-primary flex items-center space-x-2">
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Role Definitions */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Roles</h3>
          {roles.map(role => (
            <div key={role.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role.id)}`}>
                  {role.name}
                </span>
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">{role.description}</p>
              <div className="mt-3 text-xs text-gray-500">
                {users.filter(u => u.role === role.id).length} users
              </div>
            </div>
          ))}
        </div>

        {/* User List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select 
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permissions Summary */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Admin Permissions</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Full system access</li>
                  <li>• User management</li>
                  <li>• System configuration</li>
                  <li>• All data operations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Operator Permissions</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Real-time monitoring</li>
                  <li>• Alarm management</li>
                  <li>• Basic operations</li>
                  <li>• Report generation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleManager