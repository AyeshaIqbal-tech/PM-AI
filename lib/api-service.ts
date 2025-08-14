"use client"

import { ApiResponse } from '@/types'
import { logger } from './logger'

// API Configuration
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.dashboard.com',
  timeout: 10000,
  retryCount: 3,
  retryDelay: 1000,
}

// Enhanced fetch wrapper with better error handling
class ApiClient {
  private baseUrl: string
  private timeout: number
  private retryCount: number
  private retryDelay: number

  constructor(config = API_CONFIG) {
    this.baseUrl = config.baseUrl
    this.timeout = config.timeout
    this.retryCount = config.retryCount
    this.retryDelay = config.retryDelay
  }

  private async fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    retries = this.retryCount
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<T> = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      return result.data as T
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (retries > 0 && !(error instanceof Error && error.name === 'AbortError')) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay))
        return this.fetchWithRetry(url, options, retries - 1)
      }
      
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.fetchWithRetry<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.fetchWithRetry<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.fetchWithRetry<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.fetchWithRetry<T>(endpoint, { method: 'DELETE' })
  }

  // Parallel requests utility
  async parallel<T extends Record<string, any>>(
    requests: Record<keyof T, Promise<any>>
  ): Promise<T> {
    const keys = Object.keys(requests) as Array<keyof T>
    const promises = Object.values(requests)

    try {
      const results = await Promise.allSettled(promises)
      const data = {} as T

      results.forEach((result, index) => {
        const key = keys[index]
        if (result.status === 'fulfilled') {
          data[key] = result.value
        } else {
          logger.error('Failed to fetch data for key', { 
            key: String(key), 
            reason: result.reason 
          }, 'ApiClient', 'parallel-request-failed')
          data[key] = null as any
        }
      })

      return data
    } catch (error) {
      logger.error('Parallel request error', { error }, 'ApiClient', 'parallel-request-error')
      throw error
    }
  }
}

// API Service Singleton
export const apiClient = new ApiClient()

// Dashboard-specific API endpoints
export class DashboardApiService {
  // Executive Dashboard Data
  static async getExecutiveDashboardData() {
    return apiClient.parallel({
      stats: apiClient.get('/dashboard/stats'),
      revenue: apiClient.get('/dashboard/revenue'),
      projects: apiClient.get('/dashboard/projects'),
      teams: apiClient.get('/dashboard/teams'),
      departments: apiClient.get('/dashboard/departments'),
      clientSatisfaction: apiClient.get('/dashboard/client-satisfaction'),
    })
  }

  // Individual endpoint methods for granular control
  static async getStats() {
    return apiClient.get<{
      totalRevenue: number
      activeProjects: number
      teamMembers: number
      clientSatisfaction: number
      profitMargin: number
      conversionRate: number
      productivityScore: number
      activeClients: number
    }>('/dashboard/stats')
  }

  static async getRevenueData() {
    return apiClient.get<Array<{
      month: string
      revenue: number
      profit: number
      expenses: number
    }>>('/dashboard/revenue')
  }

  static async getProjectsData() {
    return apiClient.get<Array<{
      id: number
      name: string
      client: string
      progress: number
      status: 'on-track' | 'ahead' | 'at-risk' | 'delayed'
      team: number
      deadline: string
      budget: { used: number; total: number }
    }>>('/dashboard/projects')
  }

  static async getTeamsData() {
    return apiClient.get<Array<{
      name: string
      lead: string
      members: number
      performance: number
      velocity: 'High' | 'Medium' | 'Low'
      avatar: string
      color: string
    }>>('/dashboard/teams')
  }

  static async getDepartmentMetrics() {
    return apiClient.get<{
      development: Array<{ metric: string; value: number }>
      hr: Array<{ metric: string; value: number }>
      qa: Array<{ metric: string; value: number }>
      devops: Array<{ metric: string; value: number }>
    }>('/dashboard/departments')
  }

  static async getClientSatisfaction() {
    return apiClient.get<{
      averageRating: number
      totalResponses: number
      distribution: Array<{
        name: string
        value: number
        color: string
      }>
    }>('/dashboard/client-satisfaction')
  }

  // Real-time monitoring endpoints
  static async getRealTimeMetrics() {
    return apiClient.get<{
      activeUsers: number
      responseTime: number
      requestsPerSecond: number
      errorRate: number
      uptime: number
      serverLoad: number
    }>('/monitoring/realtime')
  }

  static async getPerformanceMetrics() {
    return apiClient.parallel({
      trends: apiClient.get('/monitoring/performance-trends'),
      pageSpeed: apiClient.get('/monitoring/page-speed'),
      coreVitals: apiClient.get('/monitoring/core-vitals'),
      serverMetrics: apiClient.get('/monitoring/servers'),
      databasePerformance: apiClient.get('/monitoring/database'),
      applicationMetrics: apiClient.get('/monitoring/applications'),
    })
  }
}

// Mock API Service for development
export class MockApiService extends DashboardApiService {
  private static delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static async getExecutiveDashboardData() {
    await this.delay(500) // Simulate network delay
    
    return {
      stats: await this.getStats(),
      revenue: await this.getRevenueData(),
      projects: await this.getProjectsData(),
      teams: await this.getTeamsData(),
      departments: await this.getDepartmentMetrics(),
      clientSatisfaction: await this.getClientSatisfaction(),
    }
  }

  static async getStats() {
    await this.delay(200)
    return {
      totalRevenue: 4827500,
      activeProjects: 24,
      teamMembers: 142,
      clientSatisfaction: 94.8,
      profitMargin: 32.4,
      conversionRate: 68.3,
      productivityScore: 87,
      activeClients: 73,
    }
  }

  static async getRevenueData() {
    await this.delay(300)
    return [
      { month: 'Jan', revenue: 186000, profit: 42000, expenses: 144000 },
      { month: 'Feb', revenue: 205000, profit: 52000, expenses: 153000 },
      { month: 'Mar', revenue: 237000, profit: 68000, expenses: 169000 },
      { month: 'Apr', revenue: 273000, profit: 85000, expenses: 188000 },
      { month: 'May', revenue: 309000, profit: 102000, expenses: 207000 },
      { month: 'Jun', revenue: 342000, profit: 118000, expenses: 224000 },
      { month: 'Jul', revenue: 378000, profit: 135000, expenses: 243000 },
      { month: 'Aug', revenue: 412000, profit: 152000, expenses: 260000 },
      { month: 'Sep', revenue: 445000, profit: 168000, expenses: 277000 },
      { month: 'Oct', revenue: 478000, profit: 185000, expenses: 293000 },
      { month: 'Nov', revenue: 512000, profit: 202000, expenses: 310000 },
      { month: 'Dec', revenue: 548000, profit: 220000, expenses: 328000 },
    ]
  }

  static async getProjectsData() {
    await this.delay(250)
    return [
      {
        id: 1,
        name: 'E-Commerce Platform',
        client: 'RetailCorp',
        progress: 78,
        status: 'on-track' as const,
        team: 12,
        deadline: '2024-03-15',
        budget: { used: 145000, total: 200000 },
      },
      {
        id: 2,
        name: 'Mobile Banking App',
        client: 'FinanceBank',
        progress: 92,
        status: 'ahead' as const,
        team: 8,
        deadline: '2024-02-28',
        budget: { used: 280000, total: 300000 },
      },
      {
        id: 3,
        name: 'Healthcare Dashboard',
        client: 'MediCare Plus',
        progress: 45,
        status: 'at-risk' as const,
        team: 15,
        deadline: '2024-04-30',
        budget: { used: 95000, total: 250000 },
      },
      {
        id: 4,
        name: 'AI Analytics Tool',
        client: 'DataInsights',
        progress: 63,
        status: 'on-track' as const,
        team: 10,
        deadline: '2024-03-31',
        budget: { used: 120000, total: 180000 },
      },
      {
        id: 5,
        name: 'Supply Chain System',
        client: 'LogisticsPro',
        progress: 35,
        status: 'delayed' as const,
        team: 18,
        deadline: '2024-05-15',
        budget: { used: 75000, total: 320000 },
      },
    ]
  }

  static async getTeamsData() {
    await this.delay(180)
    return [
      {
        name: 'Development',
        lead: 'Sarah Chen',
        members: 32,
        performance: 92,
        velocity: 'High' as const,
        avatar: 'SC',
        color: 'from-blue-500 to-indigo-600',
      },
      {
        name: 'Design',
        lead: 'Alex Rivera',
        members: 12,
        performance: 88,
        velocity: 'Medium' as const,
        avatar: 'AR',
        color: 'from-purple-500 to-pink-600',
      },
      {
        name: 'Marketing',
        lead: 'Jordan Smith',
        members: 18,
        performance: 95,
        velocity: 'High' as const,
        avatar: 'JS',
        color: 'from-green-500 to-emerald-600',
      },
      {
        name: 'QA Testing',
        lead: 'Morgan Lee',
        members: 15,
        performance: 87,
        velocity: 'Medium' as const,
        avatar: 'ML',
        color: 'from-amber-500 to-orange-600',
      },
      {
        name: 'DevOps',
        lead: 'Chris Park',
        members: 8,
        performance: 90,
        velocity: 'High' as const,
        avatar: 'CP',
        color: 'from-red-500 to-rose-600',
      },
    ]
  }

  static async getDepartmentMetrics() {
    await this.delay(220)
    return {
      development: [
        { metric: 'Code Quality', value: 92 },
        { metric: 'Sprint Velocity', value: 87 },
        { metric: 'Bug Resolution', value: 95 },
        { metric: 'Tech Debt', value: 78 },
        { metric: 'Innovation', value: 88 },
      ],
      hr: [
        { metric: 'Retention Rate', value: 94 },
        { metric: 'Hiring Speed', value: 82 },
        { metric: 'Training Score', value: 90 },
        { metric: 'Satisfaction', value: 88 },
        { metric: 'Diversity', value: 85 },
      ],
      qa: [
        { metric: 'Test Coverage', value: 96 },
        { metric: 'Automation', value: 84 },
        { metric: 'Bug Detection', value: 91 },
        { metric: 'Release Quality', value: 93 },
        { metric: 'Performance', value: 89 },
      ],
      devops: [
        { metric: 'Uptime', value: 99.9 },
        { metric: 'Deploy Speed', value: 92 },
        { metric: 'Recovery Time', value: 88 },
        { metric: 'Security Score', value: 94 },
        { metric: 'Cost Efficiency', value: 86 },
      ],
    }
  }

  static async getClientSatisfaction() {
    await this.delay(150)
    return {
      averageRating: 4.14,
      totalResponses: 100,
      distribution: [
        { name: 'Excellent (5★)', value: 45, color: '#10b981' },
        { name: 'Good (4★)', value: 32, color: '#3b82f6' },
        { name: 'Average (3★)', value: 15, color: '#f59e0b' },
        { name: 'Poor (2★)', value: 6, color: '#fb923c' },
        { name: 'Bad (1★)', value: 2, color: '#ef4444' },
      ]
    }
  }
}

// Environment-based service selection
export const dashboardApi = process.env.NODE_ENV === 'development' 
  ? MockApiService 
  : DashboardApiService