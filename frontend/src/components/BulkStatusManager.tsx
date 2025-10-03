'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { 
  Package, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Copy,
  Plus,
  ArrowRight,
  Info
} from 'lucide-react'
import { useStatusPreferences } from './StatusPreferences'

interface ComponentItem {
  id: string | number
  name: string
  type: string
  currentStatus: string
  hasExistingVersions: boolean
  existingFiles?: Array<{
    id: string
    name: string
    size: string
    type: string
  }>
}

interface BulkStatusManagerProps {
  selectedComponents: ComponentItem[]
  onStatusUpdate: (componentId: string | number, newStatus: string, versionData?: any) => void
  onCancel: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

interface VersionCreationProgress {
  componentId: string | number
  status: 'pending' | 'creating' | 'completed' | 'error'
  progress: number
  versionId?: string
  error?: string
}

export default function BulkStatusManager({
  selectedComponents,
  onStatusUpdate,
  onCancel,
  isOpen,
  onOpenChange
}: BulkStatusManagerProps) {
  const { getStatusOptions, getStatusColor, getStatusDescription } = useStatusPreferences()
  
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [createVersions, setCreateVersions] = useState(true)
  const [inheritFiles, setInheritFiles] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState<VersionCreationProgress[]>([])
  const [showProgress, setShowProgress] = useState(false)
  const [completed, setCompleted] = useState(false)

  // Calculate components that will have versions created
  const componentsWithVersions = selectedComponents.filter(component => 
    createVersions && component.hasExistingVersions
  )

  const componentsWithoutVersions = selectedComponents.filter(component => 
    createVersions && !component.hasExistingVersions
  )

  const totalFilesToInherit = componentsWithVersions.reduce((total, component) => 
    total + (component.existingFiles?.length || 0), 0
  )

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return

    setIsProcessing(true)
    setShowProgress(true)
    setCompleted(false)

    // Initialize progress tracking
    const initialProgress: VersionCreationProgress[] = selectedComponents.map(component => ({
      componentId: component.id,
      status: 'pending',
      progress: 0
    }))
    setProgress(initialProgress)

    try {
      // Process each component
      for (let i = 0; i < selectedComponents.length; i++) {
        const component = selectedComponents[i]
        
        // Update progress to creating
        setProgress(prev => prev.map(p => 
          p.componentId === component.id 
            ? { ...p, status: 'creating', progress: 25 }
            : p
        ))

        // Simulate version creation process
        await new Promise(resolve => setTimeout(resolve, 500))

        let versionData = null

        if (createVersions) {
          // Create version data
          const versionId = `v${Date.now()}-${component.id}`
          
          versionData = {
            id: versionId,
            name: `${component.name} - Status Update v${new Date().toISOString().split('T')[0]}`,
            description: `Version created automatically when setting status to "${selectedStatus}" via bulk operation.`,
            status: selectedStatus,
            associatedComponent: {
              id: component.id,
              name: component.name,
              type: component.type
            },
            createdAt: new Date().toISOString(),
            createdBy: 'Current User',
            creationMethod: 'bulk_status_update',
            inheritedFiles: inheritFiles && component.existingFiles ? component.existingFiles : [],
            metadata: {
              bulkOperation: true,
              previousStatus: component.currentStatus,
              newStatus: selectedStatus,
              filesInherited: inheritFiles && component.existingFiles ? component.existingFiles.length : 0
            }
          }

          // Update progress to file inheritance
          setProgress(prev => prev.map(p => 
            p.componentId === component.id 
              ? { ...p, progress: 50 }
              : p
          ))

          // Simulate file inheritance process
          if (inheritFiles && component.existingFiles) {
            await new Promise(resolve => setTimeout(resolve, 300))
          }

          // Update progress to finalizing
          setProgress(prev => prev.map(p => 
            p.componentId === component.id 
              ? { ...p, progress: 75 }
              : p
          ))

          await new Promise(resolve => setTimeout(resolve, 200))
        }

        // Complete the status update
        onStatusUpdate(component.id, selectedStatus, versionData)

        // Mark as completed
        setProgress(prev => prev.map(p => 
          p.componentId === component.id 
            ? { 
                ...p, 
                status: 'completed', 
                progress: 100,
                versionId: versionData?.id
              }
            : p
        ))

        await new Promise(resolve => setTimeout(resolve, 100))
      }

      setCompleted(true)
      
      // Auto-close after success
      setTimeout(() => {
        handleClose()
      }, 2000)

    } catch (error) {
      console.error('Error during bulk status update:', error)
      setProgress(prev => prev.map(p => 
        p.status !== 'completed' 
          ? { ...p, status: 'error', error: 'Failed to update status' }
          : p
      ))
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setSelectedStatus('')
    setCreateVersions(true)
    setInheritFiles(true)
    setIsProcessing(false)
    setProgress([])
    setShowProgress(false)
    setCompleted(false)
    onOpenChange(false)
  }

  const getProgressIcon = (status: VersionCreationProgress['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-500" />
      case 'creating':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getProgressColor = (status: VersionCreationProgress['status']) => {
    switch (status) {
      case 'creating':
        return 'bg-blue-600'
      case 'completed':
        return 'bg-green-600'
      case 'error':
        return 'bg-red-600'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Bulk Status Update
          </DialogTitle>
          <DialogDescription>
            Update status for {selectedComponents.length} selected component{selectedComponents.length !== 1 ? 's' : ''}
            {createVersions && ' with automatic version creation'}
          </DialogDescription>
        </DialogHeader>

        {!showProgress ? (
          <div className="space-y-6 py-4">
            {/* Status Selection */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                New Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status..." />
                </SelectTrigger>
                <SelectContent>
                  {getStatusOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(option.value).split(' ')[0]}`} />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedStatus && (
                <p className="text-sm text-slate-600 mt-1">
                  {getStatusDescription(selectedStatus)}
                </p>
              )}
            </div>

            {/* Version Creation Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="createVersions"
                  checked={createVersions}
                  onChange={(e) => setCreateVersions(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="createVersions" className="text-sm font-medium text-slate-700">
                  Create new versions for components
                </label>
              </div>
              
              {createVersions && (
                <div className="ml-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="inheritFiles"
                      checked={inheritFiles}
                      onChange={(e) => setInheritFiles(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="inheritFiles" className="text-sm font-medium text-slate-700">
                      Inherit files from previous versions
                    </label>
                  </div>
                  
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="w-4 h-4" />
                    <AlertDescription className="text-blue-800">
                      New versions will be created automatically with the description: 
                      "Version created automatically when setting status to [status] via bulk operation."
                      {inheritFiles && totalFilesToInherit > 0 && (
                        <span> Files from previous versions will be inherited ({totalFilesToInherit} files total).</span>
                      )}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>

            {/* Component Summary */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">
                Components to Update ({selectedComponents.length})
              </label>
              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
                {selectedComponents.map((component) => (
                  <div key={component.id} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 text-sm">{component.name}</div>
                        <div className="text-xs text-slate-600">{component.type}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(component.currentStatus)}>
                        {component.currentStatus}
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      {selectedStatus && (
                        <Badge className={getStatusColor(selectedStatus)}>
                          {selectedStatus}
                        </Badge>
                      )}
                      {createVersions && component.hasExistingVersions && inheritFiles && component.existingFiles && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Copy className="w-3 h-3" />
                          {component.existingFiles.length} files
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Information */}
            {createVersions && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedComponents.length}</div>
                  <div className="text-sm text-slate-600">Versions to Create</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{componentsWithVersions.length}</div>
                  <div className="text-sm text-slate-600">With Existing Files</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{totalFilesToInherit}</div>
                  <div className="text-sm text-slate-600">Files to Inherit</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Progress View */
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {completed ? 'Bulk Update Completed!' : 'Processing Bulk Status Update...'}
              </h3>
              <p className="text-slate-600">
                {completed 
                  ? `Successfully updated ${selectedComponents.length} component${selectedComponents.length !== 1 ? 's' : ''}`
                  : `Updating status and ${createVersions ? 'creating versions for' : 'processing'} ${selectedComponents.length} component${selectedComponents.length !== 1 ? 's' : ''}...`
                }
              </p>
            </div>

            {/* Progress List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {progress.map((item) => {
                const component = selectedComponents.find(c => c.id === item.componentId)
                if (!component) return null
                
                return (
                  <div key={item.componentId} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getProgressIcon(item.status)}
                        <div>
                          <div className="font-medium text-slate-900 text-sm">{component.name}</div>
                          <div className="text-xs text-slate-600">{component.type}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">
                          {item.status === 'pending' && 'Waiting...'}
                          {item.status === 'creating' && 'Creating version...'}
                          {item.status === 'completed' && 'Completed'}
                          {item.status === 'error' && 'Error'}
                        </div>
                        {item.versionId && (
                          <div className="text-xs text-slate-500">Version: {item.versionId}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.status)}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    
                    {item.error && (
                      <div className="mt-2 text-sm text-red-600">{item.error}</div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {completed && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  All components have been successfully updated to "{selectedStatus}" status.
                  {createVersions && ` New versions have been created with ${inheritFiles ? 'inherited files' : 'no files'}.`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter>
          {!showProgress ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleStatusUpdate}
                disabled={!selectedStatus || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Update Status {createVersions && '& Create Versions'}
              </Button>
            </>
          ) : (
            <>
              {!completed && (
                <Button variant="outline" disabled>
                  Processing...
                </Button>
              )}
              {completed && (
                <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Done
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}