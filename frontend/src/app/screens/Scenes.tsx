'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/lib'
import { Search, Plus, Grid, List, Eye, Edit, Trash2, Clapperboard, Calendar, User, Clock, MapPin, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Components from '../components'

export default function Scenes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [currentProject, setCurrentProject] = useState('cyber-nexus')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const projectParam = urlParams.get('project')
    if (projectParam) {
      setCurrentProject(projectParam)
    }
  }, [])

  const scenes = [
    {
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
      associatedTakes: 3,
      associatedClips: 2,
      associatedEDLs: 1,
      associatedSequences: 1,
      associatedShots: 4,
      image: 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/1886799b-8f1b-4f02-a1d5-b440f5b423fd',
      project: 'cyber-nexus'
    },
    {
      id: 2,
      name: 'SC002_Character_Intro',
      description: 'Main character introduction in apartment setting',
      status: 'Work in Progress',
      location: 'Apartment Interior',
      duration: '00:01:30',
      timeOfDay: 'Morning',
      weather: 'N/A',
      creator: 'Mike Johnson',
      createdDate: '2024-01-18',
      associatedTakes: 5,
      associatedClips: 3,
      associatedEDLs: 2,
      associatedSequences: 1,
      associatedShots: 6,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop&crop=center',
      project: 'cyber-nexus'
    },
    {
      id: 3,
      name: 'SC003_Chase_Streets',
      description: 'High-speed chase through neon-lit city streets',
      status: 'Ready to Start',
      location: 'Downtown Streets',
      duration: '00:02:45',
      timeOfDay: 'Night',
      weather: 'Rain',
      creator: 'Emma Davis',
      createdDate: '2024-01-20',
      associatedTakes: 8,
      associatedClips: 4,
      associatedEDLs: 1,
      associatedSequences: 2,
      associatedShots: 12,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop&crop=center',
      project: 'cyber-nexus'
    },
    {
      id: 4,
      name: 'SC004_Ocean_Descent',
      description: 'Underwater descent into the mysterious abyss',
      status: 'Completed',
      location: 'Deep Ocean',
      duration: '00:01:20',
      timeOfDay: 'Day',
      weather: 'Underwater',
      creator: 'Alex Rodriguez',
      createdDate: '2024-01-12',
      associatedTakes: 4,
      associatedClips: 2,
      associatedEDLs: 1,
      associatedSequences: 1,
      associatedShots: 5,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop&crop=center',
      project: 'ocean-depths'
    },
    {
      id: 5,
      name: 'SC005_Space_Docking',
      description: 'Spacecraft approaching and docking with space station',
      status: 'Pending Review',
      location: 'Space Station Exterior',
      duration: '00:00:45',
      timeOfDay: 'N/A',
      weather: 'Space',
      creator: 'Lisa Park',
      createdDate: '2024-01-25',
      associatedTakes: 2,
      associatedClips: 1,
      associatedEDLs: 1,
      associatedSequences: 1,
      associatedShots: 3,
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop&crop=center',
      project: 'space-odyssey'
    }
  ]

  const projectScenes = scenes.filter(scene => scene.project === currentProject)

  const filteredScenes = projectScenes
    .filter(scene => {
      const matchesSearch = scene.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scene.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scene.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || scene.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'date': return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        case 'location': return a.location.localeCompare(b.location)
        case 'status': return a.status.localeCompare(b.status)
        case 'duration': return a.duration.localeCompare(b.duration)
        default: return 0
      }
    })

  const getStatusColor = (status: string) => {
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Components.Sidebar currentProject={currentProject} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Components.ProjectHeader 
            projectName={getProjectName(currentProject)}
            title="Scenes"
            description={`Manage and view all scenes for ${getProjectName(currentProject)}`}
          />
          
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search scenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="location">Sort by Location</SelectItem>
                  <SelectItem value="status">Sort by Status</SelectItem>
                  <SelectItem value="duration">Sort by Duration</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Ready to Start">Ready to Start</SelectItem>
                  <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>

              <Link href={`/SceneCreation?project=${currentProject}`}>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Scene
                </Button>
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing {filteredScenes.length} of {projectScenes.length} scenes for {getProjectName(currentProject)}
            </p>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredScenes.map((scene) => (
                <Card key={scene.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={scene.image || "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/1886799b-8f1b-4f02-a1d5-b440f5b423fd"}
                      alt={scene.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={getStatusColor(scene.status)}>
                        {scene.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-mono line-clamp-1">{scene.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{scene.description}</p>
                    
                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{scene.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{scene.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sun className="w-3 h-3" />
                          <span>{scene.timeOfDay}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          {getWeatherIcon(scene.weather)} {scene.weather}
                        </span>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{scene.creator}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                      <div>Takes: {scene.associatedTakes}</div>
                      <div>Clips: {scene.associatedClips}</div>
                      <div>EDLs: {scene.associatedEDLs}</div>
                      <div>Sequences: {scene.associatedSequences}</div>
                      <div className="col-span-2">Shots: {scene.associatedShots}</div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/SceneComponent?id=${scene.id}&project=${currentProject}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Components.MetadataEditor
                        title={`Edit ${scene.name}`}
                        description="Update scene information"
                        fields={[
                          { key: 'name', label: 'Scene Name', type: 'text', value: scene.name, required: true },
                          { key: 'description', label: 'Description', type: 'textarea', value: scene.description },
                          { key: 'status', label: 'Status', type: 'select', value: scene.status, options: ['Ready to Start', 'Work in Progress', 'Completed', 'Pending Review', 'Approved', 'N/A'] },
                          { key: 'location', label: 'Location', type: 'text', value: scene.location },
                          { key: 'duration', label: 'Duration', type: 'text', value: scene.duration },
                          { key: 'timeOfDay', label: 'Time of Day', type: 'select', value: scene.timeOfDay, options: ['Morning', 'Day', 'Evening', 'Night', 'N/A'] },
                          { key: 'weather', label: 'Weather', type: 'select', value: scene.weather, options: ['Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Underwater', 'Space', 'N/A'] }
                        ]}
                        onSave={(updatedFields) => {
                          console.log('Saving scene updates:', updatedFields)
                        }}
                        triggerButton={
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredScenes.map((scene) => (
                <Card key={scene.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={scene.image || "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/1886799b-8f1b-4f02-a1d5-b440f5b423fd"}
                        alt={scene.name}
                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold font-mono text-lg">{scene.name}</h3>
                          <Badge className={getStatusColor(scene.status)}>
                            {scene.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{scene.description}</p>
                        <div className="flex items-center gap-6 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {scene.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {scene.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sun className="w-3 h-3" />
                            {scene.timeOfDay}
                          </span>
                          <span className="flex items-center gap-1">
                            {getWeatherIcon(scene.weather)} {scene.weather}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {scene.creator}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Takes: {scene.associatedTakes}</span>
                          <span>Clips: {scene.associatedClips}</span>
                          <span>EDLs: {scene.associatedEDLs}</span>
                          <span>Sequences: {scene.associatedSequences}</span>
                          <span>Shots: {scene.associatedShots}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 ml-4 flex-shrink-0">
                        <Link href={`/SceneComponent?id=${scene.id}&project=${currentProject}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Components.MetadataEditor
                          title={`Edit ${scene.name}`}
                          description="Update scene information"
                          fields={[
                            { key: 'name', label: 'Scene Name', type: 'text', value: scene.name, required: true },
                            { key: 'description', label: 'Description', type: 'textarea', value: scene.description },
                            { key: 'status', label: 'Status', type: 'select', value: scene.status, options: ['Ready to Start', 'Work in Progress', 'Completed', 'Pending Review', 'Approved', 'N/A'] },
                            { key: 'location', label: 'Location', type: 'text', value: scene.location },
                            { key: 'duration', label: 'Duration', type: 'text', value: scene.duration },
                            { key: 'timeOfDay', label: 'Time of Day', type: 'select', value: scene.timeOfDay, options: ['Morning', 'Day', 'Evening', 'Night', 'N/A'] },
                            { key: 'weather', label: 'Weather', type: 'select', value: scene.weather, options: ['Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Underwater', 'Space', 'N/A'] }
                          ]}
                          onSave={(updatedFields) => {
                            console.log('Saving scene updates:', updatedFields)
                          }}
                          triggerButton={
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          }
                        />
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredScenes.length === 0 && (
            <div className="text-center py-12">
              <Clapperboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No scenes found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : `No scenes have been created for ${getProjectName(currentProject)} yet.`
                }
              </p>
              <Link href={`/SceneCreation?project=${currentProject}`}>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Scene
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}