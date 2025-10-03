'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Edit, 
  Save, 
  X, 
  Plus, 
  Tag, 
  Calendar, 
  User, 
  FileText,
  Settings
} from 'lucide-react'
import { useStatusPreferences } from './StatusPreferences'

interface MetadataField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'tags'
  value: any
  options?: string[]
  required?: boolean
  placeholder?: string
}

interface MetadataEditorProps {
  title?: string
  description?: string
  fields: MetadataField[]
  onSave: (updatedFields: Record<string, any>) => void
  onCancel?: () => void
  triggerButton?: React.ReactNode
  isInline?: boolean
  className?: string
}

export default function MetadataEditor({
  title = "Edit Metadata",
  description = "Update metadata information",
  fields,
  onSave,
  onCancel,
  triggerButton,
  isInline = false,
  className = ""
}: MetadataEditorProps) {
  
  // Use centralized status preferences system
  const { getStatusValues } = useStatusPreferences()

  const [isOpen, setIsOpen] = useState(false)
  const [editedFields, setEditedFields] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {}
    fields.forEach(field => {
      initialValues[field.key] = field.value
    })
    return initialValues
  })
  const [newTag, setNewTag] = useState('')

  const handleFieldChange = (key: string, value: any) => {
    setEditedFields(prev => ({ ...prev, [key]: value }))
  }

  const handleAddTag = (fieldKey: string) => {
    if (newTag.trim()) {
      const currentTags = editedFields[fieldKey] || []
      if (!currentTags.includes(newTag.trim())) {
        handleFieldChange(fieldKey, [...currentTags, newTag.trim()])
      }
      setNewTag('')
    }
  }

  const handleRemoveTag = (fieldKey: string, tagToRemove: string) => {
    const currentTags = editedFields[fieldKey] || []
    handleFieldChange(fieldKey, currentTags.filter((tag: string) => tag !== tagToRemove))
  }

  const handleSave = () => {
    onSave(editedFields)
    setIsOpen(false)
  }

  const handleCancel = () => {
    // Reset to original values
    const originalValues: Record<string, any> = {}
    fields.forEach(field => {
      originalValues[field.key] = field.value
    })
    setEditedFields(originalValues)
    setIsOpen(false)
    onCancel?.()
  }

  const renderField = (field: MetadataField) => {
    const value = editedFields[field.key]

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        )

      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="mt-1 resize-none"
          />
        )

      case 'select': {
        // Use centralized status preferences if field is for status and no custom options provided
        const selectOptions = field.key.toLowerCase().includes('status') && !field.options 
          ? getStatusValues() 
          : field.options || []
          
        return (
          <Select 
            value={value || ''} 
            onValueChange={(newValue) => handleFieldChange(field.key, newValue)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="mt-1"
          />
        )

      case 'tags':
        return (
          <div className="mt-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              {(value || []).map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs flex items-center gap-1">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(field.key, tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag(field.key)
                  }
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleAddTag(field.key)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        )
    }
  }

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-4 h-4 text-slate-500" />
      case 'textarea': return <FileText className="w-4 h-4 text-slate-500" />
      case 'select': return <Settings className="w-4 h-4 text-slate-500" />
      case 'date': return <Calendar className="w-4 h-4 text-slate-500" />
      case 'tags': return <Tag className="w-4 h-4 text-slate-500" />
      default: return <FileText className="w-4 h-4 text-slate-500" />
    }
  }

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Edit className="w-4 h-4 mr-2" />
      Edit Metadata
    </Button>
  )

  if (isInline) {
    return (
      <Card className={`bg-white shadow-lg ${className}`}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Edit className="w-5 h-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key} className="text-slate-700 font-medium flex items-center gap-2">
                {getFieldIcon(field.type)}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {fields.map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key} className="text-slate-700 font-medium flex items-center gap-2">
                {getFieldIcon(field.type)}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}