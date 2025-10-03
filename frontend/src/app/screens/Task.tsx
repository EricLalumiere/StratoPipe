'use client'

import React, { useState } from 'react'
import { Link } from '@/lib'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Plus,
  Edit,
  Save,
  Clock,
  User,
  Building,
  Calendar,
  Package,
  Upload,
  FileText,
  Download,
  Eye,
  GitBranch,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react'
import Components from '../components'

export default function Task() {
  const [isEditing, setIsEditing] = useState(false)
  const [taskData, setTaskData] = useState({
    name: 'Character Design - Zara Refinement',
    description: 'Refine the main character Zara design based on art director feedback. Focus on cyberpunk aesthetic elements, clothing details, and facial expressions. Create multiple pose variations and color schemes.',
    assignedUser: 'Luna Martinez',
    department: 'Concept Art',
    startedDate: '2024-04-15',
    deliverBy: '2024-04-22',
    timeBudget: '32',
    status: 'In Progress',
    priority: 'High',
    progress: 75
  })

  const [newVersion, setNewVersion] = useState({
    title: '',
    description: '',
    files: [] as File[]
  })

  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  const users = [
    "Sarah Chen", "Mike Rodriguez", "Emma Davis", "David Kim", 
    "Luna Martinez", "James Wilson", "Alex Chen", "Maria Rodriguez"
  ]

  const departments = [
    "Concept Art", "Modeling", "Texturing", "Rigging", "Animation", 
    "Lighting", "FX", "Editorial", "Layout", "Motion Capture Stage",
    "Motion Capture Cleanup", "Motion Capture Integration", "Tech Art"
  ]

  const associatedAssets = [
    { id: 1, name: "Zara - Main Character", type: "Character" },
    { id: 2, name: "Cybernetic Implant", type: "Prop" },
    { id: 3, name: "Neo-Tokyo Cityscape", type: "Environment" }
  ]

  const dependencies = [
    {
      id: 1,
      name: "Character Concept Approval",
      component: "Asset",
      assetName: "Zara - Main Character",
      assetType: "Character",
      assetTaskName: "Character Design - Initial Concept",
      status: "Completed",
      assignee: "Michael Rodriguez"
    },
    {
      id: 2,
      name: "Art Direction Guidelines",
      component: "Asset",
      assetName: "Neo-Tokyo Cityscape",
      assetType: "Environment",
      assetTaskName: "Environment Design - Art Direction",
      status: "Completed",
      assignee: "Sarah Kim"
    }
  ]

  const dependants = [
    {
      id: 1,
      name: "Character Modeling",
      component: "Asset",
      assetName: "Zara - Main Character",
      assetType: "Character",
      assetTaskName: "Character Modeling - Base Mesh",
      status: "Waiting",
      assignee: "David Kim"
    },
    {
      id: 2,
      name: "Character Texturing",
      component: "Asset",
      assetName: "Zara - Main Character", 
      assetType: "Character",
      assetTaskName: "Character Texturing - Skin & Clothing",
      status: "Waiting",
      assignee: "Emma Davis"
    }
  ]

  const versions = [
    {
      id: 1,
      title: 'Initial Concept',
      description: 'First draft of character design',
      status: 'Published',
      number: 1,
      comment: 'Initial concept based on brief',
      date: '2024-04-15',
      files: ['zara_concept_v1.psd', 'zara_reference.jpg']
    },
    {
      id: 2,
      title: 'Art Director Feedback',
      description: 'Revisions based on art director notes',
      status: 'Published',
      number: 2,
      comment: 'Incorporated feedback on clothing and pose',
      date: '2024-04-18',
      files: ['zara_concept_v2.psd', 'zara_variations.jpg']
    },
    {
      id: 3,
      title: 'Color Refinement',
      description: 'Updated color palette and lighting',
      status: 'Draft',
      number: 3,
      comment: 'Work in progress - color adjustments',
      date: '2024-04-20',
      files: ['zara_concept_v3.psd']
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setTaskData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving task:', taskData)
    setIsEditing(false)
  }

  const handleVersionChange = (field: string, value: string) => {
    setNewVersion(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setNewVersion(prev => ({ ...prev, files: [...prev.files, ...files] }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'N/A': return 'bg-gray-100 text-gray-800'
      case 'Ready to Start': return 'bg-blue-100 text-blue-800'
      case 'Work in Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Kickback': return 'bg-red-100 text-red-800'
      case 'Pending Review': return 'bg-orange-100 text-orange-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Published': return 'bg-emerald-100 text-emerald-800'
      // Legacy status support
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Waiting': case 'Pending': return 'bg-orange-100 text-orange-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAssetTypeColor = (type: string) => {
    switch (type) {
      case 'Character': return 'bg-purple-100 text-purple-800'
      case 'Environment': return 'bg-green-100 text-green-800'
      case 'Prop': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Components.Sidebar currentProject="cyber-nexus" projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/Schedule">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Schedule
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <Components.ProjectHeader
            projectName="Cyber Nexus"
            title={taskData.name}
            description={`${taskData.department} • ${taskData.status} • ${taskData.priority} Priority • ${taskData.progress}% Complete`}
          >
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Task
                </>
              )}
            </Button>
          </Components.ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Task Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Task Information</CardTitle>
                      <CardDescription>Task details and assignment information</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">Task Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={taskData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{taskData.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                      {isEditing ? (
                        <Select value={taskData.status} onValueChange={(value) => handleInputChange('status', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="N/A">N/A</SelectItem>
                            <SelectItem value="Ready to Start">Ready to Start</SelectItem>
                            <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                            <SelectItem value="Kickback">Kickback</SelectItem>
                            <SelectItem value="Pending Review">Pending Review</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1">
                          <Badge className={getStatusColor(taskData.status)}>
                            {taskData.status}
                          </Badge>
                          {/* Show if status was inherited from a version */}
                          {versions.some(v => v.status === taskData.status && v.status !== 'N/A') && (
                            <p className="text-xs text-blue-600 mt-1">
                              Status inherited from version
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={taskData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-slate-900 leading-relaxed">{taskData.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="assignedUser" className="text-slate-700 font-medium">Assigned User</Label>
                      {isEditing ? (
                        <Select value={taskData.assignedUser} onValueChange={(value) => handleInputChange('assignedUser', value)}>
                          <SelectTrigger className="mt-1">
                            <User className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map(user => (
                              <SelectItem key={user} value={user}>
                                {user}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          <Link to="/User" className="font-medium text-blue-600 hover:text-blue-700">
                            {taskData.assignedUser}
                          </Link>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-slate-700 font-medium">Department</Label>
                      {isEditing ? (
                        <Select value={taskData.department} onValueChange={(value) => handleInputChange('department', value)}>
                          <SelectTrigger className="mt-1">
                            <Building className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-900">{taskData.department}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="startedDate" className="text-slate-700 font-medium">Started Date</Label>
                      {isEditing ? (
                        <Input
                          id="startedDate"
                          type="date"
                          value={taskData.startedDate}
                          onChange={(e) => handleInputChange('startedDate', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{taskData.startedDate}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="deliverBy" className="text-slate-700 font-medium">Deliver By</Label>
                      {isEditing ? (
                        <Input
                          id="deliverBy"
                          type="date"
                          value={taskData.deliverBy}
                          onChange={(e) => handleInputChange('deliverBy', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{taskData.deliverBy}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="timeBudget" className="text-slate-700 font-medium">Time Budget (hours)</Label>
                      {isEditing ? (
                        <Input
                          id="timeBudget"
                          type="number"
                          value={taskData.timeBudget}
                          onChange={(e) => handleInputChange('timeBudget', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{taskData.timeBudget} hours</p>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <Label className="text-slate-700 font-medium">Progress</Label>
                      <span className="font-medium text-slate-900">{taskData.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${taskData.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Associated Assets */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Associated Assets</CardTitle>
                  <CardDescription>Assets linked to this task</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {associatedAssets.map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-slate-500" />
                          <div>
                            <Link to="/Asset" className="font-medium text-blue-600 hover:text-blue-700">
                              {asset.name}
                            </Link>
                            <Badge className={getAssetTypeColor(asset.type)} variant="outline">
                              {asset.type}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dependencies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-slate-600" />
                      <CardTitle className="text-lg font-bold text-slate-900">Dependencies</CardTitle>
                    </div>
                    <CardDescription>Tasks this task depends on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dependencies.map((dep) => (
                        <div key={dep.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <Link to="/Task" className="font-medium text-blue-600 hover:text-blue-700">
                              {dep.name}
                            </Link>
                            <Badge className={getStatusColor(dep.status)}>
                              {dep.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 mb-2">
                            <span>{dep.component} • </span>
                            <Link to="/User" className="text-blue-600 hover:text-blue-700">
                              {dep.assignee}
                            </Link>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-slate-400" />
                              <Link to="/Asset" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                {dep.assetName}
                              </Link>
                              <Badge className={getAssetTypeColor(dep.assetType)} variant="outline">
                                {dep.assetType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 ml-6">
                              <span className="text-xs text-slate-500">Task:</span>
                              <Link to="/Task" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                {dep.assetTaskName}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-slate-600 rotate-180" />
                      <CardTitle className="text-lg font-bold text-slate-900">Dependants</CardTitle>
                    </div>
                    <CardDescription>Tasks that depend on this task</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dependants.map((dep) => (
                        <div key={dep.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <Link to="/Task" className="font-medium text-blue-600 hover:text-blue-700">
                              {dep.name}
                            </Link>
                            <Badge className={getStatusColor(dep.status)}>
                              {dep.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 mb-2">
                            <span>{dep.component} • </span>
                            <Link to="/User" className="text-blue-600 hover:text-blue-700">
                              {dep.assignee}
                            </Link>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-slate-400" />
                              <Link to="/Asset" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                {dep.assetName}
                              </Link>
                              <Badge className={getAssetTypeColor(dep.assetType)} variant="outline">
                                {dep.assetType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 ml-6">
                              <span className="text-xs text-slate-500">Task:</span>
                              <Link to="/Task" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                {dep.assetTaskName}
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Versions */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Versions</CardTitle>
                    <CardDescription>Version history and file management</CardDescription>
                  </div>
                  <Link to="/VersionCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Version
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {versions.map((version) => (
                      <div key={version.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-slate-900">v{version.number}</span>
                              <Link to="/Version" className="font-medium text-blue-600 hover:text-blue-700">
                                {version.title}
                              </Link>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{version.description}</p>
                            <p className="text-xs text-slate-500">Comment: {version.comment}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(version.status)}>
                              {version.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-slate-600">
                            <span>Created: {version.date}</span>
                            <span className="mx-2">•</span>
                            <span>{version.files.length} files</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>

                        {version.files.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <div className="flex flex-wrap gap-2">
                              {version.files.map((file, index) => (
                                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-xs text-blue-700">
                                  <FileText className="w-3 h-3" />
                                  {file}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats and Actions */}
            <div className="space-y-6">
              {/* Task Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Task Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="font-semibold text-blue-600">{taskData.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Time Budget</span>
                      <span className="font-semibold text-slate-900">{taskData.timeBudget}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Days Remaining</span>
                      <span className="font-semibold text-orange-600">2 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Dependencies</span>
                      <span className="font-semibold text-green-600">{dependencies.length} completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Dependants</span>
                      <span className="font-semibold text-orange-600">{dependants.length} waiting</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Versions</span>
                      <span className="font-semibold text-slate-900">{versions.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Start Working
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Contact Assignee
                  </Button>
                </CardContent>
              </Card>

              {/* Priority Alert */}
              {taskData.priority === 'High' && (
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <CardTitle className="text-lg font-bold text-red-900">High Priority Task</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-red-800">
                    <p>This task is marked as high priority and has dependent tasks waiting for completion.</p>
                    <p className="mt-2 font-medium">Due: {taskData.deliverBy}</p>
                  </CardContent>
                </Card>
              )}

              {/* Dependencies Status */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg font-bold text-green-900">Dependencies Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-green-800">
                  <p><strong>All dependencies completed!</strong></p>
                  <p>This task is ready to proceed without waiting for other tasks.</p>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">Version v3 uploaded - 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">Progress updated to 75% - 1 day ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-sm text-blue-800">Task started - 5 days ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Time Tracking */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-yellow-900">Time Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-yellow-800">
                  <p><strong>Time Spent:</strong> 24 hours</p>
                  <p><strong>Time Remaining:</strong> 8 hours</p>
                  <p><strong>Estimated Completion:</strong> April 22, 2024</p>
                  <div className="w-full bg-yellow-200 rounded-full h-2 mt-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}