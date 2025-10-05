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
  Download,
  Upload,
  Clock,
  Calendar,
  User,
  Film,
  Video,
  CheckCircle,
  AlertCircle,
  Hourglass,
  Scissors,
  FileText,
  Layers
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function EDLs() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [edls, setEdls] = useState([
    {
      id: 'edl-1',
      title: 'Opening Sequence EDL',
      description: 'Edit Decision List for the opening sequence',
      sequence: 'Opening Sequence',
      editor: 'Sarah Chen',
      createdDate: '2025-09-10',
      lastModified: '2025-09-20',
      status: 'In Progress',
      priority: 'High',
      duration: '00:05:30',
      clipCount: 45,
      version: 'v1.2',
      notes: 'Working on pacing adjustments for the portal discovery scene.',
      tags: ['opening', 'sequence', 'edit'],
    },
    {
      id: 'edl-2',
      title: 'Chase Sequence EDL',
      description: 'Edit Decision List for the chase sequence',
      sequence: 'Chase Sequence',
      editor: 'Mike Johnson',
      createdDate: '2025-09-12',
      lastModified: '2025-09-18',
      status: 'Completed',
      priority: 'High',
      duration: '00:03:45',
      clipCount: 32,
      version: 'v2.0',
      notes: 'Final version approved by director. Ready for color grading.',
      tags: ['chase', 'action', 'final'],
    },
    {
      id: 'edl-3',
      title: 'Final Confrontation EDL',
      description: 'Edit Decision List for the final battle',
      sequence: 'Final Confrontation',
      editor: 'Alex Rodriguez',
      createdDate: '2025-09-15',
      lastModified: '2025-09-22',
      status: 'Planning',
      priority: 'Medium',
      duration: '00:07:20',
      clipCount: 0,
      version: 'v0.1',
      notes: 'Still waiting for VFX shots to be delivered.',
      tags: ['battle', 'climax', 'vfx'],
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingEdl, setEditingEdl] = useState(null)
  const [newEdl, setNewEdl] = useState({
    title: '',
    description: '',
    sequence: '',
    editor: '',
    status: 'Planning',
    priority: 'Medium',
    duration: '00:00:00',
    clipCount: 0,
    version: 'v1.0',
    notes: '',
    tags: [],
  })

  const handleAddEdl = () => {
    if (newEdl.title && newEdl.description) {
      const now = new Date().toISOString().split('T')[0]
      setEdls([...edls, { 
        ...newEdl, 
        id: `edl-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewEdl({
        title: '',
        description: '',
        sequence: '',
        editor: '',
        status: 'Planning',
        priority: 'Medium',
        duration: '00:00:00',
        clipCount: 0,
        version: 'v1.0',
        notes: '',
        tags: [],
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditEdl = () => {
    if (editingEdl && editingEdl.title && editingEdl.description) {
      const now = new Date().toISOString().split('T')[0]
      setEdls(edls.map(edl => edl.id === editingEdl.id ? { ...editingEdl, lastModified: now } : edl))
      setEditingEdl(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteEdl = (id) => {
    setEdls(edls.filter(edl => edl.id !== id))
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
          pageTitle="EDLs"
          pageDescription="Manage Edit Decision Lists for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Edit Decision Lists</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Import EDL
              </Button>
              <Button onClick={() => { setEditingEdl(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New EDL
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {edls.map((edl) => (
              <Card key={edl.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{edl.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(edl.status)} text-xs`}>{edl.status}</Badge>
                      <Badge className={`${getPriorityColor(edl.priority)} text-xs`}>{edl.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    {edl.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" /> Sequence: {edl.sequence}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Editor: {edl.editor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration: {edl.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4" /> Clips: {edl.clipCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Version: {edl.version}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Modified: {edl.lastModified}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {edl.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {edl.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {edl.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingEdl(edl); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteEdl(edl.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit EDL Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle>{editingEdl ? 'Edit EDL' : 'Add New EDL'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingEdl ? editingEdl.title : newEdl.title}
                  onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, title: e.target.value }) : setNewEdl({ ...newEdl, title: e.target.value })}
                  placeholder="e.g., Opening Sequence EDL"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingEdl ? editingEdl.description : newEdl.description}
                  onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, description: e.target.value }) : setNewEdl({ ...newEdl, description: e.target.value })}
                  placeholder="Describe the EDL..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sequence" className="block text-sm font-medium text-slate-700">Sequence</label>
                  <input
                    id="sequence"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingEdl ? editingEdl.sequence : newEdl.sequence}
                    onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, sequence: e.target.value }) : setNewEdl({ ...newEdl, sequence: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
                <div>
                  <label htmlFor="editor" className="block text-sm font-medium text-slate-700">Editor</label>
                  <input
                    id="editor"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingEdl ? editingEdl.editor : newEdl.editor}
                    onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, editor: e.target.value }) : setNewEdl({ ...newEdl, editor: e.target.value })}
                    placeholder="e.g., Sarah Chen"
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
                    value={editingEdl ? editingEdl.duration : newEdl.duration}
                    onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, duration: e.target.value }) : setNewEdl({ ...newEdl, duration: e.target.value })}
                    placeholder="e.g., 00:05:30"
                  />
                </div>
                <div>
                  <label htmlFor="version" className="block text-sm font-medium text-slate-700">Version</label>
                  <input
                    id="version"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingEdl ? editingEdl.version : newEdl.version}
                    onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, version: e.target.value }) : setNewEdl({ ...newEdl, version: e.target.value })}
                    placeholder="e.g., v1.0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingEdl ? editingEdl.status : newEdl.status}
                    onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, status: e.target.value }) : setNewEdl({ ...newEdl, status: e.target.value })}
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
                    value={editingEdl ? editingEdl.priority : newEdl.priority}
                    onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, priority: e.target.value }) : setNewEdl({ ...newEdl, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="clipCount" className="block text-sm font-medium text-slate-700">Clip Count</label>
                <input
                  id="clipCount"
                  type="number"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingEdl ? editingEdl.clipCount : newEdl.clipCount}
                  onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, clipCount: parseInt(e.target.value) || 0 }) : setNewEdl({ ...newEdl, clipCount: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingEdl ? editingEdl.tags.join(', ') : newEdl.tags.join(', ')}
                  onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewEdl({ ...newEdl, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., opening, sequence, edit"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingEdl ? editingEdl.notes : newEdl.notes}
                  onChange={(e) => editingEdl ? setEditingEdl({ ...editingEdl, notes: e.target.value }) : setNewEdl({ ...newEdl, notes: e.target.value })}
                  placeholder="Any additional notes for this EDL..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingEdl ? handleEditEdl : handleAddEdl}>
                  {editingEdl ? 'Save Changes' : 'Add New EDL'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
