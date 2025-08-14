'use client'

import { usePathname } from 'next/navigation'

interface StructuredDataProps {
  type?: 'organization' | 'webApplication' | 'breadcrumbList'
  data?: any
}

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechCorp",
  "alternateName": "TechCorp Analytics",
  "url": "https://dashboard.techcorp.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://dashboard.techcorp.com/logo.png",
    "width": 300,
    "height": 100
  },
  "description": "Leading technology corporation providing executive dashboard solutions and business analytics software for data-driven decision making.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Business District",
    "addressLocality": "Tech City",
    "addressRegion": "TC",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://twitter.com/TechCorp",
    "https://linkedin.com/company/techcorp",
    "https://github.com/techcorp"
  ],
  "founder": {
    "@type": "Person",
    "name": "Tech Corp Founders"
  },
  "foundingDate": "2015-01-01",
  "numberOfEmployees": "500-1000",
  "industry": "Software Development"
}

// WebApplication Schema
const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TechCorp Executive Dashboard",
  "description": "Premium CEO & Organizational Dashboard with Real-time Analytics, Performance Metrics, Project Management, and Business Intelligence for data-driven decision making.",
  "url": "https://dashboard.techcorp.com",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Dashboard",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Modern web browser with JavaScript enabled",
  "permissions": "Authenticated access required",
  "softwareVersion": "2.0.0",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "category": "Enterprise Software"
  },
  "author": {
    "@type": "Organization",
    "name": "TechCorp",
    "url": "https://techcorp.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TechCorp",
    "url": "https://techcorp.com"
  },
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "featureList": [
    "Real-time Analytics",
    "Performance Metrics",
    "Project Management",
    "Business Intelligence",
    "Executive Reporting",
    "Data Visualization",
    "KPI Tracking",
    "Team Performance Monitoring"
  ],
  "screenshot": {
    "@type": "ImageObject",
    "url": "https://dashboard.techcorp.com/screenshot.jpg",
    "caption": "TechCorp Executive Dashboard Interface"
  }
}

// Route mapping for breadcrumbs
const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/projects': 'Projects',
  '/performance': 'Performance',
  '/marketing': 'Marketing',
  '/development': 'Development',
  '/devops': 'DevOps',
  '/hr': 'Human Resources',
  '/infrastructure': 'Infrastructure',
  '/qa': 'Quality Assurance',
  '/security': 'Security',
  '/realtime': 'Real-time Data',
  '/settings': 'Settings',
  '/loading-examples': 'Loading Examples'
}

// Generate Breadcrumb Schema
const generateBreadcrumbSchema = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean)
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dashboard.techcorp.com"
    }
  ]

  let currentPath = ''
  paths.forEach((path, index) => {
    currentPath += `/${path}`
    const label = routeLabels[currentPath] || path.charAt(0).toUpperCase() + path.slice(1)
    
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": label,
      "item": `https://dashboard.techcorp.com${currentPath}`
    })
  })

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  }
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const pathname = usePathname()

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return organizationSchema
      case 'webApplication':
        return webApplicationSchema
      case 'breadcrumbList':
        return generateBreadcrumbSchema(pathname)
      default:
        return organizationSchema
    }
  }

  const schema = data || getSchema()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}

// Individual components for easy use
export function OrganizationStructuredData() {
  return <StructuredData type="organization" />
}

export function WebApplicationStructuredData() {
  return <StructuredData type="webApplication" />
}

export function BreadcrumbStructuredData() {
  return <StructuredData type="breadcrumbList" />
}

// Combined component for layout
export function AllStructuredData() {
  return (
    <>
      <OrganizationStructuredData />
      <WebApplicationStructuredData />
      <BreadcrumbStructuredData />
    </>
  )
}