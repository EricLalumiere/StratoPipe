'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Film,
  Clock,
  Users,
  Camera,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  MapPin,
  CheckCircle,
  AlertCircle,
  Calendar,
  Star
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function Scenes() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  const [scenes, setScenes] = useState([
    {
      id: 'scene-1',
      title: 'Opening Sequence',
      description: 'The protagonist discovers the cyber world',
      duration: '3:45',
      status: 'Completed',
      priority: 'High',
      location: 'Virtual Studio A',
      crew: ['Director', 'DP', 'Actor'],
      shots: 12,
      takes: 45,
      notes: 'Successfully captured all wide shots and close-ups. Lighting was perfect.',
      storyboard: true,
      conceptArt: true,
      shootingDate: '2025-10-01',
    },
    {
      id: 'scene-2',
      title: 'Chase Sequence',
      description: 'High-speed pursuit through digital corridors',
      duration: '2:30',
      status: 'In Progress',
      priority: 'High',
      location: 'Motion Capture Stage',
      crew: ['Director', 'DP', 'Stunt Coordinator'],
      shots: 8,
      takes: 23,
      notes: 'Working on complex camera movements. Some technical challenges with tracking.',
      storyboard: true,
      conceptArt: false,
      shootingDate: '2025-10-03',
    },
    {
      id: 'scene-3',
      title: 'Final Confrontation',
      description: 'Epic battle between hero and antagonist',
      duration: '5:20',
      status: 'Planning',
      priority: 'Medium',
      location: 'Main Studio',
      crew: ['Director', 'DP', 'Actor', 'Actor'],
      shots: 15,
      takes: 0,
      notes: 'Need to finalize choreography and special effects requirements.',
      storyboard: false,
      conceptArt: true,
      shootingDate: '2025-10-05',
    },
  ])

  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [editingScene, setEditingScene] = useState(null)
  const [newScene, setNewScene] = useState({
    title: '',
    description: '',
    duration: '',
    status: 'Planning',
    priority: 'Medium',
    location: '',
    crew: [],
    shots: 0,
    takes: 0,
    notes: '',
    storyboard: false,
    conceptArt: false,
    shootingDate: '',
  })

  const handleAddScene = () => {
    if (newScene.title && newScene.description) {
      setScenes([...scenes, { ...newScene, id: `scene-${Date.now()}` }])
      setNewScene({
        title: '',
        description: '',
        duration: '',
        status: 'Planning',
        priority: 'Medium',
        location: '',
        crew: [],
        shots: 0,
        takes: 0,
        notes: '',
        storyboard: false,
        conceptArt: false,
        shootingDate: '',
      })
      setShowAddEditDialog(false)
    }
  }

  const handleEditScene = () => {
    if (editingScene && editingScene.title && editingScene.description) {
      setScenes(scenes.map(scene => scene.id === editingScene.id ? editingScene : scene))
      setEditingScene(null)
      setShowAddEditDialog(false)
    }
  }

  const handleDeleteScene = (id) => {
    setScenes(scenes.filter(scene => scene.id !== id))
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
          pageTitle="Scenes"
          pageDescription="Manage and organize your project's scenes."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Scene Management</h2>
            <Button onClick={() => { setEditingScene(null); setShowAddEditDialog(true) }} className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Scene
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {scenes.map((scene) => (
              <Card key={scene.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-slate-900">{scene.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(scene.status)} text-xs`}>{scene.status}</Badge>
                      <Badge className={`${getPriorityColor(scene.priority)} text-xs`}>{scene.priority}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600">{scene.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock className="w-4 h-4" /> Duration: {scene.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="w-4 h-4" /> Location: {scene.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Users className="w-4 h-4" /> Crew: {scene.crew.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Camera className="w-4 h-4" /> Shots: {scene.shots} | Takes: {scene.takes}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Calendar className="w-4 h-4" /> Shooting Date: {scene.shootingDate}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${scene.storyboard ? 'text-yellow-500' : 'text-slate-300'}`} />
                        <span className={scene.storyboard ? 'text-slate-700' : 'text-slate-400'}>Storyboard</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Film className={`w-4 h-4 ${scene.conceptArt ? 'text-purple-500' : 'text-slate-300'}`} />
                        <span className={scene.conceptArt ? 'text-slate-700' : 'text-slate-400'}>Concept Art</span>
                      </div>
                    </div>
                    {scene.notes && (
                      <p className="text-sm text-slate-700 italic mt-2">Notes: {scene.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingScene(scene); setShowAddEditDialog(true) }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteScene(scene.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Add/Edit Scene Dialog */}
      {showAddEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-[600px] max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingScene ? 'Edit Scene' : 'Add New Scene'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingScene ? editingScene.title : newScene.title}
                  onChange={(e) => editingScene ? setEditingScene({ ...editingScene, title: e.target.value }) : setNewScene({ ...newScene, title: e.target.value })}
                  placeholder="e.g., Opening Sequence"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingScene ? editingScene.description : newScene.description}
                  onChange={(e) => editingScene ? setEditingScene({ ...editingScene, description: e.target.value }) : setNewScene({ ...newScene, description: e.target.value })}
                  placeholder="Describe what happens in this scene..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Duration</label>
                  <input
                    id="duration"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingScene ? editingScene.duration : newScene.duration}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, duration: e.target.value }) : setNewScene({ ...newScene, duration: e.target.value })}
                    placeholder="e.g., 3:45"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
                  <input
                    id="location"
                    type="text"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingScene ? editingScene.location : newScene.location}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, location: e.target.value }) : setNewScene({ ...newScene, location: e.target.value })}
                    placeholder="e.g., Virtual Studio A"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingScene ? editingScene.status : newScene.status}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, status: e.target.value }) : setNewScene({ ...newScene, status: e.target.value })}
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
                    value={editingScene ? editingScene.priority : newScene.priority}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, priority: e.target.value }) : setNewScene({ ...newScene, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="shots" className="block text-sm font-medium text-slate-700">Shots</label>
                  <input
                    id="shots"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingScene ? editingScene.shots : newScene.shots}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, shots: parseInt(e.target.value) || 0 }) : setNewScene({ ...newScene, shots: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <label htmlFor="takes" className="block text-sm font-medium text-slate-700">Takes</label>
                  <input
                    id="takes"
                    type="number"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    value={editingScene ? editingScene.takes : newScene.takes}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, takes: parseInt(e.target.value) || 0 }) : setNewScene({ ...newScene, takes: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="crew" className="block text-sm font-medium text-slate-700">Crew (comma separated)</label>
                <input
                  id="crew"
                  type="text"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingScene ? editingScene.crew.join(', ') : newScene.crew.join(', ')}
                  onChange={(e) => editingScene ? setEditingScene({ ...editingScene, crew: e.target.value.split(',').map(s => s.trim()) }) : setNewScene({ ...newScene, crew: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="e.g., Director, DP, Actor"
                />
              </div>
              <div>
                <label htmlFor="shootingDate" className="block text-sm font-medium text-slate-700">Shooting Date</label>
                <input
                  id="shootingDate"
                  type="date"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingScene ? editingScene.shootingDate : newScene.shootingDate}
                  onChange={(e) => editingScene ? setEditingScene({ ...editingScene, shootingDate: e.target.value }) : setNewScene({ ...newScene, shootingDate: e.target.value })}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="storyboard"
                    type="checkbox"
                    className="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    checked={editingScene ? editingScene.storyboard : newScene.storyboard}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, storyboard: e.target.checked }) : setNewScene({ ...newScene, storyboard: e.target.checked })}
                  />
                  <label htmlFor="storyboard" className="ml-2 text-sm text-slate-700">Storyboard Available</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="conceptArt"
                    type="checkbox"
                    className="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    checked={editingScene ? editingScene.conceptArt : newScene.conceptArt}
                    onChange={(e) => editingScene ? setEditingScene({ ...editingScene, conceptArt: e.target.checked }) : setNewScene({ ...newScene, conceptArt: e.target.checked })}
                  />
                  <label htmlFor="conceptArt" className="ml-2 text-sm text-slate-700">Concept Art Available</label>
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes</label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={editingScene ? editingScene.notes : newScene.notes}
                  onChange={(e) => editingScene ? setEditingScene({ ...editingScene, notes: e.target.value }) : setNewScene({ ...newScene, notes: e.target.value })}
                  placeholder="Any additional notes for this scene..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEditDialog(false)}>Cancel</Button>
                <Button onClick={editingScene ? handleEditScene : handleAddScene}>
                  {editingScene ? 'Save Changes' : 'Add Scene'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
