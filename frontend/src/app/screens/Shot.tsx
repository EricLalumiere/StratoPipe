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
  Camera,
  Clock,
  Monitor,
  Settings,
  FileVideo,
  Eye,
  Download
} from 'lucide-react'
import Components from '../components'
import { StatusManager, useStatusManager, type TaskStatus, type ComponentStatus } from '../components/StatusManager'

export default function Shot() {
  const [isEditing, setIsEditing] = useState(false)
  const [shotData, setShotData] = useState({
    name: "Shot 001 - Wide Establishing",
    sequenceName: "Act 1 - Introduction",
    description: "Wide shot establishing the cyberpunk cityscape with neon lights reflecting off wet streets. Camera slowly pushes in to reveal the scale and atmosphere of the world.",
    frameRate: "24",
    globalTCIn: "00:00:00:00",
    globalTCOut: "00:00:08:00",
    imageResolution: "4096x2160",
    imageRatio: "16:9",
    codec: "ProRes 4444",
    fileFormat: "MOV"
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

  const imageResolutions = [
    "1920x1080", "2048x1080", "2560x1440", "3840x2160", "4096x2160", "5120x2880", "7680x4320"
  ]

  const imageRatios = [
    "16:9", "21:9", "4:3", "1.85:1", "2.35:1", "2.39:1", "1.33:1"
  ]

  const codecs = [
    "ProRes 422", "ProRes 4444", "H.264", "H.265", "DNxHD", "DNxHR", "Avid", "RED R3D", "ARRIRAW"
  ]

  const fileFormats = [
    "MOV", "MP4", "AVI", "MXF", "R3D", "ARRIRAW", "DPX", "EXR", "TIFF"
  ]

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Camera Animation",
      assignee: "Sarah Chen",
      department: "Layout",
      status: "Work in Progress",
      priority: "High",
      dueDate: "2024-04-22",
      description: "Animate camera movement for establishing shot"
    },
    {
      id: 2,
      name: "Environment Lighting",
      assignee: "Mike Rodriguez",
      department: "Lighting",
      status: "Ready to Start",
      priority: "Medium",
      dueDate: "2024-04-25",
      description: "Set up lighting for cyberpunk cityscape"
    },
    {
      id: 3,
      name: "Atmosphere Effects",
      assignee: "Emma Davis",
      department: "FX",
      status: "N/A",
      priority: "Medium",
      dueDate: "2024-04-28",
      description: "Add fog, rain, and atmospheric effects"
    },
    {
      id: 4,
      name: "Final Render",
      assignee: "David Kim",
      department: "Rendering",
      status: "N/A",
      priority: "High",
      dueDate: "2024-05-01",
      description: "Final high-quality render of the shot"
    }
  ])

  const { updateComponentStatus } = useStatusManager()

  // Convert tasks to TaskStatus format for status management
  const taskStatuses: TaskStatus[] = tasks.map(task => ({
    id: task.id,
    status: task.status as any,
    componentId: 'current-shot',
    componentType: "Shot"
  }))

  // Create component status object for status management
  const componentStatus: ComponentStatus = {
    id: 'current-shot',
    type: 'Shot',
    status: 'Work in Progress' as any, // Current shot status
    associatedTasks: taskStatuses
  }

  // Calculate and update shot status based on task statuses
  React.useEffect(() => {
    const updatedComponent = updateComponentStatus(componentStatus, taskStatuses)
    if (updatedComponent.status !== 'Work in Progress') {
      console.log(`🔄 Shot status auto-updated from "Work in Progress" to "${updatedComponent.status}" based on task statuses`)
      // In a real app, this would update the shot data in the database
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
    setShotData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving shot:', shotData)
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
            title={shotData.name}
            description="Shot specifications and task management"
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
                  Edit Shot
                </>
              )}
            </Button>
          </Components.ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Basic Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Camera className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Shot Information</CardTitle>
                      <CardDescription>Basic shot details and specifications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">Shot Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={shotData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{shotData.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="sequenceName" className="text-slate-700 font-medium">Sequence</Label>
                      {isEditing ? (
                        <Select value={shotData.sequenceName} onValueChange={(value) => handleInputChange('sequenceName', value)}>
                          <SelectTrigger className="mt-1">
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
                        <div className="mt-1">
                          <Link to="/Sequence" className="font-medium text-blue-600 hover:text-blue-700">
                            {shotData.sequenceName}
                          </Link>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="frameRate" className="text-slate-700 font-medium">Frame Rate</Label>
                      {isEditing ? (
                        <Input
                          id="frameRate"
                          value={shotData.frameRate}
                          onChange={(e) => handleInputChange('frameRate', e.target.value)}
                          className="mt-1"
                          placeholder="24"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{shotData.frameRate} fps</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="globalTCIn" className="text-slate-700 font-medium">Global TC In</Label>
                          {isEditing ? (
                            <Input
                              id="globalTCIn"
                              value={shotData.globalTCIn}
                              onChange={(e) => handleInputChange('globalTCIn', e.target.value)}
                              className="mt-1 font-mono"
                              placeholder="00:00:00:00"
                            />
                          ) : (
                            <div className="mt-1 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="font-mono font-medium text-slate-900">{shotData.globalTCIn}</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="globalTCOut" className="text-slate-700 font-medium">Global TC Out</Label>
                          {isEditing ? (
                            <Input
                              id="globalTCOut"
                              value={shotData.globalTCOut}
                              onChange={(e) => handleInputChange('globalTCOut', e.target.value)}
                              className="mt-1 font-mono"
                              placeholder="00:00:00:00"
                            />
                          ) : (
                            <div className="mt-1 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-500" />
                              <span className="font-mono font-medium text-slate-900">{shotData.globalTCOut}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={shotData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-slate-900 leading-relaxed">{shotData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <Settings className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Technical Specifications</CardTitle>
                      <CardDescription>Image resolution, codec, and format settings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="imageResolution" className="text-slate-700 font-medium">Image Resolution</Label>
                      {isEditing ? (
                        <Select value={shotData.imageResolution} onValueChange={(value) => handleInputChange('imageResolution', value)}>
                          <SelectTrigger className="mt-1">
                            <Monitor className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {imageResolutions.map(resolution => (
                              <SelectItem key={resolution} value={resolution}>
                                {resolution}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-900">{shotData.imageResolution}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="imageRatio" className="text-slate-700 font-medium">Image Ratio</Label>
                      {isEditing ? (
                        <Select value={shotData.imageRatio} onValueChange={(value) => handleInputChange('imageRatio', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {imageRatios.map(ratio => (
                              <SelectItem key={ratio} value={ratio}>
                                {ratio}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{shotData.imageRatio}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="codec" className="text-slate-700 font-medium">Codec</Label>
                      {isEditing ? (
                        <Select value={shotData.codec} onValueChange={(value) => handleInputChange('codec', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {codecs.map(codec => (
                              <SelectItem key={codec} value={codec}>
                                {codec}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{shotData.codec}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="fileFormat" className="text-slate-700 font-medium">File Format</Label>
                      {isEditing ? (
                        <Select value={shotData.fileFormat} onValueChange={(value) => handleInputChange('fileFormat', value)}>
                          <SelectTrigger className="mt-1">
                            <FileVideo className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fileFormats.map(format => (
                              <SelectItem key={format} value={format}>
                                {format}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <FileVideo className="w-4 h-4 text-slate-500" />
                          <span className="font-medium text-slate-900">{shotData.fileFormat}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Associated Tasks */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Tasks</CardTitle>
                    <CardDescription>Tasks related to this shot</CardDescription>
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
              {/* Shot Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Shot Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Duration</span>
                      <span className="font-semibold text-slate-900">8 seconds</span>
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Resolution</span>
                      <span className="font-semibold text-slate-900">{shotData.imageResolution}</span>
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
                      <span className="text-slate-600">Quality Check</span>
                      <span className="font-medium text-slate-900">Pending</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '0%' }}></div>
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
                    Preview Shot
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    View in Sequence
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Render Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-800">Camera Animation: In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-blue-800">Lighting: Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-blue-800">Effects: Not Started</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-blue-800">Final Render: Scheduled</span>
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