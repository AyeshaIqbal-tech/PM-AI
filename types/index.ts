// Core type definitions for the dashboard application

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  department?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  timestamp: Date
  actionUrl?: string
}

export interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  badge?: number | string
  disabled?: boolean
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

export interface DashboardMetric {
  id: string
  title: string
  value: number | string
  change?: number
  changeLabel?: string
  unit?: string
  prefix?: string
  suffix?: string
}

export interface ChartData {
  name: string
  value: number
  label?: string
  color?: string
}

export interface ProjectStatus {
  id: string
  name: string
  progress: number
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed'
  deadline: Date
  team: string[]
  budget?: {
    allocated: number
    spent: number
  }
}

export interface DepartmentMetrics {
  department: string
  productivity: number
  satisfaction: number
  headcount: number
  openPositions: number
  metrics: {
    [key: string]: number | string
  }
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
  status: number
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export interface FilterState {
  search?: string
  department?: string
  dateRange?: {
    start: Date
    end: Date
  }
  status?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ToastMessage {
  id: string
  title?: string
  description: string
  type: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface AccessibilityProps {
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-hidden'?: boolean
  'aria-live'?: 'polite' | 'assertive' | 'off'
  'aria-atomic'?: boolean
  'aria-busy'?: boolean
  role?: string
  tabIndex?: number
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system'
  primaryColor?: string
  fontSize?: 'small' | 'medium' | 'large'
  contrast?: 'normal' | 'high'
  reducedMotion?: boolean
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
}