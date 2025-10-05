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
  Film,
  Video,
  CheckCircle,
  AlertCircle,
  Hourglass,
  Scissors,
  FileText,
  Layers,
  Download,
  Upload
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Clips() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [clips, setClips] = useState([
    {
      id: 'clip-1',
      title: 'Portal Discovery Clip',
      description: 'Hero discovers the cyber world portal',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      shot: 'Shot 001',
      take: 'Take 001',
      duration: '00:00:15',
      status: 'Approved',
      priority: 'High',
      editor: 'Sarah Chen',
      createdDate: '2025-09-10',
      lastModified: '2025-09-15',
      fileSize: '2.4 GB',
      resolution: '4K',
      frameRate: '24fps',
      notes: 'Perfect lighting and composition. Ready for final cut.',
      tags: ['approved', 'portal', 'discovery'],
    },
    {
      id: 'clip-2',
      title: 'Reaction Close-up Clip',
      description: 'Hero reacts to discovering the cyber world',
      sequence: 'Opening Sequence',
      scene: 'Scene 1',
      shot: 'Shot 002',
      take: 'Take 002',
      duration: '00:00:08',
      status: 'Review',
      priority: 'High',
      editor: 'Mike Johnson',
      createdDate: '2025-09-10',
      lastModified: '2025-09-18',
      fileSize: '1.2 GB',
      resolution: '4K',
      frameRate: '24fps',
      notes: 'Good performance but needs more emotional range.',
      tags: ['review', 'close-up', 'reaction'],
    },
    {
      id: 'clip-3',
      title: 'Chase Tracking Clip',
      description: 'Dynamic chase through digital corridors',
      sequence: 'Chase Sequence',
      scene: 'Scene 2',
      shot: 'Shot 015',
      take: 'Take 015',
      duration: '00:00:25',
      status: 'Planning',
      priority: 'Medium',
      editor: 'Alex Rodriguez',
      createdDate: '2025-09-12',
      lastModified: '2025-09-20',
      fileSize: '0 GB',
      resolution: '4K',
      frameRate: '24fps',
      notes: 'Still planning camera rig setup for smooth tracking.',
      tags: ['planning', 'chase', 'tracking'],
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingClip, setEditingClip] = useState(null)
  const [newClip, setNewClip] = useState({
    title: '',
    description: '',
    sequence: '',
    scene: '',
    shot: '',
    take: '',
    duration: '00:00:00',
    status: 'Planning',
    priority: 'Medium',
    editor: '',
    fileSize: '',
    resolution: '4K',
    frameRate: '24fps',
    notes: '',
    tags: [],
  })

  const handleAddClip = () => {
    if (newClip.title && newClip.description) {
      const now = new Date().toISOString().split('T')[0]
      setClips([...clips, { 
        ...newClip, 
        id: `clip-${Date.now()}`,
        createdDate: now,
        lastModified: now,
      }])
      setNewClip({
        title: '',
        description: '',
        sequence: '',
        scene: '',
        shot: '',
        take: '',
        duration: '00:00:00',
        status: 'Planning',
        priority: 'Medium',
        editor: '',
        fileSize: '',
        resolution: '4K',
        frameRate: '24fps',
        notes: '',
        tags: [],
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditClip = () => {
    if (editingClip && editingClip.title && editingClip.description) {
      const now = new Date().toISOString().split('T')[0]
      setClips(clips.map(clip => clip.id === editingClip.id ? { ...editingClip, lastModified: now } : clip))
      setEditingClip(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteClip = (id) => {
    setClips(clips.filter(clip => clip.id !== id))
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

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
          pageTitle="Clips"
          pageDescription="Manage and track all video clips for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Project Clips</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Clip
              </Button>
              <Button onClick={() => { setEditingClip(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Clip
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clips.map((clip) => (
              <Card key={clip.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{clip.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(clip.status)} text-xs`}>{clip.status}</Badge>
                      <Badge className={`${getPriorityColor(clip.priority)} text-xs`}>{clip.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="mt-1 text-slate-600">
                    {clip.sequence} • {clip.scene} • {clip.shot} • {clip.take}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Duration: {clip.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Editor: {clip.editor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4" /> Resolution: {clip.resolution} • {clip.frameRate}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Size: {clip.fileSize}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Modified: {clip.lastModified}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {clip.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    {clip.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {clip.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setEditingClip(clip); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteClip(clip.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Clip Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[700px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingClip ? 'Edit Clip' : 'Add New Clip'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingClip ? editingClip.title : newClip.title}
                  onChange={(e) => editingClip ? setEditingClip({ ...editingClip, title: e.target.value }) : setNewClip({ ...newClip, title: e.target.value })}
                  placeholder="e.g., Portal Discovery Clip"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingClip ? editingClip.description : newClip.description}
                  onChange={(e) => editingClip ? setEditingClip({ ...editingClip, description: e.target.value }) : setNewClip({ ...newClip, description: e.target.value })}
                  placeholder="Describe the clip..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sequence" className="block text-sm font-medium text-slate-700">Sequence</label>
                  <input
                    id="sequence"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.sequence : newClip.sequence}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, sequence: e.target.value }) : setNewClip({ ...newClip, sequence: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.scene : newClip.scene}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, scene: e.target.value }) : setNewClip({ ...newClip, scene: e.target.value })}
                    placeholder="e.g., Scene 1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="shot" className="block text-sm font-medium text-slate-700">Shot</label>
                  <input
                    id="shot"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.shot : newClip.shot}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, shot: e.target.value }) : setNewClip({ ...newClip, shot: e.target.value })}
                    placeholder="e.g., Shot 001"
                  />
                </div>
                <div>
                  <label htmlFor="take" className="block text-sm font-medium text-slate-700">Take</label>
                  <input
                    id="take"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.take : newClip.take}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, take: e.target.value }) : setNewClip({ ...newClip, take: e.target.value })}
                    placeholder="e.g., Take 001"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration (HH:MM:SS)</label>
                  <input
                    id="duration"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.duration : newClip.duration}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, duration: e.target.value }) : setNewClip({ ...newClip, duration: e.target.value })}
                    placeholder="e.g., 00:00:15"
                  />
                </div>
                <div>
                  <label htmlFor="resolution" className="block text-sm font-medium text-slate-700">Resolution</label>
                  <select
                    id="resolution"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.resolution : newClip.resolution}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, resolution: e.target.value }) : setNewClip({ ...newClip, resolution: e.target.value })}
                  >
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="frameRate" className="block text-sm font-medium text-slate-700">Frame Rate</label>
                  <select
                    id="frameRate"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.frameRate : newClip.frameRate}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, frameRate: e.target.value }) : setNewClip({ ...newClip, frameRate: e.target.value })}
                  >
                    <option value="24fps">24fps</option>
                    <option value="30fps">30fps</option>
                    <option value="60fps">60fps</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editor" className="block text-sm font-medium text-slate-700">Editor</label>
                  <input
                    id="editor"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.editor : newClip.editor}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, editor: e.target.value }) : setNewClip({ ...newClip, editor: e.target.value })}
                    placeholder="e.g., Sarah Chen"
                  />
                </div>
                <div>
                  <label htmlFor="fileSize" className="block text-sm font-medium text-slate-700">File Size</label>
                  <input
                    id="fileSize"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.fileSize : newClip.fileSize}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, fileSize: e.target.value }) : setNewClip({ ...newClip, fileSize: e.target.value })}
                    placeholder="e.g., 2.4 GB"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingClip ? editingClip.status : newClip.status}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, status: e.target.value }) : setNewClip({ ...newClip, status: e.target.value })}
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
                    value={editingClip ? editingClip.priority : newClip.priority}
                    onChange={(e) => editingClip ? setEditingClip({ ...editingClip, priority: e.target.value }) : setNewClip({ ...newClip, priority: e.target.value })}
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
                  value={editingClip ? editingClip.tags.join(', ') : newClip.tags.join(', ')}
                  onChange={(e) => editingClip ? setEditingClip({ ...editingClip, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewClip({ ...newClip, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., approved, portal, discovery"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingClip ? editingClip.notes : newClip.notes}
                  onChange={(e) => editingClip ? setEditingClip({ ...editingClip, notes: e.target.value }) : setNewClip({ ...newClip, notes: e.target.value })}
                  placeholder="Any additional notes for this clip..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingClip ? handleEditClip : handleAddClip}>
                  {editingClip ? 'Save Changes' : 'Add New Clip'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
