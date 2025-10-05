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
  Package,
  Clock,
  Calendar,
  User,
  Video,
  CheckCircle,
  AlertCircle,
  Hourglass,
  MapPin,
  DollarSign,
  Weight,
  Ruler
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import ProjectHeader from '../../components/ProjectHeader'

export default function PhysicalProps() {
  const searchParams = useSearchParams()
  const currentProjectId = searchParams.get('project') || 'cyber-nexus'
  
  const projects = [
    { id: "cyber-nexus", name: "Cyber Nexus" },
    { id: "ocean-depths", name: "Ocean Depths" },
    { id: "space-odyssey", name: "Space Odyssey" }
  ]
  
  const currentProject = projects.find(p => p.id === currentProjectId) || { id: currentProjectId, name: currentProjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentProject={currentProjectId} projects={projects} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ProjectHeader 
          projectName={currentProject.name}
          projectId={currentProjectId}
          pageTitle="Physical Props"
          pageDescription="Manage physical props and equipment for your project."
        />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-900">Physical Props</h2>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Prop
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">Cyber Helmet</CardTitle>
                <CardDescription className="mt-1 text-slate-600">
                  Futuristic helmet with LED lights and HUD display
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-2 mb-4 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" /> Category: Costume
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" /> Sequence: Opening Sequence
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location: Prop Storage A
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Cost: $2,500
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}