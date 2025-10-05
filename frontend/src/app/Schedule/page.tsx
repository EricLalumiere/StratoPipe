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
  Play,
  Pause,
  Square,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Schedule() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]
  
  const [selectedDate, setSelectedDate] = useState(new Date())
  
  // Sample schedule data
  const scheduleItems = [
    {
      id: 1,
      title: "Scene 1 - Opening Sequence",
      type: "Scene",
      startTime: "09:00",
      endTime: "12:00",
      location: "Studio A",
      crew: ["Director", "DP", "Sound"],
      status: "Scheduled",
      priority: "High"
    },
    {
      id: 2,
      title: "Actor Rehearsal - Main Characters",
      type: "Rehearsal",
      startTime: "13:00",
      endTime: "15:00",
      location: "Rehearsal Room",
      crew: ["Director", "Actors"],
      status: "Confirmed",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Equipment Setup - Camera Rig",
      type: "Setup",
      startTime: "15:30",
      endTime: "17:00",
      location: "Studio B",
      crew: ["Camera Team"],
      status: "Pending",
      priority: "Low"
    }
  ]
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800'
      case 'Confirmed': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Completed': return 'bg-gray-100 text-gray-800'
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
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Production Schedule</h1>
              <p className="text-slate-600">Manage your project timeline and crew scheduling</p>
            </div>
            
            {/* Schedule Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Today
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
                Add Schedule Item
              </Button>
            </div>
            
            {/* Schedule Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Today's Schedule
                    </CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {scheduleItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-slate-900">{item.title}</h3>
                              <p className="text-sm text-slate-600">{item.type}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {item.startTime} - {item.endTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {item.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Crew:</span>
                            <div className="flex flex-wrap gap-1">
                              {item.crew.map((member, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Play className="w-3 h-3 mr-1" />
                              Start
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
              
              {/* Schedule Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Items</span>
                        <span className="font-medium">{scheduleItems.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Completed</span>
                        <span className="font-medium text-green-600">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">In Progress</span>
                        <span className="font-medium text-blue-600">1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Pending</span>
                        <span className="font-medium text-yellow-600">2</span>
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
                        Add Scene
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Schedule Crew
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Calendar
                      </Button>
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
