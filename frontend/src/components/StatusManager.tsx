'use client'

import React from 'react'

// Status management rules and utilities
export interface StatusRule {
  componentType: string
  hasStatus: boolean
  statusField?: string
  taskAssociationField?: string
}

// Standardized status options used across the platform
export const STANDARD_STATUS_OPTIONS = [
  "N/A",
  "Ready to Start", 
  "Work in Progress",
  "Kickback",
  "Pending Review",
  "Approved",
  "Published"
] as const

export type StandardStatus = typeof STANDARD_STATUS_OPTIONS[number]

// Component types that have status and are subject to status update rules
export const STATUS_MANAGED_COMPONENTS: StatusRule[] = [
  {
    componentType: 'Asset',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'ConceptArt',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'Storyboard',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'Shot',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'Sequence',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'EDL',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'Clip',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'Take',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'VideoReference',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  },
  {
    componentType: 'PhysicalProp',
    hasStatus: true,
    statusField: 'status',
    taskAssociationField: 'associatedTasks'
  }
]

// Task status interface
export interface TaskStatus {
  id: string | number
  status: StandardStatus
  componentId?: string | number
  componentType?: string
  inheritedFromVersion?: {
    versionId: string | number
    versionName: string
    inheritedAt: string
  }
}

// Version status interface for inheritance tracking
export interface VersionStatus {
  id: string | number
  name: string
  status: StandardStatus
  associatedTaskId?: string | number
  createdAt: string
}

// Component status interface
export interface ComponentStatus {
  id: string | number
  type: string
  status: StandardStatus
  associatedTasks: TaskStatus[]
}

/**
 * Status Update Rules:
 * 1. When 1 of the associated tasks is set to "Ready to Start" then set the status of the associated component to "Ready to Start"
 * 2. When 1 of the associated tasks is set to "Work in Progress" then set the status of the associated component to "Work in Progress"
 * 3. When all the associated tasks are set to "Published" then set the status of the associated component to "Published"
 */
export class StatusManager {
  /**
   * Calculate the new status for a component based on its associated tasks
   */
  static calculateComponentStatus(tasks: TaskStatus[]): StandardStatus {
    if (!tasks || tasks.length === 0) {
      return "N/A"
    }

    // Rule 3: If ALL tasks are "Published", set component to "Published"
    if (tasks.every(task => task.status === "Published")) {
      return "Published"
    }

    // Rule 2: If ANY task is "Work in Progress", set component to "Work in Progress"
    if (tasks.some(task => task.status === "Work in Progress")) {
      return "Work in Progress"
    }

    // Rule 1: If ANY task is "Ready to Start", set component to "Ready to Start"
    if (tasks.some(task => task.status === "Ready to Start")) {
      return "Ready to Start"
    }

    // Default fallback logic for other statuses
    const statusPriority: Record<StandardStatus, number> = {
      "Published": 7,
      "Approved": 6,
      "Pending Review": 5,
      "Work in Progress": 4,
      "Kickback": 3,
      "Ready to Start": 2,
      "N/A": 1
    }

    // Find the highest priority status among tasks
    const highestPriorityStatus = tasks.reduce((highest, task) => {
      const taskPriority = statusPriority[task.status] || 0
      const highestPriority = statusPriority[highest] || 0
      return taskPriority > highestPriority ? task.status : highest
    }, "N/A" as StandardStatus)

    return highestPriorityStatus
  }

  /**
   * Update component status based on task changes
   */
  static updateComponentStatus(
    component: ComponentStatus,
    updatedTasks?: TaskStatus[]
  ): ComponentStatus {
    const tasks = updatedTasks || component.associatedTasks
    const newStatus = this.calculateComponentStatus(tasks)
    
    return {
      ...component,
      status: newStatus,
      associatedTasks: tasks
    }
  }

  /**
   * Check if a component type is managed by the status system
   */
  static isStatusManaged(componentType: string): boolean {
    return STATUS_MANAGED_COMPONENTS.some(rule => rule.componentType === componentType)
  }

  /**
   * Get status rule for a component type
   */
  static getStatusRule(componentType: string): StatusRule | undefined {
    return STATUS_MANAGED_COMPONENTS.find(rule => rule.componentType === componentType)
  }

  /**
   * Add a new component type to the status management system
   */
  static addComponentType(rule: StatusRule): void {
    if (!STATUS_MANAGED_COMPONENTS.find(existing => existing.componentType === rule.componentType)) {
      STATUS_MANAGED_COMPONENTS.push(rule)
    }
  }

  /**
   * Get standardized status color for consistent UI display
   */
  static getStatusColor(status: StandardStatus): string {
    switch (status) {
      case 'N/A': return 'bg-gray-100 text-gray-800'
      case 'Ready to Start': return 'bg-blue-100 text-blue-800'
      case 'Work in Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Kickback': return 'bg-red-100 text-red-800'
      case 'Pending Review': return 'bg-orange-100 text-orange-800'
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Published': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  /**
   * Simulate status updates for multiple components when tasks change
   */
  static batchUpdateComponentStatuses(
    components: ComponentStatus[],
    taskUpdates: TaskStatus[]
  ): ComponentStatus[] {
    return components.map(component => {
      // Find tasks that belong to this component
      const componentTasks = taskUpdates.filter(task => 
        task.componentId === component.id && task.componentType === component.type
      )
      
      if (componentTasks.length > 0) {
        // Update the component's task list with new statuses
        const updatedTasks = component.associatedTasks.map(existingTask => {
          const updatedTask = componentTasks.find(update => update.id === existingTask.id)
          return updatedTask || existingTask
        })
        
        return this.updateComponentStatus(component, updatedTasks)
      }
      
      return component
    })
  }

  /**
   * Handle version-to-task status inheritance
   */
  static inheritVersionStatusToTask(
    version: VersionStatus,
    taskId: string | number
  ): TaskStatus {
    return {
      id: taskId,
      status: version.status,
      inheritedFromVersion: {
        versionId: version.id,
        versionName: version.name,
        inheritedAt: new Date().toISOString()
      }
    }
  }

  /**
   * Check if a task status was inherited from a version
   */
  static isStatusInheritedFromVersion(task: TaskStatus): boolean {
    return !!task.inheritedFromVersion
  }

  /**
   * Get version inheritance information for a task
   */
  static getVersionInheritanceInfo(task: TaskStatus): string | null {
    if (!task.inheritedFromVersion) return null
    
    const { versionName, inheritedAt } = task.inheritedFromVersion
    const date = new Date(inheritedAt).toLocaleDateString()
    return `Status inherited from version "${versionName}" on ${date}`
  }

  /**
   * Generate status change notifications
   */
  static generateStatusChangeNotification(
    componentType: string,
    componentName: string,
    oldStatus: StandardStatus,
    newStatus: StandardStatus,
    triggerTask?: string,
    versionInheritance?: { versionName: string }
  ): string {
    if (oldStatus === newStatus) return ''
    
    let trigger = ''
    if (versionInheritance) {
      trigger = ` (inherited from version: ${versionInheritance.versionName})`
    } else if (triggerTask) {
      trigger = ` (triggered by task: ${triggerTask})`
    }
    
    return `${componentType} "${componentName}" status changed from "${oldStatus}" to "${newStatus}"${trigger}`
  }

  /**
   * Batch process version-to-task status inheritance
   */
  static batchInheritVersionStatuses(
    versions: VersionStatus[],
    tasks: TaskStatus[]
  ): TaskStatus[] {
    return tasks.map(task => {
      const associatedVersion = versions.find(v => v.associatedTaskId === task.id)
      if (associatedVersion && associatedVersion.status !== 'N/A') {
        return this.inheritVersionStatusToTask(associatedVersion, task.id)
      }
      return task
    })
  }
}

// React hook for using the status manager
export function useStatusManager() {
  const updateComponentStatus = React.useCallback((
    component: ComponentStatus,
    updatedTasks?: TaskStatus[]
  ) => {
    return StatusManager.updateComponentStatus(component, updatedTasks)
  }, [])

  const calculateStatus = React.useCallback((tasks: TaskStatus[]) => {
    return StatusManager.calculateComponentStatus(tasks)
  }, [])

  const getStatusColor = React.useCallback((status: StandardStatus) => {
    return StatusManager.getStatusColor(status)
  }, [])

  const isStatusManaged = React.useCallback((componentType: string) => {
    return StatusManager.isStatusManaged(componentType)
  }, [])

  const inheritVersionStatus = React.useCallback((
    version: VersionStatus,
    taskId: string | number
  ) => {
    return StatusManager.inheritVersionStatusToTask(version, taskId)
  }, [])

  const isStatusInherited = React.useCallback((task: TaskStatus) => {
    return StatusManager.isStatusInheritedFromVersion(task)
  }, [])

  const getInheritanceInfo = React.useCallback((task: TaskStatus) => {
    return StatusManager.getVersionInheritanceInfo(task)
  }, [])

  const generateNotification = React.useCallback((
    componentType: string,
    componentName: string,
    oldStatus: StandardStatus,
    newStatus: StandardStatus,
    triggerTask?: string,
    versionInheritance?: { versionName: string }
  ) => {
    return StatusManager.generateStatusChangeNotification(
      componentType,
      componentName,
      oldStatus,
      newStatus,
      triggerTask,
      versionInheritance
    )
  }, [])

  return {
    updateComponentStatus,
    calculateStatus,
    getStatusColor,
    isStatusManaged,
    inheritVersionStatus,
    isStatusInherited,
    getInheritanceInfo,
    generateNotification,
    STANDARD_STATUS_OPTIONS,
    STATUS_MANAGED_COMPONENTS
  }
}

// Example usage component (for demonstration)
export default function StatusManagerDemo() {
  const { getStatusColor } = useStatusManager()
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Status Management System</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-slate-700 mb-2">Managed Component Types:</h4>
          <div className="flex flex-wrap gap-2">
            {STATUS_MANAGED_COMPONENTS.map(rule => (
              <span 
                key={rule.componentType}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {rule.componentType}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-slate-700 mb-2">Standard Status Options:</h4>
          <div className="flex flex-wrap gap-2">
            {STANDARD_STATUS_OPTIONS.map(status => (
              <span 
                key={status}
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(status)}`}
              >
                {status}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-medium text-slate-700 mb-2">Status Update Rules:</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>1. When 1 task is "Ready to Start" → Component becomes "Ready to Start"</li>
            <li>2. When 1 task is "Work in Progress" → Component becomes "Work in Progress"</li>
            <li>3. When ALL tasks are "Published" → Component becomes "Published"</li>
          </ul>
        </div>
      </div>
    </div>
  )
}