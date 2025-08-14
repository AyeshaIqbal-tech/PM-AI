"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ToastMessage } from '@/types'

interface ToastContextType {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 11)
    const newToast: ToastMessage = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }
    
    setToasts((prev) => [...prev, newToast])

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }, [removeToast])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      <ToastInitializer />
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div
      className="fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2 pointer-events-none max-w-md w-full sm:max-w-sm"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface ToastProps {
  toast: ToastMessage
  onClose: () => void
}

function Toast({ toast, onClose }: ToastProps) {
  const [isHovered, setIsHovered] = useState(false)

  const icons = {
    default: null,
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-destructive" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    info: <Info className="w-5 h-5 text-info" />,
  }

  const variants = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
  }

  // Pause auto-dismiss on hover
  useEffect(() => {
    if (isHovered && toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, toast.duration * 2) // Double the duration on hover
      return () => clearTimeout(timer)
    }
  }, [isHovered, toast.duration, onClose])

  return (
    <motion.div
      layout
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg pointer-events-auto",
        "bg-card text-card-foreground border-border",
        "transition-colors duration-200",
        {
          'border-success/50 bg-success/5': toast.type === 'success',
          'border-destructive/50 bg-destructive/5': toast.type === 'error',
          'border-warning/50 bg-warning/5': toast.type === 'warning',
          'border-info/50 bg-info/5': toast.type === 'info',
        }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="alert"
      aria-atomic="true"
    >
      {icons[toast.type]}
      
      <div className="flex-1 space-y-1">
        {toast.title && (
          <h3 className="font-semibold text-sm">{toast.title}</h3>
        )}
        <p className="text-sm text-muted-foreground">{toast.description}</p>
        
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label={toast.action.label}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={onClose}
        className={cn(
          "absolute top-2 right-2 rounded-md p-1",
          "text-muted-foreground hover:text-foreground",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// Store a reference to the toast functions
let toastFunctions: ReturnType<typeof useToast> | null = null

// Component to initialize toast functions
export function ToastInitializer() {
  toastFunctions = useToast()
  return null
}

// Export helper functions for easy toast creation
export const toast = {
  success: (description: string, options?: Partial<Omit<ToastMessage, 'id' | 'type' | 'description'>>) => {
    if (toastFunctions) {
      toastFunctions.addToast({ ...options, description, type: 'success' })
    }
  },
  error: (description: string, options?: Partial<Omit<ToastMessage, 'id' | 'type' | 'description'>>) => {
    if (toastFunctions) {
      toastFunctions.addToast({ ...options, description, type: 'error' })
    }
  },
  warning: (description: string, options?: Partial<Omit<ToastMessage, 'id' | 'type' | 'description'>>) => {
    if (toastFunctions) {
      toastFunctions.addToast({ ...options, description, type: 'warning' })
    }
  },
  info: (description: string, options?: Partial<Omit<ToastMessage, 'id' | 'type' | 'description'>>) => {
    if (toastFunctions) {
      toastFunctions.addToast({ ...options, description, type: 'info' })
    }
  },
}