'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar,
  Clock,
  Users,
  Camera,
  Sun,
  Cloud,
  CloudRain,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  MapPin,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function ShootingDays() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]
  
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  // Sample shooting days data
  const shootingDays = [
    {
      id: 1,
      date: "2024-01-15",
      location: "Studio A - Main Set",
      weather: "Controlled",
      status: "Completed",
      scenes: ["Scene 1", "Scene 2"],
      crew: ["Director", "DP", "Sound", "Gaffer"],
      notes: "Great lighting conditions, all scenes completed on schedule"
    },
    {
      id: 2,
      date: "2024-01-16",
      location: "Exterior Location - Downtown",
      weather: "Sunny",
      status: "In Progress",
      scenes: ["Scene 3", "Scene 4"],
      crew: ["Director", "DP", "Sound", "Grip"],
      notes: "Weather perfect for exterior shots"
    },
    {
      id: 3,
      date: "2024-01-17",
      location: "Studio B - Green Screen",
      weather: "Controlled",
      status: "Scheduled",
      scenes: ["Scene 5", "Scene 6"],
      crew: ["Director", "DP", "VFX Supervisor"],
      notes: "Complex VFX shots planned"
    }
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Sunny': return <Sun className="w-4 h-4 text-yellow-500" />
      case 'Cloudy': return <Cloud className="w-4 h-4 text-gray-500" />
      case 'Rainy': return <CloudRain className="w-4 h-4 text-blue-500" />
      case 'Controlled': return <Camera className="w-4 h-4 text-purple-500" />
      default: return <Sun className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
        />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Shooting Days</h1>
              <p className="text-slate-600">Manage your production schedule and shooting locations</p>
            </div>
            
            {/* Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar View
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Shooting Day
              </Button>
            </div>
            
            {/* Shooting Days Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shooting Days List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Upcoming Shooting Days
                    </CardTitle>
                    <CardDescription>
                      Manage your production schedule
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {shootingDays.map((day) => (
                        <div key={day.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-medium text-slate-900">{day.date}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-600">{day.location}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getWeatherIcon(day.weather)}
                              <Badge className={getStatusColor(day.status)}>
                                {day.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="text-sm font-medium text-slate-600">Scenes:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {day.scenes.map((scene, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {scene}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-slate-600">Crew:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {day.crew.map((member, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {member}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {day.notes && (
                            <div className="mb-3">
                              <span className="text-sm font-medium text-slate-600">Notes:</span>
                              <p className="text-sm text-slate-700 mt-1">{day.notes}</p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="w-3 h-3 mr-1" />
                              Schedule
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Stats and Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Production Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Days</span>
                        <span className="font-medium">{shootingDays.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Completed</span>
                        <span className="font-medium text-green-600">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">In Progress</span>
                        <span className="font-medium text-blue-600">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Scheduled</span>
                        <span className="font-medium text-yellow-600">1</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Shooting Day
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Calendar
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="w-4 h-4 mr-2" />
                        Manage Locations
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Schedule Crew
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Today</span>
                        <div className="flex items-center gap-1">
                          <Sun className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">Sunny</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tomorrow</span>
                        <div className="flex items-center gap-1">
                          <Cloud className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Cloudy</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Day After</span>
                        <div className="flex items-center gap-1">
                          <CloudRain className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Rainy</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
