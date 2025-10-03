'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  FolderOpen, 
  Database, 
  CheckSquare, 
  Users, 
  Plus, 
  Eye, 
  Clock,
  TrendingUp,
  Activity,
  UserCheck,
  Calendar
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'

export default function StudioDashboard() {
  // Mock data
  const studioData = {
    name: "Pixel Dreams Studio",
    administrator: "John Smith",
    activeProjects: 8,
    availableAssets: 1247,
    pendingTasks: 23,
    teamMembers: 15
  }

  const recentProjects = [
    { id: 1, name: "Cyber Nexus", client: "TechCorp", status: "In Progress", progress: 75 },
    { id: 2, name: "Ocean Depths", client: "Marine Studios", status: "Review", progress: 90 },
    { id: 3, name: "Space Odyssey", client: "Cosmic Films", status: "Planning", progress: 25 }
  ]

  const recentActivity = [
    { id: 1, user: "Sarah Chen", action: "completed task", target: "Character Rigging", time: "2 hours ago", type: "task" },
    { id: 2, user: "Mike Johnson", action: "uploaded asset", target: "Spaceship Model", time: "4 hours ago", type: "asset" },
    { id: 3, user: "Emma Davis", action: "updated status", target: "Scene 05", time: "6 hours ago", type: "status" },
    { id: 4, user: "Alex Rodriguez", action: "created version", target: "Environment Texture", time: "1 day ago", type: "version" }
  ]

  const teamMembers = [
    { name: "Sarah Chen", role: "Lead Animator", avatar: "/api/placeholder/32/32", department: "Animation" },
    { name: "Mike Johnson", role: "3D Artist", avatar: "/api/placeholder/32/32", department: "Modeling" },
    { name: "Emma Davis", role: "Technical Director", avatar: "/api/placeholder/32/32", department: "Tech Art" },
    { name: "Alex Rodriguez", role: "Texture Artist", avatar: "/api/placeholder/32/32", department: "Texturing" }
  ]

  const actors = [
    { name: "James Wilson", role: "Lead Actor", avatar: "/api/placeholder/32/32", projects: ["Cyber Nexus", "Ocean Depths"] },
    { name: "Lisa Thompson", role: "Supporting Actor", avatar: "/api/placeholder/32/32", projects: ["Space Odyssey"] },
    { name: "David Brown", role: "Voice Actor", avatar: "/api/placeholder/32/32", projects: ["Cyber Nexus"] }
  ]

  const assets = [
    { name: "Cyber Suit", type: "Character", status: "Approved", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/cc5e58cc-e0b6-4fbb-8211-c37a3f742558" },
    { name: "Spaceship Interior", type: "Environment", status: "Work in Progress", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/06f886da-acfd-49c5-9760-a2b6a4ca6ba2" },
    { name: "Laser Weapon", type: "Prop", status: "Ready to Start", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/b4a093f2-6333-48c3-8174-2abf1b905d7f" },
    { name: "Ocean Floor", type: "Environment", status: "Pending Review", thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/10d7be19-25e9-4016-bc21-49e68c58235f" }
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

  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': case 'Approved': return 'bg-green-100 text-green-800'
      case 'In Progress': case 'Work in Progress': return 'bg-blue-100 text-blue-800'
      case 'Not Started': case 'Ready to Start': return 'bg-orange-100 text-orange-800'
      case 'On Hold': case 'Pending Review': return 'bg-red-100 text-red-800'
      case 'Planning': case 'Review': return 'bg-purple-100 text-purple-800'
      case 'In Review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

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
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject="cyber-nexus" projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Studio Dashboard</h1>
            <p className="text-slate-600">Welcome back to {studioData.name}</p>
          </div>

          {/* Studio Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Active Projects</p>
                    <p className="text-3xl font-bold text-blue-900">{studioData.activeProjects}</p>
                  </div>
                  <FolderOpen className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Available Assets</p>
                    <p className="text-3xl font-bold text-green-900">{studioData.availableAssets}</p>
                  </div>
                  <Database className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 text-sm font-medium">Pending Tasks</p>
                    <p className="text-3xl font-bold text-orange-900">{studioData.pendingTasks}</p>
                  </div>
                  <CheckSquare className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Team Members</p>
                    <p className="text-3xl font-bold text-purple-900">{studioData.teamMembers}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Projects */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Recent Projects</CardTitle>
                  <CardDescription>Your latest project activity</CardDescription>
                </div>
                <Link href="/Projects">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="relative flex items-center justify-between p-4 bg-slate-50 rounded-lg overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ 
                        backgroundImage: `url(${getProjectBackgroundImage(project.name)})` 
                      }}
                    ></div>
                    <div className="relative z-10 flex-1 bg-white/60 backdrop-blur-sm rounded-md p-3 -m-3 mr-3">
                      <Link href="/CurrentProject" className="font-semibold text-slate-900 hover:text-blue-600">
                        {project.name}
                      </Link>
                      <p className="text-sm text-slate-600">{project.client}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your team</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'task' ? 'bg-green-100' :
                      activity.type === 'asset' ? 'bg-blue-100' :
                      activity.type === 'status' ? 'bg-orange-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'task' ? <CheckSquare className="w-4 h-4 text-green-600" /> :
                       activity.type === 'asset' ? <Database className="w-4 h-4 text-blue-600" /> :
                       activity.type === 'status' ? <TrendingUp className="w-4 h-4 text-orange-600" /> :
                       <Activity className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                        <span className="font-medium text-blue-600">{activity.target}</span>
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Team Members */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Team Members</CardTitle>
                  <CardDescription>Studio personnel</CardDescription>
                </div>
                <Link href="/StudioMembers">
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.role} • {member.department}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actors */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Studio Actors</CardTitle>
                  <CardDescription>Talent roster</CardDescription>
                </div>
                <Link href="/StudioActors">
                  <Button size="sm" variant="outline">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Add Actor
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {actors.map((actor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={actor.avatar} />
                      <AvatarFallback>{actor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{actor.name}</p>
                      <p className="text-xs text-slate-500">{actor.role}</p>
                      <p className="text-xs text-blue-600">{actor.projects.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Assets Preview */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Recent Assets</CardTitle>
                  <CardDescription>Latest additions</CardDescription>
                </div>
                <Link href="/AssetDatabase">
                  <Button size="sm" variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {assets.map((asset, index) => (
                  <Link key={index} href="/Asset" className="block">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                        <img 
                          src={getAssetThumbnail(asset)} 
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 hover:text-blue-600">{asset.name}</p>
                        <p className="text-xs text-slate-500">{asset.type}</p>
                        <Badge 
                          className={`${getStatusColor(asset.status)} mt-1 text-xs`}
                        >
                          {asset.status}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}