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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Plus, 
  Users, 
  UserCheck, 
  Trash2, 
  Eye,
  Calendar,
  Building,
  Mail,
  Phone,
  Settings
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Projects() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    clientCompany: '',
    clientContact: '',
    clientEmail: '',
    clientPhone: '',
    imageResolution: '',
    imageRatio: '',
    codec: '',
    fileFormat: ''
  })

  const projects = [
    {
      id: 1,
      name: "Cyber Nexus",
      client: "TechCorp Industries",
      description: "Futuristic cyberpunk adventure with advanced AI characters",
      status: "In Progress",
      progress: 75,
      teamSize: 12,
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Ocean Depths",
      client: "Marine Studios",
      description: "Underwater exploration documentary with photorealistic marine life",
      status: "Review",
      progress: 90,
      teamSize: 8,
      createdDate: "2024-02-01"
    },
    {
      id: 3,
      name: "Space Odyssey",
      client: "Cosmic Films",
      description: "Epic space adventure featuring multiple alien worlds",
      status: "Planning",
      progress: 25,
      teamSize: 15,
      createdDate: "2024-03-10"
    }
  ]

  const teamMembers = [
    { name: "Sarah Chen", role: "Lead Animator", avatar: "/api/placeholder/32/32" },
    { name: "Mike Johnson", role: "3D Artist", avatar: "/api/placeholder/32/32" },
    { name: "Emma Davis", role: "Technical Director", avatar: "/api/placeholder/32/32" }
  ]

  const actors = [
    { name: "James Wilson", role: "Lead Actor", characters: ["Commander Rex", "AI Voice"] },
    { name: "Lisa Thompson", role: "Supporting Actor", characters: ["Dr. Nova"] }
  ]

  const scenes = [
    { name: "Opening Sequence", status: "Completed" },
    { name: "Cybercity Chase", status: "In Progress" },
    { name: "Final Confrontation", status: "Planning" }
  ]

  const storyboards = [
    { name: "Act 1 Storyboard", status: "Approved" },
    { name: "Action Sequence Board", status: "Review" }
  ]

  const conceptArts = [
    { name: "Character Designs", status: "Approved" },
    { name: "Environment Concepts", status: "In Progress" }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const projectsData = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  const getProjectBackgroundImage = (projectName: string) => {
    switch (projectName) {
      case 'Cyber Nexus':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/4c9119c6-1ee5-456c-b3c8-e432554d08c2'
      case 'Ocean Depths':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/49440c97-cbcd-45cd-acf2-11a20883b0bf'
      case 'Space Odyssey':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/3101fea8-ddec-455e-b08f-60475173808c'
      default:
        return ''
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentProject="cyber-nexus" projects={projectsData} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <ProjectHeader
            projectName="StratoPipe Studio"
            title="Projects"
            description="Manage your studio's projects and create new ones"
          >
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Projects List */}
            <div className="xl:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Studio Projects</CardTitle>
                  <CardDescription>All projects associated with your studio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="relative p-6 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-65 transition-opacity duration-300"
                        style={{ 
                          backgroundImage: `url(${getProjectBackgroundImage(project.name)})` 
                        }}
                      ></div>
                      <div className="relative z-10 bg-white/60 backdrop-blur-sm rounded-lg p-4 -m-4 mb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <Link href="/CurrentProject" className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                              {project.name}
                            </Link>
                            <p className="text-slate-600 mt-1">{project.client}</p>
                            <p className="text-sm text-slate-500 mt-2">{project.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              project.status === 'Review' ? 'bg-yellow-100 text-yellow-800' : 
                              project.status === 'Planning' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {project.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>{project.teamSize} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>Created {project.createdDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Settings className="w-4 h-4" />
                          <span>{project.progress}% complete</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Project Creation Form */}
            <div>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Create New Project</CardTitle>
                  <CardDescription>Set up a new project for your studio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">Project Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter project name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Project description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Client Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Client Information
                    </h3>
                    
                    <div>
                      <Label htmlFor="clientCompany" className="text-slate-700 font-medium">Company Name</Label>
                      <Input
                        id="clientCompany"
                        placeholder="Client company"
                        value={formData.clientCompany}
                        onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientContact" className="text-slate-700 font-medium">Contact Person</Label>
                      <Input
                        id="clientContact"
                        placeholder="Contact name"
                        value={formData.clientContact}
                        onChange={(e) => handleInputChange('clientContact', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientEmail" className="text-slate-700 font-medium">Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        placeholder="client@company.com"
                        value={formData.clientEmail}
                        onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientPhone" className="text-slate-700 font-medium">Phone</Label>
                      <Input
                        id="clientPhone"
                        placeholder="Phone number"
                        value={formData.clientPhone}
                        onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Render Specifications */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Render Specifications</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-slate-700 font-medium">Resolution</Label>
                        <Select value={formData.imageResolution} onValueChange={(value) => handleInputChange('imageResolution', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1920x1080">1920x1080 (HD)</SelectItem>
                            <SelectItem value="2560x1440">2560x1440 (2K)</SelectItem>
                            <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                            <SelectItem value="7680x4320">7680x4320 (8K)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-slate-700 font-medium">Ratio</Label>
                        <Select value={formData.imageRatio} onValueChange={(value) => handleInputChange('imageRatio', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="16:9">16:9</SelectItem>
                            <SelectItem value="21:9">21:9</SelectItem>
                            <SelectItem value="4:3">4:3</SelectItem>
                            <SelectItem value="1:1">1:1</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-slate-700 font-medium">Codec</Label>
                        <Select value={formData.codec} onValueChange={(value) => handleInputChange('codec', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="h264">H.264</SelectItem>
                            <SelectItem value="h265">H.265</SelectItem>
                            <SelectItem value="prores">ProRes</SelectItem>
                            <SelectItem value="dnxhd">DNxHD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-slate-700 font-medium">Format</Label>
                        <Select value={formData.fileFormat} onValueChange={(value) => handleInputChange('fileFormat', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mp4">MP4</SelectItem>
                            <SelectItem value="mov">MOV</SelectItem>
                            <SelectItem value="avi">AVI</SelectItem>
                            <SelectItem value="exr">EXR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Team Members Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Team Members</h3>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{member.name}</p>
                              <p className="text-xs text-slate-500">{member.role}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actors Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Actors</h3>
                      <Button size="sm" variant="outline">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Add Actor
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {actors.map((actor, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{actor.name}</p>
                            <p className="text-xs text-slate-500">{actor.role}</p>
                            <p className="text-xs text-blue-600">{actor.characters.join(', ')}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Associated Content */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">Scenes</h4>
                        <Button size="sm" variant="ghost">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {scenes.map((scene, index) => (
                          <div key={index} className="text-xs p-2 bg-slate-50 rounded flex justify-between">
                            <span>{scene.name}</span>
                            <Badge variant="outline" className="text-xs">{scene.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">Storyboards</h4>
                        <Button size="sm" variant="ghost">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {storyboards.map((board, index) => (
                          <div key={index} className="text-xs p-2 bg-slate-50 rounded flex justify-between">
                            <span>{board.name}</span>
                            <Badge variant="outline" className="text-xs">{board.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Create Project
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