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
import { 
  Search, 
  Filter, 
  Plus, 
  Upload,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  User,
  Users,
  Building,
  Clock,
  Film,
  Gamepad2
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function StudioMembers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    role: '',
    department: ''
  })
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    email: '',
    phoneNumber: '',
    timeZone: '',
    linkedinUrl: '',
    imdbUrl: '',
    mobygamesUrl: '',
    reportsTo: '',
    department: ''
  })

  const members = [
    {
      id: 1,
      fullName: "Sarah Chen",
      role: "Lead Animator",
      email: "sarah.chen@pixeldreams.com",
      phone: "+1 (555) 123-4567",
      timeZone: "PST (UTC-8)",
      linkedin: "linkedin.com/in/sarahchen",
      imdb: "imdb.com/name/nm1234567",
      mobygames: "mobygames.com/person/12345/sarah-chen",
      reportsTo: "John Smith",
      department: "Animation",
      avatar: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/9cc0411d-5654-4328-b402-47e45b008826",
      joinDate: "2023-01-15",
      status: "Active",
      assignedProjects: ["Cyber Nexus", "Ocean Depths"]
    },
    {
      id: 2,
      fullName: "Mike Johnson",
      role: "3D Artist",
      email: "mike.johnson@pixeldreams.com",
      phone: "+1 (555) 234-5678",
      timeZone: "EST (UTC-5)",
      linkedin: "linkedin.com/in/mikejohnson",
      imdb: "imdb.com/name/nm2345678",
      mobygames: "mobygames.com/person/23456/mike-johnson",
      reportsTo: "Sarah Chen",
      department: "Modeling",
      avatar: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/b9405540-c37f-4f64-9e28-7f6076a0ef62",
      joinDate: "2023-02-20",
      status: "Active",
      assignedProjects: ["Space Odyssey", "Cyber Nexus"]
    },
    {
      id: 3,
      fullName: "Emma Davis",
      role: "Technical Director",
      email: "emma.davis@pixeldreams.com",
      phone: "+1 (555) 345-6789",
      timeZone: "CST (UTC-6)",
      linkedin: "linkedin.com/in/emmadavis",
      imdb: "imdb.com/name/nm3456789",
      mobygames: "mobygames.com/person/34567/emma-davis",
      reportsTo: "John Smith",
      department: "Tech Art",
      avatar: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/84d03d96-161a-45af-8fa7-fbbf61cbce83",
      joinDate: "2022-11-10",
      status: "Active",
      assignedProjects: ["Ocean Depths"]
    },
    {
      id: 4,
      fullName: "Alex Rodriguez",
      role: "Texture Artist",
      email: "alex.rodriguez@pixeldreams.com",
      phone: "+1 (555) 456-7890",
      timeZone: "MST (UTC-7)",
      linkedin: "linkedin.com/in/alexrodriguez",
      imdb: "imdb.com/name/nm4567890",
      mobygames: "mobygames.com/person/45678/alex-rodriguez",
      reportsTo: "Emma Davis",
      department: "Texturing",
      avatar: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/acb76dcd-8e07-46af-bd09-ff8646e148d1",
      joinDate: "2023-03-05",
      status: "Active",
      assignedProjects: ["Space Odyssey"]
    },
    {
      id: 5,
      fullName: "Lisa Thompson",
      role: "Lighting Artist",
      email: "lisa.thompson@pixeldreams.com",
      phone: "+1 (555) 567-8901",
      timeZone: "PST (UTC-8)",
      linkedin: "linkedin.com/in/lisathompson",
      imdb: "imdb.com/name/nm5678901",
      mobygames: "mobygames.com/person/56789/lisa-thompson",
      reportsTo: "Sarah Chen",
      department: "Lighting",
      avatar: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/ceefd621-be9f-4105-b053-e14f9e49e546",
      joinDate: "2023-04-12",
      status: "Active",
      assignedProjects: ["Cyber Nexus"]
    }
  ]

  const roles = ["All Roles", "Lead Animator", "3D Artist", "Technical Director", "Texture Artist", "Lighting Artist", "Compositor", "Motion Capture Artist"]
  const departments = [
    "All Departments", "Production", "Concept Art", "Modeling", "Texturing", "Tech Art", 
    "Lighting", "Motion Capture Stage", "Motion Capture Cleanup", "Motion Capture Integration", 
    "Animation", "Editorial", "Layout", "FX", "Comping", "Pipeline"
  ]
  const timeZones = [
    "PST (UTC-8)", "MST (UTC-7)", "CST (UTC-6)", "EST (UTC-5)", 
    "GMT (UTC+0)", "CET (UTC+1)", "JST (UTC+9)", "AEST (UTC+10)"
  ]
  const supervisors = ["John Smith", "Sarah Chen", "Emma Davis", "Mike Johnson"]

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !filters.role || filters.role === 'All Roles' || member.role === filters.role
    const matchesDepartment = !filters.department || filters.department === 'All Departments' || member.department === filters.department
    
    return matchesSearch && matchesRole && matchesDepartment
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const projectsData = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentProject="cyber-nexus" projects={projectsData} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Studio Members</h1>
            <p className="text-slate-600">Manage your team members and their roles</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Members List */}
            <div className="xl:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Team Members</CardTitle>
                      <CardDescription>Browse and manage studio personnel</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search members..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Role</Label>
                      <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All Roles" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">Department</Label>
                      <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Members List */}
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <Link key={member.id} href="/User">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback className="text-lg font-semibold">
                                {member.fullName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-bold text-slate-900">{member.fullName}</h3>
                                  <p className="text-slate-600">{member.role}</p>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {member.status}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{member.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{member.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{member.timeZone}</span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Building className="w-4 h-4" />
                                    <span>{member.department}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <User className="w-4 h-4" />
                                    <span>Reports to: </span>
                                    <Link href="/User" className="text-blue-600 hover:text-blue-700 font-medium">
                                      {member.reportsTo}
                                    </Link>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Linkedin className="w-4 h-4" />
                                    <a href={`https://${member.linkedin}`} className="text-blue-600 hover:text-blue-700">
                                      LinkedIn
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Film className="w-4 h-4" />
                                    <a href={`https://${member.imdb}`} className="text-amber-600 hover:text-amber-700">
                                      IMDB Profile
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Gamepad2 className="w-4 h-4" />
                                    <a href={`https://${member.mobygames}`} className="text-purple-600 hover:text-purple-700">
                                      MobyGames
                                    </a>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-slate-500">Joined: {member.joinDate}</p>
                                  <p className="text-sm text-slate-500">
                                    Projects: {member.assignedProjects.join(', ')}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">
                                    {member.assignedProjects.length} project{member.assignedProjects.length !== 1 ? 's' : ''}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {filteredMembers.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No members found</h3>
                      <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Member Creation Form */}
            <div>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Add New Member</CardTitle>
                  <CardDescription>Invite a new team member to your studio</CardDescription>
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
                        placeholder="Enter full name"
                        value={formData.fullName}
                        onChange={(e) => handleFormChange('fullName', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-slate-700 font-medium">Role</Label>
                      <Input
                        id="role"
                        placeholder="e.g. Senior 3D Artist"
                        value={formData.role}
                        onChange={(e) => handleFormChange('role', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="member@company.com"
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
                      <Label htmlFor="timeZone" className="text-slate-700 font-medium">Time Zone</Label>
                      <Select value={formData.timeZone} onValueChange={(value) => handleFormChange('timeZone', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map(tz => (
                            <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="imdbUrl" className="text-slate-700 font-medium">IMDB Profile</Label>
                      <Input
                        id="imdbUrl"
                        placeholder="imdb.com/name/nm1234567"
                        value={formData.imdbUrl}
                        onChange={(e) => handleFormChange('imdbUrl', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mobygamesUrl" className="text-slate-700 font-medium">MobyGames Profile</Label>
                      <Input
                        id="mobygamesUrl"
                        placeholder="mobygames.com/person/12345/username"
                        value={formData.mobygamesUrl}
                        onChange={(e) => handleFormChange('mobygamesUrl', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reportsTo" className="text-slate-700 font-medium">Reports To</Label>
                      <Select value={formData.reportsTo} onValueChange={(value) => handleFormChange('reportsTo', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select supervisor" />
                        </SelectTrigger>
                        <SelectContent>
                          {supervisors.map(supervisor => (
                            <SelectItem key={supervisor} value={supervisor}>{supervisor}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-slate-700 font-medium">Department</Label>
                      <Select value={formData.department} onValueChange={(value) => handleFormChange('department', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.filter(dept => dept !== 'All Departments').map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    A welcome email with registration link will be sent to the provided email address
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}