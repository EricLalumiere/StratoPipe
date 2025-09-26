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
  GitBranch,
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
import { useAuth } from '@/contexts/AuthContext'

interface SidebarProps {
  currentProject?: string
  projects?: Array<{ id: string; name: string }>
}

export default function Sidebar({ currentProject, projects = [] }: SidebarProps) {
  const { logout, user } = useAuth()
  
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
    { icon: Home, label: 'Studio Dashboard', path: '/studio-dashboard' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Database, label: 'Asset Database', path: '/asset-database' },
    { icon: Users, label: 'Studio Members', path: '/studio-members' },
    { icon: UserCheck, label: 'Studio Actors', path: '/studio-actors' }
  ]

  const projectNavItems = [
    { icon: FolderOpen, label: 'Project', path: '/current-project' },
    { icon: Calendar, label: 'Schedule', path: '/projects/[id]/schedule' },
    { icon: Sun, label: 'Shooting Days', path: '/projects/[id]/shooting-days' },
    { icon: Film, label: 'Scenes', path: '/projects/[id]/scenes' },
    { icon: Image, label: 'Storyboards', path: '/projects/[id]/storyboards' },
    { icon: Palette, label: 'Concept Arts', path: '/projects/[id]/concept-arts' },
    { icon: Video, label: 'Sequences', path: '/projects/[id]/sequences' },
    { icon: Layers, label: 'Shots', path: '/projects/[id]/shots' },
    { icon: Scissors, label: 'EDLs', path: '/projects/[id]/edls' },
    { icon: Film, label: 'Takes', path: '/projects/[id]/takes' },
    { icon: Play, label: 'Clips', path: '/projects/[id]/clips' },
    { icon: Video, label: 'Video References', path: '/projects/[id]/video-references' },
    { icon: Package, label: 'Physical Props', path: '/projects/[id]/physical-props' },
    { icon: CheckSquare, label: 'Tasks', path: '/projects/[id]/tasks' },
    { icon: GitBranch, label: 'Dependencies', path: '/projects/[id]/dependency-graph' }
  ]

  // Get the project name for display
  const getProjectName = (projectId: string) => {
    const project = availableProjects.find(p => p.id === projectId)
    return project ? project.name : 'Unknown Project'
  }

  // Generate project-aware navigation URL
  const getProjectNavUrl = (basePath: string, projectId: string) => {
    if (!projectId) return basePath
    // Replace [id] with actual project ID
    const pathWithProject = basePath.replace('[id]', projectId)
    return `${pathWithProject}?project=${encodeURIComponent(projectId)}`
  }

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 shadow-xl flex flex-col">
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
        <div className="p-4">
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-600 mb-2 block">Current Project</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full bg-white shadow-sm border-slate-200">
                <SelectValue placeholder="Select a project..." />
              </SelectTrigger>
              <SelectContent>
                {availableProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project Navigation */}
          <nav className="space-y-1">
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
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}