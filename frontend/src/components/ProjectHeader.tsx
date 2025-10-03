'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Image, Edit } from 'lucide-react'
import MetadataEditor from './MetadataEditor'

interface MetadataField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'tags'
  value: any
  options?: string[]
  required?: boolean
  placeholder?: string
}

interface ProjectHeaderProps {
  projectName: string
  title: string
  description: string
  showChangeImageButton?: boolean
  onChangeImage?: () => void
  showMetadataEditor?: boolean
  metadataFields?: MetadataField[]
  onMetadataSave?: (updatedFields: Record<string, any>) => void
  children?: React.ReactNode
}

export default function ProjectHeader({ 
  projectName, 
  title, 
  description, 
  showChangeImageButton = false,
  onChangeImage,
  showMetadataEditor = false,
  metadataFields = [],
  onMetadataSave,
  children 
}: ProjectHeaderProps) {
  const getProjectBackgroundImage = (projectName: string) => {
    switch (projectName) {
      case 'Cyber Nexus':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/4c9119c6-1ee5-456c-b3c8-e432554d08c2'
      case 'Ocean Depths':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/49440c97-cbcd-45cd-acf2-11a20883b0bf'
      case 'Space Odyssey':
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/3101fea8-ddec-455e-b08f-60475173808c'
      default:
        return 'https://uxcanvas.ai/api/generated-images/d4dc8c64-5e7b-4927-853b-1ce5a65cd255/4c9119c6-1ee5-456c-b3c8-e432554d08c2'
    }
  }

  return (
    <div className="relative mb-8 rounded-xl overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${getProjectBackgroundImage(projectName)})` 
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="text-sm font-medium text-white/80 bg-white/20 px-3 py-1 rounded-full">
                {projectName}
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-1">{title}</h1>
            <p className="text-white/90">{description}</p>
          </div>
          <div className="flex items-center gap-3">
            {showChangeImageButton && (
              <Button variant="secondary" size="sm" onClick={onChangeImage}>
                <Image className="w-4 h-4 mr-2" />
                Change Image
              </Button>
            )}
            {showMetadataEditor && metadataFields.length > 0 && onMetadataSave && (
              <MetadataEditor
                title="Edit Metadata"
                description="Update project metadata information"
                fields={metadataFields}
                onSave={onMetadataSave}
                triggerButton={
                  <Button variant="secondary" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Metadata
                  </Button>
                }
              />
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}