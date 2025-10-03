'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/lib'
import { ArrowLeft, Save, Clapperboard, MapPin, Clock, Sun, Cloud, Upload, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Components from '../components'

export default function SceneCreation() {
  const [currentProject, setCurrentProject] = useState('cyber-nexus')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    duration: '',
    timeOfDay: 'Day',
    weather: 'Clear',
    notes: '',
    imageFile: null as File | null
  })

  const timeOfDayOptions = ['Morning', 'Day', 'Evening', 'Night', 'N/A']
  const weatherOptions = ['Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Underwater', 'Space', 'N/A']

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData(prev => ({
      ...prev,
      imageFile: file
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating scene:', formData)
    // Handle scene creation logic here
  }

  const getProjectName = (projectId: string) => {
    const projects = {
      'cyber-nexus': 'Cyber Nexus',
      'ocean-depths': 'Ocean Depths', 
      'space-odyssey': 'Space Odyssey'
    }
    return projects[projectId as keyof typeof projects] || 'Unknown Project'
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Components.Sidebar currentProject={currentProject} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Components.ProjectHeader 
            projectName={getProjectName(currentProject)}
            title="New Scene"
            description={`Create a new scene for ${getProjectName(currentProject)}`}
          />

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link 
                to={`/Scenes?project=${currentProject}`}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Scenes
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clapperboard className="w-5 h-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Scene Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g., SC001_City_Establishing"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the scene content and purpose..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Neo Tokyo District"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        placeholder="e.g., 00:01:30"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Scene Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      Scene Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="timeOfDay">Time of Day *</Label>
                      <Select value={formData.timeOfDay} onValueChange={(value) => handleInputChange('timeOfDay', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOfDayOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="weather">Weather Conditions</Label>
                      <Select value={formData.weather} onValueChange={(value) => handleInputChange('weather', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {weatherOptions.map((weather) => (
                            <SelectItem key={weather} value={weather}>
                              <span className="flex items-center gap-2">
                                {getWeatherIcon(weather)} {weather}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="imageFile">Scene Image</Label>
                      <div className="mt-1">
                        <Input
                          id="imageFile"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Upload a reference image for this scene (optional)
                        </p>
                      </div>
                      {formData.imageFile && (
                        <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                          <div className="flex items-center gap-2">
                            <Image className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-800">{formData.imageFile.name}</span>
                            <span className="text-xs text-blue-600">
                              ({(formData.imageFile.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Additional Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="notes">Production Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes, special requirements, or technical considerations..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Link to={`/Scenes?project=${currentProject}`}>
                  <Button variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Create Scene
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}