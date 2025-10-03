'use client'

import React, { useState } from 'react'
import { Link } from '@/lib'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Plus,
  Edit,
  Save,
  FileText,
  Layers,
  Video,
  Download,
  Eye,
  Upload
} from 'lucide-react'
import Components from '../components'
import { StatusManager, useStatusManager, type TaskStatus, type ComponentStatus } from '../components/StatusManager'

export default function EDL() {
  const [isEditing, setIsEditing] = useState(false)
  const [edlData, setEDLData] = useState({
    name: "Act 1 Editorial v2.1",
    sequence: "Act 1 - Introduction",
    scene: "Opening Sequence"
  })

  // Get current project from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const currentProjectId = urlParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]

  const sequences = [
    { id: 1, name: "Act 1 - Introduction" },
    { id: 2, name: "Act 2 - Rising Action" },
    { id: 3, name: "Act 3 - Climax" },
    { id: 4, name: "Act 4 - Resolution" }
  ]

  const scenes = [
    { id: 1, name: "Opening Sequence" },
    { id: 2, name: "Character Introduction" },
    { id: 3, name: "World Establishment" },
    { id: 4, name: "Conflict Setup" }
  ]

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Editorial Review",
      assignee: "Emma Davis",
      department: "Editorial",
      status: "Work in Progress",
      priority: "High",
      dueDate: "2024-04-22",
      description: "Review and refine edit decision list timing"
    },
    {
      id: 2,
      name: "Color Grading Prep",
      assignee: "Marcus Johnson",
      department: "Color",
      status: "Ready to Start",
      priority: "Medium",
      dueDate: "2024-04-25",
      description: "Prepare EDL for color grading workflow"
    },
    {
      id: 3,
      name: "Audio Sync",
      assignee: "Lisa Rodriguez",
      department: "Audio",
      status: "Published",
      priority: "High",
      dueDate: "2024-04-18",
      description: "Sync audio tracks with EDL timecodes"
    },
    {
      id: 4,
      name: "Final Export",
      assignee: "David Chen",
      department: "Post Production",
      status: "N/A",
      priority: "Medium",
      dueDate: "2024-04-28",
      description: "Export final EDL for delivery"
    }
  ])

  const { updateComponentStatus } = useStatusManager()

  // Convert tasks to TaskStatus format for status management
  const taskStatuses: TaskStatus[] = tasks.map(task => ({
    id: task.id,
    status: task.status as any,
    componentId: 'current-edl',
    componentType: "EDL"
  }))

  // Create component status object for status management
  const componentStatus: ComponentStatus = {
    id: 'current-edl',
    type: 'EDL',
    status: 'Work in Progress' as any, // Current EDL status
    associatedTasks: taskStatuses
  }

  // Calculate and update EDL status based on task statuses
  React.useEffect(() => {
    const updatedComponent = updateComponentStatus(componentStatus, taskStatuses)
    if (updatedComponent.status !== 'Work in Progress') {
      console.log(`🔄 EDL status auto-updated from "Work in Progress" to "${updatedComponent.status}" based on task statuses`)
      // In a real app, this would update the EDL data in the database
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

  const edlEntries = [
    {
      id: 1,
      event: "001",
      sourceIn: "01:00:10:00",
      sourceOut: "01:00:18:00",
      recordIn: "00:00:00:00",
      recordOut: "00:00:08:00",
      clipName: "Shot_001_Wide_Establishing",
      track: "V1"
    },
    {
      id: 2,
      event: "002",
      sourceIn: "01:05:22:15",
      sourceOut: "01:05:26:20",
      recordIn: "00:00:08:00",
      recordOut: "00:00:12:05",
      clipName: "Shot_002_Character_Closeup",
      track: "V1"
    },
    {
      id: 3,
      event: "003",
      sourceIn: "01:12:45:10",
      sourceOut: "01:12:57:10",
      recordIn: "00:00:12:05",
      recordOut: "00:00:24:05",
      clipName: "Shot_003_Environment_Pan",
      track: "V1"
    },
    {
      id: 4,
      event: "004",
      sourceIn: "02:03:15:00",
      sourceOut: "02:03:21:12",
      recordIn: "00:00:24:05",
      recordOut: "00:00:30:17",
      clipName: "Shot_004_Detail_Insert",
      track: "V1"
    }
  ]

  const handleInputChange = (field: string, value: string) => {
    setEDLData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving EDL:', edlData)
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
      <Components.Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <Components.ProjectHeader 
          projectName={currentProject.name}
          title={edlData.name}
          description="Edit Decision List management and task tracking"
        />
        
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/Sequence">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sequence
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div></div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export EDL
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
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
                      Edit EDL
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* EDL Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">EDL Information</CardTitle>
                      <CardDescription>Edit Decision List details and associations</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">EDL Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={edlData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1 font-medium text-slate-900">{edlData.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="sequence" className="text-slate-700 font-medium">Sequence</Label>
                      {isEditing ? (
                        <Select value={edlData.sequence} onValueChange={(value) => handleInputChange('sequence', value)}>
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
                            {edlData.sequence}
                          </Link>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="scene" className="text-slate-700 font-medium">Scene</Label>
                      {isEditing ? (
                        <Select value={edlData.scene} onValueChange={(value) => handleInputChange('scene', value)}>
                          <SelectTrigger className="mt-1">
                            <Video className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {scenes.map(scene => (
                              <SelectItem key={scene.id} value={scene.name}>
                                {scene.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <Video className="w-4 h-4 text-slate-500" />
                          <Link to="/Scene" className="font-medium text-blue-600 hover:text-blue-700">
                            {edlData.scene}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EDL Entries */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">EDL Entries</CardTitle>
                  <CardDescription>Edit decision list timeline and cuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Event</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Source In</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Source Out</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Record In</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Record Out</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Clip Name</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-700">Track</th>
                        </tr>
                      </thead>
                      <tbody>
                        {edlEntries.map((entry) => (
                          <tr key={entry.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-2 font-mono font-medium text-slate-900">{entry.event}</td>
                            <td className="py-3 px-2 font-mono text-slate-700">{entry.sourceIn}</td>
                            <td className="py-3 px-2 font-mono text-slate-700">{entry.sourceOut}</td>
                            <td className="py-3 px-2 font-mono text-slate-700">{entry.recordIn}</td>
                            <td className="py-3 px-2 font-mono text-slate-700">{entry.recordOut}</td>
                            <td className="py-3 px-2 text-slate-900">{entry.clipName}</td>
                            <td className="py-3 px-2">
                              <Badge variant="outline" className="font-mono">
                                {entry.track}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Associated Tasks */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Tasks</CardTitle>
                    <CardDescription>Tasks related to this EDL</CardDescription>
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
              {/* EDL Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">EDL Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Events</span>
                      <span className="font-semibold text-slate-900">{edlEntries.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Duration</span>
                      <span className="font-semibold text-slate-900">30:17</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Video Tracks</span>
                      <span className="font-semibold text-slate-900">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Active Tasks</span>
                      <span className="font-semibold text-slate-900">{tasks.filter(t => t.status !== 'Completed').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Completed Tasks</span>
                      <span className="font-semibold text-green-600">{tasks.filter(t => t.status === 'Completed').length}</span>
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
                      <span className="text-slate-600">Editorial Review</span>
                      <span className="font-medium text-slate-900">In Progress</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
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
                    Preview Timeline
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export EDL File
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Updates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Layers className="w-4 h-4 mr-2" />
                    View Sequence
                  </Button>
                </CardContent>
              </Card>

              {/* Format Information */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">EDL Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-blue-800">
                  <p>• CMX 3600 compatible format</p>
                  <p>• Timecode format: HH:MM:SS:FF</p>
                  <p>• Video track assignments supported</p>
                  <p>• Cut and dissolve transitions</p>
                  <p>• Source reel names preserved</p>
                  <p>• Compatible with major NLE systems</p>
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
                    <span className="text-sm text-green-800">Audio Sync: Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-800">Editorial Review: In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-green-800">Color Prep: Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-green-800">Final Export: Scheduled</span>
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