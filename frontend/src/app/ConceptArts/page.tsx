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
  AlertCircle,
  Palette,
  Layers,
  Zap
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function ConceptArts() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [conceptArts, setConceptArts] = useState([
    {
      id: 'ca-1',
      title: 'Cyber Cityscape - Main Environment',
      description: 'Futuristic city with neon lights and towering buildings',
      category: 'Environment',
      scene: 'Opening Sequence',
      artist: 'Elena Rodriguez',
      createdDate: '2025-09-10',
      lastModified: '2025-09-15',
      status: 'Approved',
      priority: 'High',
      thumbnail: '/api/placeholder/200/150',
      tags: ['cyberpunk', 'city', 'neon', 'environment'],
      notes: 'Final approved design. Ready for 3D modeling.',
      fileSize: '2.4 MB',
      resolution: '4K',
      layers: 12,
    },
    {
      id: 'ca-2',
      title: 'Protagonist Character Design',
      description: 'Main character in cyber-enhanced suit',
      category: 'Character',
      scene: 'Character Introduction',
      artist: 'Marcus Chen',
      createdDate: '2025-09-12',
      lastModified: '2025-09-18',
      status: 'In Review',
      priority: 'High',
      thumbnail: '/api/placeholder/200/150',
      tags: ['character', 'protagonist', 'cyber', 'suit'],
      notes: 'Need to adjust color scheme for better contrast.',
      fileSize: '1.8 MB',
      resolution: '2K',
      layers: 8,
    },
    {
      id: 'ca-3',
      title: 'Alien Creature - Antagonist',
      description: 'Bio-mechanical alien entity',
      category: 'Creature',
      scene: 'Final Confrontation',
      artist: 'Sarah Kim',
      createdDate: '2025-09-15',
      lastModified: '2025-09-20',
      status: 'Draft',
      priority: 'Medium',
      thumbnail: '/api/placeholder/200/150',
      tags: ['alien', 'creature', 'biomechanical', 'antagonist'],
      notes: 'Still working on biomechanical details and textures.',
      fileSize: '3.2 MB',
      resolution: '4K',
      layers: 15,
    },
    {
      id: 'ca-4',
      title: 'Vehicle Design - Cyber Bike',
      description: 'High-speed cyber motorcycle',
      category: 'Vehicle',
      scene: 'Chase Sequence',
      artist: 'David Park',
      createdDate: '2025-09-18',
      lastModified: '2025-09-22',
      status: 'Approved',
      priority: 'Medium',
      thumbnail: '/api/placeholder/200/150',
      tags: ['vehicle', 'motorcycle', 'cyber', 'chase'],
      notes: 'Design approved. Moving to 3D modeling phase.',
      fileSize: '2.1 MB',
      resolution: '2K',
      layers: 10,
    },
  ])

  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingConceptArt, setEditingConceptArt] = useState(null)
  const [newConceptArt, setNewConceptArt] = useState({
    title: '',
    description: '',
    category: 'Environment',
    scene: '',
    artist: '',
    status: 'Draft',
    priority: 'Medium',
    notes: '',
    tags: [],
    fileSize: '',
    resolution: '2K',
    layers: 0,
  })

  const categories = ['all', 'Environment', 'Character', 'Creature', 'Vehicle', 'Prop', 'UI']

  const filteredConceptArts = filterCategory === 'all' 
    ? conceptArts 
    : conceptArts.filter(ca => ca.category === filterCategory)

  const handleAddConceptArt = () => {
    if (newConceptArt.title && newConceptArt.description) {
      const now = new Date().toISOString().split('T')[0]
      setConceptArts([...conceptArts, { 
        ...newConceptArt, 
        id: `ca-${Date.now()}`,
        createdDate: now,
        lastModified: now,
        thumbnail: '/api/placeholder/200/150',
      }])
      setNewConceptArt({
        title: '',
        description: '',
        category: 'Environment',
        scene: '',
        artist: '',
        status: 'Draft',
        priority: 'Medium',
        notes: '',
        tags: [],
        fileSize: '',
        resolution: '2K',
        layers: 0,
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditConceptArt = () => {
    if (editingConceptArt && editingConceptArt.title && editingConceptArt.description) {
      const now = new Date().toISOString().split('T')[0]
      setConceptArts(conceptArts.map(ca => ca.id === editingConceptArt.id ? { ...editingConceptArt, lastModified: now } : ca))
      setEditingConceptArt(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteConceptArt = (id) => {
    setConceptArts(conceptArts.filter(ca => ca.id !== id))
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Environment': return <Layers className="w-4 h-4" />;
      case 'Character': return <User className="w-4 h-4" />;
      case 'Creature': return <Zap className="w-4 h-4" />;
      case 'Vehicle': return <Star className="w-4 h-4" />;
      case 'Prop': return <Palette className="w-4 h-4" />;
      case 'UI': return <Grid className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
          pageTitle="Concept Arts"
          pageDescription="Manage visual concept art and design assets."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Concept Art Gallery</h2>
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
              <Button onClick={() => { setEditingConceptArt(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Concept Art
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-slate-700">Filter by category:</span>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredConceptArts.map((conceptArt) => (
                <Card key={conceptArt.id} className="flex flex-col">
                  <div className="relative">
                    <img 
                      src={conceptArt.thumbnail} 
                      alt={conceptArt.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge className={`${getStatusColor(conceptArt.status)} text-xs`}>{conceptArt.status}</Badge>
                      <Badge className={`${getPriorityColor(conceptArt.priority)} text-xs`}>{conceptArt.priority}</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs flex items-center gap-1">
                        {getCategoryIcon(conceptArt.category)}
                        {conceptArt.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-slate-900">{conceptArt.title}</CardTitle>
                    <CardDescription className="text-slate-600">{conceptArt.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <User className="w-4 h-4" /> {conceptArt.artist}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Calendar className="w-4 h-4" /> {conceptArt.lastModified}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Image className="w-4 h-4" /> {conceptArt.resolution} • {conceptArt.fileSize}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Layers className="w-4 h-4" /> {conceptArt.layers} layers
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {conceptArt.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setEditingConceptArt(conceptArt); setShowAddEditDialog(true) }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteConceptArt(conceptArt.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredConceptArts.map((conceptArt) => (
                <Card key={conceptArt.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <img 
                        src={conceptArt.thumbnail} 
                        alt={conceptArt.title}
                        className="w-24 h-18 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-slate-900">{conceptArt.title}</h3>
                            <Badge variant="secondary" className="text-xs flex items-center gap-1">
                              {getCategoryIcon(conceptArt.category)}
                              {conceptArt.category}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`${getStatusColor(conceptArt.status)} text-xs`}>{conceptArt.status}</Badge>
                            <Badge className={`${getPriorityColor(conceptArt.priority)} text-xs`}>{conceptArt.priority}</Badge>
                          </div>
                        </div>
                        <p className="text-slate-600 mb-3">{conceptArt.description}</p>
                        <div className="flex items-center gap-6 text-sm text-slate-700 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" /> {conceptArt.artist}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {conceptArt.lastModified}
                          </div>
                          <div className="flex items-center gap-1">
                            <Image className="w-4 h-4" /> {conceptArt.resolution} • {conceptArt.fileSize}
                          </div>
                          <div className="flex items-center gap-1">
                            <Layers className="w-4 h-4" /> {conceptArt.layers} layers
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {conceptArt.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        {conceptArt.notes && (
                          <p className="text-sm text-slate-700 italic mb-3">Notes: {conceptArt.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => { setEditingConceptArt(conceptArt); setShowAddEditDialog(true) }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteConceptArt(conceptArt.id)}>
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

      {/* Add/Edit Concept Art Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[700px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingConceptArt ? 'Edit Concept Art' : 'Add New Concept Art'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingConceptArt ? editingConceptArt.title : newConceptArt.title}
                  onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, title: e.target.value }) : setNewConceptArt({ ...newConceptArt, title: e.target.value })}
                  placeholder="e.g., Cyber Cityscape - Main Environment"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingConceptArt ? editingConceptArt.description : newConceptArt.description}
                  onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, description: e.target.value }) : setNewConceptArt({ ...newConceptArt, description: e.target.value })}
                  placeholder="Describe the concept art..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                  <select
                    id="category"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.category : newConceptArt.category}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, category: e.target.value }) : setNewConceptArt({ ...newConceptArt, category: e.target.value })}
                  >
                    <option value="Environment">Environment</option>
                    <option value="Character">Character</option>
                    <option value="Creature">Creature</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Prop">Prop</option>
                    <option value="UI">UI</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="scene" className="block text-sm font-medium text-slate-700">Scene</label>
                  <input
                    id="scene"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.scene : newConceptArt.scene}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, scene: e.target.value }) : setNewConceptArt({ ...newConceptArt, scene: e.target.value })}
                    placeholder="e.g., Opening Sequence"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="artist" className="block text-sm font-medium text-slate-700">Artist</label>
                  <input
                    id="artist"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.artist : newConceptArt.artist}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, artist: e.target.value }) : setNewConceptArt({ ...newConceptArt, artist: e.target.value })}
                    placeholder="e.g., Elena Rodriguez"
                  />
                </div>
                <div>
                  <label htmlFor="resolution" className="block text-sm font-medium text-slate-700">Resolution</label>
                  <select
                    id="resolution"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.resolution : newConceptArt.resolution}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, resolution: e.target.value }) : setNewConceptArt({ ...newConceptArt, resolution: e.target.value })}
                  >
                    <option value="1K">1K</option>
                    <option value="2K">2K</option>
                    <option value="4K">4K</option>
                    <option value="8K">8K</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fileSize" className="block text-sm font-medium text-slate-700">File Size</label>
                  <input
                    id="fileSize"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.fileSize : newConceptArt.fileSize}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, fileSize: e.target.value }) : setNewConceptArt({ ...newConceptArt, fileSize: e.target.value })}
                    placeholder="e.g., 2.4 MB"
                  />
                </div>
                <div>
                  <label htmlFor="layers" className="block text-sm font-medium text-slate-700">Layers</label>
                  <input
                    id="layers"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.layers : newConceptArt.layers}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, layers: parseInt(e.target.value) || 0 }) : setNewConceptArt({ ...newConceptArt, layers: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingConceptArt ? editingConceptArt.status : newConceptArt.status}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, status: e.target.value }) : setNewConceptArt({ ...newConceptArt, status: e.target.value })}
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
                    value={editingConceptArt ? editingConceptArt.priority : newConceptArt.priority}
                    onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, priority: e.target.value }) : setNewConceptArt({ ...newConceptArt, priority: e.target.value })}
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
                  value={editingConceptArt ? editingConceptArt.tags.join(', ') : newConceptArt.tags.join(', ')}
                  onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, tags: e.target.value.split(',').map(s => s.trim()) }) : setNewConceptArt({ ...newConceptArt, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., cyberpunk, city, neon, environment"
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingConceptArt ? editingConceptArt.notes : newConceptArt.notes}
                  onChange={(e) => editingConceptArt ? setEditingConceptArt({ ...editingConceptArt, notes: e.target.value }) : setNewConceptArt({ ...newConceptArt, notes: e.target.value })}
                  placeholder="Any additional notes for this concept art..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingConceptArt ? handleEditConceptArt : handleAddConceptArt}>
                  {editingConceptArt ? 'Save Changes' : 'Add Concept Art'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
