'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from '@/components/ui/calendar'
import { 
  Calendar as CalendarIcon,
  Plus,
  MapPin,
  Users,
  Video,
  Clock,
  Camera,
  Film,
  UserCheck,
  Trash2,
  Edit
} from 'lucide-react'
import Components from '@/components'

export default function ShootingDays() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    date: '',
    type: '',
    location: '',
    actors: [] as string[],
    scenes: [] as string[]
  })

  // Metadata for the current project/screen
  const [projectMetadata, setProjectMetadata] = useState({
    projectName: 'Cyber Nexus',
    description: 'A futuristic cyberpunk adventure featuring advanced AI characters and immersive virtual environments.',
    status: 'In Progress',
    priority: 'High',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: '$2.5M',
    tags: ['cyberpunk', 'sci-fi', 'motion-capture', 'vfx']
  })

  // Define metadata fields for editing
  const metadataFields = [
    {
      key: 'projectName',
      label: 'Project Name',
      type: 'text' as const,
      value: projectMetadata.projectName,
      required: true,
      placeholder: 'Enter project name'
    },
    {
      key: 'description',
      label: 'Description',
      type: 'textarea' as const,
      value: projectMetadata.description,
      placeholder: 'Enter project description'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      value: projectMetadata.status,
      options: ['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled']
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select' as const,
      value: projectMetadata.priority,
      options: ['Low', 'Medium', 'High', 'Critical']
    },
    {
      key: 'startDate',
      label: 'Start Date',
      type: 'date' as const,
      value: projectMetadata.startDate
    },
    {
      key: 'endDate',
      label: 'End Date',
      type: 'date' as const,
      value: projectMetadata.endDate
    },
    {
      key: 'budget',
      label: 'Budget',
      type: 'text' as const,
      value: projectMetadata.budget,
      placeholder: 'Enter budget amount'
    },
    {
      key: 'tags',
      label: 'Tags',
      type: 'tags' as const,
      value: projectMetadata.tags
    }
  ]

  // Handle metadata save
  const handleMetadataSave = (updatedFields: Record<string, any>) => {
    setProjectMetadata(prev => ({ ...prev, ...updatedFields }))
    console.log('Metadata updated:', updatedFields)
    // Here you would typically save to your backend
  }

  // Get current project from URL parameters
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]

  const shootingDays = [
    {
      id: 1,
      date: "2023-12-15",
      type: "Motion Capture",
      location: "Studio A - Motion Capture Stage",
      actors: [
        { name: "Emma Thompson", avatar: "/api/placeholder/32/32" },
        { name: "David Chen", avatar: "/api/placeholder/32/32" }
      ],
      scenes: ["Opening Sequence", "Character Introduction", "Combat Training"],
      duration: "8 hours",
      status: "Scheduled",
      notes: "Full body motion capture session for main characters"
    },
    {
      id: 2,
      date: "2023-12-18",
      type: "Motion Capture",
      location: "Studio B - Performance Stage",
      actors: [
        { name: "Marcus Johnson", avatar: "/api/placeholder/32/32" },
        { name: "Sofia Rodriguez", avatar: "/api/placeholder/32/32" }
      ],
      scenes: ["Chase Scene", "Dialogue Heavy Scene"],
      duration: "6 hours",
      status: "In Progress",
      notes: "Focus on facial capture and dialogue delivery"
    },
    {
      id: 3,
      date: "2023-12-22",
      type: "Live Action",
      location: "Downtown Location - Rooftop",
      actors: [
        { name: "Emma Thompson", avatar: "/api/placeholder/32/32" }
      ],
      scenes: ["Final Battle"],
      duration: "10 hours",
      status: "Completed",
      notes: "Practical effects and stunt coordination"
    },
    {
      id: 4,
      date: "2023-12-28",
      type: "Motion Capture",
      location: "Studio A - Motion Capture Stage",
      actors: [
        { name: "David Chen", avatar: "/api/placeholder/32/32" },
        { name: "Marcus Johnson", avatar: "/api/placeholder/32/32" }
      ],
      scenes: ["Climax Scene", "Resolution"],
      duration: "7 hours",
      status: "Scheduled",
      notes: "Complex interaction sequences between characters"
    }
  ]

  const availableActors = [
    "Emma Thompson",
    "David Chen", 
    "Marcus Johnson",
    "Sofia Rodriguez"
  ]

  const availableScenes = [
    "Opening Sequence",
    "Character Introduction", 
    "Combat Training",
    "Chase Scene",
    "Dialogue Heavy Scene",
    "Final Battle",
    "Climax Scene",
    "Resolution"
  ]

  const handleFormChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateShootingDay = () => {
    console.log('Creating shooting day:', formData)
    // Reset form
    setFormData({
      date: '',
      type: '',
      location: '',
      actors: [],
      scenes: []
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200'
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Scheduled': return 'bg-orange-50 text-orange-700 border-orange-200'
      default: return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'Motion Capture' ? Camera : Film
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Components.Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Components.ProjectHeader 
            projectName={currentProject.name}
            title="Shooting Days"
            description={`Schedule and manage motion capture and live action sessions for ${currentProject.name}`}
            showMetadataEditor={true}
            metadataFields={metadataFields}
            onMetadataSave={handleMetadataSave}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Shooting Days List */}
            <div className="xl:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Scheduled Sessions</CardTitle>
                  <CardDescription>Upcoming and past shooting days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {shootingDays.map((day) => {
                      const TypeIcon = getTypeIcon(day.type)
                      return (
                        <Link key={day.id} href="/ShootingDay">
                          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${day.type === 'Motion Capture' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                                  <TypeIcon className={`w-6 h-6 ${day.type === 'Motion Capture' ? 'text-blue-600' : 'text-purple-600'}`} />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-slate-900">{day.type} Session</h3>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <CalendarIcon className="w-4 h-4" />
                                    <span>{day.date}</span>
                                    <Clock className="w-4 h-4 ml-2" />
                                    <span>{day.duration}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className={getStatusColor(day.status)}>
                                {day.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                  <MapPin className="w-4 h-4" />
                                  <span className="font-medium">Location:</span>
                                </div>
                                <p className="text-sm text-slate-900 ml-6">{day.location}</p>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                  <Video className="w-4 h-4" />
                                  <span className="font-medium">Scenes ({day.scenes.length}):</span>
                                </div>
                                <div className="flex flex-wrap gap-1 ml-6">
                                  {day.scenes.slice(0, 2).map(scene => (
                                    <Badge key={scene} variant="outline" className="text-xs">
                                      {scene}
                                    </Badge>
                                  ))}
                                  {day.scenes.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{day.scenes.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                <UserCheck className="w-4 h-4" />
                                <span className="font-medium">Actors ({day.actors.length}):</span>
                              </div>
                              <div className="flex items-center gap-2 ml-6">
                                {day.actors.map((actor, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={actor.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {actor.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-slate-900">{actor.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 bg-white rounded-lg border border-slate-200">
                              <p className="text-sm text-slate-600 italic">{day.notes}</p>
                            </div>

                            <div className="flex items-center justify-end gap-2 mt-4">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Creation Form */}
            <div className="space-y-6">
              {/* Calendar */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Calendar</CardTitle>
                  <CardDescription>Select dates for scheduling</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Creation Form */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Schedule New Session</CardTitle>
                  <CardDescription>Create a new shooting day</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="text-slate-700 font-medium">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleFormChange('date', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-slate-700 font-medium">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleFormChange('type', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Motion Capture">Motion Capture</SelectItem>
                        <SelectItem value="Live Action">Live Action</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Actors</Label>
                    <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                      {availableActors.map(actor => (
                        <label key={actor} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.actors.includes(actor)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFormChange('actors', [...formData.actors, actor])
                              } else {
                                handleFormChange('actors', formData.actors.filter(a => a !== actor))
                              }
                            }}
                            className="rounded border-slate-300"
                          />
                          <span>{actor}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Scenes</Label>
                    <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                      {availableScenes.map(scene => (
                        <label key={scene} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.scenes.includes(scene)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFormChange('scenes', [...formData.scenes, scene])
                              } else {
                                handleFormChange('scenes', formData.scenes.filter(s => s !== scene))
                              }
                            }}
                            className="rounded border-slate-300"
                          />
                          <span>{scene}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleCreateShootingDay}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}