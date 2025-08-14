import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getSEOConfig } from '@/lib/seo-config'

interface SEOData {
  title: string
  description: string
  canonicalUrl: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  keywords?: string[]
}

export function useSEO(seoData?: Partial<SEOData>) {
  const pathname = usePathname()
  const defaultConfig = getSEOConfig(pathname)
  
  const finalSeoData = {
    title: seoData?.title || defaultConfig.title,
    description: seoData?.description || defaultConfig.description,
    canonicalUrl: seoData?.canonicalUrl || defaultConfig.canonicalUrl,
    keywords: seoData?.keywords || defaultConfig.keywords,
    ogImage: seoData?.ogImage || defaultConfig.ogImage,
    twitterImage: seoData?.twitterImage || defaultConfig.twitterImage,
    ...seoData
  }
  useEffect(() => {
    // Update document title
    document.title = finalSeoData.title

    // Update meta description
    updateMetaTag('name', 'description', finalSeoData.description)
    
    // Update keywords if provided
    if (finalSeoData.keywords && finalSeoData.keywords.length > 0) {
      updateMetaTag('name', 'keywords', finalSeoData.keywords.join(', '))
    }

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', finalSeoData.ogTitle || finalSeoData.title)
    updateMetaTag('property', 'og:description', finalSeoData.ogDescription || finalSeoData.description)
    updateMetaTag('property', 'og:url', finalSeoData.canonicalUrl)
    
    if (finalSeoData.ogImage) {
      updateMetaTag('property', 'og:image', finalSeoData.ogImage)
    }

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:title', finalSeoData.twitterTitle || finalSeoData.title)
    updateMetaTag('name', 'twitter:description', finalSeoData.twitterDescription || finalSeoData.description)
    
    if (finalSeoData.twitterImage) {
      updateMetaTag('name', 'twitter:image', finalSeoData.twitterImage)
    }

    // Update canonical URL
    updateCanonicalLink(finalSeoData.canonicalUrl)

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      // Reset to default values
      document.title = 'TechCorp Executive Dashboard - Real-time Business Analytics'
      updateMetaTag('name', 'description', 'Premium CEO & Organizational Dashboard with Real-time Analytics, Performance Metrics, Project Management, and Business Intelligence for data-driven decision making.')
      updateMetaTag('property', 'og:url', 'https://dashboard.techcorp.com')
      updateCanonicalLink('https://dashboard.techcorp.com')
    }
  }, [finalSeoData])
}

function updateMetaTag(attribute: string, value: string, content: string) {
  let metaTag = document.querySelector(`meta[${attribute}="${value}"]`)
  
  if (metaTag) {
    metaTag.setAttribute('content', content)
  } else {
    metaTag = document.createElement('meta')
    metaTag.setAttribute(attribute, value)
    metaTag.setAttribute('content', content)
    document.head.appendChild(metaTag)
  }
}

function updateCanonicalLink(href: string) {
  let canonicalLink = document.querySelector('link[rel="canonical"]')
  
  if (canonicalLink) {
    canonicalLink.setAttribute('href', href)
  } else {
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    canonicalLink.setAttribute('href', href)
    document.head.appendChild(canonicalLink)
  }
}