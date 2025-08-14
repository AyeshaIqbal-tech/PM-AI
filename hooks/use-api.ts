"use client"

import { useState, useCallback, useEffect } from 'react'
import { ApiResponse } from '@/types'
import { useLoading } from './use-loading'
import { useToast } from '@/components/ui/toast'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
  showToast?: boolean
  retryCount?: number
  retryDelay?: number
}

export function useApi<T = unknown>(
  url: string,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null)
  const { isLoading, error, execute, setError } = useLoading()
  const { addToast } = useToast()
  
  const {
    onSuccess,
    onError,
    showToast = true,
    retryCount = 0,
    retryDelay = 1000,
  } = options

  const fetchData = useCallback(async (
    requestOptions?: RequestInit,
    retries = retryCount
  ): Promise<T | null> => {
    try {
      const response = await fetch(url, {
        ...requestOptions,
        headers: {
          'Content-Type': 'application/json',
          ...requestOptions?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<T> = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      if (result.data) {
        setData(result.data)
        onSuccess?.(result.data)
        
        if (showToast && result.message) {
          addToast({
            type: 'success',
            description: result.message,
          })
        }
        
        return result.data
      }

      return null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data'
      
      // Retry logic
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay))
        return fetchData(requestOptions, retries - 1)
      }
      
      setError(errorMessage)
      onError?.(errorMessage)
      
      if (showToast) {
        addToast({
          type: 'error',
          title: 'Error',
          description: errorMessage,
        })
      }
      
      return null
    }
  }, [url, retryCount, retryDelay, onSuccess, onError, showToast, addToast, setError])

  const get = useCallback(() => {
    return execute(fetchData())
  }, [execute, fetchData])

  const post = useCallback((body: unknown) => {
    return execute(fetchData({
      method: 'POST',
      body: JSON.stringify(body),
    }))
  }, [execute, fetchData])

  const put = useCallback((body: unknown) => {
    return execute(fetchData({
      method: 'PUT',
      body: JSON.stringify(body),
    }))
  }, [execute, fetchData])

  const patch = useCallback((body: unknown) => {
    return execute(fetchData({
      method: 'PATCH',
      body: JSON.stringify(body),
    }))
  }, [execute, fetchData])

  const del = useCallback(() => {
    return execute(fetchData({
      method: 'DELETE',
    }))
  }, [execute, fetchData])

  return {
    data,
    isLoading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
    refetch: get,
  }
}

// Hook for pagination
export function usePaginatedApi<T = unknown>(
  baseUrl: string,
  pageSize = 10
) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [items, setItems] = useState<T[]>([])
  
  const url = `${baseUrl}?page=${page}&pageSize=${pageSize}`
  const { data, isLoading, error, get } = useApi<{
    items: T[]
    total: number
    page: number
    pageSize: number
  }>(url)

  useEffect(() => {
    if (data) {
      setItems(data.items)
      setTotalPages(Math.ceil(data.total / pageSize))
    }
  }, [data, pageSize])

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }, [totalPages])

  const nextPage = useCallback(() => {
    goToPage(page + 1)
  }, [page, goToPage])

  const previousPage = useCallback(() => {
    goToPage(page - 1)
  }, [page, goToPage])

  return {
    items,
    isLoading,
    error,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
    goToPage,
    nextPage,
    previousPage,
    refetch: get,
  }
}