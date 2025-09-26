'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { 
  Calendar,
  Filter,
  Users,
  Package,
  Building,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Components from '@/components'

export default function Schedule() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [zoomLevel, setZoomLevel] = useState('weeks') // 'days', 'weeks', 'months'
  const [timelineDate, setTimelineDate] = useState(new Date('2024-04-15'))

  // Get current project from URL parameters
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0]

  // Gantt chart data
  const ganttTasks = [
    {
      id: 1,
      name: "Character Design - Zara",
      component: "Asset",
      assignee: "Luna Martinez",
      department: "Concept Art",
      startDate: "2024-04-15",
      endDate: "2024-04-22",
      progress: 75,
      status: "In Progress"
    },
    {
      id: 2,
      name: "Environment Modeling",
      component: "Asset",
      assignee: "David Kim",
      department: "Modeling",
      startDate: "2024-04-18",
      endDate: "2024-04-30",
      progress: 30,
      status: "In Progress"
    },
    {
      id: 3,
      name: "Opening Sequence Storyboard",
      component: "Storyboard",
      assignee: "Alex Chen",
      department: "Concept Art",
      startDate: "2024-04-10",
      endDate: "2024-04-20",
      progress: 100,
      status: "Completed"
    },
    {
      id: 4,
      name: "Character Rigging",
      component: "Asset",
      assignee: "Sarah Chen",
      department: "Rigging",
      startDate: "2024-04-25",
      endDate: "2024-05-05",
      progress: 0,
      status: "Not Started"
    },
    {
      id: 5,
      name: "Scene Assembly",
      component: "Scene",
      assignee: "Mike Rodriguez",
      department: "Layout",
      startDate: "2024-04-20",
      endDate: "2024-04-28",
      progress: 45,
      status: "In Progress"
    },
    {
      id: 6,
      name: "Motion Capture Cleanup",
      component: "Take",
      assignee: "Emma Davis",
      department: "Animation",
      startDate: "2024-04-22",
      endDate: "2024-05-01",
      progress: 20,
      status: "In Progress"
    }
  ]

  // Shooting days data
  const shootingDays = [
    { date: "2024-04-20", name: "Day 1 - Character Scenes", status: "Completed" },
    { date: "2024-04-22", name: "Day 2 - Action Sequences", status: "Completed" },
    { date: "2024-04-25", name: "Day 3 - Environment Shots", status: "Scheduled" },
    { date: "2024-04-28", name: "Day 4 - Close-ups", status: "Scheduled" }
  ]

  // Filter tasks using useMemo to prevent initialization issues
  const filteredTasks = useMemo(() => {
    return ganttTasks.filter(task => {
      // Apply status filter
      const matchesStatusFilter = filterStatus === 'all' || task.status === filterStatus
      // Apply department filter
      const matchesDepartmentFilter = filterDepartment === 'all' || task.department === filterDepartment
      return matchesStatusFilter && matchesDepartmentFilter
    })
  }, [filterStatus, filterDepartment])

  // Progress data for charts - dynamically calculated from filtered tasks
  const statusData = useMemo(() => {
    const total = filteredTasks.length
    if (total === 0) return []
    
    const completed = filteredTasks.filter(t => t.status === 'Completed').length
    const inProgress = filteredTasks.filter(t => t.status === 'In Progress').length
    const notStarted = filteredTasks.filter(t => t.status === 'Not Started').length
    const onHold = filteredTasks.filter(t => t.status === 'On Hold').length
    
    return [
      { name: 'Completed', value: Math.round((completed / total) * 100), color: '#10b981' },
      { name: 'In Progress', value: Math.round((inProgress / total) * 100), color: '#3b82f6' },
      { name: 'Not Started', value: Math.round((notStarted / total) * 100), color: '#f59e0b' },
      { name: 'On Hold', value: Math.round((onHold / total) * 100), color: '#ef4444' }
    ].filter(item => item.value > 0)
  }, [filteredTasks])

  // Department progress - dynamically calculated from filtered tasks
  const departmentProgress = useMemo(() => {
    const deptMap = new Map()
    
    filteredTasks.forEach(task => {
      if (!deptMap.has(task.department)) {
        deptMap.set(task.department, { completed: 0, total: 0 })
      }
      const dept = deptMap.get(task.department)
      dept.total += 1
      if (task.status === 'Completed') {
        dept.completed += 1
      }
    })
    
    return Array.from(deptMap.entries()).map(([department, data]) => ({
      department,
      completed: data.completed,
      total: data.total,
      remaining: data.total - data.completed
    }))
  }, [filteredTasks])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'N/A': return 'bg-gray-100 text-gray-800'
      case 'Ready to Start': return 'bg-blue-100 text-blue-800'
      case 'Work in Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Kickback': return 'bg-red-100 text-red-800'
      case 'Pending Review': return 'bg-orange-100 text-orange-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Published': return 'bg-emerald-100 text-emerald-800'
      // Legacy status support
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Not Started': return 'bg-blue-100 text-blue-800'
      case 'On Hold': return 'bg-red-100 text-red-800'
      case 'Scheduled': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500'
    if (progress >= 50) return 'bg-blue-500'
    if (progress > 0) return 'bg-yellow-500'
    return 'bg-gray-300'
  }

  // Generate timeline dates based on zoom level using useMemo
  const timelineDates = useMemo(() => {
    const baseDate = new Date(timelineDate)
    const dates = []
    
    if (zoomLevel === 'days') {
      for (let i = 0; i < 20; i++) {
        const date = new Date(baseDate)
        date.setDate(baseDate.getDate() + i)
        dates.push({
          label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          sublabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
          value: date
        })
      }
    } else if (zoomLevel === 'weeks') {
      for (let i = 0; i < 8; i++) {
        const date = new Date(baseDate)
        date.setDate(baseDate.getDate() + (i * 3))
        dates.push({
          label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          sublabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
          value: date
        })
      }
    } else if (zoomLevel === 'months') {
      for (let i = 0; i < 6; i++) {
        const date = new Date(baseDate)
        date.setMonth(baseDate.getMonth() + i)
        date.setDate(1) // Set to first day of month
        dates.push({
          label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          sublabel: date.toLocaleDateString('en-US', { month: 'short' }),
          value: date
        })
      }
    }
    
    return dates
  }, [zoomLevel, timelineDate])

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Components.Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Project Header */}
          <Components.ProjectHeader
            projectName={currentProject.name}
            title="Project Schedule"
            description="Gantt chart, task tracking, and progress visualization"
          >
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Export Schedule
            </Button>
            <Link href="/TaskCreation">
              <Button size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </Link>
          </Components.ProjectHeader>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Filters */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Filter className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900">Filters</CardTitle>
                      <CardDescription className="text-xs">Filter tasks by status and department, adjust timeline view</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-1 block">Filter by Status</label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                          <SelectItem value="Ready to Start">Ready to Start</SelectItem>
                          <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                          <SelectItem value="Kickback">Kickback</SelectItem>
                          <SelectItem value="Pending Review">Pending Review</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-1 block">Filter by Department</label>
                      <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="Concept Art">Concept Art</SelectItem>
                          <SelectItem value="Modeling">Modeling</SelectItem>
                          <SelectItem value="Rigging">Rigging</SelectItem>
                          <SelectItem value="Layout">Layout</SelectItem>
                          <SelectItem value="Animation">Animation</SelectItem>
                          <SelectItem value="Lighting">Lighting</SelectItem>
                          <SelectItem value="Compositing">Compositing</SelectItem>
                          <SelectItem value="VFX">VFX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-1 block">Timeline View</label>
                      <Select value={zoomLevel} onValueChange={setZoomLevel}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days View</SelectItem>
                          <SelectItem value="weeks">Weeks View</SelectItem>
                          <SelectItem value="months">Months View</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gantt Chart */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Gantt Chart</CardTitle>
                      <CardDescription>Task timeline and progress visualization</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newDate = new Date(timelineDate)
                          if (zoomLevel === 'days') {
                            newDate.setDate(newDate.getDate() - 7)
                          } else if (zoomLevel === 'weeks') {
                            newDate.setDate(newDate.getDate() - 21)
                          } else {
                            newDate.setMonth(newDate.getMonth() - 3)
                          }
                          setTimelineDate(newDate)
                        }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Components.DatePicker
                        value={timelineDate}
                        onChange={setTimelineDate}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newDate = new Date(timelineDate)
                          if (zoomLevel === 'days') {
                            newDate.setDate(newDate.getDate() + 7)
                          } else if (zoomLevel === 'weeks') {
                            newDate.setDate(newDate.getDate() + 21)
                          } else {
                            newDate.setMonth(newDate.getMonth() + 3)
                          }
                          setTimelineDate(newDate)
                        }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTimelineDate(new Date('2024-04-15'))}
                      >
                        Today
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    {/* Timeline Header */}
                    <div className="min-w-[1200px]">
                      <div className="grid grid-cols-12 gap-0 mb-1">
                        <div className="col-span-4 px-1 py-0.5 bg-slate-100 border-r border-slate-200">
                          <div className="text-xs font-semibold text-slate-900">Task Name</div>
                        </div>
                        <div className="col-span-8 grid grid-cols-8 gap-0">
                          {timelineDates.slice(0, 8).map((date, index) => (
                            <div key={index} className="px-1 py-0.5 bg-slate-100 border-r border-slate-200 text-center">
                              <div className="text-xs font-medium text-slate-700">{date.label}</div>
                              <div className="text-xs text-slate-500">{date.sublabel}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gantt Rows - Scrollable Container */}
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="max-h-96 overflow-y-auto">
                          {filteredTasks.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                              <Filter className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                              <h3 className="text-lg font-medium text-slate-700 mb-2">No tasks match your filters</h3>
                              <p className="text-sm">Try adjusting your filter criteria to see more tasks.</p>
                            </div>
                          ) : (
                            <div className="space-y-0">
                              {filteredTasks.map((task, taskIndex) => {
                                // Calculate position and width based on dates and zoom level
                                const startDate = new Date(task.startDate)
                                const endDate = new Date(task.endDate)
                                const baseDate = new Date(timelineDate)
                                
                                // Calculate total timeline span based on zoom level
                                let totalTimeSpan = 0
                                let timeUnit = 'days'
                                
                                if (zoomLevel === 'days') {
                                  totalTimeSpan = 20 // 20 days
                                  timeUnit = 'days'
                                } else if (zoomLevel === 'weeks') {
                                  totalTimeSpan = 24 // 8 periods of 3 days each = 24 days
                                  timeUnit = 'days'
                                } else if (zoomLevel === 'months') {
                                  totalTimeSpan = 6 * 30 // 6 months * 30 days = 180 days
                                  timeUnit = 'days'
                                }
                                
                                const startOffset = Math.max(0, (startDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
                                const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                                
                                const leftPercent = (startOffset / totalTimeSpan) * 100
                                const widthPercent = (duration / totalTimeSpan) * 100

                                return (
                                  <div key={task.id} className={`grid grid-cols-12 gap-0 ${taskIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-200 last:border-b-0`}>
                                    {/* Task Info Column - Reduced to 2 lines */}
                                    <div className="col-span-4 px-1 py-1 border-r border-slate-200">
                                      <div className="space-y-0.5">
                                        {/* Line 1: Task name + Status */}
                                        <div className="flex items-center justify-between">
                                          <Link href="/Task" className="text-xs font-medium text-slate-900 hover:text-blue-600 truncate flex-1 mr-2">
                                            {task.name}
                                          </Link>
                                          <Badge className={`${getStatusColor(task.status)} text-xs px-1 py-0 h-4 flex-shrink-0`}>
                                            {task.status}
                                          </Badge>
                                        </div>
                                        {/* Line 2: Component + Assignee + Department */}
                                        <div className="flex items-center gap-1 text-xs">
                                          <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                                            {task.component}
                                          </Badge>
                                          <span className="text-slate-400">•</span>
                                          <Link href="/User" className="text-blue-600 hover:text-blue-700 truncate">
                                            {task.assignee}
                                          </Link>
                                          <span className="text-slate-400">•</span>
                                          <span className="text-slate-600 truncate">{task.department}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Timeline Column */}
                                    <div className="col-span-8 relative px-1 py-1 min-h-[32px]">
                                      {/* Grid lines */}
                                      <div className="absolute inset-0 grid grid-cols-8 gap-0">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                          <div key={i} className="border-r border-slate-100 last:border-r-0"></div>
                                        ))}
                                      </div>

                                      {/* Task Bar */}
                                      <div 
                                        className="absolute top-1/2 transform -translate-y-1/2 h-6 rounded-md shadow-sm flex items-center justify-center px-2"
                                        style={{
                                          left: `${leftPercent}%`,
                                          width: `${Math.max(widthPercent, zoomLevel === 'months' ? 2 : zoomLevel === 'weeks' ? 8 : 12)}%`,
                                          backgroundColor: task.status === 'Completed' ? '#10b981' : 
                                                         task.status === 'In Progress' ? '#3b82f6' : 
                                                         task.status === 'Not Started' ? '#f59e0b' : '#ef4444'
                                        }}
                                      >
                                        <span className="text-xs font-medium text-white truncate">
                                          {task.progress}%
                                        </span>
                                        
                                        {/* Progress overlay */}
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-white/20 rounded-md"
                                          style={{ width: `${task.progress}%` }}
                                        ></div>
                                      </div>

                                      {/* Task dates */}
                                      <div className="absolute -bottom-4 left-0 text-xs text-slate-500">
                                        {new Date(task.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                      </div>
                                      <div className="absolute -bottom-4 right-0 text-xs text-slate-500">
                                        {new Date(task.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-6 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span className="text-sm text-slate-700">Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span className="text-sm text-slate-700">In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                          <span className="text-sm text-slate-700">Not Started</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-red-500 rounded"></div>
                          <span className="text-sm text-slate-700">On Hold</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shooting Days Timeline */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <Camera className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-900">Shooting Days</CardTitle>
                      <CardDescription>Motion capture and filming schedule</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shootingDays.map((day, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-900">{day.date}</div>
                          <div className="text-xs text-slate-600">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <Link href="/ShootingDay" className="font-medium text-slate-900 hover:text-blue-600">
                            {day.name}
                          </Link>
                        </div>
                        <Badge className={getStatusColor(day.status)}>
                          {day.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Department Progress */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900">Department Progress</CardTitle>
                  <CardDescription>Task completion by department</CardDescription>
                </CardHeader>
                <CardContent>
                  {departmentProgress.length > 0 ? (
                    <ChartContainer
                      config={{
                        completed: { label: "Completed", color: "#10b981" },
                        remaining: { label: "Remaining", color: "#e5e7eb" }
                      }}
                      className="h-64"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentProgress}>
                          <XAxis dataKey="department" />
                          <YAxis />
                          <ChartTooltip content={ChartTooltipContent} />
                          <Bar dataKey="completed" fill="#10b981" />
                          <Bar dataKey="remaining" fill="#e5e7eb" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-slate-500">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <p>No tasks match the current filter</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Stats and Charts */}
            <div className="space-y-6">
              {/* Project Statistics */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Project Statistics</CardTitle>
                  <CardDescription>Overview and metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Tasks</span>
                      <span className="font-semibold text-slate-900">{filteredTasks.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Completed</span>
                      <span className="font-semibold text-green-600">
                        {filteredTasks.filter(t => t.status === 'Completed').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">In Progress</span>
                      <span className="font-semibold text-blue-600">
                        {filteredTasks.filter(t => t.status === 'In Progress').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Not Started</span>
                      <span className="font-semibold text-orange-600">
                        {filteredTasks.filter(t => t.status === 'Not Started').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Shooting Days</span>
                      <span className="font-semibold text-slate-900">{shootingDays.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Task Status Distribution */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Task Status</CardTitle>
                  <CardDescription>Distribution of task statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  {statusData.length > 0 ? (
                    <>
                      <ChartContainer
                        config={{
                          completed: { label: "Completed", color: "#10b981" },
                          inProgress: { label: "In Progress", color: "#3b82f6" },
                          notStarted: { label: "Not Started", color: "#f59e0b" },
                          onHold: { label: "On Hold", color: "#ef4444" }
                        }}
                        className="h-48"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              dataKey="value"
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={ChartTooltipContent} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                      
                      <div className="mt-4 space-y-2">
                        {statusData.map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-slate-700">{item.name}</span>
                            </div>
                            <span className="font-medium text-slate-900">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-slate-500">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <p>No tasks match the current filter</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/TaskCreation">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Create New Task
                    </Button>
                  </Link>
                  <Link href="/ShootingDays">
                    <Button variant="outline" className="w-full justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      View Shooting Days
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Export Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-red-900">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-800">Character Design</div>
                      <div className="text-xs text-red-600">Due: April 22, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-800">Scene Assembly</div>
                      <div className="text-xs text-red-600">Due: April 28, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-800">Motion Capture</div>
                      <div className="text-xs text-red-600">Due: May 1, 2024</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Completions */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-green-900">Recent Completions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-800">Storyboard Approval</div>
                      <div className="text-xs text-green-600">Completed: April 20, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-800">Concept Art Review</div>
                      <div className="text-xs text-green-600">Completed: April 18, 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-green-800">Asset Planning</div>
                      <div className="text-xs text-green-600">Completed: April 15, 2024</div>
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