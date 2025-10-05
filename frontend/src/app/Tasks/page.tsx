'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus,
  Edit,
  Trash2,
  CheckSquare,
  Clock,
  Calendar,
  User,
  Film,
  CheckCircle,
  AlertCircle,
  Hourglass,
  Flag,
  Tag,
  FileText,
  Star
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Tasks() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Complete Portal Scene VFX',
      description: 'Finish VFX work for the portal discovery scene',
      category: 'VFX',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Sarah Chen',
      createdDate: '2025-09-10',
      dueDate: '2025-09-25',
      lastModified: '2025-09-15',
      progress: 75,
      notes: 'Working on particle effects and lighting integration.',
      tags: ['vfx', 'portal', 'particles'],
    },
    {
      id: 'task-2',
      title: 'Review Chase Sequence Edit',
      description: 'Review and approve the chase sequence edit',
      category: 'Post-Production',
      sequence: 'Chase Sequence',
      scene: 'Scene 2',
      status: 'Pending',
      priority: 'High',
      assignee: 'Mike Johnson',
      createdDate: '2025-09-12',
      dueDate: '2025-09-20',
      lastModified: '2025-09-18',
      progress: 0,
      notes: 'Waiting for final VFX shots to be delivered.',
      tags: ['edit', 'review', 'chase'],
    },
    {
      id: 'task-3',
      title: 'Prepare Final Battle Props',
      description: 'Prepare and test all props for the final battle scene',
      category: 'Props',
      sequence: 'Final Confrontation',
      scene: 'Scene 3',
      status: 'Completed',
      priority: 'Medium',
      assignee: 'Alex Rodriguez',
      createdDate: '2025-09-15',
      dueDate: '2025-09-22',
      lastModified: '2025-09-20',
      progress: 100,
      notes: 'All props tested and ready for shooting.',
      tags: ['props', 'battle', 'preparation'],
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'VFX',
    sequence: '',
    scene: '',
    status: 'Pending',
    priority: 'Medium',
    assignee: '',
    dueDate: '',
    progress: 0,
    notes: '',
    tags: [],
  })

  const handleAddTask = () => {
    if (newTask.title && newTask.description) {
      const now = new Date().toISOString().split('T')[0]
      setTasks([...tasks, { 
        ...newTask, 
        id: `task-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewTask({
        title: '',
        description: '',
        category: 'VFX',
        sequence: '',
        scene: '',
        status: 'Pending',
        priority: 'Medium',
        assignee: '',
        dueDate: '',
        progress: 0,
        notes: '',
        tags: [],
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditTask = () => {
    if (editingTask && editingTask.title && editingTask.description) {
      const now = new Date().toISOString().split('T')[0]
      setTasks(tasks.map(task => task.id === editingTask.id ? { ...editingTask, lastModified: now } : task))
      setEditingTask(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
          pageTitle="Tasks"
          pageDescription="Manage and track all project tasks."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Project Tasks</h2>
            <Button onClick={() => { setEditingTask(null); setNewTask({ ...newTask, dueDate: new Date().toISOString().split('T')[0] }); setShowAddEditDialog(true) }} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Task
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{task.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(task.status)} text-xs`}>{task.status}</Badge>
                      <Badge className={`${getPriorityColor(task.priority)} text-xs`}>{task.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    {task.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" /> Category: {task.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" /> Sequence: {task.sequence}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Assignee: {task.assignee}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Due: {task.dueDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Modified: {task.lastModified}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress:</span>
                        <span className="text-sm text-slate-600">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(task.progress)}`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {task.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {task.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingTask(task); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteTask(task.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Task Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[700px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTask ? editingTask.title : newTask.title}
                  onChange={(e) => editingTask ? setEditingTask({ ...editingTask, title: e.target.value }) : setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g., Complete Portal Scene VFX"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTask ? editingTask.description : newTask.description}
                  onChange={(e) => editingTask ? setEditingTask({ ...editingTask, description: e.target.value }) : setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Describe the task..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.category : newTask.category}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, category: e.target.value }) : setNewTask({ ...newTask, category: e.target.value })}
                  >
                    <option value="VFX">VFX</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Props">Props</option>
                    <option value="Costume">Costume</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Camera">Camera</option>
                    <option value="Sound">Sound</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-slate-700">Assignee</label>
                  <input
                    id="assignee"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.assignee : newTask.assignee}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, assignee: e.target.value }) : setNewTask({ ...newTask, assignee: e.target.value })}
                    placeholder="e.g., Sarah Chen"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sequence" className="block text-sm font-medium text-slate-700">Sequence</label>
                  <input
                    id="sequence"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.sequence : newTask.sequence}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, sequence: e.target.value }) : setNewTask({ ...newTask, sequence: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.scene : newTask.scene}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, scene: e.target.value }) : setNewTask({ ...newTask, scene: e.target.value })}
                    placeholder="e.g., Scene 1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.status : newTask.status}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, status: e.target.value }) : setNewTask({ ...newTask, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.priority : newTask.priority}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, priority: e.target.value }) : setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
                  <input
                    id="dueDate"
                    type="date"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.dueDate : newTask.dueDate}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, dueDate: e.target.value }) : setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="progress" className="block text-sm font-medium text-slate-700">Progress (%)</label>
                  <input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTask ? editingTask.progress : newTask.progress}
                    onChange={(e) => editingTask ? setEditingTask({ ...editingTask, progress: parseInt(e.target.value) || 0 }) : setNewTask({ ...newTask, progress: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTask ? editingTask.tags.join(', ') : newTask.tags.join(', ')}
                  onChange={(e) => editingTask ? setEditingTask({ ...editingTask, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewTask({ ...newTask, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., vfx, portal, particles"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTask ? editingTask.notes : newTask.notes}
                  onChange={(e) => editingTask ? setEditingTask({ ...editingTask, notes: e.target.value }) : setNewTask({ ...newTask, notes: e.target.value })}
                  placeholder="Any additional notes for this task..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingTask ? handleEditTask : handleAddTask}>
                  {editingTask ? 'Save Changes' : 'Add New Task'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
