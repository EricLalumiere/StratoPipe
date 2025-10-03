'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
  Video,
  Layers,
  Film,
  Play,
  Scissors,
  FileText,
  Clock,
  Users,
  Eye,
  Download,
  Settings
} from 'lucide-react'
import ProjectHeader from './ProjectHeader'
import { useStatusPreferences } from './StatusPreferences'

interface SceneProps {
  sceneId?: string
  projectName?: string
  onSave?: (sceneData: any) => void
  onCancel?: () => void
}

export default function Scene({ 
  sceneId = 'opening-sequence',
  projectName = 'Cyber Nexus',
  onSave,
  onCancel 
}: SceneProps) {
  const { getStatusColor } = useStatusPreferences()
  
  const [isEditing, setIsEditing] = useState(false)
  const [sceneData, setSceneData] = useState({
    name: "Opening Sequence",
    description: "The opening scene establishes the cyberpunk world setting with atmospheric shots of the neon-lit cityscape. Features character introductions and sets up the main conflict through environmental storytelling and dramatic lighting.",
    status: "Work in Progress",
    createdDate: "2024-04-15",
    lastModified: "2024-04-20",
    duration: "00:15:30:00",
    location: "Neo Tokyo District - Virtual Set",
    timeOfDay: "Night",
    weather: "Rain"
  })

  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  // Associated components data
  const [associatedTakes, setAssociatedTakes] = useState([
    {
      id: 1,
      name: "Take 001 - Opening Sequence",
      shootingDay: "Day 1 - Motion Capture Session",
      status: "Completed",
      duration: "00:01:44:26",
      actors: ["Emma Thompson", "David Chen"],
      description: "Main character introduction with motion capture performance"
    },
    {
      id: 2,
      name: "Take 002 - Environment Setup",
      shootingDay: "Day 2 - Environment Capture",
      status: "In Progress", 
      duration: "00:02:15:12",
      actors: ["Background Performers"],
      description: "Environmental shots and background action"
    }
  ])

  const [associatedClips, setAssociatedClips] = useState([
    {
      id: 1,
      name: "Clip_001_Opening_Wide",
      type: "Master Shot",
      source: "Camera A",
      status: "Approved",
      duration: "00:00:45:00",
      frameRate: "24",
      description: "Wide establishing shot of the cyberpunk cityscape"
    },
    {
      id: 2,
      name: "Clip_002_Character_CU",
      type: "Close-up",
      source: "Camera B", 
      status: "Work in Progress",
      duration: "00:00:30:15",
      frameRate: "24",
      description: "Close-up of main character Zara"
    },
    {
      id: 3,
      name: "Clip_003_Environment_Pan",
      type: "Pan Shot",
      source: "Camera C",
      status: "Ready to Start",
      duration: "00:01:12:00",
      frameRate: "24",
      description: "Panning shot revealing environment details"
    }
  ])

  const [associatedEDLs, setAssociatedEDLs] = useState([
    {
      id: 1,
      name: "Opening_Sequence_Edit_v1",
      sequences: 3,
      status: "Draft",
      totalDuration: "00:15:30:00",
      lastModified: "2024-04-20",
      description: "Initial edit of the opening sequence with basic cuts"
    },
    {
      id: 2,
      name: "Opening_Sequence_Final",
      sequences: 3,
      status: "Pending Review",
      totalDuration: "00:15:45:12",
      lastModified: "2024-04-22",
      description: "Final edit with color correction and effects"
    }
  ])

  const [associatedSequences, setAssociatedSequences] = useState([
    {
      id: 1,
      name: "Act 1 - Introduction",
      shots: 8,
      status: "Work in Progress",
      duration: "00:15:30:00",
      description: "Opening sequence introducing main characters and world"
    },
    {
      id: 2,
      name: "Character Establishment",
      shots: 5,
      status: "Ready to Start", 
      duration: "00:08:45:00",
      description: "Character introduction and motivation setup"
    }
  ])

  const [associatedShots, setAssociatedShots] = useState([
    {
      id: 1,
      name: "Shot 001 - Wide Establishing",
      sequence: "Act 1 - Introduction",
      status: "Completed",
      duration: "00:00:08:00",
      camera: "Camera A",
      description: "Wide shot establishing the cyberpunk cityscape"
    },
    {
      id: 2,
      name: "Shot 002 - Character Close-up",
      sequence: "Act 1 - Introduction", 
      status: "Work in Progress",
      duration: "00:00:04:15",
      camera: "Camera B",
      description: "Close-up of main character Zara"
    },
    {
      id: 3,
      name: "Shot 003 - Environment Pan",
      sequence: "Act 1 - Introduction",
      status: "Ready to Start",
      duration: "00:00:12:00", 
      camera: "Camera C",
      description: "Panning shot revealing environment details"
    },
    {
      id: 4,
      name: "Shot 004 - Reaction Shot",
      sequence: "Character Establishment",
      status: "N/A",
      duration: "00:00:06:00",
      camera: "Camera D", 
      description: "Character reaction to environment reveal"
    }
  ])

  const handleInputChange = (field: string, value: string) => {
    setSceneData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving scene:', sceneData)
    onSave?.(sceneData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    onCancel?.()
  }

  const getStatusColorClass = (status: string) => {
    return getStatusColor(status)
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
            <Link to="/Scenes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scenes
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <ProjectHeader
            projectName={projectName}
            title={sceneData.name}
            description="Scene management with associated components and metadata"
          >
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview Scene
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
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
                  Edit Scene
                </>
              )}
            </Button>
          </Components.ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Scene Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Video className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Scene Information</CardTitle>
                      <CardDescription>Basic scene details and metadata</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-700 font-medium">Scene Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={sceneData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 font-medium text-slate-900">{sceneData.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="status" className="text-slate-700 font-medium">Status</Label>
                        {isEditing ? (
                          <Select value={sceneData.status} onValueChange={(value) => handleInputChange('status', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ready to Start">Ready to Start</SelectItem>
                              <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Pending Review">Pending Review</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="N/A">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1">
                            <Badge className={getStatusColorClass(sceneData.status)}>
                              {sceneData.status}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                        {isEditing ? (
                          <Input
                            id="location"
                            value={sceneData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="mt-1"
                            placeholder="Scene location"
                          />
                        ) : (
                          <p className="mt-1 font-medium text-slate-900">{sceneData.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="duration" className="text-slate-700 font-medium">Duration</Label>
                        {isEditing ? (
                          <Input
                            id="duration"
                            value={sceneData.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            className="mt-1 font-mono"
                            placeholder="00:00:00:00"
                          />
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="font-mono font-medium text-slate-900">{sceneData.duration}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="timeOfDay" className="text-slate-700 font-medium">Time of Day</Label>
                        {isEditing ? (
                          <Select value={sceneData.timeOfDay} onValueChange={(value) => handleInputChange('timeOfDay', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Dawn">Dawn</SelectItem>
                              <SelectItem value="Morning">Morning</SelectItem>
                              <SelectItem value="Afternoon">Afternoon</SelectItem>
                              <SelectItem value="Evening">Evening</SelectItem>
                              <SelectItem value="Night">Night</SelectItem>
                              <SelectItem value="Midnight">Midnight</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="mt-1 font-medium text-slate-900">{sceneData.timeOfDay}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="weather" className="text-slate-700 font-medium">Weather</Label>
                        {isEditing ? (
                          <Select value={sceneData.weather} onValueChange={(value) => handleInputChange('weather', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Clear">Clear</SelectItem>
                              <SelectItem value="Cloudy">Cloudy</SelectItem>
                              <SelectItem value="Rain">Rain</SelectItem>
                              <SelectItem value="Storm">Storm</SelectItem>
                              <SelectItem value="Snow">Snow</SelectItem>
                              <SelectItem value="Fog">Fog</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="mt-1 font-medium text-slate-900">{sceneData.weather}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={sceneData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-slate-900 leading-relaxed">{sceneData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Associated Takes */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Takes</CardTitle>
                    <CardDescription>Motion capture takes for this scene</CardDescription>
                  </div>
                  <Link to="/TakeCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Take
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {associatedTakes.map((take) => (
                      <div key={take.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link to="/Take" className="font-semibold text-slate-900 hover:text-blue-600">
                              {take.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{take.description}</p>
                          </div>
                          <Badge className={getStatusColorClass(take.status)}>
                            {take.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Shooting Day:</span>
                            <Link to="/ShootingDay" className="ml-2 font-medium text-blue-600 hover:text-blue-700">
                              {take.shootingDay}
                            </Link>
                          </div>
                          <div>
                            <span className="text-slate-600">Duration:</span>
                            <span className="ml-2 font-mono font-medium text-slate-900">{take.duration}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Actors:</span>
                            <span className="ml-2 font-medium text-slate-900">{take.actors.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Associated Clips */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Clips</CardTitle>
                    <CardDescription>Video clips captured for this scene</CardDescription>
                  </div>
                  <Link to="/ClipCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Clip
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {associatedClips.map((clip) => (
                      <div key={clip.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link to="/Clip" className="font-semibold text-slate-900 hover:text-blue-600">
                              {clip.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{clip.description}</p>
                          </div>
                          <Badge className={getStatusColorClass(clip.status)}>
                            {clip.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Type:</span>
                            <span className="ml-2 font-medium text-slate-900">{clip.type}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Source:</span>
                            <span className="ml-2 font-medium text-slate-900">{clip.source}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Duration:</span>
                            <span className="ml-2 font-mono font-medium text-slate-900">{clip.duration}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Frame Rate:</span>
                            <span className="ml-2 font-medium text-slate-900">{clip.frameRate} fps</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Associated EDLs */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated EDLs</CardTitle>
                    <CardDescription>Edit Decision Lists for this scene</CardDescription>
                  </div>
                  <Link to="/EDLCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add EDL
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {associatedEDLs.map((edl) => (
                      <div key={edl.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link to="/EDL" className="font-semibold text-slate-900 hover:text-blue-600">
                              {edl.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{edl.description}</p>
                          </div>
                          <Badge className={getStatusColorClass(edl.status)}>
                            {edl.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Sequences:</span>
                            <span className="ml-2 font-medium text-slate-900">{edl.sequences}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Duration:</span>
                            <span className="ml-2 font-mono font-medium text-slate-900">{edl.totalDuration}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Last Modified:</span>
                            <span className="ml-2 font-medium text-slate-900">{edl.lastModified}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Associated Sequences */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Sequences</CardTitle>
                    <CardDescription>Sequences that belong to this scene</CardDescription>
                  </div>
                  <Link to="/SequenceCreation">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Sequence
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {associatedSequences.map((sequence) => (
                      <div key={sequence.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link to="/Sequence" className="font-semibold text-slate-900 hover:text-blue-600">
                              {sequence.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{sequence.description}</p>
                          </div>
                          <Badge className={getStatusColorClass(sequence.status)}>
                            {sequence.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Shots:</span>
                            <span className="ml-2 font-medium text-slate-900">{sequence.shots}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Duration:</span>
                            <span className="ml-2 font-mono font-medium text-slate-900">{sequence.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Associated Shots */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Associated Shots</CardTitle>
                    <CardDescription>Individual shots that make up this scene</CardDescription>
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
                    {associatedShots.map((shot) => (
                      <div key={shot.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Link to="/Shot" className="font-semibold text-slate-900 hover:text-blue-600">
                              {shot.name}
                            </Link>
                            <p className="text-sm text-slate-600 mt-1">{shot.description}</p>
                          </div>
                          <Badge className={getStatusColorClass(shot.status)}>
                            {shot.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Sequence:</span>
                            <Link to="/Sequence" className="ml-2 font-medium text-blue-600 hover:text-blue-700">
                              {shot.sequence}
                            </Link>
                          </div>
                          <div>
                            <span className="text-slate-600">Duration:</span>
                            <span className="ml-2 font-mono font-medium text-slate-900">{shot.duration}</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Camera:</span>
                            <span className="ml-2 font-medium text-slate-900">{shot.camera}</span>
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
              {/* Scene Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Scene Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Takes</span>
                      <span className="font-semibold text-slate-900">{associatedTakes.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Clips</span>
                      <span className="font-semibold text-slate-900">{associatedClips.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total EDLs</span>
                      <span className="font-semibold text-slate-900">{associatedEDLs.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Sequences</span>
                      <span className="font-semibold text-slate-900">{associatedSequences.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Shots</span>
                      <span className="font-semibold text-slate-900">{associatedShots.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Completed Shots</span>
                      <span className="font-semibold text-green-600">
                        {associatedShots.filter(s => s.status === 'Completed').length}
                      </span>
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
                      <span className="text-slate-600">Shot Completion</span>
                      <span className="font-medium text-slate-900">25%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Take Processing</span>
                      <span className="font-medium text-slate-900">50%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Editorial Progress</span>
                      <span className="font-medium text-slate-900">75%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
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
                    Preview Scene
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Scene Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Play All Takes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Scene Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Scene Details */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Scene Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Created:</span>
                    <span className="font-medium text-slate-900">{sceneData.createdDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Modified:</span>
                    <span className="font-medium text-slate-900">{sceneData.lastModified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Location:</span>
                    <span className="font-medium text-slate-900">{sceneData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time of Day:</span>
                    <span className="font-medium text-slate-900">{sceneData.timeOfDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Weather:</span>
                    <span className="font-medium text-slate-900">{sceneData.weather}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-900">Production Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-blue-800">Motion Capture: Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-800">Editorial: In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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