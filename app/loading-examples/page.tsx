'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ModernLoaders } from '@/components/ui/modern-loaders'
import { LoadingOverlays } from '@/components/ui/loading-overlay'
import { ProgressiveLoaders } from '@/components/ui/progressive-loader'
import { useLoadingProgress, useSingleLoadingProgress } from '@/hooks/use-loading-progress'
import { 
  Moon, 
  Sun, 
  Copy, 
  Check, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Palette,
  Gauge,
  Monitor
} from 'lucide-react'

export default function LoadingExamplesPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedLoader, setSelectedLoader] = useState('pulse')
  const [loaderSize, setLoaderSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')
  const [loaderSpeed, setLoaderSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [loaderColor, setLoaderColor] = useState('#3b82f6')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showOverlayDemo, setShowOverlayDemo] = useState(false)
  const [showProgressiveDemo, setShowProgressiveDemo] = useState(false)

  // Demo states
  const [progressiveStages, setProgressiveStages] = useState(
    ProgressiveLoaders.createStages([
      { id: 'init', title: 'Initializing', description: 'Setting up the environment...', duration: 2000 },
      { id: 'fetch', title: 'Fetching Data', description: 'Retrieving information from server...', duration: 3000 },
      { id: 'process', title: 'Processing', description: 'Analyzing and processing data...', duration: 2000 },
      { id: 'complete', title: 'Finalizing', description: 'Preparing results...', duration: 1000 }
    ])
  )

  const { 
    isLoading: progressLoading,
    startLoading,
    completeLoading,
    errorLoading,
    resetLoading
  } = useSingleLoadingProgress('Demo Operation')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const loaderComponents = {
    pulse: ModernLoaders.Pulse,
    wave: ModernLoaders.Wave,
    orbit: ModernLoaders.Orbit,
    dna: ModernLoaders.DNA,
    morphing: ModernLoaders.Morphing,
    gradientBar: ModernLoaders.GradientBar,
    particle: ModernLoaders.Particle,
    glitch: ModernLoaders.Glitch,
    liquid: ModernLoaders.Liquid,
    cube: ModernLoaders.Cube
  }

  const codeExamples = {
    pulse: `<PulseLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    wave: `<WaveLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    orbit: `<OrbitLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    dna: `<DNALoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    morphing: `<MorphingLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    gradientBar: `<GradientBarLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    particle: `<ParticleLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    glitch: `<GlitchLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    liquid: `<LiquidLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`,
    cube: `<CubeLoader size="${loaderSize}" speed="${loaderSpeed}" color="${loaderColor}" />`
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const startProgressiveDemo = () => {
    setShowProgressiveDemo(true)
    setProgressiveStages(prev => prev.map((stage, index) => ({
      ...stage,
      status: index === 0 ? 'loading' : 'pending'
    })))

    // Simulate progression
    setTimeout(() => {
      setProgressiveStages(prev => prev.map((stage, index) => ({
        ...stage,
        status: index === 0 ? 'completed' : index === 1 ? 'loading' : 'pending'
      })))
    }, 1500)

    setTimeout(() => {
      setProgressiveStages(prev => prev.map((stage, index) => ({
        ...stage,
        status: index < 2 ? 'completed' : index === 2 ? 'loading' : 'pending'
      })))
    }, 3000)

    setTimeout(() => {
      setProgressiveStages(prev => prev.map((stage, index) => ({
        ...stage,
        status: index < 3 ? 'completed' : 'loading'
      })))
    }, 4500)

    setTimeout(() => {
      setProgressiveStages(prev => prev.map(stage => ({
        ...stage,
        status: 'completed'
      })))
      setTimeout(() => setShowProgressiveDemo(false), 2000)
    }, 5500)
  }

  const CurrentLoader = loaderComponents[selectedLoader as keyof typeof loaderComponents]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Loading Animations Gallery</h1>
              <p className="text-muted-foreground mt-2">
                Modern, sophisticated loading components for your dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg border hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-lg">
                <Monitor className="w-4 h-4" />
                <span className="text-sm font-mono">60fps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Loader Selection */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Settings className="w-4 h-4" />
                  Loader Type
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.keys(loaderComponents).map((loader) => (
                    <button
                      key={loader}
                      onClick={() => setSelectedLoader(loader)}
                      className={cn(
                        'p-3 rounded-lg text-left text-sm font-medium transition-all',
                        selectedLoader === loader
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {loader.charAt(0).toUpperCase() + loader.slice(1).replace(/([A-Z])/g, ' $1')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Control */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Gauge className="w-4 h-4" />
                  Size
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setLoaderSize(size)}
                      className={cn(
                        'p-2 rounded text-xs font-medium transition-all',
                        loaderSize === size
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Control */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-4">Speed</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setLoaderSpeed(speed)}
                      className={cn(
                        'p-2 rounded text-xs font-medium transition-all',
                        loaderSpeed === speed
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      )}
                    >
                      {speed.charAt(0).toUpperCase() + speed.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Control */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold flex items-center gap-2 mb-4">
                  <Palette className="w-4 h-4" />
                  Color
                </h3>
                <input
                  type="color"
                  value={loaderColor}
                  onChange={(e) => setLoaderColor(e.target.value)}
                  className="w-full h-10 rounded border cursor-pointer"
                />
                <div className="grid grid-cols-6 gap-2 mt-3">
                  {[
                    '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
                    '#8b5cf6', '#f97316', '#06b6d4', '#ec4899'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setLoaderColor(color)}
                      className="w-full aspect-square rounded border-2 transition-all hover:scale-110"
                      style={{ 
                        backgroundColor: color,
                        borderColor: loaderColor === color ? '#fff' : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Playback Control */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-4">Playback</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false)
                      setTimeout(() => setIsPlaying(true), 100)
                    }}
                    className="p-2 bg-muted hover:bg-muted/80 rounded"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Current Loader Preview */}
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedLoader.charAt(0).toUpperCase() + selectedLoader.slice(1).replace(/([A-Z])/g, ' $1')} Loader
                </h2>
                <div className="flex items-center justify-center min-h-[200px] bg-muted/20 rounded-lg">
                  {isPlaying && (
                    <CurrentLoader 
                      size={loaderSize} 
                      speed={loaderSpeed} 
                      color={loaderColor}
                    />
                  )}
                  {!isPlaying && (
                    <div className="text-muted-foreground">Animation Paused</div>
                  )}
                </div>
                
                {/* Code Example */}
                <div className="mt-6 bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Usage Example</h4>
                    <button
                      onClick={() => copyToClipboard(codeExamples[selectedLoader as keyof typeof codeExamples])}
                      className="flex items-center gap-2 px-3 py-1 bg-background rounded text-sm hover:bg-background/80"
                    >
                      {copiedCode === codeExamples[selectedLoader as keyof typeof codeExamples] ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <code className="text-sm font-mono">
                    {codeExamples[selectedLoader as keyof typeof codeExamples]}
                  </code>
                </div>
              </div>
            </div>

            {/* All Loaders Grid */}
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">All Loaders</h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Object.entries(loaderComponents).map(([name, Component]) => (
                    <motion.div
                      key={name}
                      className="bg-muted/20 rounded-lg p-6 cursor-pointer border transition-all hover:border-primary"
                      onClick={() => setSelectedLoader(name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center h-20 mb-4">
                        {isPlaying && <Component size="md" color={loaderColor} />}
                      </div>
                      <h3 className="font-medium text-center">
                        {name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading Overlays Demo */}
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Loading Overlays</h2>
                  <button
                    onClick={() => setShowOverlayDemo(!showOverlayDemo)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    {showOverlayDemo ? 'Hide' : 'Show'} Demo
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Section Overlay Demo */}
                  <LoadingOverlays.Section
                    isLoading={showOverlayDemo}
                    message="Loading section..."
                    className="h-32"
                  >
                    <div className="h-full bg-muted/20 rounded flex items-center justify-center">
                      <p className="text-muted-foreground">Section Content</p>
                    </div>
                  </LoadingOverlays.Section>

                  {/* Card Overlay Demo */}
                  <LoadingOverlays.Card
                    isLoading={showOverlayDemo}
                    message="Loading card..."
                    className="h-32"
                  >
                    <div className="h-full bg-muted/20 rounded flex items-center justify-center">
                      <p className="text-muted-foreground">Card Content</p>
                    </div>
                  </LoadingOverlays.Card>

                  {/* Button Loader Demo */}
                  <div className="h-32 flex items-center justify-center">
                    <LoadingOverlays.InlineButton
                      isLoading={showOverlayDemo}
                      loadingText="Processing..."
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
                    >
                      Click Me
                    </LoadingOverlays.InlineButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Progressive Loader Demo */}
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Progressive Loader</h2>
                  <button
                    onClick={startProgressiveDemo}
                    disabled={showProgressiveDemo}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
                  >
                    Start Demo
                  </button>
                </div>
                
                {showProgressiveDemo && (
                  <ProgressiveLoaders.Progressive
                    stages={progressiveStages}
                    progress={
                      progressiveStages.filter(s => s.status === 'completed').length / 
                      progressiveStages.length * 100
                    }
                  />
                )}
                
                {!showProgressiveDemo && (
                  <div className="text-center py-12 text-muted-foreground">
                    Click &quot;Start Demo&quot; to see the progressive loader in action
                  </div>
                )}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-success">60</div>
                    <div className="text-sm text-muted-foreground">FPS</div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-info">~2KB</div>
                    <div className="text-sm text-muted-foreground">Gzipped Size</div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-warning">GPU</div>
                    <div className="text-sm text-muted-foreground">Accelerated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Page Overlay Demo */}
      <LoadingOverlays.FullPage
        isLoading={progressLoading}
        message="Demo loading operation..."
      />
    </div>
  )
}