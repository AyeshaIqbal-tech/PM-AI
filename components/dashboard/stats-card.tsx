"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: LucideIcon
  gradient?: string
  prefix?: string
  suffix?: string
  animate?: boolean
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  gradient = 'from-primary to-blue-600',
  prefix = '',
  suffix = '',
  animate = true,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value)

  useEffect(() => {
    if (!animate || typeof value !== 'number') {
      setDisplayValue(value)
      return
    }

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, animate])

  const getTrendIcon = () => {
    if (!change) return <Minus className="w-4 h-4" />
    return change > 0 ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    )
  }

  const getTrendColor = () => {
    if (!change) return 'text-muted-foreground'
    return change > 0 ? 'text-success' : 'text-destructive'
  }

  return (
    <Card className="relative overflow-hidden card-hover">
      <div className={cn(
        "absolute inset-0 opacity-10 bg-gradient-to-br",
        gradient
      )} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-lg bg-gradient-to-br",
          gradient
        )}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-fade-up">
          {prefix}
          {typeof displayValue === 'number' 
            ? displayValue.toLocaleString() 
            : displayValue}
          {suffix}
        </div>
        {change !== undefined && (
          <div className={cn("flex items-center space-x-1 text-xs mt-2", getTrendColor())}>
            {getTrendIcon()}
            <span className="font-medium">
              {Math.abs(change)}%
            </span>
            {changeLabel && (
              <span className="text-muted-foreground">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}