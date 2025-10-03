'use client'

import React, { useState, useEffect } from 'react'
import { Link } from '@/lib'
import { Search, Plus, Grid, List, Eye, Edit, Trash2, CheckSquare, Calendar, User, Clock, AlertCircle, Users, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Components from '../components'
import { useStatusPreferences } from '../components/StatusPreferences'
import BulkStatusManager from '../components/BulkStatusManager'

export default function Tasks() {
  const { getStatusOptions } = useStatusPreferences()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid, list, kanban, calendar
  const [currentProject, setCurrentProject] = useState('cyber-nexus')
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [selectedTasks, setSelectedTasks] = useState<number[]>([])
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [showBulkStatusManager, setShowBulkStatusManager] = useState(false)

  // Task management metadata
  const [taskMetadata, setTaskMetadata] = useState({
    projectPhase: 'Production',
    totalBudget: '$500K',
    teamSize: '12',
    deadline: '2024-06-30',
    methodology: 'Agile',
    tags: ['motion-capture', 'animation', 'vfx', 'post-production']
  })

  // Define metadata fields for task management
  const metadataFields = [
    {
      key: 'projectPhase',
      label: 'Project Phase',
      type: 'select' as const,
      value: taskMetadata.projectPhase,
      options: ['Pre-Production', 'Production', 'Post-Production', 'Delivery']
    },
    {
      key: 'totalBudget',
      label: 'Total Budget',
      type: 'text' as const,
      value: taskMetadata.totalBudget,
      placeholder: 'Enter total budget'
    },
    {
      key: 'teamSize',
      label: 'Team Size',
      type: 'text' as const,
      value: taskMetadata.teamSize,
      placeholder: 'Number of team members'
    },
    {
      key: 'deadline',
      label: 'Project Deadline',
      type: 'date' as const,
      value: taskMetadata.deadline
    },
    {
      key: 'methodology',
      label: 'Methodology',
      type: 'select' as const,
      value: taskMetadata.methodology,
      options: ['Agile', 'Waterfall', 'Hybrid', 'Kanban']
    },
    {
      key: 'tags',
      label: 'Project Tags',
      type: 'tags' as const,
      value: taskMetadata.tags
    }
  ]

  // Handle metadata save
  const handleMetadataSave = (updatedFields: Record<string, any>) => {
    setTaskMetadata(prev => ({ ...prev, ...updatedFields }))
    console.log('Task metadata updated:', updatedFields)
  }

  // Handle task selection
  const handleTaskSelection = (taskId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTasks(prev => [...prev, taskId])
    } else {
      setSelectedTasks(prev => prev.filter(id => id !== taskId))
    }
  }

  // Handle select all tasks
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedTasks(filteredTasks.map(task => task.id))
    } else {
      setSelectedTasks([])
    }
  }

  // Show success toast
  const showToast = (message: string) => {
    setToastMessage(message)
    setShowSuccessToast(true)
    setTimeout(() => {
      setShowSuccessToast(false)
    }, 4000)
  }

  // Handle bulk status update
  const handleBulkStatusUpdate = (newStatus: string) => {
    if (newStatus && selectedTasks.length > 0) {
      const statusLabels = {
        'pending': 'Pending',
        'in-progress': 'In Progress', 
        'completed': 'Completed',
        'blocked': 'Blocked'
      }
      
      const confirmMessage = `Are you sure you want to update ${selectedTasks.length} selected task${selectedTasks.length > 1 ? 's' : ''} to "${statusLabels[newStatus as keyof typeof statusLabels]}" status?`
      
      if (confirm(confirmMessage)) {
        console.log('Bulk update status for tasks:', selectedTasks, 'to status:', newStatus)
        
        // Simulate API call delay
        setTimeout(() => {
          showToast(`Successfully updated ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''} to "${statusLabels[newStatus as keyof typeof statusLabels]}" status`)
          setSelectedTasks([])
        }, 500)
      }
    }
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedTasks.length > 0) {
      const confirmMessage = `Are you sure you want to delete ${selectedTasks.length} selected task${selectedTasks.length > 1 ? 's' : ''}? This action cannot be undone.`
      
      if (confirm(confirmMessage)) {
        console.log('Bulk delete tasks:', selectedTasks)
        
        // Simulate API call delay
        setTimeout(() => {
          showToast(`Successfully deleted ${selectedTasks.length} task${selectedTasks.length > 1 ? 's' : ''}`)
          setSelectedTasks([])
        }, 500)
      }
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const projectParam = urlParams.get('project')
    if (projectParam) {
      setCurrentProject(projectParam)
    }
  }, [])

  // Set calendar to the month where the first task begins
  useEffect(() => {
    const currentProjectTasks = tasks.filter(task => task.project === currentProject)
    if (currentProjectTasks.length > 0) {
      // Find the earliest task date (either created date or due date)
      const earliestDate = currentProjectTasks.reduce((earliest, task) => {
        const taskCreatedDate = new Date(task.createdDate)
        const taskDueDate = new Date(task.dueDate)
        const earliestTaskDate = taskCreatedDate < taskDueDate ? taskCreatedDate : taskDueDate
        return earliestTaskDate < earliest ? earliestTaskDate : earliest
      }, new Date(currentProjectTasks[0].createdDate))
      
      setCalendarDate(earliestDate)
    }
  }, [currentProject])

  const tasks = [
    // Cyber Nexus Project Tasks
    {
      id: 1,
      name: 'Character Concept - Zara',
      description: 'Create initial concept art for main protagonist Zara',
      status: 'completed',
      priority: 'high',
      department: 'Concept Art',
      assignee: 'Luna Martinez',
      creator: 'Mike Johnson',
      createdDate: '2024-01-10',
      dueDate: '2024-01-15',
      progress: 100,
      estimatedHours: 16,
      project: 'cyber-nexus',
      dependencies: [],
      dependants: [2, 3, 4]
    },
    {
      id: 2,
      name: 'Character Modeling - Zara',
      description: 'Create 3D model for main protagonist character based on concept',
      status: 'in-progress',
      priority: 'high',
      department: 'Modeling',
      assignee: 'David Kim',
      creator: 'Luna Martinez',
      createdDate: '2024-01-15',
      dueDate: '2024-02-01',
      progress: 65,
      estimatedHours: 40,
      project: 'cyber-nexus',
      dependencies: [1],
      dependants: [5, 6, 7]
    },
    {
      id: 3,
      name: 'Character Texturing - Zara',
      description: 'Apply textures and materials to Zara character model',
      status: 'pending',
      priority: 'high',
      department: 'Texturing',
      assignee: 'Emma Davis',
      creator: 'David Kim',
      createdDate: '2024-01-18',
      dueDate: '2024-02-05',
      progress: 0,
      estimatedHours: 32,
      project: 'cyber-nexus',
      dependencies: [1, 2],
      dependants: [8, 9]
    },
    {
      id: 4,
      name: 'Character Rigging - Zara',
      description: 'Create rig system for character animation',
      status: 'pending',
      priority: 'medium',
      department: 'Rigging',
      assignee: 'James Wilson',
      creator: 'David Kim',
      createdDate: '2024-01-20',
      dueDate: '2024-02-08',
      progress: 0,
      estimatedHours: 48,
      project: 'cyber-nexus',
      dependencies: [2],
      dependants: [10, 11, 12]
    },
    {
      id: 5,
      name: 'Facial Rigging - Zara',
      description: 'Create facial rig for detailed expressions',
      status: 'pending',
      priority: 'medium',
      department: 'Rigging',
      assignee: 'Alex Chen',
      creator: 'James Wilson',
      createdDate: '2024-01-22',
      dueDate: '2024-02-10',
      progress: 0,
      estimatedHours: 24,
      project: 'cyber-nexus',
      dependencies: [2],
      dependants: [13]
    },
    {
      id: 6,
      name: 'Environment Concept - Neo Tokyo',
      description: 'Design cyberpunk cityscape environment',
      status: 'completed',
      priority: 'high',
      department: 'Concept Art',
      assignee: 'Maria Rodriguez',
      creator: 'Mike Johnson',
      createdDate: '2024-01-12',
      dueDate: '2024-01-20',
      progress: 100,
      estimatedHours: 20,
      project: 'cyber-nexus',
      dependencies: [],
      dependants: [7, 14]
    },
    {
      id: 7,
      name: 'Environment Modeling - Neo Tokyo',
      description: 'Create 3D environment based on concept art',
      status: 'in-progress',
      priority: 'high',
      department: 'Modeling',
      assignee: 'Sarah Chen',
      creator: 'Maria Rodriguez',
      createdDate: '2024-01-20',
      dueDate: '2024-02-15',
      progress: 45,
      estimatedHours: 80,
      project: 'cyber-nexus',
      dependencies: [2, 6],
      dependants: [15, 16]
    },
    {
      id: 8,
      name: 'Material Setup - Zara',
      description: 'Set up advanced materials and shaders for character',
      status: 'pending',
      priority: 'low',
      department: 'Tech Art',
      assignee: 'Maria Rodriguez',
      creator: 'Emma Davis',
      createdDate: '2024-01-25',
      dueDate: '2024-02-12',
      progress: 0,
      estimatedHours: 16,
      project: 'cyber-nexus',
      dependencies: [3],
      dependants: [17]
    },
    {
      id: 9,
      name: 'Lighting Test - Character',
      description: 'Test lighting setup for character renders',
      status: 'pending',
      priority: 'medium',
      department: 'Lighting',
      assignee: 'David Kim',
      creator: 'Emma Davis',
      createdDate: '2024-01-28',
      dueDate: '2024-02-08',
      progress: 0,
      estimatedHours: 12,
      project: 'cyber-nexus',
      dependencies: [3],
      dependants: [18]
    },
    {
      id: 10,
      name: 'Walk Cycle Animation',
      description: 'Create basic walk cycle for character',
      status: 'pending',
      priority: 'medium',
      department: 'Animation',
      assignee: 'Sarah Chen',
      creator: 'James Wilson',
      createdDate: '2024-02-01',
      dueDate: '2024-02-15',
      progress: 0,
      estimatedHours: 24,
      project: 'cyber-nexus',
      dependencies: [4],
      dependants: [19]
    },
    {
      id: 11,
      name: 'Idle Animation',
      description: 'Create idle pose animation for character',
      status: 'pending',
      priority: 'low',
      department: 'Animation',
      assignee: 'Mike Rodriguez',
      creator: 'James Wilson',
      createdDate: '2024-02-02',
      dueDate: '2024-02-18',
      progress: 0,
      estimatedHours: 16,
      project: 'cyber-nexus',
      dependencies: [4],
      dependants: [19]
    },
    {
      id: 12,
      name: 'Chase Scene Animation',
      description: 'Animate vehicle chase sequence with character',
      status: 'pending',
      priority: 'high',
      department: 'Animation',
      assignee: 'Alex Rodriguez',
      creator: 'James Wilson',
      createdDate: '2024-02-05',
      dueDate: '2024-02-25',
      progress: 0,
      estimatedHours: 60,
      project: 'cyber-nexus',
      dependencies: [4, 7],
      dependants: [20]
    },
    {
      id: 13,
      name: 'Facial Expressions',
      description: 'Create facial animation library for character',
      status: 'pending',
      priority: 'medium',
      department: 'Animation',
      assignee: 'Emma Davis',
      creator: 'Alex Chen',
      createdDate: '2024-02-08',
      dueDate: '2024-02-22',
      progress: 0,
      estimatedHours: 32,
      project: 'cyber-nexus',
      dependencies: [5],
      dependants: [19]
    },
    {
      id: 14,
      name: 'Environment Texturing - Neo Tokyo',
      description: 'Apply textures to cyberpunk city environment',
      status: 'pending',
      priority: 'medium',
      department: 'Texturing',
      assignee: 'Emma Davis',
      creator: 'Sarah Chen',
      createdDate: '2024-02-10',
      dueDate: '2024-02-28',
      progress: 0,
      estimatedHours: 48,
      project: 'cyber-nexus',
      dependencies: [6, 7],
      dependants: [15, 16]
    },
    {
      id: 15,
      name: 'Environment Lighting',
      description: 'Set up lighting for cyberpunk environment',
      status: 'pending',
      priority: 'medium',
      department: 'Lighting',
      assignee: 'David Kim',
      creator: 'Sarah Chen',
      createdDate: '2024-02-12',
      dueDate: '2024-03-05',
      progress: 0,
      estimatedHours: 40,
      project: 'cyber-nexus',
      dependencies: [7, 14],
      dependants: [18, 20]
    },
    {
      id: 16,
      name: 'VFX Elements - Holograms',
      description: 'Create holographic UI elements for environment',
      status: 'pending',
      priority: 'low',
      department: 'FX',
      assignee: 'Alex Chen',
      creator: 'Sarah Chen',
      createdDate: '2024-02-15',
      dueDate: '2024-03-01',
      progress: 0,
      estimatedHours: 28,
      project: 'cyber-nexus',
      dependencies: [7, 14],
      dependants: [20]
    },
    {
      id: 17,
      name: 'Final Asset Integration',
      description: 'Integrate all character assets and materials',
      status: 'pending',
      priority: 'high',
      department: 'Tech Art',
      assignee: 'David Kim',
      creator: 'Maria Rodriguez',
      createdDate: '2024-02-18',
      dueDate: '2024-03-08',
      progress: 0,
      estimatedHours: 20,
      project: 'cyber-nexus',
      dependencies: [8, 9],
      dependants: [19]
    },
    {
      id: 18,
      name: 'Scene Lighting Setup',
      description: 'Final lighting setup for all scenes',
      status: 'pending',
      priority: 'high',
      department: 'Lighting',
      assignee: 'David Kim',
      creator: 'Mike Johnson',
      createdDate: '2024-02-20',
      dueDate: '2024-03-10',
      progress: 0,
      estimatedHours: 36,
      project: 'cyber-nexus',
      dependencies: [9, 15],
      dependants: [20]
    },
    {
      id: 19,
      name: 'Character Animation Compilation',
      description: 'Compile all character animations into final library',
      status: 'pending',
      priority: 'high',
      department: 'Animation',
      assignee: 'Sarah Chen',
      creator: 'Mike Johnson',
      createdDate: '2024-02-25',
      dueDate: '2024-03-15',
      progress: 0,
      estimatedHours: 24,
      project: 'cyber-nexus',
      dependencies: [10, 11, 13, 17],
      dependants: [20]
    },
    {
      id: 20,
      name: 'Final Scene Render',
      description: 'Render final chase scene with all elements',
      status: 'pending',
      priority: 'high',
      department: 'Editorial',
      assignee: 'Mike Rodriguez',
      creator: 'Mike Johnson',
      createdDate: '2024-03-01',
      dueDate: '2024-03-20',
      progress: 0,
      estimatedHours: 16,
      project: 'cyber-nexus',
      dependencies: [12, 15, 16, 18, 19],
      dependants: []
    },

    // Ocean Depths Project Tasks
    {
      id: 21,
      name: 'Ocean Creature Concept',
      description: 'Design alien sea creature concept art',
      status: 'completed',
      priority: 'high',
      department: 'Concept Art',
      assignee: 'Luna Martinez',
      creator: 'Mike Johnson',
      createdDate: '2024-01-08',
      dueDate: '2024-01-15',
      progress: 100,
      estimatedHours: 20,
      project: 'ocean-depths',
      dependencies: [],
      dependants: [22, 23]
    },
    {
      id: 22,
      name: 'Ocean Creature Modeling',
      description: 'Create 3D model of alien sea creature',
      status: 'in-progress',
      priority: 'high',
      department: 'Modeling',
      assignee: 'David Kim',
      creator: 'Luna Martinez',
      createdDate: '2024-01-15',
      dueDate: '2024-02-05',
      progress: 70,
      estimatedHours: 56,
      project: 'ocean-depths',
      dependencies: [21],
      dependants: [24, 25]
    },
    {
      id: 23,
      name: 'Ocean Creature Rigging',
      description: 'Rig alien sea creature for animation',
      status: 'in-progress',
      priority: 'high',
      department: 'Rigging',
      assignee: 'Lisa Park',
      creator: 'David Kim',
      createdDate: '2024-01-20',
      dueDate: '2024-02-10',
      progress: 60,
      estimatedHours: 48,
      project: 'ocean-depths',
      dependencies: [21, 22],
      dependants: [26, 27]
    },
    {
      id: 24,
      name: 'Underwater Environment',
      description: 'Create underwater city environment',
      status: 'pending',
      priority: 'medium',
      department: 'Modeling',
      assignee: 'Sarah Chen',
      creator: 'Mike Johnson',
      createdDate: '2024-01-25',
      dueDate: '2024-02-20',
      progress: 0,
      estimatedHours: 72,
      project: 'ocean-depths',
      dependencies: [22],
      dependants: [28]
    },

    // Space Odyssey Project Tasks
    {
      id: 25,
      name: 'Spacecraft Concept',
      description: 'Design futuristic spacecraft concept',
      status: 'completed',
      priority: 'high',
      department: 'Concept Art',
      assignee: 'Maria Rodriguez',
      creator: 'Mike Johnson',
      createdDate: '2024-01-20',
      dueDate: '2024-01-28',
      progress: 100,
      estimatedHours: 18,
      project: 'space-odyssey',
      dependencies: [],
      dependants: [26, 27]
    },
    {
      id: 26,
      name: 'Spacecraft Modeling',
      description: 'Create detailed spacecraft 3D model',
      status: 'completed',
      priority: 'high',
      department: 'Modeling',
      assignee: 'Tom Anderson',
      creator: 'Maria Rodriguez',
      createdDate: '2024-01-28',
      dueDate: '2024-02-15',
      progress: 100,
      estimatedHours: 56,
      project: 'space-odyssey',
      dependencies: [25],
      dependants: [28, 29]
    },
    {
      id: 27,
      name: 'Space Station Interior',
      description: 'Model interior of space station',
      status: 'in-progress',
      priority: 'medium',
      department: 'Modeling',
      assignee: 'Alex Chen',
      creator: 'Tom Anderson',
      createdDate: '2024-02-01',
      dueDate: '2024-02-25',
      progress: 40,
      estimatedHours: 64,
      project: 'space-odyssey',
      dependencies: [25],
      dependants: [30]
    },
    {
      id: 28,
      name: 'Spacecraft Texturing',
      description: 'Apply materials and textures to spacecraft',
      status: 'pending',
      priority: 'medium',
      department: 'Texturing',
      assignee: 'Emma Davis',
      creator: 'Tom Anderson',
      createdDate: '2024-02-10',
      dueDate: '2024-03-01',
      progress: 0,
      estimatedHours: 40,
      project: 'space-odyssey',
      dependencies: [24, 26],
      dependants: [31]
    }
  ]

  const projectTasks = tasks.filter(task => task.project === currentProject)

  const filteredTasks = projectTasks
    .filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus
      const matchesDepartment = filterDepartment === 'all' || task.department === filterDepartment
      return matchesSearch && matchesStatus && matchesDepartment
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'date': return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        case 'due': return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        case 'priority': {
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
        }
        case 'status': return a.status.localeCompare(b.status)
        default: return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Modeling': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Texturing': return 'bg-green-100 text-green-800 border-green-200'
      case 'Animation': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Lighting': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Rigging': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Components.Sidebar currentProject={currentProject} />
      
      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-md">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">Success!</p>
                <p className="text-sm text-green-700 mt-1">{toastMessage}</p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="flex-shrink-0 text-green-400 hover:text-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Components.ProjectHeader 
            projectName={getProjectName(currentProject)}
            title="Tasks"
            description={`Manage and view all tasks for ${getProjectName(currentProject)}`}
            showMetadataEditor={true}
            metadataFields={metadataFields}
            onMetadataSave={handleMetadataSave}
          />
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="grid grid-cols-2 sm:flex gap-2 flex-1">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="date">Sort by Created</SelectItem>
                    <SelectItem value="due">Sort by Due Date</SelectItem>
                    <SelectItem value="priority">Sort by Priority</SelectItem>
                    <SelectItem value="status">Sort by Status</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Modeling">Modeling</SelectItem>
                    <SelectItem value="Texturing">Texturing</SelectItem>
                    <SelectItem value="Animation">Animation</SelectItem>
                    <SelectItem value="Lighting">Lighting</SelectItem>
                    <SelectItem value="Rigging">Rigging</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="kanban">Kanban Board</SelectItem>
                    <SelectItem value="calendar">Calendar View</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Link to={`/TaskCreation?project=${currentProject}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </Link>
            </div>
          </div>

          {/* Task Statistics and Bulk Actions */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="select-all-tasks"
                    checked={filteredTasks.length > 0 && selectedTasks.length === filteredTasks.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="select-all-tasks" className="ml-2 text-sm text-gray-600 cursor-pointer">
                    Select All
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Showing {filteredTasks.length} of {projectTasks.length} tasks for {getProjectName(currentProject)}
                </p>
              </div>
              
              {/* Task Statistics */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {filteredTasks.filter(t => t.status === 'completed').length} Completed
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {filteredTasks.filter(t => t.status === 'in-progress').length} In Progress
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {filteredTasks.filter(t => t.status === 'pending').length} Pending
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">
                    {filteredTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length} Overdue
                  </span>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedTasks.length > 0 && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm text-blue-700 font-medium">
                  {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => setShowBulkStatusManager(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Set Status & Create Versions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-300 hover:bg-red-100"
                      onClick={handleBulkDelete}
                    >
                      Delete Selected
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setSelectedTasks([])}
                    >
                      Clear Selection
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                        />
                        <CardTitle className="text-lg line-clamp-1 flex-1">{task.name}</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {isOverdue(task.dueDate) && task.status !== 'completed' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge className={getDepartmentColor(task.department)}>
                          {task.department}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className={isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-500 font-medium' : ''}>
                            Due {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.estimatedHours}h estimated</span>
                        </div>
                      </div>
                    </div>

                    {/* Dependency Indicators */}
                    {(task.dependencies.length > 0 || task.dependants.length > 0) && (
                      <div className="mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between text-xs">
                          {task.dependencies.length > 0 && (
                            <div className="flex items-center gap-1 text-orange-600">
                              <GitBranch className="w-3 h-3" />
                              <span>Depends on {task.dependencies.length}</span>
                            </div>
                          )}
                          {task.dependants.length > 0 && (
                            <div className="flex items-center gap-1 text-blue-600">
                              <GitBranch className="w-3 h-3 rotate-180" />
                              <span>Enables {task.dependants.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link to={`/Task?id=${task.id}&project=${currentProject}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Components.MetadataEditor
                        title={`Edit ${task.name}`}
                        description="Update task information"
                        fields={[
                          { key: 'name', label: 'Task Name', type: 'text', value: task.name, required: true },
                          { key: 'description', label: 'Description', type: 'textarea', value: task.description },
                          { key: 'status', label: 'Status', type: 'select', value: task.status, options: ['pending', 'in-progress', 'completed', 'blocked'] },
                          { key: 'priority', label: 'Priority', type: 'select', value: task.priority, options: ['low', 'medium', 'high'] },
                          { key: 'assignee', label: 'Assignee', type: 'text', value: task.assignee },
                          { key: 'department', label: 'Department', type: 'select', value: task.department, options: ['Modeling', 'Texturing', 'Animation', 'Lighting', 'Rigging', 'Concept Art', 'Tech Art', 'FX', 'Editorial'] },
                          { key: 'dueDate', label: 'Due Date', type: 'date', value: task.dueDate },
                          { key: 'estimatedHours', label: 'Estimated Hours', type: 'text', value: task.estimatedHours.toString() }
                        ]}
                        onSave={(updatedFields) => {
                          console.log('Saving task updates:', updatedFields)
                        }}
                        triggerButton={
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        }
                      />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-700 border-red-300 hover:bg-red-50"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete task "${task.name}"? This action cannot be undone.`)) {
                            console.log('Deleting task:', task.id)
                            alert(`Delete functionality for task "${task.name}" - This would delete the task in a real application`)
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(task.id)}
                          onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{task.name}</h3>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(task.status)}>
                                {task.status}
                              </Badge>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                              </Badge>
                              <Badge className={getDepartmentColor(task.department)}>
                                {task.department}
                              </Badge>
                              {isOverdue(task.dueDate) && task.status !== 'completed' && (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                          <div className="flex items-center gap-6 text-xs text-gray-500 mb-2">
                            <span>{task.assignee}</span>
                            <span className={isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-500 font-medium' : ''}>
                              Due {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span>{task.estimatedHours}h estimated</span>
                            <span>{task.progress}% complete</span>
                          </div>
                          <Progress value={task.progress} className="h-2 w-48" />
                        </div>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <Link to={`/Task?id=${task.id}&project=${currentProject}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Components.MetadataEditor
                          title={`Edit ${task.name}`}
                          description="Update task information"
                          fields={[
                            { key: 'name', label: 'Task Name', type: 'text', value: task.name, required: true },
                            { key: 'description', label: 'Description', type: 'textarea', value: task.description },
                            { key: 'status', label: 'Status', type: 'select', value: task.status, options: ['pending', 'in-progress', 'completed', 'blocked'] },
                            { key: 'priority', label: 'Priority', type: 'select', value: task.priority, options: ['low', 'medium', 'high'] },
                            { key: 'assignee', label: 'Assignee', type: 'text', value: task.assignee },
                            { key: 'department', label: 'Department', type: 'select', value: task.department, options: ['Modeling', 'Texturing', 'Animation', 'Lighting', 'Rigging', 'Concept Art', 'Tech Art', 'FX', 'Editorial'] },
                            { key: 'dueDate', label: 'Due Date', type: 'date', value: task.dueDate },
                            { key: 'estimatedHours', label: 'Estimated Hours', type: 'text', value: task.estimatedHours.toString() }
                          ]}
                          onSave={(updatedFields) => {
                            console.log('Saving task updates:', updatedFields)
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

          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pending Column */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-900">Pending</h4>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {filteredTasks.filter(t => t.status === 'pending').length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {filteredTasks
                    .filter(task => task.status === 'pending')
                    .map(task => (
                      <div key={task.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                          />
                          <div className="flex-1">
                            <Link to={`/Task?id=${task.id}&project=${currentProject}`}>
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 text-sm leading-tight">
                                  {task.name}
                                </h5>
                                <Badge className={getPriorityColor(task.priority)} variant="outline">
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {task.department} • {task.assignee}
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`${isOverdue(task.dueDate) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span className="font-medium text-yellow-600">{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                <div 
                                  className="bg-yellow-500 h-1 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                              {task.dependencies.length > 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  Depends on {task.dependencies.length} task{task.dependencies.length > 1 ? 's' : ''}
                                </div>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  {filteredTasks.filter(t => t.status === 'pending').length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      No pending tasks
                    </div>
                  )}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">In Progress</h4>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {filteredTasks.filter(t => t.status === 'in-progress').length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {filteredTasks
                    .filter(task => task.status === 'in-progress')
                    .map(task => (
                      <div key={task.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                          />
                          <div className="flex-1">
                            <Link to={`/Task?id=${task.id}&project=${currentProject}`}>
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 text-sm leading-tight">
                                  {task.name}
                                </h5>
                                <Badge className={getPriorityColor(task.priority)} variant="outline">
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {task.department} • {task.assignee}
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`${isOverdue(task.dueDate) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span className="font-medium text-blue-600">{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                <div 
                                  className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                              {task.dependants.length > 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  Enables {task.dependants.length} task{task.dependants.length > 1 ? 's' : ''}
                                </div>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  {filteredTasks.filter(t => t.status === 'in-progress').length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      No tasks in progress
                    </div>
                  )}
                </div>
              </div>

              {/* Completed Column */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-900">Completed</h4>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {filteredTasks.filter(t => t.status === 'completed').length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {filteredTasks
                    .filter(task => task.status === 'completed')
                    .map(task => (
                      <div key={task.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                          />
                          <div className="flex-1">
                            <Link to={`/Task?id=${task.id}&project=${currentProject}`}>
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 text-sm leading-tight">
                                  {task.name}
                                </h5>
                                <Badge className={getPriorityColor(task.priority)} variant="outline">
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {task.department} • {task.assignee}
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500">
                                  Completed: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span className="font-medium text-green-600">100%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                <div className="bg-green-500 h-1 rounded-full w-full"></div>
                              </div>
                              {task.dependants.length > 0 && (
                                <div className="mt-2 text-xs text-gray-500">
                                  Enabled {task.dependants.length} task{task.dependants.length > 1 ? 's' : ''}
                                </div>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  {filteredTasks.filter(t => t.status === 'completed').length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      No completed tasks
                    </div>
                  )}
                </div>
              </div>

              {/* Blocked Column */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-900">Blocked</h4>
                    </div>
                    <Badge className="bg-red-100 text-red-800">
                      {filteredTasks.filter(t => t.status === 'blocked').length}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {filteredTasks
                    .filter(task => task.status === 'blocked')
                    .map(task => (
                      <div key={task.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={(e) => handleTaskSelection(task.id, e.target.checked)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
                          />
                          <div className="flex-1">
                            <Link to={`/Task?id=${task.id}&project=${currentProject}`}>
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-gray-900 text-sm leading-tight">
                                  {task.name}
                                </h5>
                                <Badge className={getPriorityColor(task.priority)} variant="outline">
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {task.department} • {task.assignee}
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className={`${isOverdue(task.dueDate) ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                                <span className="font-medium text-red-600">{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                <div 
                                  className="bg-red-500 h-1 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                              {task.dependencies.length > 0 && (
                                <div className="mt-2 text-xs text-red-600">
                                  Blocked by {task.dependencies.length} task{task.dependencies.length > 1 ? 's' : ''}
                                </div>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  {filteredTasks.filter(t => t.status === 'blocked').length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      No blocked tasks
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'calendar' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Task Calendar</h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(calendarDate)
                        newDate.setMonth(newDate.getMonth() - 1)
                        setCalendarDate(newDate)
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Components.DatePicker 
                      value={calendarDate}
                      onChange={setCalendarDate}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(calendarDate)
                        newDate.setMonth(newDate.getMonth() + 1)
                        setCalendarDate(newDate)
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCalendarDate(new Date())}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Today
                    </Button>
                  </div>
                </div>
                
                {/* Calendar Legend */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Overdue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Due Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Upcoming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const today = new Date()
                    const currentMonth = calendarDate.getMonth()
                    const currentYear = calendarDate.getFullYear()
                    const firstDay = new Date(currentYear, currentMonth, 1)
                    const lastDay = new Date(currentYear, currentMonth + 1, 0)
                    const startDate = new Date(firstDay)
                    startDate.setDate(startDate.getDate() - firstDay.getDay())
                    
                    const days = []
                    const endDate = new Date(lastDay)
                    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
                    
                    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                      const dateStr = date.toISOString().split('T')[0]
                      // Use filteredTasks to respect all current filters (search, status, department)
                      const dayTasks = filteredTasks.filter(task => task.dueDate === dateStr)
                      const isCurrentMonth = date.getMonth() === currentMonth
                      const isToday = date.toDateString() === today.toDateString()
                      
                      // Count tasks by status for this day
                      const taskCounts = {
                        overdue: dayTasks.filter(task => new Date(task.dueDate) < today && task.status !== 'completed').length,
                        dueToday: dayTasks.filter(task => new Date(task.dueDate).toDateString() === today.toDateString()).length,
                        completed: dayTasks.filter(task => task.status === 'completed').length,
                        pending: dayTasks.filter(task => task.status === 'pending').length,
                        inProgress: dayTasks.filter(task => task.status === 'in-progress').length
                      }
                      
                      days.push(
                        <div 
                          key={dateStr}
                          className={`min-h-32 p-2 border-2 rounded-lg transition-all hover:shadow-md ${
                            isCurrentMonth ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100'
                          } ${isToday ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300' : ''} ${
                            dayTasks.length > 0 ? 'hover:border-blue-300' : ''
                          }`}
                        >
                          {/* Date Header */}
                          <div className={`flex items-center justify-between mb-2 ${
                            isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          } ${isToday ? 'text-blue-600' : ''}`}>
                            <span className="text-sm font-semibold">{date.getDate()}</span>
                            {dayTasks.length > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-xs font-medium">{dayTasks.length}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Task Status Indicators */}
                          {dayTasks.length > 0 && (
                            <div className="flex gap-1 mb-2">
                              {taskCounts.overdue > 0 && (
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <span className="text-xs text-red-600 font-medium">{taskCounts.overdue}</span>
                                </div>
                              )}
                              {taskCounts.dueToday > 0 && (
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  <span className="text-xs text-yellow-600 font-medium">{taskCounts.dueToday}</span>
                                </div>
                              )}
                              {taskCounts.inProgress > 0 && (
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-blue-600 font-medium">{taskCounts.inProgress}</span>
                                </div>
                              )}
                              {taskCounts.completed > 0 && (
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-green-600 font-medium">{taskCounts.completed}</span>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Task Cards */}
                          <div className="space-y-1">
                            {dayTasks.slice(0, 2).map(task => {
                              const isOverdueTask = new Date(task.dueDate) < today && task.status !== 'completed'
                              const isDueToday = new Date(task.dueDate).toDateString() === today.toDateString()
                              
                              let taskColor = 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                              let statusIcon = <Clock className="w-3 h-3" />
                              
                              if (task.status === 'completed') {
                                taskColor = 'bg-green-50 text-green-900 border-green-200 hover:bg-green-100'
                                statusIcon = <CheckSquare className="w-3 h-3" />
                              } else if (isOverdueTask) {
                                taskColor = 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100'
                                statusIcon = <AlertCircle className="w-3 h-3" />
                              } else if (isDueToday) {
                                taskColor = 'bg-yellow-50 text-yellow-900 border-yellow-200 hover:bg-yellow-100'
                                statusIcon = <Clock className="w-3 h-3" />
                              } else if (task.status === 'in-progress') {
                                taskColor = 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                                statusIcon = <Users className="w-3 h-3" />
                              }
                              
                              return (
                                <Link 
                                  key={task.id} 
                                  to={`/Task?id=${task.id}&project=${currentProject}`}
                                  className="block"
                                >
                                  <div className={`text-xs p-2 rounded-md border-2 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${taskColor}`}>
                                    <div className="flex items-start justify-between mb-1">
                                      <div className="font-semibold truncate flex-1 pr-1">{task.name}</div>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        {statusIcon}
                                        <Badge className={getPriorityColor(task.priority)} variant="outline">
                                          {task.priority.charAt(0).toUpperCase()}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="truncate text-xs opacity-75">{task.assignee}</span>
                                      <div className="flex items-center gap-1">
                                        <Badge className={getDepartmentColor(task.department)} variant="outline">
                                          {task.department.slice(0, 3)}
                                        </Badge>
                                        <span className="text-xs font-medium">{task.progress}%</span>
                                      </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="w-full bg-white/50 rounded-full h-1 mt-1">
                                      <div 
                                        className={`h-1 rounded-full transition-all duration-300 ${
                                          task.status === 'completed' ? 'bg-green-600' :
                                          isOverdueTask ? 'bg-red-600' :
                                          isDueToday ? 'bg-yellow-600' : 'bg-blue-600'
                                        }`}
                                        style={{ width: `${task.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </Link>
                              )
                            })}
                            
                            {dayTasks.length > 2 && (
                              <div className="bg-gray-100 text-gray-600 text-xs text-center py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer">
                                <span className="font-medium">+{dayTasks.length - 2} more task{dayTasks.length - 2 > 1 ? 's' : ''}</span>
                                <div className="text-xs opacity-75 mt-1">
                                  Click to view all
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    }
                    
                    return days
                  })()}
                </div>
              </div>

              {/* Calendar Summary - Shows statistics for filtered tasks only */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="mb-3 text-center">
                  <p className="text-sm text-gray-600">
                    Calendar statistics for {filteredTasks.length} filtered task{filteredTasks.length !== 1 ? 's' : ''}
                    {(searchTerm || filterStatus !== 'all' || filterDepartment !== 'all') && (
                      <span className="text-blue-600 font-medium"> (filtered view)</span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {filteredTasks.filter(task => 
                        new Date(task.dueDate) < new Date() && task.status !== 'completed'
                      ).length}
                    </div>
                    <div className="text-sm text-gray-600">Overdue Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {filteredTasks.filter(task => 
                        new Date(task.dueDate).toDateString() === new Date().toDateString()
                      ).length}
                    </div>
                    <div className="text-sm text-gray-600">Due Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredTasks.filter(task => {
                        const dueDate = new Date(task.dueDate)
                        const today = new Date()
                        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                        return dueDate > today && dueDate <= nextWeek && task.status !== 'completed'
                      }).length}
                    </div>
                    <div className="text-sm text-gray-600">Due This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {filteredTasks.filter(task => task.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== 'all' || filterDepartment !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : `No tasks have been created for ${getProjectName(currentProject)} yet.`
                }
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create First Task
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Bulk Status Manager */}
      <BulkStatusManager
        isOpen={showBulkStatusManager}
        onOpenChange={setShowBulkStatusManager}
        selectedComponents={selectedTasks.map(taskId => {
          const task = tasks.find(t => t.id === taskId)
          return {
            id: taskId,
            name: task?.name || 'Unknown Task',
            type: 'Task',
            currentStatus: task?.status || 'N/A',
            hasExistingVersions: Math.random() > 0.5, // Simulate some tasks having versions
            existingFiles: Math.random() > 0.7 ? [
              { id: '1', name: 'task_file_1.fbx', size: '2.3 MB', type: 'model' },
              { id: '2', name: 'task_file_2.png', size: '1.1 MB', type: 'texture' }
            ] : undefined
          }
        })}
        onStatusUpdate={(componentId, newStatus, versionData) => {
          console.log('Bulk status update:', { componentId, newStatus, versionData })
          
          // Show success message
          const task = tasks.find(t => t.id === componentId)
          const message = versionData 
            ? `Task "${task?.name}" updated to "${newStatus}" with new version "${versionData.name}"`
            : `Task "${task?.name}" updated to "${newStatus}"`
          
          showToast(message)
          
          // In a real app, this would update the backend
          // For now, we'll just clear the selection after all updates are complete
        }}
        onCancel={() => {
          setShowBulkStatusManager(false)
          setSelectedTasks([])
        }}
      />
    </div>
  )
}