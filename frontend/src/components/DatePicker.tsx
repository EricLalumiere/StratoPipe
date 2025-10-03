'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DatePickerProps {
  value: Date
  onChange: (date: Date) => void
  className?: string
}

export default function DatePicker({ value, onChange, className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(new Date(value))
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setViewDate(newDate)
  }

  const handleYearChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate)
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setViewDate(newDate)
  }

  const handleDateSelect = (date: Date) => {
    onChange(date)
    setIsOpen(false)
  }

  const generateCalendarDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const isCurrentMonth = date.getMonth() === month
      const isSelected = date.getMonth() === value.getMonth() && date.getFullYear() === value.getFullYear()
      const isToday = date.toDateString() === new Date().toDateString()
      
      days.push(
        <button
          key={date.toISOString()}
          onClick={() => handleDateSelect(new Date(date.getFullYear(), date.getMonth(), 1))}
          className={`w-8 h-8 text-sm rounded-md transition-colors ${
            isCurrentMonth 
              ? isSelected
                ? 'bg-blue-600 text-white font-semibold'
                : isToday
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-900 hover:bg-gray-100'
              : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          {date.getDate()}
        </button>
      )
    }
    
    return days
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-40 justify-start"
      >
        <Calendar className="w-4 h-4 mr-2" />
        {value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-80">
          {/* Year Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleYearChange('prev')}
              className="p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-lg font-semibold text-gray-900">
              {viewDate.getFullYear()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleYearChange('next')}
              className="p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMonthChange('prev')}
              className="p-1"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h4 className="text-md font-medium text-gray-700">
              {viewDate.toLocaleDateString('en-US', { month: 'long' })}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMonthChange('next')}
              className="p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {generateCalendarDays()}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-2 border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateSelect(new Date())}
              className="flex-1 text-blue-600 hover:text-blue-700"
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}