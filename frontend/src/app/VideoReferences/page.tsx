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
  Clock,
  Calendar,
  User,
  Video,
  Film,
  CheckCircle,
  AlertCircle,
  Hourglass,
  ExternalLink,
  Download,
  Upload,
  Link as LinkIcon
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function VideoReferences() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [videoReferences, setVideoReferences] = useState([
    {
      id: 'vr-1',
      title: 'Cyberpunk City Reference',
      description: 'Reference footage for cyberpunk cityscape design',
      url: 'https://example.com/cyberpunk-city',
      category: 'Environment',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      duration: '00:02:30',
      status: 'Active',
      priority: 'High',
      addedBy: 'Sarah Chen',
      createdDate: '2025-09-10',
      lastModified: '2025-09-15',
      notes: 'Great reference for neon lighting and architecture.',
      tags: ['cyberpunk', 'city', 'lighting'],
    },
    {
      id: 'vr-2',
      title: 'Chase Scene Reference',
      description: 'Reference footage for dynamic chase sequences',
      url: 'https://example.com/chase-scene',
      category: 'Action',
      sequence: 'Chase Sequence',
      scene: 'Scene 2',
      duration: '00:01:45',
      status: 'Active',
      priority: 'High',
      addedBy: 'Mike Johnson',
      createdDate: '2025-09-12',
      lastModified: '2025-09-18',
      notes: 'Excellent camera work and pacing reference.',
      tags: ['chase', 'action', 'camera'],
    },
    {
      id: 'vr-3',
      title: 'Character Performance Reference',
      description: 'Reference footage for character emotional range',
      url: 'https://example.com/character-performance',
      category: 'Character',
      sequence: 'Final Confrontation',
      scene: 'Scene 3',
      duration: '00:03:20',
      status: 'Review',
      priority: 'Medium',
      addedBy: 'Alex Rodriguez',
      createdDate: '2025-09-15',
      lastModified: '2025-09-20',
      notes: 'Good reference for emotional intensity and range.',
      tags: ['character', 'performance', 'emotional'],
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingReference, setEditingReference] = useState(null)
  const [newReference, setNewReference] = useState({
    title: '',
    description: '',
    url: '',
    category: 'Environment',
    sequence: '',
    scene: '',
    duration: '00:00:00',
    status: 'Active',
    priority: 'Medium',
    addedBy: '',
    notes: '',
    tags: [],
  })

  const handleAddReference = () => {
    if (newReference.title && newReference.description && newReference.url) {
      const now = new Date().toISOString().split('T')[0]
      setVideoReferences([...videoReferences, { 
        ...newReference, 
        id: `vr-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewReference({
        title: '',
        description: '',
        url: '',
        category: 'Environment',
        sequence: '',
        scene: '',
        duration: '00:00:00',
        status: 'Active',
        priority: 'Medium',
        addedBy: '',
        notes: '',
        tags: [],
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditReference = () => {
    if (editingReference && editingReference.title && editingReference.description && editingReference.url) {
      const now = new Date().toISOString().split('T')[0]
      setVideoReferences(videoReferences.map(ref => ref.id === editingReference.id ? { ...editingReference, lastModified: now } : ref))
      setEditingReference(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteReference = (id) => {
    setVideoReferences(videoReferences.filter(ref => ref.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
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
          pageTitle="Video References"
          pageDescription="Manage video reference materials for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Video References</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Reference
              </Button>
              <Button onClick={() => { setEditingReference(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Reference
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoReferences.map((reference) => (
              <Card key={reference.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{reference.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(reference.status)} text-xs`}>{reference.status}</Badge>
                      <Badge className={`${getPriorityColor(reference.priority)} text-xs`}>{reference.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    {reference.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Category: {reference.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <Film className="w-4 h-4" /> Sequence: {reference.sequence}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration: {reference.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Added by: {reference.addedBy}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Modified: {reference.lastModified}
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs truncate">
                        {reference.url}
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {reference.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {reference.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {reference.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => window.open(reference.url, '_blank')}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingReference(reference); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteReference(reference.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Reference Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle>{editingReference ? 'Edit Video Reference' : 'Add New Video Reference'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingReference ? editingReference.title : newReference.title}
                  onChange={(e) => editingReference ? setEditingReference({ ...editingReference, title: e.target.value }) : setNewReference({ ...newReference, title: e.target.value })}
                  placeholder="e.g., Cyberpunk City Reference"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingReference ? editingReference.description : newReference.description}
                  onChange={(e) => editingReference ? setEditingReference({ ...editingReference, description: e.target.value }) : setNewReference({ ...newReference, description: e.target.value })}
                  placeholder="Describe the reference..."
                ></textarea>
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-slate-700">URL</label>
                <input
                  id="url"
                  type="url"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingReference ? editingReference.url : newReference.url}
                  onChange={(e) => editingReference ? setEditingReference({ ...editingReference, url: e.target.value }) : setNewReference({ ...newReference, url: e.target.value })}
                  placeholder="https://example.com/reference-video"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingReference ? editingReference.category : newReference.category}
                    onChange={(e) => editingReference ? setEditingReference({ ...editingReference, category: e.target.value }) : setNewReference({ ...newReference, category: e.target.value })}
                  >
                    <option value="Environment">Environment</option>
                    <option value="Character">Character</option>
                    <option value="Action">Action</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Camera">Camera</option>
                    <option value="VFX">VFX</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (HH:MM:SS)</label>
                  <input
                    id="duration"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingReference ? editingReference.duration : newReference.duration}
                    onChange={(e) => editingReference ? setEditingReference({ ...editingReference, duration: e.target.value }) : setNewReference({ ...newReference, duration: e.target.value })}
                    placeholder="e.g., 00:02:30"
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
                    value={editingReference ? editingReference.sequence : newReference.sequence}
                    onChange={(e) => editingReference ? setEditingReference({ ...editingReference, sequence: e.target.value }) : setNewReference({ ...newReference, sequence: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingReference ? editingReference.scene : newReference.scene}
                    onChange={(e) => editingReference ? setEditingReference({ ...editingReference, scene: e.target.value }) : setNewReference({ ...newReference, scene: e.target.value })}
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
                    value={editingReference ? editingReference.status : newReference.status}
                    onChange={(e) => editingReference ? setEditingReference({ ...editingReference, status: e.target.value }) : setNewReference({ ...newReference, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Review">Review</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingReference ? editingReference.priority : newReference.priority}
                    onChange={(e) => editingReference ? setEditingReference({ ...editingReference, priority: e.target.value }) : setNewReference({ ...newReference, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="addedBy" className="block text-sm font-medium text-slate-700">Added By</label>
                <input
                  id="addedBy"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingReference ? editingReference.addedBy : newReference.addedBy}
                  onChange={(e) => editingReference ? setEditingReference({ ...editingReference, addedBy: e.target.value }) : setNewReference({ ...newReference, addedBy: e.target.value })}
                  placeholder="e.g., Sarah Chen"
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700">Tags (comma separated)</label>
                <input
                  id="tags"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingReference ? editingReference.tags.join(', ') : newReference.tags.join(', ')}
                  onChange={(e) => editingReference ? setEditingReference({ ...editingReference, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewReference({ ...newReference, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., cyberpunk, city, lighting"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingReference ? editingReference.notes : newReference.notes}
                  onChange={(e) => editingReference ? setEditingReference({ ...editingReference, notes: e.target.value }) : setNewReference({ ...newReference, notes: e.target.value })}
                  placeholder="Any additional notes for this reference..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingReference ? handleEditReference : handleAddReference}>
                  {editingReference ? 'Save Changes' : 'Add New Reference'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
