'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Upload,
  Eye,
  Download,
  Tag,
  User,
  FolderOpen,
  Image as ImageIcon,
  Play,
  Grid,
  List,
  ArrowUpDown,
  X,
  CheckSquare
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'
import { useStatusPreferences } from '../../components/StatusPreferences'
import BulkStatusManager from '../../components/BulkStatusManager'

export default function AssetDatabase() {
  const { getStatusOptions, getStatusColor: getPreferredStatusColor } = useStatusPreferences()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status' | 'project'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState({
    project: '',
    assetType: '',
    createdBy: '',
    usedInScene: '',
    tags: [] as string[]
  })
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    description: '',
    assetType: '',
    associatedConcept: '',
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [selectedAssets, setSelectedAssets] = useState<number[]>([])
  const [showBulkTagModal, setShowBulkTagModal] = useState(false)
  const [bulkTagAction, setBulkTagAction] = useState<'add' | 'remove'>('add')
  const [bulkTags, setBulkTags] = useState<string[]>([])
  const [newBulkTag, setNewBulkTag] = useState('')
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel'>('csv')
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<'original' | 'fbx' | 'obj' | 'blend' | 'gltf'>('original')
  const [downloadProgress, setDownloadProgress] = useState<{[key: number]: number}>({})
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [showBulkStatusManager, setShowBulkStatusManager] = useState(false)

  const assets = [
    {
      id: 1,
      name: "Cyber Suit MK-1",
      type: "Character",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/cc5e58cc-e0b6-4fbb-8211-c37a3f742558",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/cf7f8f23-cdce-4d24-97fc-8979015c691f",
      project: "Cyber Nexus",
      createdBy: "Sarah Chen",
      usedInScenes: ["Opening Sequence", "Final Battle"],
      createdDate: "2024-01-20",
      fileSize: "45.2 MB",
      tags: ["character", "cyberpunk", "hero", "rigged", "armor"]
    },
    {
      id: 2,
      name: "Spaceship Interior",
      type: "Environment",
      status: "Work in Progress",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/06f886da-acfd-49c5-9760-a2b6a4ca6ba2",
      animatedThumbnail: null,
      project: "Space Odyssey",
      createdBy: "Mike Johnson",
      usedInScenes: ["Bridge Scene", "Escape Sequence"],
      createdDate: "2024-02-15",
      fileSize: "128.7 MB",
      tags: ["environment", "sci-fi", "detailed", "textured", "mechanical"]
    },
    {
      id: 3,
      name: "Laser Weapon",
      type: "Prop",
      status: "Ready to Start",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/b4a093f2-6333-48c3-8174-2abf1b905d7f",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/66918ab4-4141-4dbe-ad2a-5d5bbb3d5d4c",
      project: "Cyber Nexus",
      createdBy: "Emma Davis",
      usedInScenes: ["Action Sequence"],
      createdDate: "2024-03-01",
      fileSize: "12.4 MB",
      tags: ["prop", "weapon", "cyberpunk", "interactive", "military"]
    },
    {
      id: 4,
      name: "Ocean Floor",
      type: "Environment",
      status: "Pending Review",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/10d7be19-25e9-4016-bc21-49e68c58235f",
      animatedThumbnail: null,
      project: "Ocean Depths",
      createdBy: "Alex Rodriguez",
      usedInScenes: ["Underwater Exploration"],
      createdDate: "2024-02-28",
      fileSize: "89.3 MB",
      tags: ["environment", "fantasy", "organic", "detailed", "mystical"]
    },
    {
      id: 5,
      name: "Alien Creature",
      type: "Character",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/39fc2bcc-f68b-4af6-bab7-0f3b12821587",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/b7e6f3ab-1a4b-4554-9b56-4f31a4ec28bc",
      project: "Space Odyssey",
      createdBy: "Sarah Chen",
      usedInScenes: ["First Contact", "Battle Scene"],
      createdDate: "2024-01-10",
      fileSize: "67.8 MB",
      tags: ["character", "alien", "rigged", "animated", "organic"]
    },
    {
      id: 6,
      name: "Cybercity Street",
      type: "Environment",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/6c2cc018-592b-45f6-9fa0-8c76a58218d0",
      animatedThumbnail: null,
      project: "Cyber Nexus",
      createdBy: "Mike Johnson",
      usedInScenes: ["Chase Scene", "Opening"],
      createdDate: "2024-01-25",
      fileSize: "156.2 MB",
      tags: ["environment", "cyberpunk", "futuristic", "detailed", "civilian"]
    },
    {
      id: 7,
      name: "Hover Bike MK-3",
      type: "Vehicle",
      status: "Work in Progress",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/f5269a71-cf2f-46ca-916b-1655f95f2d85",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/0814ddea-9e48-4cf7-8a42-f5492e25e29e",
      project: "Cyber Nexus",
      createdBy: "Emma Davis",
      usedInScenes: ["Chase Scene", "Escape Sequence"],
      createdDate: "2024-03-10",
      fileSize: "78.5 MB",
      tags: ["vehicle", "cyberpunk", "interactive", "mechanical", "rigged"]
    },
    {
      id: 8,
      name: "Ancient Temple Ruins",
      type: "Environment",
      status: "Pending Review",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/c0edf762-08ec-45d7-bb29-62663a067000",
      animatedThumbnail: null,
      project: "Ocean Depths",
      createdBy: "Sarah Chen",
      usedInScenes: ["Discovery Scene", "Ancient Mysteries"],
      createdDate: "2024-03-05",
      fileSize: "142.8 MB",
      tags: ["environment", "fantasy", "mystical", "detailed", "decorative"]
    },
    {
      id: 9,
      name: "Space Station Corridor",
      type: "Environment",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/e790c7be-94f3-4fcb-a7d9-a800893c8f9c",
      animatedThumbnail: null,
      project: "Space Odyssey",
      createdBy: "Alex Rodriguez",
      usedInScenes: ["Station Tour", "Emergency Evacuation"],
      createdDate: "2024-02-20",
      fileSize: "95.7 MB",
      tags: ["environment", "sci-fi", "mechanical", "detailed", "civilian"]
    },
    {
      id: 10,
      name: "Hacker Character",
      type: "Character",
      status: "Ready to Start",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/17cb73a0-39ab-44c4-8e9b-b65251334a1c",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/3fcbec4c-ad53-46cc-af64-70b407a807ef",
      project: "Cyber Nexus",
      createdBy: "Mike Johnson",
      usedInScenes: ["Data Heist", "Underground Meeting"],
      createdDate: "2024-03-15",
      fileSize: "52.3 MB",
      tags: ["character", "cyberpunk", "civilian", "rigged", "modern"]
    },
    {
      id: 11,
      name: "Crystal Formation",
      type: "Prop",
      status: "Work in Progress",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/77ab4ba2-0910-4565-b16d-f5a31131e46c",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/7d9420b6-06ca-444f-b92f-d384af497569",
      project: "Ocean Depths",
      createdBy: "Emma Davis",
      usedInScenes: ["Crystal Cave", "Power Source"],
      createdDate: "2024-02-25",
      fileSize: "34.6 MB",
      tags: ["prop", "fantasy", "mystical", "organic", "collectible"]
    },
    {
      id: 12,
      name: "Plasma Rifle X-7",
      type: "Prop",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/4d9249a6-f789-4e57-ac62-0c1e4e93cd21",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/5e96ff52-009e-46da-8be8-d6f4173ee351",
      project: "Space Odyssey",
      createdBy: "Alex Rodriguez",
      usedInScenes: ["Space Battle", "Defense Protocol"],
      createdDate: "2024-01-30",
      fileSize: "28.9 MB",
      tags: ["prop", "weapon", "sci-fi", "military", "interactive"]
    },
    {
      id: 13,
      name: "Cyber Helmet MK-2",
      type: "Prop",
      status: "Work in Progress",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/81637319-b931-485b-ae5c-180e1de4e865",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/cf7f8f23-cdce-4d24-97fc-8979015c691f",
      project: "Cyber Nexus",
      createdBy: "Mike Johnson",
      usedInScenes: ["Neural Interface", "Data Transfer"],
      createdDate: "2024-02-10",
      fileSize: "35.7 MB",
      tags: ["prop", "armor", "cyberpunk", "tool", "mechanical"]
    },
    {
      id: 14,
      name: "Energy Shield",
      type: "Prop",
      status: "Ready to Start",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/e3ea5a11-f0f9-4541-839e-054ca2a5e97d",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/66918ab4-4141-4dbe-ad2a-5d5bbb3d5d4c",
      project: "Cyber Nexus",
      createdBy: "Sarah Chen",
      usedInScenes: ["Defense Sequence", "Final Battle"],
      createdDate: "2024-02-05",
      fileSize: "22.3 MB",
      tags: ["prop", "armor", "cyberpunk", "interactive", "military"]
    },
    {
      id: 15,
      name: "Holographic Interface",
      type: "Prop",
      status: "Approved",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/bc0e4a4a-101f-4d8a-8238-dbedd4fd1662",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/7d9420b6-06ca-444f-b92f-d384af497569",
      project: "Cyber Nexus",
      createdBy: "Emma Davis",
      usedInScenes: ["Data Access", "System Control"],
      createdDate: "2024-01-28",
      fileSize: "18.9 MB",
      tags: ["prop", "tool", "cyberpunk", "interactive", "futuristic"]
    },
    {
      id: 16,
      name: "Cybernetic Limb",
      type: "Prop",
      status: "Work in Progress",
      thumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/8efa7049-fbc0-4bb8-86a7-be949557395c",
      animatedThumbnail: "https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/3fcbec4c-ad53-46cc-af64-70b407a807ef",
      project: "Cyber Nexus",
      createdBy: "Alex Rodriguez",
      usedInScenes: ["Character Enhancement", "Action Sequence"],
      createdDate: "2024-02-12",
      fileSize: "41.2 MB",
      tags: ["prop", "armor", "cyberpunk", "mechanical", "rigged"]
    }
  ]

  const projects = ["All Projects", "Cyber Nexus", "Ocean Depths", "Space Odyssey"]
  const assetTypes = ["All Types", "Character", "Prop", "Vehicle", "Environment", "Camera", "Effect", "Light rig"]
  const creators = ["All Creators", "Sarah Chen", "Mike Johnson", "Emma Davis", "Alex Rodriguez"]
  const scenes = ["All Scenes", "Opening Sequence", "Action Sequence", "Final Battle", "Chase Scene", "Escape Sequence", "Discovery Scene", "Ancient Mysteries", "Station Tour", "Emergency Evacuation", "Data Heist", "Underground Meeting", "Crystal Cave", "Power Source", "Space Battle", "Defense Protocol"]
  const conceptArts = ["Character Concept A", "Environment Sketch B", "Prop Design C"]

  // Tag categories and color coding system
  const tagCategories = {
    'type': ['character', 'prop', 'vehicle', 'environment', 'weapon', 'armor', 'tool'],
    'style': ['cyberpunk', 'sci-fi', 'fantasy', 'modern', 'futuristic', 'retro', 'steampunk'],
    'quality': ['hero', 'background', 'detailed', 'lowpoly', 'highpoly', 'optimized'],
    'status': ['wip', 'final', 'concept', 'approved', 'review', 'placeholder'],
    'technical': ['rigged', 'animated', 'textured', 'unwrapped', 'baked', 'pbr'],
    'gameplay': ['interactive', 'destructible', 'collectible', 'usable', 'decorative'],
    'theme': ['military', 'civilian', 'alien', 'robot', 'organic', 'mechanical', 'mystical']
  }

  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase()
    
    // Type tags - Blue
    if (tagCategories.type.includes(lowerTag)) {
      return 'bg-blue-100 text-blue-800 border-blue-200'
    }
    // Style tags - Purple
    if (tagCategories.style.includes(lowerTag)) {
      return 'bg-purple-100 text-purple-800 border-purple-200'
    }
    // Quality tags - Green
    if (tagCategories.quality.includes(lowerTag)) {
      return 'bg-green-100 text-green-800 border-green-200'
    }
    // Status tags - Orange
    if (tagCategories.status.includes(lowerTag)) {
      return 'bg-orange-100 text-orange-800 border-orange-200'
    }
    // Technical tags - Cyan
    if (tagCategories.technical.includes(lowerTag)) {
      return 'bg-cyan-100 text-cyan-800 border-cyan-200'
    }
    // Gameplay tags - Pink
    if (tagCategories.gameplay.includes(lowerTag)) {
      return 'bg-pink-100 text-pink-800 border-pink-200'
    }
    // Theme tags - Indigo
    if (tagCategories.theme.includes(lowerTag)) {
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
    // Default - Gray
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  // Get all predefined tags for autocomplete
  const getAllExistingTags = () => {
    const allTags = new Set<string>()
    // Add tags from existing assets
    assets.forEach(asset => {
      if (asset.tags) {
        asset.tags.forEach(tag => allTags.add(tag))
      }
    })
    // Add predefined category tags
    Object.values(tagCategories).flat().forEach(tag => allTags.add(tag))
    return Array.from(allTags).sort()
  }

  // Tag filtering functions
  const addTagFilter = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      setFilters(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const removeTagFilter = (tagToRemove: string) => {
    setFilters(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const clearTagFilters = () => {
    setFilters(prev => ({ ...prev, tags: [] }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Work in Progress': return 'bg-blue-100 text-blue-800'
      case 'Pending Review': return 'bg-orange-100 text-orange-800'
      case 'Ready to Start': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAssetThumbnail = (asset: any) => {
    // If asset has a thumbnail, use it
    if (asset.thumbnail && !asset.thumbnail.includes('/api/placeholder/')) {
      return asset.thumbnail
    }
    
    // Otherwise, use type-specific placeholder
    switch (asset.type) {
      case 'Character':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/947f5f83-17ea-4727-8bcc-8e40fb166ef6'
      case 'Environment':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/a0172859-2b18-486c-bb68-413b09816d98'
      case 'Prop':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/29ad8926-c761-4955-a819-a0623dfe5a5f'
      case 'Vehicle':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/0512db2b-5daa-41bb-90a0-8e27b8bffda4'
      default:
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/29ad8926-c761-4955-a819-a0623dfe5a5f'
    }
  }

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = !filters.project || filters.project === 'All Projects' || asset.project === filters.project
    const matchesType = !filters.assetType || filters.assetType === 'All Types' || asset.type === filters.assetType
    const matchesCreator = !filters.createdBy || filters.createdBy === 'All Creators' || asset.createdBy === filters.createdBy
    const matchesScene = !filters.usedInScene || filters.usedInScene === 'All Scenes' || 
                        asset.usedInScenes.some(scene => scene === filters.usedInScene)
    const matchesTags = filters.tags.length === 0 || 
                       filters.tags.every(filterTag => asset.tags?.some(assetTag => 
                         assetTag.toLowerCase() === filterTag.toLowerCase()
                       ))
    
    return matchesSearch && matchesProject && matchesType && matchesCreator && matchesScene && matchesTags
  })

  const filteredAndSortedAssets = [...filteredAssets].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'date':
        comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
      case 'project':
        comparison = a.project.localeCompare(b.project)
        break
      default:
        comparison = 0
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag('')
      setShowSuggestions(false)
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleTagInputChange = (value: string) => {
    setNewTag(value)
    if (value.trim()) {
      const suggestions = getAllExistingTags().filter(tag => 
        tag.toLowerCase().includes(value.toLowerCase()) && 
        !formData.tags.includes(tag)
      ).slice(0, 8)
      setTagSuggestions(suggestions)
      setShowSuggestions(suggestions.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const selectTagSuggestion = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))
    setNewTag('')
    setShowSuggestions(false)
  }

  // Bulk tag operations
  const toggleAssetSelection = (assetId: number) => {
    setSelectedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const selectAllAssets = () => {
    setSelectedAssets(filteredAndSortedAssets.map(asset => asset.id))
    setSelectAll(true)
  }

  const clearSelection = () => {
    setSelectedAssets([])
    setSelectAll(false)
  }

  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      selectAllAssets()
    } else {
      clearSelection()
    }
  }

  const exportSelectedAssets = () => {
    const assetsToExport = selectedAssets.length > 0 
      ? assets.filter(asset => selectedAssets.includes(asset.id))
      : filteredAndSortedAssets

    const exportData = assetsToExport.map(asset => ({
      name: asset.name,
      type: asset.type,
      status: asset.status,
      project: asset.project,
      createdBy: asset.createdBy,
      createdDate: asset.createdDate,
      fileSize: asset.fileSize,
      usedInScenes: asset.usedInScenes.join(', '),
      tags: asset.tags?.join(', ') || ''
    }))

    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `assets_export_${timestamp}`

    if (exportFormat === 'json') {
      // Export as JSON
      const jsonContent = JSON.stringify(exportData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else if (exportFormat === 'excel') {
      // Export as Excel (TSV format for Excel compatibility)
      const headers = ['Name', 'Type', 'Status', 'Project', 'Created By', 'Created Date', 'File Size', 'Used in Scenes', 'Tags']
      const tsvContent = [
        headers.join('\t'),
        ...exportData.map(row => [
          row.name,
          row.type,
          row.status,
          row.project,
          row.createdBy,
          row.createdDate,
          row.fileSize,
          row.usedInScenes,
          row.tags
        ].join('\t'))
      ].join('\n')

      const blob = new Blob([tsvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.xlsx`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Export as CSV (default)
      const headers = ['Name', 'Type', 'Status', 'Project', 'Created By', 'Created Date', 'File Size', 'Used in Scenes', 'Tags']
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => [
          `"${row.name}"`,
          `"${row.type}"`,
          `"${row.status}"`,
          `"${row.project}"`,
          `"${row.createdBy}"`,
          `"${row.createdDate}"`,
          `"${row.fileSize}"`,
          `"${row.usedInScenes}"`,
          `"${row.tags}"`
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const downloadSelectedAssets = () => {
    setShowDownloadModal(true)
    setDownloadComplete(false)
    setDownloadProgress({})
  }

  const startDownload = async () => {
    const assetsToDownload = selectedAssets.length > 0 
      ? assets.filter(asset => selectedAssets.includes(asset.id))
      : filteredAndSortedAssets

    setIsDownloading(true)
    setDownloadProgress({})

    // Simulate download progress for each asset
    for (let i = 0; i < assetsToDownload.length; i++) {
      const asset = assetsToDownload[i]
      
      // Simulate download progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setDownloadProgress(prev => ({
          ...prev,
          [asset.id]: progress
        }))
      }

      // Create the actual download
      const fileExtension = getFileExtension(downloadFormat)
      const assetData = {
        name: asset.name,
        type: asset.type,
        status: asset.status,
        project: asset.project,
        createdBy: asset.createdBy,
        createdDate: asset.createdDate,
        fileSize: asset.fileSize,
        tags: asset.tags,
        format: downloadFormat,
        note: `This is a placeholder file in ${downloadFormat.toUpperCase()} format. In a real application, this would be the actual 3D asset file.`
      }
      
      const blob = new Blob([JSON.stringify(assetData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `${asset.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_latest.${fileExtension}`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    setIsDownloading(false)
    setDownloadComplete(true)
  }

  const getFileExtension = (format: string) => {
    switch (format) {
      case 'fbx': return 'fbx'
      case 'obj': return 'obj'
      case 'blend': return 'blend'
      case 'gltf': return 'gltf'
      default: return 'asset'
    }
  }

  const getFormatDescription = (format: string) => {
    switch (format) {
      case 'original': return 'Original format as uploaded by the creator'
      case 'fbx': return 'Autodesk FBX - Industry standard for 3D interchange'
      case 'obj': return 'Wavefront OBJ - Simple geometry format'
      case 'blend': return 'Blender native format with full scene data'
      case 'gltf': return 'glTF 2.0 - Modern web-optimized format'
      default: return ''
    }
  }

  const handleBulkDelete = () => {
    console.log('Deleting assets:', selectedAssets)
    // In a real app, this would call the backend API to delete assets
    setShowDeleteModal(false)
    setSelectedAssets([])
    setSelectAll(false)
  }

  const addBulkTag = () => {
    if (newBulkTag.trim() && !bulkTags.includes(newBulkTag.trim())) {
      setBulkTags(prev => [...prev, newBulkTag.trim()])
      setNewBulkTag('')
    }
  }

  const removeBulkTag = (tagToRemove: string) => {
    setBulkTags(prev => prev.filter(tag => tag !== tagToRemove))
  }

  const applyBulkTagOperation = () => {
    console.log(`${bulkTagAction === 'add' ? 'Adding' : 'Removing'} tags:`, bulkTags, 'to/from assets:', selectedAssets)
    // In a real app, this would update the backend
    setShowBulkTagModal(false)
    setBulkTags([])
    setSelectedAssets([])
  }

  const projectsData = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentProject="cyber-nexus" projects={projectsData} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Project Header */}
          <ProjectHeader
            projectName="Cyber Nexus"
            title="Asset Database"
            description="Manage and organize your studio's digital assets"
          />
          

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Assets List */}
            <div className="xl:col-span-3">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">Studio Assets</CardTitle>
                        <CardDescription>Browse and manage your digital assets</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="select-all"
                          checked={selectAll}
                          onCheckedChange={handleSelectAllChange}
                          className="border-slate-300"
                        />
                        <Label htmlFor="select-all" className="text-sm text-slate-600 cursor-pointer">
                          Select All ({filteredAndSortedAssets.length})
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search assets..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                          const [field, order] = value.split('-') as [typeof sortBy, typeof sortOrder]
                          setSortBy(field)
                          setSortOrder(order)
                        }}>
                          <SelectTrigger className="w-40">
                            <ArrowUpDown className="w-4 h-4 mr-2" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name-asc">Name A-Z</SelectItem>
                            <SelectItem value="name-desc">Name Z-A</SelectItem>
                            <SelectItem value="date-desc">Newest First</SelectItem>
                            <SelectItem value="date-asc">Oldest First</SelectItem>
                            <SelectItem value="status-asc">Status A-Z</SelectItem>
                            <SelectItem value="status-desc">Status Z-A</SelectItem>
                            <SelectItem value="project-asc">Project A-Z</SelectItem>
                            <SelectItem value="project-desc">Project Z-A</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center border border-slate-200 rounded-lg p-1">
                          <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="h-8 px-3"
                          >
                            <Grid className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="h-8 px-3"
                          >
                            <List className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Select value={exportFormat} onValueChange={(value: 'csv' | 'json' | 'excel') => setExportFormat(value)}>
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportSelectedAssets()}
                            className="text-green-600 border-green-300 hover:bg-green-50"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export All
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Bulk Operations Toolbar */}
                  {selectedAssets.length > 0 && (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-blue-900">
                          {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''} selected
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={clearSelection}
                          className="text-blue-700 border-blue-300 hover:bg-blue-100"
                        >
                          Clear Selection
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setBulkTagAction('add')
                            setShowBulkTagModal(true)
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Tag className="w-4 h-4 mr-2" />
                          Add Tags
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setBulkTagAction('remove')
                            setShowBulkTagModal(true)
                          }}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Tag className="w-4 h-4 mr-2" />
                          Remove Tags
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => exportSelectedAssets()}
                          className="text-green-600 border-green-300 hover:bg-green-50"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Selected
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => downloadSelectedAssets()}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          title="Download the latest version of each selected asset file"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Files
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowDeleteModal(true)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Selected
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Filters */}
                  <div className="space-y-4 mb-6 p-4 bg-slate-50 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-slate-700">Project</Label>
                        <Select value={filters.project} onValueChange={(value) => handleFilterChange('project', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Projects" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.map(project => (
                              <SelectItem key={project} value={project}>{project}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700">Asset Type</Label>
                        <Select value={filters.assetType} onValueChange={(value) => handleFilterChange('assetType', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Types" />
                          </SelectTrigger>
                          <SelectContent>
                            {assetTypes.map(type => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700">Created By</Label>
                        <Select value={filters.createdBy} onValueChange={(value) => handleFilterChange('createdBy', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Creators" />
                          </SelectTrigger>
                          <SelectContent>
                            {creators.map(creator => (
                              <SelectItem key={creator} value={creator}>{creator}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-slate-700">Used in Scene</Label>
                        <Select value={filters.usedInScene} onValueChange={(value) => handleFilterChange('usedInScene', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Scenes" />
                          </SelectTrigger>
                          <SelectContent>
                            {scenes.map(scene => (
                              <SelectItem key={scene} value={scene}>{scene}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Tag Filtering Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium text-slate-700">Filter by Tags</Label>
                        {filters.tags.length > 0 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={clearTagFilters}
                            className="text-xs text-slate-500 hover:text-slate-700"
                          >
                            Clear All
                          </Button>
                        )}
                      </div>
                      
                      {/* Selected Tag Filters */}
                      {filters.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3 p-2 bg-white rounded border border-slate-200">
                          {filters.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className={`${getTagColor(tag)} text-xs`}>
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTagFilter(tag)}
                                className="ml-1 hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Available Tags */}
                      <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                        {getAllExistingTags()
                          .filter(tag => !filters.tags.includes(tag))
                          .map((tag, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => addTagFilter(tag)}
                              className="inline-block"
                            >
                              <Badge 
                                variant="outline" 
                                className={`${getTagColor(tag)} text-xs cursor-pointer hover:opacity-80 transition-opacity`}
                              >
                                {tag}
                              </Badge>
                            </button>
                          ))
                        }
                      </div>
                      
                      {filters.tags.length > 0 && (
                        <div className="mt-2 text-xs text-slate-600">
                          Showing assets with {filters.tags.length > 1 ? 'all' : 'the'} selected tag{filters.tags.length > 1 ? 's' : ''}: {filteredAndSortedAssets.length} result{filteredAndSortedAssets.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Assets Display */}
                  {viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAndSortedAssets.map((asset) => (
                        <div key={asset.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer relative">
                          <div className="absolute top-3 left-3 z-10">
                            <Checkbox
                              checked={selectedAssets.includes(asset.id)}
                              onCheckedChange={() => toggleAssetSelection(asset.id)}
                              className="border-slate-300 bg-white/80 backdrop-blur-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <Link to={`/Asset?id=${asset.id}&name=${encodeURIComponent(asset.name)}`} className="block">
                            <div className="relative mb-4">
                              <div className="aspect-square bg-white rounded-lg overflow-hidden border border-slate-200">
                                <img 
                                  src={getAssetThumbnail(asset)} 
                                  alt={asset.name}
                                  className="w-full h-full object-cover"
                                />
                                {asset.animatedThumbnail && (
                                  <div className="absolute top-2 right-2">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                      <Play className="w-3 h-3 text-white fill-white" />
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="absolute bottom-2 left-2">
                                <Badge className={getStatusColor(asset.status)}>
                                  {asset.status}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <h3 className="font-semibold text-slate-900 text-sm leading-tight">{asset.name}</h3>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-500 hover:text-red-700 p-1"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    if (confirm(`Are you sure you want to delete "${asset.name}"? This action cannot be undone.`)) {
                                      console.log('Deleting asset:', asset.id)
                                      alert(`Delete functionality for asset "${asset.name}" - This would delete the asset in a real application`)
                                    }
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <Tag className="w-3 h-3" />
                                <span>{asset.type}</span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <FolderOpen className="w-3 h-3" />
                                <span>{asset.project}</span>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-slate-600">
                                <User className="w-3 h-3" />
                                <span>{asset.createdBy}</span>
                              </div>

                              <div className="text-xs text-slate-500">
                                <p>Size: {asset.fileSize}</p>
                                <p>Created: {asset.createdDate}</p>
                              </div>

                              {/* Tags */}
                              {asset.tags && asset.tags.length > 0 && (
                                <div className="pt-2">
                                  <div className="flex flex-wrap gap-1">
                                    {asset.tags.slice(0, 3).map((tag, tagIndex) => (
                                      <Badge 
                                        key={tagIndex} 
                                        variant="outline" 
                                        className={`${getTagColor(tag)} text-xs cursor-pointer hover:opacity-80`}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          addTagFilter(tag)
                                        }}
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    {asset.tags.length > 3 && (
                                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                                        +{asset.tags.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-1 pt-2">
                                <Link to={`/Asset?id=${asset.id}&name=${encodeURIComponent(asset.name)}`} className="flex-1">
                                  <Button size="sm" variant="outline" className="w-full">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                </Link>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List View */
                    <div className="space-y-2">
                      {filteredAndSortedAssets.map((asset) => (
                        <div key={asset.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer relative">
                          <div className="absolute top-4 left-4 z-10">
                            <Checkbox
                              checked={selectedAssets.includes(asset.id)}
                              onCheckedChange={() => toggleAssetSelection(asset.id)}
                              className="border-slate-300 bg-white/80 backdrop-blur-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <Link to={`/Asset?id=${asset.id}&name=${encodeURIComponent(asset.name)}`} className="block pl-8">
                            <div className="flex items-center gap-4">
                              {/* Thumbnail */}
                              <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-slate-200">
                                  <img 
                                    src={getAssetThumbnail(asset)} 
                                    alt={asset.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {asset.animatedThumbnail && (
                                  <div className="absolute -top-1 -right-1">
                                    <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                      <Play className="w-2 h-2 text-white fill-white" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Asset Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-semibold text-slate-900 text-sm truncate">{asset.name}</h3>
                                  <Badge className={getStatusColor(asset.status)}>
                                    {asset.status}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-6 text-xs text-slate-600 mb-2">
                                  <div className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    <span>{asset.type}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FolderOpen className="w-3 h-3" />
                                    <span>{asset.project}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span>{asset.createdBy}</span>
                                  </div>
                                  <div className="hidden sm:block">
                                    <span>Size: {asset.fileSize}</span>
                                  </div>
                                  <div className="hidden md:block">
                                    <span>Created: {asset.createdDate}</span>
                                  </div>
                                </div>
                                
                                {/* Tags in List View */}
                                {asset.tags && asset.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {asset.tags.slice(0, 4).map((tag, tagIndex) => (
                                      <Badge 
                                        key={tagIndex} 
                                        variant="outline" 
                                        className={`${getTagColor(tag)} text-xs cursor-pointer hover:opacity-80`}
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          addTagFilter(tag)
                                        }}
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    {asset.tags.length > 4 && (
                                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                                        +{asset.tags.length - 4}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Link to={`/Asset?id=${asset.id}&name=${encodeURIComponent(asset.name)}`}>
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                </Link>
                                <Button size="sm" variant="outline">
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-red-500 hover:text-red-700"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    if (confirm(`Are you sure you want to delete "${asset.name}"? This action cannot be undone.`)) {
                                      console.log('Deleting asset:', asset.id)
                                      alert(`Delete functionality for asset "${asset.name}" - This would delete the asset in a real application`)
                                    }
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredAndSortedAssets.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No assets found</h3>
                      <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Asset Creation Form */}
            <div>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">Create New Asset</CardTitle>
                  <CardDescription>Add a new asset to your database</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="assetName" className="text-slate-700 font-medium">Asset Name</Label>
                      <Input
                        id="assetName"
                        placeholder="Enter asset name"
                        value={formData.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="assetStatus" className="text-slate-700 font-medium">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleFormChange('status', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N/A">N/A</SelectItem>
                          <SelectItem value="Ready to Start">Ready to Start</SelectItem>
                          <SelectItem value="Work in Progress">Work in Progress</SelectItem>
                          <SelectItem value="Kickback">Kickback</SelectItem>
                          <SelectItem value="Pending Review">Pending Review</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="assetDescription" className="text-slate-700 font-medium">Description</Label>
                      <Textarea
                        id="assetDescription"
                        placeholder="Asset description"
                        value={formData.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="assetType" className="text-slate-700 font-medium">Asset Type</Label>
                      <Select value={formData.assetType} onValueChange={(value) => handleFormChange('assetType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Character">Character</SelectItem>
                          <SelectItem value="Prop">Prop</SelectItem>
                          <SelectItem value="Vehicle">Vehicle</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Camera">Camera</SelectItem>
                          <SelectItem value="Effect">Effect</SelectItem>
                          <SelectItem value="Light rig">Light rig</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="associatedConcept" className="text-slate-700 font-medium">Associated Concept Art</Label>
                      <Select value={formData.associatedConcept} onValueChange={(value) => handleFormChange('associatedConcept', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select concept art" />
                        </SelectTrigger>
                        <SelectContent>
                          {conceptArts.map(concept => (
                            <SelectItem key={concept} value={concept}>{concept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags" className="text-slate-700 font-medium">Tags</Label>
                      <div className="mt-1 space-y-2 relative">
                        <Input
                          id="tags"
                          placeholder="Add a tag..."
                          value={newTag}
                          onChange={(e) => handleTagInputChange(e.target.value)}
                          onKeyPress={handleTagKeyPress}
                          className="w-full"
                        />
                        
                        {/* Tag Suggestions Dropdown */}
                        {showSuggestions && tagSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 z-10 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {tagSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => selectTagSuggestion(suggestion)}
                                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm border-b border-slate-100 last:border-b-0"
                              >
                                <Badge variant="outline" className={`${getTagColor(suggestion)} text-xs mr-2`}>
                                  {suggestion}
                                </Badge>
                                <span className="text-slate-600 capitalize">
                                  {Object.entries(tagCategories).find(([_, tags]) => 
                                    tags.includes(suggestion.toLowerCase())
                                  )?.[0] || 'custom'}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {formData.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className={`${getTagColor(tag)} text-xs`}>
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="ml-1 hover:text-red-500"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* File Upload Sections */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-slate-700 font-medium">Thumbnail Image</Label>
                      <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer">
                        <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Click to upload thumbnail</p>
                        <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium">Animated Thumbnail</Label>
                      <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors cursor-pointer">
                        <Play className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">Click to upload animated preview</p>
                        <p className="text-xs text-slate-500">GIF, MP4 up to 50MB</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Asset
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Tag Operations Modal */}
      <Dialog open={showBulkTagModal} onOpenChange={setShowBulkTagModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {bulkTagAction === 'add' ? 'Add Tags to Assets' : 'Remove Tags from Assets'}
            </DialogTitle>
            <DialogDescription>
              {bulkTagAction === 'add' 
                ? `Add tags to ${selectedAssets.length} selected asset${selectedAssets.length !== 1 ? 's' : ''}`
                : `Remove tags from ${selectedAssets.length} selected asset${selectedAssets.length !== 1 ? 's' : ''}`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-slate-700 font-medium">
                {bulkTagAction === 'add' ? 'Tags to Add' : 'Tags to Remove'}
              </Label>
              <div className="mt-2 space-y-2">
                <Input
                  placeholder={`${bulkTagAction === 'add' ? 'Add' : 'Remove'} a tag...`}
                  value={newBulkTag}
                  onChange={(e) => setNewBulkTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addBulkTag()
                    }
                  }}
                  className="w-full"
                />
                {bulkTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {bulkTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className={`${getTagColor(tag)} text-xs`}>
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeBulkTag(tag)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowBulkTagModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={applyBulkTagOperation}
              disabled={bulkTags.length === 0}
              className={bulkTagAction === 'add' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
              }
            >
              {bulkTagAction === 'add' ? 'Add Tags' : 'Remove Tags'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Selected Assets</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedAssets.length} selected asset{selectedAssets.length !== 1 ? 's' : ''}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Assets to be deleted:</span>
              </div>
              <div className="max-h-32 overflow-y-auto">
                {assets
                  .filter(asset => selectedAssets.includes(asset.id))
                  .map(asset => (
                    <div key={asset.id} className="text-sm text-red-700 py-1">
                      • {asset.name} ({asset.type})
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Assets
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Download Modal */}
      <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Download Asset Files</DialogTitle>
            <DialogDescription>
              Download {selectedAssets.length > 0 ? selectedAssets.length : filteredAndSortedAssets.length} asset file{(selectedAssets.length > 0 ? selectedAssets.length : filteredAndSortedAssets.length) !== 1 ? 's' : ''} with format selection
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <Label className="text-slate-700 font-medium mb-3 block">File Format</Label>
              <div className="space-y-3">
                {[
                  { value: 'original', label: 'Original Format', icon: '📁' },
                  { value: 'fbx', label: 'Autodesk FBX', icon: '🎯' },
                  { value: 'obj', label: 'Wavefront OBJ', icon: '📐' },
                  { value: 'blend', label: 'Blender File', icon: '🌀' },
                  { value: 'gltf', label: 'glTF 2.0', icon: '🌐' }
                ].map((format) => (
                  <div key={format.value} className="flex items-start gap-3">
                    <input
                      type="radio"
                      id={format.value}
                      name="downloadFormat"
                      value={format.value}
                      checked={downloadFormat === format.value}
                      onChange={(e) => setDownloadFormat(e.target.value as any)}
                      className="mt-1"
                      disabled={isDownloading}
                    />
                    <div className="flex-1">
                      <label htmlFor={format.value} className="flex items-center gap-2 cursor-pointer">
                        <span className="text-lg">{format.icon}</span>
                        <span className="font-medium text-slate-900">{format.label}</span>
                      </label>
                      <p className="text-sm text-slate-600 mt-1">
                        {getFormatDescription(format.value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset List */}
            <div>
              <Label className="text-slate-700 font-medium mb-2 block">Assets to Download</Label>
              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
                {(selectedAssets.length > 0 
                  ? assets.filter(asset => selectedAssets.includes(asset.id))
                  : filteredAndSortedAssets
                ).map(asset => (
                  <div key={asset.id} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded overflow-hidden">
                        <img 
                          src={getAssetThumbnail(asset)} 
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{asset.name}</div>
                        <div className="text-xs text-slate-600">{asset.type} • {asset.fileSize}</div>
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    {isDownloading && (
                      <div className="flex items-center gap-2 min-w-0 flex-1 ml-4">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${downloadProgress[asset.id] || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600 w-10 text-right">
                          {downloadProgress[asset.id] || 0}%
                        </span>
                      </div>
                    )}
                    
                    {downloadComplete && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckSquare className="w-4 h-4" />
                        <span className="text-xs">Complete</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Download Summary */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Download className="w-4 h-4" />
                <span className="font-medium">Download Summary</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>Format: <span className="font-medium">{downloadFormat.toUpperCase()}</span></div>
                <div>Files: <span className="font-medium">
                  {selectedAssets.length > 0 ? selectedAssets.length : filteredAndSortedAssets.length}
                </span></div>
                <div>Total Size: <span className="font-medium">
                  {(selectedAssets.length > 0 
                    ? assets.filter(asset => selectedAssets.includes(asset.id))
                    : filteredAndSortedAssets
                  ).reduce((total, asset) => {
                    const size = parseFloat(asset.fileSize.replace(/[^\d.]/g, ''))
                    return total + size
                  }, 0).toFixed(1)} MB (estimated)
                </span></div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowDownloadModal(false)
                setDownloadProgress({})
                setDownloadComplete(false)
                setIsDownloading(false)
              }}
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Cancel'}
            </Button>
            {!downloadComplete ? (
              <Button
                onClick={startDownload}
                disabled={isDownloading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Start Download
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowDownloadModal(false)
                  setDownloadProgress({})
                  setDownloadComplete(false)
                  setSelectedAssets([])
                  setSelectAll(false)
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Done
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}