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
  Layers,
  Clock,
  Image,
  Video,
  FileText,
  Upload,
  Eye,
  Download
} from 'lucide-react'
import Components from '../components'
import { StatusManager, useStatusManager, type TaskStatus, type ComponentStatus } from '../components/StatusManager'

export default function Sequence() {
  const [isEditing, setIsEditing] = useState(false)
  const [sequenceData, setSequenceData] = useState({
    name: "Act 1 - Introduction",
    description: "Opening sequence introducing main characters and establishing the cyberpunk world setting. Features character introductions, world-building shots, and initial conflict setup.",
    globalTCIn: "00:00:00:00",
    globalTCOut: "00:15:30:00",
    storyboard: "Opening Storyboard",
    sourceScene: "Opening Sequence",
    edl: "Act 1 Editorial"
  })

  const [storyboardCreation, setStoryboardCreation] = useState({
    name: "",
    description: "",
    file: null
  })

  const [edlCreation, setEDLCreation] = useState({
    name: "",
    description: "",
    file: null
  })

  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  const storyboards = [
    { id: 1, name: "Opening Storyboard", scenes: 5, status: "Approved" },
    { id: 2, name: "Action Sequence Boards", scenes: 8, status: "In Review" },
    { id: 3, name: "Character Introduction", scenes: 3, status: "Draft" }
  ]

  const scenes = [
    { id: 1, name: "Opening Sequence" },
    { id: 2, name: "Character Introduction" },
    { id: 3, name: "World Establishment" },
    { id: 4, name: "Conflict Setup" }
  ]

  const edls = [
    { id: 1, name: "Act 1 Editorial", sequences: 3, status: "Final" },
    { id: 2, name: "Action Sequence Edit", sequences: 1, status: "Draft" },
    { id: 3, name: "Character Moments", sequences: 2, status: "Review" }
  ]

  const shots = [
    {
      id: 1,
      name: "Shot 001 - Wide Establishing",
      sequence: "Act 1 - Introduction",
      status: "Completed",
      duration: "00:00:08:00",
      description: "Wide shot establishing the cyberpunk cityscape"
    },
    {
      id: 2,
      name: "Shot 002 - Character Close-up",
      sequence: "Act 1 - Introduction",
      status: "In Progress",
      duration: "00:00:04:15",
      description: "Close-up of main character Zara"
    },
    {
      id: 3,
      name: "Shot 003 - Environment Pan",
      sequence: "Act 1 - Introduction",
      status: "Planning",
      duration: "00:00:12:00",
      description: "Panning shot revealing the environment details"
    }
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
      description: "Review and refine sequence editing"
    },
    {
      id: 2,
      name: "Storyboard Updates",
      assignee: "Mike Johnson",
      department: "Concept Art",
      status: "Ready to Start",
      priority: "Medium",
      dueDate: "2024-04-25",
      description: "Update storyboards based on latest changes"
    },
    {
      id: 3,
      name: "Shot Planning",
      assignee: "Sarah Chen",
      department: "Layout",
      status: "Published",
      priority: "High",
      dueDate: "2024-04-18",
      description: "Plan camera angles and shot compositions"
    }
  ])

  const { updateComponentStatus } = useStatusManager()

  // Convert tasks to TaskStatus format for status management
  const taskStatuses: TaskStatus[] = tasks.map(task => ({
    id: task.id,
    status: task.status as any,
    componentId: 'current-sequence',
    componentType: "Sequence"
  }))

  // Create component status object for status management
  const componentStatus: ComponentStatus = {
    id: 'current-sequence',
    type: 'Sequence',
    status: 'Work in Progress' as any, // Current sequence status
    associatedTasks: taskStatuses
  }

  // Calculate and update sequence status based on task statuses
  React.useEffect(() => {
    const updatedComponent = updateComponentStatus(componentStatus, taskStatuses)
    if (updatedComponent.status !== 'Work in Progress') {
      console.log(`🔄 Sequence status auto-updated from "Work in Progress" to "${updatedComponent.status}" based on task statuses`)
      // In a real app, this would update the sequence data in the database
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
    setSequenceData(prev => ({ ...prev, [field]: value }))
  }

  const handleStoryboardChange = (field: string, value: string) => {
    setStoryboardCreation(prev => ({ ...prev, [field]: value }))
  }

  const handleEDLChange = (field: string, value: string) => {
    setEDLCreation(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving sequence:', sequenceData)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': case 'Final': case 'Approved': return 'bg-green-100 text-green-800'
      case 'In Progress': case 'In Review': return 'bg-blue-100 text-blue-800'
      case 'Pending': case 'Planning': case 'Draft': case 'Review': return 'bg-orange-100 text-orange-800'
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
            <Link to="/Sequences">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sequences
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <Components.ProjectHeader
            projectName="Cyber Nexus"
            title={sequenceData.name}
            description="Sequence details, storyboards, and shot management"
          >
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
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
                  Edit Sequence
                </>
              )}
            </Button>
          </Components.ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Sequence Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Layers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Sequence Information</CardTitle>
                      <CardDescription>Basic sequence details and specifications</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-700 font-medium">Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={sequenceData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 font-medium text-slate-900">{sequenceData.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="globalTCIn" className="text-slate-700 font-medium">Global TC In</Label>
                        {isEditing ? (
                          <Input
                            id="globalTCIn"
                            value={sequenceData.globalTCIn}
                            onChange={(e) => handleInputChange('globalTCIn', e.target.value)}
                            className="mt-1 font-mono"
                            placeholder="00:00:00:00"
                          />
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="font-mono font-medium text-slate-900">{sequenceData.globalTCIn}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="storyboard" className="text-slate-700 font-medium">Storyboard</Label>
                        {isEditing ? (
                          <Select value={sequenceData.storyboard} onValueChange={(value) => handleInputChange('storyboard', value)}>
                            <SelectTrigger className="mt-1">
                              <Image className="w-4 h-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {storyboards.map(storyboard => (
                                <SelectItem key={storyboard.id} value={storyboard.name}>
                                  {storyboard.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Image className="w-4 h-4 text-slate-500" />
                            <Link to="/Storyboard" className="font-medium text-blue-600 hover:text-blue-700">
                              {sequenceData.storyboard}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="globalTCOut" className="text-slate-700 font-medium">Global TC Out</Label>
                        {isEditing ? (
                          <Input
                            id="globalTCOut"
                            value={sequenceData.globalTCOut}
                            onChange={(e) => handleInputChange('globalTCOut', e.target.value)}
                            className="mt-1 font-mono"
                            placeholder="00:00:00:00"
                          />
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="font-mono font-medium text-slate-900">{sequenceData.globalTCOut}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="sourceScene" className="text-slate-700 font-medium">Source Scene</Label>
                        {isEditing ? (
                          <Select value={sequenceData.sourceScene} onValueChange={(value) => handleInputChange('sourceScene', value)}>
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
                              {sequenceData.sourceScene}
                            </Link>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="edl" className="text-slate-700 font-medium">EDL</Label>
                        {isEditing ? (
                          <Select value={sequenceData.edl} onValueChange={(value) => handleInputChange('edl', value)}>
                            <SelectTrigger className="mt-1">
                              <FileText className="w-4 h-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {edls.map(edl => (
                                <SelectItem key={edl.id} value={edl.name}>
                                  {edl.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <Link to="/EDL" className="font-medium text-blue-600 hover:text-blue-700">
                              {sequenceData.edl}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={sequenceData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-slate-900 leading-relaxed">{sequenceData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Storyboard Creation */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Storyboard Creation</CardTitle>
                  <CardDescription>Create a new storyboard for this sequence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="storyboardName" className="text-slate-700 font-medium">Name</Label>
                      <Input
                        id="storyboardName"
                        value={storyboardCreation.name}
                        onChange={(e) => handleStoryboardChange('name', e.target.value)}
                        placeholder="Enter storyboard name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="storyboardDescription" className="text-slate-700 font-medium">Description</Label>
                      <Input
                        id="storyboardDescription"
                        value={storyboardCreation.description}
                        onChange={(e) => handleStoryboardChange('description', e.target.value)}
                        placeholder="Enter description"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-slate-700 font-medium">File Upload</Label>
                    <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Click to upload storyboard file</p>
                      <p className="text-xs text-slate-500">PNG, JPG, PDF up to 50MB</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Storyboard
                  </Button>
                </CardContent>
              </Card>

              {/* EDL Creation */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">EDL Creation</CardTitle>
                  <CardDescription>Create a new Edit Decision List for this sequence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edlName" className="text-slate-700 font-medium">Name</Label>
                      <Input
                        id="edlName"
                        value={edlCreation.name}
                        onChange={(e) => handleEDLChange('name', e.target.value)}
                        placeholder="Enter EDL name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edlDescription" className="text-slate-700 font-medium">Description</Label>
                      <Input
                        id="edlDescription"
                        value={edlCreation.description}
                        onChange={(e) => handleEDLChange('description', e.target.value)}
                        placeholder="Enter description"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-slate-700 font-medium">File Upload</Label>
                    <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Click to upload EDL file</p>
                      <p className="text-xs text-slate-500">EDL, XML, AAF up to 10MB</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create EDL
                  </Button>
                </CardContent>
              </Card>

              {/* Associated Shots */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Shots</CardTitle>
                    <CardDescription>Shots that make up this sequence</CardDescription>
                  </div>
                  <Link to="/ShotCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Shot
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shots.map((shot) => (
                      <div key={shot.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <Link to="/Shot" className="font-semibold text-slate-900 hover:text-blue-600">
                              {shot.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{shot.description}</p>
                          </div>
                          <Badge className={getStatusColor(shot.status)}>
                            {shot.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{shot.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Associated Tasks */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Tasks</CardTitle>
                    <CardDescription>Tasks related to this sequence</CardDescription>
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
              {/* Sequence Stats */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Sequence Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Shots</span>
                      <span className="font-semibold text-slate-900">{shots.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Completed Shots</span>
                      <span className="font-semibold text-green-600">{shots.filter(s => s.status === 'Completed').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Active Tasks</span>
                      <span className="font-semibold text-slate-900">{tasks.filter(t => t.status !== 'Completed').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Duration</span>
                      <span className="font-semibold text-slate-900">15:30</span>
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
                    Preview Sequence
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export EDL
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="w-4 h-4 mr-2" />
                    View Storyboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    View Source Scene
                  </Button>
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
                      <span className="text-slate-600">Shot Completion</span>
                      <span className="font-medium text-slate-900">33%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Task Completion</span>
                      <span className="font-medium text-slate-900">33%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">Storyboard: Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-800">Editorial: In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-blue-800">Shot Production: Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    <span className="text-sm text-blue-800">Final Review: Scheduled</span>
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