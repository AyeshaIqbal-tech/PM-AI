'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
}

const sizeMap = {
  sm: '20px',
  md: '40px', 
  lg: '60px',
  xl: '80px'
}

const speedMap = {
  slow: '3s',
  normal: '2s',
  fast: '1s'
}

// 1. Pulse Loader - 3 dots with staggered scale animation
export const PulseLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const dotSize = parseInt(sizeMap[size]) / 4
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('flex items-center justify-center gap-1', className)}
      style={{ height: sizeMap[size], width: `${parseInt(sizeMap[size]) * 2}px` }}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="rounded-full animate-pulse-loader"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: color,
            animationDuration,
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </div>
  )
}

// 2. Wave Loader - 5 bars with wave animation
export const WaveLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const barWidth = parseInt(sizeMap[size]) / 8
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('flex items-end justify-center gap-1', className)}
      style={{ height: sizeMap[size] }}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="bg-current animate-wave-loader"
          style={{
            width: `${barWidth}px`,
            height: '100%',
            color,
            animationDuration,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}

// 3. Orbit Loader - 3 circles orbiting a center point
export const OrbitLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const containerSize = parseInt(sizeMap[size])
  const orbiterSize = containerSize / 6
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative', className)}
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="absolute inset-0 animate-orbit-loader"
          style={{
            animationDuration,
            animationDelay: `${index * (parseFloat(animationDuration) / 3)}s`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: `${orbiterSize}px`,
              height: `${orbiterSize}px`,
              backgroundColor: color,
              top: '0',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      ))}
    </div>
  )
}

// 4. DNA Helix - Double helix rotation effect
export const DNALoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const containerSize = parseInt(sizeMap[size])
  const dotSize = containerSize / 10
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative', className)}
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      <div className="relative w-full h-full animate-dna-spin" style={{ animationDuration }}>
        {[...Array(8)].map((_, index) => (
          <div
            key={`left-${index}`}
            className="absolute rounded-full animate-dna-helix-left"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: color,
              top: `${(index / 7) * 100}%`,
              left: '30%',
              animationDuration: `${parseFloat(animationDuration) * 2}s`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
        {[...Array(8)].map((_, index) => (
          <div
            key={`right-${index}`}
            className="absolute rounded-full animate-dna-helix-right"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: color,
              opacity: 0.7,
              top: `${(index / 7) * 100}%`,
              right: '30%',
              animationDuration: `${parseFloat(animationDuration) * 2}s`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// 5. Morphing Shapes - Square to circle transformation
export const MorphingLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const shapeSize = parseInt(sizeMap[size])
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('flex justify-center items-center', className)}
      style={{ 
        width: `${shapeSize}px`, 
        height: `${shapeSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="animate-morph-loader"
        style={{
          width: `${shapeSize * 0.6}px`,
          height: `${shapeSize * 0.6}px`,
          backgroundColor: color,
          animationDuration,
        }}
      />
    </div>
  )
}

// 6. Gradient Bar - Animated gradient progress
export const GradientBarLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const barHeight = parseInt(sizeMap[size]) / 8
  const barWidth = parseInt(sizeMap[size]) * 3
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative overflow-hidden rounded-full bg-muted', className)}
      style={{ 
        width: `${barWidth}px`, 
        height: `${barHeight}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full animate-gradient-bar-loader"
        style={{
          background: `linear-gradient(90deg, ${color}00 0%, ${color} 50%, ${color}00 100%)`,
          animationDuration,
        }}
      />
    </div>
  )
}

// 7. Particle System - Floating and converging particles
export const ParticleLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const containerSize = parseInt(sizeMap[size])
  const particleSize = containerSize / 12
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative', className)}
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full animate-particle-loader"
          style={{
            width: `${particleSize}px`,
            height: `${particleSize}px`,
            backgroundColor: color,
            animationDuration: `${parseFloat(animationDuration) * 2}s`,
            animationDelay: `${index * 0.2}s`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

// 8. Glitch Effect - Digital glitch animation
export const GlitchLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const containerSize = parseInt(sizeMap[size])
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative', className)}
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="w-full h-full animate-glitch-loader"
        style={{
          backgroundColor: color,
          animationDuration,
        }}
      />
      <div
        className="absolute inset-0 animate-glitch-overlay-1"
        style={{
          backgroundColor: '#ff0000',
          mixBlendMode: 'multiply',
          animationDuration,
        }}
      />
      <div
        className="absolute inset-0 animate-glitch-overlay-2"
        style={{
          backgroundColor: '#00ff00',
          mixBlendMode: 'multiply',
          animationDuration,
        }}
      />
    </div>
  )
}

// 9. Liquid Loader - Blob morphing animation
export const LiquidLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const containerSize = parseInt(sizeMap[size])
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative', className)}
      style={{ 
        width: `${containerSize}px`, 
        height: `${containerSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="w-full h-full rounded-full animate-liquid-loader"
        style={{
          backgroundColor: color,
          animationDuration,
        }}
      />
    </div>
  )
}

// 10. 3D Cube - CSS 3D rotating cube
export const CubeLoader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'hsl(var(--primary))',
  speed = 'normal',
  className
}) => {
  const cubeSize = parseInt(sizeMap[size]) * 0.7
  const animationDuration = speedMap[speed]

  return (
    <div 
      className={cn('relative perspective-1000', className)}
      style={{ 
        width: `${cubeSize}px`, 
        height: `${cubeSize}px` 
      }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="relative preserve-3d animate-cube-loader"
        style={{
          width: `${cubeSize}px`,
          height: `${cubeSize}px`,
          animationDuration,
        }}
      >
        {/* Cube faces */}
        <div
          className="absolute border-2"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            backgroundColor: `${color}20`,
            borderColor: color,
            transform: `translateZ(${cubeSize / 2}px)`,
          }}
        />
        <div
          className="absolute border-2"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            backgroundColor: `${color}20`,
            borderColor: color,
            transform: `rotateY(90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />
        <div
          className="absolute border-2"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            backgroundColor: `${color}20`,
            borderColor: color,
            transform: `rotateY(180deg) translateZ(${cubeSize / 2}px)`,
          }}
        />
        <div
          className="absolute border-2"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            backgroundColor: `${color}20`,
            borderColor: color,
            transform: `rotateY(-90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />
        <div
          className="absolute border-2"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            backgroundColor: `${color}20`,
            borderColor: color,
            transform: `rotateX(90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />
        <div
          className="absolute border-2"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            backgroundColor: `${color}20`,
            borderColor: color,
            transform: `rotateX(-90deg) translateZ(${cubeSize / 2}px)`,
          }}
        />
      </div>
    </div>
  )
}

// Compound component for easy access
export const ModernLoaders = {
  Pulse: PulseLoader,
  Wave: WaveLoader,
  Orbit: OrbitLoader,
  DNA: DNALoader,
  Morphing: MorphingLoader,
  GradientBar: GradientBarLoader,
  Particle: ParticleLoader,
  Glitch: GlitchLoader,
  Liquid: LiquidLoader,
  Cube: CubeLoader,
}