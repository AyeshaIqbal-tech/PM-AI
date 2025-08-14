"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MenuSection } from '@/types'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Code2,
  TestTube,
  GitBranch,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Activity,
  Shield,
  Zap,
  Building2,
  Menu,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems: MenuSection[] = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Executive Dashboard', href: '/' },
      { icon: Activity, label: 'Real-time Metrics', href: '/realtime' },
      { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    ],
  },
  {
    title: 'Departments',
    items: [
      { icon: Users, label: 'HR & People', href: '/hr' },
      { icon: Code2, label: 'Development', href: '/development' },
      { icon: TestTube, label: 'Quality Assurance', href: '/qa' },
      { icon: FolderKanban, label: 'Project Management', href: '/projects' },
      { icon: GitBranch, label: 'DevOps', href: '/devops' },
      { icon: TrendingUp, label: 'Marketing', href: '/marketing' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { icon: Shield, label: 'Security', href: '/security' },
      { icon: Zap, label: 'Performance', href: '/performance' },
      { icon: Building2, label: 'Infrastructure', href: '/infrastructure' },
    ],
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileOpen])

  // Handle click outside to close mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen])

  // Focus trap for mobile sidebar
  useEffect(() => {
    if (isMobileOpen) {
      const focusableElements = sidebarRef.current?.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements?.[0] as HTMLElement
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      firstElement?.focus()

      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [isMobileOpen])

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn("flex items-center space-x-3", isCollapsed && !isMobileOpen && "justify-center")}>
          <div className="w-10 h-10 rounded-lg bg-gradient-blue flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold">TechCorp</h2>
              <p className="text-xs text-muted-foreground">Executive Dashboard</p>
            </div>
          )}
        </div>
        
        {/* Desktop collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-muted transition-colors",
            "hidden lg:block",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-muted transition-colors lg:hidden",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav 
        className="flex-1 overflow-y-auto p-4 space-y-6"
        role="navigation"
        aria-label="Main navigation"
      >
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-2">
            {(!isCollapsed || isMobileOpen) && (
              <h3 
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3"
                id={`nav-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {section.title}
              </h3>
            )}
            <ul 
              className="space-y-1"
              role="list"
              aria-labelledby={`nav-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href} role="listitem">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground",
                        isCollapsed && !isMobileOpen && "justify-center"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      aria-label={item.label}
                      title={isCollapsed && !isMobileOpen ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      {(!isCollapsed || isMobileOpen) && (
                        <span className="text-sm font-medium animate-fade-in">{item.label}</span>
                      )}
                      {item.badge && (!isCollapsed || isMobileOpen) && (
                        <span className="ml-auto px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            isCollapsed && !isMobileOpen && "justify-center"
          )}
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" aria-hidden="true" />
          {(!isCollapsed || isMobileOpen) && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className={cn(
          "fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-md",
          "lg:hidden",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "hover:bg-muted transition-colors"
        )}
        aria-label="Open navigation menu"
        aria-expanded={isMobileOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed left-0 top-0 z-50 flex flex-col h-screen bg-card border-r border-border",
              "w-64 lg:hidden"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "relative flex-col h-screen bg-card border-r border-border transition-all duration-300",
          "hidden lg:flex",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
      </div>
    </>
  )
}