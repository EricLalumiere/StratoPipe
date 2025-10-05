'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  Calendar, 
  FolderOpen, 
  Film, 
  Edit, 
  Eye, 
  Trash2,
  MapPin,
  User,
  Clock
} from 'lucide-react'

interface PhysicalPropProps {
  prop: {
    id: number
    name: string
    description: string
    status: string
    location: string
    condition: string
    shootDays: Array<{
      id: number
      name: string
      date: string
    }>
    project: {
      id: string
      name: string
    }
    takes: Array<{
      id: number
      name: string
      scene: string
    }>
    createdBy: string
    createdDate: string
    lastUsed?: string
  }
  viewMode?: 'grid' | 'list'
  onEdit?: () => void
  onDelete?: () => void
}

export default function Physical_Prop({ prop, viewMode = 'grid', onEdit, onDelete }: PhysicalPropProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200'
      case 'In Use': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Damaged': return 'bg-red-100 text-red-800 border-red-200'
      case 'Missing': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-200'
      case 'Good': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Poor': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{prop.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-1">{prop.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(prop.status)}>
                    {prop.status}
                  </Badge>
                  <Badge className={getConditionColor(prop.condition)}>
                    {prop.condition}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-xs text-slate-500 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{prop.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{prop.createdBy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{prop.shootDays.length} shoot days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>{prop.takes.length} takes</span>
                </div>
                {prop.lastUsed && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Last used: {prop.lastUsed}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-1 ml-4">
              <Link href={`/PhysicalProperty?id=${prop.id}&project=${prop.project.id}`}>
                <Button size="sm" variant="ghost">
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={onEdit}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onDelete}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <CardTitle className="text-sm font-semibold line-clamp-1">{prop.name}</CardTitle>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={getStatusColor(prop.status)}>
              {prop.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{prop.description}</p>
        
        <div className="space-y-2 text-xs text-slate-500 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{prop.location}</span>
            </div>
            <Badge className={getConditionColor(prop.condition)}>
              {prop.condition}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <FolderOpen className="w-3 h-3" />
            <Link href={`/CurrentProject?project=${prop.project.id}`} className="text-blue-600 hover:text-blue-700">
              {prop.project.name}
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>Created by {prop.createdBy}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{prop.shootDays.length} shoot days</span>
            </div>
            <div className="flex items-center gap-1">
              <Film className="w-3 h-3" />
              <span>{prop.takes.length} takes</span>
            </div>
          </div>
          
          {prop.lastUsed && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Last used: {prop.lastUsed}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/PhysicalProperty?id=${prop.id}&project=${prop.project.id}`} className="flex-1">
            <Button size="sm" variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </Link>
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}