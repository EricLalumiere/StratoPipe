'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, 
  Filter, 
  Plus, 
  Upload,
  Mail,
  Phone,
  Linkedin,
  UserCheck,
  Users,
  FileText,
  FolderOpen,
  Star,
  Award,
  Calendar,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Film,
  Gamepad2
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function StudioActors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    linkedinUrl: '',
    imdbUrl: '',
    mobygamesUrl: '',
    description: '',
    project: '',
    specialties: '',
    experience: ''
  })

  const actors = [
    {
      id: 1,
      fullName: "Emma Thompson",
      email: "emma.thompson@email.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/emmathompson",
      imdb: "imdb.com/name/nm0000668",
      mobygames: "mobygames.com/person/78901/emma-thompson",
      description: "Experienced motion capture performer with 10+ years in virtual production. Specializes in character work and stunt coordination.",
      project: "Cyber Nexus",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      joinDate: "2023-01-15",
      status: "Active",
      characters: ["Zara", "Commander Steel"],
      totalSessions: 24,
      totalHours: 96,
      rating: 4.9,
      specialties: ["Motion Capture", "Stunt Coordination", "Character Development"],
      experience: "10+ years"
    },
    {
      id: 2,
      fullName: "Marcus Johnson",
      email: "marcus.johnson@email.com",
      phone: "+1 (555) 234-5678",
      linkedin: "linkedin.com/in/marcusjohnson",
      imdb: "imdb.com/name/nm1234567",
      mobygames: "mobygames.com/person/12345/marcus-johnson",
      description: "Stunt coordinator and motion capture specialist with expertise in action sequences and combat choreography.",
      project: "Ocean Depths",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      joinDate: "2023-02-20",
      status: "Active",
      characters: ["Captain Reef", "Deep Walker"],
      totalSessions: 18,
      totalHours: 72,
      rating: 4.8,
      specialties: ["Combat Choreography", "Action Sequences", "Underwater Performance"],
      experience: "8 years"
    },
    {
      id: 3,
      fullName: "Sofia Rodriguez",
      email: "sofia.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      linkedin: "linkedin.com/in/sofiarodriguez",
      imdb: "imdb.com/name/nm2345678",
      mobygames: "mobygames.com/person/23456/sofia-rodriguez",
      description: "Voice actor and performance capture artist specializing in character development and emotional range.",
      project: "Space Odyssey",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      joinDate: "2023-03-05",
      status: "On Break",
      characters: ["Nova", "AI Assistant"],
      totalSessions: 32,
      totalHours: 128,
      rating: 4.9,
      specialties: ["Voice Acting", "Emotional Range", "Character Development"],
      experience: "12 years"
    },
    {
      id: 4,
      fullName: "David Chen",
      email: "david.chen@email.com",
      phone: "+1 (555) 456-7890",
      linkedin: "linkedin.com/in/davidchen",
      imdb: "imdb.com/name/nm3456789",
      mobygames: "mobygames.com/person/34567/david-chen",
      description: "Professional actor with theater background, specializing in dramatic performances and character depth.",
      project: "Cyber Nexus",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      joinDate: "2023-04-12",
      status: "Active",
      characters: ["Dr. Matrix"],
      totalSessions: 15,
      totalHours: 60,
      rating: 4.7,
      specialties: ["Dramatic Performance", "Theater", "Character Depth"],
      experience: "15 years"
    },
    {
      id: 5,
      fullName: "Aisha Patel",
      email: "aisha.patel@email.com",
      phone: "+1 (555) 567-8901",
      linkedin: "linkedin.com/in/aishapatel",
      imdb: "imdb.com/name/nm4567890",
      mobygames: "mobygames.com/person/45678/aisha-patel",
      description: "Multi-talented performer with expertise in dance, martial arts, and motion capture technology.",
      project: "Ocean Depths",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      joinDate: "2023-05-08",
      status: "Active",
      characters: ["Coral Guardian", "Sea Witch"],
      totalSessions: 21,
      totalHours: 84,
      rating: 4.8,
      specialties: ["Dance", "Martial Arts", "Motion Capture"],
      experience: "7 years"
    }
  ]

  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  const statusOptions = [
    { value: "Active", label: "Active", color: "bg-green-50 text-green-700 border-green-200" },
    { value: "On Break", label: "On Break", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { value: "Inactive", label: "Inactive", color: "bg-gray-50 text-gray-700 border-gray-200" }
  ]

  const filteredActors = actors.filter(actor => {
    const matchesSearch = actor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         actor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesProject = !selectedProject || selectedProject === 'all' || actor.project === selectedProject
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || actor.status === selectedStatus
    return matchesSearch && matchesProject && matchesStatus
  })

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateActor = () => {
    console.log('Creating actor:', formData)
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      linkedinUrl: '',
      imdbUrl: '',
      mobygamesUrl: '',
      description: '',
      project: '',
      specialties: '',
      experience: ''
    })
  }

  const getStatusBadgeColor = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status)
    return statusOption ? statusOption.color : "bg-gray-50 text-gray-700 border-gray-200"
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentProject="cyber-nexus" projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Studio Actors</h1>
                <p className="text-slate-600">Manage actors and performers for your studio projects</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{actors.length}</p>
                  <p className="text-sm text-slate-600">Total Actors</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{actors.filter(a => a.status === 'Active').length}</p>
                  <p className="text-sm text-slate-600">Active</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Actors List */}
            <div className="xl:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Studio Actors</CardTitle>
                      <CardDescription>Browse and manage talent roster</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search actors, skills..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select value={selectedProject} onValueChange={setSelectedProject}>
                        <SelectTrigger className="w-48">
                          <Filter className="w-4 h-4 mr-2" />
                          <SelectValue placeholder="Filter by project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Projects</SelectItem>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          {statusOptions.map(status => (
                            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredActors.map((actor) => (
                      <Link key={actor.id} href="/Actor">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-lg hover:bg-white transition-all duration-200 cursor-pointer group">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={actor.avatar} />
                                <AvatarFallback className="text-lg font-semibold">
                                  {actor.fullName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                                actor.status === 'Active' ? 'bg-green-500' : 
                                actor.status === 'On Break' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}></div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {actor.fullName}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                      {actor.project}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusBadgeColor(actor.status)}>
                                      {actor.status}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-amber-600">
                                      <Star className="w-3 h-3 fill-current" />
                                      <span>{actor.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{actor.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{actor.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Linkedin className="w-4 h-4" />
                                    <a href={`https://${actor.linkedin}`} className="text-blue-600 hover:text-blue-700">
                                      LinkedIn
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Film className="w-4 h-4" />
                                    <a href={`https://${actor.imdb}`} className="text-amber-600 hover:text-amber-700">
                                      IMDB Profile
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Gamepad2 className="w-4 h-4" />
                                    <a href={`https://${actor.mobygames}`} className="text-purple-600 hover:text-purple-700">
                                      MobyGames
                                    </a>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <UserCheck className="w-4 h-4" />
                                    <span>Characters: {actor.characters.join(', ')}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{actor.totalSessions} sessions • {actor.totalHours}h</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Award className="w-4 h-4" />
                                    <span>{actor.experience} experience</span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{actor.description}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {actor.specialties.slice(0, 3).map(specialty => (
                                    <Badge key={specialty} variant="secondary" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                  {actor.specialties.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{actor.specialties.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <Calendar className="w-3 h-3" />
                                  <span>Joined {actor.joinDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {filteredActors.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No actors found</h3>
                      <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Actor Creation Form */}
            <div>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Add New Actor</CardTitle>
                  <CardDescription>Add a new actor to your talent roster</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture Upload */}
                  <div>
                    <Label className="text-slate-700 font-medium">Profile Picture</Label>
                    <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Drag and drop or click to upload</p>
                      <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-slate-700 font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter actor's full name"
                        value={formData.fullName}
                        onChange={(e) => handleFormChange('fullName', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="actor@email.com"
                        value={formData.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber" className="text-slate-700 font-medium">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkedinUrl" className="text-slate-700 font-medium">LinkedIn Profile</Label>
                      <Input
                        id="linkedinUrl"
                        placeholder="linkedin.com/in/username"
                        value={formData.linkedinUrl}
                        onChange={(e) => handleFormChange('linkedinUrl', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="project" className="text-slate-700 font-medium">Primary Project</Label>
                      <Select value={formData.project} onValueChange={(value) => handleFormChange('project', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map(project => (
                            <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience" className="text-slate-700 font-medium">Experience Level</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleFormChange('experience', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2 years">1-2 years</SelectItem>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="5-10 years">5-10 years</SelectItem>
                          <SelectItem value="10+ years">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="specialties" className="text-slate-700 font-medium">Specialties</Label>
                      <Input
                        id="specialties"
                        placeholder="Motion Capture, Voice Acting, Stunts..."
                        value={formData.specialties}
                        onChange={(e) => handleFormChange('specialties', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-slate-500 mt-1">Separate multiple specialties with commas</p>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe skills, experience, and specialties..."
                        value={formData.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCreateActor}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Actor
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Studio Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Actors</span>
                      <span className="font-semibold text-slate-900">{actors.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Active Actors</span>
                      <span className="font-semibold text-green-600">{actors.filter(a => a.status === 'Active').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Sessions</span>
                      <span className="font-semibold text-slate-900">{actors.reduce((sum, actor) => sum + actor.totalSessions, 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Hours</span>
                      <span className="font-semibold text-slate-900">{actors.reduce((sum, actor) => sum + actor.totalHours, 0)}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Avg Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="font-semibold text-slate-900">
                          {(actors.reduce((sum, actor) => sum + actor.rating, 0) / actors.length).toFixed(1)}
                        </span>
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
  )
}