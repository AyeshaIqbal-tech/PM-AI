"use client"

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Sun, Moon, Bell, Search, Command } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)

    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-64 pl-10 pr-4 py-2 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">
              {format(currentTime, 'EEEE, MMMM d, yyyy')}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {format(currentTime, 'HH:mm:ss')}
            </span>
          </div>

          <div className="h-8 w-px bg-border" />

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative"
          >
            <Sun className={cn(
              "h-5 w-5 rotate-0 scale-100 transition-all",
              isDark && "-rotate-90 scale-0"
            )} />
            <Moon className={cn(
              "absolute h-5 w-5 rotate-90 scale-0 transition-all",
              isDark && "rotate-0 scale-100"
            )} />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}