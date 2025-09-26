'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Filter, 
  Plus, 
  Upload,
  Eye,
  Download,
  Tag,
  User,
  FolderOpen,
  Image as ImageIcon,
  Play,
  Grid3X3,
  List,
  ArrowUpDown,
  X
} from 'lucide-react'
import Components from '@/components'

export default function AssetDatabase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'type' | 'project'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState({
    project: '',
    assetType: '',
    createdBy: '',
    tags: [] as string[]
  })

  // Mock data
  const assets = [
    {
      id: 1,
      name: "Cyber Suit",
      type: "Character",
      project: "Cyber Nexus",
      createdBy: "Sarah Chen",
      createdAt: "2023-12-01",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/cc5e58cc-e0b6-4fbb-8211-c37a3f742558",
      tags: ["character", "cyberpunk", "hero"]
    },
    {
      id: 2,
      name: "Neon City Environment",
      type: "Environment",
      project: "Cyber Nexus",
      createdBy: "Mike Johnson",
      createdAt: "2023-12-05",
      status: "Work in Progress",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/06f886da-acfd-49c5-9760-a2b6a4ca6ba2",
      tags: ["environment", "city", "neon"]
    },
    {
      id: 3,
      name: "Laser Weapon",
      type: "Prop",
      project: "Cyber Nexus",
      createdBy: "Emma Davis",
      createdAt: "2023-12-10",
      status: "Ready to Start",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/b4a093f2-6333-48c3-8174-2abf1b905d7f",
      tags: ["weapon", "laser", "prop"]
    },
    {
      id: 4,
      name: "Hover Vehicle",
      type: "Vehicle",
      project: "Cyber Nexus",
      createdBy: "Alex Rodriguez",
      createdAt: "2023-12-15",
      status: "Pending Review",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/0512db2b-5daa-41bb-90a0-8e27b8bffda4",
      tags: ["vehicle", "hover", "transport"]
    },
    {
      id: 5,
      name: "Ocean Floor",
      type: "Environment",
      project: "Ocean Depths",
      createdBy: "Lisa Thompson",
      createdAt: "2023-12-20",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/10d7be19-25e9-4016-bc21-49e68c58235f",
      tags: ["environment", "ocean", "underwater"]
    }
  ]

  const projects = ["Cyber Nexus", "Ocean Depths", "Space Odyssey"]
  const assetTypes = ["Character", "Environment", "Prop", "Vehicle"]
  const creators = ["Sarah Chen", "Mike Johnson", "Emma Davis", "Alex Rodriguez", "Lisa Thompson"]
  const allTags = ["character", "cyberpunk", "hero", "environment", "city", "neon", "weapon", "laser", "prop", "vehicle", "hover", "transport", "ocean", "underwater"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Work in Progress': return 'bg-blue-100 text-blue-800'
      case 'Ready to Start': return 'bg-orange-100 text-orange-800'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Character': return <User className="w-4 h-4 text-blue-600" />
      case 'Environment': return <FolderOpen className="w-4 h-4 text-green-600" />
      case 'Prop': return <Tag className="w-4 h-4 text-purple-600" />
      case 'Vehicle': return <Play className="w-4 h-4 text-orange-600" />
      default: return <ImageIcon className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.project.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesProject = !filters.project || filters.project === 'all' || asset.project === filters.project
    const matchesType = !filters.assetType || filters.assetType === 'all' || asset.type === filters.assetType
    const matchesCreator = !filters.createdBy || filters.createdBy === 'all' || asset.createdBy === filters.createdBy
    const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => asset.tags.includes(tag))

    return matchesSearch && matchesProject && matchesType && matchesCreator && matchesTags
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Components.Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Asset Database</h1>
            <p className="text-slate-600">Manage and organize all your project assets</p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Search assets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                  <Select value={filters.project} onValueChange={(value) => handleFilterChange('project', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      {projects.map(project => (
                        <SelectItem key={project} value={project}>{project}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.assetType} onValueChange={(value) => handleFilterChange('assetType', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {assetTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={filters.createdBy} onValueChange={(value) => handleFilterChange('createdBy', value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Creator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Creators</SelectItem>
                      {creators.map(creator => (
                        <SelectItem key={creator} value={creator}>{creator}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Controls */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mt-4">
                <Label className="text-sm font-medium text-slate-700 mb-2 block">Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Button
                      key={tag}
                      variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTagToggle(tag)}
                      className="text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assets Grid/List */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                {filteredAssets.length} assets found
              </span>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets.map((asset) => (
                <Link key={asset.id} href={`/projects/cyber-nexus/assets/${asset.id}`}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={asset.thumbnail} 
                        alt={asset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusColor(asset.status)}>
                          {asset.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {asset.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          {getTypeIcon(asset.type)}
                          <span>{asset.type}</span>
                        </div>
                        <p className="text-sm text-slate-500">{asset.project}</p>
                        <div className="flex flex-wrap gap-1">
                          {asset.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {asset.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{asset.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAssets.map((asset) => (
                <Link key={asset.id} href={`/projects/cyber-nexus/assets/${asset.id}`}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden">
                          <img 
                            src={asset.thumbnail} 
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                              {asset.name}
                            </h3>
                            <Badge className={getStatusColor(asset.status)}>
                              {asset.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              {getTypeIcon(asset.type)}
                              <span>{asset.type}</span>
                            </div>
                            <span>•</span>
                            <span>{asset.project}</span>
                            <span>•</span>
                            <span>{asset.createdBy}</span>
                            <span>•</span>
                            <span>{asset.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
