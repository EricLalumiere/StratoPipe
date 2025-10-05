'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Home, 
  FolderOpen, 
  Database, 
  Users, 
  UserCheck, 
  LogOut,
  ChevronDown,
  Calendar,
  Image,
  Palette,
  Video,
  Layers,
  Sun,
  CheckSquare,
  Film,
  Scissors,
  Play,
  Package,
  Workflow
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import Logo from './Logo'

interface SidebarProps {
  currentProject?: string
  projects?: Array<{ id: string; name: string }>
}

export default function Sidebar({ currentProject, projects = [] }: SidebarProps) {
  // Default projects if none provided
  const defaultProjects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const availableProjects = projects.length > 0 ? projects : defaultProjects
  const [selectedProject, setSelectedProject] = useState(currentProject || 'cyber-nexus')

  // Update selected project when currentProject prop changes
  useEffect(() => {
    if (currentProject) {
      setSelectedProject(currentProject)
    }
  }, [currentProject])

  const upperNavItems = [
    { icon: Home, label: 'Studio Dashboard', path: '/StudioDashboard' },
    { icon: FolderOpen, label: 'Projects', path: '/Projects' },
    { icon: Database, label: 'Asset Database', path: '/AssetDatabase' },
    { icon: Users, label: 'Studio Members', path: '/StudioMembers' },
    { icon: UserCheck, label: 'Studio Actors', path: '/StudioActors' }
  ]

  const projectNavItems = [
    { icon: FolderOpen, label: 'Project', path: '/CurrentProject' },
    { icon: Calendar, label: 'Schedule', path: '/Schedule' },
    { icon: Sun, label: 'Shooting Days', path: '/ShootingDays' },
    { icon: Film, label: 'Scenes', path: '/Scenes' },
    { icon: Image, label: 'Storyboards', path: '/Storyboards' },
    { icon: Palette, label: 'Concept Arts', path: '/ConceptArts' },
    { icon: Video, label: 'Sequences', path: '/Sequences' },
    { icon: Layers, label: 'Shots', path: '/Shots' },
    { icon: Scissors, label: 'EDLs', path: '/EDLs' },
    { icon: Film, label: 'Takes', path: '/Takes' },
    { icon: Play, label: 'Clips', path: '/Clips' },
    { icon: Video, label: 'Video References', path: '/VideoReferences' },
    { icon: Package, label: 'Physical Props', path: '/PhysicalProps' },
    { icon: CheckSquare, label: 'Tasks', path: '/Tasks' }
  ]

  // Get the project name for display
  const getProjectName = (projectId: string) => {
    const project = availableProjects.find(p => p.id === projectId)
    return project ? project.name : 'Unknown Project'
  }

  // Generate project-aware navigation URL
  const getProjectNavUrl = (basePath: string, projectId: string) => {
    if (!projectId) return basePath
    return `${basePath}?project=${encodeURIComponent(projectId)}`
  }

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-xl flex flex-col relative z-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200">
        <Logo size="md" />
      </div>

      {/* Upper Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {upperNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-1.5 rounded-xl text-slate-700 hover:bg-white hover:shadow-md transition-all duration-200 group"
            >
              <item.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
              <span className="font-medium group-hover:text-slate-900">{item.label}</span>
            </Link>
          ))}
        </nav>

        <Separator className="mx-4 my-1" />

        {/* Project Selection */}
        <div className="p-4 relative z-10">
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-600 mb-2 block">Current Project</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full bg-white shadow-sm border-slate-200">
                <SelectValue placeholder="Select a project...">
                  {getProjectName(selectedProject)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-[9999] bg-white shadow-xl border border-slate-200 rounded-md">
                {availableProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Navigation */}
          <nav className="space-y-1 relative z-0">
            {projectNavItems.map((item) => (
              <Link
                key={item.path}
                href={selectedProject ? getProjectNavUrl(item.path, selectedProject) : item.path}
                className={`flex items-center gap-3 px-4 py-1.5 rounded-xl transition-all duration-200 group ${
                  selectedProject 
                    ? 'text-slate-700 hover:bg-white hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]' 
                    : 'text-slate-400 cursor-not-allowed opacity-60'
                }`}
              >
                <item.icon className={`w-5 h-5 ${
                  selectedProject 
                    ? 'text-slate-500 group-hover:text-blue-600' 
                    : 'text-slate-300'
                }`} />
                <span className={`font-medium ${
                  selectedProject 
                    ? 'group-hover:text-slate-900' 
                    : ''
                }`}>{item.label}</span>
                {selectedProject && (
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronDown className="w-4 h-4 text-slate-400 rotate-[-90deg]" />
                  </div>
                )}
              </Link>
            ))}
            
            {!selectedProject && (
              <div className="px-4 py-1.5 text-center">
                <div className="text-xs text-slate-500 italic">
                  Select a project above to access project-specific features
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-700 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}