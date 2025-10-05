'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Edit, Save, X, Plus, Eye, Trash2, MapPin, Clock, Sun, User, Calendar, Clapperboard, Film, FileText, Camera, Play, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Components from '../components'

export default function Scene() {
  const [sceneId, setSceneId] = useState('')
  const [currentProject, setCurrentProject] = useState('cyber-nexus')
  const [isEditing, setIsEditing] = useState(false)
  const [sceneData, setSceneData] = useState({
    id: 1,
    name: 'SC001_City_Establishing',
    description: 'Wide establishing shot of the cyberpunk metropolis at night',
    status: 'Completed',
    location: 'Neo Tokyo District',
    duration: '00:00:15',
    timeOfDay: 'Night',
    weather: 'Clear',
    creator: 'Sarah Chen',
    createdDate: '2024-01-15',
    modifiedDate: '2024-01-20',
    notes: 'This scene establishes the mood and setting for the entire film. Focus on the neon lighting and atmospheric effects.',
    image: 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/1886799b-8f1b-4f02-a1d5-b440f5b423fd',
    project: 'cyber-nexus'
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sceneIdParam = urlParams.get('id')
    const projectParam = urlParams.get('project')
    
    if (sceneIdParam) setSceneId(sceneIdParam)
    if (projectParam) setCurrentProject(projectParam)

    // In a real app, fetch scene data based on sceneId
    // For now, using mock data
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setSceneData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // In a real app, save to backend
    console.log('Saving scene data:', sceneData)
    setIsEditing(false)
  }

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'Work in Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Ready to Start': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Pending Review': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'N/A': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'rain': return '🌧️'
      case 'clear': return '☀️'
      case 'cloudy': return '☁️'
      case 'snow': return '❄️'
      case 'fog': return '🌫️'
      case 'underwater': return '🌊'
      case 'space': return '🌌'
      default: return '🌤️'
    }
  }

  const getProjectName = (projectId: string) => {
    const projects = {
      'cyber-nexus': 'Cyber Nexus',
      'ocean-depths': 'Ocean Depths',
      'space-odyssey': 'Space Odyssey'
    }
    return projects[projectId as keyof typeof projects] || 'Unknown Project'
  }

  // Mock data for associations
  const associatedTakes = [
    { id: 1, name: 'TK001_Establishing_A', shootingDay: 'Day 1', actor: 'N/A', status: 'Completed' },
    { id: 2, name: 'TK002_Establishing_B', shootingDay: 'Day 1', actor: 'N/A', status: 'Completed' },
    { id: 3, name: 'TK003_Establishing_C', shootingDay: 'Day 2', actor: 'N/A', status: 'Work in Progress' }
  ]

  const associatedClips = [
    { id: 1, name: 'CL001_City_Wide', type: 'Master Shot', duration: '00:00:15', status: 'Completed' },
    { id: 2, name: 'CL002_City_Detail', type: 'Insert', duration: '00:00:08', status: 'Completed' }
  ]

  const associatedEDLs = [
    { id: 1, name: 'EDL_001_Opening', sequences: 3, status: 'Completed', modifiedDate: '2024-01-20' }
  ]

  const associatedSequences = [
    { id: 1, name: 'SEQ001_Opening', shots: 4, duration: '00:02:30', status: 'Completed' }
  ]

  const associatedShots = [
    { id: 1, name: 'SH001_Wide_Establishing', camera: 'Camera A', sequence: 'SEQ001_Opening', status: 'Completed' },
    { id: 2, name: 'SH002_Medium_Buildings', camera: 'Camera B', sequence: 'SEQ001_Opening', status: 'Completed' },
    { id: 3, name: 'SH003_Close_Neon', camera: 'Camera A', sequence: 'SEQ001_Opening', status: 'Work in Progress' },
    { id: 4, name: 'SH004_Aerial_Sweep', camera: 'Drone', sequence: 'SEQ001_Opening', status: 'Ready to Start' }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Components.Sidebar currentProject={currentProject} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Components.ProjectHeader 
            projectName={getProjectName(currentProject)}
            title={sceneData.name}
            description={`Scene details for ${getProjectName(currentProject)}`}
          />

          <div className="mb-6">
            <Link href={`/Scenes?project=${currentProject}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scenes
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scene Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clapperboard className="w-5 h-5" />
                    Scene Information
                  </CardTitle>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Scene Image */}
                  <div>
                    <Label className="text-slate-700 font-medium">Scene Image</Label>
                    <div className="mt-1">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="relative group">
                            <img
                              src={sceneData.image || "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/1886799b-8f1b-4f02-a1d5-b440f5b423fd"}
                              alt={sceneData.name}
                              className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <Button size="sm" variant="secondary">
                                <Upload className="w-4 h-4 mr-2" />
                                Replace Image
                              </Button>
                            </div>
                          </div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onload = (e) => {
                                  handleInputChange('image', e.target?.result as string)
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="text-sm"
                          />
                        </div>
                      ) : (
                        <div className="relative group">
                          <img
                            src={sceneData.image || "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/1886799b-8f1b-4f02-a1d5-b440f5b423fd"}
                            alt={sceneData.name}
                            className="w-full h-48 object-cover rounded-lg shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="mt-1">
                          <p className="font-mono text-sm bg-gray-50 p-2 rounded border">{sceneData.name}</p>
                        </div>
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
                        />
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{sceneData.location}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="duration" className="text-slate-700 font-medium">Duration</Label>
                      {isEditing ? (
                        <Input
                          id="duration"
                          value={sceneData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          className="mt-1"
                          placeholder="00:00:00"
                        />
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{sceneData.duration}</span>
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
                            <SelectItem value="Morning">Morning</SelectItem>
                            <SelectItem value="Day">Day</SelectItem>
                            <SelectItem value="Evening">Evening</SelectItem>
                            <SelectItem value="Night">Night</SelectItem>
                            <SelectItem value="N/A">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <Sun className="w-4 h-4 text-gray-500" />
                          <span>{sceneData.timeOfDay}</span>
                        </div>
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
                            <SelectItem value="Snow">Snow</SelectItem>
                            <SelectItem value="Fog">Fog</SelectItem>
                            <SelectItem value="Underwater">Underwater</SelectItem>
                            <SelectItem value="Space">Space</SelectItem>
                            <SelectItem value="N/A">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <span>{getWeatherIcon(sceneData.weather)}</span>
                          <span>{sceneData.weather}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={sceneData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <div className="mt-1">
                        <p className="text-gray-700">{sceneData.description}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-slate-700 font-medium">Notes</Label>
                    {isEditing ? (
                      <Textarea
                        id="notes"
                        value={sceneData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    ) : (
                      <div className="mt-1">
                        <p className="text-gray-700">{sceneData.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Created by {sceneData.creator}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Created {sceneData.createdDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Associated Components */}
              <div className="space-y-6">
                {/* Takes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Play className="w-5 h-5" />
                        Associated Takes ({associatedTakes.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Take
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {associatedTakes.map((take) => (
                        <div key={take.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <Link href={`/Take?id=${take.id}&project=${currentProject}`} className="font-medium text-blue-600 hover:text-blue-800">
                              {take.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {take.shootingDay} • {take.actor}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColorClass(take.status)}>
                              {take.status}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Clips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Film className="w-5 h-5" />
                        Associated Clips ({associatedClips.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Clip
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {associatedClips.map((clip) => (
                        <div key={clip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <Link href={`/Clip?id=${clip.id}&project=${currentProject}`} className="font-medium text-blue-600 hover:text-blue-800">
                              {clip.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {clip.type} • {clip.duration}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColorClass(clip.status)}>
                              {clip.status}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* EDLs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Associated EDLs ({associatedEDLs.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add EDL
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {associatedEDLs.map((edl) => (
                        <div key={edl.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <Link href={`/EDL?id=${edl.id}&project=${currentProject}`} className="font-medium text-blue-600 hover:text-blue-800">
                              {edl.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {edl.sequences} sequences • Modified {edl.modifiedDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColorClass(edl.status)}>
                              {edl.status}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sequences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Associated Sequences ({associatedSequences.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Sequence
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {associatedSequences.map((sequence) => (
                        <div key={sequence.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <Link href={`/Sequence?id=${sequence.id}&project=${currentProject}`} className="font-medium text-blue-600 hover:text-blue-800">
                              {sequence.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {sequence.shots} shots • {sequence.duration}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColorClass(sequence.status)}>
                              {sequence.status}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shots */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Associated Shots ({associatedShots.length})
                      </span>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Shot
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {associatedShots.map((shot) => (
                        <div key={shot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <Link href={`/Shot?id=${shot.id}&project=${currentProject}`} className="font-medium text-blue-600 hover:text-blue-800">
                              {shot.name}
                            </Link>
                            <div className="text-sm text-gray-500">
                              {shot.camera} • {shot.sequence}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColorClass(shot.status)}>
                              {shot.status}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions & Statistics */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Take
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Clip
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Shot
                  </Button>
                  <Button className="w-full" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scene Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Takes</span>
                    <span className="font-semibold">{associatedTakes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Clips</span>
                    <span className="font-semibold">{associatedClips.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total EDLs</span>
                    <span className="font-semibold">{associatedEDLs.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Sequences</span>
                    <span className="font-semibold">{associatedSequences.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Shots</span>
                    <span className="font-semibold">{associatedShots.length}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Scene Duration</span>
                    <span className="font-semibold">{sceneData.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion</span>
                    <Badge className={getStatusColorClass(sceneData.status)}>
                      {sceneData.status}
                    </Badge>
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