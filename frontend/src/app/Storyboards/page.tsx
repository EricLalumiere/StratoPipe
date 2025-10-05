'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Image,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  Grid,
  List,
  Calendar,
  User,
  Clock,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Storyboards() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [storyboards, setStoryboards] = useState([
    {
      id: 'sb-1',
      title: 'Opening Sequence - Scene 1',
      description: 'Hero discovers the cyber world',
      scene: 'Scene 1',
      sequence: 'Opening',
      frameCount: 12,
      status: 'Approved',
      priority: 'High',
      artist: 'Sarah Chen',
      createdDate: '2025-09-15',
      lastModified: '2025-09-20',
      thumbnail: '/api/placeholder/200/150',
      notes: 'All frames approved by director. Ready for production.',
      tags: ['action', 'cyber', 'opening'],
    },
    {
      id: 'sb-2',
      title: 'Chase Sequence - Scene 2',
      description: 'High-speed pursuit through digital corridors',
      scene: 'Scene 2',
      sequence: 'Chase',
      frameCount: 8,
      status: 'In Review',
      priority: 'High',
      artist: 'Mike Johnson',
      createdDate: '2025-09-18',
      lastModified: '2025-09-22',
      thumbnail: '/api/placeholder/200/150',
      notes: 'Need to adjust camera angles for better flow.',
      tags: ['action', 'chase', 'digital'],
    },
    {
      id: 'sb-3',
      title: 'Final Confrontation - Scene 3',
      description: 'Epic battle between hero and antagonist',
      scene: 'Scene 3',
      sequence: 'Climax',
      frameCount: 15,
      status: 'Draft',
      priority: 'Medium',
      artist: 'Alex Rodriguez',
      createdDate: '2025-09-20',
      lastModified: '2025-09-22',
      thumbnail: '/api/placeholder/200/150',
      notes: 'Still working on choreography and special effects.',
      tags: ['battle', 'climax', 'epic'],
    },
  ])

  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingStoryboard, setEditingStoryboard] = useState(null)
  const [newStoryboard, setNewStoryboard] = useState({
    title: '',
    description: '',
    scene: '',
    sequence: '',
    frameCount: 0,
    status: 'Draft',
    priority: 'Medium',
    artist: '',
    notes: '',
    tags: [],
  })

  const handleAddStoryboard = () => {
    if (newStoryboard.title && newStoryboard.description) {
      const now = new Date().toISOString().split('T')[0]
      setStoryboards([...storyboards, { 
        ...newStoryboard, 
        id: `sb-${Date.now()}`,
        createdDate: now,
        lastModified: now,
        thumbnail: '/api/placeholder/200/150',
      }])
      setNewStoryboard({
        title: '',
        description: '',
        scene: '',
        sequence: '',
        frameCount: 0,
        status: 'Draft',
        priority: 'Medium',
        artist: '',
        notes: '',
        tags: [],
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditStoryboard = () => {
    if (editingStoryboard && editingStoryboard.title && editingStoryboard.description) {
      const now = new Date().toISOString().split('T')[0]
      setStoryboards(storyboards.map(sb => sb.id === editingStoryboard.id ? { ...editingStoryboard, lastModified: now } : sb))
      setEditingStoryboard(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteStoryboard = (id) => {
    setStoryboards(storyboards.filter(sb => sb.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
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
          pageTitle="Storyboards"
          pageDescription="Manage visual storyboards and shot planning."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Storyboard Management</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={() => { setEditingStoryboard(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Storyboard
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {storyboards.map((storyboard) => (
                <Card key={storyboard.id} className="flex flex-col">
                  <div className="relative">
                    <img 
                      src={storyboard.thumbnail} 
                      alt={storyboard.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge className={`${getStatusColor(storyboard.status)} text-xs`}>{storyboard.status}</Badge>
                      <Badge className={`${getPriorityColor(storyboard.priority)} text-xs`}>{storyboard.priority}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-slate-900">{storyboard.title}</CardTitle>
                    <CardDescription className="text-slate-600">{storyboard.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Image className="w-4 h-4" /> {storyboard.frameCount} frames
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <User className="w-4 h-4" /> {storyboard.artist}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Calendar className="w-4 h-4" /> {storyboard.lastModified}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {storyboard.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setEditingStoryboard(storyboard); setShowAddEditDialog(true) }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteStoryboard(storyboard.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {storyboards.map((storyboard) => (
                <Card key={storyboard.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <img 
                        src={storyboard.thumbnail} 
                        alt={storyboard.title}
                        className="w-24 h-18 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-slate-900">{storyboard.title}</h3>
                          <div className="flex gap-2">
                            <Badge className={`${getStatusColor(storyboard.status)} text-xs`}>{storyboard.status}</Badge>
                            <Badge className={`${getPriorityColor(storyboard.priority)} text-xs`}>{storyboard.priority}</Badge>
                          </div>
                        </div>
                        <p className="text-slate-600 mb-3">{storyboard.description}</p>
                        <div className="flex items-center gap-6 text-sm text-slate-700 mb-3">
                          <div className="flex items-center gap-1">
                            <Image className="w-4 h-4" /> {storyboard.frameCount} frames
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" /> {storyboard.artist}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {storyboard.lastModified}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {storyboard.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        {storyboard.notes && (
                          <p className="text-sm text-slate-700 italic mb-3">Notes: {storyboard.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => { setEditingStoryboard(storyboard); setShowAddEditDialog(true) }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteStoryboard(storyboard.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Storyboard Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingStoryboard ? 'Edit Storyboard' : 'Add New Storyboard'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingStoryboard ? editingStoryboard.title : newStoryboard.title}
                  onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, title: e.target.value }) : setNewStoryboard({ ...newStoryboard, title: e.target.value })}
                  placeholder="e.g., Opening Sequence - Scene 1"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingStoryboard ? editingStoryboard.description : newStoryboard.description}
                  onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, description: e.target.value }) : setNewStoryboard({ ...newStoryboard, description: e.target.value })}
                  placeholder="Describe the storyboard content..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingStoryboard ? editingStoryboard.scene : newStoryboard.scene}
                    onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, scene: e.target.value }) : setNewStoryboard({ ...newStoryboard, scene: e.target.value })}
                    placeholder="e.g., Scene 1"
                  />
                </div>
                <div>
                  <label htmlFor="sequence" className="block text-sm font-medium text-slate-700">Sequence</label>
                  <input
                    id="sequence"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingStoryboard ? editingStoryboard.sequence : newStoryboard.sequence}
                    onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, sequence: e.target.value }) : setNewStoryboard({ ...newStoryboard, sequence: e.target.value })}
                    placeholder="e.g., Opening"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="frameCount" className="block text-sm font-medium text-slate-700">Frame Count</label>
                  <input
                    id="frameCount"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingStoryboard ? editingStoryboard.frameCount : newStoryboard.frameCount}
                    onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, frameCount: parseInt(e.target.value) || 0 }) : setNewStoryboard({ ...newStoryboard, frameCount: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label htmlFor="artist" className="block text-sm font-medium text-slate-700">Artist</label>
                  <input
                    id="artist"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingStoryboard ? editingStoryboard.artist : newStoryboard.artist}
                    onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, artist: e.target.value }) : setNewStoryboard({ ...newStoryboard, artist: e.target.value })}
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
                    value={editingStoryboard ? editingStoryboard.status : newStoryboard.status}
                    onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, status: e.target.value }) : setNewStoryboard({ ...newStoryboard, status: e.target.value })}
                  >
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
                  <select
                    id="priority"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingStoryboard ? editingStoryboard.priority : newStoryboard.priority}
                    onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, priority: e.target.value }) : setNewStoryboard({ ...newStoryboard, priority: e.target.value })}
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
                  value={editingStoryboard ? editingStoryboard.tags.join(', ') : newStoryboard.tags.join(', ')}
                  onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewStoryboard({ ...newStoryboard, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., action, cyber, opening"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingStoryboard ? editingStoryboard.notes : newStoryboard.notes}
                  onChange={(e) => editingStoryboard ? setEditingStoryboard({ ...editingStoryboard, notes: e.target.value }) : setNewStoryboard({ ...newStoryboard, notes: e.target.value })}
                  placeholder="Any additional notes for this storyboard..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingStoryboard ? handleEditStoryboard : handleAddStoryboard}>
                  {editingStoryboard ? 'Save Changes' : 'Add Storyboard'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
