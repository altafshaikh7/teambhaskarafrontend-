import { useState, useEffect } from 'react'

export const useUserRole = () => {
  const [userRole, setUserRole] = useState('operator')
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    // In a real app, this would come from authentication context
    const role = localStorage.getItem('userRole') || 'operator'
    setUserRole(role)
    
    // Define permissions based on role
    const rolePermissions = {
      admin: ['read', 'write', 'delete', 'admin'],
      operator: ['read', 'write'],
      engineer: ['read', 'write'],
      viewer: ['read']
    }
    
    setPermissions(rolePermissions[role] || ['read'])
  }, [])

  const hasPermission = (permission) => {
    return permissions.includes(permission)
  }

  return { userRole, permissions, hasPermission }
}