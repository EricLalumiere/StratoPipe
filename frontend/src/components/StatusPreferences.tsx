'use client'

import React from 'react'

/**
 * CENTRALIZED STATUS PREFERENCES SYSTEM
 * 
 * This file contains all status configurations used across the platform.
 * Engineers can easily customize status options by modifying this single file.
 * All dropdowns and status-related components will automatically use these preferences.
 */

// Core status configuration interface
export interface StatusOption {
  value: string
  label: string
  color: string
  description?: string
  category?: 'workflow' | 'review' | 'completion'
}

// Main status preferences configuration
export const STATUS_PREFERENCES: StatusOption[] = [
  {
    value: 'N/A',
    label: 'N/A',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    description: 'No status assigned or not applicable',
    category: 'workflow'
  },
  {
    value: 'Ready to Start',
    label: 'Ready to Start',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Ready to begin work',
    category: 'workflow'
  },
  {
    value: 'Work in Progress',
    label: 'Work in Progress',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Currently being worked on',
    category: 'workflow'
  },
  {
    value: 'Kickback',
    label: 'Kickback',
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Returned for revisions or corrections',
    category: 'review'
  },
  {
    value: 'Pending Review',
    label: 'Pending Review',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Awaiting review or approval',
    category: 'review'
  },
  {
    value: 'Approved',
    label: 'Approved',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Approved and ready for next stage',
    category: 'completion'
  },
  {
    value: 'Published',
    label: 'Published',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Final and published',
    category: 'completion'
  }
]

// Legacy status mappings for backward compatibility
export const LEGACY_STATUS_MAPPINGS: Record<string, string> = {
  'pending': 'Ready to Start',
  'in-progress': 'Work in Progress',
  'completed': 'Approved',
  'blocked': 'Kickback',
  'draft': 'Work in Progress',
  'final': 'Published',
  'review': 'Pending Review'
}

// Status categories for filtering and organization
export const STATUS_CATEGORIES = {
  workflow: STATUS_PREFERENCES.filter(s => s.category === 'workflow'),
  review: STATUS_PREFERENCES.filter(s => s.category === 'review'),
  completion: STATUS_PREFERENCES.filter(s => s.category === 'completion')
}

// Utility functions for status management
export class StatusPreferencesManager {
  /**
   * Get all available status options
   */
  static getAllStatuses(): StatusOption[] {
    return STATUS_PREFERENCES
  }

  /**
   * Get status options as simple string array (for backward compatibility)
   */
  static getStatusValues(): string[] {
    return STATUS_PREFERENCES.map(status => status.value)
  }

  /**
   * Get status options as label-value pairs for dropdowns
   */
  static getStatusOptions(): Array<{ label: string; value: string }> {
    return STATUS_PREFERENCES.map(status => ({
      label: status.label,
      value: status.value
    }))
  }

  /**
   * Get status color class by value
   */
  static getStatusColor(statusValue: string): string {
    const status = STATUS_PREFERENCES.find(s => s.value === statusValue)
    return status?.color || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  /**
   * Get status description by value
   */
  static getStatusDescription(statusValue: string): string {
    const status = STATUS_PREFERENCES.find(s => s.value === statusValue)
    return status?.description || ''
  }

  /**
   * Get status by category
   */
  static getStatusesByCategory(category: 'workflow' | 'review' | 'completion'): StatusOption[] {
    return STATUS_PREFERENCES.filter(s => s.category === category)
  }

  /**
   * Convert legacy status to new status format
   */
  static convertLegacyStatus(legacyStatus: string): string {
    return LEGACY_STATUS_MAPPINGS[legacyStatus.toLowerCase()] || legacyStatus
  }

  /**
   * Validate if a status value is valid
   */
  static isValidStatus(statusValue: string): boolean {
    return STATUS_PREFERENCES.some(s => s.value === statusValue)
  }

  /**
   * Get next logical status in workflow
   */
  static getNextStatus(currentStatus: string): string | null {
    const statusOrder = [
      'N/A',
      'Ready to Start',
      'Work in Progress',
      'Pending Review',
      'Approved',
      'Published'
    ]
    
    const currentIndex = statusOrder.indexOf(currentStatus)
    if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
      return statusOrder[currentIndex + 1]
    }
    
    return null
  }

  /**
   * Get previous logical status in workflow
   */
  static getPreviousStatus(currentStatus: string): string | null {
    const statusOrder = [
      'N/A',
      'Ready to Start',
      'Work in Progress',
      'Pending Review',
      'Approved',
      'Published'
    ]
    
    const currentIndex = statusOrder.indexOf(currentStatus)
    if (currentIndex > 0) {
      return statusOrder[currentIndex - 1]
    }
    
    return null
  }

  /**
   * Check if status represents completion
   */
  static isCompletedStatus(statusValue: string): boolean {
    return ['Approved', 'Published'].includes(statusValue)
  }

  /**
   * Check if status represents work in progress
   */
  static isActiveStatus(statusValue: string): boolean {
    return ['Work in Progress', 'Pending Review'].includes(statusValue)
  }

  /**
   * Check if status represents a problem state
   */
  static isProblemStatus(statusValue: string): boolean {
    return ['Kickback'].includes(statusValue)
  }

  /**
   * Get status priority for sorting (higher number = higher priority)
   */
  static getStatusPriority(statusValue: string): number {
    const priorities: Record<string, number> = {
      'Kickback': 10,           // Highest priority - needs immediate attention
      'Pending Review': 9,      // High priority - waiting for review
      'Work in Progress': 8,    // Active work
      'Ready to Start': 7,      // Ready to begin
      'Approved': 6,            // Completed work
      'Published': 5,           // Final state
      'N/A': 1                  // Lowest priority
    }
    
    return priorities[statusValue] || 0
  }
}

// React hook for using status preferences
export function useStatusPreferences() {
  const getAllStatuses = React.useCallback(() => {
    return StatusPreferencesManager.getAllStatuses()
  }, [])

  const getStatusValues = React.useCallback(() => {
    return StatusPreferencesManager.getStatusValues()
  }, [])

  const getStatusOptions = React.useCallback(() => {
    return StatusPreferencesManager.getStatusOptions()
  }, [])

  const getStatusColor = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.getStatusColor(statusValue)
  }, [])

  const getStatusDescription = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.getStatusDescription(statusValue)
  }, [])

  const getStatusesByCategory = React.useCallback((category: 'workflow' | 'review' | 'completion') => {
    return StatusPreferencesManager.getStatusesByCategory(category)
  }, [])

  const convertLegacyStatus = React.useCallback((legacyStatus: string) => {
    return StatusPreferencesManager.convertLegacyStatus(legacyStatus)
  }, [])

  const isValidStatus = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.isValidStatus(statusValue)
  }, [])

  const getNextStatus = React.useCallback((currentStatus: string) => {
    return StatusPreferencesManager.getNextStatus(currentStatus)
  }, [])

  const getPreviousStatus = React.useCallback((currentStatus: string) => {
    return StatusPreferencesManager.getPreviousStatus(currentStatus)
  }, [])

  const isCompletedStatus = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.isCompletedStatus(statusValue)
  }, [])

  const isActiveStatus = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.isActiveStatus(statusValue)
  }, [])

  const isProblemStatus = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.isProblemStatus(statusValue)
  }, [])

  const getStatusPriority = React.useCallback((statusValue: string) => {
    return StatusPreferencesManager.getStatusPriority(statusValue)
  }, [])

  return {
    getAllStatuses,
    getStatusValues,
    getStatusOptions,
    getStatusColor,
    getStatusDescription,
    getStatusesByCategory,
    convertLegacyStatus,
    isValidStatus,
    getNextStatus,
    getPreviousStatus,
    isCompletedStatus,
    isActiveStatus,
    isProblemStatus,
    getStatusPriority,
    STATUS_PREFERENCES,
    STATUS_CATEGORIES
  }
}

// Default export for easy importing
export default StatusPreferencesManager