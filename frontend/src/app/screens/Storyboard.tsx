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
  Image,
  Layers,
  Eye,
  Download,
  Upload,
  ZoomIn
} from 'lucide-react'
import Components from '../components'
import { StatusManager, useStatusManager, type TaskStatus, type ComponentStatus } from '../components/StatusManager'

export default function Storyboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [storyboardData, setStoryboardData] = useState({
    name: "Opening Sequence Storyboard v3.2",
    description: "Detailed storyboard frames for the opening cyberpunk cityscape sequence. Includes establishing shots, character introductions, and atmospheric mood boards with lighting references.",
    sequence: "Act 1 - Introduction"
  })

  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  const sequences = [
    { id: 1, name: "Act 1 - Introduction" },
    { id: 2, name: "Act 2 - Rising Action" },
    { id: 3, name: "Act 3 - Climax" },
    { id: 4, name: "Act 4 - Resolution" }
  ]

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Storyboard Revision",
      assignee: "Alex Chen",
      department: "Concept Art",
      status: "Work in Progress",
      priority: "High",
      dueDate: "2024-04-22",
      description: "Update storyboard frames based on director feedback"
    },
    {
      id: 2,
      name: "Color Script",
      assignee: "Maria Rodriguez",
      department: "Concept Art",
      status: "Ready to Start",
      priority: "Medium",
      dueDate: "2024-04-25",
      description: "Create color script based on approved storyboard"
    },
    {
      id: 3,
      name: "Animatic Creation",
      assignee: "James Wilson",
      department: "Pre-Vis",
      status: "N/A",
      priority: "Medium",
      dueDate: "2024-04-28",
      description: "Create animatic from storyboard frames"
    },
    {
      id: 4,
      name: "Director Review",
      assignee: "Sarah Kim",
      department: "Direction",
      status: "Approved",
      priority: "High",
      dueDate: "2024-04-18",
      description: "Director approval of storyboard sequence"
    }
  ])

  const { updateComponentStatus } = useStatusManager()

  // Convert tasks to TaskStatus format for status management
  const taskStatuses: TaskStatus[] = tasks.map(task => ({
    id: task.id,
    status: task.status as any,
    componentId: 'current-storyboard',
    componentType: "Storyboard"
  }))

  // Create component status object for status management
  const componentStatus: ComponentStatus = {
    id: 'current-storyboard',
    type: 'Storyboard',
    status: 'Approved' as any, // Current storyboard status
    associatedTasks: taskStatuses
  }

  // Calculate and update storyboard status based on task statuses
  React.useEffect(() => {
    const updatedComponent = updateComponentStatus(componentStatus, taskStatuses)
    if (updatedComponent.status !== 'Approved') {
      console.log(`🔄 Storyboard status auto-updated from "Approved" to "${updatedComponent.status}" based on task statuses`)
      // In a real app, this would update the storyboard data in the database
    }
  }, [tasks])

  // Function to update task status and trigger component status recalculation
  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus }
          : task
      )
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setStoryboardData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving storyboard:', storyboardData)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending': case 'Not Started': return 'bg-orange-100 text-orange-800'
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

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Components.Sidebar currentProject="cyber-nexus" projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/Sequence">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sequence
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <Components.ProjectHeader
            projectName="Cyber Nexus"
            title={storyboardData.name}
            description="Storyboard management and task tracking"
          >
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload New
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
                  Edit Storyboard
                </>
              )}
            </Button>
          </Components.ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Storyboard Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Image className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Storyboard Information</CardTitle>
                      <CardDescription>Basic storyboard details and associations</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">Storyboard Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={storyboardData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{storyboardData.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="sequence" className="text-slate-700 font-medium">Sequence</Label>
                      {isEditing ? (
                        <Select value={storyboardData.sequence} onValueChange={(value) => handleInputChange('sequence', value)}>
                          <SelectTrigger className="mt-1">
                            <Layers className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sequences.map(sequence => (
                              <SelectItem key={sequence.id} value={sequence.name}>
                                {sequence.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-slate-500" />
                          <Link to="/Sequence" className="font-medium text-blue-600 hover:text-blue-700">
                            {storyboardData.sequence}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={storyboardData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-slate-900 leading-relaxed">{storyboardData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Storyboard Preview */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Storyboard Preview</CardTitle>
                      <CardDescription>Latest version of the storyboard - Opening Sequence v3.2</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <ZoomIn className="w-4 h-4 mr-2" />
                      Full Screen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 overflow-hidden">
                    <img 
                      src="https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/2dd9723a-dbe0-4dc2-b6ec-84fc1f997217"
                      alt="Professional storyboard showing cyberpunk cityscape sequence with 6 panels in comic book style"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open('https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/2dd9723a-dbe0-4dc2-b6ec-84fc1f997217', '_blank')}
                    />
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Version
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Original
                      </Button>
                    </div>
                    <div className="text-sm text-slate-600">
                      Click image to view full size
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">12</div>
                      <div className="text-sm text-slate-600">Total Frames</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">v3.2</div>
                      <div className="text-sm text-slate-600">Current Version</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Approved</div>
                      <div className="text-sm text-slate-600">Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">2.1MB</div>
                      <div className="text-sm text-slate-600">File Size</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Associated Tasks */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Tasks</CardTitle>
                    <CardDescription>Tasks related to this storyboard</CardDescription>
                  </div>
                  <Link to="/TaskCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Task
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link to="/Task" className="font-semibold text-slate-900 hover:text-blue-600">
                              {task.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Assignee:</span>
                            <Link to="/User" className="ml-2 font-medium text-blue-600 hover:text-blue-700">
                              {task.assignee}
                            </Link>
                          </div>
                          <div>
                            <span className="text-slate-600">Department:</span>
                            <span className="ml-2 font-medium text-slate-900">{task.department}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Due Date:</span>
                            <span className="ml-2 font-medium text-slate-900">{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats and Info */}
            <div className="space-y-6">
              {/* Storyboard Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Storyboard Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Frames</span>
                      <span className="font-semibold text-slate-900">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Current Version</span>
                      <span className="font-semibold text-blue-600">v3.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Tasks</span>
                      <span className="font-semibold text-slate-900">{tasks.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Completed Tasks</span>
                      <span className="font-semibold text-green-600">{tasks.filter(t => t.status === 'Completed').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">In Progress</span>
                      <span className="font-semibold text-blue-600">{tasks.filter(t => t.status === 'In Progress').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Overview */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Task Completion</span>
                      <span className="font-medium text-slate-900">25%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Approval Status</span>
                      <span className="font-medium text-green-600">Approved</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
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
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Storyboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Revision
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Layers className="w-4 h-4 mr-2" />
                    View Sequence
                  </Button>
                </CardContent>
              </Card>

              {/* Version History */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">Version History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">v3.2 - Director Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">v3.1 - Revision Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-sm text-blue-800">v3.0 - Initial Draft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    <span className="text-sm text-blue-800">v2.5 - Concept Review</span>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-green-900">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-800">Director Review: Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-800">Revision: In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-green-800">Color Script: Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-green-800">Animatic: Scheduled</span>
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