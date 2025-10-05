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
import { Textarea } from '@/components/ui/textarea'
import { 
  Save,
  Edit,
  Plus,
  Users,
  UserCheck,
  Database,
  Video,
  Layers,
  Calendar,
  Image,
  Palette,
  CheckSquare,
  Settings,
  Building,
  Mail,
  Phone,
  Monitor,
  Film,
  FileVideo,
  Trash2,
  User,
  TreePine,
  Zap,
  Car
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'
import { useProjectBackgroundImage } from '../../hooks/useProjectImages'

export default function CurrentProject() {
  // Get current project from URL parameters
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]
  
  // Project-specific data based on current project
  const getProjectData = (projectId: string) => {
    switch (projectId) {
      case 'cyber-nexus':
        return {
          name: "Cyber Nexus",
          description: "A futuristic cyberpunk adventure featuring advanced AI characters and immersive virtual environments. This project combines cutting-edge motion capture technology with photorealistic rendering.",
          clientCompany: "TechCorp Entertainment",
          clientContact: "Sarah Mitchell",
          clientEmail: "sarah.mitchell@techcorp.com",
          clientPhone: "+1 (555) 987-6543",
          imageResolution: "4K (3840x2160)",
          imageRatio: "16:9",
          codec: "H.264",
          fileFormat: "MP4"
        }
      case 'ocean-depths':
        return {
          name: "Ocean Depths",
          description: "An underwater exploration adventure featuring mysterious sea creatures and ancient civilizations. This project focuses on realistic water simulation and bioluminescent effects.",
          clientCompany: "Aquatic Studios",
          clientContact: "Marina Torres",
          clientEmail: "marina.torres@aquaticstudios.com",
          clientPhone: "+1 (555) 123-4567",
          imageResolution: "4K (3840x2160)",
          imageRatio: "16:9",
          codec: "H.265/HEVC",
          fileFormat: "MOV"
        }
      case 'space-odyssey':
        return {
          name: "Space Odyssey",
          description: "An epic space exploration saga featuring alien worlds and advanced spacecraft. This project emphasizes zero-gravity environments and cosmic phenomena.",
          clientCompany: "Stellar Productions",
          clientContact: "Commander Rex",
          clientEmail: "rex@stellarproductions.com",
          clientPhone: "+1 (555) 789-0123",
          imageResolution: "8K (7680x4320)",
          imageRatio: "21:9",
          codec: "ProRes 422",
          fileFormat: "EXR"
        }
      default:
        return {
          name: "Unknown Project",
          description: "Project data not available.",
          clientCompany: "Unknown",
          clientContact: "Unknown",
          clientEmail: "unknown@example.com",
          clientPhone: "Unknown",
          imageResolution: "4K (3840x2160)",
          imageRatio: "16:9",
          codec: "H.264",
          fileFormat: "MP4"
        }
    }
  }
  
  const [isEditing, setIsEditing] = useState(false)
  const [projectData, setProjectData] = useState(getProjectData(currentProjectId))

  // Use the project background image hook
  const { imageUrl: backgroundImageUrl } = useProjectBackgroundImage(currentProjectId, projectData.name)

  const getProjectBackgroundImage = (projectName: string) => {
    // Use stored image if available, otherwise fallback to hardcoded URLs
    if (backgroundImageUrl) {
      return backgroundImageUrl
    }
    
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

  const resolutions = ["HD (1920x1080)", "4K (3840x2160)", "8K (7680x4320)", "2K (2048x1080)"]
  const ratios = ["16:9", "21:9", "4:3", "1:1", "2.35:1"]
  const codecs = ["H.264", "H.265/HEVC", "ProRes 422", "ProRes 4444", "DNxHD"]
  const formats = ["MP4", "MOV", "AVI", "MKV", "EXR", "TIFF"]

  const teamMembers = [
    { id: 1, name: "Sarah Chen", role: "Lead Animator", avatar: "/api/placeholder/40/40", department: "Animation" },
    { id: 2, name: "Mike Johnson", role: "3D Artist", avatar: "/api/placeholder/40/40", department: "Modeling" },
    { id: 3, name: "Emma Davis", role: "Technical Director", avatar: "/api/placeholder/40/40", department: "Tech Art" },
    { id: 4, name: "Alex Rodriguez", role: "Texture Artist", avatar: "/api/placeholder/40/40", department: "Texturing" },
    { id: 5, name: "Lisa Thompson", role: "Lighting Artist", avatar: "/api/placeholder/40/40", department: "Lighting" }
  ]

  const actors = [
    { 
      id: 1, 
      name: "Emma Thompson", 
      avatar: "/api/placeholder/40/40", 
      characters: ["Zara", "Commander Steel"] 
    },
    { 
      id: 2, 
      name: "David Chen", 
      avatar: "/api/placeholder/40/40", 
      characters: ["Dr. Matrix"] 
    },
    { 
      id: 3, 
      name: "Marcus Johnson", 
      avatar: "/api/placeholder/40/40", 
      characters: ["Cyber Guard"] 
    }
  ]

  const assets = [
    { id: 1, name: "Cyber Suit", type: "Character", status: "Approved", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/cc5e58cc-e0b6-4fbb-8211-c37a3f742558" },
    { id: 2, name: "Neon City", type: "Environment", status: "Work in Progress", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/06f886da-acfd-49c5-9760-a2b6a4ca6ba2" },
    { id: 3, name: "Laser Weapon", type: "Prop", status: "Ready to Start", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/b4a093f2-6333-48c3-8174-2abf1b905d7f" },
    { id: 4, name: "Hover Vehicle", type: "Vehicle", status: "Pending Review", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/0512db2b-5daa-41bb-90a0-8e27b8bffda4" }
  ]

  const getAssetThumbnail = (asset: any) => {
    // If asset has a thumbnail, use it
    if (asset.thumbnail && !asset.thumbnail.includes('/api/placeholder/')) {
      return asset.thumbnail
    }
    
    // Otherwise, use type-specific placeholder
    switch (asset.type) {
      case 'Character':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/947f5f83-17ea-4727-8bcc-8e40fb166ef6'
      case 'Environment':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/a0172859-2b18-486c-bb68-413b09816d98'
      case 'Prop':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/29ad8926-c761-4955-a819-a0623dfe5a5f'
      case 'Vehicle':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/0512db2b-5daa-41bb-90a0-8e27b8bffda4'
      default:
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/29ad8926-c761-4955-a819-a0623dfe5a5f'
    }
  }

  const scenes = [
    { id: 1, name: "Opening Sequence", status: "In Progress", duration: "3:45" },
    { id: 2, name: "Chase Scene", status: "Planning", duration: "2:30" },
    { id: 3, name: "Final Battle", status: "Approved", duration: "5:20" }
  ]

  const sequences = [
    { id: 1, name: "Act 1 - Introduction", scenes: 5, status: "In Progress" },
    { id: 2, name: "Act 2 - Conflict", scenes: 8, status: "Planning" },
    { id: 3, name: "Act 3 - Resolution", scenes: 4, status: "Not Started" }
  ]

  const shootingDays = [
    { id: 1, date: "2023-12-15", type: "Motion Capture", location: "Studio A", scenes: 3 },
    { id: 2, date: "2023-12-18", type: "Motion Capture", location: "Studio B", scenes: 2 },
    { id: 3, date: "2023-12-22", type: "Live Action", location: "Location Set", scenes: 1 }
  ]

  const storyboards = [
    { id: 1, name: "Opening Storyboard", scenes: 3, status: "Approved", thumbnail: "/api/placeholder/60/60" },
    { id: 2, name: "Action Sequence", scenes: 5, status: "In Review", thumbnail: "/api/placeholder/60/60" }
  ]

  const conceptArts = [
    { id: 1, name: "Character Designs", status: "Approved", thumbnail: "/api/placeholder/60/60" },
    { id: 2, name: "Environment Concepts", status: "In Progress", thumbnail: "/api/placeholder/60/60" },
    { id: 3, name: "Vehicle Designs", status: "Pending Review", thumbnail: "/api/placeholder/60/60" }
  ]

  const tasks = [
    { id: 1, name: "Character Rigging", assignee: "Sarah Chen", status: "In Progress", priority: "High", dueDate: "2023-12-20" },
    { id: 2, name: "Environment Modeling", assignee: "Mike Johnson", status: "Ready to Start", priority: "Medium", dueDate: "2023-12-25" },
    { id: 3, name: "Texture Creation", assignee: "Alex Rodriguez", status: "Approved", priority: "Low", dueDate: "2023-12-18" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': case 'Approved': return 'bg-green-100 text-green-800'
      case 'In Progress': case 'Work in Progress': return 'bg-blue-100 text-blue-800'
      case 'Not Started': case 'Ready to Start': return 'bg-orange-100 text-orange-800'
      case 'On Hold': case 'Pending Review': return 'bg-red-100 text-red-800'
      case 'Planning': return 'bg-purple-100 text-purple-800'
      case 'In Review': return 'bg-yellow-100 text-yellow-800'
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

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'Character': return <User className="w-4 h-4 text-blue-600" />
      case 'Environment': return <TreePine className="w-4 h-4 text-green-600" />
      case 'Prop': return <Zap className="w-4 h-4 text-purple-600" />
      case 'Vehicle': return <Car className="w-4 h-4 text-orange-600" />
      default: return <Database className="w-4 h-4 text-gray-600" />
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving project data:', projectData)
    setIsEditing(false)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Project Header */}
          <ProjectHeader 
            projectName={projectData.name}
            title={projectData.name}
            description="Manage project details, team, and resources"
            showChangeImageButton={true}
            onChangeImage={() => console.log('Change image clicked')}
          >
            <Button
              variant={isEditing ? "default" : "secondary"}
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
                  Edit Project
                </>
              )}
            </Button>
          </ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Project Information */}
            <div className="xl:col-span-2 space-y-8">
              {/* Basic Information */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Project Information</CardTitle>
                  <CardDescription>Basic project details and client information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-700 font-medium">Project Name</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={projectData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-slate-900 font-medium text-lg">{projectData.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="clientCompany" className="text-slate-700 font-medium">Client Company</Label>
                        {isEditing ? (
                          <Input
                            id="clientCompany"
                            value={projectData.clientCompany}
                            onChange={(e) => handleInputChange('clientCompany', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.clientCompany}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="clientContact" className="text-slate-700 font-medium">Client Contact</Label>
                        {isEditing ? (
                          <Input
                            id="clientContact"
                            value={projectData.clientContact}
                            onChange={(e) => handleInputChange('clientContact', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <p className="mt-1 text-slate-900">{projectData.clientContact}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="clientEmail" className="text-slate-700 font-medium">Client Email</Label>
                        {isEditing ? (
                          <Input
                            id="clientEmail"
                            type="email"
                            value={projectData.clientEmail}
                            onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.clientEmail}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="clientPhone" className="text-slate-700 font-medium">Client Phone</Label>
                        {isEditing ? (
                          <Input
                            id="clientPhone"
                            value={projectData.clientPhone}
                            onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.clientPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-slate-700 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={projectData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="mt-1 resize-none"
                      />
                    ) : (
                      <p className="mt-1 text-slate-900 leading-relaxed">{projectData.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Render Settings */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Render Panel
                  </CardTitle>
                  <CardDescription>Default render specifications for shots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="imageResolution" className="text-slate-700 font-medium">Image Resolution</Label>
                        {isEditing ? (
                          <Select value={projectData.imageResolution} onValueChange={(value) => handleInputChange('imageResolution', value)}>
                            <SelectTrigger className="mt-1">
                              <Monitor className="w-4 h-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {resolutions.map(res => (
                                <SelectItem key={res} value={res}>{res}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.imageResolution}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="imageRatio" className="text-slate-700 font-medium">Image Ratio</Label>
                        {isEditing ? (
                          <Select value={projectData.imageRatio} onValueChange={(value) => handleInputChange('imageRatio', value)}>
                            <SelectTrigger className="mt-1">
                              <Film className="w-4 h-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ratios.map(ratio => (
                                <SelectItem key={ratio} value={ratio}>{ratio}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Film className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.imageRatio}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="codec" className="text-slate-700 font-medium">Codec</Label>
                        {isEditing ? (
                          <Select value={projectData.codec} onValueChange={(value) => handleInputChange('codec', value)}>
                            <SelectTrigger className="mt-1">
                              <Settings className="w-4 h-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {codecs.map(codec => (
                                <SelectItem key={codec} value={codec}>{codec}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Settings className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.codec}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="fileFormat" className="text-slate-700 font-medium">File Format</Label>
                        {isEditing ? (
                          <Select value={projectData.fileFormat} onValueChange={(value) => handleInputChange('fileFormat', value)}>
                            <SelectTrigger className="mt-1">
                              <FileVideo className="w-4 h-4 mr-2" />
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {formats.map(format => (
                                <SelectItem key={format} value={format}>{format}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <FileVideo className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-900">{projectData.fileFormat}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Team Members</CardTitle>
                    <CardDescription>Project team and their roles</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Link href="/User" className="font-medium text-slate-900 hover:text-blue-600">
                              {member.name}
                            </Link>
                            <p className="text-sm text-slate-600">{member.role} • {member.department}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actors */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Actors</CardTitle>
                    <CardDescription>Talent assigned to this project</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Add Actor
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {actors.map((actor) => (
                      <div key={actor.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={actor.avatar} />
                            <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Link href="/Actor" className="font-medium text-slate-900 hover:text-blue-600">
                              {actor.name}
                            </Link>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {actor.characters.map(character => (
                                <Badge key={character} variant="outline" className="text-xs">
                                  {character}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Lists */}
            <div className="space-y-6">
              {/* Assets */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">Assets</CardTitle>
                    <CardDescription>{assets.length} items</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assets.slice(0, 4).map((asset) => (
                      <Link key={asset.id} href="/Asset" className="block">
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                          <div className="relative">
                            <img src={getAssetThumbnail(asset)} alt={asset.name} className="w-10 h-10 rounded object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate hover:text-blue-600">{asset.name}</p>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-slate-500">{asset.type}</span>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(asset.status)} text-xs`}>
                            {asset.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Scenes */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">Scenes</CardTitle>
                    <CardDescription>{scenes.length} scenes</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scenes.map((scene) => (
                      <Link key={scene.id} href="/Scenes">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{scene.name}</p>
                            <p className="text-xs text-slate-500">{scene.duration}</p>
                          </div>
                          <Badge className={`${getStatusColor(scene.status)} text-xs`}>
                            {scene.status}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-slate-900">Tasks</CardTitle>
                    <CardDescription>{tasks.length} active</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <Link key={task.id} href="/Tasks">
                        <div className="p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-slate-900">{task.name}</p>
                            <Badge 
                              className={`${getPriorityColor(task.priority)} text-xs`}
                            >
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">{task.assignee} • Due {task.dueDate}</p>
                        </div>
                      </Link>
                    ))}
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