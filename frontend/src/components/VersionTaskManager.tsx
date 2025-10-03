'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowRight, 
  GitBranch, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Info,
  Link as LinkIcon,
  Unlink
} from 'lucide-react'
import { Link } from '@/lib'
import { useStatusManager, TaskStatus, VersionStatus, StandardStatus } from './StatusManager'

interface VersionTaskRelation {
  versionId: string | number
  versionName: string
  versionStatus: StandardStatus
  taskId: string | number
  taskName: string
  taskStatus: StandardStatus
  inheritedAt?: string
  isActive: boolean
}

interface VersionTaskManagerProps {
  relations: VersionTaskRelation[]
  onStatusInheritance?: (versionId: string | number, taskId: string | number, newStatus: StandardStatus) => void
  onRelationToggle?: (versionId: string | number, taskId: string | number, active: boolean) => void
  className?: string
  showInheritanceHistory?: boolean
}

export default function VersionTaskManager({
  relations,
  onStatusInheritance,
  onRelationToggle,
  className = "",
  showInheritanceHistory = true
}: VersionTaskManagerProps) {
  const { getStatusColor, generateNotification } = useStatusManager()
  const [notifications, setNotifications] = useState<string[]>([])

  // Process status inheritance when relations change
  useEffect(() => {
    const newNotifications: string[] = []
    
    relations.forEach(relation => {
      if (relation.isActive && relation.versionStatus !== 'N/A' && relation.versionStatus !== relation.taskStatus) {
        const notification = generateNotification(
          'Task',
          relation.taskName,
          relation.taskStatus,
          relation.versionStatus,
          undefined,
          { versionName: relation.versionName }
        )
        if (notification) {
          newNotifications.push(notification)
          onStatusInheritance?.(relation.versionId, relation.taskId, relation.versionStatus)
        }
      }
    })
    
    if (newNotifications.length > 0) {
      setNotifications(prev => [...prev, ...newNotifications])
      // Auto-clear notifications after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => !newNotifications.includes(n)))
      }, 5000)
    }
  }, [relations, generateNotification, onStatusInheritance])

  const getInheritanceIcon = (relation: VersionTaskRelation) => {
    if (!relation.isActive) return <Unlink className="w-4 h-4 text-gray-400" />
    if (relation.versionStatus === relation.taskStatus) return <CheckCircle className="w-4 h-4 text-green-600" />
    if (relation.versionStatus !== 'N/A') return <ArrowRight className="w-4 h-4 text-blue-600" />
    return <LinkIcon className="w-4 h-4 text-gray-500" />
  }

  const getInheritanceStatus = (relation: VersionTaskRelation) => {
    if (!relation.isActive) return { text: 'Inactive', color: 'bg-gray-100 text-gray-600' }
    if (relation.versionStatus === 'N/A') return { text: 'No Status', color: 'bg-gray-100 text-gray-600' }
    if (relation.versionStatus === relation.taskStatus) return { text: 'Synchronized', color: 'bg-green-100 text-green-700' }
    return { text: 'Pending Inheritance', color: 'bg-yellow-100 text-yellow-700' }
  }

  const activeRelations = relations.filter(r => r.isActive)
  const inactiveRelations = relations.filter(r => !r.isActive)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Status Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <Alert key={index} className="border-blue-200 bg-blue-50">
              <Info className="w-4 h-4" />
              <AlertDescription className="text-blue-800">
                {notification}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Active Relations */}
      {activeRelations.length > 0 && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              Active Version-Task Relations
            </CardTitle>
            <CardDescription>
              Versions that automatically inherit their status to associated tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeRelations.map((relation) => {
                const inheritanceStatus = getInheritanceStatus(relation)
                
                return (
                  <div key={`${relation.versionId}-${relation.taskId}`} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getInheritanceIcon(relation)}
                        <div>
                          <div className="font-medium text-slate-900">
                            <Link to={`/Version?id=${relation.versionId}`} className="text-blue-600 hover:text-blue-800">
                              {relation.versionName}
                            </Link>
                            {' → '}
                            <Link to={`/Task?id=${relation.taskId}`} className="text-blue-600 hover:text-blue-800">
                              {relation.taskName}
                            </Link>
                          </div>
                          {relation.inheritedAt && showInheritanceHistory && (
                            <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              Status inherited on {new Date(relation.inheritedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className={inheritanceStatus.color}>
                        {inheritanceStatus.text}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-slate-600">Version Status:</span>
                          <Badge className={`ml-2 ${getStatusColor(relation.versionStatus)}`}>
                            {relation.versionStatus}
                          </Badge>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                        <div className="text-sm">
                          <span className="text-slate-600">Task Status:</span>
                          <Badge className={`ml-2 ${getStatusColor(relation.taskStatus)}`}>
                            {relation.taskStatus}
                          </Badge>
                        </div>
                      </div>
                      
                      {onRelationToggle && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onRelationToggle(relation.versionId, relation.taskId, false)}
                        >
                          <Unlink className="w-4 h-4 mr-1" />
                          Deactivate
                        </Button>
                      )}
                    </div>
                    
                    {relation.versionStatus !== relation.taskStatus && relation.versionStatus !== 'N/A' && (
                      <Alert className="mt-3 border-yellow-200 bg-yellow-50">
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription className="text-yellow-800">
                          Task will inherit "{relation.versionStatus}" status from version "{relation.versionName}"
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inactive Relations */}
      {inactiveRelations.length > 0 && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Unlink className="w-5 h-5 text-gray-500" />
              Inactive Relations
            </CardTitle>
            <CardDescription>
              Version-task relations that are not currently inheriting status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inactiveRelations.map((relation) => (
                <div key={`${relation.versionId}-${relation.taskId}`} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Unlink className="w-4 h-4 text-gray-400" />
                    <div className="text-sm text-slate-600">
                      <Link to={`/Version?id=${relation.versionId}`} className="text-slate-700 hover:text-slate-900">
                        {relation.versionName}
                      </Link>
                      {' ↔ '}
                      <Link to={`/Task?id=${relation.taskId}`} className="text-slate-700 hover:text-slate-900">
                        {relation.taskName}
                      </Link>
                    </div>
                  </div>
                  
                  {onRelationToggle && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRelationToggle(relation.versionId, relation.taskId, true)}
                    >
                      <LinkIcon className="w-4 h-4 mr-1" />
                      Activate
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {relations.length === 0 && (
        <Card className="bg-white shadow-lg">
          <CardContent className="text-center py-12">
            <GitBranch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No Version-Task Relations</h3>
            <p className="text-slate-600">
              Create versions and associate them with tasks to enable automatic status inheritance.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Information Panel */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
            <Info className="w-5 h-5" />
            How Version-Task Status Inheritance Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
              <div>
                <strong>Automatic Inheritance:</strong> When you create a version and associate it with a task, 
                the task automatically inherits the version's status (unless the version status is "N/A").
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 text-blue-600" />
              <div>
                <strong>Real-time Updates:</strong> Status changes in versions are immediately reflected 
                in their associated tasks, keeping your workflow synchronized.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <GitBranch className="w-4 h-4 mt-0.5 text-blue-600" />
              <div>
                <strong>Flexible Control:</strong> You can activate or deactivate inheritance relationships 
                as needed to maintain control over your project workflow.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}