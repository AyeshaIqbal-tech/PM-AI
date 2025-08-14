"use client"

import { logger } from './logger'

// Enhanced caching system with multiple storage strategies
interface CacheEntry<T = unknown> {
  data: T
  timestamp: number
  expiresAt: number
  version: number
  tags: string[]
  size: number
}

interface CacheConfig {
  maxSize: number // Maximum cache size in bytes
  defaultTTL: number // Default time-to-live in milliseconds
  maxItems: number // Maximum number of items
  storageType: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB'
  compressionEnabled: boolean
  encryptionEnabled: boolean
}

interface CacheStats {
  hits: number
  misses: number
  evictions: number
  totalSize: number
  itemCount: number
  hitRate: number
}

// Abstract cache storage interface
abstract class CacheStorage {
  abstract get<T>(key: string): Promise<CacheEntry<T> | null>
  abstract set<T>(key: string, entry: CacheEntry<T>): Promise<boolean>
  abstract delete(key: string): Promise<boolean>
  abstract clear(): Promise<void>
  abstract keys(): Promise<string[]>
  abstract size(): Promise<number>
}

// Memory storage implementation
class MemoryStorage extends CacheStorage {
  private cache = new Map<string, CacheEntry>()

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    return this.cache.get(key) as CacheEntry<T> || null
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<boolean> {
    this.cache.set(key, entry)
    return true
  }

  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key)
  }

  async clear(): Promise<void> {
    this.cache.clear()
  }

  async keys(): Promise<string[]> {
    return Array.from(this.cache.keys())
  }

  async size(): Promise<number> {
    return this.cache.size
  }
}

// localStorage storage implementation
class LocalStorage extends CacheStorage {
  private prefix = 'dashboard_cache_'

  private getFullKey(key: string): string {
    return `${this.prefix}${key}`
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const item = localStorage.getItem(this.getFullKey(key))
      return item ? JSON.parse(item) : null
    } catch (error) {
      logger.error('Cache localStorage get error', { error }, 'LocalStorage', 'get-error')
      return null
    }
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<boolean> {
    try {
      localStorage.setItem(this.getFullKey(key), JSON.stringify(entry))
      return true
    } catch (error) {
      logger.error('Cache localStorage set error', { error }, 'LocalStorage', 'set-error')
      return false
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      localStorage.removeItem(this.getFullKey(key))
      return true
    } catch (error) {
      logger.error('Cache localStorage delete error', { error }, 'LocalStorage', 'delete-error')
      return false
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      logger.error('Cache localStorage clear error', { error }, 'LocalStorage', 'clear-error')
    }
  }

  async keys(): Promise<string[]> {
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''))
    } catch (error) {
      logger.error('Cache localStorage keys error', { error }, 'LocalStorage', 'keys-error')
      return []
    }
  }

  async size(): Promise<number> {
    return (await this.keys()).length
  }
}

// IndexedDB storage implementation for large data
class IndexedDBStorage extends CacheStorage {
  private dbName = 'DashboardCache'
  private storeName = 'cache_entries'
  private version = 1
  private db: IDBDatabase | null = null

  private async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'key' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
          store.createIndex('expiresAt', 'expiresAt', { unique: false })
        }
      }
    })
  }

  async get<T>(key: string): Promise<CacheEntry<T> | null> {
    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      
      return new Promise((resolve, reject) => {
        const request = store.get(key)
        request.onsuccess = () => {
          const result = request.result
          resolve(result ? result.entry : null)
        }
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      logger.error('Cache IndexedDB get error', { error }, 'IndexedDBStorage', 'get-error')
      return null
    }
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<boolean> {
    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      return new Promise((resolve) => {
        const request = store.put({ key, entry })
        request.onsuccess = () => resolve(true)
        request.onerror = () => resolve(false)
      })
    } catch (error) {
      logger.error('Cache IndexedDB set error', { error }, 'IndexedDBStorage', 'set-error')
      return false
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      return new Promise((resolve) => {
        const request = store.delete(key)
        request.onsuccess = () => resolve(true)
        request.onerror = () => resolve(false)
      })
    } catch (error) {
      logger.error('Cache IndexedDB delete error', { error }, 'IndexedDBStorage', 'delete-error')
      return false
    }
  }

  async clear(): Promise<void> {
    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      store.clear()
    } catch (error) {
      logger.error('Cache IndexedDB clear error', { error }, 'IndexedDBStorage', 'clear-error')
    }
  }

  async keys(): Promise<string[]> {
    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      
      return new Promise((resolve) => {
        const keys: string[] = []
        const request = store.openCursor()
        
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result
          if (cursor) {
            keys.push(cursor.key as string)
            cursor.continue()
          } else {
            resolve(keys)
          }
        }
        
        request.onerror = () => resolve([])
      })
    } catch (error) {
      logger.error('Cache IndexedDB keys error', { error }, 'IndexedDBStorage', 'keys-error')
      return []
    }
  }

  async size(): Promise<number> {
    try {
      const db = await this.getDB()
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      
      return new Promise((resolve) => {
        const request = store.count()
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => resolve(0)
      })
    } catch (error) {
      logger.error('Cache IndexedDB size error', { error }, 'IndexedDBStorage', 'size-error')
      return 0
    }
  }
}

// Main cache manager class
export class CacheManager {
  private storage: CacheStorage
  private config: CacheConfig
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    totalSize: 0,
    itemCount: 0,
    hitRate: 0,
  }
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 50 * 1024 * 1024, // 50MB
      defaultTTL: 5 * 60 * 1000, // 5 minutes
      maxItems: 1000,
      storageType: 'memory',
      compressionEnabled: false,
      encryptionEnabled: false,
      ...config,
    }

    this.storage = this.createStorage()
    this.startCleanupInterval()
  }

  private createStorage(): CacheStorage {
    switch (this.config.storageType) {
      case 'localStorage':
        return new LocalStorage()
      case 'sessionStorage':
        // Similar implementation to localStorage but using sessionStorage
        return new LocalStorage() // Simplified for now
      case 'indexedDB':
        return new IndexedDBStorage()
      default:
        return new MemoryStorage()
    }
  }

  private startCleanupInterval(): void {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpired()
    }, 60 * 1000)
  }

  private calculateSize(data: any): number {
    // Rough estimation of object size in bytes
    const jsonString = JSON.stringify(data)
    return new Blob([jsonString]).size
  }

  private async enforceMaxSize(): Promise<void> {
    if (this.stats.totalSize <= this.config.maxSize && this.stats.itemCount <= this.config.maxItems) {
      return
    }

    const keys = await this.storage.keys()
    const entries: Array<{ key: string; entry: CacheEntry }> = []

    // Get all entries with their access time
    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry) {
        entries.push({ key, entry })
      }
    }

    // Sort by timestamp (LRU - Least Recently Used)
    entries.sort((a, b) => a.entry.timestamp - b.entry.timestamp)

    // Remove oldest entries until we're under limits
    while (
      entries.length > 0 && 
      (this.stats.totalSize > this.config.maxSize || this.stats.itemCount > this.config.maxItems)
    ) {
      const { key, entry } = entries.shift()!
      await this.storage.delete(key)
      this.stats.totalSize -= entry.size
      this.stats.itemCount--
      this.stats.evictions++
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    const entry = await this.storage.get<T>(key)

    if (!entry) {
      this.stats.misses++
      this.updateHitRate()
      return null
    }

    // Check expiration
    const now = Date.now()
    if (entry.expiresAt <= now) {
      await this.storage.delete(key)
      this.stats.misses++
      this.updateHitRate()
      return null
    }

    // Update access timestamp
    entry.timestamp = now
    await this.storage.set(key, entry)

    this.stats.hits++
    this.updateHitRate()
    return entry.data
  }

  async set<T = any>(
    key: string, 
    data: T, 
    options: {
      ttl?: number
      tags?: string[]
      version?: number
    } = {}
  ): Promise<boolean> {
    const now = Date.now()
    const size = this.calculateSize(data)
    const ttl = options.ttl || this.config.defaultTTL

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + ttl,
      version: options.version || 1,
      tags: options.tags || [],
      size,
    }

    // Check if we need to make space
    await this.enforceMaxSize()

    const success = await this.storage.set(key, entry)
    
    if (success) {
      this.stats.totalSize += size
      this.stats.itemCount++
    }

    return success
  }

  async delete(key: string): Promise<boolean> {
    const entry = await this.storage.get(key)
    const success = await this.storage.delete(key)
    
    if (success && entry) {
      this.stats.totalSize -= entry.size
      this.stats.itemCount--
    }

    return success
  }

  async clear(): Promise<void> {
    await this.storage.clear()
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      totalSize: 0,
      itemCount: 0,
      hitRate: 0,
    }
  }

  async has(key: string): Promise<boolean> {
    const entry = await this.storage.get(key)
    if (!entry) return false
    
    // Check expiration
    const now = Date.now()
    if (entry.expiresAt <= now) {
      await this.storage.delete(key)
      return false
    }

    return true
  }

  async invalidateByTags(tags: string[]): Promise<number> {
    const keys = await this.storage.keys()
    let invalidated = 0

    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry && entry.tags.some(tag => tags.includes(tag))) {
        await this.storage.delete(key)
        this.stats.totalSize -= entry.size
        this.stats.itemCount--
        invalidated++
      }
    }

    return invalidated
  }

  async invalidateByVersion(version: number): Promise<number> {
    const keys = await this.storage.keys()
    let invalidated = 0

    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry && entry.version < version) {
        await this.storage.delete(key)
        this.stats.totalSize -= entry.size
        this.stats.itemCount--
        invalidated++
      }
    }

    return invalidated
  }

  private async cleanupExpired(): Promise<number> {
    const keys = await this.storage.keys()
    const now = Date.now()
    let cleaned = 0

    for (const key of keys) {
      const entry = await this.storage.get(key)
      if (entry && entry.expiresAt <= now) {
        await this.storage.delete(key)
        this.stats.totalSize -= entry.size
        this.stats.itemCount--
        cleaned++
      }
    }

    return cleaned
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0
  }

  getStats(): CacheStats {
    return { ...this.stats }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
  }

  // Batch operations for better performance
  async mget<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    const results: Record<string, T | null> = {}
    
    await Promise.all(
      keys.map(async (key) => {
        results[key] = await this.get<T>(key)
      })
    )

    return results
  }

  async mset<T = any>(
    entries: Array<{
      key: string
      data: T
      options?: { ttl?: number; tags?: string[]; version?: number }
    }>
  ): Promise<boolean[]> {
    return Promise.all(
      entries.map(({ key, data, options }) => this.set(key, data, options))
    )
  }

  async mdel(keys: string[]): Promise<boolean[]> {
    return Promise.all(keys.map(key => this.delete(key)))
  }
}

// Global cache instance
export const cacheManager = new CacheManager({
  maxSize: 100 * 1024 * 1024, // 100MB
  defaultTTL: 10 * 60 * 1000, // 10 minutes
  maxItems: 2000,
  storageType: 'memory',
})

// Cache decorators and utilities
export function cached<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    keyGenerator?: (...args: Parameters<T>) => string
    ttl?: number
    tags?: string[]
    version?: number
  } = {}
): T {
  const { 
    keyGenerator = (...args) => `${fn.name}_${JSON.stringify(args)}`,
    ttl,
    tags,
    version 
  } = options

  return (async (...args: Parameters<T>) => {
    const key = keyGenerator(...args)
    
    // Try cache first
    const cached = await cacheManager.get(key)
    if (cached !== null) {
      return cached
    }

    // Execute function and cache result
    const result = await fn(...args)
    await cacheManager.set(key, result, { ttl, tags, version })
    
    return result
  }) as T
}

// Cache key builders
export const CacheKeys = {
  dashboardStats: () => 'dashboard:stats',
  revenueData: (period?: string) => `dashboard:revenue:${period || 'all'}`,
  projectsData: (status?: string) => `dashboard:projects:${status || 'all'}`,
  teamsData: () => 'dashboard:teams',
  departmentMetrics: (dept?: string) => `dashboard:departments:${dept || 'all'}`,
  clientSatisfaction: () => 'dashboard:client-satisfaction',
  realTimeMetrics: () => 'realtime:metrics',
  userProfile: (userId: string) => `user:profile:${userId}`,
  apiResponse: (endpoint: string, params?: Record<string, any>) => 
    `api:${endpoint}:${params ? JSON.stringify(params) : 'no-params'}`,
}

// Cache tags for organized invalidation
export const CacheTags = {
  DASHBOARD: 'dashboard',
  REALTIME: 'realtime',
  USER_DATA: 'user_data',
  ANALYTICS: 'analytics',
  PROJECTS: 'projects',
  TEAMS: 'teams',
  DEPARTMENTS: 'departments',
}

// Cached API wrapper
export function createCachedApiCall<T>(
  apiCall: () => Promise<T>,
  cacheKey: string,
  options: {
    ttl?: number
    tags?: string[]
    version?: number
    forceRefresh?: boolean
  } = {}
) {
  return async (): Promise<T> => {
    const { ttl, tags, version, forceRefresh = false } = options

    if (!forceRefresh) {
      const cached = await cacheManager.get<T>(cacheKey)
      if (cached !== null) {
        return cached
      }
    }

    const result = await apiCall()
    await cacheManager.set(cacheKey, result, { ttl, tags, version })
    
    return result
  }
}