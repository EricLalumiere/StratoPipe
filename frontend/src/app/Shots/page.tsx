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
  Image,
  Layers,
  Target,
  Zap
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Shots() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [shots, setShots] = useState([
    {
      id: 'shot-1',
      title: 'Wide Establishing Shot',
      description: 'Hero discovers the cyber world portal',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      shotNumber: '001',
      duration: '00:00:15',
      status: 'Completed',
      priority: 'High',
      cameraOperator: 'Alice Johnson',
      createdDate: '2025-09-10',
      lastModified: '2025-09-15',
      takeCount: 8,
      cameraAngle: 'Wide',
      cameraMovement: 'Static',
      lens: '24mm',
      notes: 'Perfect lighting achieved on take 6.',
      tags: ['establishing', 'wide', 'portal'],
    },
    {
      id: 'shot-2',
      title: 'Close-up Reaction',
      description: 'Hero reacts to discovering the cyber world',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      shotNumber: '002',
      duration: '00:00:08',
      status: 'In Progress',
      priority: 'High',
      cameraOperator: 'Bob Smith',
      createdDate: '2025-09-10',
      lastModified: '2025-09-18',
      takeCount: 12,
      cameraAngle: 'Close-up',
      cameraMovement: 'Static',
      lens: '85mm',
      notes: 'Need to capture more emotional range.',
      tags: ['close-up', 'reaction', 'emotional'],
    },
    {
      id: 'shot-3',
      title: 'Chase Tracking Shot',
      description: 'Dynamic chase through digital corridors',
      sequence: 'Chase Sequence',
      scene: 'Scene 2',
      shotNumber: '015',
      duration: '00:00:25',
      status: 'Planning',
      priority: 'Medium',
      cameraOperator: 'Charlie Brown',
      createdDate: '2025-09-12',
      lastModified: '2025-09-20',
      takeCount: 0,
      cameraAngle: 'Medium',
      cameraMovement: 'Tracking',
      lens: '50mm',
      notes: 'Still planning camera rig setup for smooth tracking.',
      tags: ['chase', 'tracking', 'dynamic'],
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingShot, setEditingShot] = useState(null)
  const [newShot, setNewShot] = useState({
    title: '',
    description: '',
    sequence: '',
    scene: '',
    shotNumber: '',
    duration: '00:00:00',
    status: 'Planning',
    priority: 'Medium',
    cameraOperator: '',
    takeCount: 0,
    cameraAngle: 'Medium',
    cameraMovement: 'Static',
    lens: '50mm',
    notes: '',
    tags: [],
  })

  const handleAddShot = () => {
    if (newShot.title && newShot.description && newShot.shotNumber) {
      const now = new Date().toISOString().split('T')[0]
      setShots([...shots, { 
        ...newShot, 
        id: `shot-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewShot({
        title: '',
        description: '',
        sequence: '',
        scene: '',
        shotNumber: '',
        duration: '00:00:00',
        status: 'Planning',
        priority: 'Medium',
        cameraOperator: '',
        takeCount: 0,
        cameraAngle: 'Medium',
        cameraMovement: 'Static',
        lens: '50mm',
        notes: '',
        tags: [],
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditShot = () => {
    if (editingShot && editingShot.title && editingShot.description && editingShot.shotNumber) {
      const now = new Date().toISOString().split('T')[0]
      setShots(shots.map(shot => shot.id === editingShot.id ? { ...editingShot, lastModified: now } : shot))
      setEditingShot(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteShot = (id) => {
    setShots(shots.filter(shot => shot.id !== id))
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
          pageTitle="Shots"
          pageDescription="Manage and track all shots for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Project Shots</h2>
            <Button onClick={() => { setEditingShot(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Shot
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shots.map((shot) => (
              <Card key={shot.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{shot.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(shot.status)} text-xs`}>{shot.status}</Badge>
                      <Badge className={`${getPriorityColor(shot.priority)} text-xs`}>{shot.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    Shot {shot.shotNumber} • {shot.sequence} • {shot.scene}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration: {shot.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Operator: {shot.cameraOperator}
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" /> Angle: {shot.cameraAngle} • Movement: {shot.cameraMovement}
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" /> Lens: {shot.lens} • Takes: {shot.takeCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Modified: {shot.lastModified}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {shot.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {shot.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {shot.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingShot(shot); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteShot(shot.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Shot Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[700px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingShot ? 'Edit Shot' : 'Add New Shot'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingShot ? editingShot.title : newShot.title}
                  onChange={(e) => editingShot ? setEditingShot({ ...editingShot, title: e.target.value }) : setNewShot({ ...newShot, title: e.target.value })}
                  placeholder="e.g., Wide Establishing Shot"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingShot ? editingShot.description : newShot.description}
                  onChange={(e) => editingShot ? setEditingShot({ ...editingShot, description: e.target.value }) : setNewShot({ ...newShot, description: e.target.value })}
                  placeholder="Describe the shot..."
                ></textarea>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="shotNumber" className="block text-sm font-medium text-slate-700">Shot Number</label>
                  <input
                    id="shotNumber"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.shotNumber : newShot.shotNumber}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, shotNumber: e.target.value }) : setNewShot({ ...newShot, shotNumber: e.target.value })}
                    placeholder="e.g., 001"
                  />
                </div>
                <div>
                  <label htmlFor="sequence" className="block text-sm font-medium text-slate-700">Sequence</label>
                  <input
                    id="sequence"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.sequence : newShot.sequence}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, sequence: e.target.value }) : setNewShot({ ...newShot, sequence: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.scene : newShot.scene}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, scene: e.target.value }) : setNewShot({ ...newShot, scene: e.target.value })}
                    placeholder="e.g., Scene 1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (HH:MM:SS)</label>
                  <input
                    id="duration"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.duration : newShot.duration}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, duration: e.target.value }) : setNewShot({ ...newShot, duration: e.target.value })}
                    placeholder="e.g., 00:00:15"
                  />
                </div>
                <div>
                  <label htmlFor="cameraOperator" className="block text-sm font-medium text-slate-700">Camera Operator</label>
                  <input
                    id="cameraOperator"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.cameraOperator : newShot.cameraOperator}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, cameraOperator: e.target.value }) : setNewShot({ ...newShot, cameraOperator: e.target.value })}
                    placeholder="e.g., Alice Johnson"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="cameraAngle" className="block text-sm font-medium text-slate-700">Camera Angle</label>
                  <select
                    id="cameraAngle"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.cameraAngle : newShot.cameraAngle}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, cameraAngle: e.target.value }) : setNewShot({ ...newShot, cameraAngle: e.target.value })}
                  >
                    <option value="Wide">Wide</option>
                    <option value="Medium">Medium</option>
                    <option value="Close-up">Close-up</option>
                    <option value="Extreme Close-up">Extreme Close-up</option>
                    <option value="Over-the-shoulder">Over-the-shoulder</option>
                    <option value="Low Angle">Low Angle</option>
                    <option value="High Angle">High Angle</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cameraMovement" className="block text-sm font-medium text-slate-700">Camera Movement</label>
                  <select
                    id="cameraMovement"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.cameraMovement : newShot.cameraMovement}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, cameraMovement: e.target.value }) : setNewShot({ ...newShot, cameraMovement: e.target.value })}
                  >
                    <option value="Static">Static</option>
                    <option value="Pan">Pan</option>
                    <option value="Tilt">Tilt</option>
                    <option value="Tracking">Tracking</option>
                    <option value="Dolly">Dolly</option>
                    <option value="Crane">Crane</option>
                    <option value="Handheld">Handheld</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="lens" className="block text-sm font-medium text-slate-700">Lens</label>
                  <select
                    id="lens"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.lens : newShot.lens}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, lens: e.target.value }) : setNewShot({ ...newShot, lens: e.target.value })}
                  >
                    <option value="14mm">14mm</option>
                    <option value="24mm">24mm</option>
                    <option value="35mm">35mm</option>
                    <option value="50mm">50mm</option>
                    <option value="85mm">85mm</option>
                    <option value="135mm">135mm</option>
                    <option value="200mm">200mm</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingShot ? editingShot.status : newShot.status}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, status: e.target.value }) : setNewShot({ ...newShot, status: e.target.value })}
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
                    value={editingShot ? editingShot.priority : newShot.priority}
                    onChange={(e) => editingShot ? setEditingShot({ ...editingShot, priority: e.target.value }) : setNewShot({ ...newShot, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="takeCount" className="block text-sm font-medium text-slate-700">Take Count</label>
                <input
                  id="takeCount"
                  type="number"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingShot ? editingShot.takeCount : newShot.takeCount}
                  onChange={(e) => editingShot ? setEditingShot({ ...editingShot, takeCount: parseInt(e.target.value) || 0 }) : setNewShot({ ...newShot, takeCount: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingShot ? editingShot.tags.join(', ') : newShot.tags.join(', ')}
                  onChange={(e) => editingShot ? setEditingShot({ ...editingShot, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewShot({ ...newShot, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., establishing, wide, portal"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingShot ? editingShot.notes : newShot.notes}
                  onChange={(e) => editingShot ? setEditingShot({ ...editingShot, notes: e.target.value }) : setNewShot({ ...newShot, notes: e.target.value })}
                  placeholder="Any additional notes for this shot..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingShot ? handleEditShot : handleAddShot}>
                  {editingShot ? 'Save Changes' : 'Add New Shot'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
