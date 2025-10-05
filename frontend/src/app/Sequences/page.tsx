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
  Play,
  Pause,
  Clock,
  Calendar,
  User,
  Film,
  Video,
  CheckCircle,
  AlertCircle,
  Hourglass,
  ListTodo,
  Image,
  Layers
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Sequences() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [sequences, setSequences] = useState([
    {
      id: 'seq-1',
      title: 'Opening Sequence',
      description: 'Hero discovers the cyber world and learns about the threat',
      duration: '00:05:30',
      status: 'In Progress',
      priority: 'High',
      director: 'Sarah Chen',
      createdDate: '2025-09-10',
      lastModified: '2025-09-20',
      sceneCount: 8,
      shotCount: 45,
      takeCount: 120,
      notes: 'Focus on establishing the cyber world and character motivations.',
      tags: ['opening', 'character', 'world-building'],
    },
    {
      id: 'seq-2',
      title: 'Chase Sequence',
      description: 'High-speed pursuit through digital corridors',
      duration: '00:03:45',
      status: 'Completed',
      priority: 'High',
      director: 'Mike Johnson',
      createdDate: '2025-09-12',
      lastModified: '2025-09-18',
      sceneCount: 5,
      shotCount: 32,
      takeCount: 85,
      notes: 'All shots captured. Minor VFX touch-ups remaining.',
      tags: ['action', 'chase', 'vfx'],
    },
    {
      id: 'seq-3',
      title: 'Final Confrontation',
      description: 'Epic battle between hero and antagonist',
      duration: '00:07:20',
      status: 'Planning',
      priority: 'Medium',
      director: 'Alex Rodriguez',
      createdDate: '2025-09-15',
      lastModified: '2025-09-22',
      sceneCount: 12,
      shotCount: 0,
      takeCount: 0,
      notes: 'Still working on choreography and special effects planning.',
      tags: ['battle', 'climax', 'epic'],
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingSequence, setEditingSequence] = useState(null)
  const [newSequence, setNewSequence] = useState({
    title: '',
    description: '',
    duration: '00:00:00',
    status: 'Planning',
    priority: 'Medium',
    director: '',
    notes: '',
    tags: [],
    sceneCount: 0,
    shotCount: 0,
    takeCount: 0,
  })

  const handleAddSequence = () => {
    if (newSequence.title && newSequence.description) {
      const now = new Date().toISOString().split('T')[0]
      setSequences([...sequences, { 
        ...newSequence, 
        id: `seq-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewSequence({
        title: '',
        description: '',
        duration: '00:00:00',
        status: 'Planning',
        priority: 'Medium',
        director: '',
        notes: '',
        tags: [],
        sceneCount: 0,
        shotCount: 0,
        takeCount: 0,
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditSequence = () => {
    if (editingSequence && editingSequence.title && editingSequence.description) {
      const now = new Date().toISOString().split('T')[0]
      setSequences(sequences.map(seq => seq.id === editingSequence.id ? { ...editingSequence, lastModified: now } : seq))
      setEditingSequence(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteSequence = (id) => {
    setSequences(sequences.filter(seq => seq.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
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

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
          pageTitle="Sequences"
          pageDescription="Manage and track all sequences for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Project Sequences</h2>
            <Button onClick={() => { setEditingSequence(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Sequence
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sequences.map((sequence) => (
              <Card key={sequence.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{sequence.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(sequence.status)} text-xs`}>{sequence.status}</Badge>
                      <Badge className={`${getPriorityColor(sequence.priority)} text-xs`}>{sequence.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    {sequence.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration: {sequence.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Director: {sequence.director}
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" /> Scenes: {sequence.sceneCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Shots: {sequence.shotCount} | Takes: {sequence.takeCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Modified: {sequence.lastModified}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {sequence.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {sequence.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {sequence.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingSequence(sequence); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteSequence(sequence.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Sequence Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle>{editingSequence ? 'Edit Sequence' : 'Add New Sequence'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingSequence ? editingSequence.title : newSequence.title}
                  onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, title: e.target.value }) : setNewSequence({ ...newSequence, title: e.target.value })}
                  placeholder="e.g., Opening Sequence"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingSequence ? editingSequence.description : newSequence.description}
                  onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, description: e.target.value }) : setNewSequence({ ...newSequence, description: e.target.value })}
                  placeholder="Describe the sequence..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (HH:MM:SS)</label>
                  <input
                    id="duration"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.duration : newSequence.duration}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, duration: e.target.value }) : setNewSequence({ ...newSequence, duration: e.target.value })}
                    placeholder="e.g., 00:05:30"
                  />
                </div>
                <div>
                  <label htmlFor="director" className="block text-sm font-medium text-slate-700">Director</label>
                  <input
                    id="director"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.director : newSequence.director}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, director: e.target.value }) : setNewSequence({ ...newSequence, director: e.target.value })}
                    placeholder="e.g., Sarah Chen"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.status : newSequence.status}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, status: e.target.value }) : setNewSequence({ ...newSequence, status: e.target.value })}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.priority : newSequence.priority}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, priority: e.target.value }) : setNewSequence({ ...newSequence, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="sceneCount" className="block text-sm font-medium text-slate-700">Scene Count</label>
                  <input
                    id="sceneCount"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.sceneCount : newSequence.sceneCount}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, sceneCount: parseInt(e.target.value) || 0 }) : setNewSequence({ ...newSequence, sceneCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label htmlFor="shotCount" className="block text-sm font-medium text-slate-700">Shot Count</label>
                  <input
                    id="shotCount"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.shotCount : newSequence.shotCount}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, shotCount: parseInt(e.target.value) || 0 }) : setNewSequence({ ...newSequence, shotCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label htmlFor="takeCount" className="block text-sm font-medium text-slate-700">Take Count</label>
                  <input
                    id="takeCount"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingSequence ? editingSequence.takeCount : newSequence.takeCount}
                    onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, takeCount: parseInt(e.target.value) || 0 }) : setNewSequence({ ...newSequence, takeCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingSequence ? editingSequence.tags.join(', ') : newSequence.tags.join(', ')}
                  onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewSequence({ ...newSequence, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., opening, character, world-building"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingSequence ? editingSequence.notes : newSequence.notes}
                  onChange={(e) => editingSequence ? setEditingSequence({ ...editingSequence, notes: e.target.value }) : setNewSequence({ ...newSequence, notes: e.target.value })}
                  placeholder="Any additional notes for this sequence..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingSequence ? handleEditSequence : handleAddSequence}>
                  {editingSequence ? 'Save Changes' : 'Add New Sequence'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
