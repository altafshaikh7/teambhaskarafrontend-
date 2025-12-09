// src/pages/Users/Profile.jsx
import React, { useState, useRef } from 'react'
import { 
  Save, 
  User, 
  Mail, 
  Building, 
  Shield, 
  Calendar, 
  Phone, 
  MapPin, 
  Camera,
  Edit,
  X,
  Upload,
  Download,
  Zap,
  Award,
  FileText,
  Clock,
  Battery
} from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef(null)

  const [profile, setProfile] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    employeeId: 'GO-400-2022-00472',
    designation: 'Senior Grid Operator',
    department: 'Grid Operations',
    substation: '400/220 kV Grid Substation',
    email: 'rajesh.kumar@nationalgrid.gov.in',
    phone: '+91 98765 43210',
    joinDate: '2022-03-15',
    qualification: 'B.Tech Electrical Engineering',
    licenseNumber: 'GO-EL-2022-5876',
    safetyCertification: 'Advanced Substation Safety - Level 3',
    emergencyContact: '+91 98765 43211',
    bloodGroup: 'B+',
    address: 'National Grid Control Center, Sector-25, New Delhi - 110025'
  })

  const [profileImage, setProfileImage] = useState(null)
  const [tempImage, setTempImage] = useState(null)

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      if (tempImage) {
        setProfileImage(tempImage)
        setTempImage(null)
      }
      setIsSaving(false)
      setIsEditing(false)
      console.log('Profile saved:', profile)
    }, 2000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setTempImage(null)
  }

  const handleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setTempImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setTempImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Substation specific data
  const operationalStats = {
    shiftsCompleted: 142,
    gridAlertsHandled: 89,
    maintenanceTasks: 34,
    systemUptime: '99.8%',
    safetyIncidents: 0,
    trainingHours: 156
  }

  const technicalSkills = [
    '400kV Substation Operations',
    'SCADA System Management',
    'Protection Relay Testing',
    'Transformer Maintenance',
    'Circuit Breaker Operations',
    'Load Dispatch'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grid Operator Profile</h1>
          <p className="text-gray-600">400/220 kV Substation - Personnel Information</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Image */}
          <div className="card text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                {tempImage || profileImage ? (
                  <img 
                    src={tempImage || profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-white" />
                )}
              </div>
              
              {isEditing && (
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  <button
                    onClick={triggerFileInput}
                    className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  {(tempImage || profileImage) && (
                    <button
                      onClick={handleRemoveImage}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-600">{profile.designation}</p>
            <p className="text-sm text-blue-600 font-medium">{profile.substation}</p>

            {isEditing && (
              <button
                onClick={triggerFileInput}
                className="mt-4 w-full btn-secondary flex items-center justify-center space-x-2 text-sm"
              >
                <Upload className="h-4 w-4" />
                <span>Upload ID Photo</span>
              </button>
            )}
          </div>

          {/* Official Information */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Official Details</span>
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Employee ID:</span>
                <span className="font-medium text-gray-900">{profile.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">License No:</span>
                <span className="font-medium text-gray-900">{profile.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Join Date:</span>
                <span className="font-medium text-gray-900">{profile.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="font-medium text-gray-900">{profile.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Operational Statistics */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span>Operational Stats</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Shifts Completed:</span>
                <span className="font-medium text-gray-900">{operationalStats.shiftsCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alerts Handled:</span>
                <span className="font-medium text-gray-900">{operationalStats.gridAlertsHandled}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Safety Record:</span>
                <span className="font-medium text-green-600">{operationalStats.safetyIncidents} incidents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training Hours:</span>
                <span className="font-medium text-gray-900">{operationalStats.trainingHours}h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Personal Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Official Email
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  value={profile.bloodGroup}
                  onChange={(e) => handleChange('bloodGroup', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residential Address
                </label>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-2" />
                  <textarea
                    value={profile.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    disabled={!isEditing}
                    rows={2}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-600" />
              <span>Professional Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  value={profile.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Substation
                </label>
                <input
                  type="text"
                  value={profile.substation}
                  onChange={(e) => handleChange('substation', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Educational Qualification
                </label>
                <input
                  type="text"
                  value={profile.qualification}
                  onChange={(e) => handleChange('qualification', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Certification
                </label>
                <input
                  type="text"
                  value={profile.safetyCertification}
                  onChange={(e) => handleChange('safetyCertification', e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>Technical Skills & Certifications</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
            
            {isEditing && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  Skills are managed by HR Department. Contact admin for updates.
                </p>
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Phone className="h-5 w-5 text-red-600" />
              <span>Emergency Contact</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Contact Number
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value="Spouse"
                  disabled={!isEditing}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* System Access */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span>System Access & Security</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">SCADA System Access</h4>
                  <p className="text-sm text-gray-600">Level 3 - Full Operational Control</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Active
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Password</h4>
                  <p className="text-sm text-gray-600">Last changed 45 days ago</p>
                </div>
                <button className="btn-secondary text-sm" disabled={!isEditing}>
                  Change Password
                </button>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Enhanced security for grid operations</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Enabled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile