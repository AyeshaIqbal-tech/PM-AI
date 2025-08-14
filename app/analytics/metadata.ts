import type { Metadata } from 'next'

export const analyticsMetadata: Metadata = {
  title: 'Analytics Dashboard - TechCorp Executive Dashboard',
  description: 'Comprehensive analytics and business intelligence insights with traffic analysis, revenue metrics, user behavior tracking, and conversion funnel optimization.',
  keywords: [
    'analytics dashboard',
    'business intelligence',
    'traffic analysis',
    'revenue metrics',
    'conversion tracking',
    'user behavior',
    'data insights',
    'business analytics',
    'performance metrics',
    'web analytics'
  ],
  openGraph: {
    title: 'Analytics Dashboard - TechCorp Executive Dashboard',
    description: 'Comprehensive analytics and business intelligence insights with real-time data visualization and performance tracking.',
    url: 'https://dashboard.techcorp.com/analytics',
    images: [
      {
        url: 'https://dashboard.techcorp.com/og-analytics.jpg',
        width: 1200,
        height: 630,
        alt: 'TechCorp Analytics Dashboard Interface',
      },
    ],
  },
  twitter: {
    title: 'Analytics Dashboard - TechCorp Executive Dashboard',
    description: 'Comprehensive analytics and business intelligence insights with real-time data visualization.',
    images: ['https://dashboard.techcorp.com/twitter-analytics.jpg'],
  },
  alternates: {
    canonical: 'https://dashboard.techcorp.com/analytics',
  },
}