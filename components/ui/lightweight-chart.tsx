"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ChartData {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: ChartData[]
  height?: number
  className?: string
  showLabels?: boolean
  showValues?: boolean
}

export function SimpleBarChart({ 
  data, 
  height = 200, 
  className,
  showLabels = true,
  showValues = true 
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end">
              {showValues && (
                <span className="text-xs font-medium mb-1">{item.value}</span>
              )}
              <div 
                className="w-full bg-primary/80 hover:bg-primary transition-colors rounded-t"
                style={{ 
                  height: `${barHeight}%`,
                  backgroundColor: item.color 
                }}
              />
              {showLabels && (
                <span className="text-xs text-muted-foreground mt-2 truncate w-full text-center">
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface SimpleLineChartProps {
  data: Array<{ x: string | number; y: number }>
  height?: number
  className?: string
  color?: string
  showDots?: boolean
}

export function SimpleLineChart({ 
  data, 
  height = 200, 
  className,
  color = '#3b82f6',
  showDots = true 
}: SimpleLineChartProps) {
  const maxY = Math.max(...data.map(d => d.y))
  const minY = Math.min(...data.map(d => d.y))
  const range = maxY - minY || 1
  
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((point.y - minY) / range) * 100
    return { x, y, value: point.y, label: point.x }
  })
  
  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
  
  return (
    <div className={cn("w-full relative", className)} style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <g className="stroke-muted opacity-20">
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} strokeWidth="0.5" />
          ))}
        </g>
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Dots */}
        {showDots && points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill={color}
            vectorEffect="non-scaling-stroke"
          >
            <title>{`${point.label}: ${point.value}`}</title>
          </circle>
        ))}
      </svg>
      
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground -ml-8">
        <span>{maxY}</span>
        <span>{Math.round((maxY + minY) / 2)}</span>
        <span>{minY}</span>
      </div>
    </div>
  )
}

interface SimplePieChartProps {
  data: Array<{ name: string; value: number; color: string }>
  size?: number
  className?: string
  showLabels?: boolean
}

export function SimplePieChart({ 
  data, 
  size = 200, 
  className,
  showLabels = true 
}: SimplePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let startAngle = -90
  
  const segments = data.map(item => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const segment = {
      ...item,
      percentage,
      startAngle,
      endAngle: startAngle + angle
    }
    startAngle += angle
    return segment
  })
  
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    }
  }
  
  const createPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(50, 50, 40, startAngle)
    const end = polarToCartesian(50, 50, 40, endAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    
    return [
      "M", 50, 50,
      "L", start.x, start.y,
      "A", 40, 40, 0, largeArcFlag, 1, end.x, end.y,
      "Z"
    ].join(" ")
  }
  
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {segments.map((segment, index) => (
          <path
            key={index}
            d={createPath(segment.startAngle, segment.endAngle)}
            fill={segment.color}
            className="hover:opacity-80 transition-opacity"
          >
            <title>{`${segment.name}: ${segment.percentage.toFixed(1)}%`}</title>
          </path>
        ))}
      </svg>
      
      {showLabels && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      )}
    </div>
  )
}

interface SimpleAreaChartProps {
  data: Array<{ x: string | number; y: number }>
  height?: number
  className?: string
  color?: string
  fillOpacity?: number
}

export function SimpleAreaChart({ 
  data, 
  height = 200, 
  className,
  color = '#3b82f6',
  fillOpacity = 0.2
}: SimpleAreaChartProps) {
  const maxY = Math.max(...data.map(d => d.y))
  const minY = Math.min(...data.map(d => d.y))
  const range = maxY - minY || 1
  
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((point.y - minY) / range) * 100
    return { x, y, value: point.y, label: point.x }
  })
  
  const linePathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
  
  const areaPathData = `${linePathData} L 100 100 L 0 100 Z`
  
  return (
    <div className={cn("w-full relative", className)} style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Area fill */}
        <path
          d={areaPathData}
          fill={color}
          fillOpacity={fillOpacity}
        />
        
        {/* Line */}
        <path
          d={linePathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      
      {/* X-axis labels */}
      {data.length <= 12 && (
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((point, index) => (
            <span key={index}>{point.x}</span>
          ))}
        </div>
      )}
    </div>
  )
}