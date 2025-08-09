"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
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
} from 'lucide-react'

const menuItems = [
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
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn("flex items-center space-x-3", isCollapsed && "justify-center")}>
          <div className="w-10 h-10 rounded-lg bg-gradient-blue flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold">TechCorp</h2>
              <p className="text-xs text-muted-foreground">Executive Dashboard</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menuItems.map((section) => (
          <div key={section.title} className="space-y-2">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium animate-fade-in">{item.label}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className={cn(
            "flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-all duration-200",
            isCollapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>
    </div>
  )
}