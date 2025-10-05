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
  Camera,
  Clock,
  Calendar,
  User,
  Film,
  Video,
  CheckCircle,
  AlertCircle,
  Hourglass,
  Target,
  Zap,
  Star
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Takes() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [takes, setTakes] = useState([
    {
      id: 'take-1',
      title: 'Take 001 - Wide Establishing',
      description: 'Hero discovers the cyber world portal',
      shot: 'Shot 001',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      takeNumber: 1,
      duration: '00:00:15',
      status: 'Approved',
      priority: 'High',
      cameraOperator: 'Alice Johnson',
      createdDate: '2025-09-10',
      lastModified: '2025-09-15',
      notes: 'Perfect lighting and composition. Director approved.',
      tags: ['approved', 'establishing', 'portal'],
      rating: 5,
    },
    {
      id: 'take-2',
      title: 'Take 002 - Close-up Reaction',
      description: 'Hero reacts to discovering the cyber world',
      shot: 'Shot 002',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      takeNumber: 2,
      duration: '00:00:08',
      status: 'Review',
      priority: 'High',
      cameraOperator: 'Bob Smith',
      createdDate: '2025-09-10',
      lastModified: '2025-09-18',
      notes: 'Good performance but needs more emotional range.',
      tags: ['review', 'close-up', 'reaction'],
      rating: 3,
    },
    {
      id: 'take-3',
      title: 'Take 015 - Chase Tracking',
      description: 'Dynamic chase through digital corridors',
      shot: 'Shot 015',
      sequence: 'Chase Sequence',
      scene: 'Scene 2',
      takeNumber: 15,
      duration: '00:00:25',
      status: 'Planning',
      priority: 'Medium',
      cameraOperator: 'Charlie Brown',
      createdDate: '2025-09-12',
      lastModified: '2025-09-20',
      notes: 'Still planning camera rig setup for smooth tracking.',
      tags: ['planning', 'chase', 'tracking'],
      rating: 0,
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingTake, setEditingTake] = useState(null)
  const [newTake, setNewTake] = useState({
    title: '',
    description: '',
    shot: '',
    sequence: '',
    scene: '',
    takeNumber: 1,
    duration: '00:00:00',
    status: 'Planning',
    priority: 'Medium',
    cameraOperator: '',
    notes: '',
    tags: [],
    rating: 0,
  })

  const handleAddTake = () => {
    if (newTake.title && newTake.description && newTake.shot) {
      const now = new Date().toISOString().split('T')[0]
      setTakes([...takes, { 
        ...newTake, 
        id: `take-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewTake({
        title: '',
        description: '',
        shot: '',
        sequence: '',
        scene: '',
        takeNumber: 1,
        duration: '00:00:00',
        status: 'Planning',
        priority: 'Medium',
        cameraOperator: '',
        notes: '',
        tags: [],
        rating: 0,
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditTake = () => {
    if (editingTake && editingTake.title && editingTake.description && editingTake.shot) {
      const now = new Date().toISOString().split('T')[0]
      setTakes(takes.map(take => take.id === editingTake.id ? { ...editingTake, lastModified: now } : take))
      setEditingTake(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteTake = (id) => {
    setTakes(takes.filter(take => take.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
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

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
          pageTitle="Takes"
          pageDescription="Manage and track all takes for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Project Takes</h2>
            <Button onClick={() => { setEditingTake(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Take
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {takes.map((take) => (
              <Card key={take.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{take.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(take.status)} text-xs`}>{take.status}</Badge>
                      <Badge className={`${getPriorityColor(take.priority)} text-xs`}>{take.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    Take {take.takeNumber} • {take.shot} • {take.sequence}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration: {take.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Operator: {take.cameraOperator}
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" /> Scene: {take.scene}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Modified: {take.lastModified}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Rating:</span>
                      <div className="flex gap-1">
                        {getRatingStars(take.rating)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {take.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {take.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {take.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingTake(take); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteTake(take.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Take Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[700px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingTake ? 'Edit Take' : 'Add New Take'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTake ? editingTake.title : newTake.title}
                  onChange={(e) => editingTake ? setEditingTake({ ...editingTake, title: e.target.value }) : setNewTake({ ...newTake, title: e.target.value })}
                  placeholder="e.g., Take 001 - Wide Establishing"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTake ? editingTake.description : newTake.description}
                  onChange={(e) => editingTake ? setEditingTake({ ...editingTake, description: e.target.value }) : setNewTake({ ...newTake, description: e.target.value })}
                  placeholder="Describe the take..."
                ></textarea>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="shot" className="block text-sm font-medium text-slate-700">Shot</label>
                  <input
                    id="shot"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.shot : newTake.shot}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, shot: e.target.value }) : setNewTake({ ...newTake, shot: e.target.value })}
                    placeholder="e.g., Shot 001"
                  />
                </div>
                <div>
                  <label htmlFor="sequence" className="block text-sm font-medium text-slate-700">Sequence</label>
                  <input
                    id="sequence"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.sequence : newTake.sequence}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, sequence: e.target.value }) : setNewTake({ ...newTake, sequence: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.scene : newTake.scene}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, scene: e.target.value }) : setNewTake({ ...newTake, scene: e.target.value })}
                    placeholder="e.g., Scene 1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="takeNumber" className="block text-sm font-medium text-slate-700">Take Number</label>
                  <input
                    id="takeNumber"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.takeNumber : newTake.takeNumber}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, takeNumber: parseInt(e.target.value) || 1 }) : setNewTake({ ...newTake, takeNumber: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (HH:MM:SS)</label>
                  <input
                    id="duration"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.duration : newTake.duration}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, duration: e.target.value }) : setNewTake({ ...newTake, duration: e.target.value })}
                    placeholder="e.g., 00:00:15"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cameraOperator" className="block text-sm font-medium text-slate-700">Camera Operator</label>
                  <input
                    id="cameraOperator"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.cameraOperator : newTake.cameraOperator}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, cameraOperator: e.target.value }) : setNewTake({ ...newTake, cameraOperator: e.target.value })}
                    placeholder="e.g., Alice Johnson"
                  />
                </div>
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-slate-700">Rating (1-5)</label>
                  <input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.rating : newTake.rating}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, rating: parseInt(e.target.value) || 0 }) : setNewTake({ ...newTake, rating: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.status : newTake.status}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, status: e.target.value }) : setNewTake({ ...newTake, status: e.target.value })}
                  >
                    <option value="Planning">Planning</option>
                    <option value="Review">Review</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingTake ? editingTake.priority : newTake.priority}
                    onChange={(e) => editingTake ? setEditingTake({ ...editingTake, priority: e.target.value }) : setNewTake({ ...newTake, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTake ? editingTake.tags.join(', ') : newTake.tags.join(', ')}
                  onChange={(e) => editingTake ? setEditingTake({ ...editingTake, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewTake({ ...newTake, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., approved, establishing, portal"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingTake ? editingTake.notes : newTake.notes}
                  onChange={(e) => editingTake ? setEditingTake({ ...editingTake, notes: e.target.value }) : setNewTake({ ...newTake, notes: e.target.value })}
                  placeholder="Any additional notes for this take..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingTake ? handleEditTake : handleAddTake}>
                  {editingTake ? 'Save Changes' : 'Add New Take'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
